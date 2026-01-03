const normalModelsTuti = [
  [
    {
      name: "Tartaruga",
      hp: 24,
      dano: 2,
      behavior: () => [{ type: "attack", value: 2 }],
      img: "../img/jogo/inimigos/minion.png",
      tipoDano: "⚔️",
      tipoVida: "⛰️",
      zona: 1
    },
    {
      name: "Tatu corrompido",
      hp: 15,
      dano: 3,
      behavior: () => [{ type: "attack", value: 3 }],
      img: "../img/jogo/inimigos/tatu.png",
      tipoDano: "⚔️",
      tipoVida: "⛰️",
      zona: 1
    },
    {
      name: "Abelha corrompida",
      hp: 6,
      dano: 1,
      behavior: () => [{ type: "attack", value: 1 }],
      img: "../img/jogo/inimigos/abelha.png",
      tipoDano: "⚔️",
      tipoVida: "❤️",
      zona: 1
    }
  ]
];

const normalModels = [
  // 111111111111111111111
  // [
  //   {
  //     name: "Lobo",
  //     hp: 20,
  //     dano: 5,
  //     behavior: () => [
  //       { type: "attack", value: Math.random() < 0.7 ? 5 : 10 }
  //     ],
  //     img: "../img/jogo/inimigos/lobo.png",
  //     tipoDano: "(⚔️)💥",
  //     tipoVida: "⛰️",
  //     zona: 1
  //   },
  //   {
  //     name: "Lobo",
  //     hp: 20,
  //     dano: 5,
  //     behavior: () => [
  //       { type: "attack", value: Math.random() < 0.7 ? 5 : 10 }
  //     ],
  //     img: "../img/jogo/inimigos/lobo.png",
  //     tipoDano: "(⚔️)💥",
  //     tipoVida: "⛰️",
  //     zona: 1
  //   },
  //   {
  //     name: "Lobo",
  //     hp: 20,
  //     dano: 5,
  //     behavior: () => [
  //       { type: "attack", value: Math.random() < 0.7 ? 5 : 10 }
  //     ],
  //     img: "../img/jogo/inimigos/lobo.png",
  //     tipoDano: "(⚔️)💥",
  //     tipoVida: "⛰️",
  //     zona: 1
  //   }
  // ],
  // [
  //   {
  //     name: "Rinoceronte corrompido",
  //     hp: 30,
  //     dano: 4,
  //     behavior: () => [
  //       { type: "attackVida", value: 4 }
  //     ],
  //     img: "../img/jogo/inimigos/rino.png",
  //     tipoDano: "🔱",
  //     tipoVida: "💞",
  //     zona: 1
  //   },
  //   {
  //     name: "formiga sentinela",
  //     hp: 30,
  //     dano: 6,
  //     behavior: () => [
  //       { type: "attack", value: 6 }
  //     ],
  //     img: "../img/jogo/inimigos/formiga.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "⛰️",
  //     zona: 1
  //   }
  // ],
  // [
  //   {
  //     name: "formiga sentinela",
  //     hp: 15,
  //     dano: 6,
  //     behavior: () => [
  //       { type: "attack", value: 6 }
  //     ],
  //     img: "../img/jogo/inimigos/formiga.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "⛰️",
  //     zona: 1
  //   },
  //   {
  //     name: "formiga sentinela",
  //     hp: 15,
  //     dano: 6,
  //     behavior: () => [
  //       { type: "attack", value: 6 }
  //     ],
  //     img: "../img/jogo/inimigos/formiga.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "⛰️",
  //     zona: 1
  //   }
  // ],
  // [
  //   {
  //     name: "Tartaruga",
  //     hp: 34,
  //     dano: 6,
  //     behavior: () => [{ type: "attack", value: 6 }],
  //     img: "../img/jogo/inimigos/minion.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "⛰️",
  //     zona: 1
  //   },
  //   {
  //     name: "Abelha corrompida",
  //     hp: 6,
  //     dano: 6,
  //     behavior: () => [{ type: "attack", value: 6 }],
  //     img: "../img/jogo/inimigos/abelha.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "❤️",
  //     zona: 1
  //   },
  //   {
  //     name: "Abelha corrompida",
  //     hp: 6,
  //     dano: 6,
  //     behavior: () => [{ type: "attack", value: 6 }],
  //     img: "../img/jogo/inimigos/abelha.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "❤️",
  //     zona: 1
  //   }
  // ],
  // [
  //   {
  //     name: "Drone agricola",
  //     hp: 8,
  //     dano: 6,
  //     behavior: () => [{ type: "attackVida", value: 6 }],
  //     img: "../img/jogo/inimigos/inimigo5.png",
  //     tipoDano: "🔱",
  //     tipoVida: "❤️",
  //     zona: 1
  //   },
  //   {
  //     name: "Drone agricola",
  //     hp: 8,
  //     dano: 6,
  //     behavior: () => [{ type: "attackVida", value: 6 }],
  //     img: "../img/jogo/inimigos/inimigo5.png",
  //     tipoDano: "🔱",
  //     tipoVida: "❤️",
  //     zona: 1
  //   }
  // ],
  // [
  //   {
  //     name: "Tartaruga",
  //     hp: 34,
  //     dano: 6,
  //     behavior: () => [{ type: "attack", value: 6 }],
  //     img: "../img/jogo/inimigos/minion.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "⛰️",
  //     zona: 1
  //   },
  //   {
  //     name: "Tatu corrompido",
  //     hp: 25,
  //     dano: 8,
  //     behavior: () => [{ type: "attack", value: 8 }],
  //     img: "../img/jogo/inimigos/tatu.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "⛰️",
  //     zona: 1
  //   },
  //   {
  //     name: "Abelha corrompida",
  //     hp: 6,
  //     dano: 6,
  //     behavior: () => [{ type: "attack", value: 6 }],
  //     img: "../img/jogo/inimigos/abelha.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "❤️",
  //     zona: 1
  //   }
  // ],
  // // 222222222222222222222
  // [
  //   {
  //     name: "Robo Cargueiro",
  //     hp: 60,
  //     dano: 12,
  //     behavior: () => [{ type: "attack", value: 12 }],
  //     img: "../img/jogo/inimigos/roboCargueiro.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "❤️",
  //     zona: 2
  //   }
  // ],
  // [
  //   {
  //     name: "Gaivota Corrompida",
  //     hp: 15,
  //     dano: 5,
  //     behavior: () => [
  //       { type: "attackVida", value: 5 }
  //     ],
  //     img: "../img/jogo/inimigos/gaivota.png",
  //     tipoDano: "🔱",
  //     tipoVida: "❤️",
  //     zona: 2
  //   },
  //   {
  //     name: "Afogado",
  //     hp: 55,
  //     dano: 7,
  //     behavior: () => [
  //       { type: "attackVida", value: Math.random() < 0.7 ? 7 : 14 }
  //     ],
  //     img: "../img/jogo/inimigos/mergulhador.png",
  //     tipoDano: "(🔱)💥",
  //     tipoVida: "🌧️",
  //     zona: 2
  //   }
  // ],
  // [
  //   {
  //     name: "Marinheiro",
  //     hp: 45,
  //     dano: 8,
  //     behavior: () => [
  //       { type: "attack", value: 8 }
  //     ],
  //     img: "../img/jogo/inimigos/marinheiro.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "🌧️",
  //     zona: 2
  //   },
  //   {
  //     name: "Marinheiro Reciclado",
  //     hp: 30,
  //     dano: 8,
  //     behavior: () => [
  //       { type: "attack", value: 8 }
  //     ],
  //     img: "../img/jogo/inimigos/marinheiroDeLixo.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "🌧️",
  //     zona: 2
  //   }
  // ],
  // [
  //   {
  //     name: "Gaivota Corrompida",
  //     hp: 15,
  //     dano: 5,
  //     behavior: () => [
  //       { type: "attackVida", value: 5 }
  //     ],
  //     img: "../img/jogo/inimigos/gaivota.png",
  //     tipoDano: "🔱",
  //     tipoVida: "❤️",
  //     zona: 2
  //   },
  //   {
  //     name: "Marinheiro Reciclado",
  //     hp: 30,
  //     dano: 8,
  //     behavior: () => [
  //       { type: "attack", value: 8 }
  //     ],
  //     img: "../img/jogo/inimigos/marinheiroDeLixo.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "🌧️",
  //     zona: 2
  //   }
  // ],
  // [
  //   {
  //     name: "Marinheiro Reciclado",
  //     hp: 30,
  //     dano: 8,
  //     behavior: () => [
  //       { type: "attack", value: 8 }
  //     ],
  //     img: "../img/jogo/inimigos/marinheiroDeLixo.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "🌧️",
  //     zona: 2
  //   },
  //   {
  //     name: "Marinheiro Reciclado",
  //     hp: 30,
  //     dano: 8,
  //     behavior: () => [
  //       { type: "attack", value: 8 }
  //     ],
  //     img: "../img/jogo/inimigos/marinheiroDeLixo.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "🌧️",
  //     zona: 2
  //   }
  // ],
  // [
  //   {
  //     name: "Gaivota Corrompida",
  //     hp: 15,
  //     dano: 5,
  //     behavior: () => [
  //       { type: "attackVida", value: 5 }
  //     ],
  //     img: "../img/jogo/inimigos/gaivota.png",
  //     tipoDano: "🔱",
  //     tipoVida: "❤️",
  //     zona: 2
  //   },
  //   {
  //     name: "Gaivota Corrompida",
  //     hp: 15,
  //     dano: 5,
  //     behavior: () => [
  //       { type: "attackVida", value: 10 }
  //     ],
  //     img: "../img/jogo/inimigos/gaivota.png",
  //     tipoDano: "🔱",
  //     tipoVida: "❤️",
  //     zona: 2
  //   }
  // ],
  // // 333333333333333333333
  // [
  //   {
  //     name: "Guarda",
  //     hp: 25,
  //     dano: 4,
  //     behavior: () => [
  //       { type: "attackVida", value: Math.random() < 0.7 ? 4 : 8 }
  //     ],
  //     img: "../img/jogo/inimigos/guardaGreco.png",
  //     tipoDano: "(🔱)💥",
  //     tipoVida: "❤️",
  //     zona: 3
  //   },
  //   {
  //     name: "Guarda",
  //     hp: 25,
  //     dano: 4,
  //     behavior: () => [
  //       { type: "attackVida", value: Math.random() < 0.7 ? 4 : 8 }
  //     ],
  //     img: "../img/jogo/inimigos/guardaGreco.png",
  //     tipoDano: "(🔱)💥",
  //     tipoVida: "❤️",
  //     zona: 3
  //   },
  // ],
  // [
  //   {
  //     name: "Sentinela",
  //     hp: 55,
  //     dano: 10,
  //     behavior: () => [
  //       { type: "attack", value: 10 }
  //     ],
  //     img: "../img/jogo/inimigos/sentinelaGreco.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "❤️",
  //     zona: 3
  //   },
  //   {
  //     name: "Guarda",
  //     hp: 25,
  //     dano: 4,
  //     behavior: () => [
  //       { type: "attackVida", value: Math.random() < 0.7 ? 4 : 8 }
  //     ],
  //     img: "../img/jogo/inimigos/guardaGreco.png",
  //     tipoDano: "(🔱)💥",
  //     tipoVida: "❤️",
  //     zona: 3
  //   },
  // ],
  // [
  //   {
  //     name: "Casca Grossa",
  //     hp: 65,
  //     dano: 5,
  //     behavior: () => [
  //       { type: "attack", value: 5 }
  //     ],
  //     img: "../img/jogo/inimigos/cascaGrossa.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "❤️",
  //     zona: 3
  //   },
  //   {
  //     name: "IA sacerdotisa",
  //     hp: 24,
  //     dano: 2,
  //     behavior: () => [{ type: "heal", value: Math.random() < 0.7 ? 2 : 4 }],
  //     img: "../img/jogo/inimigos/sacerdotisa.png",
  //     tipoDano: "(💚🎭💊)💥",
  //     tipoVida: "❤️",
  //     zona: 3
  //   },
  // ],
  // [
  //   {
  //     name: "Sacerdote Guerreiro",
  //     hp: 40,
  //     dano: 8,
  //     behavior: () => [
  //       { type: "attack", value: 8 }
  //     ],
  //     img: "../img/jogo/inimigos/sacerdoteGuerreiro.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "❤️",
  //     zona: 3
  //   },
  //   {
  //     name: "Sacerdote Guerreiro",
  //     hp: 40,
  //     dano: 8,
  //     behavior: () => [
  //       { type: "attack", value: 8 }
  //     ],
  //     img: "../img/jogo/inimigos/sacerdoteGuerreiro.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "❤️",
  //     zona: 3
  //   },
  // ],
  // [
  //   {
  //     name: "Valquiria",
  //     hp: 40,
  //     dano: 7,
  //     behavior: () => [{ type: "attackVida", value: 7 }],
  //     img: "../img/jogo/inimigos/valquiria.png",
  //     tipoDano: "🔱",
  //     tipoVida: "❤️",
  //     zona: 3
  //   },
  //   {
  //     name: "Valquiria",
  //     hp: 40,
  //     dano: 7,
  //     behavior: () => [{ type: "attackVida", value: 7 }],
  //     img: "../img/jogo/inimigos/valquiria.png",
  //     tipoDano: "🔱",
  //     tipoVida: "❤️",
  //     zona: 3
  //   },
  // ],
  // // 444444444444444444444
  // [
  //   {
  //     name: "Cão Corrompido",
  //     hp: 50,
  //     dano: 12,
  //     behavior: () => [{ type: "attack", value: Math.random() < 0.7 ? 12 : 24 }],
  //     img: "../img/jogo/inimigos/cachorroPolicial.png",
  //     tipoDano: "(⚔️)💥",
  //     tipoVida: "❤️",
  //     zona: 4
  //   },
  //   {
  //     name: "Sentinela Corrompido",
  //     hp: 80,
  //     dano: 25,
  //     behavior: () => [{ type: "attack", value: 25 }],
  //     img: "../img/jogo/inimigos/sentinelaCorrompido.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "❤️",
  //     zona: 4
  //   }
  // ],
  // [
  //   {
  //     name: "Vagante",
  //     hp: 25,
  //     dano: 10,
  //     behavior: () => [{ type: "attackVida", value: 10 }],
  //     img: "../img/jogo/inimigos/ceifadorFantasma.png",
  //     tipoDano: "🔱",
  //     tipoVida: "🧿",
  //     zona: 4
  //   },
  //   {
  //     name: "Livro Corrompido",
  //     hp: 30,
  //     dano: 20,
  //     behavior: () => [{ type: "attack", value: 20 }],
  //     img: "../img/jogo/inimigos/livroMaligno.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "❤️",
  //     zona: 4
  //   },
  //   {
  //     name: "Livro Corrompido",
  //     hp: 30,
  //     dano: 20,
  //     behavior: () => [{ type: "attack", value: 20 }],
  //     img: "../img/jogo/inimigos/livroMaligno.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "❤️",
  //     zona: 4
  //   }
  // ],
  // [
  //   {
  //     name: "Pilha de Livros",
  //     hp: 30,
  //     dano: 0,
  //     behavior: () => [{ type: "attack", value: 0 }],
  //     img: "../img/jogo/inimigos/livros.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "❤️",
  //     zona: 4
  //   },
  //   {
  //     name: "Vagante",
  //     hp: 25,
  //     dano: 10,
  //     behavior: () => [{ type: "attackVida", value: 10 }],
  //     img: "../img/jogo/inimigos/ceifadorFantasma.png",
  //     tipoDano: "🔱",
  //     tipoVida: "🧿",
  //     zona: 4
  //   },
  //   {
  //     name: "Vagante",
  //     hp: 25,
  //     dano: 10,
  //     behavior: () => [{ type: "attackVida", value: 10 }],
  //     img: "../img/jogo/inimigos/ceifadorFantasma.png",
  //     tipoDano: "🔱",
  //     tipoVida: "🧿",
  //     zona: 4
  //   }
  // ],
  // [
  //   {
  //     name: "Vagante",
  //     hp: 25,
  //     dano: 10,
  //     behavior: () => [{ type: "attackVida", value: 10 }],
  //     img: "../img/jogo/inimigos/ceifadorFantasma.png",
  //     tipoDano: "🔱",
  //     tipoVida: "🧿",
  //     zona: 4
  //   },
  //   {
  //     name: "Sacerdote Corrompido",
  //     hp: 65,
  //     dano: 15,
  //     behavior: () => [{ type: "attackVida", value: 15 }],
  //     img: "../img/jogo/inimigos/claus.png",
  //     tipoDano: "🔱",
  //     tipoVida: "🧿",
  //     zona: 4
  //   }
  // ],
  // [
  //   {
  //     name: "Pilha de Livros",
  //     hp: 30,
  //     maxHp: 30,
  //     dano: 0,
  //     behavior: () => [{ type: "attack", value: 0 }],
  //     img: "../img/jogo/inimigos/livros.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "❤️",
  //     zona: 4
  //   },
  //   {
  //     name: "Livro Corrompido",
  //     hp: 30,
  //     dano: 20,
  //     behavior: () => [{ type: "attack", value: 20 }],
  //     img: "../img/jogo/inimigos/livroMaligno.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "❤️",
  //     zona: 4
  //   },
  //   {
  //     name: "Livro Corrompido",
  //     hp: 30,
  //     dano: 20,
  //     behavior: () => [{ type: "attack", value: 20 }],
  //     img: "../img/jogo/inimigos/livroMaligno.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "❤️",
  //     zona: 4
  //   }
  // ],
  // // 555555555555555555555
  // [
  //   {
  //     name: "Guarda",
  //     hp: 70,
  //     dano: 10,
  //     behavior: () => [{ type: "attack", value: 10 }],
  //     img: "../img/jogo/inimigos/guarda.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "🧿",
  //     zona: 5
  //   },
  //   {
  //     name: "Guarda",
  //     hp: 70,
  //     dano: 10,
  //     behavior: () => [{ type: "attack", value: 10 }],
  //     img: "../img/jogo/inimigos/guarda.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "🧿",
  //     zona: 5
  //   }
  // ],
  // [
  //   {
  //     name: "Drone De Combate",
  //     hp: 35,
  //     dano: 10,
  //     behavior: () => [{ type: "attackVida", value: 10 }],
  //     img: "../img/jogo/inimigos/droneCombate.png",
  //     tipoDano: "🔱",
  //     tipoVida: "❤️",
  //     zona: 5
  //   },
  //   {
  //     name: "Drone De Combate",
  //     hp: 35,
  //     dano: 10,
  //     behavior: () => [{ type: "attackVida", value: 10 }],
  //     img: "../img/jogo/inimigos/droneCombate.png",
  //     tipoDano: "🔱",
  //     tipoVida: "❤️",
  //     zona: 5
  //   }
  // ],
  // [
  //   {
  //     name: "Guarda",
  //     hp: 70,
  //     dano: 10,
  //     behavior: () => [{ type: "attack", value: 10 }],
  //     img: "../img/jogo/inimigos/guarda.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "🧿",
  //     zona: 5
  //   },
  //   {
  //     name: "Guarda Valquiria",
  //     hp: 55,
  //     dano: 18,
  //     behavior: () => [{ type: "attackVida", value: 18 }],
  //     img: "../img/jogo/inimigos/guardaValk.png",
  //     tipoDano: "🔱",
  //     tipoVida: "❤️",
  //     zona: 5
  //   }
  // ],
  // [
  //   {
  //     name: "Guarda",
  //     hp: 70,
  //     dano: 10,
  //     behavior: () => [{ type: "attack", value: 10 }],
  //     img: "../img/jogo/inimigos/guarda.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "🧿",
  //     zona: 5
  //   },
  //   {
  //     name: "Guarda Forte",
  //     hp: 65,
  //     dano: 22,
  //     behavior: () => [{ type: "attack", value: Math.random() < 0.7 ? 22 : 44 }],
  //     img: "../img/jogo/inimigos/artilheiro.png",
  //     tipoDano: "(⚔️)💥",
  //     tipoVida: "🧿",
  //     zona: 5
  //   }
  // ],
  // [
  //   {
  //     name: "Guarda",
  //     hp: 70,
  //     dano: 10,
  //     behavior: () => [{ type: "attack", value: 10 }],
  //     img: "../img/jogo/inimigos/guarda.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "🧿",
  //     zona: 5
  //   },
  //   {
  //     name: "Guarda Médico",
  //     hp: 50,
  //     dano: 20,
  //     behavior: () => [{ type: Math.random() < 0.5 ? "attack" : "heal", value: 20 }],
  //     img: "../img/jogo/inimigos/guardaMedico.png",
  //     tipoDano: "⚔️❓💚🎭💊",
  //     tipoVida: "❤️",
  //     zona: 5
  //   }
  // ],
  // [
  //   {
  //     name: "Nemora",
  //     hp: 400,
  //     maxHp: 400,
  //     dano: 40,
  //     behavior() {
  //       return [
  //         {
  //           type: Math.random() < 0.75 ? "attack" : "attackVida",
  //           value: this.dano
  //         }
  //       ];
  //     },
  //     img: "../img/jogo/inimigos/animado/nemora/statico/nemora1.png",
  //     tipoDano: "(⚔️❔🔱)⚜️🎭💊",
  //     tipoVida: "🧿",
  //     zona: 1
  //   }
  // ],
  // [
  //   {
  //     name: "IA",
  //     hp: 500,
  //     maxHp: 500,
  //     dano: 15,
  //     behavior() {
  //       return [
  //         {
  //           type: Math.random() < 0.25 ? "heal" : Math.random() < 0.8 ? "attack" : "attackVida",
  //           value: this.dano
  //         }
  //       ];
  //     },
  //     img: "../img/jogo/inimigos/animado/ia/statico/ia1.png",
  //     tipoDano: "(⚔️❔🔱❔💊)⚜️",
  //     tipoVida: "🧿",
  //     zona: 1
  //   }
  // ],
  // [
  //   {
  //     name: "Medo De Ayla",
  //     hp: 20,
  //     dano: 1,
  //     behavior: () => [{ type: "heal", value: 1 }],
  //     img: "../img/jogo/inimigos/ayla/medo.png",
  //     tipoDano: "(💚🎭💊)💥",
  //     tipoVida: "💤",
  //     zona: 1
  //   }
  // ],
  // [
  //   {
  //     name: "Belinda",
  //     hp: 300,
  //     dano: 35,
  //     behavior() {
  //       const blocos = [
  //         { type: "spawn", baseEnemy: peaoSpawn },
  //         { type: "spawn", baseEnemy: bispoSpawn },
  //         { type: "spawn", baseEnemy: reiSpawn },
  //         { type: "spawn", baseEnemy: torreSpawn },
  //         { type: "heal", value: this.dano },
  //         { type: "attack", value: this.dano }
  //       ];

  //       const escolha = Math.floor(Math.random() * blocos.length);
  //       return [blocos[escolha]];
  //     },
  //     img: "../img/jogo/inimigos/animado/belinda/statico/belinda1.png",
  //     tipoDano: "♟️❔⚔️❔💚🎭💊",
  //     tipoVida: "❤️",
  //     zona: 1
  //   }
  // ],
  //   [
  //     {
  //       name: "Svetlana",
  //       hp: 345,
  //       dano: 45,
  //       behavior() { if (Math.random() < 0.68) {
  //     return [{
  //       type: "spawn",
  //       baseEnemy: svetlanaSpawn
  //     }];
  //   }

  //   return [{
  //     type: "attack",
  //     value: this.dano
  //   }];
  // },
  //       img: "../img/jogo/inimigos/animado/svetlana/statico/svetlana1.png",
  //       tipoDano: "♟️❔⚔️",
  //       tipoVida: "❤️",
  //       zona: 1
  //     }
  //   ],
  //   [
  //   {
  //     name: "Pedro",
  //     hp: 150,
  //     maxHp: 150,
  //     dano: 7,
  //     behavior() {
  //       return [
  //         {
  //           type: Math.random() < 0.65 ? "attack" : "attackVida",
  //           value: this.dano
  //         }
  //       ];
  //     },
  //     img: "../img/jogo/inimigos/animado/pedro/statico/pedro1.png",
  //     tipoDano: "⚔️❔🔱",
  //     tipoVida: "🌵",
  //     zona: 1
  //   }
  // ],
  // [
  //   {
  //     name: "Guinevere",
  //     hp: 120,
  //     maxHp: 120,
  //     dano: 5,
  //     behavior() {
  //       return [
  //         {
  //           type: "attack",
  //           value: this.dano
  //         }
  //       ];
  //     },
  //     img: "../img/jogo/inimigos/animado/guinevere/statico/guinevere1.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "🌵",
  //     zona: 1
  //   }
  // ],
  // [
  //   {
  //     name: "Isla",
  //     hp: 80,
  //     maxHp: 80,
  //     dano: 20,
  //     behavior() {
  //       return [
  //         {
  //           type: "attack",
  //           value: this.dano
  //         }
  //       ];
  //     },
  //     img: "../img/jogo/inimigos/animado/isla/statico/isla1.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "💤",
  //     zona: 1
  //   }
  // ],
  // [
  //   {
  //     name: "PeruSterminador",
  //     hp: 70,
  //     maxHp: 70,
  //     dano: 20,
  //     behavior() {
  //       return [
  //         {
  //           type: "attack",
  //           value: this.dano
  //         }
  //       ];
  //     },
  //     img: "../img/jogo/inimigos/animado/peru/statico/peru1.png",
  //     tipoDano: "⚔️",
  //     tipoVida: "❤️",
  //     zona: 1
  //   }
  // ],
  [
    {
      name: "Ayla",
      hp: 1000,
      dano: 30,
      behavior: () => {
        // escolhe o tipo (80% attack / 20% attackVida)
        const type = Math.random() < 0.1 ? "attack" : "attackVida";
        let base = 0;

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
      zona: 1
    }
  ]
];