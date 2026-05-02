const lanes = document.querySelectorAll(".lane");
const feverFill = document.getElementById("feverFill");

let notes = [];
let fever = 0;

let feverActive = false;
let feverMode = "";

let previousBackground = "";

// =====================
let pontuacao = 0;
let sessionAtiva = false;
window._rhythmContext = {};

// =====================
const targetX = [-140, -50, 50, 140];

// =====================
function lerp(a, b, t) {
  return a + (b - a) * t;
}

// =====================
function toggleRhythmGame(ativo) {
  document.getElementById("rhythmGame").style.display =
    ativo ? "flex" : "none";
}

// =====================
function getNoteSpeed() {
  return (feverActive && feverMode === "tra") ? 6 : 4;
}

// =====================
function getMultiplicador() {
  if (feverActive && feverMode === "lar") return 2;
  if (feverActive && feverMode === "tra") return 5;
  return 1;
}

// =====================
// ATUALIZA VISUAL DAS NOTAS
function updateNoteStyle() {
  for (let n of notes) {
    n.el.classList.remove("lar", "tra", "normal");

    if (feverActive) {
      n.el.classList.add(feverMode);
    } else {
      n.el.classList.add("normal");
    }
  }
}

// =====================
function toggleRhythmGame(ativo) {
  document.getElementById("rhythmGame").style.display =
    ativo ? "flex" : "none";
}

// =====================
// FINALIZA PONTUAÇÃO
function finalizarPontuacao(acao, tipo) {
  let total = Math.max(0, pontuacao);
  pontuacao = 0;

  if (tipo === "cura" || tipo === "def" || tipo === "energia") {
    allBuffs(total, tipo, acao);
    updateHUD();
    updateEnemyBars();
  }

  if (tipo === "unico" || tipo === "ultimo" || tipo === "area") {
    causarDano(total, tipo);
    updateHUD();
    updateEnemyBars();
    checkEnemies();
  }
}

// =====================
// GERAR NOTAS
function gerarNotas(qtd, modoFever, acao, tipo) {
  if (!feverActive) feverMode = modoFever;

  agathaTeclado(true);

  sessionAtiva = true;

  notes = [];
  pontuacao = 0;

  for (let i = 0; i < qtd; i++) {
    const lane = lanes[Math.floor(Math.random() * lanes.length)];

    const note = document.createElement("div");
    note.className = "note normal";

    lane.appendChild(note);

    notes.push({
      el: note,
      key: lane.dataset.key,
      y: -30 - (i * 80)
    });
  }

  updateNoteStyle();

  window._rhythmContext = { acao, tipo };
}

// =====================
// CHECA FIM DA SESSÃO
function checkFimSessao() {
  if (!sessionAtiva) return;

  if (notes.length === 0) {
    sessionAtiva = false;

    const ctx = window._rhythmContext || {};

    finalizarPontuacao(ctx.acao, ctx.tipo);

    toggleRhythmGame(false);
    agathaTeclado(false);
  }
}

// =====================
function startFever() {
  if (feverActive) return;

  feverActive = true;
  fever = 100;

  feverFill.style.width = "100%";
  document.body.classList.add("fever");

  const jogo = document.getElementById("jogo");
  previousBackground = jogo.style.backgroundImage;

  if (feverMode === "lar") {
    jogo.style.backgroundImage =
      "url('../img/jogo/background/agathaLar.png')";

    startAgathaSakura();
    trocarFramePlayer("agatha");

  } else {
    jogo.style.backgroundImage =
      "url('../img/jogo/background/agathaTra.png')";

    stopAgathaSakura();
    trocarFramePlayer("agatha");
  }

  updateNoteStyle();
}

// =====================
function disableFever() {
  trocarFramePlayer("agatha", true);

  feverActive = false;
  fever = 0;

  feverFill.style.width = "0%";
  document.body.classList.remove("fever");

  stopAgathaSakura();

  const jogo = document.getElementById("jogo");
  jogo.style.backgroundImage = previousBackground;

  lanes.forEach(l => {
    l._x = 0;
    l.style.transform = "translateX(0px)";
  });

  updateNoteStyle();
}

// =====================
function checkFeverFail() {
  if (!feverActive) return;
  if (fever <= 0) disableFever();
}

function checkFever() {
  fever = Math.max(0, Math.min(100, fever));
  feverFill.style.width = fever + "%";

  if (fever >= 100) startFever();
}

// =====================
function updateFeverWave() {
  if (!feverActive) {
    lanes.forEach(l => {
      l._x = lerp(l._x || 0, 0, 0.12);
      l.style.transform = `translateX(${l._x}px)`;
    });
    return;
  }

  const now = performance.now();

  for (let i = 0; i < lanes.length; i++) {
    let l = lanes[i];

    let wave = Math.sin(now * 0.004 + i) * 5;

    l._x = lerp(l._x || 0, targetX[i], 0.08);

    l.style.transform =
      `translateX(${l._x}px) translateY(${wave}px)`;
  }
}

