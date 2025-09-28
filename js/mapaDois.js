let telaAtual = 1;
let telaAnterior = null;

document.getElementById('fimSelecao').addEventListener('click', proximaTela);

document.getElementById('lutaUm').addEventListener('click', irParaDiv2);

document.getElementById('lojaUm').addEventListener('click', irParaDiv2);

document.querySelectorAll('.ferreiro').forEach(el => {
  el.addEventListener('click', irParaDiv2);
});

document.querySelectorAll('.inventario').forEach(el => {
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

let playerMaxHP = 100, energyMax = 3, playerShieldInit = 0 ;
let playerHP = 100, energy = 3, playerShield = playerShieldInit;
let mapaBatalha = 0;
// buff em itens aumenta esse
let maoInicio = 7;
// buff em cards aumenta esse
let limiteMao = 7;

function curaVida() {
  playerHP = Math.min(playerHP + 25, playerMaxHP);
}

function curaSacre() {
  if (playerMaxHP<= 10) {
    playerMaxHP = 10;
    updateHUD();
  } else {
    playerMaxHP -= 10;
  }
  playerHP = Math.min(playerHP + playerMaxHP, playerMaxHP);
  updateHUD();
}

function aumentaVida() {
  playerMaxHP += 10;
  updateHUD();
}

function aumentaSacre() {
  playerMaxHP += 30;
  if (playerHP<= 50) {
    playerHP = 1;
  } else {
    playerHP -= 50;
  }
  updateHUD();
}

function armaduraUp() {
  playerShieldInit += 2;
  updateHUD();
}

function armaduraSacre() {
  playerShieldInit += 15;
  if (playerMaxHP<= 10) {
    playerMaxHP = 10;
  } else if (playerHP>50){
    playerHP = 50;
    playerMaxHP -= 50;
  } else {
    playerMaxHP -= 50;
  }
  updateHUD();
}

function criarPlayerNaDiv3() {
  if (!personagemSelecionado) return; // nenhum personagem selecionado

  const div3 = document.getElementById("player-area");

  // Remove a imagem antiga, se existir
  const imgExistente = document.getElementById("player");
  if (imgExistente) div3.removeChild(imgExistente);

  // Cria nova imagem
  const playerImg = document.createElement("img");
  playerImg.id = "player";

  // Escolhe src baseado no personagem
  switch (personagemSelecionado) {
    case "laranja":
      playerImg.src = "./../img/jogo/player/corredor.png";
      break;
    case "azul":
      playerImg.src = "./../img/jogo/player/tank.png";
      break;
    case "amarelo":
      playerImg.src = "./../img/jogo/player/mineiro.png";
      break;
    case "verde":
      playerImg.src = "./../img/jogo/player/jao.png";
      break;
    case "vermelho":
      playerImg.src = "./../img/jogo/player/matadorDeJao.png";
      break;
    case "roxo":
      playerImg.src = "./../img/jogo/player/cacadorDeJao.png";
      break;
    case "porto":
      playerImg.src = "./../img/jogo/player/autoridadeDoPorto.png";
      break;
    case "ferrus":
      playerImg.src = "./../img/jogo/player/sal2.png";
      break;
    case "tomoeh":
      playerImg.src = "./../img/jogo/player/sombra.png";
      break;
    case "x":
      playerImg.src = "./../img/jogo/player/x.png";
      break;
    case "wallace":
      playerImg.src = "./../img/jogo/player/wallace.png";
      break;
    default:
      playerImg.src = "./../img/jogo/extra/prototipo.png";
      break;
  }

  playerImg.alt = "Jogador";

  // Insere como primeiro elemento da div3
  div3.insertBefore(playerImg, div3.firstChild);
}


const deck = [];
const allCards = [
  {
    name: "GÆPROTOCOL",
    cost: 3,
    basePower: 10,
    rarity: "cintilante",
    img: "../img/jogo/cards/cintilante/gaea.png",
    desc: "Recicla lixo. Ganhe vida, defesa e cause dano em 10 por cada carta de lixo reciclada.",
  },
  {
    name: "Guardião",
    cost: 0,
    basePower: 30,
    rarity: "cintilante",
    img: "../img/jogo/cards/cintilante/guardiao.png",
    desc: "Ganhe 1 de energia, se sua vida for 30 ou menos ganhe 30 de escudo e +1 de energia",
  },
  {
    name: "Impacto Bruto",
    cost: 3,
    basePower: 20,
    rarity: "epic",
    img: "../img/jogo/cards/atk/Impacto.png",
    desc: "Causa 20 de dano ao inimigo."
  },
  {
    name: "Ataque",
    cost: 1,
    basePower: 6,
    rarity: "common",
    img: "../img/jogo/cards/atk/LancaGranadas.png",
    desc: "Causa 6 de dano ao inimigo."
  },
  {
    name: "Liderança",
    cost: 1,
    basePower: 6,
    rarity: "rare",
    img: "../img/jogo/cards/atk/lideranca.jpeg",
    desc: "Causa 6 de dano e compre 2 cartas."
  },
  {
    name: "Vingativo",
    cost: 3,
    basePower: 0,
    rarity: "legend",
    img: "../img/jogo/cards/atk/vinganca.jpeg",
    desc: "Causa dano baseado na vida perdida."
  },
  {
    name: "Rebeldia",
    cost: 1,
    basePower: 7,
    rarity: "epic",
    img: "../img/jogo/cards/atk/rebeldia.jpeg",
    desc: "Cause 7 de dano, +7 sem sem escudo, +7 com 30 ou menos de vida."
  },
  {
    name: "Drenagem",
    cost: 1,
    basePower: 10,
    rarity: "epic",
    img: "../img/jogo/cards/atk/drenoDeVida.png",
    desc: "Causa 10 de dano ao inimigo e cure-se em 10."
  },
  {
    name: "Rajada Dupla",
    cost: 1,
    basePower: 6,
    rarity: "rare",
    img: "../img/jogo/cards/atk/tiroCarregado.png",
    desc: "Ataca 2 vezes com 6 de dano cada."
  },
  {
    name: "Explosão",
    cost: 2,
    basePower: 12,
    rarity: "rare",
    img: "../img/jogo/cards/atk/ExplosaoDeEnergia.png",
    desc: "Causa 12 de dano em área a todos os inimigos."
  },
  {
    name: "Chuva De Fragmentos",
    cost: 1,
    basePower: 6,
    rarity: "common",
    img: "../img/jogo/cards/atk/ChuvaDeFragmento.png",
    desc: "Causa 6 de dano em área a todos os inimigos."
  },
  {
    name: "Beserck",
    cost: 2,
    basePower: 12,
    rarity: "epic",
    img: "../img/jogo/cards/atk/beserck.png",
    desc: "Cause 12 de dano, se houver 3 ou ou menos cartas na mão aumente em X3"
  },
  {
    name: "Fogo Amigo",
    cost: 3,
    basePower: 30,
    rarity: "epic",
    img: "../img/jogo/cards/atk/bombardeio.png",
    desc: "Cause 30 de dano em area, a cada inimigo no campo receba 15 de dano (max 45)."
  },
  {
    name: "Defesa",
    cost: 1,
    basePower: 6,
    rarity: "common",
    img: "../img/jogo/cards/def/Blindagem.png",
    desc: "Ganha 6 de escudo."
  },
  {
    name: "Arpão",
    cost: 1,
    basePower: 3,
    rarity: "rare",
    img: "../img/jogo/cards/def/arpao.png",
    desc: "Ataca o alvo mais distante em 3 e ganhe armadura (x3 o dano c/ armadura)."
  },
  {
    name: "Indestrutivel",
    cost: 2,
    basePower: 3,
    rarity: "epic",
    img: "../img/jogo/cards/def/indestrutivel.png",
    desc: "Multiplique sua armadura em X3."
  },
  {
    name: "Em guarda",
    cost: 1,
    basePower: 10,
    rarity: "rare",
    img: "../img/jogo/cards/def/emGuarda.png",
    desc: "Se possuir escudo ganhe 10 de escudo."
  },
  {
    name: "PROTOCOL-Campo De Força",
    cost: 1,
    basePower: 40,
    rarity: "epic",
    img: "../img/jogo/cards/def/campoDeForca.png",
    desc: "Se sua vida for 30 ou menos ganhe 40 de escudo"
  },
  {
    name: "Brilhando",
    cost: 1,
    basePower: 60,
    rarity: "legend",
    img: "../img/jogo/cards/def/escudoDeVidro.png",
    desc: "Se sua vida estiver cheia ganhe 60 de escudo"
  },
  {
    name: "Impulso Defensivo",
    cost: 0,
    basePower: 1,
    rarity: "rare",
    img: "../img/jogo/cards/def/impulsoAzul.png",
    desc: "Ganha 3 de escudo e receba 1 de energia"
  },
  {
    name: "Escudo",
    cost: 1,
    basePower: 10,
    rarity: "common",
    img: "../img/jogo/cards/def/escudoHolo.png",
    desc: "Cria um escudo de 10 pontos."
  },
  {
    name: "Sistema de reflexão",
    cost: 1,
    basePower: 4,
    rarity: "rare",
    img: "../img/jogo/cards/def/sisReflexao.png",
    desc: "Cria um escudo de 8 pontos e cause 4 de dano."
  },
  {
    name: "Escudo Retaliante",
    cost: 1,
    basePower: 0,
    rarity: "epic",
    img: "../img/jogo/cards/def/escudoRetaliante.png",
    desc: "Causa dano igual à sua armadura atual."
  },
  {
    name: "Cura",
    cost: 1,
    basePower: 8,
    rarity: "common",
    img: "../img/jogo/cards/buff/Cura.png",
    desc: "Recupera 8 de vida."
  },
  {
    name: "Sob-Vigia",
    cost: 0,
    basePower: 25,
    rarity: "rare",
    img: "../img/jogo/cards/buff/vigia.png",
    desc: "Ajuste sua vida para 25, se essa carta tirar vida ganhe 1 de energia."
  },
  {
    name: "Mineração",
    cost: 0,
    basePower: 3,
    rarity: "legend",
    img: "../img/jogo/cards/buff/mineracao.png",
    desc: "Mineração sustentavel, fornece 3 de energia, viva a sustentabilidade!"
  },
  {
    name: "PROTOCOL-Reforço Estrutural",
    cost: 1,
    basePower: 20,
    rarity: "rare",
    img: "../img/jogo/cards/buff/reforcoDeEstrutura.png",
    desc: "Cure 20 de vida se sua vida estiver em 30 ou menos."
  },
  {
    name: "Impulso",
    cost: 1,
    basePower: 1,
    rarity: "epic",
    img: "../img/jogo/cards/buff/impulsoVerd.png",
    desc: "Aumenta a mão em 1 até o final da luta (limite da mão 10)"
  },
  {
    name: "Golpe Neural Retaliante",
    cost: 3,
    basePower: 20,
    rarity: "epic",
    img: "../img/jogo/cards/buff/neural.png",
    desc: "Cause dano igual sua vida atual, perca 20 da vida atual"
  },
  {
    name: "Sobre Carga",
    cost: 1,
    basePower: 4,
    rarity: "rare",
    img: "../img/jogo/cards/buff/sobreCarga.png",
    desc: "Perca 4 de vida e cause 12 de dano."
  },
  {
    name: "Compra Dupla",
    cost: 1,
    basePower: 0,
    rarity: "rare",
    img: "../img/jogo/cards/buff/comprarCarta.png",
    desc: "Compra 2 cartas aleatórias."
  },
  {
    name: "Recicladora",
    cost: 1,
    basePower: 8,
    rarity: "legend",
    img: "../img/jogo/cards/reciclagem/reciclagem.png",
    desc: "Cause 8 de dano, se não tiver nenhuma carta na mão cause 50 de dano."
  },
  {
    name: "Terror Critico",
    cost: 2,
    basePower: 7,
    rarity: "legend",
    img: "../img/jogo/cards/reciclagem/terror.png",
    desc: "Cause 7 de dano por cada lixo reciclado, se sua vida estiver em 30 ou menos cause X2."
  },
  {
    name: "Destruir Carta",
    cost: 0,
    basePower: 0,
    rarity: "common",
    img: "../img/jogo/cards/reciclagem/destruirCarta.png",
    desc: "Destroi todas as cartas do tipo 'lixo' na sua mão.",
  },
  {
    name: "Ataque Reciclável",
    cost: 1,
    basePower: 0,
    rarity: "rare",
    img: "../img/jogo/cards/reciclagem/atkReciclavel.png",
    desc: "Remove cartas de lixo da mão e causa 5 de dano por cada carta removida.",
    type: "attack"
  },
  {
    name: "Defesa Reciclável",
    cost: 1,
    basePower: 0,
    rarity: "rare",
    img: "../img/jogo/cards/reciclagem/defesaReciclavel.png",
    desc: "Remove cartas de lixo da mão e ganhe 5 de escudo por cada carta removida.",
    type: "attack"
  },
  {
    name: "Xenofluxo Reciclável",
    cost: 0,
    basePower: 0,
    rarity: "epic",
    img: "../img/jogo/cards/reciclagem/ganhoDeEnergia.png",
    desc: "Remove cartas de lixo da mão e ganhe 1 de energia por cada carta removida.",
    type: "attack"
  },
  {
    name: "Entulho",
    cost: 0,
    basePower: 0,
    rarity: "common",
    img: "../img/jogo/cards/lixo/entulho.png",
    desc: "Um monte de entulho que não faz nada, quem sabe você ache uma utilidade para ele.",
    type: "lixo"
  },
  {
    name: "Lixo quimico",
    cost: 9,
    basePower: 0,
    rarity: "common",
    img: "../img/jogo/cards/lixo/lixoQuimico.png",
    desc: "Tudo pode ser reciclado, mas certas coisas custão muito caro...",
    type: "lixo"
  },
  {
    name: "Escudo quebrado",
    cost: 0,
    basePower: 0,
    rarity: "common",
    img: "../img/jogo/cards/lixo/escudoQuebrado.png",
    desc: "Ganhe 0 de defesa.",
    type: "lixo"
  },
  {
    name: "Arma Quebrada",
    cost: 0,
    basePower: 0,
    rarity: "common",
    img: "../img/jogo/cards/lixo/armaQuebrada.png",
    desc: "Cause 0 de dano.",
    type: "lixo"
  },
  {
    name: "Restos de mecha",
    cost: 0,
    basePower: 0,
    rarity: "epic",
    img: "../img/jogo/cards/lixo/mecaLixo.png",
    desc: "Adiciona 3 cartas de Entulho à sua mão.",
    type: "lixo"
  },
  {
    name: "Cura Quebrada",
    cost: 0,
    basePower: 0,
    rarity: "common",
    img: "../img/jogo/cards/lixo/agulhaQuebrada.png",
    desc: "Restos de esperança de sobrevivencia, cura 0.",
    type: "lixo"
  },
  {
    name: "Ferro Velho",
    cost: 0,
    basePower: 0,
    rarity: "common",
    img: "../img/jogo/cards/lixo/ferroVelho.png",
    desc: "Adiciona 2 cartas de Entulho à sua mão.",
    type: "lixo"
  }
];

// 💞 inicio da batalha aumenta a vida maxima dos aliados adjacentes em 15 (dura até apos a morte)
  // ❣️ eu morro apos 3 turnos
  // ⚔️ atk normal
  // 🔱 ignora armadura
  // 💚 prioriza curar aliados
  // 💊 auto cura
  // (⚔️)💥 chance de (30%) crit X2 (apenas ações dentro do parenteses)
  // (⚔️)🧨 chance de (15%) crit X4 (apenas ações dentro do parenteses)
  // (⚔️)💣 chance de (10%) crit X5 (apenas ações dentro do parenteses)
  // ⚔️🎭💚 se não puder executar a primeira ação executa a segunda
  // ⚔️❓💚 pode executar 2 ações, ou uma ou outra que esta adjacente (50% de chance)
  // ⚔️❔💚 pode executar 2 ações, ou uma ou outra que esta adjacente, porém uma possui mais chance que a outra
  // 🩸💫⚜️✨💤🤢🥶💀👾☠️👻🧿🪬🌟🔥💧❄️⚡ n criado

// NORMAL
const normalModels = [
  [
    {
      name: "Sacerdote Guerreiro",
      hp: 40,
      dano: 8,
      behavior: () => [
        { type: "attack", value: 8 }
      ],
      img: "../img/jogo/inimigos/sacerdoteGuerreiro.png",
      tipoDano: "⚔️",
      tipoVida: "❤️"
    },
    {
      name: "Sacerdote Guerreiro",
      hp: 40,
      dano: 8,
      behavior: () => [
        { type: "attack", value: 8 }
      ],
      img: "../img/jogo/inimigos/sacerdoteGuerreiro.png",
      tipoDano: "⚔️",
      tipoVida: "❤️"
    },
  ],
  [
    {
      name: "Rinoceronte corrompido",
      hp: 65,
      dano: 10,
      behavior: () => [
        { type: "attackVida", value: 10 }
      ],
      img: "../img/jogo/inimigos/rino.png",
      tipoDano: "🔱",
      tipoVida: "💞"
    },
    {
      name: "formiga sentinela",
      hp: 45,
      dano: 6,
      behavior: () => [
        { type: "attack", value: 6 }
      ],
      img: "../img/jogo/inimigos/formiga.png",
      tipoDano: "⚔️",
      tipoVida: "❤️"
    }
  ],
  [
    {
      name: "formiga sentinela",
      hp: 30,
      dano: 6,
      behavior: () => [
        { type: "attack", value: 6 }
      ],
      img: "../img/jogo/inimigos/formiga.png",
      tipoDano: "⚔️",
      tipoVida: "❤️"
    },
    {
      name: "formiga sentinela",
      hp: 30,
      dano: 6,
      behavior: () => [
        { type: "attack", value: 6 }
      ],
      img: "../img/jogo/inimigos/formiga.png",
      tipoDano: "⚔️",
      tipoVida: "❤️"
    }
  ],
  [
    {
      name: "FuradorKiwi",
      hp: 16,
      dano: 24,
      behavior: () => [
        { type: "attack", value: 24 }
      ],
      img: "../img/jogo/inimigos/kiwi.png",
      tipoDano: "⚔️",
      tipoVida: "❤️"
    },
    {
      name: "FuradorKiwi",
      hp: 16,
      dano: 24,
      behavior: () => [
        { type: "attack", value: 24 }
      ],
      img: "../img/jogo/inimigos/kiwi.png",
      tipoDano: "⚔️",
      tipoVida: "❤️"
    }
  ],
  [
    {
      name: "BrocadorToper",
      hp: 40,
      dano: 12,
      behavior: () => [
        { type: Math.random() < 0.5 ? "attack" : "attackVida", value: 12 }
      ],
      img: "../img/jogo/inimigos/topeira.png",
      tipoDano: "⚔️❓🔱",
      tipoVida: "❤️"
    },
    {
      name: "BrocadorToper",
      hp: 40,
      dano: 12,
      behavior: () => [
        { type: Math.random() < 0.5 ? "attack" : "attackVida", value: 12 }
      ],
      img: "../img/jogo/inimigos/topeira.png",
      tipoDano: "⚔️❓🔱",
      tipoVida: "❤️"
    }
  ],
  [
    {
      name: "Lenhador corrompido",
      hp: 80,
      dano: 15,
      behavior: () => [
        { type: "attack", value: Math.random() < 0.7 ? 15 : 30 }
      ],
      img: "../img/jogo/inimigos/lenhador.png",
      tipoDano: "(⚔️)💥",
      tipoVida: "❤️"
    }
  ],
  [
    {
      name: "Tartaruga",
      hp: 54,
      dano: 6,
      behavior: () => [{ type: "attack", value: 6 }],
      img: "../img/jogo/inimigos/minion.png",
      tipoDano: "⚔️",
      tipoVida: "❤️"
    },
    {
      name: "Abelha corrompida",
      hp: 6,
      dano: 6,
      behavior: () => [{ type: "attack", value: 6 }],
      img: "../img/jogo/inimigos/abelha.png",
      tipoDano: "⚔️",
      tipoVida: "❤️"
    },
    {
      name: "Abelha corrompida",
      hp: 6,
      dano: 6,
      behavior: () => [{ type: "attack", value: 6 }],
      img: "../img/jogo/inimigos/abelha.png",
      tipoDano: "⚔️",
      tipoVida: "❤️"
    }
  ],
  [
    {
      name: "Ferrujão",
      hp: 40,
      dano: 12,
      behavior: () => [{ type: "attack", value: 12 }],
      img: "../img/jogo/inimigos/inimigo1.png",
      tipoDano: "⚔️",
      tipoVida: "❤️"
    },
    {
      name: "Drone agricola",
      hp: 8,
      dano: 6,
      behavior: () => [{ type: "attackVida", value: 6 }],
      img: "../img/jogo/inimigos/inimigo5.png",
      tipoDano: "🔱",
      tipoVida: "❤️"
    },
    {
      name: "Drone agricola",
      hp: 8,
      dano: 6,
      behavior: () => [{ type: "attackVida", value: 6 }],
      img: "../img/jogo/inimigos/inimigo5.png",
      tipoDano: "🔱",
      tipoVida: "❤️"
    }
  ],
  [
    {
      name: "Tartaruga",
      hp: 54,
      dano: 6,
      behavior: () => [{ type: "attack", value: 6 }],
      img: "../img/jogo/inimigos/minion.png",
      tipoDano: "⚔️",
      tipoVida: "❤️"
    },
    {
      name: "Tatu corrompido",
      hp: 60,
      dano: 8,
      behavior: () => [{ type: "attack", value: 8 }],
      img: "../img/jogo/inimigos/tatu.png",
      tipoDano: "⚔️",
      tipoVida: "❤️"
    },
    {
      name: "Abelha corrompida",
      hp: 6,
      dano: 6,
      behavior: () => [{ type: "attack", value: 6 }],
      img: "../img/jogo/inimigos/abelha.png",
      tipoDano: "⚔️",
      tipoVida: "❤️"
    }
  ],
  [
    {
      name: "Ferrujão",
      hp: 40,
      dano: 12,
      behavior: () => [{ type: "attack", value: 12 }],
      img: "../img/jogo/inimigos/inimigo1.png",
      tipoDano: "⚔️",
      tipoVida: "❤️"
    },
    {
      name: "Ferrujão",
      hp: 40,
      dano: 12,
      behavior: () => [{ type: "attack", value: 12 }],
      img: "../img/jogo/inimigos/inimigo1.png",
      tipoDano: "⚔️",
      tipoVida: "❤️"
    },
    {
      name: "IA sacerdotisa",
      hp: 24,
      dano: 2,
      behavior: () => [{ type: "heal", value: Math.random() < 0.7 ? 2 : 4 }],
      img: "../img/jogo/inimigos/sacerdotisa.png",
      tipoDano: "(💚🎭💊)💥",
      tipoVida: "❤️"
    },
  ]
];

// ELITE
const eliteModels = [
  [
    {
      name: "Soldado do porto",
      hp: 120,
      dano: 10,
      behavior: () => [
        { type: Math.random() < 0.7 ? "attack" : "attackVida", value: Math.random() < 0.9 ? 10 : 50 }
      ],
      img: "../img/jogo/inimigos/soldadoDoPorto.png",
      tipoDano: "(⚔️❔🔱)💣",
      tipoVida: "❤️"
    }
  ],
  [
    {
      name: "Amalgama",
      hp: 120,
      dano: 5,
      behavior: () => [
        { type: Math.random() < 0.5 ? "attackVida" : "heal", value: Math.random() < 0.7 ? 5 : 10 }
      ],
      img: "../img/jogo/inimigos/amalgama.png",
      tipoDano: "(🔱❓💊)💥",
      tipoVida: "❤️"
    }
  ],
  [
    {
      name: "Sacerdote Guerreiro",
      hp: 55,
      dano: 8,
      behavior: () => [
        { type: "attack", value: 8 }
      ],
      img: "../img/jogo/inimigos/sacerdoteGuerreiro.png",
      tipoDano: "⚔️",
      tipoVida: "❤️"
    },
    {
      name: "Sacerdote Elite",
      hp: 40,
      dano: 10,
      behavior: () => [
        { type: Math.random() < 0.8 ? "attack" : "heal", value: 10 }
      ],
      img: "../img/jogo/inimigos/sacerdoteGuerreiroElite.png",
      tipoDano: "⚔️❔💚🎭💊",
      tipoVida: "💞"
    },
    {
      name: "IA sacerdotisa",
      hp: 39,
      dano: 2,
      behavior: () => [{ type: "heal", value: Math.random() < 0.3 ? 2 : 4 }],
      img: "../img/jogo/inimigos/sacerdotisa.png",
      tipoDano: "(💚🎭💊)💥",
      tipoVida: "❤️"
    },
  ]
];

// BOSS
const bossModels = [
  [
    {
      name: "Mão do Paladium",
      hp: 65,
      dano: 10,
      behavior: () => [{ type: Math.random() < 0.5 ? "attack" : "heal", value: 8 }],
      img: "../img/jogo/inimigos/paladiumMaoDireita.png",
      tipoDano: "⚔️❓💚🎭💊",
      tipoVida: "❤️"
    },
    {
      name: "Boss Paladium",
      hp: 100,
      dano: 8,
      behavior: () => [
        { type: Math.random() < 0.7 ? "attack" : "heal", value: Math.random() < 0.7 ? 8 : 16 }
      ],
      img: "../img/jogo/inimigos/bossPaladium.png",
      tipoDano: "(⚔️❔💚🎭💊)💥",
      tipoVida: "💞"
    },
    {
      name: "Mão do Paladium",
      hp: 35,
      dano: 5,
      behavior: () => [{ type: Math.random() < 0.5 ? "attack" : "attackVida", value: Math.random() < 0.85 ? 5 : 20 }],
      img: "../img/jogo/inimigos/paladiumMaoEsquerda.png",
      tipoDano: "(⚔️❓🔱)🧨",
      tipoVida: "❤️"
    }
  ],
  [
    {
      name: "Solice a Esquecida",
      hp: 150,
      dano: 40,
      behavior: () => [{ type: "morrer", value: 40 }],
      img: "../img/jogo/inimigos/solice.png",
      tipoDano: "⚔️",
      tipoVida: "❣️"
    }
  ],
  [
    {
      name: "Valquiria",
      hp: 40,
      dano: 7,
      behavior: () => [{ type: "attackVida", value: 7 }],
      img: "../img/jogo/inimigos/valquiria.png",
      tipoDano: "🔱",
      tipoVida: "❤️"
    },
    {
      name: "Boss Valquiria",
      hp: 125,
      dano: 18,
      behavior: () => [
        { type: "attack", value: Math.random() < 0.7 ? 18 : 36 }
      ],
      img: "../img/jogo/inimigos/bossValquiria.png",
      tipoDano: "(⚔️)💥",
      tipoVida: "❤️"
    },
    {
      name: "IA sacerdotisa",
      hp: 24,
      dano: 2,
      behavior: () => [{ type: "heal", value: Math.random() < 0.3 ? 2 : 4 }],
      img: "../img/jogo/inimigos/sacerdotisa.png",
      tipoDano: "(💚🎭💊)💥",
      tipoVida: "❤️"
    },
  ],
  [
    {
      name: "Lobo",
      hp: 20,
      dano: 5,
      behavior: () => [
        { type: "attack", value: Math.random() < 0.7 ? 5 : 10 }
      ],
      img: "../img/jogo/inimigos/lobo.png",
      tipoDano: "(⚔️)💥",
      tipoVida: "❤️"
    },
    {
      name: "Boss Alfa",
      hp: 100,
      dano: 10,
      behavior: () => [{ type: "attackVida", value: 10 }],
      img: "../img/jogo/inimigos/bossLobo.png",
      tipoDano: "🔱",
      tipoVida: "❤️"
    },
    {
      name: "Lobo",
      hp: 20,
      dano: 5,
      behavior: () => [
        { type: "attack", value: Math.random() < 0.7 ? 5 : 10 }
      ],
      img: "../img/jogo/inimigos/lobo.png",
      tipoDano: "(⚔️)💥",
      tipoVida: "❤️"
    }
  ]
];

function createEnemy(imgSrc) {
  const div = document.createElement("div");
  div.className = "enemy";
  div.innerHTML = `<img src="${imgSrc}" alt="Inimigo">`;
  document.getElementById("enemies").appendChild(div);
  return div;
}

let enemies = [];

function spawnEnemies(tipo) {
  playerShield = playerShieldInit;
  enemies = [];
  const enemiesContainer = document.getElementById("enemies");
  enemiesContainer.innerHTML = "";
  document.getElementById("lifeBarsContainer").innerHTML = "";

  let pool;
  switch (tipo) {
    case "inimigo": pool = normalModels; break;
    case "elite":   pool = eliteModels;  break;
    case "boss":    pool = bossModels;   break;
    default:
      console.warn("Tipo desconhecido:", tipo);
      return;
  }

  const block = pool[Math.floor(Math.random() * pool.length)];

  block.forEach(base => {
    const enemy = {
      name: base.name,
      hp: base.hp,
      maxHp: base.hp,
      dano: base.dano,
      behavior: base.behavior,
      el: createEnemy(base.img),
      tipoDano: base.tipoDano,
      tipoVida: base.tipoVida
    };
    enemies.push(enemy);
    enemy.el.style.display = "inline-block";

    const lifeBar = document.createElement("p");
    lifeBar.className = "enemy-bar";
    lifeBar.innerHTML = `
      <strong> ⟪ ${enemy.name} ⟫ </strong><br>
      ⟪ ${enemy.tipoVida} <span class="enemy-hp">${enemy.hp}</span> - </strong>
      ${enemy.tipoDano} <strong>${enemy.dano} ⟫ </strong>
    `;
    document.getElementById("lifeBarsContainer").appendChild(lifeBar);

    enemy.barEl = lifeBar.querySelector(".enemy-hp");
  });
}



function updateEnemyBars() {
  enemies.forEach(enemy => {
    if (enemy.barEl) {
      enemy.barEl.textContent = enemy.hp; // só muda o HP
    }
  });
}

function displayInimigos() {
  document.getElementById("enemies").style.display = "flex";
  document.getElementById("lifeBarsContainer").style.display = "flex";
}

function updateHUD() {
  document.getElementById("hp").textContent = `${playerHP} / ${playerMaxHP} | 🛡️ ${playerShield}  `;
  document.getElementById("energy").textContent = energy;

  enemies.forEach(e => {
    if (e.barEl) e.barEl.textContent = e.hp > 0 ? e.hp : 0;
  });
}

let floatQueue = [];
let showingFloat = false;

function floatText(target, text, color) {
  // Adiciona à fila
  floatQueue.push({ target, text, color });

  // Se já estiver mostrando, não dispara outra
  if (!showingFloat) processFloatQueue();
}

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
  div.style.pointerEvents = "none"; // Para não bloquear cliques
  div.innerText = text;
  document.body.appendChild(div);

  // 🔹 Posição inicial
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;

  if (target && target.getBoundingClientRect) {
    const rect = target.getBoundingClientRect();
    x = rect.left + rect.width / 2 + window.scrollX;
    y = rect.top + window.scrollY - 20; // sobe um pouco acima do alvo
  }

  div.style.left = x + "px";
  div.style.top = y + "px";
  div.style.transform = "translateX(-50%)";

  // 🔹 Animação (subir e desaparecer)
  setTimeout(() => {
    div.style.transition = "all 0.8s ease-out";
    div.style.opacity = "0";
    div.style.top = (y - 40) + "px";
  }, 50);

  // 🔹 Remover e processar próximo
  setTimeout(() => {
    div.remove();
    processFloatQueue();
  }, 900);
}

function glowPlayer(color) {
  const p = document.getElementById("player");
  p.classList.remove("glow-blue", "glow-green");
  if (color === "blue") p.classList.add("glow-blue");
  if (color === "green") p.classList.add("glow-green");
  if (color === "cintilante") p.classList.add("glow-cintilante");
  setTimeout(() => p.classList.remove("glow-blue", "glow-green", "glow-cintilante"), 1000);
}

function animateDamage(el) {
  el.classList.add("shake", "damaged");
  setTimeout(() => el.classList.remove("shake", "damaged"), 400);
}



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
        tipo = "cintilante";
        break;
      // ⚔️⚔️⚔️⚔️⚔️ ATAQUE 11 ⚔️⚔️⚔️⚔️⚔️
      case "Ataque":
      case "Liderança":
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
      case "Arpão":
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
      case "Ataque Reciclável":
      case "Terror Critico":
      case "Defesa Reciclável":
      case "Xenofluxo Reciclável":
      case "Destruir Carta":
        tipo = "reciclagem";
        break;
      //  🗑️🗑️🗑️🗑️🗑️ LIXO 9 🗑️🗑️🗑️🗑️🗑️
      case "Entulho":
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

      //  ⚔️⚔️⚔️⚔️⚔️ ATAQUE ⚔️⚔️⚔️⚔️⚔️
      if (card.name === "Ataque") {
        animateDamage(enemies[0].el);
        enemies[0].hp -= card.power;
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
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
      }
      //⚔️
      else if (card.name === "Vingativo") {
        animateDamage(enemies[0].el);
        dano = playerMaxHP - playerHP;
        enemies[0].hp -= dano;
        floatText(enemies[0].el, `-${dano}⚔️`, "red");
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
      }
      //⚔️
      else if (card.name === "Liderança") {
        animateDamage(enemies[0].el);
        enemies[0].hp -= card.power;
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
        for (let i = 0; i < 2; i++) {
          const newCard = {
            ...allCards[Math.floor(Math.random() * allCards.length)],
            power: allCards[Math.floor(Math.random() * allCards.length)].basePower
          };
          deck.push(newCard); // adiciona diretamente, ignorando limite
        }
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
      }
      //⚔️
      else if (card.name === "Drenagem") {
        playerShield += card.power;
        glowPlayer("green");
        playerHP = Math.min(playerHP + card.power, playerMaxHP);
        enemies[0].hp -= card.power;
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
        floatText(document.getElementById("player"), `+${card.power}💚`, "lime")
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });;
      }

      else if (card.name === "Explosão") {
        enemies.forEach(e => {
          animateDamage(e.el);
          e.hp -= card.power;
          floatText(e.el, `-${card.power}⚔️`, "red");
        });
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
      }
      //⚔️
      else if (card.name === "Chuva De Fragmentos") {
        enemies.forEach(e => {
          animateDamage(e.el);
          e.hp -= card.power;
          floatText(e.el, `-${card.power}⚔️`, "red");
        });
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
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
      }
      //⚔️
      else if (card.name === "Rajada Dupla") {
        animateDamage(enemies[0].el);
        enemies[0].hp -= card.power;
        enemies[0].hp -= card.power;
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
      }
      //⚔️
      else if (card.name === "Impacto Bruto") {
        animateDamage(enemies[0].el);
        enemies[0].hp -= card.power;
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
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
      }

      //  🛡️🛡️🛡️🛡️🛡️ DEFESA 🛡️🛡️🛡️🛡️🛡️
      else if (card.name === "Defesa") {
        playerShield += card.power;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
      }
      //🛡️
      else if (card.name === "Em guarda") {
        if (playerShield > 0) {
          playerShield += card.power;
          glowPlayer("blue");
          floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
        }
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
      }
      //🛡️
      else if (card.name === "Impulso Defensivo") {
        energy += 1;
        playerShield += 3;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${card.power}🔷`, "cyan");
        floatText(document.getElementById("player"), `+${card.power + 2}🛡️`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
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
      }
      //🛡️
      else if (card.name === "Escudo") {
        playerShield += card.power;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
      }
      //🛡️
      else if (card.name === "Indestrutivel") {
        escudo = playerShield * 2;
        playerShield = playerShield * card.power;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${escudo}🛡️`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
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
      }
      //🛡️
      else if (card.name === "PROTOCOL-Campo De Força") {
        if (playerHP <= 30) {
          playerShield += card.power;
          floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
          glowPlayer("blue");
        }
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
      }
      
      else if (card.name === "Brilhando") {
        if (playerHP == playerMaxHP) {
          playerShield += card.power;
          floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
          glowPlayer("blue");
        }
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
      }
      //🛡️
      else if (card.name === "Escudo Retaliante") {
        animateDamage(enemies[0].el);
        enemies[0].hp -= playerShield;
        floatText(enemies[0].el, `-${playerShield}⚔️`, "red");
        glowPlayer("blue");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
      }

      //  💚💚💚💚💚 BUFF 💚💚💚💚💚
      else if (card.name === "Cura") {
        playerHP = Math.min(playerHP + card.power, playerMaxHP);
        glowPlayer("green");
        floatText(document.getElementById("player"), `+${card.power}💚`, "lime");
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
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
      }
      //💚
      else if (card.name === "Golpe Neural Retaliante") {
        animateDamage(enemies[0].el);
        animateDamage(document.getElementById("player"));
        enemies[0].hp -= playerHP;
        floatText(enemies[0].el, `-${playerHP}⚔️`, "red");
        playerHP -= card.power;
        floatText(document.getElementById("player"), `-${card.power}💔`, "red");
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
      }
      //💚
      else if (card.name === "Impulso") {
        if (limiteMao < 10) {
          limiteMao += 1;
        }
        glowPlayer("green");
        floatText(document.getElementById("player"), `+${card.power}➕`, "lime");
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
      }
      //💚
      else if (card.name === "Mineração") {
        energy += 3;
        glowPlayer("green");
        floatText(document.getElementById("player"), `+${3}🔷`, "lime");
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
      }
      //💚
      else if (card.name === "PROTOCOL-Reforço Estrutural") {
        if (playerHP <= 30) {
          playerHP = Math.min(playerHP + card.power, playerMaxHP);
          floatText(document.getElementById("player"), `+${card.power}💚`, "lime");
          glowPlayer("green");
          deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
        }
      }
      //💚
      else if (card.name === "Compra Dupla") {
        for (let i = 0; i < 2; i++) {
          const newCard = {
            ...allCards[Math.floor(Math.random() * allCards.length)],
            power: allCards[Math.floor(Math.random() * allCards.length)].basePower
          };
          deck.push(newCard); // adiciona diretamente, ignorando limite
        }
        glowPlayer("green");
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
      }

      //  ♻️♻️♻️♻️♻️ RECICLAGEM ♻️♻️♻️♻️♻️
      else if (card.name === "Recicladora") {
        let dano = card.power;
        if (deck.length <= 1) {
          dano = 50;
        }
        animateDamage(enemies[0].el);
        enemies[0].hp -= dano;
        floatText(enemies[0].el, `-${dano}⚔️`, "red");
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
      else if (card.name === "Defesa Reciclável") {
        const toRemove = new Set();
        toRemove.add(card);
        let lixoRemovido = 0;

        for (let j = 0; j < deck.length; j++) {
          const c = deck[j];
          if (c !== card && c.type === "lixo") {
            toRemove.add(c);
            lixoRemovido++;
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

        energy += lixoRemovido;
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
      }
      //🗑️
      else if (card.name === "Lixo quimico") {
      }
      //🗑️
      else if (card.name === "Escudo quebrado") {
        floatText(document.getElementById("player"), `+${"0"}🛡️`, "cyan");
      }
      //🗑️
      else if (card.name === "Cura Quebrada") {
        floatText(document.getElementById("player"), `+${"0"}💚`, "lime");
      }
      //🗑️
      else if (card.name === "Arma Quebrada") {
        floatText(enemies[0].el, `-${"0"}⚔️`, "red");
      }      
      //🗑️
      else if (card.name === "Restos de mecha") {
        if (energy < card.cost) return;
        energy -= card.cost;
        for (let i = 0; i < 3; i++) {
          deck.push({ ...allCards.find(c => c.name === "Entulho"), power: 0 });
        }
      }
      //🗑️
      else if (card.name === "Ferro Velho") {
        if (energy < card.cost) return;
        energy -= card.cost;
        // Adiciona 2 cartas de Entulho na mão
        for (let i = 0; i < 2; i++) {
          deck.push({ ...allCards.find(c => c.name === "Entulho"), power: 0 });
        }
      }
      //🗑️
      else if (card.name === "Chamado do Alfa") {
        if (energy < card.cost) return;
        energy -= card.cost;
        for (let i = 0; i < 2; i++) {
          deck.push({ ...allCards.find(c => c.name === "Alcateia"), power: 0 });
        }
      }
      //🗑️
      else if (card.name === "Alcateia") {
        if (energy < card.cost) return;
        energy -= card.cost;
        for (let i = 0; i < 2; i++) {
          deck.push({ ...allCards.find(c => c.name === "Lobo"), power: 0 });
        }
      }
      //🗑️
      else if (card.name === "Lobo") {
        animateDamage(document.getElementById("player"));
        playerHP -= 2;
        floatText(document.getElementById("player"), `${"-2"}⚔️`, "red");
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
      // caso a energia seja 0 ele skipa o turno auto
      // if (energy === 0) enemyTurn();
    };
    cards.appendChild(div);
  });
}

