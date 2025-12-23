function animateIAHit(el, img, boss) {
  let frame1 = "../img/jogo/inimigos/animado/ia/def/ia1.png";
  let frame2 = "../img/jogo/inimigos/animado/ia/def/ia2.png";
  let frame3 = "../img/jogo/inimigos/animado/ia/def/ia1.png";
  let idle = "../img/jogo/inimigos/animado/ia/statico/ia1.png";

  if (boss === "belinda") {
    frame1 = "../img/jogo/inimigos/animado/belinda/def/belinda1.png";
    frame2 = "../img/jogo/inimigos/animado/belinda/def/belinda2.png";
    frame3 = "../img/jogo/inimigos/animado/belinda/def/belinda1.png";
    idle = "../img/jogo/inimigos/animado/belinda/statico/belinda1.png";
  }

  if (boss === "svetlana") {
    frame1 = "../img/jogo/inimigos/animado/svetlana/def/svetlana1.png";
    frame2 = "../img/jogo/inimigos/animado/svetlana/def/svetlana1.png";
    frame3 = "../img/jogo/inimigos/animado/svetlana/def/svetlana1.png";
    idle = "../img/jogo/inimigos/animado/svetlana/statico/svetlana1.png";
  }

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