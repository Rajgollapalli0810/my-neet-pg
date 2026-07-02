const data = window.LOVE_SITE_DATA;
const sectionIds = [
  "home",
  "stats",
  "story",
  "timeline",
  "gallery",
  "notes",
  "playlist",
  "reasons",
  "dreams",
  "neet-pg",
  "birthday"
];

const $ = (selector) => document.querySelector(selector);
const create = (tag, className) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  return element;
};
let chaptersReady = false;
let gallerySong = null;
let proposalNoTimer = null;
let backgroundWasPlayingBeforeGallery = false;
let backgroundMusicRequested = false;

function versionedAsset(path) {
  if (!path || /^https?:\/\//.test(path)) return path;
  const joiner = path.includes("?") ? "&" : "?";
  return `${path}${joiner}v=${encodeURIComponent(data.assetVersion || "1")}`;
}

function formatDaysTogether() {
  const start = new Date(data.couple.anniversary);
  const target = data.couple.birthday ? new Date(data.couple.birthday) : new Date();
  if (Number.isNaN(start.getTime())) return "Every day";
  const diff = target.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0);
  return `${Math.max(1, Math.floor(diff / 86400000))}`;
}

function imageCardFallback(element) {
  element.classList.add("missing-media");
  element.innerHTML = "<span>Add photo</span>";
}

function setupLogin() {
  $("#loginTitle").textContent = `For ${data.couple.partnerName}`;
  if (data.login?.hint) {
    $("#loginHint").textContent = `Hint: ${data.login.hint}`;
  }
  prepareBackgroundMusic();
  $("#loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const typed = $("#secretDate").value.trim().replace(/\D/g, "");
    const secret = String(data.secretDate).replace(/\D/g, "");
    if (typed !== secret) {
      $("#loginMessage").textContent = "That date is not the key. Try the special one.";
      return;
    }
    $("#loginScreen").classList.add("is-hidden");
    tryPlayMusic();
    $("#introScreen").hidden = false;
    setTimeout(() => $("#introScreen").classList.add("is-visible"), 40);
  });
}

function setupIntro() {
  $("#introTitle").textContent = data.intro.title;
  $("#introText").textContent = data.intro.text;
  $("#enterSite").addEventListener("click", async () => {
    $("#introScreen").classList.remove("is-visible");
    setTimeout(() => {
      $("#introScreen").hidden = true;
      $("#site").hidden = false;
      setupChapters();
      $("#musicPlayer").hidden = false;
      document.body.classList.add("site-open");
    }, 400);
    tryPlayMusic();
  });

}

function showChapter(id, updateHash = true) {
  pauseStoryVideo();
  const targetId = sectionIds.includes(id) ? id : "home";
  const index = sectionIds.indexOf(targetId);
  document.body.classList.add("chapter-leaving");
  sectionIds.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) section.classList.toggle("chapter-active", sectionId === targetId);
  });
  window.setTimeout(() => document.body.classList.remove("chapter-leaving"), 260);

  document.querySelectorAll(".topbar nav a").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${targetId}`);
  });

  $("#prevChapter").disabled = index === 0;
  $("#nextChapter").textContent = index === sectionIds.length - 1 ? "Finale" : "Next";
  $("#chapterProgress").textContent = `Chapter ${index + 1} of ${sectionIds.length}`;
  if (updateHash) history.replaceState(null, "", `#${targetId}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function pauseStoryVideo() {
  const video = document.querySelector("#videoFrame video");
  if (video && !video.paused) video.pause();
}

function setupChapters() {
  if (chaptersReady) {
    showChapter(location.hash.replace("#", "") || "home", false);
    return;
  }
  chaptersReady = true;
  document.body.classList.add("chapter-mode");
  sectionIds.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) section.classList.add("chapter-section");
  });

  document.querySelectorAll(".topbar nav a").forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href").replace("#", "");
      if (!sectionIds.includes(id)) return;
      event.preventDefault();
      showChapter(id);
    });
  });

  $("#prevChapter").addEventListener("click", () => {
    const current = sectionIds.findIndex((id) => document.getElementById(id)?.classList.contains("chapter-active"));
    showChapter(sectionIds[Math.max(0, current - 1)]);
  });

  $("#nextChapter").addEventListener("click", () => {
    const current = sectionIds.findIndex((id) => document.getElementById(id)?.classList.contains("chapter-active"));
    if (current === sectionIds.length - 1) {
      launchConfetti();
      return;
    }
    showChapter(sectionIds[Math.min(sectionIds.length - 1, current + 1)]);
  });

  showChapter(location.hash.replace("#", "") || "home", false);
}

