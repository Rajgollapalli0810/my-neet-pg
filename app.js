const config = window.NEET_PG_DEMO_CONFIG;
const app = document.querySelector("#app");

const SECTION_COUNT = config.totalSections;
const QUESTIONS_PER_SECTION = config.questionsPerSection;
const TOTAL_QUESTIONS = SECTION_COUNT * QUESTIONS_PER_SECTION;
const STORAGE_KEY = "neet-pg-2026-demo-state";
const MODULE_KEY = "neet-pg-2026-demo-module";
const QUESTION_MODULES = [
  { name: "Module A", offset: 0, step: 1, videoQuestionIndex: 5 },
  { name: "Module B", offset: 11, step: 5, videoQuestionIndex: 11 },
  { name: "Module C", offset: 23, step: 7, videoQuestionIndex: 17 },
  { name: "Module D", offset: 35, step: 11, videoQuestionIndex: 23 }
];

const state = {
  started: false,
  completed: false,
  currentSection: 0,
  currentQuestion: 0,
  moduleIndex: readModuleIndex(),
  sectionStartedAt: null,
  submittedSections: [],
  answers: Array.from({ length: SECTION_COUNT }, () => Array(QUESTIONS_PER_SECTION).fill(null)),
  review: Array.from({ length: SECTION_COUNT }, () => Array(QUESTIONS_PER_SECTION).fill(false))
};

let questions = [];
let timerId = null;

function readModuleIndex() {
  const saved = Number(localStorage.getItem(MODULE_KEY) || 0);
  return Number.isFinite(saved) ? saved % QUESTION_MODULES.length : 0;
}

function activeModule() {
  return QUESTION_MODULES[state.moduleIndex % QUESTION_MODULES.length];
}

function createQuestionSet() {
  const bank = config.questionBank;
  const module = activeModule();
  const result = [];

  for (let sectionIndex = 0; sectionIndex < SECTION_COUNT; sectionIndex += 1) {
    for (let questionIndex = 0; questionIndex < QUESTIONS_PER_SECTION; questionIndex += 1) {
      const sequenceIndex = sectionIndex * QUESTIONS_PER_SECTION + questionIndex;
      const bankIndex = (module.offset + sequenceIndex * module.step) % bank.length;
      const source = bank[bankIndex];
      const absoluteNumber = sectionIndex * QUESTIONS_PER_SECTION + questionIndex + 1;
      const videoCase = questionIndex === module.videoQuestionIndex ? config.videoCases[sectionIndex] : null;
      const questionSource = videoCase?.question || source;
      result.push({
        id: `S${sectionIndex + 1}-Q${questionIndex + 1}`,
        number: absoluteNumber,
        sectionIndex,
        localNumber: questionIndex + 1,
        subject: questionSource.subject,
        stem: videoCase
          ? `${videoCase.title}. Watch the clip and answer: ${questionSource.stem}`
          : questionSource.stem,
        options: questionSource.options,
        answer: questionSource.answer,
        explanation: questionSource.explanation,
        video: videoCase
      });
    }
  }

  return result;
}

function sectionQuestions(sectionIndex = state.currentSection) {
  return questions.filter((question) => question.sectionIndex === sectionIndex);
}

