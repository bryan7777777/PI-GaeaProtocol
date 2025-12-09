function animateIAHit(el, img) {
  const frame1 = "../img/jogo/inimigos/animado/ia/def/ia1.png";
  const frame2 = "../img/jogo/inimigos/animado/ia/def/ia2.png";
  const frame3 = "../img/jogo/inimigos/animado/ia/def/ia1.png";
  const idle = "../img/jogo/inimigos/animado/ia/statico/ia1.png";

  const speed = 150;

  setTimeout(() => (img.src = frame1), 0);
  setTimeout(() => (img.src = frame2), speed);
  setTimeout(() => (img.src = frame3), speed * 2);

  setTimeout(() => {
    el.style.transition = "transform 0.15s ease";
    el.style.transform = "translateX(40px)";
  }, speed * 2.5);

  setTimeout(() => {
    el.style.transform = "translateX(0px)";
  }, speed * 4);

  setTimeout(() => {
    img.src = idle;
  }, speed * 5);
};