function tryPlayMusic() {
  const audio = $("#backgroundMusic");
  if (!data.music.file) return;
  backgroundMusicRequested = true;
  prepareBackgroundMusic();
  audio.volume = 0.36;
  audio.play()
    .then(() => $("#musicToggle").textContent = "Pause music")
    .catch(() => $("#musicToggle").textContent = "Play music");
}

function prepareBackgroundMusic() {
  const audio = $("#backgroundMusic");
  if (!data.music.file) return;
  if (!audio.getAttribute("src")) {
    audio.src = data.music.file;
    audio.load();
  }
}

function setupMusic() {
  const audio = $("#backgroundMusic");
  $("#musicToggle").addEventListener("click", () => {
    if (audio.paused) {
      tryPlayMusic();
    } else {
      audio.pause();
      $("#musicToggle").textContent = "Play music";
    }
  });
  document.addEventListener("pointerdown", () => {
    if (backgroundMusicRequested && audio.paused) tryPlayMusic();
  }, { passive: true });
}

function renderShell() {
  document.title = data.couple.title;
  $("#brandName").textContent = data.couple.title;
  $("#brandInitials").textContent = data.couple.initials;
  $("#heroDate").textContent = data.hero.dateLine;
  $("#heroTitle").textContent = data.hero.title;
  $("#heroMessage").textContent = data.hero.message;
  $("#heartbeatMessage").textContent = data.hero.heartbeatMessage || "";
  $("#galleryIntro").textContent = data.galleryIntro || "";
  $("#birthdayTitle").textContent = data.birthday.title;
  $("#birthdayMessage").textContent = data.birthday.message;
  $("#finalSignature").textContent = data.birthday.signature || "";
  document.querySelectorAll("[data-subtitle-for]").forEach((element) => {
    element.textContent = data.chapterSubtitles?.[element.dataset.subtitleFor] || "";
  });
  if (data.birthday.holdHeart) {
    $("#holdHeartButton strong").textContent = data.birthday.holdHeart.button;
    $("#holdHeartMessage").textContent = data.birthday.holdHeart.message;
  }
  $("#videoMessageText").textContent = data.videoMessage.text;
  renderProposalFlow();
  if (data.neetPg) {
    $("#neetTitle").textContent = data.neetPg.title;
    $("#neetMessage").textContent = data.neetPg.message;
    $("#neetConfettiButton").textContent = data.neetPg.button || "Celebrate";
  }
  if (data.moodBooster) {
    $("#moodTitle").textContent = data.moodBooster.title;
    $("#moodButton").textContent = data.moodBooster.button;
  }

  if (data.hero.image) {
    $("#heroBg").style.backgroundImage = `linear-gradient(90deg, rgba(18, 14, 15, .72), rgba(18, 14, 15, .2)), url("${versionedAsset(data.hero.image)}")`;
  }
}

function renderStats() {
  const grid = $("#statsGrid");
  data.stats.forEach((stat) => {
    const article = create("article", "stat-card");
    const value = stat.type === "daysTogether" ? formatDaysTogether() : stat.value;
    article.innerHTML = `<strong>${value}</strong><span>${stat.label}</span>`;
    grid.append(article);
  });
}

function renderVideo() {
  const frame = $("#videoFrame");
  if (!data.videoMessage.file) {
    frame.insertAdjacentHTML("beforeend", "<span>Add video</span>");
    return;
  }
  const video = create("video");
  video.src = versionedAsset(data.videoMessage.file);
  video.controls = true;
  video.playsInline = true;
  video.preload = "metadata";
  const cover = create("button", "video-cover");
  cover.type = "button";
  cover.innerHTML = "<span>Play video message</span><small>with soft background music</small>";
  cover.addEventListener("click", () => {
    video.play();
  });
  video.addEventListener("play", () => {
    frame.classList.add("is-playing");
    const music = $("#backgroundMusic");
    music.volume = 0.14;
    if (music.paused && data.music.file) {
      music.src = data.music.file;
      music.play().catch(() => {});
    }
  });
  video.addEventListener("pause", () => {
    const music = $("#backgroundMusic");
    if (!music.paused) music.volume = 0.36;
  });
  video.addEventListener("ended", () => {
    frame.classList.remove("is-playing");
    const music = $("#backgroundMusic");
    if (!music.paused) music.volume = 0.36;
  });
  video.addEventListener("error", () => frame.insertAdjacentHTML("beforeend", "<span>Add video-message.mp4</span>"));
  frame.append(video, cover);
}