function currentQuestion() {
  return sectionQuestions()[state.currentQuestion];
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const saved = JSON.parse(raw);
    Object.assign(state, saved);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function resetExam() {
  const nextModuleIndex = (state.moduleIndex + 1) % QUESTION_MODULES.length;
  localStorage.setItem(MODULE_KEY, String(nextModuleIndex));
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

function confirmAndResetExam() {
  if (state.started && !state.completed) {
    const ok = confirm("Reset this attempt and load a different question module?");
    if (!ok) return;
  }
  resetExam();
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(Math.max(0, totalSeconds) / 60);
  const seconds = Math.max(0, totalSeconds) % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function sectionRemainingSeconds() {
  if (!state.sectionStartedAt) return config.sectionDurationSeconds;
  const elapsed = Math.floor((Date.now() - state.sectionStartedAt) / 1000);
  return Math.max(0, config.sectionDurationSeconds - elapsed);
}

function answeredCount(sectionIndex = state.currentSection) {
  return state.answers[sectionIndex].filter((answer) => answer !== null).length;
}

function reviewCount(sectionIndex = state.currentSection) {
  return state.review[sectionIndex].filter(Boolean).length;
}

function startTimer() {
  clearInterval(timerId);
  timerId = setInterval(() => {
    const timer = document.querySelector("#timer");
    const remaining = sectionRemainingSeconds();
    if (timer) {
      timer.textContent = formatTime(remaining);
      timer.classList.toggle("danger", remaining <= 300);
    }
    if (remaining <= 0) submitSection(true);
  }, 500);
}

function buildVideoPoster(text) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540">
      <rect width="960" height="540" fill="#101828"/>
      <rect x="48" y="48" width="864" height="444" rx="18" fill="#1d2939" stroke="#475467" stroke-width="3"/>
      <circle cx="480" cy="270" r="68" fill="#e9f8f3"/>
      <path d="M462 230 L462 310 L532 270 Z" fill="#087443"/>
      <text x="480" y="400" text-anchor="middle" font-family="Arial, sans-serif" font-size="36" font-weight="700" fill="#f9fafb">${text}</text>
      <text x="480" y="442" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#d0d5dd">Replace the MP4 file in assets/video-cases for real clips</text>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function renderStart() {
  clearInterval(timerId);
  app.innerHTML = `
    <main class="start-screen">
      <section class="hero-panel">
        <div>
          <p class="eyebrow">Demo test environment</p>
          <h1>${config.examTitle}</h1>
          <p class="lead">A clean, exam-like NEET PG practice demo with 180 MCQs, five locked sections, independent section timers, negative marking and video-based case questions.</p>
          <p class="module-pill">Current paper: <strong>${activeModule().name}</strong></p>
        </div>
        <div class="hero-stats" aria-label="Exam summary">
        <article><span>Total Questions</span><strong>${TOTAL_QUESTIONS}</strong></article>
          <article><span>Sections</span><strong>${SECTION_COUNT}</strong></article>
          <article><span>Per Section</span><strong>${QUESTIONS_PER_SECTION}</strong></article>
          <article><span>Timer</span><strong>42 min</strong></article>
        </div>
      </section>

      <section class="instructions">
        <h2>Instructions</h2>
        <div class="instruction-grid">
          <article><strong>One section at a time</strong><p>You can navigate only within the active section.</p></article>
          <article><strong>No backward access</strong><p>Submitted sections are locked permanently.</p></article>
          <article><strong>Auto submit</strong><p>When 42 minutes end, the section submits and the next one opens.</p></article>
          <article><strong>Marking</strong><p>Correct +4, wrong -1, unattempted 0.</p></article>
        </div>
        <label class="consent"><input type="checkbox" id="agree" /> I have read the instructions and want to begin.</label>
        <div class="start-actions">
          <button class="primary-action" id="startExam" type="button" disabled>Start Exam</button>
          <button class="secondary-action" id="loadDifferentModule" type="button">Load Different Module</button>
        </div>
      </section>
    </main>
  `;

  document.querySelector("#agree").addEventListener("change", (event) => {
    document.querySelector("#startExam").disabled = !event.target.checked;
  });

  document.querySelector("#startExam").addEventListener("click", () => {
    state.started = true;
    state.moduleIndex = readModuleIndex();
    state.sectionStartedAt = Date.now();
    saveState();
    questions = createQuestionSet();
    renderExam();
  });

  document.querySelector("#loadDifferentModule").addEventListener("click", resetExam);
}

function renderExam() {
  if (state.completed) {
    renderResults();
    return;
  }

  const q = currentQuestion();
  const selected = state.answers[state.currentSection][state.currentQuestion];
  const isReviewed = state.review[state.currentSection][state.currentQuestion];
  const sectionName = config.sections[state.currentSection];

  app.innerHTML = `
    <div class="exam-shell">
      <header class="exam-header">
        <div>
          <p class="eyebrow">Section ${state.currentSection + 1} of ${SECTION_COUNT}</p>
          <h1>${sectionName}</h1>
          <p class="module-line">${activeModule().name}</p>
        </div>
        <div class="timer-card">
          <span>Time Left</span>
          <strong id="timer">${formatTime(sectionRemainingSeconds())}</strong>
        </div>
      </header>

      <section class="status-strip">
        <span>Answered: <strong>${answeredCount()}</strong></span>
        <span>Marked: <strong>${reviewCount()}</strong></span>
        <span>Unattempted: <strong>${QUESTIONS_PER_SECTION - answeredCount()}</strong></span>
        <span>Question: <strong>${state.currentQuestion + 1}/${QUESTIONS_PER_SECTION}</strong></span>
        <button class="mini-reset" id="resetModuleExam" type="button">Reset & New Module</button>
      </section>

      <main class="exam-grid">
        <section class="question-panel">
          <div class="question-meta">
            <span>Q${q.localNumber}</span>
            <span>${q.subject}</span>
            ${q.video ? "<span>Video Based</span>" : ""}
          </div>
          ${q.video ? renderVideo(q.video) : ""}
          <h2>${q.stem}</h2>
          <div class="options" role="radiogroup" aria-label="Question options">
            ${q.options.map((option, index) => `
              <label class="option ${selected === index ? "selected" : ""}">
                <input type="radio" name="answer" value="${index}" ${selected === index ? "checked" : ""} />
                <span>${String.fromCharCode(65 + index)}</span>
                <strong>${option}</strong>
              </label>
            `).join("")}
          </div>
          <div class="actions">
            <button class="secondary-action" id="clearAnswer" type="button">Clear Response</button>
            <button class="review-action ${isReviewed ? "active" : ""}" id="markReview" type="button">${isReviewed ? "Unmark Review" : "Mark for Review"}</button>
            <button class="primary-action" id="saveNext" type="button">Save & Next</button>
            <button class="submit-action" id="submitSection" type="button">Submit Section</button>
          </div>
        </section>

        <aside class="navigator" aria-label="Question navigation">
          <h2>Question Navigator</h2>
          <div class="nav-grid">
            ${sectionQuestions().map((question, index) => questionButton(question, index)).join("")}
          </div>
          <div class="legend">
            <span><i class="answered"></i>Answered</span>
            <span><i class="review"></i>Review</span>
            <span><i class="current"></i>Current</span>
            <span><i></i>Not answered</span>
          </div>
        </aside>
      </main>
    </div>
  `;

  bindExamEvents();
  startTimer();
}

function renderVideo(video) {
  const extension = video.src.split("?")[0].split(".").pop().toLowerCase();
  const type = {
    mp4: "video/mp4",
    webm: "video/webm",
    ogv: "video/ogg",
    ogg: "video/ogg"
  }[extension] || "video/mp4";

  return `
    <figure class="video-case">
      <video controls preload="metadata" playsinline poster="${buildVideoPoster(video.posterText)}">
        <source src="${video.src}" type="${type}" />
        Your browser cannot play this video. Add an MP4 at ${video.src}.
      </video>
      <figcaption>${video.title}</figcaption>
    </figure>
  `;
}

function questionButton(question, index) {
  const answered = state.answers[state.currentSection][index] !== null;
  const reviewed = state.review[state.currentSection][index];
  const current = index === state.currentQuestion;
  return `
    <button
      type="button"
      class="${answered ? "answered" : ""} ${reviewed ? "review" : ""} ${current ? "current" : ""}"
      data-question-index="${index}"
      aria-label="Go to question ${question.localNumber}">
      ${question.localNumber}
    </button>
  `;
}

function bindExamEvents() {
  document.querySelectorAll("input[name='answer']").forEach((input) => {
    input.addEventListener("change", () => {
      state.answers[state.currentSection][state.currentQuestion] = Number(input.value);
      saveState();
      renderExam();
    });
  });

  document.querySelectorAll("[data-question-index]").forEach((button) => {
    button.addEventListener("click", () => {
      state.currentQuestion = Number(button.dataset.questionIndex);
      saveState();
      renderExam();
    });
  });

  document.querySelector("#clearAnswer").addEventListener("click", () => {
    state.answers[state.currentSection][state.currentQuestion] = null;
    saveState();
    renderExam();
  });

  document.querySelector("#markReview").addEventListener("click", () => {
    const current = state.review[state.currentSection][state.currentQuestion];
    state.review[state.currentSection][state.currentQuestion] = !current;
    saveState();
    renderExam();
  });

  document.querySelector("#saveNext").addEventListener("click", () => {
    if (state.currentQuestion < QUESTIONS_PER_SECTION - 1) {
      state.currentQuestion += 1;
      saveState();
      renderExam();
      return;
    }
    submitSection(false);
  });

  document.querySelector("#submitSection").addEventListener("click", () => submitSection(false));
  document.querySelector("#resetModuleExam").addEventListener("click", confirmAndResetExam);
}

function submitSection(autoSubmitted) {
  clearInterval(timerId);
  if (state.submittedSections.includes(state.currentSection)) return;

  if (!autoSubmitted) {
    const ok = confirm("Submit this section? You cannot return to it after submission.");
    if (!ok) {
      startTimer();
      return;
    }
  }

  state.submittedSections.push(state.currentSection);

  if (state.currentSection >= SECTION_COUNT - 1) {
    state.completed = true;
    saveState();
    renderResults();
    return;
  }

  state.currentSection += 1;
  state.currentQuestion = 0;
  state.sectionStartedAt = Date.now();
  saveState();
  renderSectionTransition(autoSubmitted);
}

function renderSectionTransition(autoSubmitted) {
  app.innerHTML = `
    <main class="transition-screen">
      <section>
        <p class="eyebrow">${autoSubmitted ? "Time is up" : "Section submitted"}</p>
        <h1>Section ${state.currentSection} is locked.</h1>
        <p>You are moving to Section ${state.currentSection + 1}. Previous sections cannot be opened again.</p>
        <button class="primary-action" id="continueExam" type="button">Continue to Next Section</button>
      </section>
    </main>
  `;

  document.querySelector("#continueExam").addEventListener("click", renderExam);
}

function calculateResults() {
  const sections = [];
  let correct = 0;
  let wrong = 0;
  let unattempted = 0;

  for (let sectionIndex = 0; sectionIndex < SECTION_COUNT; sectionIndex += 1) {
    let sectionCorrect = 0;
    let sectionWrong = 0;
    let sectionUnattempted = 0;
    const qs = sectionQuestions(sectionIndex);

    qs.forEach((question, index) => {
      const answer = state.answers[sectionIndex][index];
      if (answer === null) sectionUnattempted += 1;
      else if (answer === question.answer) sectionCorrect += 1;
      else sectionWrong += 1;
    });

    correct += sectionCorrect;
    wrong += sectionWrong;
    unattempted += sectionUnattempted;
    sections.push({
      name: config.sections[sectionIndex],
      correct: sectionCorrect,
      wrong: sectionWrong,
      unattempted: sectionUnattempted,
      score: sectionCorrect * config.marking.correct + sectionWrong * config.marking.wrong
    });
  }

  return {
    correct,
    wrong,
    unattempted,
    score: correct * config.marking.correct + wrong * config.marking.wrong,
    sections
  };
}

function renderResults() {
  clearInterval(timerId);
  const result = calculateResults();

  app.innerHTML = `
    <main class="result-screen">
      <section class="result-hero">
        <p class="eyebrow">Exam completed</p>
        <h1>NEET PG 2026 Demo Result</h1>
        <p class="module-line">Completed paper: ${activeModule().name}</p>
        <div class="score-circle">
          <span>Total Score</span>
          <strong>${result.score}</strong>
          <small>out of ${TOTAL_QUESTIONS * config.marking.correct}</small>
        </div>
      </section>

      <section class="summary-cards">
        <article><span>Correct</span><strong>${result.correct}</strong></article>
        <article><span>Wrong</span><strong>${result.wrong}</strong></article>
        <article><span>Unattempted</span><strong>${result.unattempted}</strong></article>
        <article><span>Attempted</span><strong>${TOTAL_QUESTIONS - result.unattempted}</strong></article>
      </section>

      <section class="section-results">
        <h2>Section-wise Score</h2>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Section</th>
                <th>Correct</th>
                <th>Wrong</th>
                <th>Unattempted</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              ${result.sections.map((section, index) => `
                <tr>
                  <td>${index + 1}. ${section.name}</td>
                  <td>${section.correct}</td>
                  <td>${section.wrong}</td>
                  <td>${section.unattempted}</td>
                  <td>${section.score}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <button class="secondary-action" id="resetExam" type="button">Reset Demo And Load Next Module</button>
      </section>
    </main>
  `;

  document.querySelector("#resetExam").addEventListener("click", confirmAndResetExam);
}

function init() {
  loadState();
  if (typeof state.moduleIndex !== "number") state.moduleIndex = readModuleIndex();
  questions = createQuestionSet();

  if (questions.length !== TOTAL_QUESTIONS) {
    app.innerHTML = "<p>Configuration error: expected 180 questions.</p>";
    return;
  }

  if (!state.started) renderStart();
  else if (state.completed) renderResults();
  else {
    const remaining = sectionRemainingSeconds();
    if (remaining <= 0) submitSection(true);
    else renderExam();
  }
}

init();
