let playerHP = 100, energy = 3, playerShield = 0;
let playerMaxHP = 100;

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
    desc: "Adiciona 5 cartas de Entulho à sua mão.",
    type: "lixo"
  },
  {
    name: "Chamado do Alfa",
    cost: 0,
    basePower: 0,
    rarity: "epic",
    img: "../img/jogo/cards/lixo/alfa.png",
    desc: "Adiciona 2 cartas de Alcateia à sua mão.",
    type: "lixo"
  },
  {
    name: "Alcateia",
    cost: 0,
    basePower: 0,
    rarity: "rare",
    img: "../img/jogo/cards/lixo/alcateia.png",
    desc: "Adiciona 2 cartas de Lobo à sua mão.",
    type: "lixo"
  },
  {
    name: "Lobo",
    cost: 0,
    basePower: 0,
    rarity: "common",
    img: "../img/jogo/cards/lixo/lobo.png",
    desc: "Cause 2 de dano a você.",
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

const enemyModels = [
  // ⚔️ atk normal
  // 🔱 ignora armadura
  // 💚 prioriza curar aliados
  // 💊 auto cura
  // 💞 inicio da batalha aumenta a vida maxima dos aliados adjacentes em 15 (dura até apos a morte)
  // (⚔️)💥 chance de (30%) crit X2 (apenas ações dentro do parenteses)
  // (⚔️)🧨 chance de (15%) crit X4 (apenas ações dentro do parenteses)
  // (⚔️)💣 chance de (10%) crit X5 (apenas ações dentro do parenteses)
  // ⚔️🎭💚 se não puder executar a primeira ação executa a segunda
  // ⚔️❓💚 pode executar 2 ações, ou uma ou outra que esta adjacente (50% de chance)
  // ⚔️❔💚 pode executar 2 ações, ou uma ou outra que esta adjacente, porém uma possui mais chance que a outra
  // 🩸💫⚜️✨💤🤢🥶💀 n criado

  // BOSS
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
    },
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
  ],
  // ELITE
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
      img: "../img/jogo/inimigos/coisa.webp",
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
        { type: Math.random() < 0.3 ? "attack" : "heal", value: 10 }
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
  ],
  // NORMAL
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
        { type: Math.random() < 0.5 ? "attack" : "attackVida" , value: 12 }
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
        { type: Math.random() < 0.5 ? "attack" : "attackVida" , value: 12 }
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

function createEnemy(imgSrc) {
  const div = document.createElement("div");
  div.className = "enemy";
  div.innerHTML = `<img src="${imgSrc}" alt="Inimigo">`;
  document.getElementById("enemies").appendChild(div);
  return div;
}

let enemies = [];

