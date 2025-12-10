// TUDO o que esta aqui é pq n da para dxar fora da main (mt trampo)
// ALL ADDEVENTLISTENER (CLICLK)
document.getElementById('lutaUm').addEventListener('click', irParaDiv2);
document.getElementById('lojaUm').addEventListener('click', irParaDiv2);
// Botão confirmar seleção
document.getElementById("fimSelecao").addEventListener("click", () => {
  if (!personagemSelecionado) {
    // Opcional: destacar os personagens para indicar que precisam ser selecionados
    const personagens = document.querySelectorAll(".personagem");
    personagens.forEach(p => {
      p.classList.add("destacar"); // você pode criar no CSS um efeito de borda ou brilho
      setTimeout(() => p.classList.remove("destacar"), 1000);
    });

    return; // impede que saia da tela
  }

  // Se houver seleção
  criarPlayerNaDiv3(); // cria o player na tela de batalha
  irParaDiv2();      // vai para o mapa ou próxima tela
  console.log("Selecionado:", personagemSelecionado);
});
document.querySelectorAll('.ferreiro').forEach(el => {
  el.addEventListener('click', irParaDiv2);
});
document.querySelectorAll('.inventario').forEach(el => {
  el.addEventListener('click', irParaDiv2);
});
document.querySelectorAll('.pular').forEach(el => {
  el.addEventListener('click', irParaDiv2);
});
document.querySelectorAll('.curaVida').forEach(el => {
  el.addEventListener('click', curaVida);
});
document.querySelectorAll('.aumentaVida').forEach(el => {
  el.addEventListener('click', aumentaVida);
});
document.querySelectorAll('.aumentaSacre').forEach(el => {
  el.addEventListener('click', aumentaSacre);
});
document.querySelectorAll('.curaSacre').forEach(el => {
  el.addEventListener('click', curaSacre);
});
document.querySelectorAll('.armaduraUp').forEach(el => {
  el.addEventListener('click', armaduraUp);
});
document.querySelectorAll('.armaduraSacre').forEach(el => {
  el.addEventListener('click', armaduraSacre);
});