// =====================
function loop() {

  updateFeverWave();

  const speed = getNoteSpeed();

  for (let i = notes.length - 1; i >= 0; i--) {

    let n = notes[i];

    n.y += speed;

    n.el.style.top = n.y + "px";

    // =========================
    // HIT LINE REAL
    // =========================

    const lane =
      [...lanes].find(l => l.dataset.key === n.key);

    if (!lane) continue;

    const hitLine =
      lane.querySelector(".hit-line");

    if (!hitLine) continue;

    const hitRect =
      hitLine.getBoundingClientRect();

    const hitY =
      hitRect.top + (hitRect.height / 2);

    // posição real da nota
    const noteRect =
      n.el.getBoundingClientRect();

    const noteY =
      noteRect.top + (noteRect.height / 2);

    // =========================
    // MISS WINDOW
    // =========================

    if (noteY > hitY + 30) {
      miss(i);
    }
  }

  checkFimSessao();

  requestAnimationFrame(loop);
}

loop();

// =====================
document.addEventListener("keydown", e => {
  hit(e.key.toLowerCase());
});

// =====================
function hit(k) {

  const lane =
    [...lanes].find(l => l.dataset.key === k);

  if (!lane) return;

  flash(lane);

  // =========================
  // PEGA POSIÇÃO REAL DA HIT LINE
  // =========================

  const hitLine =
    lane.querySelector(".hit-line");

  if (!hitLine) return;

  const hitRect =
    hitLine.getBoundingClientRect();

  // centro vertical da linha
  const hitY =
    hitRect.top + (hitRect.height / 2);

  // =========================

  for (let i = 0; i < notes.length; i++) {

    let n = notes[i];

    if (n.key !== k) continue;

    // posição real da nota na tela
    const noteRect =
      n.el.getBoundingClientRect();

    const noteY =
      noteRect.top + (noteRect.height / 2);

    // distância REAL entre nota e linha
    let d =
      Math.abs(noteY - hitY);

    // =========================
    // HIT WINDOWS
    // =========================

    if (d < 20) {
      return perfect(i);
    }

    if (d < 55) {
      return good(i);
    }
  }
}

// =====================
function show(text, type, x, y) {
  const el = document.createElement("div");

  el.className = "judge-popup " + type;
  el.textContent = text;

  el.style.left = x + "px";
  el.style.top = y + "px";

  el.style.transform =
    `translate(-50%, -50%) rotate(${Math.random() * 20 - 10}deg)`;

  document.body.appendChild(el);

  setTimeout(() => el.remove(), 600);
}

// =====================
function getNoteX(note) {
  const lane = [...lanes].find(l => l.dataset.key === note.key);
  if (!lane) return 0;

  const rect = lane.getBoundingClientRect();
  return rect.left + rect.width / 2;
}

// =====================
function perfect(i) {
  const n = notes[i];

  pontuacao += 2 * getMultiplicador();

  show("PERFECT " + pontuacao, "perfect", getNoteX(n), n.y);

  remove(i);

  fever += 6;

  checkFever();
  checkFeverFail();
}

// =====================
function good(i) {
  const n = notes[i];

  pontuacao += 1 * getMultiplicador();

  show("GOOD " + pontuacao, "good", getNoteX(n), n.y);

  remove(i);

  fever += 3;

  checkFever();
  checkFeverFail();
}

// =====================
function miss(i) {
  const n = notes[i];

  if (n) {
    show("MISS " + pontuacao, "miss", getNoteX(n), n.y);
  }

  if (notes[i]) {
    notes[i].el.remove();
    notes.splice(i, 1);
  }

  fever -= 10;

  pontuacao -= 2 * getMultiplicador();

  if (feverMode === "tra" && feverActive) {
    allDebuff(50, "sofrerDano");

    if (playerHP == 1) {
      playerHP--;
      agathaTeclado(false);
    }

    updateHUD();
    updateEnemyBars();
    checkEnemies();
  }

  checkFever();
  checkFeverFail();
}

// =====================
function remove(i) {
  if (notes[i]) {
    notes[i].el.remove();
    notes.splice(i, 1);
  }
}

// =====================
function flash(l) {
  let k = l.querySelector(".key");

  k.classList.add("effect");

  setTimeout(() => {
    k.classList.remove("effect");
  }, 80);
}

// =====================
function agathaTeclado(ativo) {
  const el = document.getElementById("rhythmGame");

  el.style.display = ativo ? "flex" : "none";

  if (!ativo) {
    fever = 0;
    feverFill.style.width = "0%";
  }
}