function spawnEnemies() {
  enemies = [];
  const enemiesContainer = document.getElementById("enemies");
  enemiesContainer.innerHTML = ""; // limpa inimigos
  document.getElementById("lifeBarsContainer").innerHTML = ""; // limpa barras de status

  // escolhe um bloco aleatório
  const block = enemyModels[Math.floor(Math.random() * enemyModels.length)];

  // percorre cada inimigo do bloco
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

    // cria barra de status individual
    const lifeBar = document.createElement("p");
    lifeBar.className = "enemy-bar";
    lifeBar.innerHTML = ` <strong> ⟪ ${enemy.name} ⟫ <br> ⟪ ${enemy.tipoVida} <span class="enemy-hp">${enemy.hp}</span> - </strong> ${enemy.tipoDano} <strong>${enemy.dano} ⟫ </strong>`;
    document.getElementById("lifeBarsContainer").appendChild(lifeBar);

    // linka a barra ao inimigo
    enemy.barEl = lifeBar.querySelector(".enemy-hp");
  });
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
    let tipo = card.name === "Ataque" || card.name === "Liderança" || card.name === "Vingativo" || card.name === "Rebeldia" || card.name === "Impacto Bruto" || card.name === "Fogo Amigo" || card.name === "Drenagem" || card.name === "Beserck" || card.name === "Explosão" || card.name === "Chuva De Fragmentos" || card.name === "Rajada Dupla" ? "attack" : card.name === "Recicladora" || card.name === "Ataque Reciclável" || card.name === "Terror Critico" || card.name === "Defesa Reciclável" || card.name === "Xenofluxo Reciclável" || card.name === "Destruir Carta" ? "reciclagem" : card.name === "Entulho" || card.name === "Lixo quimico" || card.name === "Lobo" || card.name === "Alcateia" || card.name === "Chamado do Alfa" || card.name === "Arma Quebrada" || card.name === "Escudo quebrado" || card.name === "Restos de mecha" || card.name === "Ferro Velho" ? "lixo" :
      card.name === "Defesa" || card.name === "Arpão" || card.name === "Em guarda" || card.name === "Indestrutivel" || card.name === "Sistema de reflexão" || card.name === "Escudo Retaliante" || card.name === "Impulso Defensivo" || card.name === "PROTOCOL-Campo De Força" || card.name === "Brilhando" || card.name === "Escudo" ? "defense" : card.name === "GÆPROTOCOL" || card.name === "Guardião" ? "cintilante" :
        card.name === "Cura" || card.name === "Sob-Vigia" || card.name === "Mineração" || card.name === "PROTOCOL-Reforço Estrutural" || card.name === "Impulso" || card.name === "Golpe Neural Retaliante" || card.name === "Compra Dupla" || card.name === "Sobre Carga" ? "heal" : "";
    div.className = `card ${card.rarity} ${tipo}`;
    div.innerHTML = `
          <img src="${card.img}" alt="${card.name}">
          <div class="energia"><strong>${card.cost}</strong></div>
          <div class="desc"><strong>${card.name}</strong><br><em>${card.desc}</em></div>
        `;
    div.onclick = () => {
      if (energy < card.cost || playerHP <= 0 || enemies.length === 0) return;
      energy -= card.cost;

      if (card.name === "Ataque") {
        animateDamage(enemies[0].el);
        enemies[0].hp -= card.power;
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
      } else if (card.name === "Rebeldia") {
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
      } else if (card.name === "Vingativo") {
        animateDamage(enemies[0].el);
        dano = playerMaxHP - playerHP;
        enemies[0].hp -= dano;
        floatText(enemies[0].el, `-${dano}⚔️`, "red");
      } else if (card.name === "Liderança") {
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
      } else if (card.name === "Defesa") {
        playerShield += card.power;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
      } else if (card.name === "Em guarda") {
        if (playerShield > 0) {
          playerShield += card.power;
          glowPlayer("blue");
          floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
        }
      } else if (card.name === "Arpão") {
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
      } else if (card.name === "Indestrutivel") {
        escudo = playerShield * 2;
        playerShield = playerShield * card.power;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${escudo}🛡️`, "cyan");
      } else if (card.name === "Drenagem") {
        playerShield += card.power;
        glowPlayer("green");
        playerHP = Math.min(playerHP + card.power, playerMaxHP);
        enemies[0].hp -= card.power;
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
        floatText(document.getElementById("player"), `+${card.power}💚`, "lime");
      } else if (card.name === "Cura") {
        playerHP = Math.min(playerHP + card.power, playerMaxHP);
        glowPlayer("green");
        floatText(document.getElementById("player"), `+${card.power}💚`, "lime");
      } else if (card.name === "Sob-Vigia") {
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
      } else if (card.name === "Explosão") {
        enemies.forEach(e => {
          animateDamage(e.el);
          e.hp -= card.power;
          floatText(e.el, `-${card.power}⚔️`, "red");
        });
      } else if (card.name === "Chuva De Fragmentos") {
        enemies.forEach(e => {
          animateDamage(e.el);
          e.hp -= card.power;
          floatText(e.el, `-${card.power}⚔️`, "red");
        });
      } else if (card.name === "Fogo Amigo") {
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
      } else if (card.name === "Escudo") {
        playerShield += card.power;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
      } else if (card.name === "Rajada Dupla") {
        animateDamage(enemies[0].el);
        enemies[0].hp -= card.power;
        enemies[0].hp -= card.power;
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
      } else if (card.name === "Impacto Bruto") {
        animateDamage(enemies[0].el);
        enemies[0].hp -= card.power;
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
      } else if (card.name === "Sobre Carga") {
        animateDamage(enemies[0].el);
        animateDamage(document.getElementById("player"));
        playerHP = Math.min(playerHP - card.power, playerMaxHP);
        enemies[0].hp -= card.power * 3;
        floatText(enemies[0].el, `-${card.power * 3}⚔️`, "red");
        floatText(document.getElementById("player"), `-${card.power}💔`, "red");
      } else if (card.name === "Sistema de reflexão") {
        animateDamage(enemies[0].el);
        glowPlayer("blue");
        playerShield += (card.power * 2);
        enemies[0].hp -= card.power;
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
        floatText(document.getElementById("player"), `+${(card.power * 2)}🛡️`, "cyan");
      } else if (card.name === "Golpe Neural Retaliante") {
        animateDamage(enemies[0].el);
        animateDamage(document.getElementById("player"));
        enemies[0].hp -= playerHP;
        floatText(enemies[0].el, `-${playerHP}⚔️`, "red");
        playerHP -= card.power;
        floatText(document.getElementById("player"), `-${card.power}💔`, "red");
      } else if (card.name === "Beserck") {
        let dano = card.power;
        if (deck.length <= 3) {
          dano = card.power * 3;
        }
        animateDamage(enemies[0].el);
        enemies[0].hp -= dano;
        floatText(enemies[0].el, `-${dano}⚔️`, "red");
      } else if (card.name === "Impulso") {
        if (limiteMao < 10) {
          limiteMao += 1;
        }
        glowPlayer("green");
        floatText(document.getElementById("player"), `+${card.power}➕`, "lime");
      } else if (card.name === "Mineração") {
        energy += card.power;
        glowPlayer("green");
        floatText(document.getElementById("player"), `+${card.power}🔷`, "lime");
      } else if (card.name === "PROTOCOL-Reforço Estrutural") {
        if (playerHP <= 30) {
          playerHP = Math.min(playerHP + card.power, playerMaxHP);
          floatText(document.getElementById("player"), `+${card.power}💚`, "lime");
          glowPlayer("green");
        }
      } else if (card.name === "PROTOCOL-Campo De Força") {
        if (playerHP <= 30) {
          playerShield += card.power;
          floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
          glowPlayer("blue");
        }
      } else if (card.name === "Brilhando") {
        if (playerHP == playerMaxHP) {
          playerShield += card.power;
          floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
          glowPlayer("blue");
        }
      } else if (card.name === "Guardião") {
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
      } else if (card.name === "Terror Critico") {
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
      } else if (card.name === "Impulso Defensivo") {
        energy += 1;
        playerShield += 3;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${card.power}🔷`, "cyan");
        floatText(document.getElementById("player"), `+${card.power + 2}🛡️`, "cyan");
      } else if (card.name === "Recicladora") {
        let dano = card.power;
        if (deck.length <= 1) {
          dano = 50;
        }
        animateDamage(enemies[0].el);
        enemies[0].hp -= dano;
        floatText(enemies[0].el, `-${dano}⚔️`, "red");
      } else if (card.name === "Entulho") {
      } else if (card.name === "Lixo quimico") {
      } else if (card.name === "Escudo quebrado") {
        floatText(document.getElementById("player"), `+${"0"}🛡️`, "cyan");
      } else if (card.name === "Arma Quebrada") {
        floatText(enemies[0].el, `-${"0"}⚔️`, "red");
      } else if (card.name === "Compra Dupla") {
        for (let i = 0; i < 2; i++) {
          const newCard = {
            ...allCards[Math.floor(Math.random() * allCards.length)],
            power: allCards[Math.floor(Math.random() * allCards.length)].basePower
          };
          deck.push(newCard); // adiciona diretamente, ignorando limite
        }
        glowPlayer("green");
      } else if (card.name === "Escudo Retaliante") {
        animateDamage(enemies[0].el);
        enemies[0].hp -= playerShield;
        floatText(enemies[0].el, `-${playerShield}⚔️`, "red");
        glowPlayer("blue");
      } else if (card.name === "Restos de mecha") {
        if (energy < card.cost) return;
        energy -= card.cost;
        // Adiciona 2 cartas de Entulho na mão
        for (let i = 0; i < 3; i++) {
          deck.push({ ...allCards.find(c => c.name === "Entulho"), power: 0 });
        }
      } else if (card.name === "Ferro Velho") {
        if (energy < card.cost) return;
        energy -= card.cost;
        // Adiciona 2 cartas de Entulho na mão
        for (let i = 0; i < 2; i++) {
          deck.push({ ...allCards.find(c => c.name === "Entulho"), power: 0 });
        }
      } else if (card.name === "Chamado do Alfa") {
        if (energy < card.cost) return;
        energy -= card.cost;
        for (let i = 0; i < 2; i++) {
          deck.push({ ...allCards.find(c => c.name === "Alcateia"), power: 0 });
        }
      } else if (card.name === "Alcateia") {
        if (energy < card.cost) return;
        energy -= card.cost;
        for (let i = 0; i < 2; i++) {
          deck.push({ ...allCards.find(c => c.name === "Lobo"), power: 0 });
        }
      } else if (card.name === "Lobo") {
        animateDamage(document.getElementById("player"));
        playerHP -= 2;
        floatText(document.getElementById("player"), `${"-2"}⚔️`, "red");
      } else if (card.name === "Destruir Carta") {
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
      } else if (card.name === "Ataque Reciclável") {
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
      } else if (card.name === "Defesa Reciclável") {
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
      } else if (card.name === "Xenofluxo Reciclável") {
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
      } else if (card.name === "GÆPROTOCOL") {
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
// buff em itens aumenta esse
let maoInicio = 7;
// buff em cards aumenta esse
let limiteMao = 7;

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

  playerShield = 0;
  updateHUD();
}