// INTERNAL FUNCTIONS LIBRARY
// CONFS
function floatText(target, text, color) {
  // Adiciona à fila
  floatQueue.push({ target, text, color });

  // Se já estiver mostrando, não dispara outra
  if (!showingFloat) processFloatQueue();
};
function processFloatQueue() {
  if (floatQueue.length === 0) {
    showingFloat = false;
    return;
  }

  showingFloat = true;
  const { target, text, color } = floatQueue.shift();

  const div = document.createElement("div");
  div.className = "float-text";
  div.style.color = color;
  div.style.fontWeight = "bold";
  div.style.position = "absolute";
  div.style.opacity = "1";
  div.style.pointerEvents = "none";
  div.innerText = text;
  document.body.appendChild(div);

  // 🔹 Posição inicial
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;

  if (target && target.getBoundingClientRect) {
    const rect = target.getBoundingClientRect();
    x = rect.left + rect.width / 2 + window.scrollX;
    y = rect.top + window.scrollY - 20;
  }

  div.style.left = x + "px";
  div.style.top = y + "px";
  div.style.transform = "translateX(-50%)";

  // 🔹 Duração customizada
  const isAylaQuote = text.length > 10 && color === "violet"; // detecta fala da Ayla
  const duration = isAylaQuote ? 3000 : 250; // ← tempo total: 2s Ayla / 0.25s padrão

  // 🔹 Animação
  setTimeout(() => {
    div.style.transition = `all ${duration / 1000}s ease-out`;
    div.style.opacity = "0";
    div.style.top = (y - (isAylaQuote ? 80 : 40)) + "px";
  }, 50);

  // 🔹 Remover e processar próximo
  setTimeout(() => {
    div.remove();
    processFloatQueue();
  }, duration + 100);
};
function marcarInimigos(elemento, tipo, txt = false) {
  fraqueza = "";
  switch (elemento) {
    case "♨️":
      fraqueza = "🌧️";
      break;
    case "⛰️":
      fraqueza = "♨️";
      break;
    case "🌧️":
      fraqueza = "⛰️";
      break;

    default:
      break;
  }

  if (tipo == "area") {
    if (hasItem(15)) {
      reciclador();
    }
    if (hasItem(16)) {
      gancioso();
    }

    enemies.forEach(e => {
      if (e.tipoVida === "🧿" || e.tipoVida === fraqueza) return;
      e.tipoVida = elemento;
      if (txt == true) {
        floatText(e.el, elemento, "blue");
      }
    });
  } else if (tipo == "unico") {
    if (hasItem(15)) {
      reciclador();
    }
    if (hasItem(16)) {
      gancioso();
    }

    if (enemies[0].tipoVida !== "🧿" && enemies[0].tipoVida !== fraqueza) {
      enemies[0].tipoVida = elemento;
    }

    if (txt == true) {
      floatText(enemies[0].el, elemento, "blue");
    }
  }
};
function checkEnemies() {
  if (playerHP <= 0) {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("popupOver").style.display = "flex";
    gerarItens();
    limiteMao = maoInicio;
    document.getElementById("enemies").style.display = "none";
    document.getElementById("lifeBarsContainer").style.display = "none";
    energy = energyMax;
    drawNewCards();
    drawCards();
    updateHUD();
    playerShield = playerShieldInit;
  }

  for (let i = enemies.length - 1; i >= 0; i--) {
    if (enemies[i].hp <= 0) {

      const morto = enemies[i];
      const parentEnemies = document.getElementById("enemies");
      const parentBars = document.getElementById("lifeBarsContainer");

      // animação de morte do inimigo
      if (morto.el) {
        morto.el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        morto.el.style.opacity = "0";
        morto.el.style.transform = "scale(0.8)";
      }

      if (morto.barEl) {
        const barP = morto.barEl.closest("p");
        if (barP) {
          barP.style.transition = "opacity 0.5s ease";
          barP.style.opacity = "0";
        }
      }

      ((index) => {
        setTimeout(() => {
          if (!enemies[index]) return;

          const oldEl = morto.el;
          const oldBar = morto.barEl.closest("p");

          if (oldEl) oldEl.remove();
          if (oldBar) oldBar.remove();

          enemies.splice(index, 1);

          if (
            morto.name === "Irislidriz" ||
            morto.name === "Vigia de Irislidriz" ||
            morto.name === "Observador de Irislidriz" ||
            morto.name === "Medo De Ayla" ||
            morto.name === "Tristeza De Ayla" ||
            morto.name === "Ansiedade De Ayla" ||
            morto.name === "Raiva De Ayla" ||
            morto.name === "Angustia De Ayla" ||
            morto.name === "Amor De Ayla" ||
            morto.name === "Nojo De Ayla" ||
            morto.name === "Boss Ayla"
          ) {
            let novos = [];

            if (morto.name === "Irislidriz" && reviver === 0) {
              shakeScreenNatural(10, 400);
              novos.push({
                name: "Irislidriz",
                hp: 50,
                dano: 20,
                behavior: () => [{ type: "attack", value: 20 }],
                img: "../img/jogo/inimigos/valkFantasmaElite.png",
                tipoDano: "⚔️",
                tipoVida: "💤",
              });
              reviver++;
            } else if (morto.name === "Irislidriz" && reviver === 1) {
              shakeScreenNatural(30, 800);
              novos.push({
                name: "Irislidriz",
                hp: 40,
                dano: 25,
                behavior: () => [{ type: "attackVida", value: 30 }],
                img: "../img/jogo/inimigos/valkFantasma.png",
                tipoDano: "🔱",
                tipoVida: "❤️",
              });
              reviver++;
            }

            if (morto.name.includes("Ayla")) {
              if (morto.name === "Medo De Ayla") {
                shakeScreenNatural(10, 400);
                document.getElementById("jogo").style.backgroundImage = "url('../img/jogo/background/cidadeAsustadora.png')";
                novos.push(
                  {
                    name: "Nojo De Ayla",
                    hp: 60,
                    dano: 20,
                    behavior: () => [{ type: "attackVida", value: 20 }],
                    img: "../img/jogo/inimigos/nojo.png",
                    tipoDano: "🔱",
                    tipoVida: "🪬",
                  },
                  {
                    name: "Tristeza De Ayla",
                    hp: 40,
                    dano: 12,
                    behavior: () => [{ type: "heal", value: Math.random() < 0.7 ? 12 : 24 }],
                    img: "../img/jogo/inimigos/tristeza.png",
                    tipoDano: "(💚🎭💊)💥",
                    tipoVida: "🪬",
                  }
                );
              }
              else if (
                ["Nojo De Ayla", "Tristeza De Ayla"].includes(morto.name)
              ) {
                if (enemies.every(e => !["Nojo De Ayla", "Tristeza De Ayla"].includes(e.name))) {
                  novos.push(
                    {
                      name: "Ansiedade De Ayla",
                      hp: 70,
                      dano: 12,
                      behavior: () => [
                        { type: Math.random() < 0.5 ? "heal" : "attack", value: Math.random() < 0.7 ? 12 : 24 },
                      ],
                      img: "../img/jogo/inimigos/ansiedade.png",
                      tipoDano: "(⚔️❓💚🎭💊)💥",
                      tipoVida: "🪬",
                    },
                    {
                      name: "Raiva De Ayla",
                      hp: 30,
                      dano: 30,
                      behavior: () => [{ type: "attack", value: 30 }],
                      img: "../img/jogo/inimigos/raiva.png",
                      tipoDano: "⚔️",
                      tipoVida: "🪬",
                    }
                  );
                }
              }
              else if (
                ["Raiva De Ayla", "Ansiedade De Ayla"].includes(morto.name)
              ) {
                if (enemies.every(e => !["Raiva De Ayla", "Ansiedade De Ayla"].includes(e.name))) {
                  novos.push(
                    {
                      name: "Amor De Ayla",
                      hp: 120,
                      dano: 25,
                      behavior: () => [{ type: Math.random() < 0.5 ? "heal" : "attack", value: 25 }],
                      img: "../img/jogo/inimigos/amor.png",
                      tipoDano: "⚔️❓💚🎭💊",
                      tipoVida: "🪬",
                    },
                    {
                      name: "Angustia De Ayla",
                      hp: 50,
                      dano: 20,
                      behavior: () => [{ type: "heal", value: 20 }],
                      img: "../img/jogo/inimigos/Vulnerabilidade.png",
                      tipoDano: "💚🎭💊",
                      tipoVida: "🪬",
                    }

                  );
                }
              }
              else if (
                ["Angustia De Ayla", "Amor De Ayla"].includes(morto.name)
              ) {
                const vivos = enemies.filter(e => e.hp > 0);
                if (vivos.every(e => !["Angustia De Ayla", "Amor De Ayla"].includes(e.name))) {
                  shakeScreenNatural(30, 800);
                  document.getElementById("jogo").style.backgroundImage =
                    "url('../img/jogo/background/lutaSuperior.png')";
                  console.log("Spawnando boss final: Ayla");
                  novos.push({
                    name: "Ayla",
                    hp: 200,
                    dano: 20,
                    behavior: () => [
                      { type: Math.random() < 0.5 ? "heal" : "attack", value: Math.random() < 0.9 ? 20 : 100 },
                    ],
                    img: "../img/jogo/inimigos/bossIra.png",
                    tipoDano: "(⚔️❓💊)💣",
                    tipoVida: "🧿",
                  });
                }
              }
            }

            if (morto.name === "Vigia de Irislidriz") {
              novos.push({
                name: "Protetor de Irislidriz",
                hp: 100,
                maxHp: 100,
                dano: 5,
                behavior: () => [{ type: "attack", value: 5 }],
                img: "../img/jogo/inimigos/olhoIra.png",
                tipoDano: "⚔️",
                tipoVida: "❤️",
              });
            }

            if (morto.name === "Observador de Irislidriz") {
              novos.push({
                name: "Guardião de Irislidriz",
                hp: 35,
                maxHp: 35,
                dano: 10,
                behavior: () => [
                  { type: "heal", value: Math.random() < 0.7 ? 10 : 20 },
                ],
                img: "../img/jogo/inimigos/olhoRedencao.png",
                tipoDano: "(💚🎭💊)💥",
                tipoVida: "❤️",
              });
            }

            // Criação visual dos novos inimigos (sem mudar o resto da lógica)
            if (novos.length > 0) {
              novos.forEach((novo, j) => {
                enemies.splice(index + j, 0, novo);

                novo.el = createEnemy(novo.img);
                novo.el.style.display = "inline-block";
                parentEnemies.insertBefore(
                  novo.el,
                  parentEnemies.children[index + j] || null
                );

                const lifeBar = document.createElement("p");
                lifeBar.className = "enemy-bar";
                lifeBar.innerHTML = `
                  <strong> ⟪ ${novo.name} ⟫ </strong><br>
                  ⟪ <span class="enemy-vida">${novo.tipoVida}</span> 
                  <span class="enemy-hp">${novo.hp}</span> - 
                  <span class="enemy-dano">${novo.tipoDano} ${novo.dano}</span> ⟫
                `;
                parentBars.insertBefore(
                  lifeBar,
                  parentBars.children[index + j] || null
                );

                novo.barEl = lifeBar.querySelector(".enemy-hp");
                novo.dmgEl = lifeBar.querySelector(".enemy-dano");
                novo.tipoVidaEl = lifeBar.querySelector(".enemy-vida");
              });

              displayInimigos();
            }
          }

          // Checagem se acabou a batalha
          if (mapaBatalha === 35 && enemies.length === 0 && playerHP > 0) {
            document.getElementById("overlay").style.display = "block";
            document.getElementById("popupFinal").style.display = "flex";
            limiteMao = maoInicio;
            document.getElementById("enemies").style.display = "none";
            document.getElementById("lifeBarsContainer").style.display = "none";
            energy = energyMax;
            drawNewCards();
            drawCards();
            updateHUD();
            playerShield = playerShieldInit;
            atualizarDinheiro()
          } else if (enemies.length === 0 && playerHP > 0) {
            document.getElementById("overlay").style.display = "block";
            document.getElementById("popup").style.display = "flex";

            if (hasItem(23)) {
              cura = playerMaxHP / 10;
              playerHP = Math.min(playerHP + cura, playerMaxHP);
              glowPlayer("green");
              floatText(document.getElementById("player"), `+${cura}💚`, "lime");
            }

            if (tipoFase == "elite" || tipoFase == "boss") {
              gerarItens();
            } else {
              // gerarItens();
              gerarCartaRecomp();
            }

            limiteMao = maoInicio;
            document.getElementById("enemies").style.display = "none";
            document.getElementById("lifeBarsContainer").style.display = "none";
            energy = energyMax;
            drawNewCards();
            drawCards();
            updateHUD();
            playerShield = playerShieldInit;
            reviver = 0;
            atualizarDinheiro()
          }
        }, 500);
      })(i);
    }
  }
};
function redScreenGlow(duration = 500, intensity = 30) {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.pointerEvents = "none"; // não bloqueia cliques
  overlay.style.boxSizing = "border-box";
  overlay.style.zIndex = "9999";

  // cria o glow vermelho para dentro
  overlay.style.boxShadow = `0 0 ${intensity}px ${intensity / 2}px rgba(214, 77, 77, 1) inset`;
  overlay.style.opacity = "1";
  overlay.style.transition = `opacity 0.3s ease-out`;

  document.body.appendChild(overlay);

  // desaparece suavemente
  setTimeout(() => {
    overlay.style.opacity = "0";
    setTimeout(() => overlay.remove(), 300);
  }, duration);
};
function shakeScreenNatural(maxIntensity = 20, duration = 600) {
  const container = document.body; // ou outro container principal
  const start = Date.now();

  function step() {
    const elapsed = Date.now() - start;
    const progress = elapsed / duration;

    if (progress < 1) {
      // intensidade diminui com o tempo (ease out)
      const intensity = maxIntensity * (1 - progress);
      const x = (Math.random() * 2 - 1) * intensity;
      const y = (Math.random() * 2 - 1) * intensity;

      container.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(step);
    } else {
      // reseta posição
      container.style.transform = '';
    }
  }

  step();
};
// LOGICA DAS CARDS
function drawCards() {
  const cards = document.getElementById("cards");
  cards.innerHTML = "";
  deck.forEach((card, i) => {
    const div = document.createElement("div");
    // Determina o tipo da carta
    let tipo = "";
    switch (card.name) {
      // 46
      //✨✨✨✨✨ CINTILANTE 2 ✨✨✨✨✨
      case "GÆPROTOCOL":
      case "Guardião":
      case "Armamento Pesado":
      case "Chuva de Laminas":
        tipo = "cintilante";
        break;
      //♨️♨️♨️♨️♨️ FIRE 2 ♨️♨️♨️♨️♨️
      case "Combustão":
      case "Chuva De Fogo":
      case "Explosão Termica":
      case "Ataque De Fogo":
      case "Lança Chamas":
      case "Cauterizar":
        tipo = "fire";
        break;
      //⛰️⛰️⛰️⛰️⛰️ TERRA 2 ⛰️⛰️⛰️⛰️⛰️
      case "Soterrar":
      case "Deslizamento":
      case "Chuva Rochosa":
      case "Arma Ancestral":
      case "Força De Gaea":
      case "Brutalidade Da Terra":
      case "Tudo Virá Terra":
      case "Escudo De Gaea":
      case "Coração De Gaea":
        tipo = "terra";
        break;
      //🌧️🌧️🌧️🌧️🌧️ AGUA 2 🌧️🌧️🌧️🌧️🌧️
      case "Jato De Água":
      case "Mar Denso":
      case "Chuva Isolante":
      case "Chuva Corrosiva":
      case "Chuva Controlada":
      case "Corrosão":
        tipo = "agua";
        break;
      //❄️❄️❄️❄️❄️ FROST ❄️❄️❄️❄️❄️
      case "Gelo Mortal":
      case "Marcar":
      case "Granizo":
      case "Granizo Mortal":
      case "Misil Condensado":
      case "Golpe Traseiro":
      case "Misil Termico Guiado":
      case "Cemiterio Branco":
      case "Ataque Condensado":
      case "Defesa Condensada":
      case "Xenofluxo Glacial":
      case "Coração Frio":
      case "Baralho Glacial":
      case "Nevasca Mortal":
        tipo = "frost";
        break;
      // ⚔️⚔️⚔️⚔️⚔️ ATAQUE 11 ⚔️⚔️⚔️⚔️⚔️
      case "Ataque":
      case "Ceifa":
      case "Desprezo":
      case "Broca Perfurante":
      case "Artilharia Anti Sniper":
      case "Ataque Rapido":
      case "Ataque Preciso":
      case "Liderança":
      case "Furia":
      case "Drone de Ataque":
      case "Vingativo":
      case "Rebeldia":
      case "Impacto Bruto":
      case "Fogo Amigo":
      case "Drenagem":
      case "Beserck":
      case "Explosão":
      case "Chuva De Fragmentos":
      case "Rajada Dupla":
        tipo = "attack";
        break;
      // 🛡️🛡️🛡️🛡️🛡️ DEFESA 10 🛡️🛡️🛡️🛡️🛡️
      case "Defesa":
      case "Tsunami":
      case "Campo de Força Instavel":
      case "Campo de Força Fraco":
      case "Campo Presurizado":
      case "Blindagem Vital":
      case "Defesa Salvadora":
      case "Ultima Defesa":
      case "Drone Defensivo":
      case "Escudo Triangular":
      case "Arpão":
      case "Defesa Lunar":
      case "Campo Presurizado":
      case "Em guarda":
      case "Indestrutivel":
      case "Sistema de reflexão":
      case "Escudo Retaliante":
      case "Impulso Defensivo":
      case "PROTOCOL-Campo De Força":
      case "Brilhando":
      case "Escudo":
        tipo = "defense";
        break;
      // 💚💚💚💚💚 SUPORTE 8 💚💚💚💚💚
      case "Cura":
      case "Ritual":
      case "Cura Forte":
      case "Estratégia":
      case "Limite da Vida":
      case "Xenofluxo":
      case "Drone Médico":
      case "Sob-Vigia":
      case "Mineração":
      case "PROTOCOL-Reforço Estrutural":
      case "Impulso":
      case "Golpe Neural Retaliante":
      case "Compra Dupla":
      case "Sobre Carga":
        tipo = "heal";
        break;
      //  ♻️♻️♻️♻️♻️ RECICLAGEM 6 ♻️♻️♻️♻️♻️
      case "Recicladora":
      case "Arma Auto Sustentavel":
      case "Essencia Verde":
      case "Defesa Renovavel":
      case "Drone de Coleta":
      case "Ataque Reciclável":
      case "Terror Critico":
      case "Defesa Reciclável":
      case "Xenofluxo Reciclável":
      case "Destruir Carta":
        tipo = "reciclagem";
        break;
      //  🗑️🗑️🗑️🗑️🗑️ LIXO 9 🗑️🗑️🗑️🗑️🗑️
      case "Entulho":
      case "Drone Quebrado":
      case "Lixo quimico":
      case "Cura Quebrada":
      case "Arma Quebrada":
      case "Escudo quebrado":
      case "Restos de mecha":
      case "Ferro Velho":
        tipo = "lixo";
        break;
    }

    div.className = `card ${card.rarity} ${tipo}`;
    div.innerHTML = `
          <img src="${card.img}" alt="${card.name}">
          <div class="energia"><strong>${card.cost}</strong></div>
          <div class="desc"><strong>${card.name}</strong><br><em>${card.desc}</em></div>
        `;
    div.onclick = () => {
      if (energy < card.cost || playerHP <= 0 || enemies.length === 0) return;
      energy -= card.cost;

      if (hasItem(19) && hasItem(18) && hasItem(5)) {
        curandeiro();
      }
      //  ⚔️⚔️⚔️⚔️⚔️ ATAQUE ⚔️⚔️⚔️⚔️⚔️
      if (card.name === "Ataque") {
        animateDamage(enemies[0].el);
        enemies[0].hp -= card.power;
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
        if (hasItem(12)) {
          applyItemAreaBonus(enemies);
        }
      }
      //⚔️
      else if (card.name === "Ceifa") {
        let dano = card.power;
        const alvo = [...enemies].reverse().find(e => e.hp > 0);
        if (alvo.hp <= 30) {
          dano *= 3;
        }
        if (alvo) {
          animateDamage(alvo.el);
          alvo.hp -= dano;
          floatText(alvo.el, `-${dano}⚔️`, "red");
        }
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
        if (hasItem(12)) {
          applyItemAreaBonus(enemies);
        }
      }
      //⚔️
      else if (card.name === "Desprezo") {
        const alvo = [...enemies].reverse().find(e => e.hp > 0);
        if (alvo) {
          animateDamage(alvo.el);
          alvo.hp -= card.power;
          floatText(alvo.el, `-${card.power}⚔️`, "red");
        }
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
        if (hasItem(12)) {
          applyItemAreaBonus(enemies);
        }
      }
      //⚔️
      else if (card.name === "Broca Perfurante") {
        let dano = card.power;
        if (deck.length <= 3) {
          dano *= 2;
        }
        // pega o último inimigo vivo
        const alvo = [...enemies].reverse().find(e => e.hp > 0);
        if (alvo) {
          animateDamage(alvo.el);
          alvo.hp -= dano;
          floatText(alvo.el, `-${dano}⚔️`, "red");
        }
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
        if (hasItem(12)) {
          applyItemAreaBonus(enemies);
        }
      }
      //⚔️
      else if (card.name === "Artilharia Anti Sniper") {
        val = deck.length;
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
        if (val <= 3) {
          deck.push({ ...allCards.find(c => c.name === "Broca Perfurante"), power: 8, cost: 0 });
          deck.push({ ...allCards.find(c => c.name === "Ceifa"), power: 12, cost: 1 });
          deck.push({ ...allCards.find(c => c.name === "Desprezo"), power: 20, cost: 1 });
        }
        if (hasItem(12)) {
          applyItemAreaBonus(enemies);
        }
      }
      //⚔️
      else if (card.name === "Ataque Rapido") {
        animateDamage(enemies[0].el);
        enemies[0].hp -= card.power;
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
        if (hasItem(12)) {
          applyItemAreaBonus(enemies);
        }
      }
      //⚔️
      else if (card.name === "Ataque Preciso") {
        animateDamage(enemies[0].el);
        if (enemies[0].hp <= 30) {
          dano = 20;
        } else {
          dano = card.power;
        }
        enemies[0].hp -= dano;
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
        floatText(enemies[0].el, `-${dano}⚔️`, "red");
        if (hasItem(12)) {
          applyItemAreaBonus(enemies);
        }
      }
      //⚔️
      else if (card.name === "Rebeldia") {
        dano = card.power;
        if (playerShield <= 0) {
          dano += card.power;
        }
        if (playerHP <= 30) {
          dano += card.power;
        }
        animateDamage(enemies[0].el);
        enemies[0].hp -= dano;
        floatText(enemies[0].el, `-${dano}⚔️`, "red");
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
        if (hasItem(12)) {
          applyItemAreaBonus(enemies);
        }
      }
      //⚔️
      else if (card.name === "Vingativo") {
        animateDamage(enemies[0].el);
        dano = playerMaxHP - playerHP;
        enemies[0].hp -= dano;
        floatText(enemies[0].el, `-${dano}⚔️`, "red");
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
        if (hasItem(12)) {
          applyItemAreaBonus(enemies);
        }
      }
      //⚔️
      else if (card.name === "Liderança") {
        if (enemies.length > 0) {
          animateDamage(enemies[0].el);
          enemies[0].hp -= card.power;
          floatText(enemies[0].el, `-${card.power}⚔️`, "red");
        }
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
        // filtra cartas que NÃO sejam Liderança
        const clonePool = playerDeck.filter(c => c.name !== "Liderança");
        const cartasParaAdicionar = 1;
        const espaco = maxMao - deck.length;
        const total = Math.min(cartasParaAdicionar, espaco);
        for (let i = 0; i <= total; i++) {
          if (clonePool.length > 0) {
            const base = clonePool[Math.floor(Math.random() * clonePool.length)];
            const newCard = {
              ...base,
              power: base.basePower ?? base.power ?? 0
            };
            deck.push(newCard); // adiciona diretamente
          }
        }
        if (hasItem(12)) {
          applyItemAreaBonus(enemies);
        }
      }
      //⚔️
      else if (card.name === "Furia") {
        if (deck.length <= 1) {
          j = card.power * 2
        } else {
          j = card.power
        }
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
        const cartasParaAdicionar = j - 1;
        const espaco = maxMao - deck.length;
        const total = Math.min(cartasParaAdicionar, espaco);
        for (let i = 0; i <= total; i++) {
          deck.push({ ...allCards.find(c => c.name === "Ataque Rapido"), power: 5, cost: 0 });
        }
        if (hasItem(12)) {
          applyItemAreaBonus(enemies);
        }
      }
      //⚔️
      else if (card.name === "Drone de Ataque") {
        enemies.forEach(e => {
          animateDamage(e.el);
          e.hp -= card.power;
          floatText(e.el, `-${card.power}⚔️`, "red");
        });

        deck.push({ ...allCards.find(c => c.name === "Drone Quebrado"), power: 0 });
        const cartasParaAdicionar = enemies.length - 1;
        const espaco = maxMao - deck.length;
        const total = Math.min(cartasParaAdicionar, espaco);
        for (let i = 0; i <= total; i++) {
          deck.push({ ...allCards.find(c => c.name === "Ataque Preciso"), power: 6 });
        }
        if (hasItem(12)) {
          applyItemAreaBonus(enemies);
        }
      }
      //⚔️
      else if (card.name === "Drenagem") {
        playerShield += card.power;
        glowPlayer("green");
        playerHP = Math.min(playerHP + card.power, playerMaxHP);
        enemies[0].hp -= card.power;
        animateDamage(enemies[0].el);
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
        floatText(document.getElementById("player"), `+${card.power}💚`, "lime")
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });;
        if (hasItem(12)) {
          applyItemAreaBonus(enemies);
        }
      }

      else if (card.name === "Explosão") {
        enemies.forEach(e => {
          animateDamage(e.el);
          e.hp -= card.power;
          floatText(e.el, `-${card.power}⚔️`, "red");
        });
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
        if (hasItem(12)) {
          applyItemAreaBonus(enemies);
        }
      }
      //⚔️
      else if (card.name === "Chuva De Fragmentos") {
        enemies.forEach(e => {
          animateDamage(e.el);
          e.hp -= card.power;
          floatText(e.el, `-${card.power}⚔️`, "red");
        });
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
        if (hasItem(12)) {
          applyItemAreaBonus(enemies);
        }
      }
      //⚔️
      else if (card.name === "Fogo Amigo") {
        enemies.forEach(e => {
          animateDamage(e.el);
          e.hp -= card.power;
          floatText(e.el, `-${card.power}⚔️`, "red");
          let dano = 15;
          floatText(document.getElementById("player"), `-${dano}⚔️`, "red");

          if (playerShield > 0) {
            let absorbed = Math.min(dano, playerShield);
            playerShield -= absorbed;
            dano -= absorbed;
          }
          if (dano > 0) {
            playerHP -= dano;
          }
        });
        animateDamage(document.getElementById("player"));
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
        if (hasItem(12)) {
          applyItemAreaBonus(enemies);
        }
      }
      //⚔️
      else if (card.name === "Rajada Dupla") {
        animateDamage(enemies[0].el);
        enemies[0].hp -= card.power;
        enemies[0].hp -= card.power;
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
        if (hasItem(12)) {
          applyItemAreaBonus(enemies);
        }
      }
      //⚔️
      else if (card.name === "Impacto Bruto") {
        animateDamage(enemies[0].el);
        enemies[0].hp -= card.power;
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
        if (hasItem(12)) {
          applyItemAreaBonus(enemies);
        }
      }
      //⚔️
      else if (card.name === "Beserck") {
        let dano = card.power;
        if (deck.length <= 3) {
          dano = card.power * 3;
        }
        animateDamage(enemies[0].el);
        enemies[0].hp -= dano;
        floatText(enemies[0].el, `-${dano}⚔️`, "red");
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
        if (hasItem(12)) {
          applyItemAreaBonus(enemies);
        }
      }

      //  🛡️🛡️🛡️🛡️🛡️ DEFESA 🛡️🛡️🛡️🛡️🛡️
      else if (card.name === "Defesa") {
        playerShield += card.power;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
        if (hasItem(13)) {
          protetor();
        }
      }
      //🛡️
      else if (card.name === "Campo de Força Fraco") {
        playerShield += card.power;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
        if (hasItem(13)) {
          protetor();
        }
      }
      //🛡️
      else if (card.name === "Tsunami") {
        def = card.power * (deck.length + enemies.length);
        playerShield += def;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${def}🛡️`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
        if (hasItem(13)) {
          protetor();
        }
      }
      //🛡️
      else if (card.name === "Defesa Salvadora") {
        def = card.power;
        if (deck.length <= 1) {
          def *= 3
          playerShield += def;
          playerHP = Math.min(playerHP + def, playerMaxHP);
          glowPlayer("green");
          floatText(document.getElementById("player"), `+${def}💚`, "lime");
        } else if (deck.length <= 3) {
          playerShield += def;
          playerHP = Math.min(playerHP + def, playerMaxHP);
          glowPlayer("green");
          floatText(document.getElementById("player"), `+${def}💚`, "lime");
        } else {
          playerShield += def;
        }
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${def}🛡️`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
        if (hasItem(13)) {
          protetor();
        }
      }
      //🛡️
      else if (card.name === "Ultima Defesa") {
        if (deck.length <= 1) {
          playerShield += card.power;
          glowPlayer("blue");
          floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
        }
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
        if (hasItem(13)) {
          protetor();
        }
      }
      //🛡️
      else if (card.name === "Campo de Força Instavel") {
        if (deck.length == 4) {
          playerShield += card.power;
          glowPlayer("blue");
          floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
        }
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
        if (hasItem(13)) {
          protetor();
        }
      }
      //🛡️
      else if (card.name === "Campo Presurizado") {
        if (deck.length <= 1) {
          playerShield += card.power;
          glowPlayer("blue");
          floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
        }
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
        if (hasItem(13)) {
          protetor();
        }
      }
      //🛡️
      else if (card.name === "Blindagem Vital") {
        def = playerHP;
        if (deck.length <= 1) {
          def *= 2;
        }
        playerShield += def;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${def}🛡️`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
        if (hasItem(13)) {
          protetor();
        }
      }
      //🛡️
      else if (card.name === "Campo Presurizado") {
        if (deck.length == 1) {
          playerShield += card.power;
          glowPlayer("blue");
          floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
          deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
        }
        if (hasItem(13)) {
          protetor();
        }
      }
      //🛡️
      else if (card.name === "Escudo Triangular") {
        if (deck.length <= 3) {
          def = card.power * 3;
        } else {
          def = card.power;
        }
        playerShield += def;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${def}🛡️`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
        if (hasItem(13)) {
          protetor();
        }
      }
      //🛡️
      else if (card.name === "Defesa Lunar") {
        if (deck.length <= 3) {
          playerShield += card.power;
          glowPlayer("blue");
          floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
          deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
        } else {
          animateDamage(enemies[0].el);
          enemies[0].hp -= card.power;
          deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
          floatText(enemies[0].el, `-${card.power}⚔️`, "red");
        }
        if (hasItem(13)) {
          protetor();
        }
      }
      //🛡️
      else if (card.name === "Em guarda") {
        if (playerShield > 0) {
          playerShield += card.power;
          glowPlayer("blue");
          floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
        }
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
        if (hasItem(13)) {
          protetor();
        }
      }
      //🛡️
      else if (card.name === "Drone Defensivo") {
        if (enemies.length >= 3) {
          oq = { ...allCards.find(c => c.name === "Escudo"), power: 10 };
        } else {
          oq = { ...allCards.find(c => c.name === "Defesa"), power: 6 };
        }
        deck.push({ ...allCards.find(c => c.name === "Drone Quebrado"), power: 0 });
        const cartasParaAdicionar = enemies.length - 1;
        const espaco = maxMao - deck.length;
        const total = Math.min(cartasParaAdicionar, espaco);
        for (let i = 0; i <= total; i++) {
          deck.push(oq);
        }
        if (hasItem(13)) {
          protetor();
        }
      }
      //🛡️
      else if (card.name === "Impulso Defensivo") {
        energy += 1;
        playerShield += 3;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${card.power}🔷`, "cyan");
        floatText(document.getElementById("player"), `+${card.power + 2}🛡️`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
        if (hasItem(13)) {
          protetor();
        }
      }
      //🛡️
      else if (card.name === "Arpão") {
        let dano = card.basePower;
        if (playerShield > 0) {
          dano *= 3;
        }
        // pega o último inimigo vivo
        const alvo = [...enemies].reverse().find(e => e.hp > 0);
        if (alvo) {
          animateDamage(alvo.el);
          alvo.hp -= dano;
          floatText(alvo.el, `-${dano}⚔️`, "red");
        }
        playerShield += 3;
        floatText(document.getElementById("player"), `+3🛡️`, "blue");
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
        if (hasItem(13)) {
          protetor();
        }
      }
      //🛡️
      else if (card.name === "Escudo") {
        playerShield += card.power;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
        if (hasItem(13)) {
          protetor();
        }
      }
      //🛡️
      else if (card.name === "Indestrutivel") {
        escudo = playerShield * 2;
        playerShield = playerShield * card.power;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${escudo}🛡️`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
        if (hasItem(13)) {
          protetor();
        }
      }
      //🛡️
      else if (card.name === "Sistema de reflexão") {
        animateDamage(enemies[0].el);
        glowPlayer("blue");
        playerShield += (card.power * 2);
        enemies[0].hp -= card.power;
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
        floatText(document.getElementById("player"), `+${(card.power * 2)}🛡️`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
        if (hasItem(13)) {
          protetor();
        }
      }
      //🛡️
      else if (card.name === "PROTOCOL-Campo De Força") {
        if (playerHP <= 30) {
          playerShield += card.power;
          floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
          glowPlayer("blue");
        }
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
        if (hasItem(13)) {
          protetor();
        }
      }

      else if (card.name === "Brilhando") {
        if (playerHP == playerMaxHP) {
          playerShield += card.power;
          floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
          glowPlayer("blue");
        }
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
        if (hasItem(13)) {
          protetor();
        }
      }
      //🛡️
      else if (card.name === "Escudo Retaliante") {
        animateDamage(enemies[0].el);
        enemies[0].hp -= playerShield;
        floatText(enemies[0].el, `-${playerShield}⚔️`, "red");
        glowPlayer("blue");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
        if (hasItem(13)) {
          protetor();
        }
      }

      //  💚💚💚💚💚 BUFF 💚💚💚💚💚
      else if (card.name === "Cura") {
        playerHP = Math.min(playerHP + card.power, playerMaxHP);
        glowPlayer("green");
        floatText(document.getElementById("player"), `+${card.power}💚`, "lime");
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
        itensVerd();
      }
      //💚
      else if (card.name === "Ritual") {
        if (deck.length <= 1) {
          playerHP = Math.min(playerHP + card.power, playerMaxHP);
          glowPlayer("green");
          floatText(document.getElementById("player"), `+${card.power}💚`, "lime");
        } else {
          animateDamage(document.getElementById("player"));
          floatText(document.getElementById("player"), `-${card.power}⚔️`, "red");
          playerHP -= card.power;
        }
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
        itensVerd();
      }
      //💚
      else if (card.name === "Cura Forte") {
        if (deck.length <= 1) {
          playerHP = Math.min(playerHP + card.power, playerMaxHP);
          glowPlayer("green");
          floatText(document.getElementById("player"), `+${card.power}💚`, "lime");
        }
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
        itensVerd();
      }
      //💚
      else if (card.name === "Limite da Vida") {
        cura = card.power;
        if (playerHP <= 30) {
          cura = card.power * 3;
        }
        if (deck.length <= 3) {
          playerHP = Math.min(playerHP + cura, playerMaxHP);
          glowPlayer("green");
          floatText(document.getElementById("player"), `+${cura}💚`, "lime");
        }
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
        itensVerd();
      }
      //💚
      else if (card.name === "Estratégia") {
        if (deck.length <= 3) {
          deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
          const clonePool = playerDeck.filter(c => c.name !== "Estratégia");
          const cartasParaAdicionar = 1;
          const espaco = maxMao - deck.length;
          const total = Math.min(cartasParaAdicionar, espaco);
          for (let i = 0; i <= total; i++) {
            if (clonePool.length > 0) {
              const base = clonePool[Math.floor(Math.random() * clonePool.length)];
              const newCard = {
                ...base,
                power: base.basePower ?? base.power ?? 0
              };
              deck.push(newCard); // adiciona diretamente
            }
          }
        } else {
          energy += card.power;
          floatText(document.getElementById("player"), `+${card.power}🔷`, "cyan");
          glowPlayer("green");
          deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
        }
        itensVerd();
      }
      //💚
      else if (card.name === "Xenofluxo") {
        energy += 1;
        glowPlayer("green");
        floatText(document.getElementById("player"), `+${card.power}🔷`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
        itensVerd();
      }
      //💚
      else if (card.name === "Drone Médico") {
        glowPlayer("green");
        floatText(document.getElementById("player"), `+${card.power * enemies.length}💚`, "lime");
        deck.push({ ...allCards.find(c => c.name === "Drone Quebrado"), power: 0 });

        for (let i = 0; i < enemies.length; i++) {
          playerHP = Math.min(playerHP + card.power, playerMaxHP);
        }
        itensVerd();
      }
      //💚
      else if (card.name === "Sob-Vigia") {
        if (playerHP > 25) {
          dano = playerHP - 25;
          playerHP = 25;
          energy += 1;
          animateDamage(document.getElementById("player"));
          floatText(document.getElementById("player"), `-${dano}💔`, "red");
        } else {
          dano = 25 - playerHP;
          playerHP = 25;
          glowPlayer("green");
          floatText(document.getElementById("player"), `+${dano}💚`, "lime");
        }
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
        itensVerd();
      }
      //💚
      else if (card.name === "Sobre Carga") {
        animateDamage(enemies[0].el);
        animateDamage(document.getElementById("player"));
        playerHP = Math.min(playerHP - card.power, playerMaxHP);
        enemies[0].hp -= card.power * 3;
        floatText(enemies[0].el, `-${card.power * 3}⚔️`, "red");
        floatText(document.getElementById("player"), `-${card.power}💔`, "red");
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
        itensVerd();
      }
      //💚
      else if (card.name === "Golpe Neural Retaliante") {
        if (playerHP < 20) {
          dano = playerHP - 1;
          playerHP = 1;
        } else {
          dano = card.power;
          playerHP -= card.power;
        }
        animateDamage(enemies[0].el);
        animateDamage(document.getElementById("player"));
        enemies[0].hp -= playerHP;
        floatText(enemies[0].el, `-${playerHP}⚔️`, "red");
        floatText(document.getElementById("player"), `-${dano}💔`, "red");
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
        itensVerd();
      }
      //💚
      else if (card.name === "Impulso") {
        if (limiteMao < 10) {
          limiteMao += 1;
        }
        glowPlayer("green");
        floatText(document.getElementById("player"), `+${card.power}➕`, "lime");
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
        itensVerd();
      }
      //💚
      else if (card.name === "Mineração") {
        energy += 3;
        glowPlayer("green");
        floatText(document.getElementById("player"), `+${3}🔷`, "lime");
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
        itensVerd();
      }
      //💚
      else if (card.name === "PROTOCOL-Reforço Estrutural") {
        if (playerHP <= 30) {
          playerHP = Math.min(playerHP + card.power, playerMaxHP);
          floatText(document.getElementById("player"), `+${card.power}💚`, "lime");
          glowPlayer("green");
        }
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
        itensVerd();
      }
      //💚
      else if (card.name === "Compra Dupla") {
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
        const cartasParaAdicionar = card.power;
        const espaco = maxMao - deck.length;
        const total = Math.min(cartasParaAdicionar, espaco);
        for (let i = 0; i < total; i++) {
          const sorteada = allCards[Math.floor(Math.random() * allCards.length)];
          const newCard = {
            ...sorteada,
            power: sorteada.basePower
          };
          deck.push(newCard);
        }
        glowPlayer("green");
        itensVerd();
      }
      //  ♻️♻️♻️♻️♻️ RECICLAGEM ♻️♻️♻️♻️♻️
      else if (card.name === "Recicladora") {
        let dano = Math.floor(lixoReciclado / 3);

        animateDamage(enemies[0].el);
        enemies[0].hp -= dano;
        floatText(enemies[0].el, `-${dano}⚔️`, "red");
      }
      //♻️
      else if (card.name === "Arma Auto Sustentavel") {
        const toRemove = new Set();
        toRemove.add(card); // também remover a própria carta usada
        let lixoRemovido = 0;

        for (let j = 0; j < deck.length; j++) {
          const c = deck[j];
          if (c !== card && c.type === "lixo") {
            toRemove.add(c);
            lixoRemovido++;
            atualizarLixo();
          }
        }

        if (lixoRemovido === 0) {
          // anima só a carta usada e remova-a normalmente
          div.classList.add("card-remove");
          setTimeout(() => {
            for (let k = deck.length - 1; k >= 0; k--) {
              if (deck[k] === card) { deck.splice(k, 1); break; }
            }
            drawCards();
            updateHUD();
          }, 300);
          return;
        }

        let ganho = Math.floor(lixoRemovido * (lixoReciclado * 0.1));

        // aplica efeito imediatamente
        const dano = ganho;
        if (enemies.length > 0) {
          enemies[0].hp -= dano;
          animateDamage(enemies[0].el);
          floatText(enemies[0].el, `-${dano}⚔️`, "red");
        }
        updateHUD();

        // anima e depois remove todas as cartas marcadas
        div.classList.add("card-remove");
        setTimeout(() => {
          for (let k = deck.length - 1; k >= 0; k--) {
            if (toRemove.has(deck[k])) deck.splice(k, 1);
          }
          drawCards();
          checkEnemies();
          updateHUD();
        }, 300);

        return;
      }
      //♻️
      else if (card.name === "Essencia Verde") {
        let dano = Math.floor(lixoReciclado / 5);

        playerHP = Math.min(playerHP + dano, playerMaxHP);
        glowPlayer("green");
        floatText(document.getElementById("player"), `+${dano}💚`, "lime");
      }
      //♻️
      else if (card.name === "Defesa Renovavel") {
        let dano = Math.floor(lixoReciclado / 2);

        playerShield += dano;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${dano}🛡️`, "cyan");
      }
      //♻️
      else if (card.name === "Destruir Carta") {
        const toRemove = new Set();
        toRemove.add(card); // também remover a própria carta usada
        let lixoRemovido = 0;

        for (let j = 0; j < deck.length; j++) {
          const c = deck[j];
          if (c !== card && c.type === "lixo") {
            toRemove.add(c);
            lixoRemovido++;
            atualizarLixo();
          }
        }

        if (lixoRemovido === 0) {
          // anima só a carta usada e remova-a normalmente
          div.classList.add("card-remove");
          setTimeout(() => {
            for (let k = deck.length - 1; k >= 0; k--) {
              if (deck[k] === card) { deck.splice(k, 1); break; }
            }
            drawCards();
            updateHUD();
          }, 300);
          return;
        }


        updateHUD();

        // anima e depois remove todas as cartas marcadas
        div.classList.add("card-remove");
        setTimeout(() => {
          for (let k = deck.length - 1; k >= 0; k--) {
            if (toRemove.has(deck[k])) deck.splice(k, 1);
          }
          drawCards();
          checkEnemies();
          updateHUD();
        }, 300);

        return;
      }
      //♻️
      else if (card.name === "Ataque Reciclável") {
        // marca as cartas a remover (por identidade)
        const toRemove = new Set();
        toRemove.add(card); // também remover a própria carta usada
        let lixoRemovido = 0;

        for (let j = 0; j < deck.length; j++) {
          const c = deck[j];
          if (c !== card && c.type === "lixo") {
            toRemove.add(c);
            lixoRemovido++;
            atualizarLixo();
          }
        }

        if (lixoRemovido === 0) {
          // anima só a carta usada e remova-a normalmente
          div.classList.add("card-remove");
          setTimeout(() => {
            for (let k = deck.length - 1; k >= 0; k--) {
              if (deck[k] === card) { deck.splice(k, 1); break; }
            }
            drawCards();
            updateHUD();
          }, 300);
          return;
        }

        // aplica efeito imediatamente
        const dano = lixoRemovido * 5;
        if (enemies.length > 0) {
          enemies[0].hp -= dano;
          animateDamage(enemies[0].el);
          floatText(enemies[0].el, `-${dano}⚔️`, "red");
        }
        updateHUD();

        // anima e depois remove todas as cartas marcadas
        div.classList.add("card-remove");
        setTimeout(() => {
          for (let k = deck.length - 1; k >= 0; k--) {
            if (toRemove.has(deck[k])) deck.splice(k, 1);
          }
          drawCards();
          checkEnemies();
          updateHUD();
        }, 300);

        return; // importante: impede que o handler padrão remova outra carta
      }
      //♻️
      else if (card.name === "Drone de Coleta") {
        // marca as cartas a remover (por identidade)
        const toRemove = new Set();
        toRemove.add(card); // também remover a própria carta usada
        let lixoRemovido = 0;

        for (let j = 0; j < deck.length; j++) {
          const c = deck[j];
          if (c !== card && c.type === "lixo") {
            toRemove.add(c);
            lixoRemovido++;
            atualizarLixo();
            if (playerHP <= 30) {
              deck.push({ ...allCards.find(c => c.name === "Cura"), power: 3 });
            } else {
              deck.push({ ...allCards.find(c => c.name === "Ataque"), power: 6 });
            }
          }
        }

        if (lixoRemovido === 0) {
          // anima só a carta usada e remova-a normalmente
          div.classList.add("card-remove");
          setTimeout(() => {
            for (let k = deck.length - 1; k >= 0; k--) {
              if (deck[k] === card) { deck.splice(k, 1); break; }
            }
            drawCards();
            updateHUD();
          }, 300);
          return;
        }

        updateHUD();

        // anima e depois remove todas as cartas marcadas
        div.classList.add("card-remove");
        setTimeout(() => {
          for (let k = deck.length - 1; k >= 0; k--) {
            if (toRemove.has(deck[k])) deck.splice(k, 1);
          }
          drawCards();
          checkEnemies();
          updateHUD();
        }, 300);

        return; // importante: impede que o handler padrão remova outra carta
      }
      //♻️
      else if (card.name === "Defesa Reciclável") {
        const toRemove = new Set();
        toRemove.add(card);
        let lixoRemovido = 0;

        for (let j = 0; j < deck.length; j++) {
          const c = deck[j];
          if (c !== card && c.type === "lixo") {
            toRemove.add(c);
            lixoRemovido++;
            atualizarLixo();
          }
        }

        if (lixoRemovido === 0) {
          div.classList.add("card-remove");
          setTimeout(() => {
            for (let k = deck.length - 1; k >= 0; k--) {
              if (deck[k] === card) { deck.splice(k, 1); break; }
            }
            drawCards();
            updateHUD();
          }, 300);
          return;
        }

        const defesa = lixoRemovido * 5;
        playerShield += defesa;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${defesa}🛡️`, "cyan");
        updateHUD();

        div.classList.add("card-remove");
        setTimeout(() => {
          for (let k = deck.length - 1; k >= 0; k--) {
            if (toRemove.has(deck[k])) deck.splice(k, 1);
          }
          drawCards();
          updateHUD();
        }, 300);

        return;
      }
      //♻️
      else if (card.name === "Xenofluxo Reciclável") {
        const toRemove = new Set();
        toRemove.add(card);
        let lixoRemovido = 0;

        for (let j = 0; j < deck.length; j++) {
          const c = deck[j];
          if (c !== card && c.type === "lixo") {
            toRemove.add(c);
            lixoRemovido++;
            atualizarLixo();
          }
        }
        if (lixoRemovido === 0) {
          div.classList.add("card-remove");
          setTimeout(() => {
            for (let k = deck.length - 1; k >= 0; k--) {
              if (deck[k] === card) { deck.splice(k, 1); break; }
            }
            drawCards();
            updateHUD();
          }, 300);
          return;
        }

        energy += Math.floor(lixoRemovido / 2);
        glowPlayer("green");
        floatText(document.getElementById("player"), `+${lixoRemovido}🔷`, "cyan");
        updateHUD();

        div.classList.add("card-remove");
        setTimeout(() => {
          for (let k = deck.length - 1; k >= 0; k--) {
            if (toRemove.has(deck[k])) deck.splice(k, 1);
          }
          drawCards();
          updateHUD();
        }, 300);

        return;
      }
      //♻️
      else if (card.name === "Terror Critico") {
        // marca as cartas a remover (identidade)
        const toRemove = new Set();
        toRemove.add(card); // também remover a própria carta usada
        let lixoRemovido = 0;
        // percorre deck (mão) e marca lixos
        for (let j = deck.length - 1; j >= 0; j--) {
          const c = deck[j];
          if (c !== card && c.type === "lixo") {
            toRemove.add(c);
            lixoRemovido++;
            atualizarLixo();
          }
        }
        if (lixoRemovido === 0) {
          // anima só a carta usada e remova-a normalmente
          div.classList.add("card-remove");
          setTimeout(() => {
            for (let k = deck.length - 1; k >= 0; k--) {
              if (deck[k] === card) { deck.splice(k, 1); break; }
            }
            drawCards();
            updateHUD();
          }, 300);
          return;
        }
        // calcula dano agregado
        const base = card.power;
        let totalDamage = lixoRemovido * base;
        if (playerHP <= 30) totalDamage *= 2;
        // aplica dano (no primeiro inimigo) com animação
        if (enemies.length > 0) {
          animateDamage(enemies[0].el);
          enemies[0].hp -= totalDamage;
          floatText(enemies[0].el, `-${totalDamage}⚔️`, "red");
        }
        // anima a carta usada e, após a animação, remova todas as cartas marcadas
        div.classList.add("card-remove");
        setTimeout(() => {
          for (let k = deck.length - 1; k >= 0; k--) {
            if (toRemove.has(deck[k])) deck.splice(k, 1);
          }
          drawCards();
          checkEnemies();
          updateHUD();
        }, 300);
        return; // evita que o handler genérico remova outra vez
      }

      //  🗑️🗑️🗑️🗑️🗑️ LIXO 🗑️🗑️🗑️🗑️🗑️
      else if (card.name === "Entulho") {
        estatuaDeGaea();
      }
      else if (card.name === "Drone Quebrado") {
        estatuaDeGaea();
      }
      //🗑️
      else if (card.name === "Lixo quimico") {
        estatuaDeGaea();
      }
      //🗑️
      else if (card.name === "Escudo quebrado") {
        floatText(document.getElementById("player"), `+${"0"}🛡️`, "cyan");
        estatuaDeGaea();
      }
      //🗑️
      else if (card.name === "Cura Quebrada") {
        floatText(document.getElementById("player"), `+${"0"}💚`, "lime");
        estatuaDeGaea();
      }
      //🗑️
      else if (card.name === "Arma Quebrada") {
        floatText(enemies[0].el, `-${"0"}⚔️`, "red");
        estatuaDeGaea();
      }
      //🗑️
      else if (card.name === "Restos de mecha") {
        if (energy < card.cost) return;
        energy -= card.cost;
        const cartasParaAdicionar = card.power;
        const espaco = maxMao - deck.length;
        const total = Math.min(cartasParaAdicionar, espaco);
        for (let i = 0; i <= total; i++) {
          deck.push({ ...allCards.find(c => c.name === "Entulho"), power: 0 });
        }
        estatuaDeGaea();
      }
      //🗑️
      else if (card.name === "Ferro Velho") {
        if (energy < card.cost) return;
        energy -= card.cost;

        const cartasParaAdicionar = card.power;
        const espaco = maxMao - deck.length;
        const total = Math.min(cartasParaAdicionar, espaco);
        for (let i = 0; i <= total; i++) {
          deck.push({ ...allCards.find(c => c.name === "Entulho"), power: 0 });
        }
        estatuaDeGaea();
      }

      //  ❄️❄️❄️❄️❄️ FROST ❄️❄️❄️❄️❄️
      else if (card.name === "Gelo Mortal") {
        animateDamage(enemies[0].el);

        if (enemies[0].dano <= 1) {

        } else {
          if (enemies[0].tipoVida !== "🧿") {
            enemies[0].tipoDano = "❄️";
            marcarInimigos("❄️", "unico")
            enemies[0].dano = Math.max(0, enemies[0].dano - 1);
            enemies[0].behavior = () => [{ type: "attack", value: enemies[0].dano }];
          }
          floatText(enemies[0].el, `${card.power}❄️`, "blue");
        }
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
        if (hasItem(17)) {
          glacial();
        }
      }
      //❄️
      else if (card.name === "Granizo") {
        enemies.forEach(e => {
          if (e.tipoVida === "❄️") {
            dano = card.power * 2;
          } else {
            dano = card.power;
          }

          if (e.tipoVida === "🌧️") {
            marcarInimigos("❄️", "area")
          }
          animateDamage(e.el);
          e.hp -= dano;
          floatText(e.el, `-${dano}❄️`, "red");
        });
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
        if (hasItem(17)) {
          glacial();
        }
      }
      //❄️
      else if (card.name === "Granizo Mortal") {
        enemies.forEach(e => {
          if (e.tipoVida === "❄️" || e.tipoVida === "🌧️") {
            dano = card.power * 2;
          } else if (e.tipoVida === "♨️") {
            dano = card.power * 3;
          } else {
            dano = card.power;
          }

          animateDamage(e.el);
          e.hp -= dano;
          floatText(e.el, `-${dano}❄️`, "red");
        });
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
        if (hasItem(17)) {
          glacial();
        }
      }
      //❄️
      else if (card.name === "Golpe Traseiro") {
        const alvo = [...enemies].reverse().find(e => e.hp > 0);
        let dano = card.basePower;
        if (alvo.tipoVida === "❄️" || alvo.tipoVida === "🌧️") {
          dano = card.power * 2;
        } else if (alvo.tipoVida === "♨️") {
          dano = card.power * 3;
        }
        if (alvo) {
          animateDamage(alvo.el);
          alvo.hp -= dano;
          floatText(alvo.el, `-${dano}⚔️`, "red");
        }
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
        if (hasItem(17)) {
          glacial();
        }
      }
      //❄️
      else if (card.name === "Misil Termico Guiado") {
        enemies.forEach(e => {
          if (e.tipoVida === "♨️") {
            animateDamage(e.el);
            e.hp -= card.power;
            floatText(e.el, `-${card.power}❄️`, "red");
          }
        });
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
        if (hasItem(17)) {
          glacial();
        }
      }
      //❄️
      else if (card.name === "Nevasca Mortal") {
        marcarInimigos("❄️", "area")
        // percorre todos os inimigos vivos
        enemies.forEach(enemy => {
          if (!enemy || enemy.hp <= 0) return;

          animateDamage(enemy.el);

          if (enemy.dano > 1) {
            if (enemy.tipoVida !== "🧿") {
              enemy.tipoDano = "❄️";
              enemy.dano = Math.max(0, enemy.dano - 1); // reduz o dano em 1
              enemy.behavior = () => [{ type: "attack", value: enemy.dano }];
            }
            floatText(enemy.el, `${card.power}❄️`, "blue");
          }
        });
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
        if (hasItem(17)) {
          glacial();
        }
      }
      //❄️
      else if (card.name === "Marcar") {
        marcarInimigos("❄️", "unico", true)
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
        if (hasItem(17)) {
          glacial();
        }
      }
      //❄️
      else if (card.name === "Cemiterio Branco") {
        marcarInimigos("❄️", "area", true)
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
        if (hasItem(17)) {
          glacial();
        }
      }
      //❄️
      else if (card.name === "Ataque Condensado") {
        if (enemies[0].tipoVida === "❄️") {
          dano = card.power * 3;
        } else {
          dano = card.power;
        }
        animateDamage(enemies[0].el);
        enemies[0].hp -= dano;
        floatText(enemies[0].el, `-${dano}❄️`, "red");
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
        if (hasItem(17)) {
          glacial();
        }
      }
      //❄️
      else if (card.name === "Misil Condensado") {
        if (enemies[0].tipoVida === "❄️") {
          dano = card.power * 3;
        } else {
          dano = card.power;
        }
        animateDamage(enemies[0].el);
        enemies[0].hp -= dano;
        floatText(enemies[0].el, `-${dano}❄️`, "red");
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
        if (hasItem(17)) {
          glacial();
        }
      }
      //❄️
      else if (card.name === "Defesa Condensada") {
        armorGain = card.power;
        frostCount = deck.filter(c => c.type === "frost").length;
        armorGain *= frostCount;

        markedCount = enemies.filter(e => e.tipoVida === "❄️").length;
        if (markedCount > 0) {
          armorGain *= markedCount + 1;
        }

        // Aplica armadura
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${armorGain}🛡️`, "cyan");
        playerShield += armorGain;
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
        if (hasItem(17)) {
          glacial();
        }
      }
      //❄️
      else if (card.name === "Coração Frio") {
        armorGain = card.power;
        frostCount = deck.filter(c => c.type === "frost").length;
        armorGain *= frostCount;

        markedCount = enemies.filter(e => e.tipoVida === "❄️").length;
        if (markedCount > 0) {
          armorGain *= markedCount + 1;
        }

        // Aplica armadura
        glowPlayer("green");
        floatText(document.getElementById("player"), `+${armorGain}💚`, "lime");
        playerHP = Math.min(playerHP + armorGain, playerMaxHP);
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
        if (hasItem(17)) {
          glacial();
        }
      }
      //❄️
      else if (card.name === "Xenofluxo Glacial") {
        energiInimigo = enemies.filter(e => e.tipoVida === "❄️").length;
        energy += 1 * energiInimigo;

        glowPlayer("green");
        floatText(document.getElementById("player"), `+${energiInimigo}🔷`, "lime");
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
        if (hasItem(17)) {
          glacial();
        }
      }
      //❄️
      else if (card.name === "Baralho Glacial") {
        energiInimigo = enemies.filter(e => e.tipoVida === "❄️").length;

        const clonePool = playerDeck.filter(c => c.name !== "Baralho Glacial");
        const cartasParaAdicionar = energiInimigo;
        const espaco = maxMao - deck.length;
        const total = Math.min(cartasParaAdicionar, espaco) - 1;
        for (let i = 0; i <= total; i++) {
          if (clonePool.length > 0) {
            const base = clonePool[Math.floor(Math.random() * clonePool.length)];
            const newCard = {
              ...base,
              power: base.basePower ?? base.power ?? 0
            };
            deck.push(newCard);
            glowPlayer("green");
          }
        }
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
        if (hasItem(17)) {
          glacial();
        }
      }
      //  ♨️♨️♨️♨️♨️ FIRE ♨️♨️♨️♨️♨️
      else if (card.name === "Combustão") {
        marcarInimigos("♨️", "unico", true)
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
      }
      //♨️
      else if (card.name === "Chuva De Fogo") {
        marcarInimigos("♨️", "area", true)
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
      }
      //♨️
      else if (card.name === "Explosão Termica") {
        if (enemies[0].tipoVida === "⛰️") {
          dano = card.power * 3;
        } else if (enemies[0].tipoVida === "♨️") {
          dano = card.power * 2;
        } else {
          dano = card.power;
        }
        animateDamage(enemies[0].el);
        enemies[0].hp -= dano;
        floatText(enemies[0].el, `-${dano}♨️`, "red");
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
      }
      //♨️
      else if (card.name === "Ataque De Fogo") {
        if (enemies[0].tipoVida === "⛰️") {
          dano = card.power * 3;
        } else if (enemies[0].tipoVida === "♨️") {
          dano = card.power * 2;
        } else {
          dano = card.power;
        }
        animateDamage(enemies[0].el);
        enemies[0].hp -= dano;
        floatText(enemies[0].el, `-${dano}♨️`, "red");
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
      }
      //♨️
      else if (card.name === "Cauterizar") {
        if (enemies[0].tipoVida === "♨️") {
          dano = card.power * 2;
        } else {
          dano = card.power;
        }
        marcarInimigos("♨️", "unico")
        animateDamage(enemies[0].el);
        enemies[0].hp -= dano;
        floatText(enemies[0].el, `-${dano}♨️`, "red");
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
      }
      //♨️
      else if (card.name === "Lança Chamas") {
        enemies.forEach(e => {
          if (e.tipoVida === "⛰️") {
            dano = card.power * 3;
          } else if (e.tipoVida === "♨️") {
            dano = card.power * 2;
          } else {
            dano = card.power;
          }
          animateDamage(e.el);
          e.hp -= dano;
          floatText(e.el, `-${dano}♨️`, "red");
        });
        marcarInimigos("♨️", "area")
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
      }
      //  🌧️🌧️🌧️🌧️🌧️ AGUA 🌧️🌧️🌧️🌧️🌧️
      else if (card.name === "Jato De Água") {
        marcarInimigos("🌧️", "unico", true)
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
      }
      //🌧️
      else if (card.name === "Mar Denso") {
        marcarInimigos("🌧️", "area", true)
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
      }
      //🌧️
      else if (card.name === "Chuva Isolante") {
        enemies.forEach(e => {
          if (e.tipoVida === "♨️") {
            animateDamage(e.el);
            e.hp -= card.power;
            floatText(e.el, `-${card.power}🌧️`, "red");
          } else {
            floatText(e.el, `🌧️`, "red");
          }
        });
        marcarInimigos("🌧️", "area")
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
      }
      //🌧️
      else if (card.name === "Chuva Controlada") {
        enemies.forEach(e => {
          if (e.tipoVida === "♨️") {
            animateDamage(e.el);
            e.hp -= card.power;
            floatText(e.el, `-${card.power}🌧️`, "red");
          }
        });
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
      }
      //🌧️
      else if (card.name === "Chuva Corrosiva") {
        enemies.forEach(e => {
          if (e.tipoVida === "🌧️") {
            animateDamage(e.el);
            e.hp -= card.power;
            floatText(e.el, `-${card.power}🌧️`, "red");
          } else {
            floatText(e.el, `🌧️`, "red");
          }
        });
        marcarInimigos("🌧️", "area")
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
      }
      //🌧️
      else if (card.name === "Corrosão") {
        if (enemies[0].tipoVida === "🌧️") {
          animateDamage(enemies[0].el);
          enemies[0].hp -= card.power;
          floatText(enemies[0].el, `-${card.power}🌧️`, "red");
        } else {
          floatText(enemies[0].el, `🌧️`, "red");
        }
        marcarInimigos("🌧️", "unico")
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
      }
      //  ⛰️⛰️⛰️⛰️⛰️ TERRA ⛰️⛰️⛰️⛰️⛰️
      else if (card.name === "Soterrar") {
        marcarInimigos("⛰️", "unico", true)
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
      }
      //⛰️
      else if (card.name === "Arma Ancestral") {
        if (enemies[0].tipoVida === "🌧️") {
          dano = card.power * 3;
        } else {
          dano = card.power;
        }
        animateDamage(enemies[0].el);
        enemies[0].hp -= dano;
        floatText(enemies[0].el, `-${dano}⛰️`, "red");
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
      }
      //⛰️
      else if (card.name === "Brutalidade Da Terra") {
        if (enemies[0].tipoVida === "⛰️") {
          dano = card.power * 2;
        } else {
          dano = card.power;
        }
        animateDamage(enemies[0].el);
        enemies[0].hp -= dano;
        floatText(enemies[0].el, `-${dano}⛰️`, "red");
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
      }
      //⛰️
      else if (card.name === "Força De Gaea") {
        dano = Math.floor(lixoReciclado / 3);
        dano += card.power;
        if (enemies[0].tipoVida === "⛰️") {
          dano *= 2;
        }
        animateDamage(enemies[0].el);
        enemies[0].hp -= dano;
        floatText(enemies[0].el, `-${dano}⛰️`, "red");
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
      }
      //⛰️
      else if (card.name === "Tudo Virá Terra") {
        dano = Math.floor(lixoReciclado / 2);
        dano += card.power;
        if (enemies[0].tipoVida === "⛰️") {
          animateDamage(enemies[0].el);
          enemies[0].hp -= dano;
          floatText(enemies[0].el, `-${dano}⛰️`, "red");
        }
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
      }
      //⛰️
      else if (card.name === "Escudo De Gaea") {
        terraCount = deck.filter(c => c.type === "terra").length;
        aguaCount = deck.filter(c => c.type === "agua").length;

        def = (terraCount + aguaCount) * card.power;
        def += Math.floor(lixoReciclado * 0.2);

        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${def}🛡️`, "cyan");
        playerShield += def;
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
      }
      //⛰️
      else if (card.name === "Coração De Gaea") {
        terraCount = deck.filter(c => c.type === "terra").length;
        aguaCount = deck.filter(c => c.type === "agua").length;

        def = (terraCount + aguaCount) * card.power;
        def += Math.floor(lixoReciclado * 0.1);

        glowPlayer("green");
        floatText(document.getElementById("player"), `+${def}💚`, "lime");
        playerHP = Math.min(playerHP + def, playerMaxHP);
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
      }
      //⛰️
      else if (card.name === "Chuva Rochosa") {
        enemies.forEach(e => {
          if (e.tipoVida === "🌧️") {
            dano = card.power * 3;
          } else if (e.tipoVida === "⛰️") {
            dano = card.power * 2;
          } else {
            dano = card.power;
          }
          animateDamage(e.el);
          e.hp -= dano;
          floatText(e.el, `-${dano}⛰️`, "red");
        });
        marcarInimigos("⛰️", "area")
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
      }
      //⛰️
      else if (card.name === "Deslizamento") {
        marcarInimigos("⛰️", "area", true)
        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
      }
      //  ✨✨✨✨✨ CINTILANTE ✨✨✨✨✨
      else if (card.name === "Guardião") {
        if (playerHP <= 30) {
          playerShield += card.power;
          energy += 2;
          floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
          floatText(document.getElementById("player"), `+${2}🔷`, "lime");
          glowPlayer("cintilante");
        } else {
          energy += 1;
          floatText(document.getElementById("player"), `+${1}🔷`, "lime");
          glowPlayer("cintilante");
        }
      }
      //✨
      else if (card.name === "Armamento Pesado") {
        if (deck.length <= 3) {
          deck.push({ ...allCards.find(c => c.name === "Impacto Bruto"), power: 20, cost: 0 });
          deck.push({ ...allCards.find(c => c.name === "Ataque"), power: 6, cost: 0 });
          deck.push({ ...allCards.find(c => c.name === "Rajada Dupla"), power: 6, cost: 0 });
        }
      }
      //✨
      else if (card.name === "Chuva de Laminas") {
        if (energy >= 5) {
          power1 = 40;
          energy -= 5;
        } else if (energy === 4) {
          power1 = 30;
          energy -= 4;
        } else if (energy === 3) {
          power1 = 20;
          energy -= 3;
        } else if (energy === 2) {
          power1 = 15;
          energy -= 2;
        } else if (energy === 1) {
          power1 = 10;
          energy -= 1;
        } else if (energy === 0) {
          power1 = 5;
        }

        enemies.forEach(e => {
          animateDamage(e.el);
          e.hp -= power1;
          floatText(e.el, `-${power1}⚔️`, "red");
        });
      }
      //✨
      else if (card.name === "GÆPROTOCOL") {
        const power = card.basePower ?? card.power ?? 0;
        const toRemove = new Set();
        toRemove.add(card);
        // coleta somente as cartas da "mão" (o seu deck representa a mão aqui)
        const matches = [];
        for (let j = deck.length - 1; j >= 0; j--) {
          const c = deck[j];
          if (c !== card && (c.type === "lixo")) {
            matches.push(c);
            toRemove.add(c);
            atualizarLixo();
          }
        }
        if (matches.length === 0) {
          div.classList.add("card-remove");
          setTimeout(() => {
            for (let k = deck.length - 1; k >= 0; k--) {
              if (deck[k] === card) { deck.splice(k, 1); break; }
            }
            drawCards();
            updateHUD();
          }, 300);
          return;
        }

        // calcula efeitos agregados
        const totalRemoved = matches.length;
        const totalDamage = totalRemoved * power;
        const totalHeal = totalRemoved * power;
        const totalShield = totalRemoved * power;

        // aplica efeitos (um único efeito agregado)
        if (enemies.length > 0) {
          animateDamage(enemies[0].el);
          enemies[0].hp -= totalDamage;
          floatText(enemies[0].el, `-${totalDamage}⚔️`, "red");
        }
        glowPlayer("cintilante");
        playerShield += totalShield;
        playerHP = Math.min(playerHP + totalHeal, playerMaxHP);
        floatText(document.getElementById("player"), `+${totalShield}🛡️`, "cyan");
        floatText(document.getElementById("player"), `+${totalHeal}💚`, "green");

        // anima a carta usada
        div.classList.add("card-remove");

        // após animação, remova **todos** os objetos marcados de uma vez (iterando de trás p/ frente)
        setTimeout(() => {
          for (let k = deck.length - 1; k >= 0; k--) {
            if (toRemove.has(deck[k])) deck.splice(k, 1);
          }
          drawCards();
          checkEnemies();
          updateHUD();
        }, 300);

        return; // importante: evita que o handler continue e faça o splice(i,1) genérico
      }

      div.classList.add("card-remove");
      setTimeout(() => {
        deck.splice(i, 1);
        drawCards();
        checkEnemies();
      }, 300);
      updateHUD();
      updateEnemyBars();
      // caso a energia seja 0 ele skipa o turno auto
      // if (energy === 0) enemyTurn();
    };
    cards.appendChild(div);
  });
};