function renderTimeline() {
  const list = $("#timelineList");
  data.timeline.forEach((item) => {
    const article = create("article", "timeline-item");
    article.innerHTML = `<time>${item.date}</time><h3>${item.title}</h3><p>${item.text}</p>`;
    list.append(article);
  });
}

function renderGallery() {
  const grid = $("#galleryGrid");
  data.gallery.forEach((item) => {
    const article = create("article", "gallery-card");
    const media = create("div", "gallery-media");
    const img = create("img");
    img.src = versionedAsset(item.image);
    img.alt = item.title;
    img.loading = "lazy";
    img.addEventListener("error", () => imageCardFallback(media));
    media.append(img);
    const copy = create("div", "gallery-copy");
    copy.innerHTML = `<h3>${item.title}</h3><p>${item.message || item.caption || ""}</p>`;
    article.append(media, copy);
    article.tabIndex = 0;
    article.setAttribute("role", "button");
    article.setAttribute("aria-label", `Open ${item.title}`);
    article.addEventListener("click", () => openGalleryLightbox(item));
    article.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openGalleryLightbox(item);
      }
    });
    grid.append(article);
  });
}

function openGalleryLightbox(item) {
  $("#lightboxImage").src = versionedAsset(item.image);
  $("#lightboxImage").alt = item.title;
  $("#lightboxTitle").textContent = item.title;
  $("#lightboxMessage").textContent = item.message || item.caption || "";
  $("#lightboxSong").textContent = "";
  playGallerySong(item.song);
  $("#galleryLightbox").hidden = false;
  requestAnimationFrame(() => $("#galleryLightbox").classList.add("open"));
}

function closeGalleryLightbox() {
  $("#galleryLightbox").classList.remove("open");
  stopGallerySong();
  setTimeout(() => {
    $("#galleryLightbox").hidden = true;
    $("#lightboxImage").src = "";
  }, 220);
}

function playGallerySong(song) {
  stopGallerySong();
  if (!song) return;
  const backgroundMusic = $("#backgroundMusic");
  backgroundWasPlayingBeforeGallery = !backgroundMusic.paused;
  if (backgroundWasPlayingBeforeGallery) backgroundMusic.pause();
  gallerySong = new Audio(versionedAsset(song));
  gallerySong.volume = 0.62;
  gallerySong.loop = true;
  gallerySong.play().catch(() => {
    $("#lightboxSong").textContent = "Tap once more if the song does not start automatically.";
  });
}

function stopGallerySong() {
  if (gallerySong) {
    gallerySong.pause();
    gallerySong.currentTime = 0;
    gallerySong = null;
  }
  const backgroundMusic = $("#backgroundMusic");
  backgroundMusic.volume = 0.36;
  if (backgroundWasPlayingBeforeGallery) {
    backgroundMusic.play().catch(() => {});
  }
  backgroundWasPlayingBeforeGallery = false;
}

function renderNotes() {
  const grid = $("#notesGrid");
  data.hiddenNotes.forEach((note, index) => {
    const title = typeof note === "string" ? `Note ${index + 1}` : note.title;
    const message = typeof note === "string" ? note : note.message;
    const button = create("button", "note-card");
    button.type = "button";
    button.innerHTML = `<span>Hidden note ${index + 1}</span><strong>${title}</strong><p>${message}</p>`;
    button.addEventListener("click", () => {
      button.classList.add("revealed");
      revealFinalHiddenNoteIfReady();
    });
    grid.append(button);
  });
  if (data.finalHiddenNote) {
    $("#finalHiddenTitle").textContent = data.finalHiddenNote.title;
    $("#finalHiddenMessage").textContent = data.finalHiddenNote.message;
  }
}

function revealFinalHiddenNoteIfReady() {
  const notes = document.querySelectorAll(".note-card");
  const opened = document.querySelectorAll(".note-card.revealed");
  if (notes.length && notes.length === opened.length) {
    $("#finalHiddenNote").classList.add("revealed");
    launchConfetti();
  }
}

