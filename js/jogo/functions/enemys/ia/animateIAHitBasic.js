function animateIAHitBasic(el) {
  const img = el.querySelector("img");
  if (!img) return;

  const frame1 = "../img/jogo/inimigos/animado/ia/cura/ia2.png";
  const frame2 = "../img/jogo/inimigos/animado/ia/cura/ia2.png";
  const idle = "../img/jogo/inimigos/animado/ia/statico/ia1.png";

  const speed = 200;

  startScreenGlitch();

  setTimeout(() => (img.src = frame1), 0);
  setTimeout(() => (img.src = frame2), speed);
  setTimeout(() => (img.src = frame1), speed * 2);
  setTimeout(() => {
    img.src = idle;

    stopScreenGlitch();

  }, speed * 3);
};