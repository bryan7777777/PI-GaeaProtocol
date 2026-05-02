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
    note.className = "note";

    lane.appendChild(note);

    notes.push({
      el: note,
      key: lane.dataset.key,
      y: -30 - (i * 80)
    });
  }

  window._rhythmContext = { acao, tipo };
}

// =====================
// CHECA FINAL DA SESSÃO
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
// START FERVOR
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
}

// =====================
// END FERVOR
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
function getMultiplicador() {
  if (feverActive && feverMode === "lar") return 2;
  if (feverActive && feverMode === "tra") return 5;
  return 1;
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
// LOOP PRINCIPAL
function loop() {
  updateFeverWave();

  const speed = getNoteSpeed();

  for (let i = notes.length - 1; i >= 0; i--) {
    let n = notes[i];

    n.y += speed;
    n.el.style.top = n.y + "px";

    if (n.y > 620) miss(i);
  }

  checkFimSessao(); // 👈 FECHAMENTO CORRETO

  requestAnimationFrame(loop);
}
loop();

// =====================
document.addEventListener("keydown", e => {
  hit(e.key.toLowerCase());
});

// =====================
function hit(k) {
  const lane = [...lanes].find(l => l.dataset.key === k);
  if (!lane) return;

  flash(lane);

  for (let i = 0; i < notes.length; i++) {
    let n = notes[i];

    if (n.key !== k) continue;

    let d = Math.abs(n.y - 585);

    if (d < 25) return perfect(i);
    if (d < 60) return good(i);
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