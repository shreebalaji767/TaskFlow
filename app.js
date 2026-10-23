(() => {
  "use strict";

  const STORAGE_KEY = "taskflow.tasks.v1";
  const THEME_KEY = "taskflow.theme.v1";

  const styles = document.createElement("style");
  styles.textContent = `
    :root{color-scheme:light;--bg:#f5f7fb;--panel:#fff;--text:#172033;--muted:#758098;--line:#e7eaf1;--primary:#4f46e5;--primary-soft:#eeedff;--green:#15966a;--shadow:0 20px 60px rgba(27,39,74,.09)}
    :root[data-theme="dark"]{color-scheme:dark;--bg:#101522;--panel:#181f2e;--text:#eef2ff;--muted:#9aa6bf;--line:#2a3346;--primary:#a5a0ff;--primary-soft:#292746;--green:#57d6a4;--shadow:0 20px 60px rgba(0,0,0,.18)}
    *{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;min-height:100vh;transition:background .2s,color .2s}
    button,input{font:inherit}button{cursor:pointer}button:focus-visible,input:focus-visible{outline:3px solid color-mix(in srgb,var(--primary) 40%,transparent);outline-offset:2px}
    .app{width:min(100% - 32px,760px);margin:0 auto;padding:42px 0 32px}.topbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:36px}
    .brand{display:flex;align-items:center;gap:11px;font-size:21px;font-weight:800;letter-spacing:-.7px}.brand-mark{display:grid;place-items:center;width:40px;height:40px;border-radius:13px;background:var(--primary);color:white}
    .brand-mark svg{width:22px;height:22px}.top-actions{display:flex;gap:9px}.icon-btn{width:42px;height:42px;border:1px solid var(--line);border-radius:13px;background:var(--panel);color:var(--muted);display:grid;place-items:center}.icon-btn:hover{color:var(--text);border-color:var(--muted)}.icon-btn svg{width:19px;height:19px}
    .intro{margin-bottom:25px}.eyebrow{color:var(--primary);font-size:11px;font-weight:800;letter-spacing:1.8px;text-transform:uppercase;margin:0 0 10px}.intro h1{font-size:clamp(30px,6vw,43px);letter-spacing:-1.8px;line-height:1.1;margin:0 0 11px}.subtitle{color:var(--muted);margin:0;font-size:15px;line-height:1.6}
    .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:13px;margin:26px 0}.stat{background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:18px 19px;box-shadow:var(--shadow)}.stat-top{display:flex;align-items:center;justify-content:space-between;color:var(--muted);font-size:12px;font-weight:650}.stat-icon{display:grid;place-items:center;width:30px;height:30px;border-radius:10px;background:var(--primary-soft);color:var(--primary)}.stat-icon svg{width:16px;height:16px}.stat-number{font-size:28px;font-weight:800;letter-spacing:-1px;margin-top:10px}.stat-number.green{color:var(--green)}
    .board{background:var(--panel);border:1px solid var(--line);border-radius:22px;padding:23px;box-shadow:var(--shadow)}.board-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:19px}.board-heading h2{font-size:18px;letter-spacing:-.4px;margin:0}.today{font-size:12px;color:var(--muted);white-space:nowrap}
    .add-form{display:flex;gap:9px;margin-bottom:17px}.task-input,.search-input{width:100%;min-width:0;border:1px solid var(--line);background:var(--bg);color:var(--text);border-radius:12px;padding:13px 14px;outline:none}.task-input:focus,.search-input:focus{border-color:var(--primary)}.add-btn{border:0;border-radius:12px;padding:0 19px;background:var(--primary);color:#fff;font-weight:750;display:flex;align-items:center;justify-content:center;gap:7px;white-space:nowrap}.add-btn:hover{filter:brightness(1.07)}.add-btn svg{width:17px;height:17px}
    .tools{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px}.filters{display:flex;gap:4px;flex-wrap:wrap}.filter-btn{border:0;background:transparent;color:var(--muted);font-size:12px;font-weight:700;border-radius:9px;padding:8px 11px}.filter-btn.active{background:var(--primary-soft);color:var(--primary)}.search-wrap{position:relative;width:180px;flex-shrink:0}.search-wrap svg{position:absolute;left:11px;top:50%;transform:translateY(-50%);width:15px;height:15px;color:var(--muted)}.search-input{padding:9px 10px 9px 33px;font-size:12px;border-radius:10px}
    .task-list{display:grid;gap:9px}.task-item{display:flex;align-items:center;gap:12px;padding:14px 12px;border:1px solid var(--line);border-radius:13px;min-width:0;animation:appear .16s ease}.task-item:hover{border-color:color-mix(in srgb,var(--primary) 40%,var(--line))}.task-check{width:20px;height:20px;flex-shrink:0;appearance:none;border:1.7px solid #c5cada;border-radius:7px;display:grid;place-items:center;margin:0;cursor:pointer}.task-check:checked{background:var(--green);border-color:var(--green)}.task-check:checked:after{content:"✓";font-size:13px;color:white;font-weight:900}.task-copy{min-width:0;flex:1}.task-title{font-size:14px;line-height:1.45;overflow-wrap:anywhere}.task-item.done .task-title{color:var(--muted);text-decoration:line-through}.task-date{font-size:10px;color:var(--muted);margin-top:4px}.task-actions{display:flex;gap:4px;opacity:.65}.task-item:hover .task-actions,.task-actions:focus-within{opacity:1}.mini-btn{width:32px;height:32px;border:0;border-radius:9px;background:transparent;color:var(--muted);display:grid;place-items:center}.mini-btn:hover{background:var(--bg);color:var(--text)}.mini-btn.delete:hover{color:#e05252}.mini-btn svg{width:16px;height:16px}
    .empty{padding:37px 12px 29px;text-align:center}.empty-icon{width:53px;height:53px;margin:0 auto 13px;border-radius:17px;background:var(--primary-soft);color:var(--primary);display:grid;place-items:center}.empty-icon svg{width:25px;height:25px}.empty h3{font-size:15px;margin:0 0 7px}.empty p{font-size:12px;color:var(--muted);margin:0;line-height:1.6}
    .board-footer{display:flex;justify-content:space-between;align-items:center;gap:10px;padding-top:17px;margin-top:15px;border-top:1px solid var(--line);color:var(--muted);font-size:11px}.text-btn{border:0;background:transparent;color:var(--muted);font-size:11px;padding:5px}.text-btn:hover{color:var(--primary)}.text-btn:disabled{opacity:.35;cursor:not-allowed}
    .notice{min-height:20px;margin-top:12px;text-align:center;font-size:11px;color:var(--muted)}.footer{text-align:center;padding:25px 0 0;color:var(--muted);font-size:11px}.footer strong{color:var(--text);font-weight:700}
    .toast{position:fixed;bottom:22px;left:50%;transform:translate(-50%,12px);opacity:0;pointer-events:none;background:var(--text);color:var(--panel);padding:11px 16px;border-radius:12px;font-size:12px;box-shadow:var(--shadow);transition:.2s;max-width:calc(100% - 32px);z-index:5}.toast.show{opacity:1;transform:translate(-50%,0)}
    @keyframes appear{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:translateY(0)}}
    @media(max-width:560px){.app{padding-top:24px}.topbar{margin-bottom:28px}.stats{gap:8px;margin:21px 0}.stat{padding:13px 11px;border-radius:15px}.stat-top{font-size:10px;gap:4px}.stat-icon{width:26px;height:26px}.stat-number{font-size:24px}.board{padding:16px;border-radius:18px}.tools{align-items:stretch;flex-direction:column}.search-wrap{width:100%}.search-input{padding-top:11px;padding-bottom:11px}.add-btn{padding:0 13px}.task-item{padding:11px 8px;gap:9px}.task-actions{opacity:1}.mini-btn{width:28px;height:30px}.today{font-size:10px}.intro h1{letter-spacing:-1.2px}}
    @media(prefers-reduced-motion:reduce){*,*:before,*:after{animation-duration:.01ms!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}
  `;
  document.head.appendChild(styles);

  document.documentElement.dataset.theme = safeGet(THEME_KEY) || "light";
  document.body.innerHTML = `
    <main class="app">
      <header class="topbar">
        <div class="brand"><span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4 4L19 6"/></svg></span>TaskFlow</div>
        <div class="top-actions"><button class="icon-btn" id="theme-toggle" aria-label="Switch theme" title="Switch theme"><span id="theme-icon"></span></button></div>
      </header>
      <section class="intro"><p class="eyebrow">A little progress, every day</p><h1>Your day, organized.</h1><p class="subtitle">Make space for what matters. One task at a time.</p></section>
      <section class="stats" aria-label="Task summary">
        <div class="stat"><div class="stat-top"><span>Total tasks</span><span class="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/></svg></span></div><div class="stat-number" id="total-count">0</div></div>
        <div class="stat"><div class="stat-top"><span>In progress</span><span class="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span></div><div class="stat-number" id="active-count">0</div></div>
        <div class="stat"><div class="stat-top"><span>Completed</span><span class="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4 4L19 6"/></svg></span></div><div class="stat-number green" id="done-count">0</div></div>
      </section>
      <section class="board" aria-labelledby="board-title">
        <div class="board-heading"><h2 id="board-title">Your tasks</h2><span class="today" id="today"></span></div>
        <form class="add-form" id="add-form"><input class="task-input" id="task-input" maxlength="200" autocomplete="off" placeholder="What needs to get done?" aria-label="New task" required><button class="add-btn" type="submit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg><span>Add task</span></button></form>
        <div class="tools"><nav class="filters" aria-label="Filter tasks"><button class="filter-btn active" data-filter="all" type="button">All</button><button class="filter-btn" data-filter="active" type="button">Active</button><button class="filter-btn" data-filter="completed" type="button">Completed</button></nav><label class="search-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/></svg><input class="search-input" id="search-input" type="search" placeholder="Search tasks..." aria-label="Search tasks"></label></div>
        <div class="task-list" id="task-list" aria-live="polite"></div>
        <div class="board-footer"><span id="items-left">Nothing pending yet</span><button class="text-btn" id="clear-completed" type="button">Clear completed</button></div>
      </section>
      <div class="notice" id="storage-note">Your tasks stay in this browser on this device.</div>
      <footer class="footer">Made for a calmer mind · <strong>TaskFlow</strong></footer>
    </main><div class="toast" id="toast" role="status" aria-live="polite"></div>
  `;

  const $ = (selector) => document.querySelector(selector);
  let tasks = loadTasks();
  let filter = "all";
  let query = "";
  let toastTimer;

  const icons = {
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6"/></svg>',
    empty: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>'
  };

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  }
  function loadTasks() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (!Array.isArray(value)) return [];
      return value.filter(t => t && typeof t.id === "string" && typeof t.title === "string")
        .map(t => ({ id: t.id, title: t.title.slice(0, 200), completed: Boolean(t.completed), createdAt: Number(t.createdAt) || Date.now() }));
    } catch (_) { return []; }
  }
  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      $("#storage-note").textContent = "Your tasks stay in this browser on this device.";
    } catch (_) {
      $("#storage-note").textContent = "Browser storage is unavailable. Your tasks may not persist after refreshing.";
    }
  }
  function makeId() {
    return (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2);
  }
  function escapeDate(timestamp) {
    try { return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(new Date(timestamp)); }
    catch (_) { return ""; }
  }
  function showToast(message) {
    const el = $("#toast");
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  }
  function updateStats() {
    const completed = tasks.filter(t => t.completed).length;
    $("#total-count").textContent = tasks.length;
    $("#active-count").textContent = tasks.length - completed;
    $("#done-count").textContent = completed;
    const active = tasks.length - completed;
    $("#items-left").textContent = active === 0 ? (tasks.length ? "All caught up — nice work!" : "Nothing pending yet") : active + (active === 1 ? " task left" : " tasks left");
    $("#clear-completed").disabled = completed === 0;
  }
  function render() {
    updateStats();
    const list = $("#task-list");
    list.replaceChildren();
    const normalized = query.trim().toLowerCase();
    const visible = tasks.filter(t => {
      const matchesFilter = filter === "all" || (filter === "active" && !t.completed) || (filter === "completed" && t.completed);
      return matchesFilter && t.title.toLowerCase().includes(normalized);
    }).sort((a, b) => Number(a.completed) - Number(b.completed) || b.createdAt - a.createdAt);

    if (!visible.length) {
      const empty = document.createElement("div");
      empty.className = "empty";
      const icon = document.createElement("div");
      icon.className = "empty-icon";
      icon.innerHTML = icons.empty;
      const title = document.createElement("h3");
      const message = document.createElement("p");
      if (query.trim()) {
        title.textContent = "No matching tasks";
        message.textContent = "Try a different search term.";
      } else if (filter === "active" && tasks.length) {
        title.textContent = "You're all caught up";
        message.textContent = "There are no active tasks right now.";
      } else if (filter === "completed" && tasks.length) {
        title.textContent = "Nothing completed yet";
        message.textContent = "Completed tasks will show up here.";
      } else {
        title.textContent = "A fresh start";
        message.textContent = "Add your first task above and make today count.";
      }
      empty.append(icon, title, message);
      list.append(empty);
      return;
    }

    visible.forEach(task => {
      const item = document.createElement("article");
      item.className = "task-item" + (task.completed ? " done" : "");
      const check = document.createElement("input");
      check.type = "checkbox";
      check.className = "task-check";
      check.checked = task.completed;
      check.setAttribute("aria-label", (task.completed ? "Mark incomplete: " : "Complete: ") + task.title);
      check.addEventListener("change", () => {
        task.completed = check.checked;
        saveTasks();
        render();
        showToast(task.completed ? "Task completed — well done!" : "Task moved back to active");
      });

      const copy = document.createElement("div");
      copy.className = "task-copy";
      const title = document.createElement("div");
      title.className = "task-title";
      title.textContent = task.title;
      const date = document.createElement("div");
      date.className = "task-date";
      date.textContent = (task.completed ? "Completed · " : "Added · ") + escapeDate(task.createdAt);
      copy.append(title, date);

      const actions = document.createElement("div");
      actions.className = "task-actions";
      const edit = document.createElement("button");
      edit.type = "button";
      edit.className = "mini-btn";
      edit.innerHTML = icons.edit;
      edit.setAttribute("aria-label", "Edit " + task.title);
      edit.title = "Edit task";
      edit.addEventListener("click", () => {
        const updated = window.prompt("Edit your task:", task.title);
        if (updated === null) return;
        const value = updated.trim();
        if (!value) { showToast("Task text cannot be empty"); return; }
        task.title = value.slice(0, 200);
        saveTasks(); render(); showToast("Task updated");
      });
      const del = document.createElement("button");
      del.type = "button";
      del.className = "mini-btn delete";
      del.innerHTML = icons.trash;
      del.setAttribute("aria-label", "Delete " + task.title);
      del.title = "Delete task";
      del.addEventListener("click", () => {
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks(); render(); showToast("Task deleted");
      });
      actions.append(edit, del);
      item.append(check, copy, actions);
      list.append(item);
    });
  }

  $("#add-form").addEventListener("submit", event => {
    event.preventDefault();
    const input = $("#task-input");
    const title = input.value.trim();
    if (!title) { input.focus(); return; }
    tasks.unshift({ id: makeId(), title: title.slice(0, 200), completed: false, createdAt: Date.now() });
    input.value = "";
    filter = "all";
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.toggle("active", btn.dataset.filter === filter));
    saveTasks(); render(); input.focus(); showToast("Task added");
  });

  document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
      filter = button.dataset.filter;
      document.querySelectorAll(".filter-btn").forEach(btn => {
        const active = btn === button;
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-pressed", String(active));
      });
      render();
    });
  });
  $("#search-input").addEventListener("input", event => { query = event.target.value; render(); });
  $("#clear-completed").addEventListener("click", () => {
    const completed = tasks.filter(t => t.completed).length;
    if (!completed) return;
    tasks = tasks.filter(t => !t.completed);
    saveTasks(); render(); showToast("Cleared " + completed + (completed === 1 ? " completed task" : " completed tasks"));
  });
  $("#theme-toggle").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(THEME_KEY, next); } catch (_) {}
    updateThemeIcon();
  });
  function updateThemeIcon() {
    const dark = document.documentElement.dataset.theme === "dark";
    $("#theme-icon").innerHTML = dark ? icons.sun : icons.moon;
    $("#theme-toggle").setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    $("#theme-toggle").title = dark ? "Switch to light theme" : "Switch to dark theme";
  }

  try {
    $("#today").textContent = new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric" }).format(new Date());
  } catch (_) { $("#today").textContent = ""; }
  updateThemeIcon();
  render();
})();