// efeito de brilho
function glowPlayer(color) {
  const p = document.getElementById("player");
  p.classList.remove(
    "glow-blue",
    "glow-green",
    "glow-cintilante"
  );

  if (color === "blue") {
    p.classList.add("glow-blue");
    glowBlueExtraEffect();
  }

  if (color === "energy") {
    electricBlueLightning(); // ⚡🧊 raio agressivo
  }

  if (color === "green") {
    p.classList.add("glow-green");
    glowGreenExtraEffect();
  }

  if (color === "cintilante") {
    p.classList.add("glow-cintilante");
    glowCintilanteExtraEffect();
  }

  setTimeout(() => {
    p.classList.remove(
      "glow-blue",
      "glow-green",
      "glow-cintilante"
    );
  }, 1000);
}

function glowBlueExtraEffect() {
  const player = document.getElementById("player");
  if (!player) return;

  const rect = player.getBoundingClientRect();

  const effect = document.createElement("div");
  effect.className = "glow-blue-effect";

  /* centro REAL na tela */
  effect.style.left = `${rect.left + rect.width / 2}px`;
  effect.style.top  = `${rect.top  + rect.height / 2}px`;

  /* imagem */
  const img = document.createElement("img");
  img.src = "./../img/jogo/efeitos/escudo.png";
  img.className = "glow-blue-img";
  effect.appendChild(img);

  /* órbita 🛡️ */
  const orbit = document.createElement("div");
  orbit.className = "shield-orbit";

  const count = 6;
  for (let i = 0; i < count; i++) {
    const s = document.createElement("div");
    s.className = "orbit-shield";
    s.textContent = "🛡️";
    s.style.transform = `
      rotate(${(360 / count) * i}deg)
      translateX(120px)
    `;
    orbit.appendChild(s);
  }

  effect.appendChild(orbit);

  /* partículas */
  for (let i = 0; i < 18; i++) {
    const p = document.createElement("div");
    p.className = "blue-particle";

    const a = Math.random() * Math.PI * 2;
    const d = 130 + Math.random() * 40;

    p.style.setProperty("--x", `${Math.cos(a) * d}px`);
    p.style.setProperty("--y", `${Math.sin(a) * d}px`);

    effect.appendChild(p);
  }

  document.body.appendChild(effect);

  setTimeout(() => effect.remove(), 1000);
}

function electricBlueLightning() {
  const player = document.getElementById("player");
  if (!player) return;

  const rect = player.getBoundingClientRect();

  const effect = document.createElement("div");
  effect.className = "lightning-effect";

  effect.style.left = `${rect.left + rect.width / 2}px`;
  effect.style.top  = `${rect.top + rect.height / 2}px`;

  /* núcleo energético */
  const core = document.createElement("div");
  core.className = "lightning-core";
  effect.appendChild(core);

  /* raios violentos */
  for (let i = 0; i < 10; i++) {
    const bolt = document.createElement("div");
    bolt.className = "lightning-bolt";

    const angle = Math.random() * Math.PI * 2;
    const dist = 140 + Math.random() * 100;

    bolt.style.setProperty("--x", `${Math.cos(angle) * dist}px`);
    bolt.style.setProperty("--y", `${Math.sin(angle) * dist}px`);
    bolt.style.rotate = `${Math.random() * 360}deg`;
    bolt.style.animationDelay = `${Math.random() * 0.08}s`;

    effect.appendChild(bolt);
  }

  /* faíscas caóticas */
  for (let i = 0; i < 30; i++) {
    const spark = document.createElement("div");
    spark.className = "lightning-spark";

    const angle = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 120;

    spark.style.setProperty("--x", `${Math.cos(angle) * dist}px`);
    spark.style.setProperty("--y", `${Math.sin(angle) * dist}px`);
    spark.style.animationDelay = `${Math.random() * 0.12}s`;

    effect.appendChild(spark);
  }

  document.body.appendChild(effect);

  setTimeout(() => effect.remove(), 700);
}

function glowGreenExtraEffect() {
  const player = document.getElementById("player");
  if (!player) return;

  const rect = player.getBoundingClientRect();

  const effect = document.createElement("div");
  effect.className = "glow-green-effect";

  /* centro REAL do player */
  effect.style.left = `${rect.left + rect.width / 2}px`;
  effect.style.top  = `${rect.top  + rect.height / 2}px`;

  /* círculos de energia subindo */
for (let i = 0; i < 5; i++) {
  const circle = document.createElement("div");
  circle.className = "heal-circle";

  circle.style.animationDelay = `${i * 0.12}s`;
  circle.style.borderWidth = `${1 + Math.random() * 2}px`;

  effect.appendChild(circle);
}

  /* imagem de cura */
  const img = document.createElement("img");
  img.src = "./../img/jogo/efeitos/cura.png"; // ajuste se quiser
  img.className = "glow-green-img";
  effect.appendChild(img);

  /* órbita 💚➕ */
  const orbit = document.createElement("div");
  orbit.className = "heal-orbit";

  const count = 6;
  for (let i = 0; i < count; i++) {
    const icon = document.createElement("div");
    icon.className = "heal-icon";
    icon.textContent = "💚";

    icon.style.transform = `
      translate(-50%, -50%)
      rotate(${(360 / count) * i}deg)
      translateX(120px)
    `;

    orbit.appendChild(icon);
  }

  effect.appendChild(orbit);

  /* partículas verdes */
  for (let i = 0; i < 18; i++) {
    const p = document.createElement("div");
    p.className = "green-particle";

    const angle = Math.random() * Math.PI * 2;
    const dist = 130 + Math.random() * 40;

    p.style.setProperty("--x", `${Math.cos(angle) * dist}px`);
    p.style.setProperty("--y", `${Math.sin(angle) * dist}px`);

    effect.appendChild(p);
  }

  document.body.appendChild(effect);

  setTimeout(() => effect.remove(), 1000);
}

function glowCintilanteExtraEffect() {
  const player = document.getElementById("player");
  if (!player) return;

  const rect = player.getBoundingClientRect();

  const effect = document.createElement("div");
  effect.className = "glow-cintilante-effect";

  /* centro REAL do player */
  effect.style.left = `${rect.left + rect.width / 2}px`;
  effect.style.top  = `${rect.top  + rect.height / 2}px`;

  /* imagem cintilante */
  const img = document.createElement("img");
  img.src = "./../img/jogo/efeitos/cintilante.png"; // se quiser usar
  img.className = "glow-cintilante-img";
  effect.appendChild(img);

  /* órbita ✨ */
  const orbit = document.createElement("div");
  orbit.className = "cintilante-orbit";

  const count = 8;
  for (let i = 0; i < count; i++) {
    const icon = document.createElement("div");
    icon.className = "cintilante-icon";
    icon.textContent = "✨";

    icon.style.transform = `
      translate(-50%, -50%)
      rotate(${(360 / count) * i}deg)
      translateX(120px)
    `;

    orbit.appendChild(icon);
  }

  effect.appendChild(orbit);

  /* partículas cintilantes */
  for (let i = 0; i < 22; i++) {
    const p = document.createElement("div");
    p.className = "sparkle-particle";

    const angle = Math.random() * Math.PI * 2;
    const dist = 130 + Math.random() * 50;

    p.style.setProperty("--x", `${Math.cos(angle) * dist}px`);
    p.style.setProperty("--y", `${Math.sin(angle) * dist}px`);

    effect.appendChild(p);
  }

  document.body.appendChild(effect);

  setTimeout(() => effect.remove(), 1000);
}
