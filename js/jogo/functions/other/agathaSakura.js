let agathaSakuraInterval = null;

function startAgathaSakura() {
  const container = document.getElementById("agathaSakura");
  if (!container) return;

  container.style.display = "block";

  if (agathaSakuraInterval) return;

  agathaSakuraInterval = setInterval(() => {
    const leaf = document.createElement("div");
    leaf.classList.add("sakura-leaf");

    // 🔥 AGORA NASCE EM QUALQUER LUGAR DA TELA
    const startX = -10 + Math.random() * 120;
    const startY = -20;
    leaf.style.left = startX + "vw";
    leaf.style.top = startY + "vh";

    const size = 10 + Math.random() * 14;
    leaf.style.width = size + "px";
    leaf.style.height = size + "px";

    const duration = 4 + Math.random() * 4;

    // ainda mantém drift pra direita
    const drift = 20 + Math.random() * 60;

    leaf.style.setProperty("--drift", drift + "vw");
    leaf.style.animationDuration = duration + "s";

    container.appendChild(leaf);

    setTimeout(() => leaf.remove(), duration * 1000);
  }, 50);
}

function stopAgathaSakura() {
  const container = document.getElementById("agathaSakura");
  if (!container) return;

  container.style.display = "none";

  clearInterval(agathaSakuraInterval);
  agathaSakuraInterval = null;

  container.innerHTML = "";
}