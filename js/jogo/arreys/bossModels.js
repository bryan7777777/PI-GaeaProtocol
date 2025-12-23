const bossModelsTuti = [
  [
    {
      name: "Lobo",
      hp: 10,
      dano: 2,
      behavior: () => [
        { type: "attack", value: Math.random() < 0.7 ? 2 : 4 }
      ],
      img: "../img/jogo/inimigos/lobo.png",
      tipoDano: "(⚔️)💥",
      tipoVida: "⛰️",
      zona: 1
    },
    {
      name: "Boss Alfa",
      hp: 45,
      dano: 5,
      behavior: () => [{ type: "attackVida", value: 5 }],
      img: "../img/jogo/inimigos/bossLobo.png",
      tipoDano: "🔱",
      tipoVida: "⛰️",
      zona: 1
    },
    {
      name: "Lobo",
      hp: 10,
      dano: 2,
      behavior: () => [
        { type: "attack", value: Math.random() < 0.7 ? 2 : 4 }
      ],
      img: "../img/jogo/inimigos/lobo.png",
      tipoDano: "(⚔️)💥",
      tipoVida: "⛰️",
      zona: 1
    }
  ],
]

const bossModels = [
  // 11111111111111
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
      tipoVida: "⛰️",
      zona: 1
    },
    {
      name: "Boss Alfa",
      hp: 100,
      dano: 10,
      behavior: () => [{ type: "attackVida", value: 10 }],
      img: "../img/jogo/inimigos/bossLobo.png",
      tipoDano: "🔱",
      tipoVida: "⛰️",
      zona: 1
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
      tipoVida: "⛰️",
      zona: 1
    }
  ],
  // 222222222
  [
    {
      name: "Tentaculo",
      hp: 20,
      dano: 10,
      behavior: () => [
        { type: "attack", value: Math.random() < 0.7 ? 10 : 20 }
      ],
      img: "../img/jogo/inimigos/tentaculoKraken.png",
      tipoDano: "(⚔️)💥",
      tipoVida: "🌧️",
      zona: 2
    },
    {
      name: "Boss Prj.Kraken",
      hp: 100,
      dano: 8,
      behavior: () => [{ type: Math.random() < 0.5 ? "attack" : "attackVida", value: Math.random() < 0.7 ? 8 : 16 }],
      img: "../img/jogo/inimigos/bossKraken.png",
      tipoDano: "(⚔️❓🔱)💥",
      tipoVida: "🌧️",
      zona: 2
    },
    {
      name: "Tentaculo",
      hp: 20,
      dano: 10,
      behavior: () => [
        { type: "attack", value: Math.random() < 0.7 ? 10 : 20 }
      ],
      img: "../img/jogo/inimigos/tentaculoKraken.png",
      tipoDano: "(⚔️)💥",
      tipoVida: "🌧️",
      zona: 2
    }
  ],
  // 3333333333
  [
    {
      name: "Mão do Paladium",
      hp: 65,
      dano: 10,
      behavior: () => [{ type: Math.random() < 0.5 ? "attack" : "heal", value: 8 }],
      img: "../img/jogo/inimigos/paladiumMaoDireita.png",
      tipoDano: "⚔️❓💚🎭💊",
      tipoVida: "❤️",
      zona: 3
    },
    {
      name: "Boss Paladium",
      hp: 150,
      dano: 8,
      behavior: () => [
        { type: Math.random() < 0.7 ? "attack" : "heal", value: Math.random() < 0.7 ? 8 : 16 }
      ],
      img: "../img/jogo/inimigos/bossPaladium.png",
      tipoDano: "(⚔️❔💚🎭💊)💥",
      tipoVida: "💞",
      zona: 3
    },
    {
      name: "Mão do Paladium",
      hp: 35,
      dano: 5,
      behavior: () => [{ type: Math.random() < 0.5 ? "attack" : "attackVida", value: Math.random() < 0.85 ? 5 : 20 }],
      img: "../img/jogo/inimigos/paladiumMaoEsquerda.png",
      tipoDano: "(⚔️❓🔱)🧨",
      tipoVida: "❤️",
      zona: 3
    }
  ],
  [
    {
      name: "Solice a Esquecida",
      hp: 155,
      dano: 45,
      behavior: () => [{ type: "morrer", value: 45 }],
      img: "../img/jogo/inimigos/solice.png",
      tipoDano: "🩸",
      tipoVida: "❤️",
      zona: 3
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
      tipoVida: "❤️",
      zona: 3
    },
    {
      name: "Boss Valquiria",
      hp: 150,
      dano: 18,
      behavior: () => [
        { type: "attack", value: Math.random() < 0.7 ? 18 : 36 }
      ],
      img: "../img/jogo/inimigos/bossValquiria.png",
      tipoDano: "(⚔️)💥",
      tipoVida: "❤️",
      zona: 3
    },
    {
      name: "IA sacerdotisa",
      hp: 24,
      dano: 2,
      behavior: () => [{ type: "heal", value: Math.random() < 0.3 ? 2 : 4 }],
      img: "../img/jogo/inimigos/sacerdotisa.png",
      tipoDano: "(💚🎭💊)💥",
      tipoVida: "❤️",
      zona: 3
    },
  ],
  // 444444444444444444
  [
    {
      name: "Medo De Ayla",
      hp: 20,
      dano: 1,
      behavior: () => [{ type: "heal", value: 1 }],
      img: "../img/jogo/inimigos/ayla/medo.png",
      tipoDano: "(💚🎭💊)💥",
      tipoVida: "💤",
      zona: 4
    }
  ],
  // 5555555555555555
];