// MAPA
function mapaCanvas(dv, fases, caminhos, corMapa1, corMapa2, iconBoss) {
  const container = document.getElementById(dv);
  const shadow = container.attachShadow({ mode: "open" });

  // Define CSS isolado
  const style = `
  // body {
  //   margin: 0;
  //   background-image: url(../img/background/mapa.png);
  //   background-size: cover;
  //   background-position: bottom;
  //   background-repeat: no-repeat;
  //   background-attachment: fixed;
  //   padding: 10px;
  //   overflow-x: auto;
  //   color: white;
  //   font-family: sans-serif;
  //   width:100%;
  // }

  canvas {
    margin-left: 22vw;
    margin-top: 3.3%;
    width:100%;
  }

  #mapa {
    display: flex;
    gap: 100px;
    padding: 60px 40px;
    position: relative;
    width: max-content;
    align-items: center;
    height: 700px;
    margin-left: 15vw;
  }
  .coluna {
    display: flex;
    flex-direction: column;
    gap: 50px;
    justify-content: center;
    position: relative;
    height: 700px;
  }
  .nodo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    font-size: 18px;
    position: relative;
    user-select: none;
    transition: transform 0.2s, opacity 0.3s;
    z-index: 10;
    background-color: #666;
    border:solid 2px rgba(141, 235, 104, 1);
  }
  .nodo:hover { transform: scale(1.1); }
  .inimigo  { background: #d33; border: 3px groove rgba(241, 75, 75, 1); }
  .loot     { background: #fd0; border: 3px groove rgba(255, 234, 97, 1);}
  .loja     { background: #0d8; border: 3px groove rgba(102, 255, 97, 1);}
  .ferreiro { background: #fd0; border: 3px groove rgba(255, 234, 97, 1);}
  .hospital2 { background: #fd0; border: 3px groove rgba(255, 234, 97, 1);}
  .inimigo2 { background: #fd0; border: 3px groove rgba(255, 234, 97, 1);}
  .elite    { background: #a3f; border: 3px groove rgba(173, 98, 226, 1);}
  .hospital { background: #0d8; border: 3px groove rgba(102, 255, 97, 1);}
  .boss     { background: #000; border: 3px groove rgba(241, 75, 75, 1); }
  .invalido { opacity: 0; pointer-events: none; }
  .nodo.inacessivel {
    background-color: #444 !important;
    color: #999 !important;
    cursor: default;
    pointer-events: none;
    transform: none !important;
  }
  .nodo.selecionado {
    box-shadow: 0 0 10px 3px #fff;
    transform: scale(1.2);
  }
  canvas#conexoes {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 5;
  }

/* =================== DESKTOP =================== */
@media (min-width: 1941px) {
  #mapa {
    max-width: 700px;
    height: 160vh;
  }
  .coluna {
    gap: 40px;
  }
  .nodo {
    width: 8vw;
    height: 8vw;
    max-width: 45px;
    max-height: 45px;
  }
    #mapa #conexoes{
    margin-top:92px;
    }
}

  /* =================== NOTEBOOK =================== */
@media (min-width: 1025px) and (max-width: 1940px) {
  #mapa {
    max-width: 1000px;
    height: 180vh;
    margin-right: 306px;
    margin-top:54px;
  }
  .coluna {
    gap: 50px;
  }
  .nodo {
    width: 6vw;
    height: 6vw;
    max-width: 50px;
    max-height: 50px;
  }
}

/* =================== TABLET =================== */
@media (min-width: 769px) and (max-width: 1024px) {
#div1 {
  overflow-y: auto;  /* gera scroll só na vertical quando precisar */
  overflow-x: hidden;
}
  #mapa {
    height: 100vh;
    width: 100vw;
    gap: 10px;
    margin-right: -276px;
    margin-top:10px;
  }
  canvas{
  margin-top: -50px;
  transform: scale(1.0);
  }  
  .coluna {
    gap: 10px;
  }
  .nodo {
    width: 8vw;
    height: 8vw;
    max-width: 45px;
    max-height: 45px;
  }
}

/* =================== CELULAR =================== */
@media (max-width: 768px) {
  #mapa {
    height: 100vh;
    width: 100vw;
    gap: 10px;
    margin-right: -288px;
    margin-top:-20px;
  }
  canvas{
  margin-top: -78px;
  transform: scale(1.0);
  }  
  .coluna {
    gap: 10px;
  }
  .nodo {
    width: 5vw;
    height: 5vw;
    max-width: 25px;
    max-height: 25px;
  }
}
`;

  // Define HTML da interface
  shadow.innerHTML = `
  <style>${style}</style>
  <canvas id="conexoes"></canvas>
  <div id="mapa"></div>
`;


  // Começa o código JavaScript isolado no Shadow DOM
  (() => {
    const tipos = ['inimigo', 'hospital', 'ferreiro', 'elite', 'hospital2', 'inimigo2', 'loja'];
    const mapa = [];
    const numFases = fases;
    const caminhosPorFase = caminhos;
    const mapaContainer = shadow.getElementById("mapa");
    const canvas = shadow.getElementById("conexoes");
    const ctx = canvas.getContext("2d");
    let nodoAtual = null;
    let iniciado = false;

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function gerarMapa() {
      // Tipos com pesos
      const tipos = [
        { tipo: 'inimigo', peso: 55 },
        { tipo: 'elite', peso: 18 },
        { tipo: 'hospital', peso: 5 },
        { tipo: 'hospital2', peso: 6 },
        { tipo: 'inimigo2', peso: 6 },
        { tipo: 'loja', peso: 5 },
        { tipo: 'ferreiro', peso: 6 }
      ];

      // Sorteio ponderado de tipo
      function sortearTipo() {
        const totalPeso = tipos.reduce((soma, t) => soma + t.peso, 0);
        let rand = Math.random() * totalPeso;
        for (const t of tipos) {
          if (rand < t.peso) return t.tipo;
          rand -= t.peso;
        }
        return tipos[0].tipo;
      }

      // Criação da estrutura do mapa
      for (let i = 0; i < numFases; i++) {
        const coluna = [];

        for (let j = 0; j < caminhosPorFase; j++) {
          let tipo;

          // Primeira fase: início fixo no centro
          if (i === 0) {
            tipo = (j === Math.floor(caminhosPorFase / 2)) ? 'inimigo' : 'invalido';
          }
          // Última fase: boss fixo no centro
          else if (i === numFases - 1) {
            tipo = (j === Math.floor(caminhosPorFase / 2)) ? 'boss' : 'invalido';
          }
          // Penúltima fase: toda de hospital
          else if (i === numFases - 2) {
            tipo = 'hospital';
          }
          // Restante: tipos aleatórios com peso
          else {
            tipo = sortearTipo();
          }

          coluna.push({ tipo, conexoes: [] });
        }

        mapa.push(coluna);
      }

      // Conexões entre colunas
      for (let i = 0; i < numFases - 1; i++) {
        for (let j = 0; j < caminhosPorFase; j++) {
          if (mapa[i][j].tipo === 'invalido') continue;

          // Primeira fase: conecta a todos os válidos da próxima
          if (i === 0) {
            mapa[i][j].conexoes = [];
            for (let k = 0; k < caminhosPorFase; k++) {
              if (mapa[i + 1][k].tipo !== 'invalido') {
                mapa[i][j].conexoes.push(k);
              }
            }
            continue;
          }

          // Penúltima fase: conecta ao boss
          if (i === numFases - 2) {
            mapa[i][j].conexoes.push(Math.floor(caminhosPorFase / 2));
            continue;
          }

          // Conexões aleatórias entre caminhos próximos
          let possiveis = [];
          if (j > 0 && mapa[i + 1][j - 1].tipo !== 'invalido') possiveis.push(j - 1);
          if (mapa[i + 1][j].tipo !== 'invalido') possiveis.push(j);
          if (j < caminhosPorFase - 1 && mapa[i + 1][j + 1].tipo !== 'invalido') possiveis.push(j + 1);
          mapa[i][j].conexoes = shuffle(possiveis).slice(0, Math.floor(Math.random() * 2) + 1);
        }
      }

      // Garante entradas para todos os nós válidos
      for (let i = 1; i < numFases; i++) {
        for (let j = 0; j < caminhosPorFase; j++) {
          if (mapa[i][j].tipo === 'invalido') continue;
          let temEntrada = mapa[i - 1].some(n => n.conexoes.includes(j));
          if (!temEntrada) {
            let vizinhos = [j, j - 1, j + 1].filter(x => x >= 0 && x < caminhosPorFase);
            shuffle(vizinhos);
            for (let v of vizinhos) {
              if (mapa[i - 1][v].tipo !== 'invalido') {
                mapa[i - 1][v].conexoes.push(j);
                break;
              }
            }
          }
        }
      }
    }


    function desenharMapa(iconBoss) {
      mapaContainer.innerHTML = '';
      mapa.forEach((coluna, i) => {
        const colDiv = document.createElement('div');
        colDiv.classList.add('coluna');

        coluna.forEach((nodo, j) => {
          const el = document.createElement('div');
          el.classList.add('nodo', nodo.tipo);
          el.dataset.pos = `${i}-${j}`;
          el.textContent = {
            boss: iconBoss,
            inimigo: '💀',
            loja: '🪙',
            elite: '☠️',
            ferreiro: '❓',
            hospital2: '❓',
            inimigo2: '❓',
            hospital: '💚',
          }[nodo.tipo] || '';

          el.addEventListener('click', () => clicarNodo(i, j));
          colDiv.appendChild(el);
          nodo.element = el;
        });
        mapaContainer.appendChild(colDiv);
      });

      atualizarAcessibilidade();
      desenharConexoes();
    }

    function desenharConexoes() {
      const rect = mapaContainer.getBoundingClientRect();
      canvas.width = mapaContainer.scrollWidth;
      canvas.height = mapaContainer.scrollHeight;
      canvas.style.width = canvas.width + 'px';
      canvas.style.height = canvas.height + 'px';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      gradient = ctx.createLinearGradient(0, 0, 1000, 0);
      gradient.addColorStop(0, corMapa1);
      gradient.addColorStop(1, corMapa2);

      // Aplicando o gradiente como a cor do contorno
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';

      for (let i = 0; i < mapa.length - 1; i++) {
        mapa[i].forEach((nodo, j) => {
          const de = nodo.element.getBoundingClientRect();
          nodo.conexoes.forEach(k => {
            const para = mapa[i + 1][k].element.getBoundingClientRect();
            const x1 = de.left - rect.left + 20;
            const y1 = de.top - rect.top + 20;
            const x2 = para.left - rect.left + 20;
            const y2 = para.top - rect.top + 20;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          });
        });
      }
    }

    function clicarNodo(i, j) {
      const tipo = mapa[i][j].tipo;

      if (!iniciado) {
        if (i === 0 && j === Math.floor(caminhosPorFase / 2)) {
          iniciado = true;
          nodoAtual = { i, j };
          executarAcao(tipo);
          atualizarAcessibilidade();
          marcarSelecionado();
          centralizarNodo(mapa[i][j].element);
        } else {
          alert('Clique no ponto inicial para começar.');
        }
        return;
      }

      if (i === nodoAtual.i + 1 && mapa[nodoAtual.i][nodoAtual.j].conexoes.includes(j)) {
        nodoAtual = { i, j };
        executarAcao(tipo);
        atualizarAcessibilidade();
        marcarSelecionado();
        centralizarNodo(mapa[i][j].element);
      } else {
        alert('Você só pode avançar para os pontos conectados na próxima fase.');
      }
    }

    function atualizarAcessibilidade() {
      mapa.forEach((coluna, i) => {
        coluna.forEach((nodo, j) => {
          if (nodo.tipo === 'invalido') return;
          let podeClicar = false;
          if (!iniciado) {
            if (i === 0 && j === Math.floor(caminhosPorFase / 2)) podeClicar = true;
          } else {
            if (i === nodoAtual.i && j === nodoAtual.j) podeClicar = true;
            if (i === nodoAtual.i + 1 && mapa[nodoAtual.i][nodoAtual.j].conexoes.includes(j)) podeClicar = true;
          }

          if (podeClicar) {
            nodo.element.classList.remove('inacessivel');
            nodo.element.style.pointerEvents = "auto";
            nodo.element.style.opacity = "1";
          } else {
            nodo.element.classList.add('inacessivel');
            nodo.element.style.pointerEvents = "none";
            nodo.element.style.opacity = "0.85";
          }
        });
      });
    }

    function marcarSelecionado() {
      mapa.forEach(coluna => {
        coluna.forEach(nodo => nodo.element.classList.remove('selecionado'));
      });
      if (nodoAtual) {
        mapa[nodoAtual.i][nodoAtual.j].element.classList.add('selecionado');
      }
    }

    function centralizarNodo(el) {
      const rect = el.getBoundingClientRect();
      const contRect = mapaContainer.getBoundingClientRect();
      const scrollX = rect.left - contRect.left + mapaContainer.scrollLeft - contRect.width / 2 + rect.width / 2;
      mapaContainer.scrollTo({ left: scrollX, behavior: "smooth" });
    }

    function executarAcao(tipo) {
      switch (tipo) {
        case 'inimigo':
        case 'inimigo2':
        case 'elite':
        case 'boss':
          document.getElementById("enemies").style.display = "flex";
          document.getElementById("lifeBarsContainer").style.display = "flex";
          mostrarTela(3); // Tela de luta (div3)
          // window.location.href = "batalha.html";
          spawnEnemies(tipo);
          drawNewCards();
          drawCards();
          updateHUD();
          tipoFase = tipo;
          if (tipo == 'boss') {
            dinheiro += 20;
            dinheiro += Math.floor(mapaBatalha / 3);
          } else if (tipo == 'elite' || tipo == 'inimigo2') {
            dinheiro += 10;
            dinheiro += Math.floor(mapaBatalha / 3);
          } else if (tipo == 'inimigo') {
            dinheiro += 5;
            dinheiro += Math.floor(mapaBatalha / 3);
          }

          break;

        case 'loja':
          mostrarTela(4); // Tela da loja (div4)
          abrirLoja()
          tipoFase = tipo;
          break;

        case 'ferreiro':
          mostrarTela(6);
          tipoFase = tipo;
          break;

        case 'hospital':
        case 'hospital2':
          mostrarTela(5); // Tela do hospital (div5)
          tipoFase = tipo;
          break;

        default:
          alert('Tipo de sala não reconhecido.');
      }

      mapaBatalha++
      const fundos = {
        4: "luta3.png",

        8: "lutaMapa2.png",
        11: "lutaMapa22.jpg",
        14: "lutaMapa333.jpg",

        15: "lutaMapa3.png",
        18: "lutaMapa33.jpg",

        19: "lutaMapa4.jpg",
        22: "lutaMapa44.jpg",

        29: "lutaMapa5.jpg",
        32: "lutaMapa55.jpg"
      };

      if (mapaBatalha == 19 && personagemSelecionado == "lilia") {
        criarPlayerNaDiv3()
      } else if (mapaBatalha == 11 && personagemSelecionado == "lilia") {
        criarPlayerNaDiv3()
      }

      const imagem = fundos[mapaBatalha];
      if (imagem) {
        document.getElementById("jogo").style.backgroundImage = `url('../img/jogo/background/${imagem}')`;
      }
    }

    gerarMapa();
    desenharMapa(iconBoss);
  })();
}

