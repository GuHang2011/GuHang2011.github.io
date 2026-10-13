"use strict";

(() => {
  const demo = document.querySelector("[data-archive-demo]");
  if (!demo) return;
  // This in-memory sketch makes the public case inspectable; it is not an authorization service.
  const resources = [
    { name: "course-guide.pdf", owner: "Teacher A", college: "A", version: 2, state: "pending" },
    { name: "lab-plan.pdf", owner: "Teacher B", college: "A", version: 1, state: "approved" },
    { name: "reading-list.pdf", owner: "Teacher C", college: "B", version: 1, state: "pending" },
  ];
  let role = "teacher";
  let message = "";
  let messageArgs = "";
  const translations = {
    en: {
      public: "No authenticated role: no files are visible.",
      teacher: "Teacher A: only this teacher's own files are visible. Review actions require an administrator.",
      admin: "College A administrator: both College A files are visible; College B remains outside this scope.",
      pending: "Pending", approved: "Approved", rejected: "Rejected", empty: "No accessible files",
      initial: "The three sample resources exist only in memory. Reset restores the initial review state.",
      approvedMessage: "course-guide.pdf was approved in this synthetic sample.",
      rejectedMessage: "course-guide.pdf was rejected. Reason: ",
      reasonRequired: "A rejection reason is required; the sample state has not changed.",
      denied: "The selected role cannot review this file.",
      reset: "Sample restored. course-guide.pdf is pending again.",
    },
    zh: {
      public: "未登录：没有可见文件。",
      teacher: "教师 A：仅能看到本人文件；审核操作需要管理员角色。",
      admin: "学院 A 管理员：可看到学院 A 的两份文件；学院 B 的资料仍在范围之外。",
      pending: "待审核", approved: "已通过", rejected: "已驳回", empty: "没有可访问的文件",
      initial: "三份合成资源仅保存在内存中；重置后恢复初始审核状态。",
      approvedMessage: "合成样例中的 course-guide.pdf 已通过审核。",
      rejectedMessage: "course-guide.pdf 已驳回。原因：",
      reasonRequired: "驳回必须填写原因；样例状态未改变。",
      denied: "当前角色不能审核这份文件。",
      reset: "样例已重置；course-guide.pdf 再次进入待审核状态。",
    },
  };
  const reason = demo.querySelector("input");
  const tbody = demo.querySelector("[data-demo-files]");
  function render() {
    const language = document.documentElement.lang === "zh-CN" ? "zh" : "en";
    const t = translations[language];
    demo.querySelector("[data-demo-scope]").textContent = t[role];
    const visible = resources.filter(file => role === "admin" ? file.college === "A" : role === "teacher" && file.owner === "Teacher A");
    tbody.replaceChildren();
    for (const file of visible) {
      const row = document.createElement("tr");
      [file.name, `${file.owner} / ${file.college}`, String(file.version)].forEach(value => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.append(cell);
      });
      const stateCell = document.createElement("td");
      const status = document.createElement("span");
      status.className = "status";
      status.dataset.tone = file.state === "approved" ? "green" : file.state === "rejected" ? "coral" : "amber";
      status.textContent = t[file.state];
      stateCell.append(status);
      row.append(stateCell);
      tbody.append(row);
    }
    if (visible.length === 0) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 4;
      cell.className = "demo-empty";
      cell.textContent = t.empty;
      row.append(cell);
      tbody.append(row);
    }
    demo.querySelectorAll("[data-demo-role]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.demoRole === role)));
    const editable = role === "admin" && resources[0].state === "pending";
    demo.querySelectorAll('[data-demo-action="approve"], [data-demo-action="reject"]').forEach(button => { button.disabled = !editable; });
    reason.disabled = !editable;
    demo.querySelector("[data-demo-message]").textContent = (t[message] || t.initial) + messageArgs;
  }
  demo.querySelectorAll("[data-demo-role]").forEach(button => button.addEventListener("click", () => {
    role = button.dataset.demoRole;
    message = "";
    messageArgs = "";
    render();
  }));
  demo.querySelectorAll("[data-demo-action]").forEach(button => button.addEventListener("click", () => {
    const action = button.dataset.demoAction;
    messageArgs = "";
    if (action === "reset") {
      resources[0].state = "pending";
      reason.value = "";
      message = "reset";
    } else if (role !== "admin" || resources[0].state !== "pending") {
      message = "denied";
    } else if (action === "approve") {
      resources[0].state = "approved";
      message = "approvedMessage";
    } else if (!reason.value.trim()) {
      message = "reasonRequired";
    } else {
      resources[0].state = "rejected";
      message = "rejectedMessage";
      messageArgs = reason.value.trim();
    }
    render();
  }));
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  render();
})();
