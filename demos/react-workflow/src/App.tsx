import { useEffect, useReducer, useRef, useState } from "react";
import { initialState, reducer, statuses, transitions } from "./workflow.ts";
import type { Message, Scenario, Status, Task } from "./workflow.ts";

const labels: Record<Status, [string, string]> = { draft: ["Draft", "草稿"], review: ["In review", "审核中"], changes: ["Changes", "待修改"], approved: ["Approved", "已通过"] };
const messages: Record<Message, [string, string]> = {
  ready: ["Choose a role, an outcome and a task action.", "选择角色、模拟结果，再操作任务。"],
  pending: ["Simulating a request… reset cancels this pending result.", "正在模拟请求……重置可取消本次结果。"],
  success: ["State updated and version incremented.", "状态已更新，版本号已递增。"],
  error: ["Simulated network error. Nothing changed; retry the same action.", "模拟网络错误，状态未变；可重试同一操作。"],
  conflict: ["Simulated version conflict. Refresh the snapshot before trying again.", "模拟版本冲突；请先刷新快照，再重新操作。"],
  refreshed: ["Snapshot refreshed. Choose a successful outcome to continue.", "快照已刷新，可选择正常响应后继续。"],
  forbidden: ["Action rejected: the role, state or version does not match.", "操作被拒绝：角色、状态或版本不匹配。"],
};
export function WorkflowBoard() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const [language, setLanguage] = useState(document.documentElement.lang.startsWith("zh") ? 1 : 0);
  const [scenario, setScenario] = useState<Scenario>("success");
  const token = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusTask = useRef<string | null>(null);
  const t = (en: string, zh: string) => language ? zh : en;
  useEffect(() => {
    const change = () => setLanguage(document.documentElement.lang.startsWith("zh") ? 1 : 0);
    document.addEventListener("portfolio-language-change", change);
    return () => { document.removeEventListener("portfolio-language-change", change); if (timer.current) clearTimeout(timer.current); token.current++; };
  }, []);
  useEffect(() => {
    if (!state.pending && focusTask.current) {
      document.getElementById(`task-${focusTask.current}`)?.focus({ preventScroll: true });
      focusTask.current = null;
    }
  }, [state.pending]);
  function run(task: Task, to: Status) {
    if (timer.current || state.pending || state.conflict || !transitions(state.role, task.status).includes(to)) return;
    const current = ++token.current;
    const outcome = scenario;
    focusTask.current = task.id;
    dispatch({ type: "start", operation: { token: current, id: task.id, to, version: task.version } });
    timer.current = setTimeout(() => {
      timer.current = null;
      if (current === token.current) dispatch({ type: "settle", token: current, outcome });
    }, 600);
  }
  function reset() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null; token.current++; focusTask.current = null;
    setScenario("success"); dispatch({ type: "reset" });
  }
  function actionLabel(task: Task, to: Status) {
    if (to === "approved") return t("Approve", "通过");
    if (to === "changes") return t("Request changes", "退回修改");
    return task.status === "approved" ? t("Reopen", "重新打开") : t("Submit for review", "提交审核");
  }
  return <>
    <div className="board-toolbar">
      <div><p className="section-number">INTERACTION LAB</p><h2 id="board-title">{t("Review queue", "审核队列")}</h2></div>
      <div className="board-controls">
        <label>{t("Role", "角色")}<select id="role-select" value={state.role} disabled={!!state.pending} onChange={event => {
          const value = event.target.value; if (value === "owner" || value === "reviewer") dispatch({ type: "role", role: value });
        }}><option value="reviewer">{t("Reviewer", "审核人")}</option><option value="owner">{t("Owner", "负责人")}</option></select></label>
        <label>{t("Next response", "下次响应")}<select id="scenario-select" value={scenario} disabled={!!state.pending} onChange={event => {
          const value = event.target.value; if (value === "success" || value === "error" || value === "conflict") setScenario(value);
        }}><option value="success">{t("Success", "正常响应")}</option><option value="error">{t("Network error", "网络错误")}</option><option value="conflict">{t("Version conflict", "版本冲突")}</option></select></label>
        <button type="button" className="quiet-button" id="reset-board" onClick={reset}>{t("Reset", "重置")}</button>
      </div>
    </div>
    <p className="board-status" id="board-status" role="status" aria-live="polite" data-tone={state.message}>{messages[state.message][language]}</p>
    {state.failed && <button type="button" id="retry-action" className="quiet-button" onClick={() => {
      const task = state.tasks.find(item => item.id === state.failed?.id); if (task && state.failed) run(task, state.failed.to);
    }}>{t("Retry action", "重试操作")}</button>}
    {state.conflict && <button type="button" id="refresh-snapshot" className="quiet-button" onClick={() => dispatch({ type: "refresh" })}>{t("Refresh snapshot", "刷新快照")}</button>}
    <div className="workflow-columns" id="workflow-columns" aria-busy={!!state.pending}>
      {statuses.map(status => <section key={status} className="workflow-column" data-status={status} aria-labelledby={`column-${status}`}>
        <div className="column-heading"><h3 id={`column-${status}`}>{labels[status][language]}</h3><span className="column-count">{state.tasks.filter(task => task.status === status).length}</span></div>
        {state.tasks.filter(task => task.status === status).map(task => <article key={task.id} id={`task-${task.id}`} className="workflow-card" data-task-id={task.id} tabIndex={-1} aria-label={t(task.title, task.titleZh)}>
          <div className="card-meta"><span>{task.id}</span><span>{t("Synthetic", "合成任务")}</span></div>
          <h4>{t(task.title, task.titleZh)}</h4><p>{t("Version", "版本")} <strong data-version>{task.version}</strong></p>
          <div className="card-actions">{transitions(state.role, status).map(to => <button key={to} type="button" data-action={to} disabled={!!state.pending || !!state.conflict} onClick={() => run(task, to)}>{actionLabel(task, to)}</button>)}</div>
          {!transitions(state.role, status).length && <p>{t("Switch role to act on this state.", "切换角色后可操作此状态。")}</p>}
        </article>)}
        {!state.tasks.some(task => task.status === status) && <p className="empty-column">{t("No tasks in this state.", "此状态下没有任务。")}</p>}
      </section>)}
    </div>
    <p className="demo-note">{t("In-memory simulation. Role controls illustrate UI rules, not server authorization.", "内存模拟：角色控件用于演示界面规则，不构成服务端授权。")}</p>
  </>;
}