function renderPlaylist() {
  const list = $("#playlistList");
  data.playlist.forEach((song, index) => {
    const item = create("a", "playlist-item");
    item.href = song.link;
    if (/^https?:\/\//.test(song.link)) {
      item.target = "_blank";
      item.rel = "noreferrer";
    }
    item.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><strong>${song.title}</strong><em>${song.artist}</em>`;
    list.append(item);
  });
}

function renderReasons() {
  const grid = $("#reasonsGrid");
  const reasons = [...data.reasons];
  while (reasons.length < 100) reasons.push(`Reason ${reasons.length + 1}: write your own here.`);
  reasons.slice(0, 100).forEach((reason, index) => {
    const item = create("article", "reason-card");
    item.innerHTML = `<span>${index + 1}</span><p>${reason}</p>`;
    grid.append(item);
  });
}

function renderDreams() {
  const board = $("#dreamsBoard");
  data.dreams.forEach((dream) => {
    const item = create("article", "dream-card");
    item.innerHTML = `<h3>${dream.title}</h3><p>${dream.text}</p>`;
    board.append(item);
  });
}

function launchConfetti() {
  const canvas = $("#confettiCanvas");
  const context = canvas.getContext("2d");
  const colors = ["#d95f76", "#f6c85f", "#56a3a6", "#7d6fb2", "#ffffff"];
  let pieces = [];
  let sparks = [];
  let frame = 0;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize, { once: true });
  pieces = Array.from({ length: 180 }, () => ({
    type: "paper",
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height,
    size: 5 + Math.random() * 8,
    speed: 2 + Math.random() * 5,
    drift: -2 + Math.random() * 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    spin: Math.random() * Math.PI
  }));

  sparks = Array.from({ length: 90 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.62,
    size: 1.5 + Math.random() * 3.5,
    pulse: Math.random() * Math.PI * 2,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((piece) => {
      piece.y += piece.speed;
      piece.x += piece.drift;
      piece.spin += 0.08;
      context.save();
      context.translate(piece.x, piece.y);
      context.rotate(piece.spin);
      context.fillStyle = piece.color;
      context.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.6);
      context.restore();
    });

    sparks.forEach((spark) => {
      spark.pulse += 0.12;
      const glow = 0.45 + Math.sin(spark.pulse) * 0.35;
      context.save();
      context.globalAlpha = Math.max(0.15, glow);
      context.strokeStyle = spark.color;
      context.lineWidth = 1.8;
      context.beginPath();
      context.moveTo(spark.x - spark.size * 2.2, spark.y);
      context.lineTo(spark.x + spark.size * 2.2, spark.y);
      context.moveTo(spark.x, spark.y - spark.size * 2.2);
      context.lineTo(spark.x, spark.y + spark.size * 2.2);
      context.stroke();
      context.restore();
    });

    frame += 1;
    if (frame < 300) requestAnimationFrame(draw);
    else context.clearRect(0, 0, canvas.width, canvas.height);
  }

  draw();
}

function renderProposalFlow() {
  const flow = data.birthday.proposalFlow;
  if (!flow) {
    $("#proposalGame").hidden = true;
    return;
  }

  $("#proposalIntro").textContent = flow.intro;
  $("#proposalYes").textContent = flow.yes || "Yes";
  $("#proposalNo").textContent = flow.no || "No";
  $("#proposalAnswer").textContent = flow.accepted;
  $("#secretLetterTitle").textContent = flow.secretLetterTitle || "My Final Secret Letter To You";
  $("#secretLetterBody").textContent = flow.secretLetter || "";
  updateProposalQuestion();
}

function currentProposalQuestions() {
  const flow = data.birthday.proposalFlow;
  return [...flow.questions, flow.finalQuestion];
}

function updateProposalQuestion() {
  const questions = currentProposalQuestions();
  const game = $("#proposalGame");
  const index = Number(game.dataset.step || 0);
  const isFinal = index === questions.length - 1;
  $("#proposalQuestion").textContent = questions[index];
  game.classList.toggle("is-final", isFinal);
  $("#proposalNo").classList.remove("is-running");
  $("#proposalNo").style.left = "";
  $("#proposalNo").style.top = "";
  startProposalNoDance();
}

function moveProposalNo() {
  const button = $("#proposalNo");
  const game = $("#proposalGame");
  if (game.classList.contains("accepted")) return;
  const gameRect = game.getBoundingClientRect();
  const buttonRect = button.getBoundingClientRect();
  const maxX = Math.max(0, gameRect.width - buttonRect.width - 20);
  const maxY = Math.max(0, gameRect.height - buttonRect.height - 20);
  button.classList.add("is-running");
  button.style.left = `${Math.random() * maxX}px`;
  button.style.top = `${Math.random() * maxY}px`;
}

function startProposalNoDance() {
  clearInterval(proposalNoTimer);
  proposalNoTimer = setInterval(moveProposalNo, 1200);
  setTimeout(moveProposalNo, 450);
}

function stopProposalNoDance() {
  clearInterval(proposalNoTimer);
  proposalNoTimer = null;
}

function setupProposalFlow() {
  const flow = data.birthday.proposalFlow;
  if (!flow) return;

  $("#proposalNo").addEventListener("mouseenter", moveProposalNo);
  $("#proposalNo").addEventListener("touchstart", (event) => {
    event.preventDefault();
    moveProposalNo();
  });
  $("#proposalNo").addEventListener("click", moveProposalNo);

  $("#proposalYes").addEventListener("click", () => {
    const game = $("#proposalGame");
    const questions = currentProposalQuestions();
    const nextIndex = Number(game.dataset.step || 0) + 1;
    if (nextIndex >= questions.length) {
      game.classList.add("accepted");
      stopProposalNoDance();
      launchConfetti();
      return;
    }
    game.dataset.step = String(nextIndex);
    updateProposalQuestion();
  });
}

function setupMoodBooster() {
  if (!data.moodBooster?.messages?.length) return;
  let lastIndex = -1;
  $("#moodButton").addEventListener("click", () => {
    let index = Math.floor(Math.random() * data.moodBooster.messages.length);
    if (data.moodBooster.messages.length > 1) {
      while (index === lastIndex) {
        index = Math.floor(Math.random() * data.moodBooster.messages.length);
      }
    }
    lastIndex = index;
    $("#moodMessage").textContent = data.moodBooster.messages[index];
    $("#moodBooster").classList.add("has-message");
  });
}

function setupHeartbeat() {
  $("#heartbeatButton").addEventListener("click", () => {
    $("#heartbeatBox").classList.add("revealed");
  });
}

function setupHoldHeart() {
  const button = $("#holdHeartButton");
  const box = $("#holdHeartBox");
  const progress = $("#holdHeartProgress");
  let timer = null;
  let startedAt = 0;
  let animationFrame = null;

  function reset() {
    clearTimeout(timer);
    cancelAnimationFrame(animationFrame);
    timer = null;
    startedAt = 0;
    if (!box.classList.contains("revealed")) progress.style.width = "0%";
  }

  function updateProgress() {
    const elapsed = Date.now() - startedAt;
    progress.style.width = `${Math.min(100, (elapsed / 3000) * 100)}%`;
    if (elapsed < 3000 && timer) animationFrame = requestAnimationFrame(updateProgress);
  }

  function start(event) {
    event.preventDefault();
    if (box.classList.contains("revealed")) return;
    startedAt = Date.now();
    timer = setTimeout(() => {
      box.classList.add("revealed");
      progress.style.width = "100%";
      launchConfetti();
    }, 3000);
    updateProgress();
  }

  button.addEventListener("pointerdown", start);
  button.addEventListener("pointerup", reset);
  button.addEventListener("pointerleave", reset);
  button.addEventListener("pointercancel", reset);
}

function setupGalleryLightbox() {
  $("#lightboxClose").addEventListener("click", closeGalleryLightbox);
  $("#galleryLightbox").addEventListener("click", (event) => {
    if (event.target === $("#galleryLightbox")) closeGalleryLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !$("#galleryLightbox").hidden) closeGalleryLightbox();
  });
}

function setupHeartTrail() {
  document.addEventListener("pointerdown", (event) => {
    if (!document.body.classList.contains("site-open")) return;
    const heart = create("span", "tap-heart");
    heart.textContent = Math.random() > 0.45 ? "♥" : "✦";
    heart.classList.toggle("gold", heart.textContent === "✦");
    heart.style.left = `${event.clientX}px`;
    heart.style.top = `${event.clientY}px`;
    document.body.append(heart);
    setTimeout(() => heart.remove(), 900);
  });
}

function init() {
  setupLogin();
  setupIntro();
  setupMusic();
  renderShell();
  renderStats();
  renderVideo();
  renderTimeline();
  renderGallery();
  renderNotes();
  renderPlaylist();
  renderReasons();
  renderDreams();
  setupProposalFlow();
  setupMoodBooster();
  setupHeartbeat();
  setupHoldHeart();
  setupGalleryLightbox();
  setupHeartTrail();
  $("#confettiButton").addEventListener("click", launchConfetti);
  $("#neetConfettiButton").addEventListener("click", launchConfetti);
}

init();