function bossAtivadoPorItem(inimigo) {
  switch (inimigo) {
    case "belinda":
      bossModels.push([{
          name: "Belinda",
          hp: 300,
          dano: 35,
          behavior() {
            const blocos = [
              { type: "spawn", baseEnemy: peaoSpawn },
              { type: "spawn", baseEnemy: bispoSpawn },
              { type: "spawn", baseEnemy: reiSpawn },
              { type: "spawn", baseEnemy: torreSpawn },
              { type: "heal", value: this.dano },
              { type: "attack", value: this.dano }
            ];

            const escolha = Math.floor(Math.random() * blocos.length);
            return [blocos[escolha]];
          },
          img: "../img/jogo/inimigos/animado/belinda/statico/belinda1.png",
          tipoDano: "♟️❔⚔️❔💚🎭💊",
          tipoVida: "❤️",
          zona: 4
        }]);
      break;
    case "svetlana":
      bossModels.push([{
        name: "Svetlana",
        hp: 345,
        dano: 45,
        behavior() {
          if (Math.random() < 0.68) {
            return [{
              type: "spawn",
              baseEnemy: svetlanaSpawn
            }];
          }

          return [{
            type: "attack",
            value: this.dano
          }];
        },
        img: "../img/jogo/inimigos/animado/svetlana/statico/svetlana1.png",
        tipoDano: "♟️❔⚔️",
        tipoVida: "❤️",
        zona: 4
      }]);
      break;

    default:
      break;
  }
}

function bossFinal() {
  if (SoliceApareceu && dialogoAyla) {
    bossModels.push([{
      name: "Nemora",
      hp: 700,
      maxHp: 700,
      dano: 40,
      behavior() {
        return [
          {
            type: Math.random() < 0.75 ? "attack" : "attackVida",
            value: this.dano
          }
        ];
      },
      img: "../img/jogo/inimigos/animado/nemora/statico/nemora1.png",
      tipoDano: "(⚔️❔🔱)⚜️🎭💊",
      tipoVida: "🧿",
      zona: 5
    }]);
  } else {
    bossModels.push([{
      name: "IA",
      hp: 570,
      maxHp: 570,
      dano: 25,
      behavior() {
        return [
          {
            type: Math.random() < 0.25
              ? "heal"
              : Math.random() < 0.7
                ? "attack"
                : "attackVida",
            value: this.dano
          }
        ];
      },
      img: "../img/jogo/inimigos/animado/ia/statico/ia1.png",
      tipoDano: "(⚔️❔🔱❔💊)⚜️",
      tipoVida: "🧿",
      zona: 5
    }]);
  }
}