// SHOOP
function abrirLoja() {
  const lojaDiv = document.getElementById("div4");
  if (!lojaDiv) return;

  lojaDiv.innerHTML = ""; // limpa
  const lojaContainer = document.createElement("div");
  lojaContainer.classList.add("loja-principal");
  lojaDiv.appendChild(lojaContainer);

  const esquerda = document.createElement("div");
  esquerda.classList.add("loja-esquerda");

  const imgInv = document.createElement("img");
  imgInv.src = "./../img/jogo/background/comerciante.png";
  imgInv.alt = "Inventário";
  imgInv.classList.add("imgInventario");
  esquerda.appendChild(imgInv);

  const btnVoltar = document.createElement("button");
  btnVoltar.textContent = "Voltar para o mapa";
  btnVoltar.id = "lojaUm";
  btnVoltar.addEventListener("click", () => {
    if (typeof irParaDiv2 === "function") irParaDiv2();
  });
  esquerda.appendChild(btnVoltar);

  // 🧹 botão para remover carta do deck
  const btnRemoverCarta = document.createElement("button");
  btnRemoverCarta.textContent = "Remover uma carta (10🪙)";
  btnRemoverCarta.id = "btnRemoverCarta";
  esquerda.appendChild(btnRemoverCarta);

  // verifica se pode remover
  const podeRemover = Array.isArray(playerDeck) && playerDeck.length > 10;

  if (!podeRemover) {
    btnRemoverCarta.disabled = true;
    btnRemoverCarta.style.opacity = "0.6";
    btnRemoverCarta.style.cursor = "not-allowed";
  } else {
    btnRemoverCarta.addEventListener("click", () => {
      if (dinheiro < 10) {
        if (typeof floatText === "function")
          floatText(btnRemoverCarta, "Dinheiro insuficiente!", "red");
        return;
      }

      // cria popup
      const popup = document.createElement("div");
      popup.classList.add("popup-remover-carta");

      // botão cancelar (em cima)
      const cancelarTopo = document.createElement("button");
      cancelarTopo.textContent = "Cancelar";
      cancelarTopo.addEventListener("click", () => popup.remove());
      popup.appendChild(cancelarTopo);

      playerDeck.forEach((carta, i) => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card", carta.rarity ?? "common");
        if (carta.type) cardDiv.classList.add(carta.type);
        cardDiv.style.margin = "10px";
        cardDiv.style.cursor = "pointer";

        if (carta.img) {
          const img = document.createElement("img");
          img.src = carta.img;
          cardDiv.appendChild(img);
        }

        const nome = document.createElement("div");
        nome.classList.add("titulo");
        nome.textContent = carta.name;
        cardDiv.appendChild(nome);

        const desc = document.createElement("div");
        desc.classList.add("desc");
        desc.innerHTML = carta.desc ?? "";
        cardDiv.appendChild(desc);

        // clique na carta
        cardDiv.addEventListener("click", () => {
          if (playerDeck.length <= 10) {
            if (typeof floatText === "function")
              floatText(cardDiv, "Você não pode ter menos de 10 cartas!", "red");
            return;
          }

          playerDeck.splice(i, 1);
          dinheiro -= 10;
          atualizarDinheiro();
          popup.remove();
          if (typeof floatText === "function") floatText(lojaDiv, "-10🪙", "yellow");
        });

        popup.appendChild(cardDiv);
      });

      // botão cancelar (em baixo)
      const cancelarBaixo = document.createElement("button");
      cancelarBaixo.textContent = "Cancelar";
      cancelarBaixo.addEventListener("click", () => popup.remove());
      popup.appendChild(cancelarBaixo);

      lojaDiv.appendChild(popup);
    });
  }

  // lado direito
  const direita = document.createElement("div");
  direita.classList.add("loja-direita");

  const titulo = document.createElement("h1");
  titulo.classList.add("dinheiroAtual");
  direita.appendChild(titulo);

  const containerCartas = document.createElement("div");
  containerCartas.classList.add("loja-container");
  direita.appendChild(containerCartas);

  lojaContainer.appendChild(esquerda);
  lojaContainer.appendChild(direita);

  atualizarDinheiro();

  // cartas à venda
  const opcoes = [];
  const max = Math.min(10, allCards?.length || 0);
  while (opcoes.length < max) {
    const carta = allCards[Math.floor(Math.random() * allCards.length)];
    if (!opcoes.includes(carta)) opcoes.push(carta);
  }

  opcoes.forEach(carta => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("itemLoja");

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", carta.rarity ?? "common");
    if (carta.type) cardDiv.classList.add(carta.type);

    if (carta.img) {
      const img = document.createElement("img");
      img.src = carta.img;
      cardDiv.appendChild(img);
    }

    const nome = document.createElement("div");
    nome.classList.add("titulo");
    nome.textContent = carta.name;
    cardDiv.appendChild(nome);

    const custo = document.createElement("div");
    custo.classList.add("energia");
    custo.textContent = carta.cost ?? 0;
    cardDiv.appendChild(custo);

    const desc = document.createElement("div");
    desc.classList.add("desc");
    desc.innerHTML = carta.desc ?? "";
    cardDiv.appendChild(desc);

    let preco = 10;
    const rar = carta.rarity?.toLowerCase() ?? "common";
    const tipo = carta.type?.toLowerCase() ?? "";
    if (rar === "rare") preco = 14;
    else if (rar === "epic") preco = 22;
    else if (rar === "legend") preco = 30;
    else if (rar === "cintilante") preco = 50;
    else if (["fire", "agua", "terra", "frost"].includes(tipo)) preco = 16;

    const precoDiv = document.createElement("div");
    precoDiv.classList.add("precoCarta");
    precoDiv.textContent = `💰 ${preco}`;

    cardDiv.addEventListener("click", (ev) => {
      ev.stopPropagation();
      if (dinheiro >= preco) {
        dinheiro -= preco;
        atualizarDinheiro();
        if (!Array.isArray(playerDeck)) playerDeck = [];
        playerDeck.push({ ...carta });
        itemDiv.remove();
        if (typeof floatText === "function") floatText(containerCartas, `-${preco}🪙`, "red");
      } else {
        if (typeof floatText === "function") floatText(cardDiv, "Dinheiro insuficiente!", "red");
      }
    });

    itemDiv.appendChild(cardDiv);
    itemDiv.appendChild(precoDiv);
    containerCartas.appendChild(itemDiv);
  });
};

