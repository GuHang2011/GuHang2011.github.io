export type Status = "draft" | "review" | "changes" | "approved";
export type Role = "owner" | "reviewer";
export type Scenario = "success" | "error" | "conflict";
export type Task = { id: string; title: string; titleZh: string; status: Status; version: number };
export type Operation = { token: number; id: string; to: Status; version: number };
export type Message = "ready" | "pending" | "success" | "error" | "conflict" | "refreshed" | "forbidden";
export type State = {
  tasks: Task[]; role: Role; pending: Operation | null;
  failed: Operation | null; conflict: { id: string; version: number } | null;
  message: Message;
};
export type Action =
  | { type: "role"; role: Role }
  | { type: "start"; operation: Operation }
  | { type: "settle"; token: number; outcome: Scenario }
  | { type: "refresh" }
  | { type: "reset" };

export const statuses: Status[] = ["draft", "review", "changes", "approved"];
const fixtures: Task[] = [
  { id: "WF-104", title: "Keyboard path for upload review", titleZh: "上传审核的键盘操作", status: "review", version: 3 },
  { id: "WF-103", title: "Document retry contract", titleZh: "记录重试接口契约", status: "changes", version: 2 },
  { id: "WF-102", title: "Reconcile empty-state copy", titleZh: "统一空状态提示", status: "approved", version: 5 },
  { id: "WF-101", title: "Map attachment permissions", titleZh: "梳理附件权限", status: "draft", version: 1 },
];
export function initialState(): State {
  return { tasks: fixtures.map(task => ({ ...task })), role: "reviewer", pending: null, failed: null, conflict: null, message: "ready" };
}
export function transitions(role: Role, from: Status): Status[] {
  if (role === "owner" && (from === "draft" || from === "changes")) return ["review"];
  if (role === "reviewer" && from === "review") return ["approved", "changes"];
  if (role === "reviewer" && from === "approved") return ["review"];
  return [];
}
// Pure transitions. The UI owns the timer; a production server must recheck rules.
export function reducer(state: State, action: Action): State {
  if (action.type === "reset") return initialState();
  if (action.type === "role") return state.pending ? state : { ...state, role: action.role, failed: null, message: "ready" };
  if (action.type === "refresh") {
    if (!state.conflict || state.pending) return state;
    const remote = state.conflict;
    return { ...state, tasks: state.tasks.map(task => task.id === remote.id ? { ...task, version: remote.version } : task), conflict: null, failed: null, message: "refreshed" };
  }
  if (action.type === "start") {
    if (state.pending || state.conflict) return state;
    const { operation } = action;
    const task = state.tasks.find(item => item.id === operation.id);
    if (!task || task.version !== operation.version || !transitions(state.role, task.status).includes(operation.to)) return { ...state, message: "forbidden" };
    return { ...state, pending: operation, failed: null, message: "pending" };
  }
  if (!state.pending || state.pending.token !== action.token) return state;
  const operation = state.pending;
  const task = state.tasks.find(item => item.id === operation.id);
  if (!task) return { ...state, pending: null, message: "forbidden" };
  if (action.outcome === "error") return { ...state, pending: null, failed: operation, message: "error" };
  if (action.outcome === "conflict" || task.version !== operation.version) return {
    ...state, pending: null, failed: null,
    conflict: { id: task.id, version: Math.max(task.version, operation.version + 1) }, message: "conflict",
  };
  return { ...state, tasks: state.tasks.map(item => item.id === task.id ? { ...item, status: operation.to, version: item.version + 1 } : item), pending: null, failed: null, message: "success" };
}