function enemyTurn() {
  setTimeout(() => {
    enemies.forEach(e => {
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
          // seleciona o inimigo "mais à frente" (preferência: enemies[0], se não for ele)
          let target = null;
          if (enemies.length > 0) {
            if (enemies[0] !== e && enemies[0].hp > 0) {
              target = enemies[0];
            } else {
              // procura o primeiro vivo que não seja o curandeiro
              for (let t of enemies) {
                if (t !== e && t.hp > 0) { target = t; break; }
              }
            }
          }
          // se não achar outro alvo, opcional: cura a si mesmo
          if (!target) {
            if (e.hp > 0) target = e;
          }
          if (target) {
            const max = target.maxHp ?? target.hp;
            const healed = act.value;
            target.hp = Math.min(target.hp + healed, max);
            floatText(target.el, `+${healed}💚`, "green");
            // opcional: breve efeito visual
            target.el.classList.add("healed");
            setTimeout(() => target.el.classList.remove("healed"), 600);
          }
        }
      });
    });

    energy = 3;
    playerShield = 0;
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
            if (enemies.length === 0 && playerHP > 0) {
              document.getElementById("overlay").style.display = "block";
              document.getElementById("popup").style.display = "block";
              gerarItens();
              limiteMao = maoInicio;
              document.getElementById("enemies").style.display = "none";
              document.getElementById("lifeBarsContainer").style.display = "none";
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

spawnEnemies(); // gera inimigos aleatórios no início
drawNewCards();
drawCards();
updateHUD();