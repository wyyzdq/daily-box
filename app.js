const STORAGE_KEY = "daily-box-v1-state";
const CLOUD_CONFIG_KEY = "daily-box-cloud-config";
const CLOUD_META_KEY = "daily-box-cloud-meta";
const DEFAULT_CLOUD_CONFIG = {
  url: "https://rkhumtykgijdwrjtpomn.supabase.co",
  anonKey: "sb_publishable_FWyrLRq60HJYsqD2UNC6nA_vHNPR3rO",
};
const PUBLIC_APP_URL = "https://graceful-gelato-458c22.netlify.app/";

const defaultModules = {
  cycle: { title: "女性健康", mark: "●", color: "var(--rose-strong)" },
  todos: { title: "今日待办", mark: "●", color: "var(--accent)" },
  tarot: { title: "今日一抽", mark: "●", color: "var(--violet)" },
  journal: { title: "今日小记", mark: "●", color: "#c66f5d" },
};

const builtInModules = {
  mood: { id: "mood", name: "心情", title: "心情", mark: "●", color: "var(--rose-strong)", builtIn: true },
  fitness: { id: "fitness", name: "健身", title: "健身", mark: "●", color: "var(--green)", builtIn: true },
  study: { id: "study", name: "学习", title: "学习", mark: "●", color: "var(--blue)", builtIn: true },
  outing: { id: "outing", name: "外出", title: "外出", mark: "●", color: "var(--gold)", builtIn: true },
};

const customFieldTypes = {
  boolean: "开关",
  number: "数字",
  text: "文本",
  tags: "标签",
  rating: "评分",
};

const tarotDeck = [
  ["fool", "愚者", ["开始", "轻盈", "冒险"], "给今天留一点即兴的空间。"],
  ["magician", "魔术师", ["行动", "创造", "资源"], "你已经有了开始所需的东西。"],
  ["priestess", "女祭司", ["直觉", "安静", "观察"], "先听听自己的感觉。"],
  ["empress", "皇后", ["滋养", "丰盛", "照顾"], "把自己也放进照顾名单里。"],
  ["emperor", "皇帝", ["秩序", "边界", "稳定"], "给今天一点清楚的结构。"],
  ["hierophant", "教皇", ["学习", "传统", "指引"], "向一个可靠的方法借力。"],
  ["lovers", "恋人", ["选择", "连接", "真诚"], "做一个更靠近真实需要的选择。"],
  ["chariot", "战车", ["推进", "专注", "掌控"], "选定方向，然后稳稳往前。"],
  ["strength", "力量", ["温柔", "韧性", "耐心"], "不用用力过猛，也能很有力量。"],
  ["hermit", "隐者", ["独处", "沉淀", "寻找"], "给自己一点不被打扰的时间。"],
  ["wheel", "命运之轮", ["变化", "转机", "流动"], "变化正在发生，先跟上节奏。"],
  ["justice", "正义", ["平衡", "判断", "负责"], "看清事实，再做决定。"],
  ["hanged", "倒吊人", ["暂停", "换角度", "等待"], "慢一点，可能会看到新答案。"],
  ["death", "死神", ["结束", "更新", "放下"], "有些旧东西可以温柔地告别。"],
  ["temperance", "节制", ["平衡", "耐心", "调整"], "今天适合把节奏调匀。"],
  ["devil", "恶魔", ["束缚", "欲望", "看见"], "留意什么正在偷偷消耗你。"],
  ["tower", "高塔", ["打破", "真相", "重建"], "不稳的地方，也许正需要被看见。"],
  ["star", "星星", ["希望", "疗愈", "清澈"], "给未来一点信任。"],
  ["moon", "月亮", ["情绪", "梦境", "不确定"], "不急着解释所有感受。"],
  ["sun", "太阳", ["明亮", "坦然", "活力"], "允许自己拥有明亮的一刻。"],
  ["judgement", "审判", ["醒来", "回应", "召唤"], "回应那个已经出现很久的声音。"],
  ["world", "世界", ["完成", "整合", "圆满"], "看见你已经走过的路。"],
  ["wands-ace", "权杖王牌", ["灵感", "火花", "启动"], "有一个念头值得被点燃。"],
  ["wands-2", "权杖二", ["计划", "远方", "选择"], "先看远一点，再决定下一步。"],
  ["wands-3", "权杖三", ["等待", "扩展", "视野"], "你已经把某件事送上了路。"],
  ["wands-4", "权杖四", ["庆祝", "安定", "归属"], "给完成的小阶段一点掌声。"],
  ["wands-5", "权杖五", ["摩擦", "竞争", "练习"], "分歧不一定是坏事，它也在磨合。"],
  ["wands-6", "权杖六", ["认可", "胜利", "看见"], "今天可以允许自己被看见。"],
  ["wands-7", "权杖七", ["坚持", "防守", "立场"], "守住你真正想守住的东西。"],
  ["wands-8", "权杖八", ["加速", "消息", "推进"], "事情可能比想象中更快流动。"],
  ["wands-9", "权杖九", ["警觉", "韧性", "边界"], "你已经撑过很多，别忘了照顾自己。"],
  ["wands-10", "权杖十", ["压力", "承担", "卸下"], "有些重量可以不用一个人扛。"],
  ["wands-page", "权杖侍从", ["探索", "热情", "尝试"], "保持好奇，先试试看。"],
  ["wands-knight", "权杖骑士", ["冲劲", "冒险", "行动"], "热情很好，也记得看路。"],
  ["wands-queen", "权杖王后", ["自信", "魅力", "温暖"], "把自己的光亮放出来一点。"],
  ["wands-king", "权杖国王", ["领导", "愿景", "掌控"], "用清楚的方向带动今天。"],
  ["cups-ace", "圣杯王牌", ["感受", "敞开", "滋养"], "新的情绪正在冒出来，温柔接住它。"],
  ["cups-2", "圣杯二", ["连接", "互相", "靠近"], "真诚的回应会让关系更近一点。"],
  ["cups-3", "圣杯三", ["友情", "庆祝", "分享"], "适合把快乐分给别人一点。"],
  ["cups-4", "圣杯四", ["倦怠", "停顿", "忽略"], "你可能需要换个角度看眼前的礼物。"],
  ["cups-5", "圣杯五", ["失落", "遗憾", "转身"], "允许难过，也别忘了还剩下什么。"],
  ["cups-6", "圣杯六", ["回忆", "童心", "旧事"], "过去的柔软也可以滋养现在。"],
  ["cups-7", "圣杯七", ["幻想", "选择", "迷雾"], "选项很多时，先问真正想要什么。"],
  ["cups-8", "圣杯八", ["离开", "寻找", "成长"], "有些离开，是为了更靠近自己。"],
  ["cups-9", "圣杯九", ["满足", "愿望", "享受"], "给已经拥有的东西一点感谢。"],
  ["cups-10", "圣杯十", ["圆满", "家人", "幸福"], "安稳的幸福也值得认真感受。"],
  ["cups-page", "圣杯侍从", ["敏感", "灵感", "心意"], "小小的心动也有它的意义。"],
  ["cups-knight", "圣杯骑士", ["浪漫", "邀请", "表达"], "把心里的话说得柔软一点。"],
  ["cups-queen", "圣杯王后", ["共情", "照顾", "直觉"], "温柔不是软弱，是很深的力量。"],
  ["cups-king", "圣杯国王", ["成熟", "稳定", "包容"], "情绪可以被看见，也可以被安放。"],
  ["swords-ace", "宝剑王牌", ["清晰", "真相", "决定"], "把事情说清楚，路会亮一点。"],
  ["swords-2", "宝剑二", ["僵持", "权衡", "暂停"], "还没准备好决定，也是一种信息。"],
  ["swords-3", "宝剑三", ["刺痛", "失望", "释放"], "疼痛在提醒你，有些东西需要被处理。"],
  ["swords-4", "宝剑四", ["休息", "恢复", "静养"], "先停下来，答案不急着出现。"],
  ["swords-5", "宝剑五", ["争执", "代价", "退让"], "赢了争论，不一定赢得自己。"],
  ["swords-6", "宝剑六", ["过渡", "离岸", "前行"], "慢慢离开旧状态，已经是在前进。"],
  ["swords-7", "宝剑七", ["策略", "隐藏", "绕路"], "看清自己的动机，也看清别人的边界。"],
  ["swords-8", "宝剑八", ["受限", "困住", "松绑"], "也许限制没有你想的那么牢。"],
  ["swords-9", "宝剑九", ["焦虑", "失眠", "担忧"], "把脑内风暴写下来，会轻一点。"],
  ["swords-10", "宝剑十", ["结束", "低谷", "翻篇"], "最难的地方，也可能是转折点。"],
  ["swords-page", "宝剑侍从", ["观察", "学习", "警觉"], "保持清醒，也保持开放。"],
  ["swords-knight", "宝剑骑士", ["快速", "直接", "突破"], "行动很快时，更要留一点余地。"],
  ["swords-queen", "宝剑王后", ["理性", "边界", "诚实"], "清楚地表达，会保护你的柔软。"],
  ["swords-king", "宝剑国王", ["判断", "规则", "决策"], "用理智给混乱一点秩序。"],
  ["pentacles-ace", "星币王牌", ["机会", "现实", "种子"], "一个实际的开始值得认真对待。"],
  ["pentacles-2", "星币二", ["平衡", "调度", "弹性"], "今天适合在变化里找到节奏。"],
  ["pentacles-3", "星币三", ["合作", "技艺", "建设"], "一起完成，会比独自硬撑更好。"],
  ["pentacles-4", "星币四", ["保守", "安全", "掌控"], "安全感重要，但别握得太紧。"],
  ["pentacles-5", "星币五", ["匮乏", "低潮", "求助"], "困难时，允许自己向外求援。"],
  ["pentacles-6", "星币六", ["给予", "接受", "公平"], "能量需要流动，关系也是。"],
  ["pentacles-7", "星币七", ["等待", "评估", "耕耘"], "你种下的东西正在慢慢长。"],
  ["pentacles-8", "星币八", ["练习", "专注", "精进"], "重复的小事，也在把你带远。"],
  ["pentacles-9", "星币九", ["独立", "丰盛", "自足"], "享受自己努力换来的安稳。"],
  ["pentacles-10", "星币十", ["积累", "传承", "长期"], "把目光放长一点，会看见更大的图景。"],
  ["pentacles-page", "星币侍从", ["学习", "踏实", "新机会"], "从一个具体的小行动开始。"],
  ["pentacles-knight", "星币骑士", ["稳定", "耐心", "执行"], "慢也没关系，重要的是持续。"],
  ["pentacles-queen", "星币王后", ["照料", "安稳", "丰饶"], "照顾现实生活，也是在照顾心。"],
  ["pentacles-king", "星币国王", ["可靠", "成果", "资源"], "把资源用在真正重要的地方。"],
].map(([id, cardName, keywords, message]) => ({ id, cardName, keywords, message }));

let state = loadState();
let view = "today";
let selectedDate = todayKey();
let calendarCursor = new Date();
let calendarFilter = "all";
let activeSheet = null;
let timerTicker = null;
let cloudClient = null;
let cloudSession = null;
let cloudSyncTimer = null;
let initialCloudSyncDone = false;