// EVENTS
function curaVida() {
  playerHP = Math.min(playerHP + 40, playerMaxHP);
};
function curaSacre() {
  if (playerMaxHP <= 10) {
    playerMaxHP = 10;
    updateHUD();
  } else {
    playerMaxHP -= 10;
  }
  playerHP = Math.min(playerHP + playerMaxHP, playerMaxHP);
  updateHUD();
};
function aumentaVida() {
  playerMaxHP += 10;
  updateHUD();
};
function aumentaSacre() {
  playerMaxHP += 30;
  if (playerHP <= 50) {
    playerHP = 1;
  } else {
    playerHP -= 50;
  }
  updateHUD();
};
function armaduraUp() {
  playerShieldInit += 2;
  updateHUD();
};
function armaduraSacre() {
  playerShieldInit += 15;
  if (playerMaxHP <= 50) {
    playerMaxHP = 10;
  } else {
    playerMaxHP -= 50;
    playerMaxHP = Math.max(playerMaxHP, 10);
  }
  if (playerHp > playerMaxHP) {
    playerHp = playerMaxHP;
  }
  updateHUD();
};

// PLAYER
function criarPlayerNaDiv3() {
  if (!personagemSelecionado) return; // nenhum personagem selecionado

  const div3 = document.getElementById("player-area");

  // Remove a imagem antiga, se existir
  const imgExistente = document.getElementById("player");
  if (imgExistente) div3.removeChild(imgExistente);

  // Cria nova imagem
  const playerImg = document.createElement("img");
  playerImg.id = "player";


  // Escolhe status baseado no personagem
  switch (personagemSelecionado) {
    case "laranja":
      playerImg.src = "./../img/jogo/player/corredor.png";
      playerMaxHP = 70, energyMax = 3, playerShieldInit = 0;
      playerHP = 70, energy = 3, playerShield = playerShieldInit;
      playerDeck = [...characterDecks.laranja];
      maoInicio = 6;
      limiteMao = 6;
      break;
    case "cleber":
      playerImg.src = "./../img/jogo/player/cleber.png";
      playerMaxHP = 160, energyMax = 3, playerShieldInit = 5;
      playerHP = 160, energy = 3, playerShield = playerShieldInit;
      playerDeck = [...characterDecks.cleber];
      maoInicio = 5;
      limiteMao = 5;
      break;
    case "malaquias":
      playerImg.src = "./../img/jogo/player/malaquias.png";
      playerMaxHP = 78, energyMax = 6, playerShieldInit = 0;
      playerHP = 78, energy = 6, playerShield = playerShieldInit;
      playerDeck = [...characterDecks.malaquias];
      maoInicio = 3;
      limiteMao = 3;
      break;
    case "renata":
      playerImg.src = "./../img/jogo/player/renata.png";
      playerMaxHP = 50, energyMax = 3, playerShieldInit = 0;
      playerHP = 50, energy = 3, playerShield = playerShieldInit;
      playerDeck = [...characterDecks.renata];
      maoInicio = 6;
      limiteMao = 6;
      break;
    case "marcos":
      playerImg.src = "./../img/jogo/player/marcos.png";
      playerMaxHP = 120, energyMax = 3, playerShieldInit = 0;
      playerHP = 120, energy = 3, playerShield = playerShieldInit;
      playerDeck = [...characterDecks.marcos];
      maoInicio = 5;
      limiteMao = 5;
      break;
    case "cleide":
      playerImg.src = "./../img/jogo/player/cleide.png";
      playerMaxHP = 100, energyMax = 3, playerShieldInit = 0;
      playerHP = 100, energy = 3, playerShield = playerShieldInit;
      playerDeck = [...characterDecks.cleide];
      maoInicio = 7;
      limiteMao = 7;
      break;
    case "magna":
      playerImg.src = "./../img/jogo/player/magna.png";
      playerMaxHP = 128, energyMax = 4, playerShieldInit = 0;
      playerHP = 128, energy = 4, playerShield = playerShieldInit;
      playerDeck = [...characterDecks.magna];
      maoInicio = 5;
      limiteMao = 5;
      break;
    case "lucius":
      playerImg.src = "./../img/jogo/player/lucius.png";
      playerMaxHP = 100, energyMax = 3, playerShieldInit = 0;
      playerHP = 100, energy = 3, playerShield = playerShieldInit;
      playerDeck = [...characterDecks.lucius];
      maoInicio = 5;
      limiteMao = 5;
      break;
    case "azul":
      playerImg.src = "./../img/jogo/player/tank.png";
      playerMaxHP = 130, energyMax = 3, playerShieldInit = 5;
      playerHP = 130, energy = 3, playerShield = playerShieldInit;
      playerDeck = [...characterDecks.azul];
      break;
    case "amarelo":
      playerImg.src = "./../img/jogo/player/mineiro.png";
      playerDeck = [...characterDecks.amarelo];
      break;
    case "celso":
      playerImg.src = "./../img/jogo/player/celso.png";
      playerMaxHP = 75, playerHP = 75, energyMax = 4, energy = 4;
      playerDeck = [...characterDecks.celso];
      break;
    case "felipe":
      playerImg.src = "./../img/jogo/player/felipe.png";
      playerMaxHP = 130, playerHP = 130, playerShieldInit = 5
      playerDeck = [...characterDecks.felipe];
      break;
    case "maria":
      playerImg.src = "./../img/jogo/player/maria.png";
      playerMaxHP = 110, playerHP = 110;
      maoInicio = 7;
      limiteMao = 7;
      playerDeck = [...characterDecks.maria];
      break;
    case "verde":
      playerImg.src = "./../img/jogo/player/jao.png";
      playerDeck = [...characterDecks.verde];
      maoInicio = 6;
      limiteMao = 6;
      break;
    case "magnolia":
      playerImg.src = "./../img/jogo/player/magnolia.png";
      playerDeck = [...characterDecks.magnolia];
      playerMaxHP = 120, playerHP = 120, energyMax = 4, energy = 4;
      maoInicio = 6;
      limiteMao = 6;
      break;
    case "vermelho":
      playerImg.src = "./../img/jogo/player/mechaBeserck.png";
      playerMaxHP = 50, energyMax = 4, playerShieldInit = 0;
      playerHP = 50, energy = 4, playerShield = playerShieldInit;
      playerDeck = [...characterDecks.vermelho];
      maoInicio = 6;
      limiteMao = 6;
      break;
    case "roxo":
      playerImg.src = "./../img/jogo/player/cabaDosDrones.png";
      playerMaxHP = 60, energyMax = 5, playerShieldInit = 0;
      playerHP = 60, energy = 5, playerShield = playerShieldInit;
      maoInicio = 7;
      limiteMao = 7;
      playerDeck = [...characterDecks.roxo];
      break;
    case "porto":
      playerImg.src = "./../img/jogo/player/autoridadeDoPorto.png";
      playerMaxHP = 110, energyMax = 3, playerShieldInit = 5;
      playerHP = 110, energy = 3, playerShield = playerShieldInit;
      playerDeck = [...characterDecks.porto];
      maoInicio = 5;
      limiteMao = 5;
      break;
    case "fergus":
      playerImg.src = "./../img/jogo/player/fergus.png";
      playerMaxHP = 145, energyMax = 3, playerShieldInit = 0;
      playerHP = 145, energy = 3, playerShield = playerShieldInit;
      playerDeck = [...characterDecks.fergus];
      maoInicio = 5;
      limiteMao = 5;
      break;
    case "mercuri":
      playerImg.src = "./../img/jogo/player/mercuri.png";
      playerMaxHP = 100, energyMax = 3, playerShieldInit = 0;
      playerHP = 100, energy = 3, playerShield = playerShieldInit;
      playerDeck = [...characterDecks.mercuri];
      maoInicio = 5;
      limiteMao = 5;
      break;
    case "lilia":
      if (mapaBatalha == 0) {
        playerDeck = [...characterDecks.lilia];
        imgLilia = "./../img/jogo/player/lilia1.png"
        playerMaxHP = 60, energyMax = 2, energy = 2;
        playerHP = 60;
        maoInicio = 4;
        limiteMao = 4;
      }
      if (mapaBatalha == 19) {
        imgLilia = "./../img/jogo/player/lilia3.png";
        playerMaxHP += 80;
        energyMax += 3;
        energy += 3;
        maoInicio += 4;
        limiteMao += 4;
        playerShieldInit += 15;
        playerShield = playerShieldInit;
      } else if (mapaBatalha == 11) {
        imgLilia = "./../img/jogo/player/lilia2.png";
        playerMaxHP += 20;
        energyMax += 2;
        energy += 2;
        maoInicio += 2;
        limiteMao += 2;
      }

      updateHUD();
      drawNewCards();
      drawCards();
      playerImg.src = imgLilia;
      break;
    case "ferrus":
      playerImg.src = "./../img/jogo/player/sal2.png";
      playerMaxHP = 160, energyMax = 3, playerShieldInit = 0;
      playerHP = 80, energy = 3, playerShield = playerShieldInit;
      dinheiro = 50;
      atualizarDinheiro()
      playerDeck = [...characterDecks.ferrus];
      break;
    case "tomoeh":
      playerImg.src = "./../img/jogo/player/sombra.png";
      playerMaxHP = 30, energyMax = 6, playerShieldInit = 0;
      playerHP = 30, energy = 6, playerShield = playerShieldInit;
      playerDeck = [...characterDecks.tomoeh];
      maoInicio = 9;
      limiteMao = 9;
      break;
    case "x":
      playerImg.src = "./../img/jogo/player/x.png";
      playerMaxHP = 200, energyMax = 3, playerShieldInit = 2;
      playerHP = 100, energy = 3, playerShield = playerShieldInit;
      playerDeck = [...characterDecks.x];
      maoInicio = 4;
      limiteMao = 4;
      break;
    case "wallace":
      playerImg.src = "./../img/jogo/player/wallace.png";
      playerMaxHP = 100, energyMax = 4, playerShieldInit = 0;
      playerHP = 100, energy = 4, playerShield = playerShieldInit;
      dinheiro = 100;
      atualizarDinheiro();
      playerDeck = [...characterDecks.wallace];
      break;
    case "gaeaReen":
      playerImg.src = "./../img/jogo/player/kalenart.png";
      playerDeck = [...characterDecks.gaeaReen];
      playerHP = 120, playerMaxHP = 120
      energyMax = 4
      energy = 4
      maoInicio = 6;
      limiteMao = 6;
      break;
    case "olaf":
      playerImg.src = "./../img/jogo/player/olaf.png";
      playerMaxHP = 150, energyMax = 3, playerShieldInit = 5;
      playerHP = 150, energy = 3, playerShield = playerShieldInit;
      playerDeck = [...characterDecks.olaf];
      break;
    case "olga":
      playerImg.src = "./../img/jogo/player/olga.png";

      playerDeck = [...characterDecks.olga];
      break;
    case "glacia":
      playerImg.src = "./../img/jogo/player/glacia.png";
      playerMaxHP = 80, playerHP = 80, energyMax = 4, energy = 4;
      maoInicio = 8;
      limiteMao = 8;
      playerDeck = [...characterDecks.glacia];
      break;
    default:
      playerImg.src = "./../img/jogo/extra/prototipo.png";
      playerDeck = [...characterDecks.amarelo];
      break;
  }

  playerImg.alt = "Jogador";

  // Insere como primeiro elemento da div3
  div3.insertBefore(playerImg, div3.firstChild);
};
// ARREY PLAYER DECK
const characterDecks = {
  laranja: [
    allCards.find(c => c.name === "Defesa"),
    allCards.find(c => c.name === "Defesa"),
    allCards.find(c => c.name === "Destruir Carta"),
    allCards.find(c => c.name === "Chuva De Fragmentos"),
    allCards.find(c => c.name === "Chuva De Fragmentos"),
    allCards.find(c => c.name === "Impulso Defensivo"),
    allCards.find(c => c.name === "Impulso Defensivo"),
    allCards.find(c => c.name === "Rajada Dupla"),
    allCards.find(c => c.name === "Rajada Dupla"),
    allCards.find(c => c.name === "Rajada Dupla"),
    allCards.find(c => c.name === "Rajada Dupla"),
    allCards.find(c => c.name === "Rajada Dupla"),
  ],
  cleber: [
    allCards.find(c => c.name === "Sistema de reflexão"),
    allCards.find(c => c.name === "Sistema de reflexão"),
    allCards.find(c => c.name === "Sistema de reflexão"),
    allCards.find(c => c.name === "Impulso Defensivo"),
    allCards.find(c => c.name === "Impulso Defensivo"),
    allCards.find(c => c.name === "Escudo Retaliante"),
    allCards.find(c => c.name === "Brilhando"),
    allCards.find(c => c.name === "Brilhando"),
    allCards.find(c => c.name === "Brilhando"),
    allCards.find(c => c.name === "Indestrutivel"),
    allCards.find(c => c.name === "Destruir Carta"),
  ],
  malaquias: [
    allCards.find(c => c.name === "Liderança"),
    allCards.find(c => c.name === "Furia"),
    allCards.find(c => c.name === "Artilharia Anti Sniper"),
    allCards.find(c => c.name === "Compra Dupla"),
    allCards.find(c => c.name === "Compra Dupla"),
    allCards.find(c => c.name === "Compra Dupla"),
    allCards.find(c => c.name === "Compra Dupla"),
    allCards.find(c => c.name === "Compra Dupla"),
    allCards.find(c => c.name === "Estratégia"),
    allCards.find(c => c.name === "Estratégia"),
    allCards.find(c => c.name === "Estratégia"),
    allCards.find(c => c.name === "Armamento Pesado"),
  ],
  renata: [
    allCards.find(c => c.name === "Sob-Vigia"),
    allCards.find(c => c.name === "Estratégia"),
    allCards.find(c => c.name === "Mineração"),
    allCards.find(c => c.name === "Xenofluxo"),
    allCards.find(c => c.name === "Xenofluxo"),
    allCards.find(c => c.name === "Xenofluxo"),
    allCards.find(c => c.name === "Impulso"),
    allCards.find(c => c.name === "Impulso Defensivo"),
    allCards.find(c => c.name === "Impulso Defensivo"),
    allCards.find(c => c.name === "Chuva de Laminas"),
    allCards.find(c => c.name === "Chuva de Laminas"),
    allCards.find(c => c.name === "Guardião"),
  ],
  marcos: [
    allCards.find(c => c.name === "Jato De Água"),
    allCards.find(c => c.name === "Chuva Isolante"),
    allCards.find(c => c.name === "Chuva Controlada"),
    allCards.find(c => c.name === "Combustão"),
    allCards.find(c => c.name === "Chuva De Fogo"),
    allCards.find(c => c.name === "Lança Chamas"),
    allCards.find(c => c.name === "Destruir Carta"),
    allCards.find(c => c.name === "Defesa"),
    allCards.find(c => c.name === "Defesa"),
    allCards.find(c => c.name === "Defesa"),
    allCards.find(c => c.name === "Rajada Dupla"),
    allCards.find(c => c.name === "Rajada Dupla"),
  ],
  cleide: [
    allCards.find(c => c.name === "Chuva Rochosa"),
    allCards.find(c => c.name === "Brutalidade Da Terra"),
    allCards.find(c => c.name === "Arma Ancestral"),
    allCards.find(c => c.name === "Chuva Isolante"),
    allCards.find(c => c.name === "Chuva Controlada"),
    allCards.find(c => c.name === "Chuva Corrosiva"),
    allCards.find(c => c.name === "Lança Chamas"),
    allCards.find(c => c.name === "Explosão Termica"),
    allCards.find(c => c.name === "Cauterizar"),
    allCards.find(c => c.name === "Nevasca Mortal"),
    allCards.find(c => c.name === "Baralho Glacial"),
    allCards.find(c => c.name === "Xenofluxo Glacial"),
  ],
  magna: [
    allCards.find(c => c.name === "Chuva De Fragmentos"),
    allCards.find(c => c.name === "Chuva De Fragmentos"),
    allCards.find(c => c.name === "Explosão"),
    allCards.find(c => c.name === "Explosão"),
    allCards.find(c => c.name === "Fogo Amigo"),
    allCards.find(c => c.name === "Chuva de Laminas"),
    allCards.find(c => c.name === "Lança Chamas"),
    allCards.find(c => c.name === "Lança Chamas"),
    allCards.find(c => c.name === "Chuva Controlada"),
    allCards.find(c => c.name === "Chuva Controlada"),
    allCards.find(c => c.name === "Chuva Isolante"),
    allCards.find(c => c.name === "Chuva Isolante"),
  ],
  lucius: [
    allCards.find(c => c.name === "Vingativo"),
    allCards.find(c => c.name === "Ceifa"),
    allCards.find(c => c.name === "Ceifa"),
    allCards.find(c => c.name === "Ceifa"),
    allCards.find(c => c.name === "Tsunami"),
    allCards.find(c => c.name === "Blindagem Vital"),
    allCards.find(c => c.name === "Defesa Salvadora"),
    allCards.find(c => c.name === "Brilhando"),
    allCards.find(c => c.name === "Recicladora"),
    allCards.find(c => c.name === "Terror Critico"),
    allCards.find(c => c.name === "Mineração"),
    allCards.find(c => c.name === "Estratégia"),
  ],
  azul: [
    allCards.find(c => c.name === "Sistema de reflexão"),
    allCards.find(c => c.name === "Sistema de reflexão"),
    allCards.find(c => c.name === "Sistema de reflexão"),
    allCards.find(c => c.name === "Escudo Retaliante"),
    allCards.find(c => c.name === "Escudo Retaliante"),
    allCards.find(c => c.name === "Escudo Retaliante"),
    allCards.find(c => c.name === "Em guarda"),
    allCards.find(c => c.name === "Em guarda"),
    allCards.find(c => c.name === "Em guarda"),
    allCards.find(c => c.name === "Indestrutivel"),
    allCards.find(c => c.name === "Destruir Carta"),
  ],
  amarelo: [
    allCards.find(c => c.name === "Destruir Carta"),
    allCards.find(c => c.name === "Mineração"),
    allCards.find(c => c.name === "Deslizamento"),
    allCards.find(c => c.name === "Soterrar"),
    allCards.find(c => c.name === "Arma Ancestral"),
    allCards.find(c => c.name === "Arma Ancestral"),
    allCards.find(c => c.name === "Arma Ancestral"),
    allCards.find(c => c.name === "Escudo De Gaea"),
    allCards.find(c => c.name === "Escudo De Gaea"),
    allCards.find(c => c.name === "Escudo De Gaea"),
    allCards.find(c => c.name === "Coração De Gaea"),
    allCards.find(c => c.name === "Mar Denso"),
  ],
  celso: [
    allCards.find(c => c.name === "Destruir Carta"),
    allCards.find(c => c.name === "Mineração"),
    allCards.find(c => c.name === "Deslizamento"),
    allCards.find(c => c.name === "Soterrar"),
    allCards.find(c => c.name === "Chuva Rochosa"),
    allCards.find(c => c.name === "Chuva Rochosa"),
    allCards.find(c => c.name === "Chuva Rochosa"),
    allCards.find(c => c.name === "Tudo Virá Terra"),
    allCards.find(c => c.name === "Defesa"),
    allCards.find(c => c.name === "Defesa"),
    allCards.find(c => c.name === "Defesa"),
    allCards.find(c => c.name === "Defesa"),
  ],
  felipe: [
    allCards.find(c => c.name === "Destruir Carta"),
    allCards.find(c => c.name === "Mineração"),
    allCards.find(c => c.name === "Deslizamento"),
    allCards.find(c => c.name === "Soterrar"),
    allCards.find(c => c.name === "Ataque"),
    allCards.find(c => c.name === "Ataque"),
    allCards.find(c => c.name === "Ataque"),
    allCards.find(c => c.name === "Ataque"),
    allCards.find(c => c.name === "Escudo De Gaea"),
    allCards.find(c => c.name === "Escudo De Gaea"),
    allCards.find(c => c.name === "Escudo De Gaea"),
    allCards.find(c => c.name === "Coração De Gaea"),
  ],
  maria: [
    allCards.find(c => c.name === "Destruir Carta"),
    allCards.find(c => c.name === "Mineração"),
    allCards.find(c => c.name === "Deslizamento"),
    allCards.find(c => c.name === "Soterrar"),
    allCards.find(c => c.name === "Ataque"),
    allCards.find(c => c.name === "Ataque"),
    allCards.find(c => c.name === "Ataque Reciclável"),
    allCards.find(c => c.name === "Força De Gaea"),
    allCards.find(c => c.name === "Defesa"),
    allCards.find(c => c.name === "Defesa"),
    allCards.find(c => c.name === "Defesa Reciclável"),
    allCards.find(c => c.name === "Escudo De Gaea"),
  ],
  verde: [
    allCards.find(c => c.name === "Ataque"),
    allCards.find(c => c.name === "Ataque"),
    allCards.find(c => c.name === "Liderança"),
    allCards.find(c => c.name === "Liderança"),
    allCards.find(c => c.name === "Chuva De Fragmentos"),
    allCards.find(c => c.name === "Cura"),
    allCards.find(c => c.name === "Escudo"),
    allCards.find(c => c.name === "Defesa"),
    allCards.find(c => c.name === "Defesa"),
    allCards.find(c => c.name === "Defesa"),
    allCards.find(c => c.name === "Ataque Reciclável"),
    allCards.find(c => c.name === "Destruir Carta"),
  ],
  magnolia: [
    allCards.find(c => c.name === "Soterrar"),
    allCards.find(c => c.name === "Deslizamento"),
    allCards.find(c => c.name === "Arma Ancestral"),
    allCards.find(c => c.name === "Arma Ancestral"),
    allCards.find(c => c.name === "Arma Ancestral"),
    allCards.find(c => c.name === "Liderança"),
    allCards.find(c => c.name === "Chuva Rochosa"),
    allCards.find(c => c.name === "Cura"),
    allCards.find(c => c.name === "Escudo"),
    allCards.find(c => c.name === "Defesa"),
    allCards.find(c => c.name === "Jato De Água"),
    allCards.find(c => c.name === "Destruir Carta"),
  ],
  vermelho: [
    allCards.find(c => c.name === "Sobre Carga"),
    allCards.find(c => c.name === "Sobre Carga"),
    allCards.find(c => c.name === "Rebeldia"),
    allCards.find(c => c.name === "Rebeldia"),
    allCards.find(c => c.name === "Rebeldia"),
    allCards.find(c => c.name === "Explosão"),
    allCards.find(c => c.name === "Chuva De Fragmentos"),
    allCards.find(c => c.name === "Chuva De Fragmentos"),
    allCards.find(c => c.name === "Fogo Amigo"),
    allCards.find(c => c.name === "Fogo Amigo"),
    allCards.find(c => c.name === "Beserck"),
    allCards.find(c => c.name === "Destruir Carta"),
  ],
  roxo: [
    allCards.find(c => c.name === "Drone de Ataque"),
    allCards.find(c => c.name === "Drone de Ataque"),
    allCards.find(c => c.name === "Drone de Ataque"),
    allCards.find(c => c.name === "Drone Defensivo"),
    allCards.find(c => c.name === "Drone Defensivo"),
    allCards.find(c => c.name === "Drone Defensivo"),
    allCards.find(c => c.name === "Drone de Coleta"),
    allCards.find(c => c.name === "Drone de Coleta"),
    allCards.find(c => c.name === "Drone Médico"),
    allCards.find(c => c.name === "Drone Médico"),
    allCards.find(c => c.name === "PROTOCOL-Campo De Força"),
    allCards.find(c => c.name === "Destruir Carta"),
  ],
  porto: [
    allCards.find(c => c.name === "Destruir Carta"),
    allCards.find(c => c.name === "Arpão"),
    allCards.find(c => c.name === "Arpão"),
    allCards.find(c => c.name === "Arpão"),
    allCards.find(c => c.name === "Arpão"),
    allCards.find(c => c.name === "Arpão"),
    allCards.find(c => c.name === "Impulso Defensivo"),
    allCards.find(c => c.name === "Mar Denso"),
    allCards.find(c => c.name === "Jato De Água"),
    allCards.find(c => c.name === "Chuva Isolante"),
    allCards.find(c => c.name === "Chuva Corrosiva"),
    allCards.find(c => c.name === "Corrosão"),
  ],
  fergus: [
    allCards.find(c => c.name === "Destruir Carta"),
    allCards.find(c => c.name === "Arpão"),
    allCards.find(c => c.name === "Arpão"),
    allCards.find(c => c.name === "Arpão"),
    allCards.find(c => c.name === "Arpão"),
    allCards.find(c => c.name === "Arpão"),
    allCards.find(c => c.name === "Impulso Defensivo"),
    allCards.find(c => c.name === "Broca Perfurante"),
    allCards.find(c => c.name === "Ceifa"),
    allCards.find(c => c.name === "Desprezo"),
    allCards.find(c => c.name === "Drone de Ataque"),
    allCards.find(c => c.name === "Artilharia Anti Sniper"),
  ],
  mercuri: [
    allCards.find(c => c.name === "Arpão"),
    allCards.find(c => c.name === "Arpão"),
    allCards.find(c => c.name === "Arpão"),
    allCards.find(c => c.name === "Arpão"),
    allCards.find(c => c.name === "Arpão"),
    allCards.find(c => c.name === "Arpão"),
    allCards.find(c => c.name === "Arpão"),
    allCards.find(c => c.name === "Impulso Defensivo"),
    allCards.find(c => c.name === "Defesa"),
    allCards.find(c => c.name === "Sistema de reflexão"),
    allCards.find(c => c.name === "Sistema de reflexão"),
    allCards.find(c => c.name === "Destruir Carta"),
  ],
  ferrus: [
    allCards.find(c => c.name === "Terror Critico"),
    allCards.find(c => c.name === "Ataque Reciclável"),
    allCards.find(c => c.name === "Recicladora"),
    allCards.find(c => c.name === "Defesa Reciclável"),
    allCards.find(c => c.name === "Xenofluxo Reciclável"),
    allCards.find(c => c.name === "Furia"),
    allCards.find(c => c.name === "Escudo"),
    allCards.find(c => c.name === "Escudo De Gaea"),
    allCards.find(c => c.name === "Coração De Gaea"),
    allCards.find(c => c.name === "Restos de mecha"),
    allCards.find(c => c.name === "Ferro Velho"),
    allCards.find(c => c.name === "Ferro Velho"),
  ],
  tomoeh: [
    allCards.find(c => c.name === "Beserck"),
    allCards.find(c => c.name === "Rebeldia"),
    allCards.find(c => c.name === "Rebeldia"),
    allCards.find(c => c.name === "Rebeldia"),
    allCards.find(c => c.name === "Chuva De Fragmentos"),
    allCards.find(c => c.name === "Chuva De Fragmentos"),
    allCards.find(c => c.name === "Impacto Bruto"),
    allCards.find(c => c.name === "Fogo Amigo"),
    allCards.find(c => c.name === "Liderança"),
    allCards.find(c => c.name === "Liderança"),
    allCards.find(c => c.name === "Guardião"),
    allCards.find(c => c.name === "Destruir Carta"),
  ],
  x: gerarDeckAleatorio(allCards),
  wallace: [
    allCards.find(c => c.name === "Ataque"),
    allCards.find(c => c.name === "Ataque"),
    allCards.find(c => c.name === "Ataque"),
    allCards.find(c => c.name === "Ataque"),
    allCards.find(c => c.name === "Ataque"),
    allCards.find(c => c.name === "Defesa"),
    allCards.find(c => c.name === "Defesa"),
    allCards.find(c => c.name === "Defesa"),
    allCards.find(c => c.name === "Defesa"),
    allCards.find(c => c.name === "Defesa"),
    allCards.find(c => c.name === "GÆPROTOCOL"),
    allCards.find(c => c.name === "Destruir Carta"),
  ],
  olaf: [
    allCards.find(c => c.name === "Marcar"),
    allCards.find(c => c.name === "Cemiterio Branco"),
    allCards.find(c => c.name === "Xenofluxo Glacial"),
    allCards.find(c => c.name === "Baralho Glacial"),
    allCards.find(c => c.name === "Defesa Condensada"),
    allCards.find(c => c.name === "Defesa Condensada"),
    allCards.find(c => c.name === "Coração Frio"),
    allCards.find(c => c.name === "Coração Frio"),
    allCards.find(c => c.name === "Ataque"),
    allCards.find(c => c.name === "Ataque"),
    allCards.find(c => c.name === "Ataque"),
    allCards.find(c => c.name === "Ataque"),
  ],
  olga: [
    allCards.find(c => c.name === "Ataque Condensado"),
    allCards.find(c => c.name === "Ataque Condensado"),
    allCards.find(c => c.name === "Ataque Condensado"),
    allCards.find(c => c.name === "Ataque Condensado"),
    allCards.find(c => c.name === "Marcar"),
    allCards.find(c => c.name === "Cemiterio Branco"),
    allCards.find(c => c.name === "Xenofluxo Glacial"),
    allCards.find(c => c.name === "Baralho Glacial"),
    allCards.find(c => c.name === "Defesa"),
    allCards.find(c => c.name === "Defesa"),
    allCards.find(c => c.name === "Defesa"),
    allCards.find(c => c.name === "Cura"),
  ],
  glacia: [
    allCards.find(c => c.name === "Defesa Condensada"),
    allCards.find(c => c.name === "Defesa Condensada"),
    allCards.find(c => c.name === "Coração Frio"),
    allCards.find(c => c.name === "Ataque Condensado"),
    allCards.find(c => c.name === "Ataque Condensado"),
    allCards.find(c => c.name === "Ataque Condensado"),
    allCards.find(c => c.name === "Nevasca Mortal"),
    allCards.find(c => c.name === "Gelo Mortal"),
    allCards.find(c => c.name === "Marcar"),
    allCards.find(c => c.name === "Cemiterio Branco"),
    allCards.find(c => c.name === "Xenofluxo Glacial"),
    allCards.find(c => c.name === "Baralho Glacial"),
  ],
  lilia: [
    allCards.find(c => c.name === "Defesa Condensada"),
    allCards.find(c => c.name === "Defesa Condensada"),
    allCards.find(c => c.name === "Coração Frio"),
    allCards.find(c => c.name === "Ataque Condensado"),
    allCards.find(c => c.name === "Ataque Condensado"),
    allCards.find(c => c.name === "Ataque Condensado"),
    allCards.find(c => c.name === "Nevasca Mortal"),
    allCards.find(c => c.name === "Gelo Mortal"),
    allCards.find(c => c.name === "Marcar"),
    allCards.find(c => c.name === "Cemiterio Branco"),
    allCards.find(c => c.name === "Xenofluxo Glacial"),
    allCards.find(c => c.name === "Baralho Glacial"),
  ],
  // gaeaReen: [
  //   allCards.find(c => c.name === "Chuva de Laminas"),
  //   allCards.find(c => c.name === "Chuva de Laminas"),
  //   allCards.find(c => c.name === "Chuva de Laminas"),
  //   allCards.find(c => c.name === "Chuva de Laminas"),
  //   allCards.find(c => c.name === "Chuva de Laminas"),
  //   allCards.find(c => c.name === "Chuva de Laminas"),
  //   allCards.find(c => c.name === "Chuva de Laminas"),
  //   allCards.find(c => c.name === "Chuva de Laminas"),
  //   allCards.find(c => c.name === "Chuva de Laminas"),
  //   allCards.find(c => c.name === "Chuva de Laminas"),
  //   allCards.find(c => c.name === "Chuva de Laminas"),
  // ],
  gaeaReen: [
    allCards.find(c => c.name === "Essencia Verde"),
    allCards.find(c => c.name === "Defesa Renovavel"),
    allCards.find(c => c.name === "Arma Auto Sustentavel"),
    allCards.find(c => c.name === "Xenofluxo Reciclável"),
    allCards.find(c => c.name === "Defesa Reciclável"),
    allCards.find(c => c.name === "Ataque Reciclável"),
    allCards.find(c => c.name === "Força De Gaea"),
    allCards.find(c => c.name === "GÆPROTOCOL"),
    allCards.find(c => c.name === "Restos de mecha"),
    allCards.find(c => c.name === "Restos de mecha"),
    allCards.find(c => c.name === "Restos de mecha"),
    allCards.find(c => c.name === "Restos de mecha"),
    allCards.find(c => c.name === "Restos de mecha"),
  ]
};

