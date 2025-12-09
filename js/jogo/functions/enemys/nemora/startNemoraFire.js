function startNemoraFire() {
  const container = document.getElementById("nemoraFire");
  if (!container) return;

  container.style.display = "block";

  if (nemoraFireInterval) return;

  nemoraFireInterval = setInterval(() => {
    const p = document.createElement("div");
    p.classList.add("nemora-fire-particle");

    // fogo aparece em qualquer lugar, igual nevasca
    p.style.left = Math.random() * 100 + "vw";

    // velocidade aleatória suave
    p.style.animationDuration = (2 + Math.random() * 1.5) + "s";

    container.appendChild(p);

    setTimeout(() => p.remove(), 4000);
  }, 25); // bem intenso, estilo chamas vivas
};