function loadState() {
  try {
    return normalizeState(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  } catch {
    return normalizeState();
  }
}

function normalizeState(loaded = {}) {
  const empty = {
    entries: {},
    cycles: [],
    todos: [],
    customModules: [],
    settings: {
      theme: "avocado",
      reminderEnabled: false,
      reminderTime: "21:30",
      hiddenDefaultModules: [],
      hiddenHistoryModules: [],
      moodOptions: ["很开心", "开心", "平静", "低落", "难过"],
      moodTagOptions: ["工作", "朋友", "家人", "独处", "天气"],
      fitnessOptions: ["散步", "跑步", "力量", "瑜伽", "羽毛球", "其他"],
      fitnessFeelings: ["轻松", "一般", "累", "很爽"],
      studyTypes: ["课程", "论文", "语言", "考试", "其他"],
      outingTypes: ["吃饭", "逛街", "旅行", "看展", "散步", "其他"],
      flowOptions: ["少", "中", "多"],
      symptomOptions: ["腹痛", "腰酸", "疲惫", "情绪波动", "头痛", "乳房胀痛", "长痘", "食欲变化", "失眠", "恶心"],
      cycleMoodOptions: ["稳定", "敏感", "烦躁", "低落"],
      todoTagOptions: ["生活", "学习", "工作", "购物"],
      cycleLengthDays: 28,
    },
    timers: {},
  };
  const settings = { ...empty.settings, ...(loaded.settings || {}) };
  if (["warm", "leaf", "sky"].includes(settings.theme)) settings.theme = "avocado";
  return {
    ...empty,
    ...loaded,
    entries: loaded.entries || {},
    cycles: loaded.cycles || [],
    todos: loaded.todos || [],
    customModules: loaded.customModules || [],
    settings,
    timers: loaded.timers || {},
  };
}

function allModules() {
  const builtIns = Object.fromEntries(
    Object.entries(builtInModules).filter(([id]) => !(state.settings.hiddenBuiltInModules || []).includes(id) && !(state.settings.deletedBuiltInModules || []).includes(id)),
  );
  const custom = Object.fromEntries(
    state.customModules
      .filter((module) => module.isEnabled !== false && module.isDeleted !== true)
      .map((module) => [`custom:${module.id}`, { ...module, title: module.name, mark: module.icon || "＋", color: module.color || "var(--violet)", custom: true }]),
  );
  return { ...builtIns, ...custom };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  markLocalChanged();
  queueCloudSync();
}

function todayKey() {
  return formatDate(new Date());
}

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseDate(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function addDays(key, days) {
  const date = parseDate(key);
  date.setDate(date.getDate() + days);
  return formatDate(date);
}

function addMonths(key, months) {
  const date = parseDate(key);
  date.setMonth(date.getMonth() + months);
  return formatDate(date);
}

function diffDays(a, b) {
  return Math.round((parseDate(a) - parseDate(b)) / 86400000);
}

function dateLabel(key) {
  const date = parseDate(key);
  return `${date.getMonth() + 1}月${date.getDate()}日 周${"日一二三四五六"[date.getDay()]}`;
}

function getEntry(key) {
  if (!state.entries[key]) {
    state.entries[key] = { date: key, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  }
  return state.entries[key];
}

function touchEntry(key) {
  getEntry(key).updatedAt = new Date().toISOString();
  saveState();
}

function render() {
  const app = document.querySelector("#app");
  app.dataset.theme = state.settings.theme;
  updateThemeColor(state.settings.theme);
  app.innerHTML = `${renderScreen()}${renderNav()}${activeSheet ? renderSheet() : ""}`;
  bindEvents();
  syncTimerTicker();
}

function renderScreen() {
  if (view === "calendar") return renderCalendar();
  if (view === "modules") return renderModules();
  if (view === "mine") return renderMine();
  return renderToday();
}

function renderToday() {
  const key = todayKey();
  const entry = getEntry(key);
  return `
    <main class="screen">
      <header class="topbar">
        <div>
          <h1 class="brand">日常盒子</h1>
          <div class="subtle">今天也可以只记录一点点</div>
        </div>
        <div class="date-pill">${dateLabel(key)}</div>
      </header>
      <div class="stack">
        ${systemModuleVisible("tarot") ? renderTarot(entry, key) : ""}
        <section class="grid-2">
          ${Object.keys(allModules()).map((type) => renderRecordCard(type, getRecord(entry, type), key)).join("")}
        </section>
        ${systemModuleVisible("cycle") ? renderHealthCard(key) : ""}
        ${systemModuleVisible("todos") ? renderTodoCard(key) : ""}
        ${systemModuleVisible("journal") ? renderJournalCard(entry, key) : ""}
      </div>
    </main>`;
}

function renderTodoCard(date) {
  const todos = todosForDate(date);
  const ordered = sortTodos(todos);
  return `
    <section class="card section-card">
      <div class="card-title">
        <h2>今日待办</h2>
        <div class="actions-row">
          <button class="ghost" data-action="open-todos" data-date="${date}">添加</button>
          ${todos.length ? `<button class="ghost" data-action="manage-todos" data-date="${date}">管理</button>` : ""}
        </div>
      </div>
      ${ordered.length ? `<div class="todo-list todo-list-inline">${ordered.map((todo) => renderTodoItem(todo, date, false)).join("")}</div>` : `<p class="summary">把今天想做的事先放在这里。</p>`}
    </section>`;
}

function renderJournalCard(entry, key) {
  return `
    <section class="card section-card">
      <div class="card-title">
        <h2>今日小记</h2>
        <button class="ghost" data-action="open-journal" data-date="${key}">${entry.journal ? "编辑" : "写一点"}</button>
      </div>
      <p class="summary">${entry.journal ? escapeHtml(entry.journal).replace(/\n/g, "<br>") : "像写日记一样，留下今天想记住的话。"}</p>
    </section>`;
}

function renderTarot(entry, key) {
  const tarot = entry.tarot;
  return `
    <section class="card section-card tarot-card">
      <div class="card-title"><h2>今日一抽</h2>${tarot ? '<span class="subtle">已保存</span>' : ""}</div>
      ${
        tarot
          ? `<div class="tarot-name">${tarotTitle(tarot)}</div>
             <p class="summary">关键词：${tarotKeywords(tarot).join("、")}<br>${tarotMessage(tarot)}</p>`
          : `<p class="summary">给今天一个轻轻的提示。</p>
             <button class="primary" data-action="draw-tarot" data-date="${key}">抽一张牌</button>`
      }
    </section>`;
}

function tarotOrientationLabel(orientation) {
  return orientation === "reversed" ? "逆位" : "正位";
}

function tarotTitle(tarot) {
  if (!tarot) return "";
  return `${tarot.cardName}${tarot.orientation ? ` · ${tarotOrientationLabel(tarot.orientation)}` : ""}`;
}

function tarotKeywords(tarot) {
  return tarot?.keywords || [];
}

function tarotMessage(tarot) {
  if (!tarot) return "";
  if (tarot.orientation === "reversed") {
    const keywords = tarotKeywords(tarot);
    const hint = keywords.length ? keywords.join("、") : "今天的状态";
    return tarot.reversedMessage || `这张牌逆位时，提醒你留意「${hint}」里被卡住、过度消耗或还没说清的部分。先慢一点，别急着把答案固定下来。`;
  }
  return tarot.uprightMessage || tarot.message || "";
}

function tarotDetailText(tarot) {
  return `${tarotTitle(tarot)} · ${tarotKeywords(tarot).join("、")}`;
}

function renderRecordCard(type, record, key) {
  const module = allModules()[type];
  return `
    <button class="card record-card" data-action="open-record" data-type="${type}" data-date="${key}">
      <span class="record-icon" style="background:${module.color}">${module.mark}</span>
      <span>
        <h3>${module.title}</h3>
        <p class="summary">${record ? recordSummary(type, record) : "未记录"}</p>
      </span>
    </button>`;
}

function renderHealthCard(key) {
  const status = cycleStatus(key);
  const cycle = cycleForDate(key);
  const primaryCycleAction = cycle ? "end-cycle" : "start-cycle";
  const primaryCycleLabel = cycle ? "标记结束" : "标记开始";
  return `
    <section class="card section-card">
      <div class="card-title"><h2>女性健康</h2><span class="subtle">预测仅供参考</span></div>
      <p class="summary">${status.text}</p>
      ${cycle ? `<p class="summary">${cycleDetailSummary(key, cycle)}</p>` : ""}
      <div class="health-row">
        <button class="secondary" data-action="${primaryCycleAction}" data-date="${key}">${primaryCycleLabel}</button>
        <button class="ghost" data-action="open-cycle-day" data-date="${key}">记录症状</button>
        <button class="ghost" data-action="open-cycle" data-date="${key}">管理周期</button>
      </div>
    </section>`;
}

function renderCalendar() {
  const year = calendarCursor.getFullYear();
  const month = calendarCursor.getMonth();
  const first = new Date(year, month, 1);
  const start = new Date(first);
  start.setDate(first.getDate() - ((first.getDay() + 6) % 7));
  const days = Array.from({ length: 42 }, (_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    return date;
  });
  return `
    <main class="screen">
      <header class="calendar-head">
        <button class="ghost" data-action="prev-month">‹</button>
        <div class="calendar-title">${year}年${month + 1}月</div>
        <button class="ghost" data-action="next-month">›</button>
      </header>
      <button class="secondary" data-action="go-today">回到今天</button>
      ${renderCalendarTools(year, month)}
      <section class="card section-card" style="margin-top:14px">
        <div class="week">${["一", "二", "三", "四", "五", "六", "日"].map((d) => `<div>${d}</div>`).join("")}</div>
        <div class="month-grid">${days.map((day) => renderDay(day, month)).join("")}</div>
      </section>
    </main>`;
}

function renderCalendarTools(year, month) {
  const stats = monthStats(year, month);
  const filters = [
    ["all", "全部"],
    ["mood", "心情"],
    ["fitness", "健身"],
    ["study", "学习"],
    ["outing", "外出"],
    ["journal", "小记"],
    ["todos", "待办"],
    ["tarot", "塔罗"],
    ...customFilterOptions(),
  ];
  return `
    <section class="card section-card" style="margin-top:14px">
      <div class="card-title"><h2>本月回顾</h2><span class="subtle">${stats.activeDays} 天有记录</span></div>
      <div class="stats-grid">
        <div><strong>${stats.records}</strong><span>生活记录</span></div>
        <div><strong>${stats.tarot}</strong><span>今日一抽</span></div>
        <div><strong>${stats.periodDays}</strong><span>经期天数</span></div>
      </div>
      <div class="chips" style="margin-top:12px">
        ${filters.map(([id, label]) => `<button class="chip ${calendarFilter === id ? "is-selected" : ""}" data-action="set-filter" data-filter="${id}">${escapeHtml(label)}</button>`).join("")}
      </div>
      <button class="ghost" style="margin-top:12px" data-action="open-record-cleanup">管理记录</button>
    </section>`;
}

function renderDay(day, month) {
  const key = formatDate(day);
  const entry = state.entries[key] || {};
  const classes = ["day"];
  if (day.getMonth() !== month) classes.push("is-other");
  if (key === todayKey()) classes.push("is-today");
  if (!matchesFilter(entry, key)) classes.push("is-filtered");
  if (!historyHidden("cycle") && isActualCycleDay(key)) classes.push("is-period");
  else if (!historyHidden("cycle") && isPredictedCycleDay(key)) classes.push("is-predicted");
  const dots = [];
  if (entry.mood && !historyHidden("mood")) dots.push("var(--rose-strong)");
  if (entry.fitness && !historyHidden("fitness")) dots.push("var(--green)");
  if (entry.study && !historyHidden("study")) dots.push("var(--blue)");
  if (entry.outing && !historyHidden("outing")) dots.push("var(--gold)");
  if (entry.tarot && !historyHidden("tarot")) dots.push("var(--violet)");
  if (entry.journal && !historyHidden("journal")) dots.push("#c66f5d");
  if (todosForDate(key).length && !historyHidden("todos")) dots.push("var(--accent)");
  Object.keys(entry.customRecords || {}).filter((moduleId) => !historyHidden(moduleId)).slice(0, 4).forEach((moduleId) => dots.push(customModuleColor(moduleId)));
  return `
    <button class="${classes.join(" ")}" data-action="open-detail" data-date="${key}">
      <span class="day-number">${day.getDate()}</span>
      <span class="dots">${dots.slice(0, 4).map((color) => `<span class="dot" style="background:${color}"></span>`).join("")}</span>
    </button>`;
}

function renderMine() {
  return `
    <main class="screen">
      <header class="topbar">
        <div>
          <h1 class="brand">我的</h1>
          <div class="subtle">数据主要保存在本设备</div>
        </div>
      </header>
      <div class="stack">
        ${renderCloudSyncCard()}
        <section class="card section-card">
          <div class="card-title"><h2>备份与恢复</h2></div>
          <p class="summary">清除浏览器数据、卸载浏览器或更换设备，可能导致记录丢失。建议定期导出备份。</p>
          <div class="actions-row" style="margin-top:12px">
            <button class="primary" data-action="export-data">导出 JSON</button>
            <button class="secondary" data-action="import-click">导入 JSON</button>
            <input class="file-input" id="importFile" type="file" accept="application/json" />
          </div>
        </section>
        <section class="card section-card">
          <div class="card-title"><h2>最近 7 天小结</h2></div>
          <p class="summary">${weeklySummary()}</p>
        </section>
        <section class="card section-card">
          <div class="card-title"><h2>主题</h2></div>
          <div class="chips">
            ${["avocado:牛油果", "velvet:红丝绒", "ginger:浅姜黄", "pomelo:柿红柚", "taro:芋泥紫"].map((item) => {
              const [id, label] = item.split(":");
              return `<button class="chip ${state.settings.theme === id ? "is-selected" : ""}" data-action="set-theme" data-theme="${id}">${label}</button>`;
            }).join("")}
          </div>
        </section>
        <section class="card section-card">
          <div class="card-title"><h2>提醒</h2></div>
          <p class="summary">每天到点时，给自己留一个记录生活的小入口。</p>
          <form class="form" data-action="save-settings">
            ${chipsField("reminderEnabled", "每日提醒", ["开启", "关闭"], state.settings.reminderEnabled ? "开启" : "关闭")}
            <div class="field"><label>提醒时间</label><input class="input native-picker" type="time" name="reminderTime" value="${state.settings.reminderTime}" /></div>
            <button class="primary" type="submit">保存提醒</button>
          </form>
        </section>
        <section class="card section-card">
          <div class="card-title"><h2>应用数据</h2></div>
          <p class="summary">已有 ${Object.keys(state.entries).length} 天生活记录，${state.cycles.length} 条周期记录，${state.customModules.filter((module) => module.isDeleted !== true).length} 个自定义模块。</p>
          <button class="danger" data-action="clear-data" style="margin-top:12px">清空全部数据</button>
        </section>
      </div>
    </main>`;
}

function renderCloudSyncCard() {
  const meta = cloudMeta();
  const email = cloudSession && cloudSession.user ? cloudSession.user.email : "";
  return `
    <section class="card section-card">
      <div class="card-title"><h2>账号与同步</h2><span class="subtle">${email ? "已登录" : "未登录"}</span></div>
      <p class="summary">${email ? `当前账号：${escapeHtml(email)}` : "登录后会自动同步记录。换手机或电脑时，用同一个账号登录就能继续使用。"}</p>
      ${
        !email
          ? `<form class="form" data-action="cloud-login">
              ${textField("email", "邮箱", meta.email || "", "you@example.com")}
              ${passwordField("password", "密码", "至少 6 位", "current-password")}
              <div class="password-tools">
                <button class="link-btn forgot-btn" type="button" data-action="forgot-password">忘记密码？</button>
              </div>
              <div class="actions-row">
                <button class="primary" type="submit" name="cloudMode" value="login">登录</button>
                <button class="secondary" type="submit" name="cloudMode" value="signup">注册</button>
              </div>
            </form>`
          : ""
      }
      ${
        email
          ? `<div class="actions-row" style="margin-top:12px">
              <button class="secondary" data-action="cloud-push">同步本机数据</button>
              <button class="ghost" data-action="cloud-pull">从云端恢复</button>
              <button class="ghost" data-action="cloud-logout">退出登录</button>
            </div>
            <p class="summary" style="margin-top:10px">最近同步：${meta.lastSyncedAt ? new Date(meta.lastSyncedAt).toLocaleString() : "还没有同步"}</p>`
          : ""
      }
    </section>`;
}
function renderNav() {
  return `
    <nav class="bottom-nav">
      ${navButton("today", "今日", "□")}
      ${navButton("calendar", "日历", "◇")}
      ${navButton("modules", "模块", "▦")}
      ${navButton("mine", "我的", "○")}
    </nav>`;
}

function navButton(id, label, icon) {
  return `<button class="nav-btn ${view === id ? "is-active" : ""}" data-action="nav" data-view="${id}"><span>${icon}</span><span>${label}</span></button>`;
}

function renderSheet() {
  if (activeSheet.kind === "resetPassword") return renderResetPasswordSheet();
  if (activeSheet.kind === "record") return renderRecordSheet(activeSheet.type, activeSheet.date);
  if (activeSheet.kind === "detail") return renderDetailSheet(activeSheet.date);
  if (activeSheet.kind === "journal") return renderJournalSheet(activeSheet.date);
  if (activeSheet.kind === "todos") return renderTodoSheet(activeSheet.date, activeSheet.id || "");
  if (activeSheet.kind === "todoManage") return renderTodoManageSheet(activeSheet.date);
  if (activeSheet.kind === "module") return renderModuleSheet(activeSheet.id);
  if (activeSheet.kind === "deleteModule") return renderDeleteModuleSheet(activeSheet);
  if (activeSheet.kind === "cleanup") return renderCleanupSheet();
  if (activeSheet.kind === "cycleDay") return renderCycleDaySheet(activeSheet.date);
  return renderCycleSheet(activeSheet.date);
}

function renderResetPasswordSheet() {
  return `
    <div class="sheet-backdrop" data-action="close-sheet">
      <section class="sheet" onclick="event.stopPropagation()">
        <div class="card-title"><h2>设置新密码</h2><button class="ghost" data-action="close-sheet">关闭</button></div>
        <p class="summary">输入一个新密码，保存后就可以用新密码登录这个账号。</p>
        <form class="form" data-action="save-new-password">
          ${passwordField("newPassword", "新密码", "至少 6 位", "new-password")}
          <button class="primary" type="submit">保存新密码</button>
        </form>
      </section>
    </div>`;
}

function renderRecordSheet(type, date) {
  if (!type.startsWith("custom:")) return renderMultiRecordSheet(type, date);
  const record = (state.entries[date] || {})[type] || {};
  const recordValue = getRecord(state.entries[date] || {}, type) || {};
  const title = allModules()[type].title;
  return `
    <div class="sheet-backdrop" data-action="close-sheet">
      <section class="sheet" onclick="event.stopPropagation()">
        <div class="card-title"><h2>${title}记录</h2><button class="ghost" data-action="close-sheet">关闭</button></div>
        <div class="subtle">${dateLabel(date)}</div>
        <form class="form" data-action="save-record" data-type="${type}" data-date="${date}">
          ${recordFields(type, type.startsWith("custom:") ? recordValue : record)}
          <div class="actions-row">
            <button class="primary" type="submit">保存</button>
            ${recordExists(type, date) ? `<button class="danger" type="button" data-action="delete-record" data-type="${type}" data-date="${date}">删除</button>` : ""}
          </div>
        </form>
      </section>
    </div>`;
}

function renderMultiRecordSheet(type, date) {
  const record = normalizeMultiRecord((state.entries[date] || {})[type], type);
  const title = allModules()[type].title;
  const items = record.items.length ? record.items : [blankItem(type)];
  return `
    <div class="sheet-backdrop" data-action="close-sheet">
      <section class="sheet" onclick="event.stopPropagation()">
        <div class="card-title"><h2>${title}记录</h2><button class="ghost" data-action="close-sheet">关闭</button></div>
        <div class="subtle">${dateLabel(date)}</div>
        <form class="form" data-action="save-record" data-type="${type}" data-date="${date}">
          <div class="multi-items">
            ${items.map((item, index) => renderMultiItem(type, item, index, date)).join("")}
          </div>
          <button class="secondary" type="button" data-action="add-record-item" data-type="${type}">添加一条</button>
          ${multiTotalLine(type, record)}
          <div class="actions-row">
            <button class="primary" type="submit">保存</button>
            ${recordExists(type, date) ? `<button class="danger" type="button" data-action="delete-record" data-type="${type}" data-date="${date}">删除全部</button>` : ""}
          </div>
        </form>
      </section>
    </div>`;
}

function renderMultiItem(type, item, index, date = todayKey()) {
  const itemId = item.id || crypto.randomUUID();
  return `
    <section class="card section-card multi-item" data-index="${index}">
      <div class="card-title"><h3>第 ${index + 1} 条</h3><button class="ghost" type="button" data-action="remove-record-item">删除</button></div>
      <input type="hidden" name="itemId-${index}" value="${itemId}" />
      ${multiItemFields(type, { ...item, id: itemId }, index, date)}
    </section>`;
}

function multiItemFields(type, item, index, date = todayKey()) {
  if (type === "mood") {
    return `
      ${chipsField(`mood-${index}`, "现在感觉怎么样？", state.settings.moodOptions, item.mood, false, "settings:moodOptions")}
      ${numberField(`energy-${index}`, "能量", item.energy, 1, 5)}
      ${chipsField(`tags-${index}`, "标签", state.settings.moodTagOptions, item.tags || "", true, "settings:moodTagOptions")}
      ${textareaField(`note-${index}`, "备注", item.note)}`;
  }
  if (type === "fitness") {
    return `
      ${renderTimerBox(`fitness:${date}:${index}`, `durationMinutes-${index}`)}
      ${chipsField(`activityType-${index}`, "运动类型", state.settings.fitnessOptions, item.activityType, false, "settings:fitnessOptions")}
      ${numberField(`durationMinutes-${index}`, "时长（分钟）", item.durationMinutes, 1, 1440)}
      ${chipsField(`feeling-${index}`, "感受", state.settings.fitnessFeelings, item.feeling, false, "settings:fitnessFeelings")}
      ${textareaField(`note-${index}`, "备注", item.note)}`;
  }
  if (type === "study") {
    return `
      ${textField(`content-${index}`, "学习内容", item.content, "论文阅读、英语、课程")}
      ${numberField(`durationMinutes-${index}`, "时长（分钟）", item.durationMinutes, 1, 1440)}
      ${chipsField(`studyType-${index}`, "类型", state.settings.studyTypes, item.studyType, false, "settings:studyTypes")}
      ${textareaField(`note-${index}`, "备注", item.note)}`;
  }
  return `
    ${chipsField(`outingType-${index}`, "外出类型", state.settings.outingTypes, item.outingType, false, "settings:outingTypes")}
    ${textField(`location-${index}`, "地点", item.location, "美术馆、商场、公园")}
    ${textField(`companion-${index}`, "和谁", item.companion, "朋友、家人、自己")}
    ${textareaField(`note-${index}`, "备注", item.note)}`;
}

function recordFields(type, record) {
  if (type.startsWith("custom:")) return customRecordFields(allModules()[type], record);
  const fields = {
    mood: `
      ${chipsField("mood", "现在感觉怎么样？", state.settings.moodOptions, record.mood, false, "settings:moodOptions")}
      ${numberField("energy", "能量", record.energy, 1, 5)}
      ${chipsField("tags", "标签", state.settings.moodTagOptions, record.tags || "", true, "settings:moodTagOptions")}
      ${textareaField("note", "备注", record.note)}`,
    fitness: `
      ${renderFitnessTimer(record)}
      ${chipsField("activityType", "运动类型", state.settings.fitnessOptions, record.activityType, false, "settings:fitnessOptions")}
      ${numberField("durationMinutes", "时长（分钟）", record.durationMinutes, 1, 1440)}
      ${chipsField("feeling", "感受", state.settings.fitnessFeelings, record.feeling, false, "settings:fitnessFeelings")}
      ${textareaField("note", "备注", record.note)}`,
    study: `
      ${textField("content", "学习内容", record.content, "论文阅读、英语、课程")}
      ${numberField("durationMinutes", "时长（分钟）", record.durationMinutes, 1, 1440)}
      ${chipsField("studyType", "类型", state.settings.studyTypes, record.studyType, false, "settings:studyTypes")}
      ${textareaField("note", "备注", record.note)}`,
    outing: `
      ${chipsField("outingType", "外出类型", state.settings.outingTypes, record.outingType, false, "settings:outingTypes")}
      ${textField("location", "地点", record.location, "美术馆、商场、公园")}
      ${textField("companion", "和谁", record.companion, "朋友、家人、自己")}
      ${textareaField("note", "备注", record.note)}`,
  };
  return fields[type];
}

function customRecordFields(module, record) {
  const timer = module.hasTimer ? renderCustomTimer(module, record) : "";
  return timer + module.fields.map((field) => {
    const value = record[field.id];
    if (field.fieldType === "boolean") return chipsField(field.id, field.label, defaultOptionsForField(field), value, false, `custom:${module.id}:${field.id}`);
    if (field.fieldType === "number") return numberField(field.id, field.label, value, 0, 999999);
    if (field.fieldType === "rating") return chipsField(field.id, field.label, defaultOptionsForField(field), value, false, `custom:${module.id}:${field.id}`);
    if (field.fieldType === "tags") return chipsField(field.id, field.label, defaultOptionsForField(field), value || "", true, `custom:${module.id}:${field.id}`);
    return textareaField(field.id, field.label, value);
  }).join("");
}

function renderFitnessTimer(record) {
  return renderTimerBox("fitness", "durationMinutes");
}

function renderCustomTimer(module) {
  return renderTimerBox(`custom:${module.id}`, `timerMinutes-${module.id}`);
}

function renderTimerBox(timerId, targetName) {
  const timer = state.timers[timerId];
  if (timer) {
    const label = elapsedTimerLabel(timer.startedAt);
    return `
      <section class="timer-box">
        <strong>计时中</strong>
        <span class="subtle timer-live" data-started-at="${timer.startedAt}">已经 ${label}</span>
        <button class="secondary" type="button" data-action="stop-timer" data-timer-id="${timerId}" data-target="${targetName}">结束计时并填入时长</button>
      </section>`;
  }
  return `
    <section class="timer-box">
      <strong>计时模式</strong>
      <span class="subtle">开始运动时点一下，结束后自动写入时长。</span>
      <button class="ghost" type="button" data-action="start-timer" data-timer-id="${timerId}">开始计时</button>
    </section>`;
}

function renderModules() {
  return `
    <main class="screen">
      <header class="topbar">
        <div>
          <h1 class="brand">模块</h1>
          <div class="subtle">把自己的生活方框放进来</div>
        </div>
        <button class="primary" data-action="open-module">新建</button>
      </header>
      <div class="stack">
        <section class="card section-card">
          <div class="card-title"><h2>默认模块</h2></div>
          <div class="module-list">
            ${Object.entries(defaultModules).map(([id, module]) => systemModuleRow(id, module)).join("")}
          </div>
        </section>
        <section class="card section-card">
          <div class="card-title"><h2>我的模块</h2></div>
          <div class="module-list">
            ${Object.entries(builtInModules).filter(([id]) => !(state.settings.deletedBuiltInModules || []).includes(id)).map(([id, module]) => moduleRow(id, module, false, true)).join("")}
            ${state.customModules.filter((module) => module.isDeleted !== true).map((module) => moduleRow(`custom:${module.id}`, { ...module, title: module.name }, false, false)).join("")}
          </div>
        </section>
      </div>
    </main>`;
}

function systemModuleRow(id, module) {
  const hidden = (state.settings.hiddenDefaultModules || []).includes(id);
  return `
    <div class="detail-item module-item">
      <div><strong>${module.title}</strong><span class="subtle">${hidden ? "默认模块 · 已隐藏" : "默认模块 · 今日页显示中"}</span></div>
      <button class="ghost" data-action="toggle-default-module" data-id="${id}">${hidden ? "恢复" : "隐藏"}</button>
    </div>`;
}

function moduleRow(id, module, locked, builtIn = false) {
  const realId = id.replace("custom:", "");
  const hidden = builtIn ? (state.settings.hiddenBuiltInModules || []).includes(realId) : module.isEnabled === false;
  return `
    <div class="detail-item module-item">
      <div><strong>${module.title || module.name}</strong><span class="subtle">${builtIn ? "内置模块" : `${module.fields.length} 个字段`} · ${hidden ? "已隐藏，历史记录仍保留" : "今日页显示中"}</span></div>
      <div class="actions-row"><button class="ghost" data-action="${builtIn ? "toggle-built-in-module" : "toggle-custom-module"}" data-id="${realId}">${hidden ? "恢复" : "隐藏"}</button><button class="ghost" data-action="${builtIn ? "delete-built-in-module" : "delete-module"}" data-id="${realId}">删除</button>${builtIn ? "" : `<button class="ghost" data-action="open-module" data-id="${realId}">编辑</button>`}</div>
    </div>`;
}

function renderModuleSheet(id) {
  const module = state.customModules.find((item) => item.id === id) || { id: "", name: "", icon: "＋", color: "#9a79b8", isEnabled: true, hasTimer: false, fields: [{ id: "field-1", label: "今天是否记录", fieldType: "boolean", options: "" }] };
  return `
    <div class="sheet-backdrop" data-action="close-sheet">
      <section class="sheet" onclick="event.stopPropagation()">
        <div class="card-title"><h2>${id ? "编辑模块" : "新建模块"}</h2><button class="ghost" data-action="close-sheet">关闭</button></div>
        <form class="form" data-action="save-module" data-id="${id || ""}">
          ${textField("name", "模块名称", module.name, "喝水、阅读、皮肤状态")}
          ${textField("icon", "图标符号", module.icon, "水、书、花")}
          <div class="field"><label>颜色</label><input class="input" type="color" name="color" value="${module.color || "#9a79b8"}" /></div>
          ${chipsField("isEnabled", "显示在今日页", ["是", "否"], module.isEnabled === false ? "否" : "是")}
          ${chipsField("hasTimer", "是否计时", ["添加", "不添加"], module.hasTimer ? "添加" : "不添加")}
          <div class="field"><label>字段</label><div class="stack">${module.fields.map((field, index) => renderModuleField(field, index)).join("")}</div></div>
          <button class="secondary" type="button" data-action="add-module-field">添加字段</button>
          <div class="actions-row">
            <button class="primary" type="submit">保存模块</button>
            ${id ? `<button class="danger" type="button" data-action="delete-module" data-id="${id}">删除模块</button>` : ""}
          </div>
        </form>
      </section>
    </div>`;
}

function renderDeleteModuleSheet(sheet) {
  const title = sheet.title || "模块";
  if (sheet.step === 2) {
    return `
      <div class="sheet-backdrop" data-action="close-sheet">
        <section class="sheet" onclick="event.stopPropagation()">
          <div class="card-title"><h2>是否同时删除以前的记录？</h2></div>
          <p class="summary">${escapeHtml(title)} 将从我的模块中移除。</p>
          <div class="actions-row">
            <button class="ghost" data-action="close-sheet">取消删除</button>
            <button class="danger" data-action="confirm-delete-module" data-delete-history="true">删除历史</button>
            <button class="secondary" data-action="confirm-delete-module" data-delete-history="false">保留历史</button>
          </div>
        </section>
      </div>`;
  }
  return `
    <div class="sheet-backdrop" data-action="close-sheet">
      <section class="sheet" onclick="event.stopPropagation()">
        <div class="card-title"><h2>确定删除模块吗？</h2></div>
        <p class="summary">${escapeHtml(title)}</p>
        <div class="actions-row">
          <button class="ghost" data-action="close-sheet">取消</button>
          <button class="danger" data-action="continue-delete-module">确定</button>
        </div>
      </section>
    </div>`;
}

function renderCleanupSheet() {
  const selected = activeSheet.selectedFilter || "";
  const options = cleanupFilterOptions();
  return `
    <div class="sheet-backdrop" data-action="close-sheet">
      <section class="sheet" onclick="event.stopPropagation()">
        <div class="card-title"><h2>管理记录</h2><button class="ghost" data-action="close-sheet">关闭</button></div>
        <p class="summary">当前筛选：${selected ? escapeHtml(filterLabel(selected)) : "请选择要删除的记录"}</p>
        ${
          options.length
            ? `<div class="chips cleanup-chips">
                ${options.map(([filter, label]) => `<button class="chip ${selected === filter ? "is-selected" : ""}" data-action="select-cleanup-filter" data-filter="${escapeHtml(filter)}">${escapeHtml(label)}</button>`).join("")}
              </div>`
            : `<p class="summary">现在没有可管理的记录。</p>`
        }
        ${selected ? `<div class="actions-row cleanup-actions"><button class="danger" data-action="confirm-delete-filter-records">删除该记录</button></div>` : ""}
      </section>
    </div>`;
}

function renderModuleField(field, index) {
  return `
    <div class="card section-card module-field">
      <div class="card-title"><h3>字段 ${index + 1}</h3><button class="ghost" type="button" data-action="remove-module-field">删除</button></div>
      <input type="hidden" name="fieldId-${index}" value="${field.id}" />
      ${textField(`fieldLabel-${index}`, "字段名称", field.label, "备注、杯数、状态")}
      <div class="field"><label>字段类型</label><select class="select" name="fieldType-${index}">
        ${Object.entries(customFieldTypes).map(([id, label]) => `<option value="${id}" ${field.fieldType === id ? "selected" : ""}>${label}</option>`).join("")}
      </select></div>
      ${textField(`fieldOptions-${index}`, "选项（标签可填）", field.options || "", "痘痘、干燥、稳定")}
    </div>`;
}

function chipsField(name, label, options, value, multiple = false) {
  const selected = multiple ? splitOptions(value) : [value].filter(Boolean);
  const optionKey = arguments[5] || "";
  return `
    <div class="field option-field" data-option-key="${optionKey}">
      <div class="field-head">
        <label>${label}</label>
        ${optionKey ? `<button class="link-btn" type="button" data-action="toggle-option-editor">编辑</button>` : ""}
      </div>
      <input type="hidden" name="${name}" value="${value || ""}" />
      <div class="chips">${options.map((option) => `<button class="chip ${selected.includes(option) ? "is-selected" : ""}" type="button" data-action="pick-chip" data-name="${name}" data-value="${option}" data-multiple="${multiple ? "true" : "false"}">${option}</button>`).join("")}</div>
      ${
        optionKey
          ? `<div class="option-editor" hidden>
              <div class="option-editor-row">
                <input class="input" data-role="option-input" placeholder="添加一个新选项" />
                <button class="ghost" type="button" data-action="add-option">添加</button>
                <button class="ghost" type="button" data-action="cancel-option-editor">取消</button>
              </div>
              <div class="option-delete-list">
                ${options.map((option) => `<button class="chip" type="button" data-action="delete-option" data-value="${escapeAttr(option)}">${option} ×</button>`).join("")}
              </div>
            </div>`
          : ""
      }
    </div>`;
}

function textField(name, label, value = "", placeholder = "") {
  return `<div class="field"><label>${label}</label><input class="input" name="${name}" value="${escapeAttr(value || "")}" placeholder="${placeholder}" /></div>`;
}

function passwordField(name, label, placeholder = "至少 6 位", autocomplete = "current-password") {
  return `<div class="field">
    <label>${label}</label>
    <div class="password-wrap">
      <input class="input password-input" type="password" name="${name}" autocomplete="${autocomplete}" placeholder="${placeholder}" />
      <button class="password-toggle" type="button" data-action="toggle-password" aria-label="显示密码" title="显示密码">
        <span class="eye-mark" aria-hidden="true"><span></span></span>
      </button>
    </div>
  </div>`;
}

function numberField(name, label, value = "", min, max) {
  return `<div class="field"><label>${label}</label><input class="input" type="number" min="${min}" max="${max}" name="${name}" value="${value || ""}" /></div>`;
}

function textareaField(name, label, value = "") {
  return `<div class="field"><label>${label}</label><textarea class="textarea" name="${name}" maxlength="500">${escapeHtml(value || "")}</textarea></div>`;
}

function renderDetailSheet(date) {
  const entry = state.entries[date] || {};
  const isFuture = diffDays(date, todayKey()) > 0;
  return `
    <div class="sheet-backdrop" data-action="close-sheet">
      <section class="sheet" onclick="event.stopPropagation()">
        <div class="card-title"><h2>${dateLabel(date)}</h2><button class="ghost" data-action="close-sheet">关闭</button></div>
        <div class="detail-list">
          ${Object.keys(modulesForEntry(entry)).map((type) => detailItem(type, getRecord(entry, type), date, isFuture)).join("")}
          ${historyHidden("journal") ? "" : `<div class="detail-item"><div><strong>今日小记</strong><span class="subtle">${entry.journal ? escapeHtml(entry.journal).replace(/\n/g, "<br>") : "未记录"}</span></div>${isFuture ? "" : `<button class="ghost" data-action="open-journal" data-date="${date}">${entry.journal ? "编辑" : "添加"}</button>`}</div>`}
          ${historyHidden("todos") ? "" : `<div class="detail-item"><div><strong>今日待办</strong><span class="subtle">${todoSummary(date)}</span></div><button class="ghost" data-action="manage-todos" data-date="${date}">查看</button></div>`}
          ${entry.tarot && !historyHidden("tarot") ? `<div class="detail-item"><div><strong>今日一抽</strong><span class="subtle">${tarotDetailText(entry.tarot)}</span></div></div>` : ""}
          ${historyHidden("cycle") ? "" : `<div class="detail-item"><div><strong>女性健康</strong><span class="subtle">${cycleDetailText(date)}</span></div><button class="ghost" data-action="open-cycle-day" data-date="${date}">编辑</button></div>`}
        </div>
      </section>
    </div>`;
}

function renderJournalSheet(date) {
  const entry = state.entries[date] || {};
  return `
    <div class="sheet-backdrop" data-action="close-sheet">
      <section class="sheet" onclick="event.stopPropagation()">
        <div class="card-title"><h2>今日小记</h2><button class="ghost" data-action="close-sheet">关闭</button></div>
        <div class="subtle">${dateLabel(date)}</div>
        <form class="form" data-action="save-journal" data-date="${date}">
          ${textareaField("journal", "像写日记一样写一点", entry.journal || "")}
          <div class="actions-row">
            <button class="primary" type="submit">保存</button>
            ${entry.journal ? `<button class="danger" type="button" data-action="delete-journal" data-date="${date}">删除</button>` : ""}
          </div>
        </form>
      </section>
    </div>`;
}

function renderTodoSheet(date, editId = "") {
  const editing = state.todos.find((todo) => todo.id === editId) || null;
  const title = editing ? "编辑待办" : "添加待办";
  return `
    <div class="sheet-backdrop" data-action="close-sheet">
      <section class="sheet" onclick="event.stopPropagation()">
        <div class="card-title"><h2>${title}</h2><button class="ghost" data-action="close-sheet">关闭</button></div>
        <div class="subtle">${dateLabel(date)}</div>
        <form class="form" data-action="save-todo" data-date="${date}" data-id="${editing ? editing.id : ""}">
          ${textField("title", "待办内容", editing ? editing.title : "", "比如买牛奶、写作业、整理房间")}
          ${chipsField("priority", "优先级", ["普通", "重要", "紧急"], editing ? editing.priority : "普通")}
          ${chipsField("tags", "标签", state.settings.todoTagOptions || ["生活", "学习", "工作", "购物"], editing ? editing.tags || "" : "", true, "settings:todoTagOptions")}
          ${chipsField("repeat", "重复", ["不重复", "每天", "每周", "每月"], editing ? editing.repeat || "不重复" : "不重复")}
          ${textareaField("note", "备注", editing ? editing.note || "" : "")}
          <div class="actions-row">
            <button class="primary" type="submit">${editing ? "保存修改" : "添加待办"}</button>
            ${editing ? `<button class="danger" type="button" data-action="delete-todo" data-id="${editing.id}">删除</button><button class="ghost" type="button" data-action="manage-todos" data-date="${date}">取消编辑</button>` : ""}
          </div>
        </form>
      </section>
    </div>`;
}

function renderTodoManageSheet(date) {
  const ordered = sortTodos(todosForDate(date));
  return `
    <div class="sheet-backdrop" data-action="close-sheet">
      <section class="sheet" onclick="event.stopPropagation()">
        <div class="card-title"><h2>管理待办</h2><button class="ghost" data-action="close-sheet">关闭</button></div>
        <div class="subtle">${dateLabel(date)}</div>
        <div class="todo-list">
          ${ordered.length ? ordered.map((todo) => renderTodoItem(todo, date, true)).join("") : `<p class="summary">今天还没有待办。</p>`}
        </div>
      </section>
    </div>`;
}

function renderTodoItem(todo, date, showManage = true) {
  return `
    <div class="todo-item ${todo.done ? "is-done" : ""}">
      <button class="todo-hit" data-action="toggle-todo" data-id="${todo.id}">
        <span class="todo-check">${todo.done ? "✓" : ""}</span>
      </button>
      <button class="todo-main" data-action="toggle-todo" data-id="${todo.id}">
        <strong>${escapeHtml(todo.title)}</strong>
        <span class="subtle">${[todo.priority || "普通", todo.tags || "", todo.repeat && todo.repeat !== "不重复" ? todo.repeat : ""].filter(Boolean).join(" · ")}</span>
        ${todo.note ? `<span class="subtle">${escapeHtml(todo.note)}</span>` : ""}
      </button>
      ${showManage ? `<div class="actions-row"><button class="ghost" data-action="edit-todo" data-date="${date}" data-id="${todo.id}">编辑</button><button class="danger" data-action="delete-todo" data-id="${todo.id}">删除</button></div>` : ""}
    </div>`;
}

function todoSummary(date) {
  const todos = todosForDate(date);
  if (!todos.length) return "没有待办";
  const open = todos.filter((todo) => !todo.done).length;
  const done = todos.length - open;
  const titles = todos.slice(0, 3).map((todo) => `${todo.done ? "✓" : "○"} ${todo.title}`).join("；");
  return `${open} 个待办 · ${done} 个已完成${titles ? ` · ${escapeHtml(titles)}` : ""}`;
}

function detailItem(type, record, date, isFuture) {
  const module = modulesForEntry(state.entries[date] || {})[type];
  return `
    <div class="detail-item">
      <div><strong>${module.title}</strong><span class="subtle">${record ? recordSummary(type, record) : isFuture ? "未来日期暂不能记录" : "未记录"}</span></div>
      ${isFuture ? "" : `<button class="ghost" data-action="open-record" data-type="${type}" data-date="${date}">${record ? "编辑" : "添加"}</button>`}
    </div>`;
}

function renderCycleSheet(date) {
  closeStaleCycles();
  const cycles = cyclesForEditor(date);
  return `
    <div class="sheet-backdrop" data-action="close-sheet">
      <section class="sheet" onclick="event.stopPropagation()">
        <div class="card-title"><h2>周期记录</h2><button class="ghost" data-action="close-sheet">关闭</button></div>
        <p class="summary">日期根据你设置的周期长度估算，仅供记录参考，不作为医疗建议。</p>
        <form class="form" data-action="save-cycle">
          ${numberField("cycleLengthDays", "周期长度（天）", cycleLengthDays(), 15, 60)}
          ${cycles.map((cycle, index) => `
            <div class="card section-card cycle-edit-card">
              <input type="hidden" name="id-${index}" value="${cycle.id}" />
              <div class="field"><label>开始日期</label><input class="input native-picker" type="date" name="start-${index}" value="${cycle.startDate}" /></div>
              <div class="field"><label>结束日期</label><input class="input native-picker" type="date" name="end-${index}" value="${cycle.endDate || ""}" /></div>
              ${cycle.isDraft ? "" : `<button class="danger" type="button" data-action="delete-cycle" data-id="${cycle.id}">删除这一条</button>`}
            </div>`).join("")}
          <button class="primary" type="submit">保存修改</button>
        </form>
      </section>
    </div>`;
}

function renderCycleDaySheet(date) {
  closeStaleCycles();
  const cycle = ensureCycleForDate(date);
  return `
    <div class="sheet-backdrop" data-action="close-sheet">
      <section class="sheet" onclick="event.stopPropagation()">
        <div class="card-title"><h2>女性健康记录</h2><button class="ghost" data-action="close-sheet">关闭</button></div>
        <div class="subtle">${dateLabel(date)}</div>
        <p class="summary">每天可以单独记录一次，保存后会自动同步。</p>
        <form class="form" data-action="save-cycle-day" data-id="${cycle.id}" data-date="${date}">
          ${numberField("cycleLengthDays", "周期长度（天）", cycleLengthDays(), 15, 60)}
          ${chipsField("flow", "流量", state.settings.flowOptions, cycleDayRecord(date, cycle).flow || "", false, "settings:flowOptions")}
          ${numberField("pain", "痛感（0-5）", cycleDayRecord(date, cycle).pain || "", 0, 5)}
          ${chipsField("symptoms", "症状", state.settings.symptomOptions, cycleDayRecord(date, cycle).symptoms || "", true, "settings:symptomOptions")}
          ${chipsField("cycleMood", "情绪", state.settings.cycleMoodOptions, cycleDayRecord(date, cycle).cycleMood || "", false, "settings:cycleMoodOptions")}
          <button class="primary" type="submit">保存</button>
        </form>
      </section>
    </div>`;
}

function bindEvents() {
  document.querySelectorAll("[data-action]").forEach((el) => {
    const action = el.dataset.action;
    if (action === "save-record" || action === "save-journal" || action === "save-cycle" || action === "save-cycle-day" || action === "save-todo" || action === "save-module" || action === "save-settings" || action === "save-cloud-config" || action === "cloud-login" || action === "save-new-password") {
      el.onsubmit = handleSubmit;
    } else {
      el.onclick = handleClick;
    }
  });
  const importFile = document.querySelector("#importFile");
  if (importFile) importFile.onchange = importData;
}

function handleClick(event) {
  event.stopPropagation();
  const button = event.currentTarget;
  const action = button.dataset.action;
  if (action === "nav") {
    view = button.dataset.view;
    activeSheet = null;
  }
  if (action === "open-record") activeSheet = { kind: "record", type: button.dataset.type, date: button.dataset.date };
  if (action === "open-detail") activeSheet = { kind: "detail", date: button.dataset.date };
  if (action === "open-journal") activeSheet = { kind: "journal", date: button.dataset.date };
  if (action === "open-todos") activeSheet = { kind: "todos", date: button.dataset.date };
  if (action === "manage-todos") activeSheet = { kind: "todoManage", date: button.dataset.date };
  if (action === "edit-todo") activeSheet = { kind: "todos", date: button.dataset.date, id: button.dataset.id };
  if (action === "open-cycle") activeSheet = { kind: "cycle", date: button.dataset.date };
  if (action === "open-cycle-day") activeSheet = { kind: "cycleDay", date: button.dataset.date };
  if (action === "open-module") activeSheet = { kind: "module", id: button.dataset.id || "" };
  if (action === "close-sheet") activeSheet = null;
  if (action === "draw-tarot") drawTarot(button.dataset.date);
  if (action === "pick-chip") pickChip(button);
  if (action === "toggle-option-editor") toggleOptionEditor(button);
  if (action === "add-option") addOption(button);
  if (action === "cancel-option-editor") cancelOptionEditor(button);
  if (action === "delete-option") deleteOption(button);
  if (action === "toggle-default-module") toggleDefaultModule(button.dataset.id);
  if (action === "toggle-built-in-module") toggleBuiltInModule(button.dataset.id);
  if (action === "toggle-custom-module") toggleCustomModule(button.dataset.id);
  if (action === "open-record-cleanup") activeSheet = { kind: "cleanup", selectedFilter: "" };
  if (action === "select-cleanup-filter") activeSheet = { kind: "cleanup", selectedFilter: button.dataset.filter };
  if (action === "confirm-delete-filter-records") deleteSelectedFilterRecords();
  if (action === "add-fitness-option") addFitnessOption(button.closest("form"));
  if (action === "delete-fitness-option") deleteFitnessOption(button.dataset.value);
  if (action === "start-timer") startTimer(button.dataset.timerId);
  if (action === "stop-timer") stopTimer(button.closest("form"), button.dataset.timerId, button.dataset.target);
  if (action === "delete-record") deleteRecord(button.dataset.type, button.dataset.date);
  if (action === "delete-journal") deleteJournal(button.dataset.date);
  if (action === "toggle-todo") toggleTodo(button.dataset.id);
  if (action === "delete-todo") deleteTodo(button.dataset.id);
  if (action === "start-cycle") startCycle(button.dataset.date);
  if (action === "end-cycle") endCycle(button.dataset.date);
  if (action === "delete-cycle") deleteCycle(button.dataset.id);
  if (action === "add-module-field") {
    addModuleField(button.closest("form"));
    return;
  }
  if (action === "add-record-item") {
    addRecordItem(button);
    return;
  }
  if (action === "remove-record-item") {
    removeRecordItem(button);
    return;
  }
  if (action === "remove-module-field") {
    removeModuleField(button);
    return;
  }
  if (action === "delete-module") deleteModule(button.dataset.id);
  if (action === "delete-built-in-module") deleteBuiltInModule(button.dataset.id);
  if (action === "continue-delete-module") continueDeleteModule();
  if (action === "confirm-delete-module") confirmDeleteModule(button.dataset.deleteHistory === "true");
  if (action === "prev-month") calendarCursor.setMonth(calendarCursor.getMonth() - 1);
  if (action === "next-month") calendarCursor.setMonth(calendarCursor.getMonth() + 1);
  if (action === "go-today") calendarCursor = new Date();
  if (action === "set-filter") calendarFilter = button.dataset.filter;
  if (action === "export-data") exportData();
  if (action === "import-click") document.querySelector("#importFile").click();
  if (action === "clear-data") clearData();
  if (action === "set-theme") setTheme(button.dataset.theme);
  if (action === "cloud-push") pushCloudState(true);
  if (action === "cloud-pull") pullCloudState(true);
  if (action === "cloud-logout") cloudLogout();
  if (action === "forgot-password") cloudForgotPassword();
  if (action === "toggle-password") {
    togglePasswordVisibility(button);
    return;
  }
  if (!["pick-chip", "toggle-option-editor", "add-option", "cancel-option-editor", "delete-option", "add-fitness-option", "stop-timer", "forgot-password"].includes(action)) render();
}

async function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (form.dataset.action === "save-record") {
    if (!saveRecord(form.dataset.type, form.dataset.date, new FormData(form))) {
      render();
      return;
    }
  } else if (form.dataset.action === "save-journal") {
    saveJournal(form.dataset.date, new FormData(form));
  } else if (form.dataset.action === "save-cycle") {
    saveCycles(new FormData(form));
  } else if (form.dataset.action === "save-cycle-day") {
    saveCycleDay(form.dataset.id, form.dataset.date, new FormData(form));
  } else if (form.dataset.action === "save-todo") {
    saveTodo(form.dataset.date, form.dataset.id, new FormData(form));
  } else if (form.dataset.action === "save-settings") {
    saveSettings(new FormData(form));
  } else if (form.dataset.action === "save-cloud-config") {
    saveCloudConfig(new FormData(form));
  } else if (form.dataset.action === "cloud-login") {
    await cloudPasswordLogin(formDataWithSubmitter(form, event.submitter));
  } else if (form.dataset.action === "save-new-password") {
    if (!(await saveNewPassword(new FormData(form)))) {
      render();
      return;
    }
  } else {
    saveModule(form.dataset.id, new FormData(form));
  }
  activeSheet = null;
  render();
}

function formDataWithSubmitter(form, submitter) {
  const data = new FormData(form);
  if (submitter && submitter.name) data.set(submitter.name, submitter.value);
  return data;
}

function saveJournal(date, data) {
  const text = (data.get("journal") || "").trim();
  const entry = getEntry(date);
  if (text) entry.journal = text;
  else delete entry.journal;
  touchEntry(date);
}

function deleteJournal(date) {
  if (!confirm("确定删除这篇小记吗？")) return;
  delete getEntry(date).journal;
  touchEntry(date);
  activeSheet = null;
}

function todosForDate(date) {
  return (state.todos || []).filter((todo) => todo.date === date);
}

function saveTodo(date, id, data) {
  const title = (data.get("title") || "").trim();
  if (!title) {
    alert("先写一个待办内容。");
    return;
  }
  const now = new Date().toISOString();
  const existing = id && state.todos.find((todo) => todo.id === id);
  if (existing) {
    existing.title = title;
    existing.priority = data.get("priority") || "普通";
    existing.tags = data.get("tags") || "";
    existing.repeat = data.get("repeat") || "不重复";
    existing.note = data.get("note") || "";
    existing.updatedAt = now;
  } else {
    state.todos.push({
      id: crypto.randomUUID(),
      title,
      date,
      done: false,
      priority: data.get("priority") || "普通",
      tags: data.get("tags") || "",
      repeat: data.get("repeat") || "不重复",
      note: data.get("note") || "",
      createdAt: now,
      updatedAt: now,
    });
  }
  saveState();
}

function toggleTodo(id) {
  const todo = state.todos.find((item) => item.id === id);
  if (!todo) return;
  todo.done = !todo.done;
  todo.completedAt = todo.done ? new Date().toISOString() : "";
  todo.updatedAt = new Date().toISOString();
  if (todo.done) createNextRecurringTodo(todo);
  saveState();
}

function createNextRecurringTodo(todo) {
  if (!todo.repeat || todo.repeat === "不重复") return;
  const offsets = { 每天: 1, 每周: 7 };
  const nextDate = todo.repeat === "每月" ? addMonths(todo.date, 1) : addDays(todo.date, offsets[todo.repeat] || 0);
  if (!nextDate || state.todos.some((item) => item.parentId === todo.id && item.date === nextDate)) return;
  state.todos.push({
    ...todo,
    id: crypto.randomUUID(),
    parentId: todo.id,
    date: nextDate,
    done: false,
    completedAt: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

function deleteTodo(id) {
  if (!confirm("确定删除这个待办吗？")) return;
  state.todos = state.todos.filter((todo) => todo.id !== id);
  saveState();
  if (activeSheet && activeSheet.kind === "todos") activeSheet.id = "";
}

function priorityRank(priority) {
  return { 紧急: 3, 重要: 2, 普通: 1 }[priority] || 1;
}

function sortTodos(todos) {
  return [...todos].sort((a, b) => Number(a.done) - Number(b.done) || priorityRank(b.priority) - priorityRank(a.priority) || a.createdAt.localeCompare(b.createdAt));
}

function pickChip(button) {
  const form = button.closest("form");
  const input = form.querySelector(`[name="${button.dataset.name}"]`);
  if (button.dataset.multiple === "true") {
    const selected = splitOptions(input.value);
    const next = selected.includes(button.dataset.value)
      ? selected.filter((item) => item !== button.dataset.value)
      : [...selected, button.dataset.value];
    input.value = next.join("、");
    button.classList.toggle("is-selected");
    return;
  }
  input.value = button.dataset.value;
  button.parentElement.querySelectorAll(".chip").forEach((chip) => chip.classList.remove("is-selected"));
  button.classList.add("is-selected");
}

function toggleOptionEditor(button) {
  const field = button.closest(".option-field");
  const editor = field.querySelector(".option-editor");
  editor.hidden = !editor.hidden;
}

function addOption(button) {
  const field = button.closest(".option-field");
  const input = field.querySelector('[data-role="option-input"]');
  const value = input.value.trim();
  if (!value) return;
  const optionKey = field.dataset.optionKey;
  const options = getOptionList(optionKey);
  if (!options.includes(value)) {
    setOptionList(optionKey, [...options, value]);
    appendOptionToField(field, value);
  }
  input.value = "";
}

function cancelOptionEditor(button) {
  const editor = button.closest(".option-editor");
  const input = editor.querySelector('[data-role="option-input"]');
  if (input) input.value = "";
  editor.hidden = true;
}

function deleteOption(button) {
  const field = button.closest(".option-field");
  const optionKey = field.dataset.optionKey;
  const value = button.dataset.value;
  setOptionList(optionKey, getOptionList(optionKey).filter((option) => option !== value));
  field.querySelectorAll(`[data-value="${CSS.escape(value)}"]`).forEach((item) => item.remove());
  const input = field.querySelector("input[type='hidden']");
  const selected = splitOptions(input.value).filter((item) => item !== value);
  input.value = selected.join("、");
}

function appendOptionToField(field, value) {
  const hidden = field.querySelector("input[type='hidden']");
  const multiple = field.querySelector("[data-multiple='true']") ? "true" : "false";
  const chip = `<button class="chip" type="button" data-action="pick-chip" data-name="${hidden.name}" data-value="${escapeAttr(value)}" data-multiple="${multiple}">${escapeHtml(value)}</button>`;
  const del = `<button class="chip" type="button" data-action="delete-option" data-value="${escapeAttr(value)}">${escapeHtml(value)} ×</button>`;
  field.querySelector(".chips").insertAdjacentHTML("beforeend", chip);
  field.querySelector(".option-delete-list").insertAdjacentHTML("beforeend", del);
  bindEvents();
}

function getOptionList(optionKey) {
  if (optionKey.startsWith("settings:")) {
    return state.settings[optionKey.replace("settings:", "")] || [];
  }
  const [, moduleId, fieldId] = optionKey.split(":");
  const module = state.customModules.find((item) => item.id === moduleId);
  const field = module && module.fields.find((item) => item.id === fieldId);
  return field ? defaultOptionsForField(field) : [];
}

function setOptionList(optionKey, options) {
  if (optionKey.startsWith("settings:")) {
    state.settings[optionKey.replace("settings:", "")] = options;
  } else {
    const [, moduleId, fieldId] = optionKey.split(":");
    const module = state.customModules.find((item) => item.id === moduleId);
    const field = module && module.fields.find((item) => item.id === fieldId);
    if (field) field.options = options.join("、");
  }
  saveState();
}

function saveRecord(type, date, data) {
  if (!type.startsWith("custom:")) return saveMultiRecord(type, date, data);
  const record = Object.fromEntries(data.entries());
  if (type === "fitness" && record.customActivityType) {
    record.activityType = record.customActivityType;
    addUniqueSettingOption("fitnessOptions", record.customActivityType);
    delete record.customActivityType;
  }
  Object.keys(record).forEach((key) => {
    if (record[key] === "") delete record[key];
    if (key.includes("Minutes") || key === "energy") record[key] = record[key] ? Number(record[key]) : undefined;
  });
  const required = type.startsWith("custom:") ? firstCustomField(type) : { mood: "mood", fitness: "activityType", study: "content", outing: "outingType" }[type];
  if (!record[required]) {
    alert("先填一个最重要的信息就可以保存。");
    return false;
  }
  if (type.startsWith("custom:")) {
    const entry = getEntry(date);
    entry.customRecords = entry.customRecords || {};
    entry.customRecords[type.replace("custom:", "")] = record;
  } else {
    getEntry(date)[type] = record;
  }
  touchEntry(date);
  return true;
}

function saveMultiRecord(type, date, data) {
  const items = [];
  for (const [key] of data.entries()) {
    const match = key.match(/^itemId-(\d+)$/);
    if (!match) continue;
    const index = match[1];
    const item = { id: data.get(`itemId-${index}`) || crypto.randomUUID() };
    multiFieldNames(type).forEach((field) => {
      const value = data.get(`${field}-${index}`);
      if (value !== null && value !== "") item[field] = numericRecordField(field) ? Number(value) : value;
    });
    if (itemHasRequired(type, item)) items.push(item);
  }
  if (!items.length) {
    alert("先至少保存一条记录。");
    return false;
  }
  getEntry(date)[type] = { items };
  touchEntry(date);
  return true;
}

function deleteRecord(type, date) {
  if (!confirm("确定删除这条记录吗？")) return;
  if (type.startsWith("custom:")) {
    const entry = getEntry(date);
    if (entry.customRecords) delete entry.customRecords[type.replace("custom:", "")];
  } else {
    delete getEntry(date)[type];
  }
  touchEntry(date);
  activeSheet = null;
}

function drawTarot(date) {
  const entry = getEntry(date);
  if (entry.tarot) return;
  const card = tarotDeck[Math.floor(Math.random() * tarotDeck.length)];
  const orientation = Math.random() < 0.5 ? "upright" : "reversed";
  entry.tarot = { ...card, orientation, date, drawnAt: new Date().toISOString() };
  touchEntry(date);
}

function startCycle(date) {
  closeStaleCycles();
  if (cycleForDate(date)) return;
  state.cycles = state.cycles.filter((cycle) => cycle.startDate !== date);
  const open = state.cycles.find((cycle) => !cycle.endDate);
  if (open && !confirm("上一条周期还没有结束，要先把它结束为前一天吗？")) return;
  if (open) open.endDate = addDays(date, -1);
  state.cycles.push({ id: crypto.randomUUID(), startDate: date, endDate: "", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  saveState();
}

function endCycle(date) {
  closeStaleCycles();
  const open = state.cycles.find((cycle) => !cycle.endDate && diffDays(date, cycle.startDate) >= 0);
  if (!open) return;
  open.endDate = date;
  open.updatedAt = new Date().toISOString();
  saveState();
}

function saveCycles(data) {
  saveCycleLength(data);
  const cycles = cyclesForEditor(activeSheet && activeSheet.date ? activeSheet.date : todayKey());
  const edited = cycles.map((cycle, index) => {
    const rawId = data.get(`id-${index}`) || cycle.id;
    const id = rawId.startsWith("draft-") ? crypto.randomUUID() : rawId;
    const startDate = data.get(`start-${index}`) || "";
    const endDate = data.get(`end-${index}`) || "";
    return {
      ...cycle,
      id,
      isDraft: undefined,
      startDate,
      endDate,
      updatedAt: new Date().toISOString(),
    };
  }).filter((cycle) => cycle.startDate && (!cycle.endDate || diffDays(cycle.endDate, cycle.startDate) >= 0));
  const editedIds = new Set(cycles.filter((cycle) => !cycle.isDraft).map((cycle) => cycle.id));
  state.cycles = [
    ...state.cycles.filter((cycle) => !editedIds.has(cycle.id)),
    ...edited,
  ];
  sanitizeCycles();
  saveState();
}

function saveCycleDay(id, date, data) {
  saveCycleLength(data);
  const cycle = state.cycles.find((item) => item.id === id);
  if (!cycle) return;
  const entry = getEntry(date);
  const record = {
    flow: data.get("flow") || "",
    pain: data.get("pain") || "",
    symptoms: data.get("symptoms") || "",
    cycleMood: data.get("cycleMood") || "",
    cycleId: id,
    updatedAt: new Date().toISOString(),
  };
  if (cycleDayHasContent(record)) entry.cycleDay = record;
  else delete entry.cycleDay;
  entry.updatedAt = new Date().toISOString();
  cycle.updatedAt = new Date().toISOString();
  saveState();
}

function deleteCycle(id) {
  if (!confirm("确定删除这条周期记录吗？")) return;
  state.cycles = state.cycles.filter((cycle) => cycle.id !== id);
  saveState();
}

function cycleStatus(date) {
  closeStaleCycles();
  const actual = state.cycles.find((cycle) => dateInRange(date, cycle.startDate, cycle.endDate || todayKey()));
  if (actual) return { open: !actual.endDate, text: `经期第 ${diffDays(date, actual.startDate) + 1} 天` };
  const last = [...state.cycles].sort((a, b) => b.startDate.localeCompare(a.startDate))[0];
  if (!last) return { open: false, text: "还没有周期记录" };
  const nextStart = addDays(last.startDate, cycleLengthDays());
  const days = diffDays(nextStart, todayKey());
  if (days >= 0) return { open: false, text: `预计 ${days} 天后开始` };
  return { open: false, text: `预计日期为 ${dateLabel(nextStart)}，可以记录新的开始` };
}

function cycleLengthDays() {
  const value = Number(state.settings.cycleLengthDays) || 28;
  return Math.min(60, Math.max(15, value));
}

function saveCycleLength(data) {
  const value = Number(data.get("cycleLengthDays"));
  if (!Number.isFinite(value)) return;
  state.settings.cycleLengthDays = Math.min(60, Math.max(15, Math.round(value)));
}

function cycleForDate(date) {
  closeStaleCycles();
  return state.cycles.find((cycle) => dateInRange(date, cycle.startDate, cycle.endDate || todayKey()));
}

function cycleDetailText(date) {
  const cycle = cycleForDate(date);
  const record = cycleDayRecord(date, cycle);
  const summary = cycleDayHasContent(record) ? cycleDetailSummary(date, cycle) : "";
  const status = cycle ? cycleStatus(date).text : "当天症状记录";
  return summary ? `${status} · ${summary}` : status;
}

function cyclesForEditor(date) {
  sanitizeCycles();
  const exact = state.cycles.find((cycle) => cycle.startDate === date);
  const containing = exact || state.cycles.find((cycle) => dateInRange(date, cycle.startDate, cycle.endDate || todayKey()));
  return containing ? [containing] : [{ id: `draft-${date}`, startDate: date, endDate: "", isDraft: true }];
}

function ensureCycleForDate(date) {
  closeStaleCycles();
  let cycle = cycleForDate(date);
  if (cycle) return cycle;
  cycle = { id: crypto.randomUUID(), startDate: date, endDate: "", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  state.cycles.push(cycle);
  saveState();
  return cycle;
}

function cycleDayRecord(date, cycle) {
  const entryRecord = state.entries[date]?.cycleDay;
  if (entryRecord) return entryRecord;
  if (!cycle) return {};
  return {
    flow: cycle.flow || "",
    pain: cycle.pain || "",
    symptoms: cycle.symptoms || "",
    cycleMood: cycle.cycleMood || "",
  };
}

function cycleDayHasContent(record) {
  return Boolean(record && (record.flow || record.pain || record.symptoms || record.cycleMood));
}

function cycleDetailSummary(date, cycle) {
  const record = cycleDayRecord(date, cycle);
  const bits = [];
  if (record.flow) bits.push(`流量 ${record.flow}`);
  if (record.pain) bits.push(`痛感 ${record.pain}/5`);
  if (record.symptoms) bits.push(`症状 ${record.symptoms}`);
  if (record.cycleMood) bits.push(`情绪 ${record.cycleMood}`);
  return bits.length ? bits.join(" · ") : "今天还没有记录流量、痛感、症状和情绪。";
}

function isActualCycleDay(date) {
  closeStaleCycles();
  return state.cycles.some((cycle) => dateInRange(date, cycle.startDate, cycle.endDate || todayKey()));
}

function isPredictedCycleDay(date) {
  closeStaleCycles();
  const last = [...state.cycles].filter((cycle) => cycle.startDate).sort((a, b) => b.startDate.localeCompare(a.startDate))[0];
  if (!last) return false;
  const start = addDays(last.startDate, cycleLengthDays());
  const length = last.endDate ? diffDays(last.endDate, last.startDate) + 1 : 5;
  return dateInRange(date, start, addDays(start, length - 1));
}

function closeStaleCycles() {
  let changed = false;
  state.cycles.forEach((cycle) => {
    if (!cycle.endDate && diffDays(todayKey(), cycle.startDate) >= 10) {
      cycle.endDate = addDays(cycle.startDate, 5);
      cycle.updatedAt = new Date().toISOString();
      cycle.autoClosed = true;
      changed = true;
    }
  });
  if (sanitizeCycles(false)) changed = true;
  if (changed) saveState();
}

function sanitizeCycles(shouldSave = true) {
  let changed = false;
  state.cycles = state.cycles.filter((cycle) => {
    if (!cycle.startDate) {
      changed = true;
      return false;
    }
    if (cycle.endDate && diffDays(cycle.endDate, cycle.startDate) < 0) {
      cycle.endDate = "";
      cycle.updatedAt = new Date().toISOString();
      changed = true;
    }
    return true;
  });
  if (changed && shouldSave) saveState();
  return changed;
}

function dateInRange(date, start, end) {
  return date >= start && date <= end;
}

function recordExists(type, date) {
  return Boolean(getRecord(state.entries[date] || {}, type));
}

function recordSummary(type, record) {
  if (!type.startsWith("custom:")) {
    const normalized = normalizeMultiRecord(record, type);
    if (normalized.items.length) {
      const parts = normalized.items.map((item) => itemSummary(type, item)).filter(Boolean);
      const total = totalMinutes(normalized.items);
      const totalText = total ? `合计 ${formatMinutes(total)}` : "";
      return [parts.join(" · "), totalText].filter(Boolean).join("<br>");
    }
  }
  if (type.startsWith("custom:")) {
    const module = state.customModules.find((item) => item.id === type.replace("custom:", ""));
    if (!module) return Object.entries(record).map(([key, value]) => `${key}：${value}`).join(" · ");
    const first = module.fields.find((field) => record[field.id]);
    return first ? `${first.label}：${record[first.id]}` : "已记录";
  }
  if (type === "mood") return `${record.mood}${record.energy ? ` · 能量 ${record.energy}/5` : ""}`;
  if (type === "fitness") return `${record.activityType}${record.durationMinutes ? ` · ${record.durationMinutes} 分钟` : ""}`;
  if (type === "study") return `${record.content}${record.durationMinutes ? ` · ${formatMinutes(record.durationMinutes)}` : ""}`;
  return `${record.outingType}${record.location ? ` · ${record.location}` : ""}`;
}

function normalizeMultiRecord(record, type) {
  if (!record) return { items: [], note: "" };
  if (Array.isArray(record.items)) return { items: record.items, note: record.note || "" };
  return { items: [record], note: record.note || "" };
}

function blankItem(type) {
  return { id: crypto.randomUUID() };
}

function multiFieldNames(type) {
  return {
    mood: ["mood", "energy", "tags", "note"],
    fitness: ["activityType", "durationMinutes", "feeling", "note"],
    study: ["content", "durationMinutes", "studyType", "note"],
    outing: ["outingType", "location", "companion", "note"],
  }[type];
}

function numericRecordField(field) {
  return field === "durationMinutes" || field === "energy";
}

function itemHasRequired(type, item) {
  return Boolean({ mood: item.mood, fitness: item.activityType, study: item.content, outing: item.outingType }[type]);
}

function itemSummary(type, item) {
  if (type === "mood") return `${item.mood}${item.energy ? ` ${item.energy}/5` : ""}`;
  if (type === "fitness") return `${item.activityType}${item.durationMinutes ? ` ${item.durationMinutes} 分钟` : ""}`;
  if (type === "study") return `${item.content}${item.durationMinutes ? ` ${formatMinutes(item.durationMinutes)}` : ""}`;
  return `${item.outingType}${item.location ? ` ${item.location}` : ""}`;
}

function totalMinutes(items) {
  return items.reduce((sum, item) => sum + (Number(item.durationMinutes) || 0), 0);
}

function multiTotalLine(type, record) {
  const total = totalMinutes(record.items);
  if (!["fitness", "study"].includes(type) || !total) return "";
  return `<p class="summary">合计：${formatMinutes(total)}</p>`;
}

function dailySummary(entry) {
  const count = ["mood", "fitness", "study", "outing", "tarot"].filter((key) => entry[key]).length + Object.keys(entry.customRecords || {}).length + todosForDate(entry.date).length;
  return count ? `今天留下了 ${count} 条生活记录。` : "今天还没有记录，先留下一点点也可以。";
}

function monthStats(year, month) {
  const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
  const entries = Object.values(state.entries).filter((entry) => entry.date && entry.date.startsWith(prefix));
  const records = entries.reduce((sum, entry) => sum + ["mood", "fitness", "study", "outing", "journal"].filter((key) => entry[key]).length + Object.keys(entry.customRecords || {}).filter((id) => !historyHidden(id)).length, 0);
  const tarot = entries.filter((entry) => entry.tarot).length;
  const todos = (state.todos || []).filter((todo) => todo.date && todo.date.startsWith(prefix));
  const periodDays = Array.from({ length: new Date(year, month + 1, 0).getDate() }, (_, index) => `${prefix}-${String(index + 1).padStart(2, "0")}`).filter(isActualCycleDay).length;
  const activeDates = new Set(entries.filter(hasAnyEntry).map((entry) => entry.date));
  todos.forEach((todo) => activeDates.add(todo.date));
  return { activeDays: activeDates.size, records: records + todos.length, tarot, periodDays };
}

function weeklySummary() {
  const days = Array.from({ length: 7 }, (_, index) => addDays(todayKey(), -6 + index));
  const entries = days.map((date) => state.entries[date]).filter(Boolean);
  const moodList = entries.map((entry) => entry.mood && entry.mood.mood).filter(Boolean);
  const fitness = entries.filter((entry) => entry.fitness).length;
  const studyMinutes = entries.reduce((sum, entry) => sum + ((entry.study && entry.study.durationMinutes) || 0), 0);
  const outing = entries.filter((entry) => entry.outing).length;
  const todos = days.flatMap((date) => todosForDate(date));
  const custom = entries.reduce((sum, entry) => sum + Object.keys(entry.customRecords || {}).filter((id) => !historyHidden(id)).length, 0);
  if (!entries.length && !todos.length) return "最近还没有留下记录。等你开始记录后，这里会自动长出一段轻轻的回顾。";
  const moodText = moodList.length ? `心情多次出现“${mostCommon(moodList)}”` : "心情还没有太多记录";
  return `${moodText}；健身 ${fitness} 天，学习 ${formatMinutes(studyMinutes)}，外出 ${outing} 次，待办完成 ${todos.filter((todo) => todo.done).length} 个，自定义记录 ${custom} 条。`;
}

function mostCommon(items) {
  const counts = items.reduce((map, item) => ({ ...map, [item]: (map[item] || 0) + 1 }), {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function matchesFilter(entry, date) {
  if (calendarFilter === "all") return true;
  if (calendarFilter === "todos") return todosForDate(date).length > 0;
  if (calendarFilter.startsWith("custom:")) return Boolean((entry.customRecords || {})[calendarFilter.replace("custom:", "")]);
  if (calendarFilter === "period") return isActualCycleDay(date);
  if (calendarFilter === "cycle") return isActualCycleDay(date) || cycleDayHasContent(entry.cycleDay);
  if (historyHidden(calendarFilter)) return false;
  return Boolean(entry[calendarFilter]);
}

function filterLabel(filter) {
  const labels = { all: "全部", cycle: "女性健康", todos: "今日待办", mood: "心情", fitness: "健身", study: "学习", outing: "外出", journal: "今日小记", tarot: "今日一抽" };
  if (filter.startsWith("custom:")) return customModuleName(filter.replace("custom:", ""));
  return labels[filter] || filter;
}

function cleanupFilterOptions() {
  const options = [];
  const addIfHasRecords = (filter, label) => {
    if (hasRecordsForFilter(filter)) options.push([filter, label]);
  };
  Object.entries({
    cycle: "女性健康",
    todos: "今日待办",
    tarot: "今日一抽",
    journal: "今日小记",
    mood: "心情",
    fitness: "健身",
    study: "学习",
    outing: "外出",
  }).forEach(([filter, label]) => addIfHasRecords(filter, label));

  const customIds = new Set();
  state.customModules.forEach((module) => customIds.add(module.id));
  Object.values(state.entries).forEach((entry) => Object.keys(entry.customRecords || {}).forEach((id) => customIds.add(id)));
  const seenLabels = new Set();
  [...customIds].forEach((id) => {
    const label = customModuleName(id);
    if (seenLabels.has(label)) return;
    seenLabels.add(label);
    addIfHasRecords(`custom:${id}`, label);
  });
  return options;
}

function hasRecordsForFilter(filter) {
  if (filter === "cycle") return state.cycles.length > 0 || Object.values(state.entries).some((entry) => cycleDayHasContent(entry.cycleDay));
  if (filter === "todos") return (state.todos || []).length > 0;
  if (filter.startsWith("custom:")) {
    const ids = customIdsForFilter(filter);
    return Object.values(state.entries).some((entry) => ids.some((id) => recordHasContent((entry.customRecords || {})[id])));
  }
  return Object.values(state.entries).some((entry) => recordHasContent(entry[filter]));
}

function recordHasContent(record) {
  if (!record) return false;
  if (Array.isArray(record)) return record.length > 0;
  if (typeof record !== "object") return Boolean(record);
  if (Array.isArray(record.items)) return record.items.some(recordHasContent);
  return Object.values(record).some((value) => {
    if (Array.isArray(value)) return value.length > 0;
    if (value && typeof value === "object") return recordHasContent(value);
    return value !== undefined && value !== null && String(value).trim() !== "";
  });
}

function deleteSelectedFilterRecords() {
  const selected = activeSheet && activeSheet.selectedFilter;
  if (!selected) return;
  if (!confirm("是否删除？")) return;
  if (selected === "cycle") {
    state.cycles = [];
    Object.values(state.entries).forEach((entry) => delete entry.cycleDay);
  }
  if (selected === "todos") {
    state.todos = [];
  }
  const customIds = selected.startsWith("custom:") ? customIdsForFilter(selected) : [];
  Object.values(state.entries).forEach((entry) => {
    if (selected.startsWith("custom:")) {
      customIds.forEach((id) => {
        if (entry.customRecords) delete entry.customRecords[id];
      });
    } else if (!["cycle", "todos"].includes(selected)) {
      delete entry[selected];
    }
    if (entry.customRecords && Object.keys(entry.customRecords).length === 0) {
      delete entry.customRecords;
    }
  });
  Object.keys(state.entries).forEach((date) => {
    const entry = state.entries[date];
    if (
      entry &&
      !["mood", "fitness", "study", "outing", "tarot", "journal"].some((key) => entry[key]) &&
      !Object.keys(entry.customRecords || {}).length
    ) {
      delete state.entries[date];
    }
  });
  if (selected.startsWith("custom:")) {
    const ids = customIdsForFilter(selected);
    state.settings.hiddenHistoryModules = (state.settings.hiddenHistoryModules || []).filter((id) => !ids.includes(id));
  } else {
    state.settings.hiddenHistoryModules = (state.settings.hiddenHistoryModules || []).filter((id) => id !== selected);
  }
  activeSheet = { kind: "cleanup", selectedFilter: "" };
  saveState();
}

function customIdsForFilter(filter) {
  const id = filter.replace("custom:", "");
  const label = customModuleName(id);
  const ids = new Set([id]);
  state.customModules.filter((module) => module.name === label).forEach((module) => ids.add(module.id));
  Object.values(state.entries).forEach((entry) => {
    Object.keys(entry.customRecords || {}).forEach((recordId) => {
      if (customModuleName(recordId) === label) ids.add(recordId);
    });
  });
  return [...ids];
}

function historyHidden(id) {
  return (state.settings.hiddenHistoryModules || []).includes(id);
}

function customFilterOptions() {
  const ids = new Set();
  state.customModules.filter((module) => !historyHidden(module.id) && hasRecordsForFilter(`custom:${module.id}`)).forEach((module) => ids.add(module.id));
  Object.values(state.entries).forEach((entry) =>
    Object.entries(entry.customRecords || {})
      .filter(([id, record]) => !historyHidden(id) && recordHasContent(record))
      .forEach(([id]) => ids.add(id)),
  );
  const seenLabels = new Set();
  return [...ids].map((id) => [`custom:${id}`, customModuleName(id)]).filter(([, label]) => {
    if (seenLabels.has(label)) return false;
    seenLabels.add(label);
    return true;
  });
}

function customModuleName(id) {
  const module = state.customModules.find((item) => item.id === id);
  if (module) return module.name;
  return `已移除板块`;
}

function customModuleColor(id) {
  const module = state.customModules.find((item) => item.id === id);
  return (module && module.color) || "#5b4a4f";
}

function modulesForEntry(entry) {
  const modules = { ...allModules() };
  Object.entries(builtInModules).forEach(([id, module]) => {
    if (entry[id] && !historyHidden(id) && !modules[id]) modules[id] = module;
  });
  Object.keys(entry.customRecords || {}).filter((id) => !historyHidden(id)).forEach((id) => {
    const key = `custom:${id}`;
    if (!modules[key]) {
      const module = state.customModules.find((item) => item.id === id);
      modules[key] = module
        ? { ...module, title: module.name, mark: module.icon || "＋", color: module.color || "var(--violet)", custom: true }
        : { id, title: "已移除板块", fields: [], mark: "＋", color: "#5b4a4f", custom: true };
    }
  });
  return modules;
}

function hasAnyEntry(entry) {
  return Boolean(
    entry &&
      (["mood", "fitness", "study", "outing", "tarot", "journal"].some((key) => entry[key]) ||
        cycleDayHasContent(entry.cycleDay) ||
        Object.keys(entry.customRecords || {}).filter((id) => !historyHidden(id)).length ||
        todosForDate(entry.date).length),
  );
}

function toggleDefaultModule(id) {
  const hidden = new Set(state.settings.hiddenDefaultModules || []);
  const history = new Set(state.settings.hiddenHistoryModules || []);
  if (hidden.has(id)) {
    hidden.delete(id);
    history.delete(id);
  } else {
    if (!confirm("确定隐藏模块吗？")) return;
    hidden.add(id);
    history.add(id);
  }
  state.settings.hiddenDefaultModules = [...hidden];
  state.settings.hiddenHistoryModules = [...history];
  saveState();
}

function systemModuleVisible(id) {
  return !(state.settings.hiddenDefaultModules || []).includes(id);
}

function toggleBuiltInModule(id) {
  const hidden = new Set(state.settings.hiddenBuiltInModules || []);
  const history = new Set(state.settings.hiddenHistoryModules || []);
  if (hidden.has(id)) {
    hidden.delete(id);
    history.delete(id);
  } else {
    if (!confirm("确定隐藏模块吗？")) return;
    hidden.add(id);
    history.add(id);
  }
  state.settings.hiddenBuiltInModules = [...hidden];
  state.settings.hiddenHistoryModules = [...history];
  saveState();
}

function toggleSystemHistoryVisibility(id, willHide) {
  const hidden = new Set(state.settings.hiddenHistoryModules || []);
  if (willHide) hidden.add(id);
  else hidden.delete(id);
  state.settings.hiddenHistoryModules = [...hidden];
}

function toggleCustomModule(id) {
  const module = state.customModules.find((item) => item.id === id);
  if (!module) return;
  const history = new Set(state.settings.hiddenHistoryModules || []);
  const willHide = module.isEnabled !== false;
  if (willHide) {
    if (!confirm("确定隐藏模块吗？")) return;
    module.isEnabled = false;
    history.add(id);
  } else {
    module.isEnabled = true;
    history.delete(id);
  }
  state.settings.hiddenHistoryModules = [...history];
  saveState();
}

function deleteBuiltInModule(id) {
  activeSheet = { kind: "deleteModule", step: 1, moduleType: "builtIn", id, title: builtInModules[id].title };
}

function getRecord(entry, type) {
  if (type.startsWith("custom:")) return (entry.customRecords || {})[type.replace("custom:", "")];
  return entry[type];
}

function firstCustomField(type) {
  const module = state.customModules.find((item) => item.id === type.replace("custom:", ""));
  return module && module.fields[0] ? module.fields[0].id : "";
}

function addModuleField(form) {
  const count = form.querySelectorAll(".module-field").length;
  const wrap = form.querySelector(".field .stack");
  wrap.insertAdjacentHTML("beforeend", renderModuleField({ id: `field-${Date.now()}`, label: "", fieldType: "text", options: "" }, count));
  bindEvents();
}

function removeModuleField(button) {
  const fields = button.closest("form").querySelectorAll(".module-field");
  if (fields.length <= 1) {
    alert("至少保留一个字段。");
    return;
  }
  button.closest(".module-field").remove();
}

function addRecordItem(button) {
  const form = button.closest("form");
  const type = button.dataset.type;
  const wrap = form.querySelector(".multi-items");
  const index = wrap.querySelectorAll(".multi-item").length;
  wrap.insertAdjacentHTML("beforeend", renderMultiItem(type, blankItem(type), index, form.dataset.date || todayKey()));
  bindEvents();
}

function removeRecordItem(button) {
  const items = button.closest("form").querySelectorAll(".multi-item");
  if (items.length <= 1) {
    alert("至少保留一条。");
    return;
  }
  button.closest(".multi-item").remove();
}

function defaultOptionsForField(field) {
  const own = splitOptions(field.options);
  if (own.length) return own;
  if (field.fieldType === "boolean") return ["是", "否"];
  if (field.fieldType === "rating") return ["1", "2", "3", "4", "5"];
  if (field.fieldType === "tags") return ["朋友", "工作", "独处"];
  return [];
}

function addFitnessOption(form) {
  const input = form.querySelector('[name="customActivityType"]');
  const value = input && input.value.trim();
  if (!value) {
    alert("先写一个运动名称。");
    return;
  }
  addUniqueSettingOption("fitnessOptions", value);
  const activityInput = form.querySelector('[name="activityType"]');
  if (activityInput) activityInput.value = value;
  saveState();
  const chips = activityInput.closest(".field").querySelector(".chips");
  chips.querySelectorAll(".chip").forEach((chip) => chip.classList.remove("is-selected"));
  chips.insertAdjacentHTML("beforeend", `<button class="chip is-selected" type="button" data-action="pick-chip" data-name="activityType" data-value="${escapeAttr(value)}" data-multiple="false">${escapeHtml(value)}</button>`);
  bindEvents();
}

function deleteFitnessOption(value) {
  state.settings.fitnessOptions = (state.settings.fitnessOptions || []).filter((option) => option !== value);
  saveState();
}

function addUniqueSettingOption(key, value) {
  const next = new Set(state.settings[key] || []);
  next.add(value.trim());
  state.settings[key] = [...next];
}

function startTimer(timerId) {
  state.timers[timerId] = { startedAt: Date.now() };
  saveState();
}

function stopTimer(form, timerId, targetName) {
  const timer = state.timers[timerId];
  if (!timer) return;
  const minutes = elapsedTimerMinutes(timer.startedAt);
  const input = form.querySelector(`[name="${targetName}"]`);
  if (input) input.value = minutes;
  delete state.timers[timerId];
  saveState();
  const timerBox = form.querySelector(".timer-box");
  if (timerBox) {
    timerBox.innerHTML = `<strong>计时已结束</strong><span class="subtle">已自动填入 ${minutes} 分钟。</span>`;
  }
  syncTimerTicker();
}

function elapsedTimerMinutes(startedAt) {
  return Math.max(1, Math.floor((Date.now() - Number(startedAt)) / 60000) + 1);
}

function syncTimerTicker() {
  if (timerTicker) clearInterval(timerTicker);
  if (!Object.keys(state.timers || {}).length) {
    timerTicker = null;
    return;
  }
  timerTicker = setInterval(() => {
    document.querySelectorAll(".timer-live").forEach((node) => {
      node.textContent = `已经 ${elapsedTimerLabel(node.dataset.startedAt)}`;
    });
  }, 1000);
}

function elapsedTimerLabel(startedAt) {
  const seconds = Math.max(0, Math.floor((Date.now() - Number(startedAt)) / 1000));
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes} 分 ${String(rest).padStart(2, "0")} 秒`;
}

function splitOptions(value) {
  if (Array.isArray(value)) return value;
  return String(value || "")
    .split(/[、,，]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function saveModule(id, data) {
  const fields = [];
  for (const [key] of data.entries()) {
    const match = key.match(/^fieldId-(\d+)$/);
    if (!match) continue;
    const index = match[1];
    const label = data.get(`fieldLabel-${index}`);
    if (!label) continue;
    fields.push({
      id: data.get(`fieldId-${index}`) || `field-${Date.now()}-${index}`,
      label,
      fieldType: data.get(`fieldType-${index}`) || "text",
      options: data.get(`fieldOptions-${index}`) || "",
    });
  }
  if (!data.get("name") || !fields.length) {
    alert("模块需要名称，并且至少保留一个字段。");
    return;
  }
  const next = {
    id: id || crypto.randomUUID(),
    name: data.get("name"),
    icon: data.get("icon") || "＋",
    color: data.get("color") || "#9a79b8",
    isEnabled: data.get("isEnabled") !== "否",
    hasTimer: data.get("hasTimer") === "添加",
    fields,
  };
  if (next.hasTimer && !next.fields.some((field) => field.id === `timerMinutes-${next.id}`)) {
    next.fields.unshift({ id: `timerMinutes-${next.id}`, label: "计时分钟", fieldType: "number", options: "" });
  }
  const existing = state.customModules.findIndex((module) => module.id === next.id);
  if (existing >= 0) state.customModules[existing] = next;
  else state.customModules.push(next);
  saveState();
}

function deleteModule(id) {
  const module = state.customModules.find((item) => item.id === id);
  activeSheet = { kind: "deleteModule", step: 1, moduleType: "custom", id, title: module ? module.name : "模块" };
}

function continueDeleteModule() {
  activeSheet = { ...activeSheet, step: 2 };
}

function confirmDeleteModule(removeHistory) {
  if (activeSheet.moduleType === "builtIn") {
    const deleted = new Set(state.settings.deletedBuiltInModules || []);
    const hidden = new Set(state.settings.hiddenBuiltInModules || []);
    deleted.add(activeSheet.id);
    hidden.add(activeSheet.id);
    state.settings.deletedBuiltInModules = [...deleted];
    state.settings.hiddenBuiltInModules = [...hidden];
    if (removeHistory) {
      Object.values(state.entries).forEach((entry) => delete entry[activeSheet.id]);
    }
  } else {
    const module = state.customModules.find((item) => item.id === activeSheet.id);
    if (module) {
      module.isDeleted = true;
      module.isEnabled = false;
    }
    if (removeHistory) {
      Object.values(state.entries).forEach((entry) => {
        if (entry.customRecords) delete entry.customRecords[activeSheet.id];
      });
    }
  }
  saveState();
  activeSheet = null;
}

function setTheme(theme) {
  state.settings.theme = theme;
  saveState();
  document.querySelector("#app").dataset.theme = theme;
  updateThemeColor(theme);
}

function updateThemeColor(theme) {
  const colors = {
    avocado: "#a8c957",
    velvet: "#6d0811",
    ginger: "#eab84b",
    pomelo: "#b21d12",
    taro: "#6969bc",
  };
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", colors[theme] || colors.avocado);
}

function saveSettings(data) {
  state.settings.reminderEnabled = data.get("reminderEnabled") === "开启";
  state.settings.reminderTime = data.get("reminderTime") || "21:30";
  saveState();
}

function cloudConfig() {
  const saved = (() => {
    try {
      return JSON.parse(localStorage.getItem(CLOUD_CONFIG_KEY)) || {};
    } catch {
      return {};
    }
  })();
  return { ...DEFAULT_CLOUD_CONFIG, ...saved };
}

function cloudMeta() {
  try {
    return JSON.parse(localStorage.getItem(CLOUD_META_KEY)) || {};
  } catch {
    return {};
  }
}

function saveCloudMeta(next) {
  localStorage.setItem(CLOUD_META_KEY, JSON.stringify({ ...cloudMeta(), ...next }));
}

function saveCloudConfig(data) {
  const config = {
    url: (data.get("supabaseUrl") || "").trim(),
    anonKey: (data.get("supabaseAnonKey") || "").trim(),
  };
  localStorage.setItem(CLOUD_CONFIG_KEY, JSON.stringify(config));
  cloudClient = null;
  initCloudClient();
  alert("云配置已保存。");
}

function markLocalChanged() {
  saveCloudMeta({ localUpdatedAt: new Date().toISOString() });
}

function initCloudClient() {
  if (cloudClient) return cloudClient;
  const config = cloudConfig();
  if (!config.url || !config.anonKey || !window.supabase) return null;
  cloudClient = window.supabase.createClient(config.url, config.anonKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  });
  completeCloudLoginFromUrl(cloudClient);
  cloudClient.auth.getSession().then(({ data }) => {
    cloudSession = data.session || null;
    if (cloudSession) syncCloudOnLogin();
    render();
  });
  cloudClient.auth.onAuthStateChange((event, session) => {
    cloudSession = session || null;
    if (event === "PASSWORD_RECOVERY") activeSheet = { kind: "resetPassword" };
    if (cloudSession && ["INITIAL_SESSION", "SIGNED_IN"].includes(event)) syncCloudOnLogin();
    if (!cloudSession) initialCloudSyncDone = false;
    render();
  });
  return cloudClient;
}

async function completeCloudLoginFromUrl(client) {
  const searchParams = new URLSearchParams(location.search);
  const hashParams = new URLSearchParams(location.hash.replace(/^#/, ""));
  const isPasswordRecovery = searchParams.get("reset") === "1" || searchParams.get("type") === "recovery" || hashParams.get("type") === "recovery" || location.href.includes("recovery");
  const authError = searchParams.get("error_description") || hashParams.get("error_description");
  if (authError) {
    alert(`登录链接失效：${authError}`);
    history.replaceState(null, "", `${location.pathname}?v=50`);
    return;
  }

  const tokenHash = searchParams.get("token_hash") || hashParams.get("token_hash");
  if (tokenHash) {
    const otpType = searchParams.get("type") || hashParams.get("type") || (isPasswordRecovery ? "recovery" : "email");
    const { data, error } = await client.auth.verifyOtp({ token_hash: tokenHash, type: otpType });
    if (error) {
      alert(`链接识别失败：${error.message}`);
      return;
    }
    cloudSession = data.session || null;
    history.replaceState(null, "", `${location.pathname}?v=50`);
    await syncCloudOnLogin();
    if (otpType === "recovery" || isPasswordRecovery) activeSheet = { kind: "resetPassword" };
    alert(otpType === "recovery" || isPasswordRecovery ? "请设置新密码。" : "登录成功。");
    render();
    return;
  }

  const code = searchParams.get("code") || hashParams.get("code");
  if (code) {
    const { data, error } = await client.auth.exchangeCodeForSession(code);
    if (error) {
      alert(`登录链接识别失败：${error.message}`);
      return;
    }
    cloudSession = data.session || null;
    history.replaceState(null, "", `${location.pathname}?v=50`);
    await syncCloudOnLogin();
    if (isPasswordRecovery) activeSheet = { kind: "resetPassword" };
    alert(isPasswordRecovery ? "请设置新密码。" : "登录成功。");
    render();
    return;
  }

  if (!location.hash.includes("access_token=")) return;
  const accessToken = hashParams.get("access_token");
  const refreshToken = hashParams.get("refresh_token");
  if (!accessToken || !refreshToken) {
    const { data } = await client.auth.getSession();
    cloudSession = data.session || null;
    if (!cloudSession) alert("登录链接不完整，请重新发送一封登录邮件，再从最新邮件进入。");
    render();
    return;
  }
  const { data, error } = await client.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
  if (error) {
    alert(`登录链接识别失败：${error.message}`);
    return;
  }
  cloudSession = data.session || null;
  history.replaceState(null, "", `${location.pathname}?v=50`);
  await syncCloudOnLogin();
  if (isPasswordRecovery) activeSheet = { kind: "resetPassword" };
  alert(isPasswordRecovery ? "请设置新密码。" : "登录成功。");
  render();
}

function togglePasswordVisibility(button) {
  const wrap = button.closest(".password-wrap");
  const input = wrap ? wrap.querySelector("input") : null;
  if (!input) return;
  const shouldShow = input.type === "password";
  input.type = shouldShow ? "text" : "password";
  button.classList.toggle("is-visible", shouldShow);
  button.setAttribute("aria-label", shouldShow ? "隐藏密码" : "显示密码");
  button.title = shouldShow ? "隐藏密码" : "显示密码";
  input.focus();
}

async function completeHashLogin(client) {
  if (!location.hash.includes("access_token=")) return;
  const params = new URLSearchParams(location.hash.slice(1));
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");
  if (!accessToken || !refreshToken) {
    alert("检测到登录链接，但链接里缺少 refresh_token。请回到邮箱复制完整链接，从 http://127.0.0.1:5173 一直到最后一个字符都要复制。");
    return;
  }
  const { data, error } = await client.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
  if (error) {
    alert(`登录链接识别失败：${error.message}`);
    return;
  }
  cloudSession = data.session || null;
  history.replaceState(null, "", `${location.pathname}?v=50`);
  await syncCloudOnLogin();
  alert("登录成功。");
  render();
}

async function cloudPasswordLogin(data) {
  const client = initCloudClient();
  const email = (data.get("email") || "").trim();
  const password = (data.get("password") || "").trim();
  const mode = data.get("cloudMode") || "login";
  if (!client) {
    alert("云同步服务还没加载好，请刷新页面再试。");
    return;
  }
  if (!email) {
    alert("先填写邮箱。");
    return;
  }
  if (password.length < 6) {
    alert("密码至少需要 6 位。");
    return;
  }
  saveCloudMeta({ email });
  const result = mode === "signup"
    ? await client.auth.signUp({ email, password })
    : await client.auth.signInWithPassword({ email, password });
  const { data: authData, error } = result;
  if (error) {
    alert(`${mode === "signup" ? "注册" : "登录"}失败：${error.message}`);
    return;
  }
  cloudSession = authData.session || null;
  if (!cloudSession) {
    alert("账号已创建，但 Supabase 还要求邮箱确认。请在 Supabase 里关闭 Confirm email，或者确认邮件后再登录。");
    return;
  }
  await syncCloudOnLogin();
  alert(mode === "signup" ? "注册并登录成功。" : "登录成功。");
}

async function cloudForgotPassword() {
  const client = initCloudClient();
  const emailInput = document.querySelector('form[data-action="cloud-login"] input[name="email"]');
  const email = ((emailInput && emailInput.value) || cloudMeta().email || "").trim();
  if (!client) {
    alert("云同步服务还没加载好，请刷新页面再试。");
    return;
  }
  if (!email) {
    alert("先填写邮箱，再点忘记密码。");
    if (emailInput) emailInput.focus();
    return;
  }
  saveCloudMeta({ email });
  const { error } = await client.auth.resetPasswordForEmail(email, {
    redirectTo: authRedirectUrl("reset=1"),
  });
  if (error) {
    alert(`重置邮件发送失败：${error.message}`);
    return;
  }
  alert("重置密码邮件已发送，请打开邮箱按提示设置新密码。");
}

function authRedirectUrl(extraQuery = "") {
  const current = `${location.origin}${location.pathname}`;
  const base = location.protocol === "https:" && !location.hostname.includes("localhost") ? current : PUBLIC_APP_URL;
  const query = extraQuery ? `?v=50&${extraQuery}` : "?v=50";
  return `${base.replace(/[?#].*$/, "")}${query}`;
}

async function saveNewPassword(data) {
  const client = initCloudClient();
  const password = (data.get("newPassword") || "").trim();
  if (!client) {
    alert("云同步服务还没加载好，请刷新页面再试。");
    return false;
  }
  if (password.length < 6) {
    alert("密码至少需要 6 位。");
    return false;
  }
  const { error } = await client.auth.updateUser({ password });
  if (error) {
    alert(`密码更新失败：${error.message}`);
    return false;
  }
  queueCloudSync();
  alert("密码已更新，可以继续使用。");
  return true;
}

async function cloudLogin(data) {
  const client = initCloudClient();
  const email = (data.get("email") || "").trim();
  if (!client) {
    alert("云同步服务还没加载好，请刷新页面再试。");
    return;
  }
  if (!email) {
    alert("先填写邮箱。");
    return;
  }
  saveCloudMeta({ email });
  const { error } = await client.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: authRedirectUrl() },
  });
  if (error) {
    alert(`发送失败：${error.message}`);
    return;
  }
  alert("登录邮件已发送。请打开邮件里的链接完成登录。");
}

async function cloudLogout() {
  const client = initCloudClient();
  if (client) await client.auth.signOut();
  cloudSession = null;
  initialCloudSyncDone = false;
  render();
}

function queueCloudSync() {
  if (cloudSession && !initialCloudSyncDone) return;
  if (cloudSyncTimer) clearTimeout(cloudSyncTimer);
  cloudSyncTimer = setTimeout(() => pushCloudState(false), 1200);
}

async function syncCloudOnLogin() {
  const client = initCloudClient();
  if (!client || !cloudSession) return;
  if (cloudSyncTimer) clearTimeout(cloudSyncTimer);
  const { data, error } = await client.from("daily_box_state").select("payload, updated_at").eq("user_id", cloudSession.user.id).maybeSingle();
  if (error) {
    initialCloudSyncDone = true;
    return;
  }
  const localHasData = hasMeaningfulState(state);
  const cloudState = data && data.payload ? normalizeState(data.payload) : null;
  const cloudHasData = Boolean(cloudState && hasMeaningfulState(cloudState));
  const localUpdatedAt = cloudMeta().localUpdatedAt || "";
  const cloudUpdatedAt = (data && data.updated_at) || "";
  if (cloudHasData && (!localHasData || (cloudUpdatedAt && (!localUpdatedAt || cloudUpdatedAt > localUpdatedAt)))) {
    state = cloudState;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    saveCloudMeta({ lastSyncedAt: cloudUpdatedAt || new Date().toISOString(), localUpdatedAt: cloudUpdatedAt || new Date().toISOString() });
    initialCloudSyncDone = true;
    render();
    return;
  }
  initialCloudSyncDone = true;
  if (localHasData && (!cloudHasData || (localUpdatedAt && (!cloudUpdatedAt || localUpdatedAt > cloudUpdatedAt)))) {
    await pushCloudState(false);
  }
}

function hasMeaningfulState(value) {
  return Boolean(
    Object.keys(value.entries || {}).length ||
    (value.cycles || []).length ||
    (value.todos || []).length ||
    (value.customModules || []).length ||
    Object.keys(value.timers || {}).length,
  );
}

async function pushCloudState(showAlert = false) {
  const client = initCloudClient();
  if (!client || !cloudSession) return;
  const payload = JSON.parse(JSON.stringify(state));
  const { error } = await client.from("daily_box_state").upsert(
    {
      user_id: cloudSession.user.id,
      payload,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );
  if (error) {
    if (showAlert) alert(`上传失败：${error.message}`);
    return;
  }
  saveCloudMeta({ lastSyncedAt: new Date().toISOString() });
  if (showAlert) alert("已上传到云端。");
}

async function pullCloudState(showConfirm = false) {
  const client = initCloudClient();
  if (!client || !cloudSession) return;
  if (showConfirm && !confirm("从云端恢复会覆盖本机当前数据，确定继续吗？")) return;
  const { data, error } = await client.from("daily_box_state").select("payload, updated_at").eq("user_id", cloudSession.user.id).maybeSingle();
  if (error) {
    alert(`读取失败：${error.message}`);
    return;
  }
  if (!data || !data.payload) {
    alert("云端还没有数据。");
    return;
  }
  state = normalizeState(data.payload);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  saveCloudMeta({ lastSyncedAt: data.updated_at || new Date().toISOString(), localUpdatedAt: new Date().toISOString() });
  render();
}

function formatMinutes(minutes) {
  if (minutes < 60) return `${minutes} 分钟`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} 小时 ${m} 分钟` : `${h} 小时`;
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `daily-box-backup-${todayKey()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const next = JSON.parse(reader.result);
      if (!next.entries || !Array.isArray(next.cycles)) throw new Error("bad shape");
      if (!confirm("导入会覆盖当前数据，确定继续吗？")) return;
      state = normalizeState(next);
      saveState();
      render();
    } catch {
      alert("这个文件看起来不是有效的日常盒子备份。");
    }
  };
  reader.readAsText(file);
}

function clearData() {
  if (!confirm("确定清空全部数据吗？这个操作不能撤销。")) return;
  state = normalizeState();
  saveState();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").then((registration) => {
    registration.addEventListener("updatefound", () => {
      const worker = registration.installing;
      if (!worker) return;
      worker.addEventListener("statechange", () => {
        if (worker.state === "activated" && navigator.serviceWorker.controller && !sessionStorage.getItem("daily-box-reloaded-v50")) {
          sessionStorage.setItem("daily-box-reloaded-v50", "1");
          location.reload();
        }
      });
    });
  }).catch(() => {});
}

initCloudClient();
render();



