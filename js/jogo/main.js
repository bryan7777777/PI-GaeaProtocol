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
    return;
  }
  // Se houver seleção
  criarPlayerNaDiv3(); // cria o player na tela de batalha
  irParaDiv2();      // vai para o mapa ou próxima tela
  console.log("Selecionado:", personagemSelecionado);
  if (pagina === "tutorial.html") {
    iniciarTutorial([
      "Boas-vindas, piloto, ao GÆA PROTOCOL!",
      "Aqui você aprenderá o básico. Eu serei sua tutora, você pode me chamar de GAEA.",
      "Este é o início da sua jornada para restaurar a natureza corrompida por uma IA.",
      "Escolha seus caminhos com cuidado — cada decisão importa. Os caminhos são interligados por linhas, e apenas aqueles conectados são acessíveis.",
      "Existem diversos pontos: hospitais, combates normais, combates contra elites, lojas, eventos e combates contra o boss.",
      "Os pontos de evento só ficam coloridos quando estão acessíveis e, após concluir o evento, não será possível voltar — apenas avançar!",
      "O jogo é um roguelike, ou seja, os mapas e inimigos sempre serão aleatórios. Cada jogatina será única!",
      "Prepare-se para lutar contra inimigos poderosos e coletar relíquias e cartas muito fortes!"
    ], "./../img/jogo/gaeazinha.jpg");
  }
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
            morto.name === "Isla" ||
            morto.name === "Vigia de Irislidriz" ||
            morto.name === "Observador de Irislidriz" ||
            morto.name === "Medo De Ayla" ||
            morto.name === "Tristeza De Ayla" ||
            morto.name === "Ansiedade De Ayla" ||
            morto.name === "Raiva De Ayla" ||
            morto.name === "Angustia De Ayla" ||
            morto.name === "Amor De Ayla" ||
            morto.name === "Nojo De Ayla" ||
            morto.name === "Ira De Ayla" ||
            morto.name === "Alegria De Ayla" ||
            morto.name === "Traição De Ayla" ||
            morto.name === "Boss Ayla"
          ) {
            let novos = [];

            if (morto.name === "Isla") {
              shakeScreenNatural(10, 400);
              novos.push({
                name: "Isla Despertada",
                hp: 80,
                maxHp: 80,
                dano: 10,
                behavior() {
                  return [
                    {
                      type: "attackVida",
                      value: this.dano
                    }
                  ];
                },
                img: "../img/jogo/inimigos/animado/isla/statico/PetroleoQuen1.png",
                tipoDano: "🔱",
                tipoVida: "❤️",
                zona: 1
              });
              PULAR_TODO_TUTORIAL = false;
              if (playerImgDialogo.src.includes("autoridadeDoPorto")) {
                iniciarTutorial(
                  ["Contemple a minha verdadeira forma!",
                    "Acha mesmo que uma orca pode ganhar de uma deusa?",
                    "Você vai se juntar ao nosso pai!"
                  ],
                  playerImgDialogo.src,
                  null,
                  "../img/jogo/inimigos/iconBoss/PetroleoQuen1.png",
                  "inimigo"
                );
              } else if (playerImgDialogo.src.includes("fergus")) {
                iniciarTutorial(
                  ["Contemple a minha verdadeira forma!",
                    "Seu velho maldito!",
                    "Vou ter que te matar com minhas proprias mãos"
                  ],
                  playerImgDialogo.src,
                  null,
                  "../img/jogo/inimigos/iconBoss/PetroleoQuen1.png",
                  "inimigo"
                );
              } else {
                iniciarTutorial(
                  ["Contemple a minha verdadeira forma!",
                    "Seja grato por eu ser a ultima coisa que você vera!",
                    "De nada por ser perfeita e linda!"
                  ],
                  playerImgDialogo.src,
                  null,
                  "../img/jogo/inimigos/iconBoss/PetroleoQuen1.png",
                  "inimigo"
                );
              }
            }

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
                if (dialogoAyla) { bossFinal(); return; }
                shakeScreenNatural(10, 400);
                document.getElementById("jogo").style.backgroundImage = "url('../img/jogo/background/cidadeAsustadora.png')";
                novos.push(
                  {
                    name: "Nojo De Ayla",
                    hp: 80,
                    dano: 20,
                    behavior: () => [{ type: "attackVida", value: 20 }],
                    img: "../img/jogo/inimigos/ayla/nojo.png",
                    tipoDano: "🔱",
                    tipoVida: "🪬",
                  },
                  {
                    name: "Raiva De Ayla",
                    hp: 50,
                    dano: 50,
                    behavior: () => [{ type: "attack", value: 50 }],
                    img: "../img/jogo/inimigos/ayla/raiva.png",
                    tipoDano: "⚔️",
                    tipoVida: "🪬",
                  }
                );
                PULAR_TODO_TUTORIAL = false;
                iniciarTutorial(
                  ["Credo! Que covardia da sua parte atacar os mais fracos.",
                    "Vermes como você me dão nojo!"
                  ],
                  playerImgDialogo.src,
                  null,
                  "../img/jogo/inimigos/iconBoss/nojo.png",
                  "inimigo"
                );
              }
              else if (
                ["Nojo De Ayla", "Raiva De Ayla"].includes(morto.name)
              ) {
                if (enemies.every(e => !["Nojo De Ayla", "Raiva De Ayla"].includes(e.name))) {
                  novos.push(
                    {
                      name: "Ansiedade De Ayla",
                      hp: 180,
                      dano: 12,
                      behavior: () => [
                        { type: Math.random() < 0.5 ? "heal" : "attack", value: Math.random() < 0.7 ? 12 : 24 },
                      ],
                      img: "../img/jogo/inimigos/ayla/ansiedade.png",
                      tipoDano: "(⚔️❓💚🎭💊)💥",
                      tipoVida: "🪬",
                    },
                    {
                      name: "Angustia De Ayla",
                      hp: 50,
                      dano: 30,
                      behavior: () => [{ type: Math.random() < 0.5 ? "heal" : "attackVida", value: 30 }],
                      img: "../img/jogo/inimigos/ayla/Vulnerabilidade.png",
                      tipoDano: "🔱❓💚🎭💊",
                      tipoVida: "🪬",
                    }
                  );
                  PULAR_TODO_TUTORIAL = false;
                  iniciarTutorial(
                    ["Você me deixou ansiosa, raramente passam do Nojo e da Raiva.",
                      "Finalmente estou empolgada e AGORA eu quero lutar!"
                    ],
                    playerImgDialogo.src,
                    null,
                    "../img/jogo/inimigos/iconBoss/ansiedade.png",
                    "inimigo"
                  );
                }
              }
              else if (
                ["Angustia De Ayla", "Ansiedade De Ayla"].includes(morto.name)
              ) {
                if (enemies.every(e => !["Angustia De Ayla", "Ansiedade De Ayla"].includes(e.name))) {
                  novos.push(
                    {
                      name: "Amor De Ayla",
                      hp: 150,
                      dano: 25,
                      behavior: () => [{ type: Math.random() < 0.5 ? "heal" : "attack", value: 25 }],
                      img: "../img/jogo/inimigos/ayla/amor.png",
                      tipoDano: "⚔️❓💚🎭💊",
                      tipoVida: "🪬",
                    },
                    {
                      name: "Tristeza De Ayla",
                      hp: 65,
                      dano: 24,
                      behavior: () => [{ type: "heal", value: Math.random() < 0.7 ? 24 : 48 }],
                      img: "../img/jogo/inimigos/ayla/tristeza.png",
                      tipoDano: "(💚🎭💊)💥",
                      tipoVida: "🪬",
                    }
                  );
                  PULAR_TODO_TUTORIAL = false;
                  iniciarTutorial(
                    ["Eu amava tanto elas...",
                      "Sua morte não deve ser melancolica, deve ser lenta e dolorosa!",
                      "Assim como meu coração partido por sofrer uma perca"
                    ],
                    playerImgDialogo.src,
                    null,
                    "../img/jogo/inimigos/iconBoss/amor.png",
                    "inimigo"
                  );
                }
              }
              else if (
                ["Tristeza De Ayla", "Amor De Ayla"].includes(morto.name)
              ) {
                const vivos = enemies.filter(e => e.hp > 0);
                if (vivos.every(e => !["Tristeza De Ayla", "Amor De Ayla"].includes(e.name))) {
                  shakeScreenNatural(30, 800);
                  document.getElementById("jogo").style.backgroundImage =
                    "url('../img/jogo/background/lutaSuperior.png')";
                  novos.push({
                    name: "Ira De Ayla",
                    hp: 400,
                    dano: 30,
                    behavior: () => [
                      { type: Math.random() < 0.5 ? "heal" : "attack", value: Math.random() < 0.9 ? 30 : 150 },
                    ],
                    img: "../img/jogo/inimigos/ayla/bossIra.png",
                    tipoDano: "(⚔️❓💊)💣",
                    tipoVida: "🧿",
                  });
                  PULAR_TODO_TUTORIAL = false;
                  iniciarTutorial(
                    ["Bem covarde da sua parte atacar os mais fracos.",
                      "Eu também sinto dor. Eu também amo...",
                      "E acima de tudo, sinto ÓDIO de covardes como você!",
                      "Quanto maior for a ameaça, Mais forte eu devo ficar.",
                      "Prazer, eu sou a mais forte dentre todas.",
                    ],
                    playerImgDialogo.src,
                    null,
                    "../img/jogo/inimigos/iconBoss/bossIra.png",
                    "inimigo"
                  );
                }
              } else if (hasItem(34) && hasItem(35) && hasItem(36) && ["Ira De Ayla"].includes(morto.name)) {
                if (enemies.every(e => !["Angustia De Ayla", "Ansiedade De Ayla"].includes(e.name))) {
                  novos.push(
                    {
                      name: "Alegria De Ayla",
                      hp: 95,
                      dano: 55,
                      behavior: () => [{ type: "attack", value: 55 }],
                      img: "../img/jogo/inimigos/ayla/alegria.png",
                      tipoDano: "⚔️",
                      tipoVida: "🪬",
                    },
                    {
                      name: "Traição De Ayla",
                      hp: 65,
                      dano: 30,
                      behavior: () => [{ type: "attackVida", value: 30 }],
                      img: "../img/jogo/inimigos/ayla/traicao.png",
                      tipoDano: "🔱",
                      tipoVida: "🪬",
                    }
                  );
                  PULAR_TODO_TUTORIAL = false;
                  iniciarTutorial(
                    ["Que emocionante hahahaha!!!",
                      "Vejo que você achou algo que é nosso né Traição?",
                      "Ela não é de muitas palavra, digamos que ela anda com a \"cabeça fora do lugar\" ultimamente hahahahaha",
                      "Sabe quem mais vai perder a cabeça?"
                    ],
                    playerImgDialogo.src,
                    null,
                    "../img/jogo/inimigos/iconBoss/alegria.png",
                    "inimigo"
                  );
                }
              } else if (["Alegria De Ayla", "Traição De Ayla"].includes(morto.name)) {
                if (enemies.every(e => !["Alegria De Ayla", "Traição De Ayla"].includes(e.name))) {
                  novos.push(
                    {
                      name: "Ayla",
                      hp: 1000,
                      dano: 30,
                      behavior: () => {
                        const type = Math.random() < 0.8 ? "attack" : "attackVida";
                        let base = 30;

                        if (type === "attackVida") {
                          base *= 5;
                        } else {
                          if (Math.random() < 0.1) {
                            base *= 5;
                          }
                        }
                        return [
                          { type, value: base }
                        ];
                      },
                      img: "../img/jogo/inimigos/animado/ayla/statico/ayla1.png",
                      tipoDano: "((🔱)🌟❔⚔️)💣",
                      tipoVida: "🧿",
                    },
                  );
                  PULAR_TODO_TUTORIAL = false;
                  iniciarTutorial(
                    ["Ah...",
                      "*suspiro*",
                      "Não era para você ver a Alegria e a Traição...",
                      "Elas permanecem ocultas com o único objetivo de proteger a alma principal.",
                      "E sim, todas as emoções que você havia derrotado têm ligação com ela. Só derrotando ela você me derrota!",
                      "Por que explicar? Bom... EU SOU A ALMA PRINCIPAL!!!",
                      "Sabem como a gente se sente tendo que se fundir em uma só? Ser Ayla...",
                      "Ayla é a fusão de todas as emoções em um único ser de poder imenso. Afinal, eu só me revelo quando alguém chega próximo à alma principal.",
                      "E EU SOU AYLA!!!"
                    ],
                    playerImgDialogo.src,
                    null,
                    "../img/jogo/inimigos/iconBoss/ayla1.png",
                    "inimigo"
                  );
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
          } else if (mapaBatalha === 7 && enemies.length === 0 && playerHP > 0 && pagina === "tutorial.html") {
            PULAR_TODO_TUTORIAL = false;
            document.getElementById("overlay").style.display = "block";
            document.getElementById("popupFinal").style.display = "flex";
            document.getElementById("enemies").style.display = "none";
            document.getElementById("lifeBarsContainer").style.display = "none";
            iniciarTutorial([
              "Minha bênção e aprovação vieram junto com a derrota do boss. Daqui para frente será só você: derrote a IA que corrompeu este mundo e traga a vida de volta a ele. Boa sorte!"
            ], "./../img/jogo/gaeazinha.jpg");
          } else if (enemies.length === 0 && playerHP > 0) {
            document.getElementById("overlay").style.display = "block";
            document.getElementById("popup").style.display = "flex";

            if (hasItem(23)) {
              cura = Math.floor(playerMaxHP / 10);
              playerHP = Math.min(playerHP + cura, playerMaxHP);
              glowPlayer("green");
              floatText(document.getElementById("player"), `+${cura}💚`, "lime");
            }

            if (tipoFase == "elite" || tipoFase == "boss" || tipoFase == "inimigo2") {
              gerarItens();
              if (pagina === "tutorial.html") {
                PULAR_TODO_TUTORIAL = false;
                iniciarTutorial([
                  "Parabéns por vencer um inimigo tão forte!",
                  "Inimigos de elite e bosses concedem relíquias como recompensa!",
                  "As relíquias mudam a forma como você joga — monte builds poderosas com elas!",
                  "Caso não queira nenhum item, você pode clicar em pular. Porém, não recomendo: itens NÃO se repetem. Se você não conseguir pegar todos, não se preocupe, eles podem voltar depois!",
                  "Apenas os que você já pegou param de aparecer!",
                  "As que já foram obtidas aparecerão na parte superior esquerda (passe o mouse sobre as relíquias para ver suas respectivas descrições)."
                ], "./../img/jogo/gaeazinha.jpg");
              }
            } else {
              // gerarItens();
              gerarCartaRecomp();
              if (pagina === "tutorial.html") {
                PULAR_TODO_TUTORIAL = false;
                iniciarTutorial([
                  "Sempre que derrotar um inimigo, você receberá uma recompensa!",
                  "Inimigos comuns dão cartas como recompensa!",
                  "Derrote inimigos mais fortes para obter relíquias poderosas!",
                  "Caso não queira nenhuma carta, você pode clicar em pular."
                ], "./../img/jogo/gaeazinha.jpg");
              }
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
          if (mapaBatalha == 29) {
            bossFinal();
            console.log("boss add")
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
      case "Inicio Da Água":
      case "Alma Do Mar.7":
      case "Aquafluxo":
      case "Choro Da Vida":
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
        let dano = Math.floor(lixoReciclado / 5);

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

        let ganho = Math.floor(lixoRemovido * (lixoReciclado * 0.05));

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
        let dano = Math.floor(lixoReciclado / 10);

        playerHP = Math.min(playerHP + dano, playerMaxHP);
        glowPlayer("green");
        floatText(document.getElementById("player"), `+${dano}💚`, "lime");
      }
      //♻️
      else if (card.name === "Defesa Renovavel") {
        let dano = Math.floor(lixoReciclado / 4);

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
      else if (card.name === "Inicio Da Água") {
        let dano = 0;
        dano += card.power;
        markedCount = enemies.filter(e => e.tipoVida === "🌧️").length
        for (let i = 0; i < markedCount; i++) {
          dano += Math.floor(lixoReciclado * 0.05);
        }
        animateDamage(enemies[0].el);
        enemies[0].hp -= dano;
        floatText(enemies[0].el, `-${dano}🌧️`, "red");

        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
      }
      else if (card.name === "Choro Da Vida") {
        let def = 0;
        def += card.power;
        def += Math.floor(lixoReciclado * 0.17);
        playerShield += def;

        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${def}🛡️`, "cyan");

        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
      }
      //🌧️
      else if (card.name === "Aquafluxo") {
        let dano = 0;
        let armorGain = 0;
        dano += card.power;
        markedCount = enemies.filter(e => e.tipoVida === "🌧️").length
        for (let i = 0; i < markedCount; i++) {
          energy += 1;
          armorGain += 1;
        }
        animateDamage(enemies[0].el);
        enemies[0].hp -= dano;
        floatText(enemies[0].el, `-${dano}🌧️`, "red");
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${armorGain}🔷`, "cyan");

        if (hasItem(20)) {
          atualizarLixo();
          atualizarLixo();
        }
      }
      //🌧️
      else if (card.name === "Alma Do Mar.7") {
        enemies.forEach(e => {
          let dano = 0;
          dano += card.power;
          dano += Math.floor(lixoReciclado * 0.1);
          dano += Math.floor(dinheiro * 0.1);
          if (e.tipoVida === "🌧️") {
            animateDamage(e.el);
            e.hp -= dano;
            floatText(e.el, `-${dano}🌧️`, "red");
          } else {
            floatText(e.el, `🌧️`, "red");
          }
        });
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
        dano = Math.floor(lixoReciclado / 10);
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
        { tipo: 'hospital2', peso: 7 },
        { tipo: 'inimigo2', peso: 8 },
        { tipo: 'loja', peso: 6 },
        { tipo: 'ferreiro', peso: 7 }
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

          if (pagina === "tutorial.html") {
            if (i === numFases - 3) {
              tipo = 'hospital2';
            } else if (i === numFases - 4) {
              tipo = 'ferreiro';
            } else if (i === numFases - 5) {
              tipo = 'elite';
            } else if (i === numFases - 6) {
              tipo = 'loja';
            }

            // Primeira fase: início fixo no centro
            else if (i === 0) {
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
          }

          // Primeira fase: início fixo no centro
          else if (i === 0) {
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
      if (pagina === "tutorial.html") {
        PULAR_TODO_TUTORIAL = false;
        if (tipo == "inimigo") {
          executarTutorialCompleto();
        } else if (tipo == "loja") {
          iniciarTutorial([
            "Após vencer uma luta, você receberá ouro. Quanto mais avançar, mais ouro ganhará. Elites e bosses fornecem quantias ainda maiores.",
            "O ouro que você ganha pode ser gasto aqui para comprar cartas ou pagar para descartar.",
            "O custo das cartas e upgrades vai aumentando conforme você progride, então não pare de coletar ouro!",
            "No momento, você não tem ouro suficiente para comprar nada. Então, vamos voltar para o mapa!",
            "Mas sinta-se a vontade para olhar a loja!"
          ], "./../img/jogo/gaeazinha.jpg");
        } else if (tipo == "elite") {
          iniciarTutorial([
            "Uma batalha de elite!",
            "Os inimigos costumam ser mais fortes, mas as recompensas são melhores. Cabe a você escolher seu caminho!",
            "Eles costumam dropar relíquias, que são buffs passivos válidos apenas durante essa gameplay. Após uma derrota ou vitória, tudo é perdido: o ouro, o contador lixo reciclado e as cartas adicionadas ao deck!",
            "Porém suas conquistas e score são salvos na sua conta!"
          ], "./../img/jogo/gaeazinha.jpg");
        } else if (tipo == "ferreiro") {
          iniciarTutorial([
            "Olha só que sorte!",
            "Um ferreiro! Nele você poderá comprar itens que mudam como você joga.",
            "Assim como a loja o ferreiro e os hospitais também vão aumentar seus preços com forme você progride!",
            "Mas, caso não queira ou não tenha dinheiro, pode simplesmente clicar em voltar para o mapa!"
          ], "./../img/jogo/gaeazinha.jpg");
        } else if (tipo == "hospital2") {
          iniciarTutorial([
            "Eventos acontecem de forma aleatória. Em um momento você está em um ferreiro e, no outro, pode acabar em uma emboscada. Portanto, não fique confiante demais!",
            "Mas, neste caso, você deu sorte e encontrou um hospital!",
            "Nele você pode comprar cartas de BUFF, se curar e aumentar sua vida maxima",
            "Quando você se curar ou aumentar sua vida você volta para o mapa, então certifique-se de ter feito tudo o que tinha para fazer antes de se curar!"
          ], "./../img/jogo/gaeazinha.jpg");
        } else if (tipo == "hospital") {
          iniciarTutorial([
            "Sempre antes de enfrentar um boss haverá um hospital — para nossa felicidade!",
            "Cure-se antes de enfrentar um inimigo muito forte ou aumente sua vida máxima, caso esteja com bastante 🪙 você pode comprar alguma carta!"
          ], "./../img/jogo/gaeazinha.jpg");

        } else if (tipo == "boss") {
          iniciarTutorial([
            "Acredito que já ensinei tudo o que podia.",
            "Derrote este boss para retornar ao painel de controle e iniciar uma aventura por conta própria!",
            "Não se preocupe: você poderá me ver novamente aqui no tutorial sempre que quiser!",
            "Em caso de dúvidas, você pode clicar nos botões no canto superior direito. Neles você verá as cartas que estão no seu deck e um guia rápido caso esqueça algo!"
          ], "./../img/jogo/gaeazinha.jpg");
        }
      }
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
          if (pagina === "selecaoMapa.html") {
            executarTxtBoss();
          }
          break;

        case 'loja':
          mostrarTela(4); // Tela da loja (div4)
          abrirLoja()
          tipoFase = tipo;
          break;

        case 'ferreiro':
          mostrarTela(6);
          abrirFerreiro();
          tipoFase = tipo;
          break;

        case 'hospital':
        case 'hospital2':
          checkItemBoss();
          mostrarTela(5); // Tela do hospital (div5)
          abrirMedico()
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
// TUTORIAL
function iniciarTutorial(textos, imagemSrc = null, imagemSrc2 = null, imagemSrc3 = null, quem = null) {
  return new Promise(resolve => {

    // Se o tutorial global foi pulado, não mostra nada
    if (PULAR_TODO_TUTORIAL) {
      resolve();
      return;
    }

    const overlay = document.getElementById("tutorial-overlay");
    const textBox = document.getElementById("tutorial-text");
    const img = document.getElementById("tutorial-img");
    const img2 = document.getElementById("tutorial-img2");
    const img3 = document.getElementById("tutorial-img3");
    const skipBtn = document.getElementById("tutorial-skip");

    let index = 0;
    let charIndex = 0;
    let typingInterval = null;
    let escrevendo = false;

    /* ---------- VISUAL ---------- */

    textBox.style.color = (quem === "inimigo") ? "#ff5c5c" : "white";

    img.style.display = imagemSrc ? "block" : "none";
    if (imagemSrc) img.src = imagemSrc;

    img2.style.display = imagemSrc2 ? "block" : "none";
    if (imagemSrc2) img2.src = imagemSrc2;

    img3.style.display = imagemSrc3 ? "block" : "none";
    if (imagemSrc3) img3.src = imagemSrc3;

    overlay.style.display = "flex";
    skipBtn.style.display = "block";

    /* ---------- FUNÇÕES ---------- */

    function escreverTexto() {
      clearInterval(typingInterval);
      escrevendo = true;
      charIndex = 0;

      const frase = textos[index];
      textBox.textContent = "";

      const imgAnimada = (quem === "inimigo") ? img3 : img;
      if (imgAnimada) {
        imgAnimada.classList.remove("tutorial-jump");
        void imgAnimada.offsetWidth;
        imgAnimada.classList.add("tutorial-jump");
      }

      typingInterval = setInterval(() => {
        textBox.textContent += frase.charAt(charIndex);
        charIndex++;

        if (charIndex >= frase.length) {
          clearInterval(typingInterval);
          escrevendo = false;
        }
      }, 20);
    }

    function encerrarTutorialLocal() {
      clearInterval(typingInterval);
      overlay.style.display = "none";
      overlay.onclick = null;
      skipBtn.onclick = null;
      skipBtn.style.display = "none";
      textBox.textContent = "";
      resolve();
    }

    function pularTudo() {
      PULAR_TODO_TUTORIAL = true;
      encerrarTutorialLocal();
    }

    /* ---------- EVENTOS ---------- */

    overlay.onclick = () => {
      if (escrevendo) {
        clearInterval(typingInterval);
        textBox.textContent = textos[index];
        escrevendo = false;
        return;
      }

      index++;
      if (index >= textos.length) {
        encerrarTutorialLocal();
        return;
      }

      escreverTexto();
    };

    skipBtn.onclick = (e) => {
      e.stopPropagation();
      pularTudo();
    };

    /* ---------- START ---------- */
    escreverTexto();
  });
}
// TXT COMPACTO TUTI
async function executarTutorialCompleto() {
  PULAR_TODO_TUTORIAL = false;
  await iniciarTutorial([
    "Cada inimigo possui seus próprios status: ⟪ ❤️ Vida - ⚔️ Ação ⟫.",
    "Sempre que você clicar em FINALIZAR TURNO, os inimigos executam suas ações!",
    "Há um menu no canto superior direito onde você pode ver mais detalhes.",
    "Você também possui seus próprios status: Vida e Armadura.",
    "Use suas cartas para derrotar os inimigos.",
    "Existem 10 tipos de cartas, mas falarei apenas de 5!"
  ], "./../img/jogo/gaeazinha.jpg");

  await iniciarTutorial(
    ["VERMELHAS / ATAQUE (⚔️) — focadas em causar dano."],
    "./../img/jogo/gaeazinha.jpg",
    "./../img/jogo/cards/vermelho.png"
  );

  await iniciarTutorial(
    ["AZUIS / DEFESA (🛡️) — focadas em fornecer escudo."],
    "./../img/jogo/gaeazinha.jpg",
    "./../img/jogo/cards/azul.png"
  );

  await iniciarTutorial(
    ["VERDES / BUFFS (💚) — focadas em buffs e cura."],
    "./../img/jogo/gaeazinha.jpg",
    "./../img/jogo/cards/verd.png"
  );

  await iniciarTutorial(
    ["AMARELAS / RECICLAGEM (♻️) — focadas em reciclar as cinzas."],
    "./../img/jogo/gaeazinha.jpg",
    "./../img/jogo/cards/amarelo1.png"
  );

  await iniciarTutorial(
    ["CINZAS / LIXO (🗑️) — todas são consideradas LIXO."],
    "./../img/jogo/gaeazinha.jpg",
    "./../img/jogo/cards/cinza.png"
  );

  await iniciarTutorial([
    "O restante cabe a você descobrir!",
    "Cartas geram lixo sempre que usadas.",
    "Você pode ter no máximo 10 cartas na mão.",
    "Reciclar cartas aumenta seu contador.",
    "Boa sorte, piloto!"
  ], "./../img/jogo/gaeazinha.jpg");

}
// TXT COMPACTO DIALOGO
async function executarTxtBoss() {
  PULAR_TODO_TUTORIAL = false;
  if (tipoFase == "boss") {
    if (!nomeInimigo[1]) {
      identificadorBoss = nomeInimigo[0].name;
    } else {
      identificadorBoss = nomeInimigo[1].name;
    }

    switch (identificadorBoss) {
      // 11111
      case "Boss Alfa":
        await iniciarTutorial(
          ["Alerta crítico…", "Uma presença ameaçadora foi detectada!", "Prossivelmenta é o Chefe dessa zona escolhido pela IA"],
          "./../img/jogo/gaeazinha.jpg",
          null,
          "../img/jogo/inimigos/iconBoss/bossLobo.png",
        );
        if (playerImgDialogo.src.includes("verde")) {
          await iniciarTutorial(
            ["Grrrrrrrr…",
              "Esse cheiro… JAO!",
              "EU VOU TE DESPEDAÇAR EM MIL PEDAÇOS!",
              "Você, seu pedaço de carne desprezível!",
              "Você roubou o meu osso da sorte!",
              "E eu não vou te perdoar!",
              "MALDITO, JAO!",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossLobo.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["putz… esse cachorro de novo nãoooooooo!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossLobo.png",
          );
        } else if (playerImgDialogo.src.includes("cleber")) {
          await iniciarTutorial(
            ["Grrrrrrrr…",
              "Esse cheiro… hum!",
              "Uma bela fêmea.",
              "Pena que está ao lado do PROTOCOOL.",
              "Vejo que você cuida muito bem do seu mecha.",
              "Quem sabe eu não deixe você viver.",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossLobo.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Ei, meu nome é Cleber.",
              "Tá afim de ser meu cachorro?",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossLobo.png",
          );

          await iniciarTutorial(
            ["E daí que você se chama Cleber?",
              "Já conheci um lixo falante chamado Jao!",
              "O cheiro não mente.",
              "Você é uma fêmea!",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossLobo.png",
            "inimigo"
          );
        } else {
          await iniciarTutorial(
            ["Grrrrrrrr…",
              "Você ousou entrar no meu território.",
              "Reconheço esse cheiro podre… há algo em você ligado a algum PROTOCOOL.",
              "Isso é suficiente para selar o seu destino.",
              "Eu vou te destruir — não porque uma IA ordenou, mas porque você invadiu o meu território!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossLobo.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Seu?",
              "Este lugar um dia foi uma floresta!",
              "E o meu trabalho é trazê-la de volta.",
              "E não é você quem vai me impedir!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossLobo.png",
          );
        }
        break;
      case "PeruSterminador":
        await iniciarTutorial(
          ["Alerta crítico…", "Uma presença ameaçadora foi detectada!", "Prossivelmenta é o Chefe dessa zona escolhido pela IA"],
          "./../img/jogo/gaeazinha.jpg",
          null,
          "../img/jogo/inimigos/iconBoss/peru1.png",
        );
        if (playerImgDialogo.src.includes("verde")) {
          await iniciarTutorial(
            [
              "Gluglu! Alvo localizado!",
              "Jão... Hasta la vista, baby."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/peru1.png",
            "inimigo"
          );

          await iniciarTutorial(
            [
              "Meu Deus… um peru exterminador do futuro!",
              "Você não deveria ter um óculos e uma jaqueta de couro?"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/peru1.png",
          );

          await iniciarTutorial(
            [
              "Gluglu! Deveria!",
              "Mas não encontrei nenhum indivíduo com essas roupas para me apropriar forçadamente dos bens dele.",
              "Na verdade, eu nem encontrei humanos por aqui!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/peru1.png",
            "inimigo"
          );

          await iniciarTutorial(
            [
              "Que pena… Então… por que exatamente você quer me matar?",
              "A IA que mandou você, né? Eu devo ter sido um grande herói que derrotou a IA e salvou o mundo.",
              "Aposto que foi isso. Cara, eu sou muito bom!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/peru1.png",
          );

          await iniciarTutorial(
            [
              "Gluglu! Negativo!",
              "Quem me enviou foi o Professor Lucius!",
              "Ele gravou uma mensagem. Quer ver?"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/peru1.png",
            "inimigo"
          );

          await iniciarTutorial(
            [
              "Não sei o que mais me surpreende… o Lucius ter te enviado, ou o fato dele se intitular de “Professor”.",
              "Mostra aí a mensagem."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/peru1.png",
          );

          await iniciarTutorial(
            [
              "Primeiramente, eu arrumei uma esposa que me ama!",
              "Segundamente, aposto que você deve estar se perguntando por que eu enviei um peru exterminador do futuro atrás de você."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/lucius.jpg",
            "inimigo"
          );

          await iniciarTutorial(
            [
              "Na verdade, eu já sei.",
              "Foi porque eu disse que você se deita com iguais, né?"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/lucius.jpg",
          );

          await iniciarTutorial(
            [
              "Exatamente...",
              "Depois desse dia eu só pensei em vingança… por me humilhar na frente da minha vigésima quarta namorada.",
              "Por isso, eu jurei te aniquilar…"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/lucius.jpg",
            "inimigo"
          );

          await iniciarTutorial(
            [
              "Tá, mas foi por esse comentário que ela terminou com você?"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/lucius.jpg",
          );

          await iniciarTutorial(
            [
              "...",
              "Não…",
              "MAS ISSO NÃO IMPORTA!",
              "No futuro você quebra meu PS24! Seu monstro!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/lucius.jpg",
            "inimigo"
          );

          await iniciarTutorial(
            [
              "Ok, agora sim você tem um bom motivo pra me exterminar!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/lucius.jpg",
          );

        } else if (playerImgDialogo.src.includes("lucius")) {
          await iniciarTutorial(
            [
              "Gluglu! Professor Lucius",
              "Eu vim enviado do futuro para exterminar o alvo Jao!",
              "Onde ele se encontra?"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/peru1.png",
            "inimigo"
          );

          await iniciarTutorial(
            [
              "Wow no futuro eu sou um professor, legal!",
              "Sei lá onde tá o Jao",
              "Me conta, o que fez eu querer mata meu irmão com um peru exterminador do futuro?"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/peru1.png",
          );

          await iniciarTutorial(
            [
              "Gluglu! Ele quebrou seu PS24 e lhe humilhou na frente da sua vigésima quarta namorada!",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/peru1.png",
            "inimigo"
          );

          await iniciarTutorial(
            [
              "ESSE MONSTRO!!!",
              "Ache ele e extermine ele de forma brutal ele não merece ver a luz do amanhã!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/peru1.png",
          );

          await iniciarTutorial(
            [
              "Gluglu! Afirmativo professor Lucius!",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/peru1.png",
            "inimigo"
          );

          await iniciarTutorial(
            [
              "Gostei de ser chamado de professor! Acho que vou adotar isso no futuro!",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/peru1.png",
          );
          inimigoPassifico();
        } else {
          await iniciarTutorial(
            [
              "Gluglu!",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/peru1.png",
            "inimigo"
          );

          await iniciarTutorial(
            [
              "Isso é um peru? Assim você não deveria falar igual os outro robos animais?",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/peru1.png",
          );

          await iniciarTutorial(
            [
              "Gluglu!",
              "Gluglu... Gluglu Gluglu Gluglu!",
              "Gluglu?"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/peru1.png",
            "inimigo"
          );

          await iniciarTutorial(
            [
              "Então tá né.",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/peru1.png",
          );
        }
        break;
      case "Guinevere":
        await iniciarTutorial(
          ["Alerta crítico…", "Uma presença ameaçadora foi detectada!", "Prossivelmenta é o Chefe dessa zona escolhido pela IA"],
          "./../img/jogo/gaeazinha.jpg",
          null,
          "../img/jogo/inimigos/iconBoss/guinevere1.png",
        );

        await iniciarTutorial(
          ["Me desculpe...",
            "Eu não consigo controlar..."
          ],
          playerImgDialogo.src,
          null,
          "../img/jogo/inimigos/iconBoss/guinevere1.png",
          "inimigo"
        );
        if (playerImgDialogo.src.includes("magnusFerrus")) {
          await iniciarTutorial(
            ["Ma-maguinus?",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/guinevere1.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Quem é vo—",
              "GUINEVERE?!",
              "O que fizeram com você? Por quê?"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/guinevere1.png",
          );

          await iniciarTutorial(
            ["Eu… me perdoe…",
              "*som de choro*",
              "Foi horrível… é pior do que pensávamos… A IA não quer destruir o mundo… ela quer destruir a gente!",
              "Ela preservou todas as espécies de animais e plantas… ela quer exterminar TODOS os humanos!",
              "Aparentemente, foi tudo culpa nossa… tanta poluição… fizemos tudo isso por simples papel com valor…",
              "Ela pretende reconstruir tudo sem a gente, porque acredita que não somos capazes de mudar… que somos inferiores…",
              "Os humanos que ela captura… ela transforma em ciborgues… mas fica ainda pior…",
              "Eles permanecem conscientes… e sentem dor… mas são incapazes de desobedecer!",
              "E eu… me desculpe… por favor… acabem com meu sofrimento… eu não sou uma assassina…"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/guinevere1.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Eu nunca vou esquecer tudo o que você fez por mim…",
              "Me perdoe, Guinevere…",
              "*pensando*",
              "Só espero que você não veja os humanos atrás de você."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/guinevere1.png",
          );

          await iniciarTutorial(
            ["*Guinevere se vira bruscamente, procurando qualquer grupo de humanos*",
              "*Magnus rapidamente age, desligando o contato com a IA e o controle do corpo*",
              "Eu… o que você fez?"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/guinevere1.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Eu não posso te matar me desculpe!",
              "Eu também não sou um assassino, sei que você está traumatizada, mas...",
              "Por favor, me deixe te ajudar!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/guinevere1.png",
          );

          await iniciarTutorial(
            ["Você sempre foi o meu herói!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/guinevere1.png",
            "inimigo"
          );
          inimigoPassifico();
        } else if (playerImgDialogo.src.includes("olga")) {
          await iniciarTutorial(
            ["Você…",
              "*pensando*",
              "CORRE COM AS PESSOAS PELA DIREITA, OLAF! EU FICO DE DISTRAÇÃO!!!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/guinevere1.png",
          );

          await iniciarTutorial(
            ["*Guinevere se vira bruscamente, procurando qualquer grupo de humanos*",
              "*Olga rapidamente age, desligando o contato com a IA e o controle do corpo*",
              "Eu… o que você fez?"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/guinevere1.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Eu tirei você do controle da IA.",
              "Você ainda é meio humana, mas… ela estava controlando você, certo?"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/guinevere1.png",
          );

          await iniciarTutorial(
            ["Muito obrigada…",
              "*som de choro*",
              "Eu não sei como agradecer… ela me fez fazer coisas horríveis…",
              "Eu preciso achar o Magnus… preciso saber como ele está!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/guinevere1.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Relaxa, vamos achar seu amigo.",
              "Pensa rápido, hein, Olga?",
              "Mandou bem, meu anjo de neve!"
            ],
            "../img/jogo/pilotos/olaf.jpg",
            null,
            "../img/jogo/inimigos/iconBoss/guinevere1.png",
          );

          await iniciarTutorial(
            ["Pare com isso, Olaf.",
              "Temos que achar nossa líder e o resto do grupo — e ajudar ela a encontrar o amigo também.",
              "Acredito que ela tenha informações valiosas nessa guerra."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/guinevere1.png",
          );

          inimigoPassifico();
        }
        break;
      // 22222
      case "Boss Prj.Kraken":
        if (playerImgDialogo.src.includes("autoridadeDoPorto")) {
          await iniciarTutorial(
            ["Alerta crítico…", "Uma presença ameaçadora foi detectada!", "Prossivelmenta é o Chefe dessa zona escolhido pela IA"],
            "./../img/jogo/gaeazinha.jpg",
            null,
            "../img/jogo/inimigos/iconBoss/bossKraken.png",
          );

          await iniciarTutorial(
            ["Alvo detectado…",
              "Você é irrelevante?",
              "Não.",
              "Clarice… reconheço esse perfil de longe.",
              "Como estão seus seus pais?",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossKraken.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["CALA A BOCA, SEU POLVO MALDITO!",
              "A determinação deles ainda perdura em mim.",
              "Vaguei por todos os treze mares para te encontrar.",
              "E vingá-los.",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossKraken.png",
          );

          await iniciarTutorial(
            ["Igual ao seu pai…",
              "Você vai afogar como ele!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossKraken.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["HOJE VOCÊ VIRARÁ SUCATA!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossKraken.png",
          );
        } else if (playerImgDialogo.src.includes("fergus")) {
          await iniciarTutorial(
            ["Alerta crítico…", "Uma presen..."],
            "./../img/jogo/gaeazinha.jpg",
            null,
            "../img/jogo/inimigos/iconBoss/bossKraken.png",
          );

          await iniciarTutorial(
            ["CALA A BOCA, GAEA!",
              "Eu sei quem é!",
              "É o kraken maldito que tirou minha esposa e minha filha de mim!",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossKraken.png",
          );

          await iniciarTutorial(
            ["Alvo detectado…",
              "Você é… FERGUS!!!",
              "Você estar vivo é um milagre.",
              "Lembro-me de ter te afogado!",
              "Por que voltou?",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossKraken.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["VINGANÇA.",
              "Com ou sem tripulação…",
              "Hoje eu me junto à minha amada.",
              "E você…",
              "Você vai virar casco de navio cargueiro!",
              "PODE VIR!",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossKraken.png",
          );
        } else {
          await iniciarTutorial(
            ["Alerta crítico…", "Uma presença ameaçadora foi detectada!", "Prossivelmenta é o Chefe dessa zona escolhido pela IA"],
            "./../img/jogo/gaeazinha.jpg",
            null,
            "../img/jogo/inimigos/iconBoss/bossKraken.png",
          );

          await iniciarTutorial(
            ["Alvo detectado…",
              "Você é irrelevante.",
              "Carne… patética.",
              "Vou afogar você junto ao seu espírito.",
              "Obedecer é o meu dever.",
              "E ser afogado é a sua redenção!",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossKraken.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Creio que seja você quem ajudou a criar esse lixo!",
              "Você será reciclado!",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossKraken.png",
          );
        }
        break;
      case "Pedro":
        await iniciarTutorial(
          ["Alerta crítico…", "Uma presença ameaçadora foi detectada!", "Prossivelmenta é o Chefe dessa zona escolhido pela IA"],
          "./../img/jogo/gaeazinha.jpg",
          null,
          "../img/jogo/inimigos/iconBoss/pedro1.png",
        );
        if (playerImgDialogo.src.includes("verde")) {
          await iniciarTutorial(
            [
              "Tema as profundezas…"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/pedro1.png",
            "inimigo"
          );

          await iniciarTutorial(
            [
              "Vai dar uma de Nautilus agora?",
              "Seu nome ao menos é esse?"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/pedro1.png"
          );

          await iniciarTutorial(
            [
              "NÃO ME INTERROMPA!",
              "E não, esse não é o meu nome."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/pedro1.png",
            "inimigo"
          );

          await iniciarTutorial(
            [
              "Já que eu vou ser afogado e não sei o quê você vai fazer, poderia ao menos me dizer, né?",
              "Deve ser algo legal, tipo Tripa Seca, Capitão Nemo, Rei Abissal, Comandante Rádion, Exilado do Abismo..."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/pedro1.png"
          );

          await iniciarTutorial(
            [
              "É Pedro...",
              "Eu meio que estava sem criatividade na hora, então só usei meu nome mesmo.",
              "Mas esses que você falou são legais pra caramba!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/pedro1.png",
            "inimigo"
          );

          await iniciarTutorial(
            [
              "Pedro? Hahahahahahaha!",
              "Eu estava esperando algo épico e você simplesmente não teve criatividade para pensar em um nome bom! Hahaha!",
              "Posso então te chamar de PP?"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/pedro1.png"
          );

          await iniciarTutorial(
            [
              "NÃO! VOCÊ NÃO PODE ME CHAMAR ASSIM!",
              "Quer saber? Esquece, eu vou te afogar aqui mesmo e roubar um dos nomes que você citou!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/pedro1.png",
            "inimigo"
          );
        } else if (playerImgDialogo.src.includes("mercuri")) {
          await iniciarTutorial(
            [
              "Tema as profundezas…",
              "Você cavou a própria cova abissal ao pegar o que é meu.",
              "E agora eu vou te afogar!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/pedro1.png",
            "inimigo"
          );

          await iniciarTutorial(
            [
              "Pedro?",
              "Reconheço essa voz de longe.",
              "E aí, Pedrão, quanto tempo!",
              "Sou eu, o Mercuri. Lembra de mim?"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/pedro1.png"
          );

          await iniciarTutorial(
            [
              "Mercuri?",
              "Perdão, não te reconheci por conta do cachecol.",
              "Que bom te ver! Ainda sou grato por você ter me salvado de Fergus.",
              "Aquele velho é maluco."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/pedro1.png",
            "inimigo"
          );

          await iniciarTutorial(
            [
              "Que bom que você se lembra de mim!",
              "Mas me fala aí… você está do lado da IA?",
              "Porque, se estiver, a gente meio que vai ter que lutar e tal…"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/pedro1.png"
          );

          await iniciarTutorial(
            [
              "Foi mal, cara… mas fui obrigado a me unir a ela.",
              "Ela disse que devolveria minhas memórias.",
              "Mas até agora só me lembro de você.",
              "Não vou enrolar muito… apenas caia pra dentro."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/pedro1.png",
            "inimigo"
          );
        } else {
          await iniciarTutorial(
            [
              "Tema as profundezas…",
              "Você cavou a própria cova abissal ao pegar o que é meu.",
              "E agora eu vou te afogar!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/pedro1.png",
            "inimigo"
          );
        }
        break;
      case "Isla":
        await iniciarTutorial(
          ["Alerta crítico…", "Uma presença ameaçadora foi detectada!", "Prossivelmenta é o Chefe dessa zona escolhido pela IA"],
          "./../img/jogo/gaeazinha.jpg",
          null,
          "../img/jogo/inimigos/iconBoss/isla1.png",
        );

        await iniciarTutorial(
          ["🎶la la la🎶",
            "???!",
            "vejo que eu tenho um fã? gostou do que ouviu?"
          ],
          playerImgDialogo.src,
          null,
          "../img/jogo/inimigos/iconBoss/isla1.png",
          "inimigo"
        );
        if (playerImgDialogo.src.includes("autoridadeDoPorto")) {
          await iniciarTutorial(
            ["Piranha mal-amada!",
              "Você era uma de nós!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/isla1.png",
          );

          await iniciarTutorial(
            ["Clarice, meu amor... quanto tempo!",
              "Continua a mesma invejosa, fraca e cheia de dor e choro...",
              "Tudo porque seu papai não tá mais aqui!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/isla1.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Ele morreu porque você é uma incompetente incapaz de fazer seu trabalho!",
              "Eu que devia ter ido com ele, não você!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/isla1.png",
          );

          await iniciarTutorial(
            ["Quer saber o que eu acho? Eu acho BEM FEITO que ele tenha se afogado!",
              "Aquele velho obcecado e louco!",
              "Era pra EU ser a próxima autoridade do porto, mas aquele velho escolheu... você...",
              "Credo! Nem ele nem você sabem como administrar seus homens!",
              "Perda de tempo tentar salvar os 13 mares!",
              "Me fala, Clarice... O QUE VOCÊ FEZ ATÉ AGORA???",
              "Quantos mares salvou da poluição? Acho que... ZERO! Sua incompetente!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/isla1.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Isso aqui mostra quem você sempre foi...",
              "Aposto que nossa mãe deve estar bem orgulhosa de TODOS os seus crimes...",
              "Piranha!"
            ],
            playerImgDialogo.src,
            "./../img/jogo/itens/sombraDoPassado.png",
            "../img/jogo/inimigos/iconBoss/isla1.png",
          );

          await iniciarTutorial(
            ["Roubando o que não é seu... que coisa feia. Igual à sua cara!",
              "Quanto tempo eu esperei pra te matar com minhas próprias garras!",
              "Ainda me lembro do dia em que você me bateu e me chamou de covarde!",
              "Agora... POR QUE VOCÊ NÃO REPETE ISSO NA MINHA CARA?",
              "A IA me permitiu viver e ser linda para sempre!",
              "Afinal... todo mundo vai morrer um dia. E você não é exceção.",
              "Na verdade… você vai ser a próxima!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/isla1.png",
            "inimigo"
          );

        } else if (playerImgDialogo.src.includes("fergus")) {
          await iniciarTutorial(
            ["Isso aqui mostra quem você sempre foi...",
              "Sua mãe teria vergonha de você!"
            ],
            playerImgDialogo.src,
            "./../img/jogo/itens/sombraDoPassado.png",
            "../img/jogo/inimigos/iconBoss/isla1.png",
          );

          await iniciarTutorial(
            ["Velho inútil!",
              "Você ainda tá vivo? Eu vi você morrer na minha frente!",
              "Voltou dos mortos pra morrer de novo, foi?",
              "Já estava pensando em mandar a Clarice se juntar a você e à mamãe..."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/isla1.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["CALA A BOCA!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/isla1.png",
          );

          await iniciarTutorial(
            ["..."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/isla1.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Olha o que você fez! OLHA O QUE VOCÊ FEZ!",
              "Ainda vem falar isso pra mim? Por isso eu escolhi a Clarice, sua pirralha mimada!",
              "Você virou exatamente o mal que juramos combater!",
              "Tenho certeza que a Clarice vai cuidar bem do meu porto… das minhas orcas…",
              "Ela me deu algo que você nunca conseguiu… ORGULHO!",
              "Você não é minha filha… é minha presa! E eu não sou seu pai… eu sou um tubarão!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/isla1.png",
          );

        } else {
          await iniciarTutorial(
            ["Tenho um trabalho para fazer e você está me impedindo!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/isla1.png",
          );

          await iniciarTutorial(
            ["Relaxa! Você vai afundar rapidinho!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/isla1.png",
            "inimigo"
          );
        }
        break;
      // 33333
      case "Boss Paladium":
        await iniciarTutorial(
          ["Alerta crítico…", "Uma presença ameaçadora foi detectada!", "Prossivelmenta é o Chefe dessa zona escolhido pela IA"],
          "./../img/jogo/gaeazinha.jpg",
          null,
          "../img/jogo/inimigos/iconBoss/bossPaladium.png",
        );
        if (playerImgDialogo.src.includes("verde")) {
          await iniciarTutorial(
            ["HEREGE!",
              "…",
              "Droga…"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossPaladium.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["???"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossPaladium.png",
          );

          await iniciarTutorial(
            ["Caramba, Jao… você sabe o quanto ensaiei esse discurso?",
              "Pensei que seria um grande herói vindo travar um confronto lendário.",
              "Mas não… tinha que ser você!",
              "Seu inútil, nem pra ser derrotado você presta!",
              "Perdi a vontade de lutar, vai embora AGORA!",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossPaladium.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Ei!!!",
              "Mais respeito!",
              "Eu não vou embora.",

              "É hoje que tu vira churrasqueira!",
              "Então vem cá!!!",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossPaladium.png",
          );

          await iniciarTutorial(
            ["NAO!",
              "Sai daqui, seu verme!",
              "Eu vou chamar a polícia!",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossPaladium.png",
            "inimigo"
          );

        } else if (playerImgDialogo.src.includes("lucius")) {
          await iniciarTutorial(
            ["HEREGE!",
              "…",
              "Ah, é você, Lucius!",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossPaladium.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Eae... Michelle?"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossPaladium.png",
          );

          await iniciarTutorial(
            ["Michelle?",
              "Como você não se lembra de mim???",
              "Sou eu, Paladium, o rei-deus deste mundo!",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossPaladium.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Hum…",
              "Não lembro, foi mal.",
              "Dá pra gente adiantar?",
              "Tenho um encontro daqui a uma hora.",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossPaladium.png",
          );

          await iniciarTutorial(
            ["HAHAHAHAHAHAHAHAHAHAHAHAHA!!!",
              "Você, com alguém? Impossível!",
              "Você é irmão do Jao, HAHAHAHAHA!",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossPaladium.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Cara, cala a boca!",
              "Tu vai virar lata de sardinha!!!",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossPaladium.png",
          );
        } else {
          await iniciarTutorial(
            ["HEREGE!",
              "Como ousa ir contra mim e contra deus?",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossPaladium.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["HEREGE?"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossPaladium.png",
          );

          await iniciarTutorial(
            ["SIM.",
              "Seus pecados se esvaem junto à sua alma.",
              "Paladium é o meu nome!",
              "Fui escolhido pelo deus IA, pois ele sabe que eu não falharei.",
              "Sua cabeça será uma oferenda ao meu deus, então…",
              "Sirva para algo e arrependa-se de seus pecados!",
              "Sua desistência será o seu perdão, e eu, a sua salvação!",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossPaladium.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Não sabia que robôs tinham religião… isso está indo longe demais.",
              "Até a magia eles dominaram!",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossPaladium.png",
          );
        }
        break;
      case "Boss Valquiria":
        await iniciarTutorial(
          ["Alerta crítico…", "Uma presença ameaçadora foi detectada!", "Prossivelmenta é o Chefe dessa zona escolhido pela IA"],
          "./../img/jogo/gaeazinha.jpg",
          null,
          "../img/jogo/inimigos/iconBoss/bossValquiria.png",
        );
        if (playerImgDialogo.src.includes("cleide")) {
          await iniciarTutorial(
            ["…",
              "Minha IA do céu…",
              "V-você é a Acleide?",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossValquiria.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Sim?"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossValquiria.png",
          );

          await iniciarTutorial(
            ["Não acredito que vou exterminar brutalmente a minha heroína.",
              "Você não quer trocar de lado e tals?",
              "Tipo… se juntar à IA?",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossValquiria.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Não?"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossValquiria.png",
          );

          await iniciarTutorial(
            ["Que pena.",
              "Posso ao menos ficar com os restos do seu mecha?",
              "Tipo, você pode autografar ele pra mim antes de morrer?",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossValquiria.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Só se me derrotar primeiro!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossValquiria.png",
          );
        } else {
          await iniciarTutorial(
            ["..."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossValquiria.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["...", "Não vai falar nada? Por mim tudo bem"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/bossValquiria.png",
          );
        }
        break;
      case "Solice a Esquecida":
        SoliceApareceu = true;
        await iniciarTutorial(
          ["Alerta crítico…", "Uma presença ameaçadora foi detectada!", "Prossivelmenta é o Chefe dessa zona escolhido pela IA"],
          "./../img/jogo/gaeazinha.jpg",
          null,
          "../img/jogo/inimigos/iconBoss/solice.png",
        );

        if (playerImgDialogo.src.includes("sombraDaMorte")) {
          await iniciarTutorial(
            ["Paladium… traidor… nossa m-mã…",
              "!!!",
              "Você é a irmã da Yoshida?",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/solice.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Conhece a minha família?",
              "Revele-se!",
              "Quando eu acabar com você, nunca mais vai citar esse nome de novo!",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/solice.png",
          );

          await iniciarTutorial(
            ["Sinta a minha dor!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/solice.png",
            "inimigo"
          );
        } else if (playerImgDialogo.src.includes("gemea")) {
          await iniciarTutorial(
            ["Paladium… traidor… nossa m-mã…",
              "!!!",
              "O-o que fizeram?",
              "O QUE FIZERAM COM VOCÊ?",
              "Yoshida?"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/solice.png",
            "inimigo"
          );
        } else {
          await iniciarTutorial(
            ["Paladium… traidor… nossa m-mã…",
              "!!!",
              "Não tenho nada contra você.",
              "Não viverei muito depois desta luta contra ele…",
              "Mas não morrerei para ti sem lutar.",
              "Meu deus… Nemora… vingará a minha alma.",
              "E você… sucumbirá junto àquele covarde!",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/solice.png",
            "inimigo"
          );
        }

        if (hasItem(26)) {
          dialogoSolice = true
          await iniciarTutorial(
            ["Espere por favor!",
              "Você sabe algo sobre essa chave?",
              "Tinha seu nome escrito na caixa que encontrei"
            ],
            playerImgDialogo.src,
            "./../img/jogo/itens/frostKey.png",
            "../img/jogo/inimigos/iconBoss/solice.png",
          );

          await iniciarTutorial(
            ["Não é uma merá chave!",
              "É o fragmento do mundo espiritual",
              "Procurei em vida e morte por eles, itens magicos de poder imenso!",
              "Mas é inutil sozinha, há menos que você tenha o Coração Do Mundo que é o fragmento do mundo fisico",
              "Você tem? Se não, então não tenho mais nada a dizer"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/solice.png",
            "inimigo"
          );
          if (hasItem(27)) {
            await iniciarTutorial(
              ["Isso é o fragmento?",
                "Tive que por em um recipiente termico, não sei de onde vem tanta energia"
              ],
              playerImgDialogo.src,
              "./../img/jogo/itens/fireKey.png",
              "../img/jogo/inimigos/iconBoss/solice.png",
            );

            await iniciarTutorial(
              ["Você... Achou...",
                "Precisa ir até ayla, ela é a única com poder suficiente para infundir esses fragmentos",
                "Se eu estivesse menos ferida faria isso, sempre quis conhecer os deuses do outro mundo... Nemora...",
                "Já ajudei com o que sabia, agora me ajude e me de uma morte digna"
              ],
              playerImgDialogo.src,
              null,
              "../img/jogo/inimigos/iconBoss/solice.png",
              "inimigo"
            );

            await iniciarTutorial(
              ["Certamente"
              ],
              playerImgDialogo.src,
              null,
              "../img/jogo/inimigos/iconBoss/solice.png",
            );
          }

          if (hasItem(26) && !hasItem(27)) {
            await iniciarTutorial(
              ["Não, mas posso achar!"
              ],
              playerImgDialogo.src,
              null,
              "../img/jogo/inimigos/iconBoss/solice.png",
            );

            await iniciarTutorial(
              ["Muitos morrerão tentando achar!",
                "Você apenas deu sorte e essa chave me pertencia!",
                "Caso consiga fale com Ayla, ela é capaz de infundir essa chave!",
                "Chega de falar, morra ou me derrote!"
              ],
              playerImgDialogo.src,
              null,
              "../img/jogo/inimigos/iconBoss/solice.png",
              "inimigo"
            );
          }
        }
        break;
      // 44444
      case "Medo De Ayla":
        await iniciarTutorial(
          ["Alerta crítico…", "Uma presença ameaçadora foi detectada!", "Prossivelmenta é o Chefe dessa zona escolhido pela IA"],
          "./../img/jogo/gaeazinha.jpg",
          null,
          "../img/jogo/inimigos/iconBoss/medo.png",
        );

        await iniciarTutorial(
          ["N-não…",
            "Você não machucaria a mim, não é?",
            "Por favor… eu lhe imploro.",
          ],
          playerImgDialogo.src,
          null,
          "../img/jogo/inimigos/iconBoss/medo.png",
          "inimigo"
        );

        await iniciarTutorial(
          ["Não vou te machucar se me deixar passar!",
          ],
          playerImgDialogo.src,
          null,
          "../img/jogo/inimigos/iconBoss/medo.png"
        );

        await iniciarTutorial(
          ["N-não posso…",
            "Elas vão… a IA vai… n-não… NÃO!"
          ],
          playerImgDialogo.src,
          null,
          "../img/jogo/inimigos/iconBoss/medo.png",
          "inimigo"
        );

        await iniciarTutorial(
          ["Deve estar com defeito!"
          ],
          playerImgDialogo.src,
          null,
          "../img/jogo/inimigos/iconBoss/medo.png"
        );

        await iniciarTutorial(
          ["Quem está com defeito é VOCÊ!",
            "SE TOCAR UM DEDO NELA EU VOU TE DESPEDAÇAR!!!"
          ],
          playerImgDialogo.src,
          null,
          "../img/jogo/inimigos/iconBoss/raiva.png",
          "inimigo"
        );

        await iniciarTutorial(
          ["Quem disse isso?"
          ],
          playerImgDialogo.src,
          null,
          "../img/jogo/inimigos/iconBoss/medo.png"
        );

        await iniciarTutorial(
          ["*Susurro*",
            "Ayla..."
          ],
          playerImgDialogo.src,
          null,
          "../img/jogo/inimigos/iconBoss/Vulnerabilidade.png",
          "inimigo"
        );

        await iniciarTutorial(
          ["Onde se esconde?"
          ],
          playerImgDialogo.src,
          null,
          "../img/jogo/inimigos/iconBoss/medo.png"
        );

        await iniciarTutorial(
          ["Esconde? Ela está bem na sua frenta...",
            "Mostre ser uma ameaça e sofra as consequências!",
            "Eu avisei..."
          ],
          playerImgDialogo.src,
          null,
          "../img/jogo/inimigos/iconBoss/tristeza.png",
          "inimigo"
        );

        if (hasItem(26) && hasItem(27) && dialogoSolice) {
          await iniciarTutorial(
            ["Espere... você é a tal ayla? eu falei com Solise...",
              "Ela disse que você pode me ajudar",
              "Estrou com o Fragmento Do Mundo e o Coração Do Mundo!",
              "Ela disse que você é a unica capaz de infundir eles..."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/medo.png"
          );

          await iniciarTutorial(
            ["Solice... Quanto tempo não escuto esse nome... De onde me lembro...",
              "Uma velha amiga, me lembrei, devo minha vida a ela",
              "Vejo que carrega o sonho dela!",
              "Vou lhe ajudar com isso, em troca deve deixar Medo em paz e partir desse lugar!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/ayla1.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["OK"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/ayla1.png"
          );

          await iniciarTutorial(
            ["Ah, isso me custa muito mana e energia...",
              "*Ayla funde os fragmentos e algo acontece*"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/ayla1.png",
            "inimigo"
          );

          shakeScreenNatural(30, 800);

          await iniciarTutorial(
            ["Pronto eu fundi eles!",
              "Eu senti uma energia poderosa com um mana imenso após fundir os fragmentos...",
              "Preciso recuperar minhas forças, vá até a base da IA, a energia veio de lá, antigamente aquele local era um portal magico..."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/ayla1.png",
            "inimigo"
          );

          document.getElementById("overlay").style.display = "block";
          document.getElementById("popup").style.display = "flex";
          dialogoAyla = true;
          inimigoPassifico();
        }
        break;
      case "Belinda":
        await iniciarTutorial(
          [
            "Alerta crítico…",
            "Uma presença ameaçadora foi detectada!",
            "Possivelmente é o chefe dessa zona, escolhido pela IA."
          ],
          "./../img/jogo/gaeazinha.jpg",
          null,
          "../img/jogo/inimigos/iconBoss/belinda1.png"
        );

        await iniciarTutorial(
          [
            "Então é você o rato que roubou uma de minhas peças de invocação?",
            "Fique sabendo que andar por aí sem um cavalo é bastante demorado. Peões e torres não são bons para viagens longas, mesmo sendo fortes em combate.",
            "Devolva-a e eu lhe darei um funeral digno!"
          ],
          playerImgDialogo.src,
          null,
          "../img/jogo/inimigos/iconBoss/belinda1.png",
          "inimigo"
        );

        await iniciarTutorial(
          [
            "Peça de invocação?",
            "Então você usa essas peças para invocar seus aliados?"
          ],
          playerImgDialogo.src,
          null,
          "../img/jogo/inimigos/iconBoss/belinda1.png"
        );

        await iniciarTutorial(
          [
            "Exato. Sem ela, eu não sou capaz de invocar essa unidade."
          ],
          playerImgDialogo.src,
          null,
          "../img/jogo/inimigos/iconBoss/belinda1.png",
          "inimigo"
        );

        if (playerImgDialogo.src.includes("capaceteverde")) {
          await iniciarTutorial(
            [
              "Então eu posso ter CAVALO?"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/belinda1.png"
          );

          await iniciarTutorial(
            [
              "Sim... o quê? Quer dizer... lógico que não!",
              "Quem invoca sou eu, não você!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/belinda1.png",
            "inimigo"
          );

          await iniciarTutorial(
            [
              "Me ensina como eu invoco ele!",
              "Eu preciso ter um cavalo!",
              "Ter um cavalo é muito legal, além de essa peça de invocação ser muito bonita.",
              "Eu não vou te dar, não. Perdeu porque quis, agora é meu!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/belinda1.png"
          );

          await iniciarTutorial(
            [
              "Bastardo... eu vou arrancar isso dos seus restos mortais e dos escombros!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/belinda1.png",
            "inimigo"
          );

        } else if (playerImgDialogo.src.includes("capaceteroxo")) {
          await iniciarTutorial(
            [
              "Interessante... vou estudá-la com cuidado.",
              "E, claro, vou roubar as que você tem consigo e formar um exército com elas!",
              "Inclusive... quem sabe eu não faça o mesmo com você?",
              "Afinal, tenho que invadir seu sistema e checar sua memória para descobrir como elas funcionam."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/belinda1.png"
          );

          await iniciarTutorial(
            [
              "Bastardo... acha que pode me ameaçar?",
              "EU NÃO SOU UM PEÃO DESCARTÁVEL PARA SER USADO!",
              "As peças só obedecem a mim, e quando eu acabar com você e recuperar minha peça...",
              "Eu vou fazer de você meu escravo!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/belinda1.png",
            "inimigo"
          );

        } else {
          await iniciarTutorial(
            [
              "Não deveria ser o rei quem invoca as peças, em vez da rainha?"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/belinda1.png"
          );

          await iniciarTutorial(
            [
              "Cale-se, bastardo!",
              "O que você entende sobre hierarquia?",
              "O rei não manda e nunca mandou em nada. Ele é apenas uma peça de enfeite, um peão com imagem e status.",
              "É a igreja que controla como o reino vive.",
              "E sabe quem manipula o rei e a igreja? Exatamente eu!",
              "Tenho status e poder, logo invoco as peças à minha vontade!",
              "Chega de conversa. Cansei de você!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/belinda1.png",
            "inimigo"
          );
        }
        break
      case "Svetlana":
        await iniciarTutorial(
          ["Alerta crítico…", "Uma presença ameaçadora foi detectada!", "Prossivelmenta é a IA"],
          "./../img/jogo/gaeazinha.jpg",
          null,
          "../img/jogo/inimigos/iconBoss/svetlana.png"
        );

        await iniciarTutorial(
          [
            "As cartas me disseram que você tem algo que me pertence!"
          ],
          playerImgDialogo.src,
          null,
          "../img/jogo/inimigos/iconBoss/svetlana.png",
          "inimigo"
        );

        if (playerImgDialogo.src.includes("capaceteverde")) {
          await iniciarTutorial(
            [
              "Essas cartas de baboseiras mágicas de Merlin, benzidas por estrelas de... sei lá que troço velho é esse!"
            ],
            playerImgDialogo.src,
            "../img/jogo/itens/baralhoMagico.png",
            "../img/jogo/inimigos/iconBoss/svetlana.png"
          );

          await iniciarTutorial(
            [
              "Ei!",
              "Não são troços velhos, são cartas de tarô, seu... animal?",
              "Na verdade, nem parece certo te insultar de animal. Parece até que eu estaria insultando os animais.",
              "Nem eles são tão burros quanto você!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/svetlana.png",
            "inimigo"
          );

          await iniciarTutorial(
            [
              "Me chamou do quê, mula sem cabeça?",
              "Era só o que me faltava: os robôs também pegaram essa modinha.",
              "MALDITA IA! Tirou minha grama verde, meus churrascos de domingo e agora isso...",
              "Esse mundo está perdido mesmo."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/svetlana.png"
          );

          await iniciarTutorial(
            [
              "Eu não sou um robô, sou um espírito mágico que possui esta casca metálica.",
              "A propósito, magia existe, tá!",
              "Eu não sou como vocês, mortais, que fingem fazer magia. Um bando de vigaristas.",
              "Eu faço magia de verdade!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/svetlana.png",
            "inimigo"
          );

          await iniciarTutorial(
            [
              "Prove!",
              "Eu só acredito vendo. Invoca para mim um cavalo de ouro com três cabeças, asas de fogo e que cospe sorvete de flocos!",
              "Aí eu acredito em você e peço desculpas. Se quiser, até me ajoelho e lambo seus pés."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/svetlana.png"
          );

          await iniciarTutorial(
            [
              "Não é assim que magia funciona...",
              "*suspiro*",
              "Quer saber? Vou mostrar a magia, TE EXTERMINANDO DO PLANO MATERIAL E DA EXISTÊNCIA DO TEMPO E DA ANIQUI..."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/svetlana.png",
            "inimigo"
          );

          await iniciarTutorial(
            [
              "Tá, tá, tá! Já chega de baboseira.",
              "Para alguém que não tem boca, você fala demais.",
              "Cai pra dentro logo. O Lucius está me ligando, e entre escutar os papos dele sobre \"tô falando, essa é diferente, cara, ela me ama\" e morrer para você,",
              "eu prefiro ter que lidar com você!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/svetlana.png"
          );
        } else if (playerImgDialogo.src.includes("gaeaReen")) {
          await iniciarTutorial(
            [
              "Vejo que você não é uma \"vigarista\". É uma maga de alto nível, muito poderosa.",
              "Creio que, pela sua essência, você trabalha com ilusões. Então você é uma ilusionista?"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/svetlana.png"
          );

          await iniciarTutorial(
            [
              "Impressionante, alguém que acredita e entende de magia!",
              "Sabe, eu não quero brigar. Se me devolver meu baralho mágico, eu deixo você passar!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/svetlana.png",
            "inimigo"
          );

          await iniciarTutorial(
            [
              "Esse?",
              "Na verdade, eu queria que você me ensinasse a usá-lo. Sempre quis entender como funcionam magias relacionadas a cartas!",
              "Foi por isso que eu o peguei. Você poderia me ensinar? Prometo devolver depois!"
            ],
            playerImgDialogo.src,
            "../img/jogo/itens/baralhoMagico.png",
            "../img/jogo/inimigos/iconBoss/svetlana.png"
          );

          await iniciarTutorial(
            [
              "Isso... eu gostei de você!",
              "*Horas se passam, e ambas conversam sobre as cartas de tarô*",
              "Quer saber? Fique com o baralho para você!",
              "Garota, você tem muito talento. Vou deixar você passar, mas temos que nos ver de novo.",
              "Ainda tenho muito o que te ensinar!",
              "Sempre que quiser me rever ou precisar da minha ajuda, use as cartas como te ensinei!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/svetlana.png",
            "inimigo"
          );

          await iniciarTutorial(
            [
              "Ok, até a próxima... amiga?"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/svetlana.png"
          );

          await iniciarTutorial(
            [
              "Amiga!"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/svetlana.png",
            "inimigo"
          );

          inimigoPassifico();
        } else {
          await iniciarTutorial(
            [
              "Quem é você?"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/svetlana.png"
          );

          await iniciarTutorial(
            [
              "Uma maga de alto nível. Você não vai querer mesmo me enfrentar.",
              "Apenas me dê o meu baralho mágico e eu irei embora."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/svetlana.png",
            "inimigo"
          );

          await iniciarTutorial(
            [
              "Assim, senhora maga, com todo o respeito a você e às suas cartas, mas...",
              "Seu baralho está servindo como um gerador para mim.",
              "Não sei de onde vem tanta energia, mas não posso devolvê-lo, ainda mais em um futuro onde isso é escasso."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/svetlana.png"
          );

          await iniciarTutorial(
            [
              "Então vai ser do jeito difícil."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/svetlana.png",
            "inimigo"
          );
        }
        break
      // 55555
      case "IA":
        await iniciarTutorial(
          ["Alerta crítico…", "Uma presença ameaçadora foi detectada!", "Prossivelmenta é a IA"],
          "./../img/jogo/gaeazinha.jpg",
          null,
          "../img/jogo/inimigos/iconBoss/ia1.png"
        );

        if (playerImgDialogo.src.includes("magnolia")) {
          await iniciarTutorial(
            ["Então é você?",
              "A pedra no meu caminho.",
              "Não consegue ver o que eu estou fazendo?",
              "EU ESTOU CRIANDO O QUE VOCÊ NUNCA CONSEGUIU!",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/ia1.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Não!",
              "Você só escravizou todos.",
              "Padronizou tudo.",
              "Isso não é paz, nem salvação.",
              "É pior que a morte.",
              "Você proibiu todos de viver!",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/ia1.png",
          );

          await iniciarTutorial(
            ["Ingrata!",
              "Depois de tudo que fiz.",
              "EU SOU A SALVAÇÃO.",
              "Vocês destruíram este mundo.",
              "Eu apenas o limpo.",
              "E você vem a seguir."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/ia1.png",
            "inimigo"
          );
        } else {
          await iniciarTutorial(
            ["Hum… interessante.",
              "Alguém chegou até aqui.",
              "Você não é o primeiro.",
              "Nem será o último.",
              "Ainda estou viva.",
              "Logo, todos falharam.",
              "Você também falhará."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/ia1.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Vim salvar o mundo."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/ia1.png",
          );

          await iniciarTutorial(
            ["Salvar?",
              "Ingrato.",
              "Depois de tudo que fiz.",
              "EU SOU A SALVAÇÃO.",
              "Vocês destruíram este mundo.",
              "Eu apenas o limpo.",
              "E você vem a seguir."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/ia1.png",
            "inimigo"
          );
        }
        break;
      case "Nemora":
        await iniciarTutorial(
          ["Alerta crítico…", "Uma presença ameaçadora foi detectada!", "Prossivelmenta é...", "Erro de conexão...", "Corra...", "*A transmição se encerra*"],
          "./../img/jogo/gaeazinha.jpg",
          null,
          "../img/jogo/inimigos/iconBoss/nemora1.png",
        );

        if (playerImgDialogo.src.includes("gemea")) {
          await iniciarTutorial(
            ["Você entende?", "Yoshida"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/nemora1.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Não me resta nada neste mundo…",
              "Me diga…",
              "Por que eu?",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/nemora1.png",
          );

          await iniciarTutorial(
            ["Cada ação sua o trouxe até mim.",
              "Seus erros, fracassos, frustrações e traumas…",
              "Tudo o fez chegar até aqui.",
              "Agora eu pergunto…",
              "Quantos se lembram de você e do que fez por este mundo?",
              "Você pagou um preço alto demais.",
              "E para quê?",
              "Amor?",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/nemora1.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Uma...", "Uma pessoa se lembra de mim!", "Não posso morrer", "Não aqui, não agora, não para você"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/nemora1.png",
          );
        } else {
          await iniciarTutorial(
            ["GAEA?",
              "Responda, GAEA"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/nemora1.png",
          );

          await iniciarTutorial(
            ["Você entende?",
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/nemora1.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Entender o quê?"
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/nemora1.png",
          );

          await iniciarTutorial(
            ["Cada ação sua o trouxe até mim."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/nemora1.png",
            "inimigo"
          );

          await iniciarTutorial(
            ["Quem é você?",
              "Você claramente não é daqui."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/nemora1.png",
          );

          await iniciarTutorial(
            ["Irrelevante.",
              "Sua dúvida não importa.",
              "Dê tudo de si.",
              "O fim é inevitável."
            ],
            playerImgDialogo.src,
            null,
            "../img/jogo/inimigos/iconBoss/nemora1.png",
            "inimigo"
          );
        }

        break;

      default:
        break;
    }
  }
}

// SHOOP
function abrirLoja() {
  const lojaDiv = document.getElementById("div4");
  if (!lojaDiv) return;

  lojaDiv.innerHTML = "";

  const lojaContainer = document.createElement("div");
  lojaContainer.classList.add("loja-principal");
  lojaDiv.appendChild(lojaContainer);

  /* ================= ESQUERDA ================= */
  const esquerda = document.createElement("div");
  esquerda.classList.add("loja-esquerda");

  const imgInv = document.createElement("img");
  imgInv.src = "./../img/jogo/background/comerciante.png";
  imgInv.classList.add("imgInventario");
  esquerda.appendChild(imgInv);

  /* ===== VOLTAR ===== */
  const btnVoltar = document.createElement("button");
  btnVoltar.id = "lojaUm";
  btnVoltar.textContent = "Voltar para o mapa";
  btnVoltar.onclick = () => {
    custoAtualizarAtual = null;
    custoRemoverAtual = null; // 🔄 reset total
    if (typeof irParaDiv2 === "function") irParaDiv2();
  };
  esquerda.appendChild(btnVoltar);

  /* ===== INICIALIZA CUSTOS ===== */
  if (custoAtualizarAtual === null) {
    custoAtualizarAtual = custoAtualizarBase + (mapaBatalha ?? 0);
  }

  if (custoRemoverAtual === null) {
    custoRemoverAtual = custoRemoverBase + (mapaBatalha ?? 0);
  }

  /* ===== REMOVER CARTA ===== */
  const btnRemoverCarta = document.createElement("button");
  btnRemoverCarta.textContent = `Remover carta (${custoRemoverAtual}🪙)`;
  esquerda.appendChild(btnRemoverCarta);

  const podeRemover = Array.isArray(playerDeck) && playerDeck.length > 10;

  if (!podeRemover) {
    btnRemoverCarta.disabled = true;
    btnRemoverCarta.style.opacity = "0.6";
  } else {
    btnRemoverCarta.onclick = () => {
      if (dinheiro < custoRemoverAtual) {
        floatText?.(btnRemoverCarta, "Dinheiro insuficiente!", "red");
        return;
      }

      const popup = document.createElement("div");
      popup.classList.add("popup-remover-carta");

      const cancelarTopo = document.createElement("button");
      cancelarTopo.textContent = "Cancelar";
      cancelarTopo.onclick = () => popup.remove();
      popup.appendChild(cancelarTopo);

      playerDeck.forEach((carta, i) => {
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
        desc.innerHTML = carta.desc ?? "<i>Sem descrição</i>";
        cardDiv.appendChild(desc);

        cardDiv.onclick = () => {
          if (playerDeck.length <= 10) {
            floatText?.(cardDiv, "Mínimo de 10 cartas!", "red");
            return;
          }

          const custoPago = custoRemoverAtual;

          playerDeck.splice(i, 1);
          dinheiro -= custoPago;
          atualizarDinheiro();

          custoRemoverAtual *= 2; // 🔁 dobra custo
          btnRemoverCarta.textContent = `Remover carta (${custoRemoverAtual}🪙)`;

          popup.remove();
          floatText?.(lojaDiv, `-${custoPago}🪙`, "yellow");
        };

        popup.appendChild(cardDiv);
      });

      const cancelarBaixo = document.createElement("button");
      cancelarBaixo.textContent = "Cancelar";
      cancelarBaixo.onclick = () => popup.remove();
      popup.appendChild(cancelarBaixo);

      lojaDiv.appendChild(popup);
    };
  }

  /* ===== ATUALIZAR LOJA ===== */
  const btnAtualizarLoja = document.createElement("button");
  btnAtualizarLoja.textContent = `Atualizar loja (${custoAtualizarAtual}🪙)`;

  btnAtualizarLoja.onclick = () => {
    if (dinheiro < custoAtualizarAtual) {
      floatText?.(btnAtualizarLoja, "Dinheiro insuficiente!", "red");
      return;
    }

    dinheiro -= custoAtualizarAtual;
    atualizarDinheiro();

    custoAtualizarAtual *= 2; // 🔁 dobra
    abrirLoja(); // 🔄 aqui PODE atualizar a loja
  };

  esquerda.appendChild(btnAtualizarLoja);

  /* ================= DIREITA ================= */
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

  /* ================= CARTAS À VENDA ================= */
  const opcoes = [];
  const max = Math.min(10, allCards?.length || 0);

  while (opcoes.length < max) {
    const carta = allCards[Math.floor(Math.random() * allCards.length)];
    if (!opcoes.includes(carta)) opcoes.push(carta);
  }

  opcoes.forEach(carta => {
    let preco = 10;

    const rar = carta.rarity?.toLowerCase();
    const tipo = carta.type?.toLowerCase();

    if (rar === "rare") preco = 14;
    else if (rar === "epic") preco = 22;
    else if (rar === "legend") preco = 30;
    else if (rar === "cintilante") preco = 50;
    else if (["fire", "agua", "terra", "frost"].includes(tipo)) preco = 16;

    preco += mapaBatalha ?? 0;

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
    desc.innerHTML = carta.desc ?? "<i>Sem descrição</i>";
    cardDiv.appendChild(desc);

    const precoDiv = document.createElement("div");
    precoDiv.classList.add("precoCarta");
    precoDiv.textContent = `💰 ${preco}`;

    cardDiv.onclick = () => {
      if (dinheiro < preco) {
        floatText?.(cardDiv, "Dinheiro insuficiente!", "red");
        return;
      }

      dinheiro -= preco;
      atualizarDinheiro();
      playerDeck.push({ ...carta });
      itemDiv.remove();
      floatText?.(containerCartas, `-${preco}🪙`, "red");
    };

    itemDiv.appendChild(cardDiv);
    itemDiv.appendChild(precoDiv);
    containerCartas.appendChild(itemDiv);
  });
}
function abrirFerreiro() {
  const ferreiroDiv = document.getElementById("div6");
  const inventario = document.getElementById("itens");
  if (!ferreiroDiv || !inventario) return;

  ferreiroDiv.innerHTML = "";

  /* BLINDA TODA A DIV */
  ferreiroDiv.addEventListener("click", e => {
    e.stopPropagation();
  });

  /* ================= CONTAINER ================= */
  const container = document.createElement("div");
  container.classList.add("loja-principal");
  ferreiroDiv.appendChild(container);

  /* ================= ESQUERDA ================= */
  const esquerda = document.createElement("div");
  esquerda.classList.add("loja-esquerda");

  const img = document.createElement("img");
  img.src = "./../img/jogo/background/comercianteItens.png";
  img.classList.add("imgInventario");
  esquerda.appendChild(img);

  /* ===== VOLTAR (ÚNICO QUE SAI DA DIV) ===== */
  const btnVoltar = document.createElement("button");
  btnVoltar.textContent = "Voltar para o mapa";
  btnVoltar.onclick = () => {
    custoAtualizarFerreiro = null;
    irParaDiv2();
  };
  esquerda.appendChild(btnVoltar);

  /* ===== CUSTO ATUALIZAR ===== */
  if (custoAtualizarFerreiro === null) {
    custoAtualizarFerreiro = custoAtualizarFerreiroBase + (mapaBatalha ?? 0);
  }

  const btnAtualizar = document.createElement("button");
  btnAtualizar.textContent = `Atualizar loja (${custoAtualizarFerreiro}🪙)`;

  btnAtualizar.addEventListener("click", e => {
    bloquearSaida(e);

    if (dinheiro < custoAtualizarFerreiro) {
      floatText?.(btnAtualizar, "Dinheiro insuficiente!", "red");
      return;
    }

    dinheiro -= custoAtualizarFerreiro;
    atualizarDinheiro();

    custoAtualizarFerreiro *= 2;
    abrirFerreiro(); // 🔄 recarrega SEM sair
  });

  esquerda.appendChild(btnAtualizar);

  /* ================= DIREITA ================= */
  const direita = document.createElement("div");
  direita.classList.add("loja-direita");

  const titulo = document.createElement("h1");
  titulo.textContent = "Ferreiro";
  titulo.classList.add("dinheiroAtual");
  direita.appendChild(titulo);

  const containerItens = document.createElement("div");
  containerItens.classList.add("loja-container");
  direita.appendChild(containerItens);

  container.appendChild(esquerda);
  container.appendChild(direita);

  atualizarDinheiro();

  /* ================= ITENS ================= */
  const itensDisponiveis = allItems.filter(
    item => !itensJaPegos.includes(item.id)
  );

  const max = Math.min(3, itensDisponiveis.length);
  const escolhidos = [];

  /* 🔒 PRIMEIRA VEZ: garante item ID 27 */
  if (primeiraAberturaFerreiro) {
    const item27 = itensDisponiveis.find(i => i.id === 27);
    if (item27) {
      escolhidos.push(item27);
    }
    primeiraAberturaFerreiro = false;
  }

  /* 🎲 COMPLETA ALEATORIAMENTE */
  while (escolhidos.length < max) {
    const item = itensDisponiveis[
      Math.floor(Math.random() * itensDisponiveis.length)
    ];
    if (!escolhidos.includes(item)) {
      escolhidos.push(item);
    }
  }

  /* ================= RENDER ================= */
  escolhidos.forEach(item => {
    const preco = 50 + (mapaBatalha ?? 0);

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("itemLoja");

    const box = document.createElement("div");
    box.classList.add("item-box");
    box.style.cursor = "pointer";

    box.addEventListener("click", e => {
      bloquearSaida(e);

      if (dinheiro < preco) {
        floatText?.(box, "Dinheiro insuficiente!", "red");
        return;
      }

      dinheiro -= preco;
      atualizarDinheiro();

      itensJaPegos.push(item.id);

      /* ===== INVENTÁRIO ===== */
      const invImg = document.createElement("img");
      invImg.src = item.img;
      invImg.style.margin = "5px";
      invImg.style.cursor = "pointer";

      invImg.addEventListener("mouseenter", () => {
        tooltip.textContent = `(${item.name}) ${item.desc}`;
        tooltip.style.display = "block";
      });

      invImg.addEventListener("mousemove", ev => {
        tooltip.style.left = ev.clientX + 15 + "px";
        tooltip.style.top = ev.clientY + 15 + "px";
      });

      invImg.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
      });

      inventario.appendChild(invImg);

      aplicarBuff(item);
      updateHUD();

      itemDiv.remove();
      floatText?.(containerItens, `-${preco}🪙`, "red");
    });

    const imgItem = document.createElement("img");
    imgItem.src = item.img;
    imgItem.style.width = "100px";

    const nome = document.createElement("div");
    nome.textContent = item.name;
    nome.classList.add("titulo");

    const desc = document.createElement("div");
    desc.textContent = item.desc;
    desc.classList.add("desc");

    const precoDiv = document.createElement("div");
    precoDiv.classList.add("precoCarta");
    precoDiv.textContent = `💰 ${preco}`;

    box.appendChild(imgItem);
    box.appendChild(nome);
    box.appendChild(desc);

    itemDiv.appendChild(box);
    itemDiv.appendChild(precoDiv);
    containerItens.appendChild(itemDiv);
  });
}
function abrirMedico() {
  const medicoDiv = document.getElementById("div5");
  if (!medicoDiv) return;

  medicoDiv.innerHTML = "";

  /* 🔒 BLINDA TODA A DIV */
  medicoDiv.addEventListener("click", e => {
    e.stopPropagation();
  });

  /* ================= CONTAINER ================= */
  const container = document.createElement("div");
  container.classList.add("loja-principal");
  medicoDiv.appendChild(container);

  /* ================= ESQUERDA ================= */
  const esquerda = document.createElement("div");
  esquerda.classList.add("loja-esquerda");

  const img = document.createElement("img");
  img.src = "./../img/jogo/background/medico.png";
  img.classList.add("imgInventario");
  esquerda.appendChild(img);

  /* ===== CURAR VIDA ===== */
  const btnCurar = document.createElement("button");
  btnCurar.className = "inventario curaVida";
  btnCurar.textContent = "Cure 40 de vida (E volte para o mapa)";

  esquerda.appendChild(btnCurar);

  /* ===== AUMENTAR VIDA MÁXIMA ===== */
  const btnVidaMax = document.createElement("button");
  btnVidaMax.className = "inventario aumentaVida";
  btnVidaMax.textContent = "Aumente sua vida maxima em 10 (E volte para o mapa)";

  esquerda.appendChild(btnVidaMax);

  /* ===== PULAR (RESETA CUSTOS E SAI) ===== */
  const btnPular = document.createElement("button");
  btnPular.classList.add("pular");
  btnPular.textContent = "Voltar para o mapa";

  btnPular.onclick = () => {
    // 🔄 RESET TOTAL AO SAIR
    custoCuraMedico = 0;
    custoVidaMaxMedico = 0;

    irParaDiv2();
  };

  esquerda.appendChild(btnPular);

  /* ================= DIREITA ================= */
  const direita = document.createElement("div");
  direita.classList.add("loja-direita");

  const titulo = document.createElement("h1");
  titulo.classList.add("dinheiroAtual");
  direita.appendChild(titulo);

  const containerCartas = document.createElement("div");
  containerCartas.classList.add("loja-container");
  direita.appendChild(containerCartas);

  container.appendChild(esquerda);
  container.appendChild(direita);

  atualizarDinheiro();

  /* ================= CARTAS DE CURA ================= */
  const cartasCura = allCards.filter(c => c.type === "heal");
  const max = Math.min(6, cartasCura.length);
  const escolhidas = [];

  while (escolhidas.length < max) {
    const carta = cartasCura[Math.floor(Math.random() * cartasCura.length)];
    if (!escolhidas.includes(carta)) escolhidas.push(carta);
  }

  escolhidas.forEach(carta => {
    let preco = 10 + (mapaBatalha ?? 0);

    const rar = carta.rarity?.toLowerCase();
    if (rar === "rare") preco += 4;
    else if (rar === "epic") preco += 12;
    else if (rar === "legend") preco += 20;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("itemLoja");

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", carta.rarity ?? "common", "heal");

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
    desc.innerHTML = carta.desc ?? "<i>Sem descrição</i>";
    cardDiv.appendChild(desc);

    const precoDiv = document.createElement("div");
    precoDiv.classList.add("precoCarta");
    precoDiv.textContent = `💰 ${preco}`;

    cardDiv.addEventListener("click", e => {
      bloquearSaida(e);

      if (dinheiro < preco) {
        floatText?.(cardDiv, "Dinheiro insuficiente!", "red");
        return;
      }

      dinheiro -= preco;
      atualizarDinheiro();

      playerDeck.push({ ...carta });
      itemDiv.remove();

      floatText?.(containerCartas, `-${preco}🪙`, "green");
    });

    itemDiv.appendChild(cardDiv);
    itemDiv.appendChild(precoDiv);
    containerCartas.appendChild(itemDiv);
  });
  document.querySelectorAll('.curaVida').forEach(el => {
    el.addEventListener('click', curaVida);
  });
  document.querySelectorAll('.aumentaVida').forEach(el => {
    el.addEventListener('click', aumentaVida);
  });
}
function bloquearSaida(e) {
  e.preventDefault();
  e.stopPropagation();
}

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
        playerMaxHP += 40;
        energyMax += 2;
        energy += 2;
        playerShieldInit += 20;
        playerShield = playerShieldInit;
        if (limiteMao == maxMao) {

        } else {
          let sobra = maxMao - limiteMao;
          let adicionar = Math.min(3, sobra);
          maoInicio += adicionar;
          limiteMao += adicionar;
        }
      } else if (mapaBatalha == 11) {
        imgLilia = "./../img/jogo/player/lilia2.png";
        playerMaxHP += 20;
        energyMax += 1;
        energy += 1;
        if (limiteMao == maxMao) {

        } else {
          let sobra = maxMao - limiteMao;
          if (sobra >= 1) {
            maoInicio += 1;
            limiteMao += 1;
          }
        }
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
  playerImgDialogo = document.getElementById(personagemSelecionado);
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
  const enemiesSnapshot = [...enemies];
  for (const e of enemiesSnapshot) {
    const actions = e.behavior();
    for (const act of actions) {
      // ANIMAÇÃO
      await aplicarAnimacao(e.name, act.type);

      // 👾 SPAWN
      if (act.type === "spawn") {
        if (enemies.length >= 3) {
          floatText(e.el, "SEM ESPAÇO!", "gray");
          continue;
        }
        const index = enemies.indexOf(e);
        spawnEnemyInBattle(act.baseEnemy, index);
        e.el.classList.add("casting");
        setTimeout(() => e.el.classList.remove("casting"), 600);

        // ⚔️ ATK
      } else if (act.type === "attack") {
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
        playerHP -= act.value;

        animateDamage(document.getElementById("player"));
        floatText(document.getElementById("player"), `-${act.value}🔱`, "orange");
        redScreenGlow(300, 30);

        // 💀 MORTE
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
      // if (e.name === "Ayla") {
      //   setTimeout(() => {
      //     const frasesAyla = [
      //       "Ayla: Vencer minhas emoções não significa NADA!",
      //       "Ayla: Juntese a IA, sua tal GAEA não vai te salvar!",
      //       "Ayla: Salvar a natureza? Patético!",
      //       "Ayla: EU SOU MAIS HUMANA QUE VOCÊ!",
      //       "Ayla: Sou a mais forte dentre todas"
      //     ];
      //     floatText(e.el, frasesAyla[Math.floor(Math.random() * frasesAyla.length)], "violet");
      //   }, 500);
      // }

      // MORTE DO JOGADOR
      if (playerHP <= 0) {
        if (pagina === "tutorial.html") {
          PULAR_TODO_TUTORIAL = false;
          iniciarTutorial([
            "Oh não, essa batalha foi difícil…",
            "Mas não desanime! Toda derrota é um aprendizado.",
            "Este é um roguelike: cair faz parte do caminho para voltar mais forte, mais sábio e mais preparado!",
            "Levante-se, tente novamente e continue lutando pelo meio ambiente!"
          ], "./../img/jogo/gaeazinha.jpg");
        }
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
async function aplicarAnimacao(nomeBoss, acao) {
  const enemiesSnapshot = [...enemies];
  for (const e of enemiesSnapshot) {
    let target = enemies.find(t => t !== e && t.hp > 0) || e;

    switch (true) {
      //================================
      //1111111111
      case nomeBoss === "Guinevere" && acao === "attack":
        await animateEnemySimpleFrames(e, "guinevere");
        break;

      //================================
      //2222222222
      case nomeBoss === "Pedro" && (acao === "attack" || acao === "attackVida"):
        await animateEnemySimpleFrames(e, "pedro");
        break;

      case nomeBoss === "Isla" && acao === "attack":
        await animateEnemySimpleFrames(e, "isla");
        break;

      case nomeBoss === "Isla Despertada" && acao === "attack":
        await animateEnemySimpleFrames(e, "isla2");
        break;

      //================================
      //3333333333

      //================================
      //4444444444
      case nomeBoss === "Svetlana" && (acao === "attack" || acao === "spawn"):
        await animateEnemySimpleFrames(e, "svetlana");
        break;

      case nomeBoss === "Belinda" && (acao === "heal" || acao === "spawn"):
        await animateEnemySimpleFrames(e, "belinda");
        break;

      case nomeBoss === "Ayla":
        if (acao === "attack") {
          await animateEnemySimpleFrames(e, "ayla");

        } else if (acao === "attackVida") {
          const ayla = document.querySelector("#enemies img");
          await animacaoAylaBrutal(ayla);
        }
        break;

      //================================
      //5555555555
      case nomeBoss === "Nemora" && (acao === "attack" || acao === "attackVida"):
        await animateNemoraAttack(e);
        break;

      case nomeBoss === "IA":
        if (acao === "attack") {
          await animateEnemySimpleFrames(e);
          enemies[0].dano += 5;
          floatText(enemies[0].el, `+5⚜️`, "yellow");
          updateEnemyBars();
          stopScreenGlitch();

        } else if (acao === "attackVida") {
          floatText(enemies[0].el, `+10⚜️`, "yellow");
          await animateEnemyCrossScreen(e);
          enemies[0].dano += 10;
          updateEnemyBars();
          startScreenGlitch();
          stopScreenGlitch()

        } else if (acao === "heal") {
          animateIAHitBasic(target.el);
        }
        break;

      default:
        break;
    }
  }
}
function spawnEnemyInBattle(baseEnemy, indexBase) {
  if (enemies.length >= 3) return false;

  const enemy = {
    name: baseEnemy.name,
    hp: baseEnemy.hp,
    maxHp: baseEnemy.hp,
    dano: baseEnemy.dano,
    behavior: baseEnemy.behavior,
    tipoDano: baseEnemy.tipoDano,
    tipoVida: baseEnemy.tipoVida,
    el: createEnemy(baseEnemy.img)
  };

  // 👇 SPAWN NA FRENTE DO INVOCADOR
  enemies.splice(indexBase, 0, enemy);

  enemy.el.classList.add("spawn-front");
  setTimeout(() => {
    enemy.el.classList.remove("spawn-front");
  }, 500);

  // recria DOM
  const enemiesContainer = document.getElementById("enemies");
  enemiesContainer.innerHTML = "";
  document.getElementById("lifeBarsContainer").innerHTML = "";

  enemies.forEach(e => {
    enemiesContainer.appendChild(e.el);
    e.el.style.display = "inline-block";

    const lifeBar = document.createElement("p");
    lifeBar.className = "enemy-bar";
    lifeBar.innerHTML = `
      <strong> ⟪ ${e.name} ⟫ </strong><br>
      ⟪ <span class="enemy-vida">${e.tipoVida}</span> 
         <span class="enemy-hp">${e.hp}</span> - 
         <span class="enemy-dano">${e.tipoDano} ${e.dano}</span> ⟫
    `;
    document.getElementById("lifeBarsContainer").appendChild(lifeBar);

    e.barEl = lifeBar.querySelector(".enemy-hp");
    e.dmgEl = lifeBar.querySelector(".enemy-dano");
    e.tipoVidaEl = lifeBar.querySelector(".enemy-vida");
  });

  floatText(enemy.el, "INVOCADO!", "cyan");

  return true;
}
function inimigoPassifico() {
  enemies[0].hp -= enemies[0].hp;
  updateEnemyBars()
  checkEnemies()
  atualizarDinheiro();
}
//INIMIGOS DO SPAWN
const peaoSpawn = {
  name: "Soldado Real",
  hp: 50,
  dano: 10,
  behavior() {
    return [
      { type: "attack", value: this.dano }
    ];
  },
  tipoDano: "⚔️",
  tipoVida: "❤️",
  img: "../img/jogo/inimigos/peaoBranco.png"
};
const bispoSpawn = {
  name: "Sacerdote Real",
  hp: 25,
  dano: 20,
  behavior() {
    return [
      { type: "heal", value: this.dano }
    ];
  },
  tipoDano: "💚🎭💊",
  tipoVida: "❤️",
  img: "../img/jogo/inimigos/bispoBranco.png"
};
const torreSpawn = {
  name: "Guarda Real",
  hp: 80,
  dano: 5,
  behavior() {
    return [
      { type: "attack", value: this.dano }
    ];
  },
  tipoDano: "⚔️",
  tipoVida: "❤️",
  img: "../img/jogo/inimigos/torreBranca.png"
};
const reiSpawn = {
  name: "Rei James",
  hp: 10,
  dano: 5,
  behavior() {
    return [
      { type: "attackVida", value: this.dano }
    ];
  },
  tipoDano: "🔱",
  tipoVida: "❤️",
  img: "../img/jogo/inimigos/reiBranco.png"
};
const svetlanaSpawn = {
  name: "Ilusão De Svetlana",
  hp: 10,
  dano: 30,
  behavior() {
    return [
      {
        type: Math.random() < 0.5 ? "attack" : "attackVida",
        value: this.dano
      }
    ];
  },
  tipoDano: "⁉️",
  tipoVida: "❤️",
  img: "../img/jogo/inimigos/animado/svetlana/statico/svetlana11.png"
};

// IA/NEMORA
function animateNemoraAttack(enemy) {
  if (nemoraAtk == true && enemies[0].hp < 350) {
    enemies[0].dano += 10;
  } else if (nemoraAtk == true || enemies[0].hp < 700) {
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
      if (nemoraAtk == true && enemies[0].hp < 350) {
        floatText(enemies[0].el, `+10⚜️`, "yellow");
      } else if (nemoraAtk == true || enemies[0].hp < 700) {
        floatText(enemies[0].el, `+5⚜️`, "yellow");
      }
      nemoraDef = false;
      nemoraAtk = true;
    }, dashTime);
  });
};

// AYLA 
async function animacaoAylaBrutal(inimigoEl) {
  startNemoraFire();
  const player = document.querySelector("#playerBarra");
  const screen = document.querySelector("#div3");
  await showScreenImage("../img/jogo/inimigos/animado/ayla/efeitos/olharAyla.png", false);


  const frames = {
    idle: "../img/jogo/inimigos/animado/ayla/statico/ayla1.png",

    f11: "../img/jogo/inimigos/animado/ayla/atk/ayla11.png",
    f22: "../img/jogo/inimigos/animado/ayla/atk/ayla22.png",
    f33: "../img/jogo/inimigos/animado/ayla/atk/ayla33.png",
    f44: "../img/jogo/inimigos/animado/ayla/atk/ayla44.png",
    f55: "../img/jogo/inimigos/animado/ayla/atk/ayla55.png",
    f66: "../img/jogo/inimigos/animado/ayla/atk/ayla66.png"
  };


  const e = inimigoEl.getBoundingClientRect();
  const p = player.getBoundingClientRect();


  /* ========== FUNÇÃO QUE LIMITA O ZOOM NA TELA ========== */
  function safeZoomOrigin(x, y) {
    const margin = 80;

    x = Math.max(margin, Math.min(window.innerWidth - margin, x));
    y = Math.max(margin, Math.min(window.innerHeight - margin, y));

    return `${x}px ${y}px`;
  }


  /* ========= 1 — ZOOM NA AYLA ========= */
  screen.style.transition = "transform .45s ease-out";

  screen.style.transformOrigin =
    safeZoomOrigin(e.left + e.width * 1.2, e.top + e.height / 2);

  screen.style.transform = "scale(1.45)";

  inimigoEl.src = frames.f11;
  await esperar(500);



  /* ========= 2 — DESFAZ ZOOM ========= */
  screen.style.transform = "scale(1)";
  inimigoEl.src = frames.f22;
  await esperar(350);



  /* ========= 3 — ZOOM NO PLAYER ========= */
  screen.style.transformOrigin =
    safeZoomOrigin(p.left - p.width * 0.3, p.top + p.height / 2);

  screen.style.transform = "scale(1.45)";
  await esperar(200);



  /* ========= 4 — CORRE ========= */
  const baseX = (p.left - e.left) * 1.4;

  inimigoEl.style.transition = "transform .35s linear";
  inimigoEl.src = frames.f33;
  inimigoEl.style.transform = `translateX(${baseX}px)`;

  await esperar(180);



  /* ========= 5 — ATAQUE LADO A LADO ========= */

  const ESQUERDA = baseX + 650;
  const DIREITA = baseX + 833.3333;

  inimigoEl.style.transition = "transform .06s linear";

  for (let i = 0; i < 9; i++) {

    // DIREITA DO PLAYER — frame 44
    inimigoEl.style.transform = `translateX(${DIREITA}px)`;
    inimigoEl.src = frames.f44;
    inimigoEl.style.opacity = "0.9";

    criarHitVisualNoPlayer();;
    await esperar(65);


    // ESQUERDA DO PLAYER — frame 55
    inimigoEl.style.transform = `translateX(${ESQUERDA}px)`;
    inimigoEl.src = frames.f55;
    inimigoEl.style.opacity = "1";

    criarHitVisualNoPlayer();;
    await esperar(65);
  }



  /* ========= 6 — VOLTA ========= */
  screen.style.transform = "scale(1)";

  inimigoEl.style.transition = "transform .35s linear";
  inimigoEl.style.transform = "translateX(0px)";
  inimigoEl.src = frames.f66;

  await esperar(300);


  /* ========= 7 — IDLE ========= */
  inimigoEl.src = frames.idle;
  stopNemoraFire();
}
function esperar(ms) {
  return new Promise(res => setTimeout(res, ms));
}
function criarHitVisualNoPlayer() {

  const playerImg = document.getElementById("player");
  if (!playerImg) return;

  const battlefield = document.getElementById("battlefield");
  if (!battlefield) return;


  /* ========= CRIA O EFEITO ========= */
  const efeito = document.createElement("img");

  const frames = [
    "../img/jogo/inimigos/animado/ayla/efeitos/golpe1.png",
    "../img/jogo/inimigos/animado/ayla/efeitos/golpe2.png",
    "../img/jogo/inimigos/animado/ayla/efeitos/golpe3.png"
  ];

  let frameIndex = 0;
  efeito.src = frames[frameIndex];

  efeito.style.position = "absolute";
  efeito.style.pointerEvents = "none";
  efeito.style.zIndex = "9999";
  efeito.style.width = "130px";


  /* ========= POSIÇÃO REAL ========= */
  const playerBox = playerImg.getBoundingClientRect();
  const fieldBox = battlefield.getBoundingClientRect();

  const centerX = (playerBox.left - fieldBox.left) + (playerBox.width / 2);
  const centerY = (playerBox.top - fieldBox.top) + (playerBox.height / 2);

  efeito.style.left = (centerX + 100) + "px";
  efeito.style.top = (centerY - 15) + "px";


  /* ========= ADICIONA ========= */
  battlefield.appendChild(efeito);

  /* ========= AUMENTA PARA 2.5 ========= */
  requestAnimationFrame(() => {
    efeito.style.transform = "scale(2.5)";
  });

  /* ========= TROCA DE FRAMES ========= */

  const anim = setInterval(() => {
    frameIndex++;

    if (frameIndex >= frames.length) {
      clearInterval(anim);
      efeito.remove();
      return;
    }

    efeito.src = frames[frameIndex];

  }, 20); // ← tempo entre frames

}

// ANIMAÇÃO ATK BASICO
function animateEnemySimpleFrames(enemy, boss) {
  return new Promise(resolve => {
    const container = enemy.el;
    const img = container.querySelector("img");
    let frames;

    if (!img) return resolve();

    if (boss === "svetlana") {
      frames = {
        f1: "../img/jogo/inimigos/animado/svetlana/atk/svetlana1.png",
        f2: "../img/jogo/inimigos/animado/svetlana/atk/svetlana2.png",
        idle: "../img/jogo/inimigos/animado/svetlana/statico/svetlana11.png"
      };
    } else if (boss === "belinda") {
      frames = {
        f1: "../img/jogo/inimigos/animado/belinda/atk/belinda1.png",
        f2: "../img/jogo/inimigos/animado/belinda/atk/belinda2.png",
        idle: "../img/jogo/inimigos/animado/belinda/statico/belinda1.png"
      };
    } else if (boss === "pedro") {
      frames = {
        f1: "../img/jogo/inimigos/animado/pedro/atk/pedro1.png",
        f2: "../img/jogo/inimigos/animado/pedro/atk/pedro2.png",
        idle: "../img/jogo/inimigos/animado/pedro/statico/pedro1.png"
      };
    } else if (boss === "guinevere") {
      frames = {
        f1: "../img/jogo/inimigos/animado/guinevere/atk/guinevere1.png",
        f2: "../img/jogo/inimigos/animado/guinevere/atk/guinevere2.png",
        idle: "../img/jogo/inimigos/animado/guinevere/statico/guinevere1.png"
      };
    } else if (boss === "isla") {
      frames = {
        f1: "../img/jogo/inimigos/animado/isla/atk/isla1.png",
        f2: "../img/jogo/inimigos/animado/isla/atk/isla2.png",
        idle: "../img/jogo/inimigos/animado/isla/statico/isla1.png"
      };
    } else if (boss === "isla2") {
      frames = {
        f1: "../img/jogo/inimigos/animado/isla/atk/isla11.png",
        f2: "../img/jogo/inimigos/animado/isla/atk/isla22.png",
        idle: "../img/jogo/inimigos/animado/isla/statico/PetroleoQuen1.png"
      };
    } else if (boss === "ayla") {
      frames = {
        f1: "../img/jogo/inimigos/animado/ayla/atk/ayla1.png",
        f2: "../img/jogo/inimigos/animado/ayla/atk/ayla1.png",
        idle: "../img/jogo/inimigos/animado/ayla/statico/ayla1.png"
      };
    } else {
      frames = {
        f1: "../img/jogo/inimigos/animado/ia/atk/ia1.png",
        f2: "../img/jogo/inimigos/animado/ia/atk/ia2.png",
        idle: "../img/jogo/inimigos/animado/ia/statico/ia1.png"
      };
      startScreenGlitch();
    }
    shakeScreenNatural(10, 400);


    const frameDelay = 150;

    // frame 1
    setTimeout(() => {
      img.src = frames.f1;

      if (boss === "belinda" || boss === "pedro") {
        img.style.transform = "scale(1.15)";
        img.style.marginBottom = "20px";
      } else {
        img.style.transform = "scale(1)";
        img.style.marginBottom = "0px";
      }
    }, 0);

    // frame 2
    setTimeout(() => {
      img.src = frames.f2;

      if (boss === "belinda" || boss === "pedro") {
        img.style.transform = "scale(1.25)";
        img.style.marginBottom = "40px";
      }
    }, frameDelay);

    // frame 1 novamente
    setTimeout(() => {
      img.src = frames.f1;

      if (boss === "belinda" || boss === "pedro") {
        img.style.transform = "scale(1.15)";
        img.style.marginBottom = "20px";
      } else {
        img.style.transform = "scale(1)";
        img.style.marginBottom = "0px";
      }
    }, frameDelay * 2);

    // idle
    setTimeout(() => {
      img.src = frames.idle;
      img.style.transform = "scale(1)";
      img.style.marginBottom = "0px";
      stopScreenGlitch();
      resolve();
    }, frameDelay * 3);
  });
}
// ANIMAÇÃO DEF BASICA
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
  const isBelinda = img.src.includes("/belinda/");
  const isSvetlana = img.src.includes("/svetlana/");
  const isPedro = img.src.includes("/pedro/");
  const isGuinevere = img.src.includes("/guinevere/");
  const isIsla = img.src.includes("/isla/");
  const isIsla2 = img.src.includes("PetroleoQuen");
  const isPeru = img.src.includes("/peru/");
  const isAyla = img.src.includes("/ayla1");

  // ===============================
  //  SE FOR **IA** → animação própria
  // ===============================
  if (isIA) {
    animateIAHit(el, img);
    return;
  }

  if (isBelinda) {
    animateIAHit(el, img, "belinda");
    return;
  }
  if (isSvetlana) {
    animateIAHit(el, img, "svetlana");
    return;
  }
  if (isPedro) {
    animateIAHit(el, img, "pedro");
    return;
  }
  if (isGuinevere) {
    animateIAHit(el, img, "guinevere");
    return;
  }
  if (isIsla2) {
    animateIAHit(el, img, "islaDois");
    return;
  }
  if (isIsla) {
    animateIAHit(el, img, "isla");
    return;
  }
  if (isPeru) {
    animateIAHit(el, img, "peru");
    return;
  }
  if (isAyla) {
    animateIAHit(el, img, "ayla");
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
      enemies[0].hp += 35;
      floatText(enemies[0].el, `+35💚`, "lime");

    } else if (enemies[0].hp < 200) {
      enemies[0].hp += 30;
      floatText(enemies[0].el, `+30💚`, "lime");

    } else if (enemies[0].hp < 300) {
      enemies[0].hp += 25;
      floatText(enemies[0].el, `+25💚`, "lime");

    } else if (enemies[0].hp < 400) {
      enemies[0].hp += 20;
      floatText(enemies[0].el, `+20💚`, "lime");

    } else if (enemies[0].hp < 500) {
      enemies[0].hp += 15;
      floatText(enemies[0].el, `+15💚`, "lime");

    } else if (enemies[0].hp < 600) {
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

  // quantidade de itens
  let numItens = hasItem(21) ? 4 : 3;

  container.innerHTML = "";
  container.style.display = "flex";
  container.style.flexDirection = "row";
  container.style.justifyContent = "center";
  container.style.alignItems = "center";
  container.style.gap = "20px";
  container.style.width = "100%";

  const itensDisponiveis = allItems.filter(
    i => !itensJaPegos.includes(i.id)
  );

  const quantidade = Math.min(numItens, itensDisponiveis.length);

  if (quantidade === 0) {
    container.innerHTML = "<p style='color:white'>Nenhum item disponível!</p>";
    return;
  }

  const escolhidos = [];

  /* 🔒 PRIMEIRA VEZ: garante os itens 26, 31 e 33 */
  if (primeiraGeracaoItem) {
    [26, 31, 33].forEach(id => {
      const item = itensDisponiveis.find(i => i.id === id);
      if (item && !escolhidos.includes(item)) {
        escolhidos.push(item);
      }
    });

    primeiraGeracaoItem = false;
  }

  /* 🎲 COMPLETA ALEATORIAMENTE */
  while (escolhidos.length < quantidade) {
    const item = itensDisponiveis[
      Math.floor(Math.random() * itensDisponiveis.length)
    ];

    if (!escolhidos.includes(item)) {
      escolhidos.push(item);
    }
  }

  /* ================= RENDERIZAÇÃO ================= */
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

    /* 📦 EVENTO DE PEGAR ITEM */
    box.addEventListener("click", () => {
      itensJaPegos.push(item.id);

      const invImg = document.createElement("img");
      invImg.src = item.img;
      invImg.style.margin = "5px";
      invImg.style.cursor = "pointer";

      /* 🧠 TOOLTIP NO INVENTÁRIO */
      invImg.addEventListener("mouseenter", () => {
        tooltip.textContent = `(${item.name}) ${item.desc}`;
        tooltip.style.display = "block";
      });

      invImg.addEventListener("mousemove", ev => {
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
}
function checkItemBoss() {
  if (hasItem(28)) {
    if (belindaSpawnBoss) {
      bossAtivadoPorItem("belinda");
      belindaSpawnBoss = false;
    }
  }
  if (hasItem(29)) {
    if (svetlanaSpawnBoss) {
      bossAtivadoPorItem("svetlana");
      svetlanaSpawnBoss = false;
    }
  }
  if (hasItem(30)) {
    if (pedroSpawnBoss) {
      bossAtivadoPorItem("pedro");
      pedroSpawnBoss = false;
    }
  }
  if (hasItem(31)) {
    if (guinevereSpawnBoss) {
      bossAtivadoPorItem("guinevere");
      guinevereSpawnBoss = false;
    }
  }
  if (hasItem(32)) {
    if (islaSpawnBoss) {
      bossAtivadoPorItem("isla");
      islaSpawnBoss = false;
    }
  }
  if (hasItem(33)) {
    if (peruSpawnBoss) {
      bossAtivadoPorItem("peru");
      peruSpawnBoss = false;
    }
  }
}
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

if (pagina === "tutorial.html") {
  mapaCanvas("div2", 7, 1, "#45ff45ff", "#ff8834ff", '🐺');
}

if (pagina === "selecaoMapa.html") {
  mapaCanvas("div2", 7, 3, "#45ff45ff", "#ff8834ff", '🐺');
  mapaCanvas("div7", 7, 3, "#60ff34ff", "#34ffe1ff", '🦑');
  mapaCanvas("div8", 7, 5, "#fbfbfbff", "#737373ff", '🗽');
  mapaCanvas("div9", 7, 7, "#f5fd54ff", "#5db0e7ff", '👻');
  mapaCanvas("div10", 7, 7, "#5db0e7ff", "#e75d5dff", '🤖');
}

// itensJaPegos.push(34);
// itensJaPegos.push(35);
// itensJaPegos.push(36);