//ENEMYS
async function enemyTurn() {
  await new Promise(res => setTimeout(res, 600));
  for (const e of enemies) {
    const actions = e.behavior();

    for (const act of actions) {
      // ⚔️ ATK
      if (act.type === "attack") {

        if (e.name === "IA") {
          await animateEnemySimpleFrames(e);
          enemies[0].dano += 5;
          floatText(enemies[0].el, `+5⚜️`, "yellow");
          updateEnemyBars();
          stopScreenGlitch()
        }
        if (e.name === "Nemora") {
          await animateNemoraAttack(e);
        }
        let dano = act.value;

        if (playerShield > 0) {
          let absorbed = Math.min(dano, playerShield);
          playerShield -= absorbed;
          dano -= absorbed;

          animateDamage(document.getElementById("player"));
          floatText(document.getElementById("player"), `-${absorbed}🛡️`, "orange");
        }
        if (dano > 0) {
          playerHP -= dano;
          animateDamage(document.getElementById("player"));
          floatText(document.getElementById("player"), `-${dano}⚔️`, "orange");
          redScreenGlow(300, 30);
        }
        // 💚 CURA
      } else if (act.type === "heal") {

        let target = enemies.find(t => t !== e && t.hp > 0) || e;
        if (e.name === "IA") {
          animateIAHitBasic(target.el);
        }

        const max = target.maxHp ?? target.hp;
        const healed = act.value;

        target.hp = Math.min(target.hp + healed, max);

        floatText(target.el, `+${healed}💚`, "green");

        if (e.name === "IA") {
          enemies[0].dano += 5;
          floatText(enemies[0].el, `+5⚜️`, "yellow");
          updateEnemyBars();
        }

        target.el.classList.add("healed");
        setTimeout(() => target.el.classList.remove("healed"), 600);

        // 🔱 ATAQUE DIRETO À VIDA
      } else if (act.type === "attackVida") {
        if (e.name === "Nemora") {
          await animateNemoraAttack(e);
        }
        if (e.name === "IA") {
          await animateEnemyCrossScreen(e);
          enemies[0].dano += 5;
          floatText(enemies[0].el, `+5⚜️`, "yellow");
          updateEnemyBars();
          startScreenGlitch();
          stopScreenGlitch()
        }
        playerHP -= act.value;

        animateDamage(document.getElementById("player"));
        floatText(document.getElementById("player"), `-${act.value}🔱`, "orange");
        redScreenGlow(300, 30);

        // ☠️ AUTO-DESTRUIÇÃO (morrer)
      } else if (act.type === "morrer") {

        if (e.turnosRestantes === undefined) {
          e.turnosRestantes = 3;
        }
        let dano = e.dano;

        if (playerShield > 0) {
          let absorbed = Math.min(dano, playerShield);
          playerShield -= absorbed;
          dano -= absorbed;
          floatText(document.getElementById("player"), `-${absorbed}🛡️`, "orange");
        }
        if (dano > 0) {
          playerHP -= dano;
          floatText(document.getElementById("player"), `-${dano}⚔️`, "orange");
          redScreenGlow(300, 30);
        }
        animateDamage(document.getElementById("player"));

        e.turnosRestantes--;
        if (e.turnosRestantes <= 0) {
          floatText(e.el, `💀`, "red");
          e.hp = 0;
          checkEnemies();
        }
      }

      // Fala da Ayla
      if (e.name === "Ayla") {
        setTimeout(() => {
          const frasesAyla = [
            "Raiva: COVARDE!",
            "Medo: Por que atacou alguém indefesa?",
            "Nojo: Sua fraqueza me da nojo",
            "Tristeza: A IA me permitiu sentir...",
            "Amor: Isso doi!",
            "Ansiedade: VAMOS ACABE COM ELE AGORA! RÁPIDO",
            "Angustia: Ainda estou aqui...",
            "Ayla: Vencer minhas emoções não significa NADA!",
            "Ayla: Juntese a IA, sua tal GAEA não vai te salvar!",
            "Ayla: Salvar a natureza? Patético!",
            "Ayla: EU SOU MAIS HUMANA QUE VOCÊ!",
            "Ayla: Sou a mais forte dentre todas"
          ];
          floatText(e.el, frasesAyla[Math.floor(Math.random() * frasesAyla.length)], "violet");
        }, 500);
      }

      // MORTE DO JOGADOR
      if (playerHP <= 0) {
        document.getElementById("overlay").style.display = "block";
        document.getElementById("popupOver").style.display = "flex";
        // gerarCartaRecomp();
        limiteMao = maoInicio;
        document.getElementById("enemies").style.display = "none";
        document.getElementById("lifeBarsContainer").style.display = "none";
        energy = energyMax;
        drawNewCards();
        drawCards();
        updateHUD();
        playerShield = playerShieldInit;
        return; // encerra turno
      }

    } // fim do for actions
  } // fim do for enemies


  // FINAL DO TURNO
  energy = energyMax;
  playerShield = playerShieldInit;
  drawNewCards();
  drawCards();
  updateHUD();
  checkGameOver();
};
// IA
function animateEnemySimpleFrames(enemy) {
  return new Promise(resolve => {
    const container = enemy.el;
    const img = container.querySelector("img");
    if (!img) return resolve();

    const frames = {
      f1: "../img/jogo/inimigos/animado/ia/atk/ia1.png",
      f2: "../img/jogo/inimigos/animado/ia/atk/ia2.png",
      idle: "../img/jogo/inimigos/animado/ia/statico/ia1.png"
    };
    shakeScreenNatural(10, 400);
    startScreenGlitch();

    const frameDelay = 150;

    setTimeout(() => img.src = frames.f1, 0);
    setTimeout(() => img.src = frames.f2, frameDelay);
    setTimeout(() => img.src = frames.f1, frameDelay * 2);
    setTimeout(() => {
      img.src = frames.idle;
      resolve();
      stopScreenGlitch();
    }, frameDelay * 3);
  });
};
// NEMORA
function animateNemoraAttack(enemy) {
  if (nemoraAtk == true) {
    enemies[0].dano += 5;
  }
  return new Promise(resolve => {
    const container = enemy.el;
    const img = enemy.el.querySelector("img");

    if (!img) return resolve();

    if (nemoraAtk == true) {
      frames = {
        f1: "../img/jogo/inimigos/animado/nemora/atk/nemora11.png",
        f2: "../img/jogo/inimigos/animado/nemora/atk/nemora33.png",
        f3: "../img/jogo/inimigos/animado/nemora/atk/nemora22.png",
        f4: "../img/jogo/inimigos/animado/nemora/atk/nemora44.png",
        f5: "../img/jogo/inimigos/animado/nemora/atk/nemora55.png",
        idle: "../img/jogo/inimigos/animado/nemora/statico/nemora222.png"
      };
    } else if (nemoraDef == true) {
      frames = {
        f1: "../img/jogo/inimigos/animado/nemora/atk/nemora111.png",
        f2: "../img/jogo/inimigos/animado/nemora/atk/nemora333.png",
        f3: "../img/jogo/inimigos/animado/nemora/atk/nemora222.png",
        f4: "../img/jogo/inimigos/animado/nemora/atk/nemora444.png",
        f5: "../img/jogo/inimigos/animado/nemora/atk/nemora55.png",
        idle: "../img/jogo/inimigos/animado/nemora/statico/nemora222.png"
      };
    } else {
      frames = {
        f1: "../img/jogo/inimigos/animado/nemora/atk/nemora1.png",
        f2: "../img/jogo/inimigos/animado/nemora/atk/nemora3.png",
        f3: "../img/jogo/inimigos/animado/nemora/atk/nemora2.png",
        f4: "../img/jogo/inimigos/animado/nemora/atk/nemora4.png",
        f5: "../img/jogo/inimigos/animado/nemora/atk/nemora55.png",
        idle: "../img/jogo/inimigos/animado/nemora/statico/nemora222.png"
      };
    }
    stopNemoraSnow();
    startNemoraFire();
    const dashTime = 700;
    const backTime = 500;
    const stopTime = 500;
    const frameDelay = 200;
    // AVANÇAR E TROCAR 1/2/3
    setTimeout(() => img.src = frames.f1, 0);
    setTimeout(() => img.src = frames.f2, frameDelay);
    setTimeout(() => img.src = frames.f3, frameDelay * 2);
    // mover para frente
    container.style.transition = `transform ${dashTime}ms ease`;
    container.style.transform = "translateX(-45vw)";
    // quando terminar de andar:
    setTimeout(() => {
      // frame 4 parado
      img.src = frames.f4;
      floatText(enemies[0].el, `Postura Agressiva`, "rgb(231, 76, 62)");
      setTimeout(() => {
        // voltar com frame 5
        img.src = frames.f5;
        container.style.transition = `transform ${backTime}ms ease`;
        container.style.transform = "translateX(0)";
        setTimeout(() => {
          // idle ao terminar
          img.src = frames.idle;
          resolve();
        }, backTime);
      }, stopTime);
      shakeScreenNatural(10, 400);
      mudarBackground('atk');
      updateEnemyBars();
      if (nemoraAtk == true) {
        floatText(enemies[0].el, `+5⚜️`, "yellow");
      }
      nemoraDef = false;
      nemoraAtk = true;
    }, dashTime);
  });
};
function animateDamage(el) {

  // ===============================
  //  ANIMAÇÃO PADRÃO (qualquer inimigo)
  // ===============================
  el.classList.add("shake", "damaged");
  setTimeout(() => el.classList.remove("shake", "damaged"), 400);

  const img = el.querySelector("img");
  if (!img) return;

  // identifica qual inimigo é
  const isNemora = img.src.includes("nemora");
  const isIA = img.src.includes("/ia/");

  // ===============================
  //  SE FOR **IA** → animação própria
  // ===============================
  if (isIA) {
    animateIAHit(el, img);
    return;
  }

  if (!isNemora) return;

  // ===============================
  //  ANIMAÇÃO ESPECIAL — NEMORA
  // ===============================

  let frame1, frame2, idle;

  if (nemoraDef === true) {
    frame1 = "../img/jogo/inimigos/animado/nemora/def/nemora11.png";
    frame2 = "../img/jogo/inimigos/animado/nemora/def/nemora22.png";
    idle = "../img/jogo/inimigos/animado/nemora/statico/nemora444.png";

  } else if (nemoraAtk === true) {
    frame1 = "../img/jogo/inimigos/animado/nemora/def/nemora111.png";
    frame2 = "../img/jogo/inimigos/animado/nemora/def/nemora222.png";
    idle = "../img/jogo/inimigos/animado/nemora/statico/nemora444.png";

  } else {
    frame1 = "../img/jogo/inimigos/animado/nemora/def/nemora1.png";
    frame2 = "../img/jogo/inimigos/animado/nemora/def/nemora2.png";
    idle = "../img/jogo/inimigos/animado/nemora/statico/nemora444.png";
  }

  stopNemoraFire();
  startNemoraSnow();

  const speed = 220;

  // FRAME 1
  img.src = frame1;

  setTimeout(() => {
    img.src = frame2;

    el.style.transition = "transform 0.25s ease";
    el.style.transform = "translateX(65px)";

    setTimeout(() => {
      el.style.transform = "translateX(0px)";

      setTimeout(() => {
        img.src = frame1;

        setTimeout(() => {
          img.src = idle;
        }, speed);

      }, speed / 1.2);

    }, 250);

  }, speed);

  floatText(enemies[0].el, `Postura Defensiva`, "aqua");

  // cura especial
  if (nemoraDef === true) {
    if (enemies[0].hp < 100) {
      enemies[0].hp += 20;
      floatText(enemies[0].el, `+20💚`, "lime");

    } else if (enemies[0].hp < 200) {
      enemies[0].hp += 15;
      floatText(enemies[0].el, `+15💚`, "lime");

    } else if (enemies[0].hp < 300) {
      enemies[0].hp += 10;
      floatText(enemies[0].el, `+10💚`, "lime");

    } else {
      enemies[0].hp += 5;
      floatText(enemies[0].el, `+5💚`, "lime");
    }
  }

  nemoraDef = true;
  nemoraAtk = false;
};

