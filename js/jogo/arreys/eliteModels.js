const eliteModelsTuti = [
  // 11111111111111111
  [
    {
      name: "Lenhador corrompido",
      hp: 25,
      dano: 5,
      behavior: () => [
        { type: "attack", value: Math.random() < 0.7 ? 5 : 10 }
      ],
      img: "../img/jogo/inimigos/lenhador.png",
      tipoDano: "(⚔️)💥",
      tipoVida: "❤️",
      zona: 1
    }
  ]
];

const eliteModels = [
  // 11111111111111111
  [
    {
      name: "Lenhador corrompido",
      hp: 40,
      dano: 15,
      behavior: () => [
        { type: "attack", value: Math.random() < 0.7 ? 15 : 30 }
      ],
      img: "../img/jogo/inimigos/lenhador.png",
      tipoDano: "(⚔️)💥",
      tipoVida: "❤️",
      zona: 1
    }
  ],
  [
    {
      name: "FuradorKiwi",
      hp: 16,
      dano: 10,
      behavior: () => [
        { type: "attack", value: 10 }
      ],
      img: "../img/jogo/inimigos/kiwi.png",
      tipoDano: "⚔️",
      tipoVida: "⛰️",
      zona: 1
    },
    {
      name: "FuradorKiwi",
      hp: 16,
      dano: 10,
      behavior: () => [
        { type: "attack", value: 10 }
      ],
      img: "../img/jogo/inimigos/kiwi.png",
      tipoDano: "⚔️",
      tipoVida: "⛰️",
      zona: 1
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
      tipoVida: "❤️",
      zona: 1
    },
    {
      name: "Ferrujão",
      hp: 40,
      dano: 12,
      behavior: () => [{ type: "attack", value: 12 }],
      img: "../img/jogo/inimigos/inimigo1.png",
      tipoDano: "⚔️",
      tipoVida: "❤️",
      zona: 1
    },
    {
      name: "Abelha corrompida",
      hp: 6,
      dano: 6,
      behavior: () => [{ type: "attack", value: 6 }],
      img: "../img/jogo/inimigos/abelha.png",
      tipoDano: "⚔️",
      tipoVida: "❤️",
      zona: 1
    }
  ],
  [
    {
      name: "BrocadorToper",
      hp: 30,
      dano: 8,
      behavior: () => [
        { type: Math.random() < 0.5 ? "attack" : "attackVida", value: 8 }
      ],
      img: "../img/jogo/inimigos/topeira.png",
      tipoDano: "⚔️❓🔱",
      tipoVida: "⛰️",
      zona: 1
    },
    {
      name: "BrocadorToper",
      hp: 30,
      dano: 8,
      behavior: () => [
        { type: Math.random() < 0.5 ? "attack" : "attackVida", value: 8 }
      ],
      img: "../img/jogo/inimigos/topeira.png",
      tipoDano: "⚔️❓🔱",
      tipoVida: "⛰️",
      zona: 1
    }
  ],
  // 2222222222222222222
  [
    {
      name: "Robo Cargueiro Elite",
      hp: 65,
      dano: 17,
      behavior: () => [{ type: "attack", value: 17 }],
      img: "../img/jogo/inimigos/cargueiroElite.png",
      tipoDano: "⚔️",
      tipoVida: "❤️",
      zona: 2
    },
    {
      name: "Robo Cargueiro",
      hp: 60,
      dano: 15,
      behavior: () => [{ type: "attack", value: 15 }],
      img: "../img/jogo/inimigos/roboCargueiro.png",
      tipoDano: "⚔️",
      tipoVida: "❤️",
      zona: 2
    }
  ],
  [
    {
      name: "Marinheiro",
      hp: 45,
      dano: 8,
      behavior: () => [
        { type: "attack", value: 8 }
      ],
      img: "../img/jogo/inimigos/marinheiro.png",
      tipoDano: "⚔️",
      tipoVida: "🌧️",
      zona: 2
    },
    {
      name: "Marinheiro Reciclado",
      hp: 30,
      dano: 8,
      behavior: () => [
        { type: "attack", value: 8 }
      ],
      img: "../img/jogo/inimigos/marinheiroDeLixo.png",
      tipoDano: "⚔️",
      tipoVida: "🌧️",
      zona: 2
    },
    {
      name: "Capitão",
      hp: 55,
      dano: 7,
      behavior: () => [
        { type: "attackVida", value: 7 }
      ],
      img: "../img/jogo/inimigos/capitao.png",
      tipoDano: "🔱",
      tipoVida: "🌧️",
      zona: 2
    }
  ],
  [
    {
      name: "Soldado do porto",
      hp: 65,
      dano: 10,
      behavior: () => [
        { type: Math.random() < 0.7 ? "attack" : "attackVida", value: Math.random() < 0.9 ? 10 : 50 }
      ],
      img: "../img/jogo/inimigos/soldadoDoPorto.png",
      tipoDano: "(⚔️❔🔱)💣",
      tipoVida: "❤️",
      zona: 2
    }
  ],
  [
    {
      name: "Amalgama",
      hp: 60,
      dano: 5,
      behavior: () => [
        { type: Math.random() < 0.5 ? "attackVida" : "heal", value: Math.random() < 0.7 ? 5 : 10 }
      ],
      img: "../img/jogo/inimigos/amalgama.png",
      tipoDano: "(🔱❓💊)💥",
      tipoVida: "🌧️",
      zona: 2
    }
  ],
  // 33333333333333333333
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
      tipoVida: "❤️",
      zona: 3
    },
    {
      name: "Sacerdote Elite",
      hp: 40,
      dano: 12,
      behavior: () => [
        { type: Math.random() < 0.8 ? "attack" : "heal", value: 12 }
      ],
      img: "../img/jogo/inimigos/sacerdoteGuerreiroElite.png",
      tipoDano: "⚔️❔💚🎭💊",
      tipoVida: "💞",
      zona: 3
    },
    {
      name: "IA sacerdotisa",
      hp: 39,
      dano: 2,
      behavior: () => [{ type: "heal", value: Math.random() < 0.3 ? 2 : 4 }],
      img: "../img/jogo/inimigos/sacerdotisa.png",
      tipoDano: "(💚🎭💊)💥",
      tipoVida: "❤️",
      zona: 3
    },
  ],
  [
    {
      name: "Sentinela",
      hp: 55,
      dano: 10,
      behavior: () => [
        { type: "attack", value: 10 }
      ],
      img: "../img/jogo/inimigos/sentinelaGreco.png",
      tipoDano: "⚔️",
      tipoVida: "❤️",
      zona: 3
    },
    {
      name: "Centurião",
      hp: 50,
      dano: 6,
      behavior: () => [
        { type: Math.random() < 0.6 ? "attack" : "attackVida", value: Math.random() < 0.7 ? 6 : 12 }
      ],
      img: "../img/jogo/inimigos/eliteGreco.png",
      tipoDano: "(⚔️❔🔱)💥",
      tipoVida: "❤️",
      zona: 3
    },
    {
      name: "Guarda",
      hp: 25,
      dano: 4,
      behavior: () => [
        { type: "attackVida", value: Math.random() < 0.7 ? 4 : 8 }
      ],
      img: "../img/jogo/inimigos/guardaGreco.png",
      tipoDano: "(🔱)💥",
      tipoVida: "❤️",
      zona: 3
    },
  ],
  // 44444444444444444
  [
    {
      name: "Vigia de Irislidriz",
      hp: 30,
      dano: 5,
      behavior: () => [{ type: "attack", value: Math.random() < 0.7 ? 5 : 10 }],
      img: "../img/jogo/inimigos/olho2.png",
      tipoDano: "(⚔️)💥",
      tipoVida: "💤",
      zona: 4
    },
    {
      name: "Irislidriz",
      hp: 30,
      dano: 5,
      behavior: () => [{ type: "attack", value: 5 }],
      img: "../img/jogo/inimigos/bossValkFantasma.png",
      tipoDano: "⚔️",
      tipoVida: "💤",
      zona: 4
    },
    {
      name: "Observador de Irislidriz",
      hp: 30,
      dano: 5,
      behavior: () => [{ type: "attack", value: Math.random() < 0.7 ? 5 : 10 }],
      img: "../img/jogo/inimigos/olho.png",
      tipoDano: "(⚔️)💥",
      tipoVida: "💤",
      zona: 4
    },
  ],
  [
    {
      name: "Pilha de Livros",
      hp: 30,
      maxHp: 30,
      dano: 0,
      behavior: () => [{ type: "attack", value: 0 }],
      img: "../img/jogo/inimigos/livros.png",
      tipoDano: "⚔️",
      tipoVida: "❤️",
      zona: 4
    },
    {
      name: "Livro Corrompido",
      hp: 30,
      dano: 20,
      behavior: () => [{ type: "attack", value: 20 }],
      img: "../img/jogo/inimigos/livroMaligno.png",
      tipoDano: "⚔️",
      tipoVida: "❤️",
      zona: 4
    },
    {
      name: "Sacerdote Corrompido",
      hp: 65,
      dano: 15,
      behavior: () => [{ type: "attackVida", value: 15 }],
      img: "../img/jogo/inimigos/claus.png",
      tipoDano: "🔱",
      tipoVida: "🧿",
      zona: 4
    }
  ],
  [
    {
      name: "Pilha de Livros",
      hp: 30,
      dano: 0,
      behavior: () => [{ type: "attack", value: 0 }],
      img: "../img/jogo/inimigos/livros.png",
      tipoDano: "⚔️",
      tipoVida: "❤️",
      zona: 4
    },
    {
      name: "Pilha de Livros",
      hp: 30,
      dano: 0,
      behavior: () => [{ type: "attack", value: 0 }],
      img: "../img/jogo/inimigos/livros.png",
      tipoDano: "⚔️",
      tipoVida: "❤️",
      zona: 4
    },
    {
      name: "Emissario",
      hp: 80,
      dano: 31,
      behavior: () => [{ type: "morrer", value: 31 }],
      img: "../img/jogo/inimigos/vingadorAraq.png",
      tipoDano: "🩸",
      tipoVida: "♨️",
      zona: 4
    }
  ],
  // 55555555555555555
  [
    {
      name: "Guarda Chefe",
      hp: 80,
      dano: 33,
      behavior: () => [{ type: "attack", value: 33 }],
      img: "../img/jogo/inimigos/guardaElite.png",
      tipoDano: "⚔️",
      tipoVida: "🧿",
      zona: 5
    }
  ],
  [
    {
      name: "Prj. Nova",
      hp: 100,
      dano: 33,
      behavior: () => [{ type: Math.random() < 0.75 ? "attack" : "attackVida", value: 33 }],
      img: "../img/jogo/inimigos/nova.png",
      tipoDano: "⚔️❔🔱",
      tipoVida: "🧿",
      zona: 5
    }
  ]
];