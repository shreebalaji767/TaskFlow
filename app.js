(() => {
  "use strict";

  const STORAGE_KEY = "taskflow.tasks.v1";
  const THEME_KEY = "taskflow.theme.v1";
  const $ = (selector, root) => (root || document).querySelector(selector);
  const $$ = (selector, root) => Array.from((root || document).querySelectorAll(selector));

  const style = document.createElement("style");
  style.textContent = [
    ":root{color-scheme:light;--bg:#f5f6fb;--surface:#fff;--surface-2:#f8f9fd;--text:#20243a;--muted:#7c829a;--line:#e8eaf2;--brand:#6658e8;--brand-2:#f0edff;--green:#15966b;--green-soft:#e5f7ef;--amber:#b76e13;--amber-soft:#fff3dc;--red:#d84e62;--shadow:0 18px 55px rgba(37,42,82,.07);font-synthesis:none}",
    ":root[data-theme=dark]{color-scheme:dark;--bg:#111421;--surface:#191d2d;--surface-2:#202538;--text:#f0f1fb;--muted:#a1a7c0;--line:#30364c;--brand:#a49aff;--brand-2:#302b50;--green:#64ddb0;--green-soft:#183d34;--amber:#ffc76c;--amber-soft:#3c3020;--red:#ff8191;--shadow:0 18px 55px rgba(0,0,0,.18)}",
    "*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;min-height:100vh;background:var(--bg);color:var(--text);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;transition:background .2s,color .2s}button,input,select{font:inherit}button{cursor:pointer}button:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid color-mix(in srgb,var(--brand) 40%,transparent);outline-offset:2px}button:disabled{opacity:.4;cursor:not-allowed}",
    ".app{width:min(100% - 36px,900px);margin:auto;padding:30px 0 34px}.topbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:42px}.brand{display:flex;align-items:center;gap:11px;font-size:20px;font-weight:850;letter-spacing:-.7px}.brand-mark{display:grid;place-items:center;width:42px;height:42px;border-radius:14px;background:var(--brand);color:#fff;box-shadow:0 7px 18px color-mix(in srgb,var(--brand) 25%,transparent)}.brand-mark svg{width:23px;height:23px}.top-right{display:flex;align-items:center;gap:9px}.today-pill{font-size:12px;color:var(--muted);background:var(--surface);border:1px solid var(--line);padding:10px 13px;border-radius:12px}.icon-btn{display:grid;place-items:center;width:42px;height:42px;border:1px solid var(--line);border-radius:13px;background:var(--surface);color:var(--muted)}.icon-btn:hover{color:var(--text);border-color:var(--brand)}.icon-btn svg{width:19px;height:19px}",
    ".hero{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:25px}.eyebrow{margin:0 0 10px;color:var(--brand);font-size:11px;font-weight:850;letter-spacing:1.7px;text-transform:uppercase}.hero h1{margin:0;font-size:clamp(31px,5.5vw,46px);line-height:1.08;letter-spacing:-2px}.hero p.sub{margin:12px 0 0;color:var(--muted);font-size:14px;line-height:1.65}.hero-note{max-width:210px;color:var(--muted);font-size:12px;line-height:1.6;text-align:right}.hero-note strong{display:block;color:var(--text);font-size:13px;margin-bottom:3px}",
    ".stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin:26px 0}.stat{min-width:0;padding:18px 19px;background:var(--surface);border:1px solid var(--line);border-radius:19px;box-shadow:var(--shadow)}.stat-top{display:flex;align-items:center;justify-content:space-between;gap:8px;color:var(--muted);font-size:12px;font-weight:650}.stat-icon{display:grid;place-items:center;width:32px;height:32px;flex-shrink:0;border-radius:11px;background:var(--brand-2);color:var(--brand)}.stat-icon svg{width:17px;height:17px}.stat-number{font-size:30px;font-weight:850;letter-spacing:-1px;margin-top:11px}.stat-number.green{color:var(--green)}.progress-track{height:5px;background:var(--line);border-radius:99px;overflow:hidden;margin-top:12px}.progress-fill{height:100%;width:0;background:var(--green);border-radius:99px;transition:width .25s}",
    ".board{background:var(--surface);border:1px solid var(--line);border-radius:23px;padding:23px;box-shadow:var(--shadow)}.board-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:19px}.board-head h2{font-size:18px;letter-spacing:-.5px;margin:0}.board-caption{font-size:11px;color:var(--muted);margin-top:5px}.export-btn{display:flex;align-items:center;gap:7px;padding:9px 11px;border:1px solid var(--line);border-radius:10px;background:var(--surface);color:var(--muted);font-size:11px;font-weight:750}.export-btn:hover{color:var(--brand);border-color:var(--brand)}.export-btn svg{width:15px;height:15px}.board-head-actions{display:flex;align-items:center;gap:8px}.install-btn[hidden]{display:none}.install-btn{background:var(--brand-2);color:var(--brand);border-color:color-mix(in srgb,var(--brand) 22%,var(--line))}.install-icon{display:grid;place-items:center;width:15px;height:15px;font-size:18px;font-weight:900;line-height:1}",
    ".add-form{display:grid;grid-template-columns:minmax(0,1fr) 132px 145px auto;gap:9px;margin-bottom:17px}.field{width:100%;min-width:0;border:1px solid var(--line);background:var(--surface-2);color:var(--text);border-radius:12px;padding:12px 13px;font-size:13px}.field:focus{outline:none;border-color:var(--brand)}.field::placeholder{color:var(--muted)}.add-btn{display:flex;align-items:center;justify-content:center;gap:7px;padding:0 17px;border:0;border-radius:12px;background:var(--brand);color:#fff;font-size:12px;font-weight:800;white-space:nowrap;min-height:44px}.add-btn:hover{filter:brightness(1.08);transform:translateY(-1px)}.add-btn svg{width:17px;height:17px}",
    ".tools{display:flex;align-items:center;justify-content:space-between;gap:13px;padding:13px 0 16px;border-bottom:1px solid var(--line);margin-bottom:14px}.filters{display:flex;gap:4px;flex-wrap:wrap}.filter-btn{border:0;background:transparent;color:var(--muted);font-size:12px;font-weight:750;border-radius:9px;padding:8px 12px}.filter-btn.active{background:var(--brand-2);color:var(--brand)}.tool-right{display:flex;align-items:center;gap:8px;min-width:0}.search{width:190px;padding:9px 11px;border-radius:10px;font-size:12px}.sort{width:auto;max-width:125px;padding:9px 8px;border-radius:10px;font-size:11px}",
    ".task-list{display:grid;gap:9px}.task-item{display:flex;align-items:center;gap:12px;min-width:0;padding:14px 13px;border:1px solid var(--line);border-radius:14px;background:var(--surface);animation:rise .16s ease;transition:border-color .15s,transform .15s}.task-item:hover{border-color:color-mix(in srgb,var(--brand) 45%,var(--line));transform:translateY(-1px)}.task-item.done{background:var(--surface-2)}.task-check{appearance:none;display:grid;place-items:center;width:21px;height:21px;flex-shrink:0;margin:0;border:1.7px solid #b9bfd2;border-radius:7px;cursor:pointer}.task-check:checked{background:var(--green);border-color:var(--green)}.task-check:checked:after{content:'✓';color:#fff;font-size:13px;font-weight:900}.task-copy{flex:1;min-width:0}.task-title{font-size:13px;line-height:1.5;overflow-wrap:anywhere}.done .task-title{color:var(--muted);text-decoration:line-through}.task-meta{display:flex;align-items:center;flex-wrap:wrap;gap:7px;margin-top:6px;color:var(--muted);font-size:10px}.priority,.due-chip{display:inline-flex;align-items:center;gap:4px;border-radius:6px;padding:4px 7px;font-size:9px;font-weight:800;letter-spacing:.2px}.priority.high{background:color-mix(in srgb,var(--red) 12%,var(--surface));color:var(--red)}.priority.medium{background:var(--amber-soft);color:var(--amber)}.priority.low{background:var(--green-soft);color:var(--green)}.due-chip{background:var(--surface-2);color:var(--muted);border:1px solid var(--line)}.due-chip.overdue{color:var(--red);background:color-mix(in srgb,var(--red) 10%,var(--surface));border-color:color-mix(in srgb,var(--red) 25%,var(--line))}.task-actions{display:flex;align-items:center;gap:3px;flex-shrink:0}.mini-btn{display:grid;place-items:center;width:32px;height:32px;border:0;border-radius:9px;background:transparent;color:var(--muted)}.mini-btn:hover{background:var(--surface-2);color:var(--brand)}.mini-btn.delete:hover{color:var(--red)}.mini-btn svg{width:16px;height:16px}",
    ".empty{padding:42px 12px 35px;text-align:center}.empty-icon{display:grid;place-items:center;width:56px;height:56px;margin:0 auto 14px;border-radius:18px;background:var(--brand-2);color:var(--brand)}.empty-icon svg{width:26px;height:26px}.empty h3{font-size:15px;margin:0 0 7px}.empty p{max-width:280px;margin:0 auto;color:var(--muted);font-size:12px;line-height:1.65}.board-footer{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:16px;margin-top:15px;border-top:1px solid var(--line);color:var(--muted);font-size:11px}.text-btn{border:0;background:transparent;color:var(--muted);font-size:11px;font-weight:700;padding:6px}.text-btn:hover{color:var(--brand)}.storage-note{display:flex;align-items:center;justify-content:center;gap:7px;margin:16px 0 0;color:var(--muted);font-size:11px;text-align:center}.storage-note svg{width:14px;height:14px}.footer{text-align:center;padding:26px 0 0;color:var(--muted);font-size:11px}.footer strong{color:var(--text)}",
    ".toast{position:fixed;bottom:22px;left:50%;z-index:10;max-width:calc(100% - 30px);padding:11px 16px;border-radius:12px;background:var(--text);color:var(--surface);font-size:12px;box-shadow:var(--shadow);opacity:0;pointer-events:none;transform:translate(-50%,12px);transition:opacity .2s,transform .2s}.toast.show{opacity:1;transform:translate(-50%,0)}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}",
    "@keyframes rise{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}@media(max-width:760px){.add-form{grid-template-columns:minmax(0,1fr) minmax(110px, .6fr);}.add-form .field:first-child{grid-column:1/-1}.add-btn{min-height:43px}.tools{align-items:flex-start;flex-direction:column}.tool-right{width:100%}.search{flex:1;width:auto}.sort{max-width:140px}}@media(max-width:520px){.app{width:min(100% - 24px,900px);padding-top:20px}.topbar{margin-bottom:30px}.today-pill{display:none}.hero{align-items:flex-start}.hero-note{display:none}.hero h1{letter-spacing:-1.4px}.stats{gap:8px;margin:21px 0}.stat{padding:13px 11px;border-radius:15px}.stat-top{font-size:10px}.stat-icon{width:27px;height:27px}.stat-number{font-size:25px}.board{padding:15px;border-radius:18px}.board-head{align-items:flex-start}.export-btn{padding:8px}.export-btn span:not(.install-icon){display:none}.board-head-actions{gap:5px}.install-icon{display:grid!important}.add-form{grid-template-columns:1fr 1fr;gap:8px}.add-form .field:first-child{grid-column:1/-1}.add-form .field{font-size:12px}.add-btn{grid-column:1/-1}.task-item{padding:11px 8px;gap:9px}.task-actions{gap:0}.mini-btn{width:29px;height:30px}.task-meta{gap:5px}.filter-btn{padding:8px 10px}.board-footer{align-items:flex-start}.sort{max-width:120px}}@media(prefers-reduced-motion:reduce){*,*:before,*:after{animation-duration:.01ms!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}"
  ].join("\n");
  document.head.appendChild(style);

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  }
  function makeId() {
    return window.crypto && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2);
  }
  function validTask(task) {
    return task && typeof task.id === "string" && typeof task.title === "string";
  }
  function loadTasks() {
    try {
      var saved = JSON.parse(safeGet(STORAGE_KEY) || "[]");
      if (!Array.isArray(saved)) return [];
      return saved.filter(validTask).map(function (task) {
        return {
          id: task.id,
          title: task.title.slice(0, 200),
          completed: Boolean(task.completed),
          createdAt: Number(task.createdAt) || Date.now(),
          priority: ["low", "medium", "high"].includes(task.priority) ? task.priority : "medium",
          dueDate: typeof task.dueDate === "string" ? task.dueDate : ""
        };
      });
    } catch (_) { return []; }
  }
  let tasks = loadTasks();
  let filter = "all";
  let query = "";
  let sortBy = "newest";
  let toastTimer = null;

  const icons = {
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4 4L19 6"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    done: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4 4L19 6"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6"/></svg>',
    export: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m-5-5 5 5 5-5"/><path d="M5 17v4h14v-4"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
    empty: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4 4L19 6"/><path d="M21 12a9 9 0 1 1-5.2-8.2"/></svg>'
  };

  function addElement(parent, tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    parent.appendChild(el);
    return el;
  }

  document.documentElement.dataset.theme = safeGet(THEME_KEY) === "dark" ? "dark" : "light";
  document.body.innerHTML = [
    '<main class="app">',
    ' <header class="topbar">',
    '  <div class="brand"><span class="brand-mark" aria-hidden="true">' + icons.check + '</span><span>TaskFlow</span></div>',
    '  <div class="top-right"><span class="today-pill" id="today-pill"></span><button class="icon-btn" id="theme-toggle" type="button" aria-label="Switch to dark theme" title="Switch theme"><span id="theme-icon"></span></button></div>',
    ' </header>',
    ' <section class="hero"><div><p class="eyebrow">A little progress, every day</p><h1 id="greeting">Your day, organized.</h1><p class="sub">Make space for what matters. One task at a time.</p></div><div class="hero-note"><strong id="hero-count">Small steps add up.</strong><span>Focus on progress, not perfection.</span></div></section>',
    ' <section class="stats" aria-label="Task summary">',
    '  <article class="stat"><div class="stat-top"><span>Total tasks</span><span class="stat-icon">' + icons.list + '</span></div><div class="stat-number" id="total-count">0</div><div class="progress-track"><div class="progress-fill" id="progress-fill"></div></div></article>',
    '  <article class="stat"><div class="stat-top"><span>In progress</span><span class="stat-icon">' + icons.clock + '</span></div><div class="stat-number" id="active-count">0</div></article>',
    '  <article class="stat"><div class="stat-top"><span>Completed</span><span class="stat-icon">' + icons.done + '</span></div><div class="stat-number green" id="done-count">0</div></article>',
    ' </section>',
    ' <section class="board" aria-labelledby="board-title">',
    '  <div class="board-head"><div><h2 id="board-title">Your tasks</h2><div class="board-caption">Capture it, prioritize it, get it done.</div></div><div class="board-head-actions"><button class="export-btn install-btn" id="install-btn" type="button" hidden><span class="install-icon">↓</span><span>Install app</span></button><button class="export-btn" id="import-btn" type="button">↥<span>Import backup</span></button><input id="import-input" type="file" accept="application/json,.json" hidden><button class="export-btn" id="export-btn" type="button">' + icons.export + '<span>Export tasks</span></button></div></div>',
    '  <form class="add-form" id="add-form"><label class="sr-only" for="task-input">Task name</label><input class="field" id="task-input" maxlength="200" autocomplete="off" placeholder="What needs to get done?" required><label class="sr-only" for="priority-input">Priority</label><select class="field" id="priority-input"><option value="medium">◈ Medium priority</option><option value="high">▲ High priority</option><option value="low">▽ Low priority</option></select><label class="sr-only" for="due-input">Due date</label><input class="field" id="due-input" type="date" aria-label="Optional due date"><button class="add-btn" type="submit">' + icons.check + '<span>Add task</span></button></form>',
    '  <div class="tools"><nav class="filters" aria-label="Filter tasks"><button class="filter-btn active" data-filter="all" type="button" aria-pressed="true">All</button><button class="filter-btn" data-filter="active" type="button" aria-pressed="false">Active</button><button class="filter-btn" data-filter="completed" type="button" aria-pressed="false">Completed</button></nav><div class="tool-right"><label class="sr-only" for="search-input">Search tasks</label><input class="field search" id="search-input" type="search" placeholder="Search tasks..."><label class="sr-only" for="sort-select">Sort tasks</label><select class="field sort" id="sort-select"><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="priority">Priority</option><option value="due">Due date</option></select></div></div>',
    '  <div class="task-list" id="task-list" aria-live="polite"></div>',
    '  <div class="board-footer"><span id="items-left">Nothing pending yet</span><button class="text-btn" id="clear-completed" type="button" disabled>Clear completed</button></div>',
    ' </section>',
    ' <div class="storage-note" id="storage-note">' + icons.lock + '<span>Your tasks are saved in this browser on this device.</span></div>',
    ' <footer class="footer">A calmer mind starts with a clear list · <strong>TaskFlow</strong></footer>',
    '</main><div class="toast" id="toast" role="status" aria-live="polite"></div>'
  ].join("");
  const dateNow = new Date();
  $("#today-pill").textContent = new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric" }).format(dateNow);
  const hour = dateNow.getHours();
  $("#greeting").textContent = hour < 12 ? "Good morning." : hour < 18 ? "Good afternoon." : "Good evening.";

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      $("#storage-note").innerHTML = icons.lock + "<span>Your tasks are saved in this browser on this device.</span>";
    } catch (_) {
      $("#storage-note").textContent = "Browser storage is unavailable. Your tasks may not persist after refreshing.";
    }
  }
  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2300);
  }
  function formatDate(value) {
    if (!value) return "";
    try {
      return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(new Date(value + "T12:00:00"));
    } catch (_) { return value; }
  }
  function isOverdue(task) {
    if (!task.dueDate || task.completed) return false;
    const today = new Date();
    const todayKey = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + String(today.getDate()).padStart(2, "0");
    return task.dueDate < todayKey;
  }
  function updateStats() {
    const completed = tasks.filter(function (task) { return task.completed; }).length;
    const active = tasks.length - completed;
    $("#total-count").textContent = tasks.length;
    $("#active-count").textContent = active;
    $("#done-count").textContent = completed;
    $("#progress-fill").style.width = (tasks.length ? Math.round(completed / tasks.length * 100) : 0) + "%";
    $("#items-left").textContent = active === 0 ? (tasks.length ? "All caught up — nice work!" : "Nothing pending yet") : active + (active === 1 ? " task left" : " tasks left");
    $("#clear-completed").disabled = completed === 0;
    $("#hero-count").textContent = tasks.length ? (completed === tasks.length ? "Everything is done. Nice!" : Math.round(completed / tasks.length * 100) + "% of tasks complete") : "Small steps add up.";
  }
  function render() {
    updateStats();
    const list = $("#task-list");
    list.replaceChildren();
    const normalized = query.trim().toLowerCase();
    let visible = tasks.filter(function (task) {
      const filterMatch = filter === "all" || (filter === "active" && !task.completed) || (filter === "completed" && task.completed);
      return filterMatch && task.title.toLowerCase().includes(normalized);
    });
    visible.sort(function (a, b) {
      if (a.completed !== b.completed) return Number(a.completed) - Number(b.completed);
      if (sortBy === "oldest") return a.createdAt - b.createdAt;
      if (sortBy === "priority") {
        const rank = { high: 0, medium: 1, low: 2 };
        return rank[a.priority] - rank[b.priority] || b.createdAt - a.createdAt;
      }
      if (sortBy === "due") return (a.dueDate || "9999-99-99").localeCompare(b.dueDate || "9999-99-99") || b.createdAt - a.createdAt;
      return b.createdAt - a.createdAt;
    });

    if (!visible.length) {
      const empty = addElement(list, "div", "empty");
      const icon = addElement(empty, "div", "empty-icon");
      icon.innerHTML = icons.empty;
      let title = "A fresh start";
      let message = "Add your first task above and make today count.";
      if (normalized) { title = "No matching tasks"; message = "Try another search phrase or clear your search."; }
      else if (filter === "active" && tasks.length) { title = "You're all caught up"; message = "There are no active tasks right now."; }
      else if (filter === "completed" && tasks.length) { title = "Nothing completed yet"; message = "Finished tasks will appear here."; }
      addElement(empty, "h3", "", title);
      addElement(empty, "p", "", message);
      return;
    }

    visible.forEach(function (task) {
      const item = addElement(list, "article", "task-item" + (task.completed ? " done" : ""));
      const check = addElement(item, "input", "task-check");
      check.type = "checkbox";
      check.checked = task.completed;
      check.setAttribute("aria-label", (task.completed ? "Mark incomplete: " : "Complete: ") + task.title);
      check.addEventListener("change", function () {
        task.completed = check.checked;
        saveTasks(); render();
        showToast(task.completed ? "Task completed — well done!" : "Task moved back to active");
      });

      const copy = addElement(item, "div", "task-copy");
      addElement(copy, "div", "task-title", task.title);
      const meta = addElement(copy, "div", "task-meta");
      const priorityLabel = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
      addElement(meta, "span", "priority " + task.priority, priorityLabel + " priority");
      addElement(meta, "span", "", (task.completed ? "Completed" : "Added") + " · " + formatDate(new Date(task.createdAt).toISOString().slice(0, 10)));
      if (task.dueDate) {
        addElement(meta, "span", "due-chip" + (isOverdue(task) ? " overdue" : ""), (isOverdue(task) ? "Overdue · " : "Due · ") + formatDate(task.dueDate));
      }

      const actions = addElement(item, "div", "task-actions");
      const edit = addElement(actions, "button", "mini-btn");
      edit.type = "button"; edit.innerHTML = icons.edit; edit.title = "Edit task"; edit.setAttribute("aria-label", "Edit " + task.title);
      edit.addEventListener("click", function () {
        const nextTitle = window.prompt("Edit task name:", task.title);
        if (nextTitle === null) return;
        const value = nextTitle.trim();
        if (!value) { showToast("Task name cannot be empty"); return; }
        task.title = value.slice(0, 200);
        const nextPriority = window.prompt("Priority: high, medium, or low", task.priority);
        if (nextPriority !== null && ["high", "medium", "low"].includes(nextPriority.trim().toLowerCase())) task.priority = nextPriority.trim().toLowerCase();
        const nextDue = window.prompt("Due date (YYYY-MM-DD), or leave blank", task.dueDate || "");
        if (nextDue !== null && (!nextDue.trim() || /^\d{4}-\d{2}-\d{2}$/.test(nextDue.trim()))) task.dueDate = nextDue.trim();
        saveTasks(); render(); showToast("Task updated");
      });
      const del = addElement(actions, "button", "mini-btn delete");
      del.type = "button"; del.innerHTML = icons.trash; del.title = "Delete task"; del.setAttribute("aria-label", "Delete " + task.title);
      del.addEventListener("click", function () {
        if (!window.confirm("Delete this task?")) return;
        tasks = tasks.filter(function (entry) { return entry.id !== task.id; });
        saveTasks(); render(); showToast("Task deleted");
      });
      list.appendChild(item);
    });
  }

  $("#add-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const input = $("#task-input");
    const title = input.value.trim();
    if (!title) { input.focus(); return; }
    tasks.unshift({
      id: makeId(),
      title: title.slice(0, 200),
      completed: false,
      createdAt: Date.now(),
      priority: $("#priority-input").value,
      dueDate: $("#due-input").value
    });
    input.value = "";
    $("#due-input").value = "";
    $("#priority-input").value = "medium";
    filter = "all";
    $$(".filter-btn").forEach(function (button) {
      const active = button.dataset.filter === filter;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    saveTasks(); render(); input.focus(); showToast("Task added to your list");
  });
  $$(".filter-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      filter = button.dataset.filter;
      $$(".filter-btn").forEach(function (entry) {
        const active = entry === button;
        entry.classList.toggle("active", active);
        entry.setAttribute("aria-pressed", String(active));
      });
      render();
    });
  });
  $("#search-input").addEventListener("input", function (event) { query = event.target.value; render(); });
  $("#sort-select").addEventListener("change", function (event) { sortBy = event.target.value; render(); });
  $("#clear-completed").addEventListener("click", function () {
    const count = tasks.filter(function (task) { return task.completed; }).length;
    if (!count || !window.confirm("Remove " + count + " completed " + (count === 1 ? "task" : "tasks") + "?")) return;
    tasks = tasks.filter(function (task) { return !task.completed; });
    saveTasks(); render(); showToast("Completed tasks cleared");
  });
  $("#theme-toggle").addEventListener("click", function () {
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
  $("#import-btn").addEventListener("click", function () {
    $("#import-input").click();
  });
  $("#import-input").addEventListener("change", async function (event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      const imported = Array.isArray(parsed) ? parsed : parsed && Array.isArray(parsed.tasks) ? parsed.tasks : null;
      if (!imported) throw new Error("This file does not contain a TaskFlow task list.");
      const cleaned = imported.filter(function (task) {
        return task && typeof task.title === "string" && task.title.trim();
      }).map(function (task) {
        const dueDate = typeof task.dueDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(task.dueDate) ? task.dueDate : "";
        return {
          id: typeof task.id === "string" && task.id ? task.id : makeId(),
          title: task.title.trim().slice(0, 200),
          completed: Boolean(task.completed),
          createdAt: Number(task.createdAt) || Date.now(),
          priority: ["low", "medium", "high"].includes(task.priority) ? task.priority : "medium",
          dueDate: dueDate
        };
      });
      if (!cleaned.length && imported.length) throw new Error("No valid tasks were found in this backup.");
      if (!window.confirm("Restore " + cleaned.length + " task(s) from this backup? This replaces the current task list.")) return;
      tasks = cleaned;
      saveTasks();
      render();
      showToast("Backup restored successfully");
    } catch (error) {
      window.alert("Could not import this backup. Please choose a valid TaskFlow JSON export.\\n\\n" + (error.message || "Unknown error"));
    } finally {
      event.target.value = "";
    }
  });

  $("#export-btn").addEventListener("click", function () {
    const payload = JSON.stringify({ exportedAt: new Date().toISOString(), app: "TaskFlow", tasks: tasks }, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "taskflow-tasks.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast("Your task backup is ready");
  });
  document.addEventListener("keydown", function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault(); $("#search-input").focus();
    }
    if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
      event.preventDefault(); $("#search-input").focus();
    }
  });

  let deferredInstallPrompt = null;
  const installButton = $("#install-btn");
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;

  function setInstallButton(label, visible) {
    installButton.lastElementChild.textContent = label;
    installButton.hidden = !visible;
  }
  if (isStandalone) {
    setInstallButton("App installed", true);
    installButton.disabled = true;
    installButton.title = "TaskFlow is already installed on this device";
  } else {
    setInstallButton("Install app", true);
    window.addEventListener("beforeinstallprompt", function (event) {
      event.preventDefault();
      deferredInstallPrompt = event;
      setInstallButton("Install app", true);
      installButton.title = "Install TaskFlow on your device";
    });
    window.addEventListener("appinstalled", function () {
      deferredInstallPrompt = null;
      setInstallButton("App installed", true);
      installButton.disabled = true;
      showToast("TaskFlow installed successfully");
    });
    installButton.addEventListener("click", async function () {
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        const result = await deferredInstallPrompt.userChoice;
        deferredInstallPrompt = null;
        if (result && result.outcome === "accepted") {
          showToast("Thanks for installing TaskFlow!");
        } else {
          showToast("You can install TaskFlow whenever you're ready");
        }
        return;
      }
      const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
      if (isIOS) {
        window.alert("To install TaskFlow on iPhone or iPad:\n1. Open this page in Safari.\n2. Tap the Share button.\n3. Choose “Add to Home Screen”.\n4. Tap Add.");
      } else {
        window.alert("If your browser supports installation, use the install icon in the address bar or open the browser menu and choose “Install TaskFlow” or “Install app”. If that option is not available yet, make sure you are online and refresh this page.");
      }
    });
  }

  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("./sw.js").catch(function (error) {
        console.warn("TaskFlow offline support could not be enabled:", error);
      });
    });
  }

  updateThemeIcon();
  render();
})();