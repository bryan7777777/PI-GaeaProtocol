function startNemoraSnow() {
  const container = document.getElementById("nemoraSnow");
  mudarBackground('def');
  if (!container) return;

  container.style.display = "block";

  if (nemoraSnowInterval) return;

  nemoraSnowInterval = setInterval(() => {
    const p = document.createElement("div");
    p.classList.add("nemora-particle");

    // agora cobre de 0% até 100% da tela
    p.style.left = Math.random() * 100 + "vw";

    // velocidade vertical permanece igual
    p.style.animationDuration = (3 + Math.random() * 2) + "s";

    container.appendChild(p);

    setTimeout(() => p.remove(), 6000);
  }, 30); // forte + preenchendo a tela inteira
};