function startScreenGlitch() {
  const body = document.body;
  body.classList.add("screen-glitch");

  // Blocos glitch (efeito novo)
  for (let i = 0; i < 16; i++) {
    const block = document.createElement("div");
    block.classList.add("glitch-chunk");

    block.style.left = Math.random() * 100 + "vw";
    block.style.top = Math.random() * 100 + "vh";
    block.style.width = 80 + Math.random() * 200 + "px";
    block.style.height = 20 + Math.random() * 60 + "px";

    document.body.appendChild(block);

    // remove depois da animação
    setTimeout(() => block.remove(), 180);
  }
};