function drawNewCards() {
  deck.length = 0;
  const maxCopies = 1;

  while (deck.length < limiteMao) {
    const base = { ...allCards[Math.floor(Math.random() * allCards.length)] };

    // conta quantas vezes tal carta já foi adicionada
    const count = deck.filter(card => card.name === base.name).length;

    if (count < maxCopies) {
      deck.push({ ...base, power: base.basePower });
    }
  }
}

function takeDamage(dmg) {
  if (playerShield > 0) {
    const absorbed = Math.min(playerShield, dmg);
    playerShield -= absorbed;
    dmg -= absorbed;
  }

  if (dmg > 0) {
    playerHP -= dmg;
  }

  if (playerHP < 0) playerHP = 0;

  playerShield = playerShieldInit;
  updateHUD();
}

function enemyTurn() {
  setTimeout(() => {
    [...enemies].forEach(e => {
      const actions = e.behavior();

      actions.forEach(act => {
        if (act.type === "attack") {
          let dano = act.value;

          if (playerShield > 0) {
            let absorbed = Math.min(dano, playerShield);
            playerShield -= absorbed;
            dano -= absorbed;
          }

          if (dano > 0) {
            playerHP -= dano;
          }

          animateDamage(document.getElementById("player"));
          floatText(document.getElementById("player"), `-${act.value}⚔️`, "orange");

        } else if (act.type === "attackVida") {
          playerHP -= act.value;
          animateDamage(document.getElementById("player"));
          floatText(document.getElementById("player"), `-${act.value}🔱`, "orange");

        } else if (act.type === "heal") {
          let target = null;
          if (enemies.length > 0) {
            if (enemies[0] !== e && enemies[0].hp > 0) {
              target = enemies[0];
            } else {
              for (let t of enemies) {
                if (t !== e && t.hp > 0) { target = t; break; }
              }
            }
          }
          if (!target) {
            if (e.hp > 0) target = e;
          }
          if (target) {
            const max = target.maxHp ?? target.hp;
            const healed = act.value;
            target.hp = Math.min(target.hp + healed, max);
            floatText(target.el, `+${healed}💚`, "green");
            target.el.classList.add("healed");
            setTimeout(() => target.el.classList.remove("healed"), 600);
          }

        } else if (act.type === "morrer") {
          // garante contador por inimigo
          if (e.turnosRestantes === undefined) {
            e.turnosRestantes = 3; // começa com 3 turnos de vida
          }

          // ataca normalmente
          let dano = e.dano;
          if (playerShield > 0) {
            let absorbed = Math.min(dano, playerShield);
            playerShield -= absorbed;
            dano -= absorbed;
          }
          if (dano > 0) {
            playerHP -= dano;
          }
          animateDamage(document.getElementById("player"));
          floatText(document.getElementById("player"), `-${e.dano}⚔️`, "orange");

          // reduz turnos restantes
          e.turnosRestantes--;

          // quando acabar, mata de vez
          if (e.turnosRestantes <= 0) {
            floatText(e.el, `💀`, "red");
            e.hp = 0;
            checkEnemies(); // deixa a rotina normal cuidar de remover animações/UI
          }
        }
        if (playerHP <= 0) {
            document.getElementById("overlay").style.display = "block";
              document.getElementById("popupOver").style.display = "block";
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
      });
    });

    // fim de turno do jogador
    energy = energyMax;
    playerShield = playerShieldInit;
    drawNewCards();
    drawCards();
    updateHUD();
    checkGameOver();
  }, 600);
}

function checkEnemies() {
  for (let i = enemies.length - 1; i >= 0; i--) {
    if (enemies[i].hp <= 0) {

      // anima inimigo
      if (enemies[i].el) {
        enemies[i].el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        enemies[i].el.style.opacity = "0";
        enemies[i].el.style.transform = "scale(0.8)";
      }

      // anima barra de vida
      if (enemies[i].barEl) {
        const barP = enemies[i].barEl.closest("p");
        if (barP) {
          barP.style.transition = "opacity 0.5s ease";
          barP.style.opacity = "0";
        }
      }

      // remove após animação
      ((index) => {
        setTimeout(() => {
          if (enemies[index]) {
            if (enemies[index].el) enemies[index].el.remove();
            if (enemies[index].barEl) {
              const barP = enemies[index].barEl.closest("p");
              if (barP) barP.remove();
            }
            enemies.splice(index, 1);

            // se não houver mais inimigos, abre popup
            if (mapaBatalha === 10 && enemies.length === 0 && playerHP > 0) {
              document.getElementById("overlay").style.display = "block";
              document.getElementById("popupFinal").style.display = "block";
              gerarItens();
              limiteMao = maoInicio;
              document.getElementById("enemies").style.display = "none";
              document.getElementById("lifeBarsContainer").style.display = "none";
              energy = energyMax;
              drawNewCards();
              drawCards();
              updateHUD();
              playerShield = playerShieldInit;
            } else if (enemies.length === 0 && playerHP > 0) {
              document.getElementById("overlay").style.display = "block";
              document.getElementById("popup").style.display = "block";
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
          }
        }, 500);
      })(i); // captura o valor de i
    }
  }
}

function gerarItens() {
  const container = document.getElementById("recompensa");

  // Limpa itens antigos
  container.innerHTML = "";

  for (let i = 1; i <= 3; i++) {
    // Cria um novo elemento
    const item = document.createElement("div");

    // Define conteúdo do item
    item.textContent = "Item " + i;

    // Adiciona estilo opcional
    item.style.padding = "10px";
    item.style.margin = "5px";
    item.style.backgroundColor = "#444";
    item.style.borderRadius = "5px";

    // Adiciona o item dentro do container
    container.appendChild(item);
  }
}

function fecharPopup() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("popup").style.display = "none";
}

function checkGameOver() {
  if (playerHP <= 0) {
    document.getElementById("cards").innerHTML = "";
  }
}

 // gera inimigos aleatórios no início

function mostrarTela(n) {
  for(let i = 1; i <= 6; i++) {
    const tela = document.getElementById(`div${i}`);
    if(tela) {
      if(i === n) {
        tela.style.transform = "translateY(0)";
        tela.style.zIndex = 10;
      } else {
        tela.style.transform = "translateY(100%)";
        tela.style.zIndex = i;
      }
    }
  }
  telaAtual = n;
}

function proximaTela() {
  if (telaAtual >= 3) return;
  mostrarTela(telaAtual + 1);
}

function irParaDiv2() {
  mostrarTela(2);
}

function irParaDiv4() {
  telaAnterior = telaAtual;
  mostrarTela(4);
}

function irParaDiv5() {
  telaAnterior = telaAtual;
  mostrarTela(5);
}

function irParaDiv6() {
  telaAnterior = telaAtual;
  mostrarTela(6);
}

function voltarAnterior() {
  if(telaAnterior) {
    mostrarTela(telaAnterior);
    telaAnterior = null;
  } else {
    mostrarTela(1);
  }
}
// SELECAO
// --- SELEÇÃO DE PERSONAGEM (um por vez) ---
const personagens = document.querySelectorAll("#selecaoPlayer img");
let personagemSelecionado = null;

personagens.forEach(img => {
  img.addEventListener("click", () => {
    // Remove seleção anterior
    personagens.forEach(p => p.classList.remove("selecionado"));

    // Marca o atual
    img.classList.add("selecionado");
    personagemSelecionado = img.id;
  });
});

// Botão confirmar seleção
document.getElementById("fimSelecao").addEventListener("click", () => {
  if (!personagemSelecionado) {
    alert("Selecione um personagem primeiro!");
    return;
  }
  criarPlayerNaDiv3(); // cria o player na tela de batalha
  mostrarTela(2);      // vai para o mapa, por exemplo
  console.log("Selecionado:", personagemSelecionado);
  // Aqui você coloca a lógica de troca de tela (div1 → div2)
});

// MAPA
const container = document.getElementById("div2");
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
    margin-left: 16.8%;
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
    margin-left: 5.7%;
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
  }
  .nodo:hover { transform: scale(1.1); }
  .inimigo  { background: #d33; }
  .loot     { background: #fd0; }
  .loja     { background: #0d8; }
  .ferreiro { background: rgba(99, 78, 49, 1); }
  .elite    { background: #a3f; }
  .hospital { background: #4cf; }
  .boss     { background: #000; border: 2px solid white; }
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
}

  /* =================== NOTEBOOK =================== */
@media (min-width: 1025px) and (max-width: 1940px) {
  #mapa {
    max-width: 1000px;
    height: 180vh;
    margin-right: 306px;
    margin-top:92px;
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
    margin-right: -248px;
    margin-top:-20px;
  }
  canvas{
  margin-top: -78px;
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
  const tipos = ['inimigo', 'hospital','ferreiro' ,'elite'];
  const mapa = [];
  const numFases = 10;
  const caminhosPorFase = 5;
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
    for (let i = 0; i < numFases; i++) {
      const coluna = [];
      for (let j = 0; j < caminhosPorFase; j++) {
        let tipo = tipos[Math.floor(Math.random() * tipos.length)];
        if (i === 0) tipo = (j === Math.floor(caminhosPorFase / 2)) ? 'inimigo' : 'invalido';
        else if (i === numFases - 1) tipo = (j === Math.floor(caminhosPorFase / 2)) ? 'boss' : 'invalido';
        coluna.push({ tipo, conexoes: [] });
      }
      mapa.push(coluna);
    }

    for (let i = 0; i < numFases - 1; i++) {
      for (let j = 0; j < caminhosPorFase; j++) {
        if (mapa[i][j].tipo === 'invalido') continue;

        if (i === 0) {
          mapa[i][j].conexoes = [];
          for (let k = 0; k < caminhosPorFase; k++) {
            if (mapa[i + 1][k].tipo !== 'invalido') {
              mapa[i][j].conexoes.push(k);
            }
          }
          continue;
        }

        if (i === numFases - 2) {
          mapa[i][j].conexoes.push(Math.floor(caminhosPorFase / 2));
          continue;
        }

        let possiveis = [];
        if (j > 0 && mapa[i + 1][j - 1].tipo !== 'invalido') possiveis.push(j - 1);
        if (mapa[i + 1][j].tipo !== 'invalido') possiveis.push(j);
        if (j < caminhosPorFase - 1 && mapa[i + 1][j + 1].tipo !== 'invalido') possiveis.push(j + 1);
        mapa[i][j].conexoes = shuffle(possiveis).slice(0, Math.floor(Math.random() * 2) + 1);
      }
    }

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

  function desenharMapa() {
    mapaContainer.innerHTML = '';
    mapa.forEach((coluna, i) => {
      const colDiv = document.createElement('div');
      colDiv.classList.add('coluna');

      coluna.forEach((nodo, j) => {
        const el = document.createElement('div');
        el.classList.add('nodo', nodo.tipo);
        el.dataset.pos = `${i}-${j}`;
        el.textContent = {
        boss: '👑',
        inimigo: '💀',
        loja: '🛒',
        elite: '☠️',
        ferreiro: '⚒️',
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
    ctx.strokeStyle = "#fff";
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
    case 'elite':
    case 'boss':
      telaAnterior = 2;
      mostrarTela(3); // Tela de luta (div3)
      // window.location.href = "batalha.html";
      spawnEnemies(tipo);
      drawNewCards();
      drawCards();
      updateHUD();
      break;

    case 'loja':
      telaAnterior = 2;
      mostrarTela(4); // Tela da loja (div4)
      break;

    case 'ferreiro':
      telaAnterior = 2;
      mostrarTela(6);
      break;

    case 'hospital':
      telaAnterior = 2;
      mostrarTela(5); // Tela do hospital (div5)
      break;

    default:
      alert('Tipo de sala não reconhecido.');
  }

  mapaBatalha++
  if (mapaBatalha === 6) {
    const div = document.getElementById("jogo");
  // mudar img
  div.style.backgroundImage = "url('../img/jogo/background/luta3.png')";
  }
}

  gerarMapa();
  desenharMapa();
})();

var myMusic = new Audio("./../audio/artblock.ogg");
myMusic.loop = true;
myMusic.play();