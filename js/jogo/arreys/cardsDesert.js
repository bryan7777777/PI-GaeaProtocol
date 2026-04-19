const cardsDesert = [
  {
    name: "Proteção De Anubis",
    cost: 3,
    basePower: 10,
    rarity: "desert",
    img: "../img/jogo/cards/desert/anubis.png",
    desc: "<strong class='desertDestaque'>(❤️55 ⚔️6 🛡️5)</strong> Sacrefique 10 de vida (não letal). Invoque Anubis <strong class='desertDestaque'>(Apenas uma vez por batalha)</strong>. Você só pode ter um aliado por vez",
    type: "desert"
  },
  {
    name: "Proteção De Sekhmet",
    cost: 3,
    basePower: 10,
    rarity: "desert",
    img: "../img/jogo/cards/desert/sekhmet.png",
    desc: "<strong class='desertDestaque'>(❤️25 ⚔️20 🛡️0)</strong> Sacrefique 10 de vida (não letal). Invoque Sekhmet <strong class='desertDestaque'>(Apenas uma vez por batalha)</strong>. Você só pode ter um aliado por vez",
    type: "desert"
  },
  {
    name: "Proteção De Rá",
    cost: 3,
    basePower: 10,
    rarity: "desert",
    img: "../img/jogo/cards/desert/raNaTerra.png",
    desc: "<strong class='desertDestaque'>(❤️60 ⚔️8 🛡️0)</strong> Sacrefique 10 de vida (não letal). Invoque Rá <strong class='desertDestaque'>(Apenas uma vez por batalha)</strong>. Você só pode ter um aliado por vez",
    type: "desert"
  },

//☀️ANUBIS

  {
    name: "Furia Dos Deuses",
    cost: 2,
    basePower: 10,
    rarity: "desert",
    img: "../img/jogo/cards/desert/furia.png",
    desc: "<strong class='desertDestaque'>(ANUBIS)</strong> Precisa de 2 cargas lunar. Aumenta os status do aliado. O ataque em 10 e ganha 15 pontos de vida e escudo.",
    type: "desert"
  },
  {
    name: "\"Eu Protejerei Você\"",
    cost: 2,
    basePower: 20,
    rarity: "desert",
    img: "../img/jogo/cards/desert/protecao.png",
    desc: "<strong class='desertDestaque'>(ANUBIS)</strong> Precisa de 2 cargas lunar. O aliado ganha 20 de escudo.",
    type: "desert"
  },

//☀️Sekhmet

  {
    name: "Conselho de Hathor",
    cost: 2,
    basePower: 10,
    rarity: "desert",
    img: "../img/jogo/cards/desert/hathor.png",
    desc: "<strong class='desertDestaque'>(SEKHMET)</strong> Precisa de 1 carga lunar e solar. O aliado ganha 10 em todos os status.",
    type: "desert"
  },
  {
    name: "Construtora Da Guerra",
    cost: 4,
    basePower: 3,
    rarity: "desert",
    img: "../img/jogo/cards/desert/civilizacao.png",
    desc: "<strong class='desertDestaque'>(SEKHMET)</strong> Precisa de 3 carga lunar e solar. O aliado causa dano em area igual a X2 o seu dano.",
    type: "desert"
  },
  {
    name: "Era",
    cost: 5,
    basePower: 5,
    rarity: "desert",
    img: "../img/jogo/cards/desert/era.png",
    desc: "<strong class='desertDestaque'>(SEKHMET)</strong> Precisa de 5 carga lunar e solar. O aliado causa dano em area igual a X10 o seu dano. Dispensa o aliado.",
    type: "desert"
  },

//☀️RA

  {
    name: "O Sol Sempre Hergue-se",
    cost: 0,
    basePower: 1,
    rarity: "desert",
    img: "../img/jogo/cards/desert/sol.png",
    desc: "<strong class='desertDestaque'>(RÁ)</strong> Precisa de 1 carga solar. Ganhe 1 de energia.",
    type: "desert"
  },
  {
    name: "Em Nome De Rá",
    cost: 0,
    basePower: 3,
    rarity: "desert",
    img: "../img/jogo/cards/desert/ra.png",
    desc: "<strong class='desertDestaque'>(RÁ)</strong> Precisa de 3 carga solar. Ganhe 3 de energia.",
    type: "desert"
  },
  {
    name: "Deus Do Sol",
    cost: 0,
    basePower: 0,
    rarity: "desert",
    img: "../img/jogo/cards/desert/esplendor.png",
    desc: "<strong class='desertDestaque'>(RÁ)</strong> Consome todas as cargas solares. Cause dano igual 10% da vida de Rá para cada carga consumida.",
    type: "desert"
  },
  {
    name: "Ira De Rá",
    cost: 3,
    basePower: 5,
    rarity: "desert",
    img: "../img/jogo/cards/desert/iraDeRa.png",
    desc: "<strong class='desertDestaque'>(RÁ)</strong> Precisa de 5 carga solar. Cause dano igual 50% da vida de Rá.",
    type: "desert"
  },

//☀️ALL

  {
    name: "Coração Digno",
    cost: 2,
    basePower: 10,
    rarity: "desert",
    img: "../img/jogo/cards/desert/vitalidade.png",
    desc: "<strong class='desertDestaque'>(ALIADO)</strong> Sacrefique 10 da sua vida (não letal) e aumente a vida do aliado em 10",
    type: "desert"
  },
  {
    name: "Proteção De Sangue",
    cost: 4,
    basePower: 32,
    rarity: "desert",
    img: "../img/jogo/cards/desert/def.png",
    desc: "<strong class='desertDestaque'>(ALIADO)</strong> Sacrefique 20 da sua vida vida (não letal) e aumente a armadura do alido inicial em 5 e ele ganha 32 de escudo",
    type: "desert"
  },
  {
    name: "Fortificação Divina",
    cost: 2,
    basePower: 8,
    rarity: "desert",
    img: "../img/jogo/cards/desert/fortificar.png",
    desc: "<strong class='desertDestaque'>(ALIADO)</strong> Precisa de 1 carga solar e lunar. Aumenta o dano do aliado em 8",
    type: "desert"
  },
  {
    name: "Justiça De Meet",
    cost: 3,
    basePower: 5,
    rarity: "desert",
    img: "../img/jogo/cards/desert/meet.png",
    desc: "<strong class='desertDestaque'>(ALIADO)</strong> Dispensa o aliado. Cause 5 de dano em area por cada carga lunar (gasta todas as cargas lunar).",
    type: "desert"
  },
  {
    name: "Descanço",
    cost: 0,
    basePower: 0,
    rarity: "desert",
    img: "../img/jogo/cards/desert/caixao.png",
    desc: "<strong class='desertDestaque'>(ALIADO)</strong> Dispensa o aliado. Ganhe 5 carga lunar e solar",
    type: "desert"
  },
  {
    name: "Respeito Influente",
    cost: 3,
    basePower: 2,
    rarity: "desert",
    img: "../img/jogo/cards/desert/respeito.png",
    desc: "<strong class='desertDestaque'>(ALIADO)</strong> Precisa de 2 carga lunar. Seu aliado ataca 2 vezes.",
    type: "desert"
  },
  {
    name: "Mandato Divino",
    cost: 1,
    basePower: 1,
    rarity: "desert",
    img: "../img/jogo/cards/desert/mandato.png",
    desc: "<strong class='desertDestaque'>(ALIADO)</strong> Precisa de 1 carga lunar Seu aliado ataca 1 veze.",
    type: "desert"
  },
  {
    name: "Vigia Da Lua",
    cost: 1,
    basePower: 2,
    rarity: "desert",
    img: "../img/jogo/cards/desert/vigia.png",
    desc: "<strong class='desertDestaque'>(ALIADO)</strong> Cause dano igual a armadura do aliado. Ganhe 2 acumulos lunar",
    type: "desert"
  },
  {
    name: "Penitencia Do Sol",
    cost: 1,
    basePower: 2,
    rarity: "desert",
    img: "../img/jogo/cards/desert/penitencia.png",
    desc: "<strong class='desertDestaque'>(ALIADO)</strong> Cause dano igual ao ataque do aliado em area. ganhe 2 acumulos solar",
    type: "desert"
  },
  {
    name: "Amor de Isis",
    cost: 2,
    basePower: 2,
    rarity: "desert",
    img: "../img/jogo/cards/desert/isis.png",
    desc: "<strong class='desertDestaque'>(ALIADO)</strong> Precisa de 2 carga lunar e solar. O aliado ganha vida igual a vida atual do player.",
    type: "desert"
  },
  {
    name: "Beleza Do Deserto",
    cost: 3,
    basePower: 10,
    rarity: "desert",
    img: "../img/jogo/cards/desert/oasis.png",
    desc: "<strong class='desertDestaque'>(ALIADO)</strong> Consome todas as cargas lunares e solar. O aliado ganha 10 de vida por cada carga solar, e defesa por carga lunar.",
    type: "desert"
  },

//☀️CLEOPATRA

  {
    name: "Ascenção",
    cost: 0,
    basePower: 50,
    rarity: "desert",
    img: "../img/jogo/cards/desert/ascencao.png",
    desc: "Entra em modo ascendido. Ganhe 50 de escudo e cura. Enquanto ascendida ela é incapaz de invocar aliados. <strong class='desertDestaque'>(Apenas uma vez por batalha)</strong>",
    type: "desert"
  },
  {
    name: "Os Portões Se Abrem",
    cost: 9,
    basePower: 50,
    rarity: "desert",
    img: "../img/jogo/cards/desert/osPortoesSeAbrem.png",
    desc: "<strong class='desertDestaque'>(Ascenção nescessaria) Precisa Sacreficar um aliado.</strong> Cause 50 de dano em area por cada carga solar e lunar (consome todas as cargas).",
    type: "desert"
  },
  {
    name: "Gande Governate",
    cost: 5,
    basePower: 50,
    rarity: "desert",
    img: "../img/jogo/cards/desert/governante.png",
    desc: "<strong class='desertDestaque'>(Ascenção nescessaria)</strong> Ganhe 50 de escudo e cura e cause 50 de dano em area. Gera 1 carga lunar e solar",
    type: "desert"
  },
  {
    name: "Ira De Cleopatra",
    cost: 5,
    basePower: 10,
    rarity: "desert",
    img: "../img/jogo/cards/desert/iraDeCleopatra.png",
    desc: "<strong class='desertDestaque'>(Ascenção nescessaria)</strong> Cause 10 de dano em area por cada carga solar e lunar (consome todas as cargas)",
    type: "desert"
  },
  {
    name: "Arma Divina",
    cost: 1,
    basePower: 12,
    rarity: "desert",
    img: "../img/jogo/cards/desert/armaDivina.png",
    desc: "Cause 12 de dano (x2 no modo ascendida). Gera 2 carga solar.",
    type: "desert"
  },
  {
    name: "Proteção Divina",
    cost: 1,
    basePower: 12,
    rarity: "desert",
    img: "../img/jogo/cards/desert/protecaoDivina.png",
    desc: "Ganhe 12 de escudo (x2 no modo ascendida). Gera 2 carga lunar.",
    type: "desert"
  },
  {
    name: "Arsenal Anti Herege",
    cost: 2,
    basePower: 12,
    rarity: "desert",
    img: "../img/jogo/cards/desert/arsenalDeArmas.png",
    desc: "Ganhe 12 de escudo e cause 12 de dano em area (x2 no modo ascendida). Gera 2 cargas lunar e solar",
    type: "desert"
  },
  {
    name: "Julgamento Superior",
    cost: 2,
    basePower: 5,
    rarity: "desert",
    img: "../img/jogo/cards/desert/cleo.png",
    desc: "<strong class='desertDestaque'>(Ascenção nescessaria)</strong> Ganhe 5 acumulos lunar e solar.",
    type: "desert"
  },
]