// ITENS
function gerarItens() {
  const container = document.getElementById("recompensa");
  const inventario = document.getElementById("itens");

  if (!container) {
    console.error("ERRO: div #recompensa NÃO ENCONTRADA!");
    return;
  }
  if (hasItem(21)) {
    numItens = 4;
  } else {
    numItens = 3;
  }

  container.innerHTML = "";
  container.style.display = "flex";
  container.style.flexDirection = "row";
  container.style.justifyContent = "center";
  container.style.alignItems = "center";
  container.style.gap = "20px";
  container.style.width = "100%";

  const itensDisponiveis = allItems.filter(i => !itensJaPegos.includes(i.id));
  const quantidade = Math.min(numItens, itensDisponiveis.length);

  if (quantidade === 0) {
    container.innerHTML = "<p style='color:white'>Nenhum item disponível!</p>";
    return;
  }

  const escolhidos = [];
  while (escolhidos.length < quantidade) {
    const item = itensDisponiveis[Math.floor(Math.random() * itensDisponiveis.length)];
    if (!escolhidos.includes(item)) escolhidos.push(item);
  }

  escolhidos.forEach(item => {
    const box = document.createElement("div");
    box.classList.add("item-box");
    box.style.cursor = "pointer";
    box.style.transition = "0.2s";

    // brilho verde ao passar o mouse
    box.addEventListener("mouseenter", () => {
      box.style.filter = "drop-shadow(0 0 10px #00ff3389)";
    });
    box.addEventListener("mouseleave", () => {
      box.style.filter = "none";
    });

    const img = document.createElement("img");
    img.src = item.img;
    img.style.width = "100px";

    const nome = document.createElement("div");
    nome.textContent = item.name;
    nome.style.fontSize = "18px";
    nome.style.marginTop = "8px";
    nome.style.fontWeight = "bold";

    const desc = document.createElement("div");
    desc.textContent = item.desc;
    desc.style.marginTop = "4px";
    desc.style.fontSize = "14px";
    desc.style.opacity = "0.8";

    /* Evento de pegar o item */
    box.addEventListener("click", () => {
      itensJaPegos.push(item.id);

      // cria imagem no inventário
      const invImg = document.createElement("img");
      invImg.src = item.img;
      invImg.style.margin = "5px";
      invImg.style.cursor = "pointer";

      /* TOOLTIP NO INVENTÁRIO */
      invImg.addEventListener("mouseenter", () => {
        tooltip.textContent = `(${item.name}) ${item.desc}`;
        tooltip.style.display = "block";
      });

      invImg.addEventListener("mousemove", (ev) => {
        tooltip.style.left = ev.clientX + 15 + "px";
        tooltip.style.top = ev.clientY + 15 + "px";
      });

      invImg.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
      });

      inventario.appendChild(invImg);
      aplicarBuff(item);

      fecharPopup();
      irParaDiv2();
      updateHUD();
    });

    box.appendChild(img);
    box.appendChild(nome);
    box.appendChild(desc);
    container.appendChild(box);
  });
};
function applyItemAreaBonus(enemies) {
  const bonusDamage = 5;

  enemies.forEach(e => {
    if (!e || e.hp <= 0) return;

    animateDamage(e.el);
    e.hp -= bonusDamage;
    floatText(e.el, `-${bonusDamage}⚔️`, "orange");

    if (e.hp < 0) e.hp = 0;

    if (e.hp === 0) {
      e.el.classList.add("enemy-dead");
      setTimeout(() => e.el.remove(), 300);
    }
  });
};
function protetor() {
  playerShield += 5;
  floatText(document.getElementById("player"), `+${5}🛡️`, "cyan");
};
function reciclador() {
  let dano = Math.floor(lixoReciclado / 20);

  animateDamage(enemies[0].el);
  enemies[0].hp -= dano;
  floatText(enemies[0].el, `-${dano}⚔️`, "red");
};
function gancioso() {
  let dano = Math.floor(dinheiro / 10);

  animateDamage(enemies[0].el);
  enemies[0].hp -= dano;
  floatText(enemies[0].el, `-${dano}⚔️`, "red");
};
function curandeiro() {
  playerHP = Math.min(playerHP + 2, playerMaxHP);
  glowPlayer("green");
  floatText(document.getElementById("player"), `+${2}💚`, "lime");
};
function glacial() {
  if (Math.random() < 0.3) {
    let dano = Math.floor(lixoReciclado / 5);

    animateDamage(enemies[0].el);
    enemies[0].hp -= dano;
    floatText(enemies[0].el, `-${dano}⚔️`, "red");
  }
}
function estatuaDeGaea() {
  if (hasItem(18)) {
    dinheiro += 5;
    atualizarDinheiro();
    atualizarLixo();
  }
}
function itensVerd() {
  if (hasItem(24) && hasItem(25)) {
    curandeiro()
  }
  if (hasItem(22) && hasItem(25)) {
    if (Math.random() < 0.3) {
      energy += 1;
      glowPlayer("blue");
      floatText(document.getElementById("player"), `+${1}🔷`, "cyan");
    }
  }
}

// CALLING FUNCTIONS
myMusic.play();
configurarSelecaoPersonagem();
mapaCanvas("div2", 7, 3, "#45ff45ff", "#ff8834ff", '🐺');
mapaCanvas("div7", 7, 3, "#60ff34ff", "#34ffe1ff", '🦑');
mapaCanvas("div8", 7, 5, "#fbfbfbff", "#737373ff", '🗽');
mapaCanvas("div9", 7, 7, "#f5fd54ff", "#5db0e7ff", '👻');
mapaCanvas("div10", 7, 7, "#5db0e7ff", "#e75d5dff", '🤖');