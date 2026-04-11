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

  if (boss === "isla") {
    frame1 = "../img/jogo/inimigos/animado/isla/def/isla1.png";
    frame2 = "../img/jogo/inimigos/animado/isla/def/isla1.png";
    frame3 = "../img/jogo/inimigos/animado/isla/def/isla1.png";
    idle = "../img/jogo/inimigos/animado/isla/statico/isla1.png";
  }

  if (boss === "islaDois") {
    frame1 = "../img/jogo/inimigos/animado/isla/def/isla11.png";
    frame2 = "../img/jogo/inimigos/animado/isla/def/isla11.png";
    frame3 = "../img/jogo/inimigos/animado/isla/def/isla11.png";
    idle = "../img/jogo/inimigos/animado/isla/statico/PetroleoQuen1.png";
  }

  if (boss === "peru") {
    frame1 = "../img/jogo/inimigos/animado/peru/def/peru1.png";
    frame2 = "../img/jogo/inimigos/animado/peru/def/peru2.png";
    frame3 = "../img/jogo/inimigos/animado/peru/def/peru1.png";
    idle = "../img/jogo/inimigos/animado/peru/statico/peru1.png";
  }

  if (boss === "ayla") {
    frame1 = "../img/jogo/inimigos/animado/ayla/def/ayla1.png";
    frame2 = "../img/jogo/inimigos/animado/ayla/def/ayla2.png";
    frame3 = "../img/jogo/inimigos/animado/ayla/def/ayla1.png";
    idle = "../img/jogo/inimigos/animado/ayla/statico/ayla1.png";
  }

  if (boss === "pedro") {
    frame1 = "../img/jogo/inimigos/animado/pedro/def/pedro1.png";
    frame2 = "../img/jogo/inimigos/animado/pedro/def/pedro1.png";
    frame3 = "../img/jogo/inimigos/animado/pedro/def/pedro1.png";
    idle = "../img/jogo/inimigos/animado/pedro/statico/pedro1.png";
    retaliar();
  }

  if (boss === "guinevere") {
    frame1 = "../img/jogo/inimigos/animado/guinevere/def/guinevere1.png";
    frame2 = "../img/jogo/inimigos/animado/guinevere/def/guinevere2.png";
    frame3 = "../img/jogo/inimigos/animado/guinevere/def/guinevere1.png";
    idle = "../img/jogo/inimigos/animado/guinevere/statico/guinevere1.png";
    retaliar();
  }

  function retaliar() {
    let alvo = aliado && aliado.hp > 0 ? aliado : null;

    if (alvo) {
      let dano = 5;

      if (alvo.shield > 0) {
        let absorbed = Math.min(dano, alvo.shield);
        alvo.shield -= absorbed;
        dano -= absorbed;
        floatText(alvo.el, `-${absorbed}🛡️`, "orange");
      }
      if (dano > 0) {
        alvo.hp -= dano;
        animateDamage(alvo.el, true);
        floatText(alvo.el, `-${dano}⚔️`, "orange");
      }
      if (alvo.hp <= 0) {
        matarAliado();
      }
      atualizarAliadoHUD();
    } else {
      let dano = 5;

      if (playerShield > 0) {
        let absorbed = Math.min(dano, playerShield);
        playerShield -= absorbed;
        dano -= absorbed;

        animateDamage(document.getElementById("player"), podeSacudir);
        floatText(document.getElementById("player"), `-${absorbed}🛡️`, "orange");
      }
      if (dano > 0) {
        playerHP -= dano;
        animateDamage(document.getElementById("player"), podeSacudir);
        floatText(document.getElementById("player"), `-${dano}⚔️`, "orange");
        redScreenGlow(300, 30);
        if (personagemSelecionado == "criadora") {
          ativarPretoBranco();
        }
      }
    }
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