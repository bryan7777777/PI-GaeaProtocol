async function animateEnemyCrossScreen(enemy) {
  await showScreenImage("../img/jogo/inimigos/animado/ia/efeitos/efeitoTeste.png");
  return new Promise(resolve => {
    
    const container = enemy.el;
    const img = container.querySelector("img");
    if (!img) return resolve();

    const jogo = document.getElementById("jogo");

    const originalJogoTransform = jogo.style.transform || "scale(1) translate(0px, 0px)";

    // FRAMES
    const frames = {
      f1: "../img/jogo/inimigos/animado/ia/atk/ia11.png",
      f2: "../img/jogo/inimigos/animado/ia/atk/ia33.png",
      f3: "../img/jogo/inimigos/animado/ia/atk/ia33.png",
      f4: "../img/jogo/inimigos/animado/ia/atk/ia33.png",
      f5: "../img/jogo/inimigos/animado/ia/atk/ia11.png",
      idle: "../img/jogo/inimigos/animado/ia/statico/ia1.png",
    };

    const originalTransform = window.getComputedStyle(container).transform;

    const toLeftTime = 900;
    const toRightTime = 500;
    const pauseTime = 10;
    const frameDelay = 150;

    // =====================================================
    // 🔍 FUNÇÃO QUE CALCULA E APLICA O ZOOM NO PLAYER
    // =====================================================
    function zoomOnPlayer() {
      const game = document.getElementById("jogo");
      const target = document.getElementById("player-area");

      const rect = target.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const offsetTop = 300; // Foca 10% acima do normal (50 → 40)

      game.style.transition = "transform 0.6s ease";
      game.style.transformOrigin = `${centerX}px ${centerY - offsetTop}px`;
      game.style.transform = "scale(1.8)";
    }

    setTimeout(() => img.src = frames.f1, 0);
    setTimeout(() => img.src = frames.f2, frameDelay);
    setTimeout(() => img.src = frames.f3, frameDelay * 2);
    zoomOnPlayer();

    function spawnTrailEffects() {
      const trailSrc = "../img/jogo/inimigos/animado/ia/efeitos/ia111.png";
      const totalTrails = 4;
      const toLeftTime = 2700;

      for (let i = 0; i < totalTrails; i++) {
        const trail = document.createElement("img");
        trail.src = trailSrc;

        trail.style.position = "absolute";
        trail.style.pointerEvents = "none";
        trail.style.opacity = "0.8";
        trail.style.filter = "brightness(1.35)";
        trail.style.width = "500px";
        trail.style.height = "300px";

        const inFront = i < 2;
        trail.style.zIndex = inFront ? "9999" : "1";

        let offsetY = 0;
        let offsetX = 0;

        if (inFront) {
          if (i === 0) { offsetY = -15; offsetX = 8; }
          else { offsetY = -60; offsetX = 3; }
        } else {
          if (i === 2) { offsetY = 20; offsetX = 20; }
          else { offsetY = -40; offsetX = 25; }
        }

        trail.style.top = (container.offsetTop + offsetY) + "px";
        trail.style.left = `calc(100vw + ${offsetX}vw)`;

        trail.style.transform = "translateX(0)";
        trail.style.transition = `transform ${toLeftTime}ms linear`;

        container.parentElement.appendChild(trail);

        requestAnimationFrame(() => {
          trail.style.transform = "translateX(-160vw)";
        });

        setTimeout(() => trail.remove(), toLeftTime + 200);
      }
    }

    // DASH DO INIMIGO
    container.style.transition = `transform ${toLeftTime}ms ease-in-out`;
    container.style.transform = "translateX(-110vw)";

    spawnTrailEffects();

    setTimeout(() => {
      img.src = frames.f4;

      setTimeout(() => {
        // teleport
        container.style.transition = "none";
        container.style.transform = "translateX(110vw)";
        void container.offsetWidth;

        img.src = frames.f5;

        // volta
        container.style.transition = `transform ${toRightTime}ms ease-in-out`;
        container.style.transform = originalTransform === "none" ? "translateX(0)" : originalTransform;

        setTimeout(() => {
          img.src = frames.idle;

          // remove o zoom
          jogo.style.transition = "transform 500ms ease-out";
          jogo.style.transform = originalJogoTransform;

          resolve();
        }, toRightTime);

      }, pauseTime);

    }, toLeftTime);
  });
};

function showScreenImage(imgSrc) {
  return new Promise(resolve => {
    startScreenGlitch();
    shakeScreenNatural();
    

    const overlay = document.createElement("div");
    const img = document.createElement("img");

    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.zIndex = "99999";
    overlay.style.pointerEvents = "none";
    overlay.style.overflow = "hidden";

    img.src = imgSrc;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";

    img.style.transform = "translateY(-100%)";
    img.style.transition = "transform 0.28s cubic-bezier(0.1, 0.8, 0.2, 1.2)";

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    img.getBoundingClientRect(); // força render

    img.style.transform = "translateY(0%)";

    setTimeout(() => {
      overlay.remove();
      resolve();
    }, 700); // tempo total curto
  });
}
