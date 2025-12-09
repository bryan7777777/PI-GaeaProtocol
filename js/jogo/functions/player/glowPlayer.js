// efeito de brilho
function glowPlayer(color) {
  const p = document.getElementById("player");
  p.classList.remove("glow-blue", "glow-green");
  if (color === "blue") p.classList.add("glow-blue");
  if (color === "green") p.classList.add("glow-green");
  if (color === "cintilante") p.classList.add("glow-cintilante");
  setTimeout(() => p.classList.remove("glow-blue", "glow-green", "glow-cintilante"), 1000);
};