const cardsCria = [
  {
    name: "Tudo Se Transforma",
    cost: 0,
    basePower: 0,
    rarity: "cria",
    img: "../img/jogo/cards/cria/teste.png",
    desc: "Transfoma todos os corantes em tintas",
    type: "cria"
  },
  {
    name: "Caixa De Corantes",
    cost: 0,
    basePower: 0,
    rarity: "cria",
    img: "../img/jogo/cards/cria/caixaDeCorantes.png",
    desc: "Compre 5 corantes Aleatorios",
    type: "cria"
  },
  {
    name: "Corante Amarelo",
    cost: 1,
    basePower: 0,
    rarity: "cria",
    img: "../img/jogo/cards/cria/coranteAmarelo.png",
    desc: "Crie uma \"Tinta Amarela\"",
    type: "cria"
  },
  {
    name: "Corante Azul",
    cost: 1,
    basePower: 0,
    rarity: "cria",
    img: "../img/jogo/cards/cria/coranteAzul.png",
    desc: "Crie uma \"Tinta Azul\"",
    type: "cria"
  },
  {
    name: "Corante Vermelho",
    cost: 1,
    basePower: 0,
    rarity: "cria",
    img: "../img/jogo/cards/cria/coranteVermelho.png",
    desc: "Crie uma \"Tinta Vermelha\"",
    type: "cria"
  },
  {
    name: "Tinta Amarela",
    cost: 0,
    basePower: 0,
    rarity: "cria",
    img: "../img/jogo/cards/cria/tintaAmarela.png",
    desc: "Ganhe 1 carga de tinta amarela",
    type: "cria"
  },
  {
    name: "Tinta Azul",
    cost: 0,
    basePower: 0,
    rarity: "cria",
    img: "../img/jogo/cards/cria/tintaAzul.png",
    desc: "Ganhe 1 carga de tinta azul",
    type: "cria"
  },
  {
    name: "Tinta Vermelha",
    cost: 0,
    basePower: 0,
    rarity: "cria",
    img: "../img/jogo/cards/cria/tintaVermelha.png",
    desc: "Ganhe 1 carga de tinta vermelha",
    type: "cria"
  },
  {
    name: "Tinta Roxa",
    cost: 0,
    basePower: 0,
    rarity: "cria",
    img: "../img/jogo/cards/cria/tintaRoxa.png",
    desc: "Misture 1 carga de tinta azul e vermelho. Ganhe 2 carga de tinta roxa",
    type: "cria"
  },
  {
    name: "Tinta Verde",
    cost: 0,
    basePower: 0,
    rarity: "cria",
    img: "../img/jogo/cards/cria/tintaVerde.png",
    desc: "Misture 1 carga de tinta azul e amarela. Ganhe 2 carga de tinta verde",
    type: "cria"
  },
  {
    name: "Tinta Laranja",
    cost: 0,
    basePower: 0,
    rarity: "cria",
    img: "../img/jogo/cards/cria/tintaLaranja.png",
    desc: "Misture 1 carga de tinta vermelho e amarela. Ganhe 2 carga de tinta laranja",
    type: "cria"
  },
  {
    name: "Trocando De Estilo",
    cost: 0,
    basePower: 20,
    rarity: "cria",
    img: "../img/jogo/cards/cria/trocandoDeModo.png",
    desc: "Alterna o modo pincel para arco, e vice verso. Ganhe 20 de escudo no modo pincel, e no modo arco 1 carga de toda as tintas",
    type: "cria"
  },
  {
    name: "Bebida Do Sacreficio",
    cost: 0,
    basePower: 20,
    rarity: "cria",
    img: "../img/jogo/cards/cria/bebidaDeJade.png",
    desc: "Permite enxergar temporariamente cores. O ofeito some após sofrer dano",
    type: "cria"
  },
  {
    name: "Estilo 子",
    cost: 0,
    basePower: 6,
    rarity: "cria",
    img: "../img/jogo/cards/cria/estiloCria.png",
    desc: "Alterna o modo pincel para arco, e vice verso. No modo pincel ganhe 1 carga de tinta azul e roxa, e no modo arco ganhe 1 carga de tinta vermelha e laranja",
    type: "cria"
  },
  {
    name: "Escalada",
    cost: 1,
    basePower: 6,
    rarity: "cria",
    img: "../img/jogo/cards/cria/escalada.png",
    desc: "Muda imediatamente para o modo Pincel. Precisa de 1 carga de tinta azul, vermelho e amarelo para causar 6 de dano e ganhar escudo e cura",
    type: "cria"
  },
  {
    name: "Pincel Extraordinario",
    cost: 3,
    basePower: 100,
    rarity: "cria",
    img: "../img/jogo/cards/cria/pincel.png",
    desc: "<strong class='criaDestaque'>(Modo Pincel Nescessario)</strong> Precisa 3 carga de tinta roxa para causar 100 de dano",
    type: "cria"
  },
  {
    name: "A Criação Toma Forma",
    cost: 2,
    basePower: 70,
    rarity: "cria",
    img: "../img/jogo/cards/cria/criacao.png",
    desc: "<strong class='criaDestaque'>(Modo Pincel Nescessario)</strong> Precisa 2 carga de todas as tintas para causar 70 de dano em area e ganhar 50 de escudo",
    type: "cria"
  },
  {
    name: "Pincelada Gira Sol",
    cost: 1,
    basePower: 10,
    rarity: "cria",
    img: "../img/jogo/cards/cria/pincelAmarelo.png",
    desc: "<strong class='criaDestaque'>(Modo Pincel Nescessario)</strong> Precisa 1 carga de tinta amarela para causar 10 de dano em area e ganhe 10 de escudo",
    type: "cria"
  },
  {
    name: "Pincelada Pura",
    cost: 1,
    basePower: 10,
    rarity: "cria",
    img: "../img/jogo/cards/cria/pincelVerde.png",
    desc: "<strong class='criaDestaque'>(Modo Pincel Nescessario)</strong> Precisa 1 carga de tinta verde para causar 10 de dano e cure 10 de vida",
    type: "cria"
  },
  {
    name: "Magnifco",
    cost: 2,
    basePower: 30,
    rarity: "cria",
    img: "../img/jogo/cards/cria/pincelRoxo.png",
    desc: "<strong class='criaDestaque'>(Modo Pincel Nescessario)</strong> Precisa 1 carga de tinta roxa para causar 30 de dano em area",
    type: "cria"
  },
  {
    name: "Colorindo",
    cost: 1,
    basePower: 30,
    rarity: "cria",
    img: "../img/jogo/cards/cria/paleta.png",
    desc: "Precisa 1 carga de todas as tintas para causar 30 de dano em area",
    type: "cria"
  },
  {
    name: "Terço Da Criação",
    cost: 2,
    basePower: 0,
    rarity: "cria",
    img: "../img/jogo/cards/cria/terco.png",
    desc: "Ganhe 1 carga de todas as cores",
    type: "cria"
  },
  {
    name: "顔料の起源",
    cost: 2,
    basePower: 0,
    rarity: "cria",
    img: "../img/jogo/cards/cria/origemDosPigmentos.png",
    desc: "Ganhe 1 carga de todas as cores e transfoma todos os corantes em tintas",
    type: "cria"
  },
  {
    name: "Espetaculo Magnifico",
    cost: 2,
    basePower: 50,
    rarity: "cria",
    img: "../img/jogo/cards/cria/podio.png",
    desc: "<strong class='criaDestaque'>(Modo Pincel Nescessario)</strong> Precisa de 2 cargas de todas as tintas para causar dano igual sua vida atual mais 50 de dano",
    type: "cria"
  },
  {
    name: "Criação Nescessaria",
    cost: 2,
    basePower: 0,
    rarity: "cria",
    img: "../img/jogo/cards/cria/boaIdeia.png",
    desc: "Precisa de 1 carga de tinta azul, vermelho e amarelo para criar 2 cargas de tinta roxa, laranja e verde",
    type: "cria"
  },
  {
    name: "Sonho Extraordinario",
    cost: 1,
    basePower: 30,
    rarity: "cria",
    img: "../img/jogo/cards/cria/sonho.png",
    desc: "Precisa 2 carga de tinta azul para ganhar 30 de escudo",
    type: "cria"
  },
  {
    name: "Proteção Da Pureza",
    cost: 2,
    basePower: 15,
    rarity: "cria",
    img: "../img/jogo/cards/cria/protect.png",
    desc: "Precisa 2 carga de tinta azul e 1 tinta amarela para ganhar 30 de escudo e curar 15",
    type: "cria"
  },
  {
    name: "Respingo Da Vida",
    cost: 1,
    basePower: 20,
    rarity: "cria",
    img: "../img/jogo/cards/cria/sol.png",
    desc: "Precisa 2 carga de tinta verde para curar 20",
    type: "cria"
  },
  {
    name: "Arco Da Majestade",
    cost: 2,
    basePower: 55,
    rarity: "cria",
    img: "../img/jogo/cards/cria/arcoDaMajestade.png",
    desc: "<strong class='criaDestaque'>(Modo Arco Nescessario)</strong> Precisa 1 carga de todas as tintas para causar 55 de dano em area",
    type: "cria"
  },
  {
    name: "Chuva Magnifica",
    cost: 3,
    basePower: 150,
    rarity: "cria",
    img: "../img/jogo/cards/cria/chuvaFle.png",
    desc: "<strong class='criaDestaque'>(Modo Arco Nescessario)</strong> Precisa 5 carga de tinta vermelha e 1 roxa para causar 150 de dano em area",
    type: "cria"
  },
  {
    name: "Majestade Escolhe",
    cost: 1,
    basePower: 20,
    rarity: "cria",
    img: "../img/jogo/cards/cria/majestade.png",
    desc: "Muda imediatamente para o modo Arco. Precisa 1 carga de tinta laranja para causar 20 de dano no ultimo inimigo",
    type: "cria"
  },
  {
    name: "As Armas",
    cost: 1,
    basePower: 20,
    rarity: "cria",
    img: "../img/jogo/cards/cria/flechaVermelha.png",
    desc: "<strong class='criaDestaque'>(Modo Arco Nescessario)</strong> Precisa 1 carga de tinta vermelha para causar 20 de dano",
    type: "cria"
  },
  {
    name: "O Céu... Curva-se",
    cost: 1,
    basePower: 10,
    rarity: "cria",
    img: "../img/jogo/cards/cria/flechaAzul.png",
    desc: "<strong class='criaDestaque'>(Modo Arco Nescessario)</strong> Precisa 1 carga de tinta azul para causar 10 de dano em area",
    type: "cria"
  },
  {
    name: "Arsenal De Pigmentos",
    cost: 2,
    basePower: 25,
    rarity: "cria",
    img: "../img/jogo/cards/cria/flechaLaranja.png",
    desc: "<strong class='criaDestaque'>(Modo Arco Nescessario)</strong> Precisa 1 carga de tinta laranja para causar 25 de dano em area",
    type: "cria"
  },
];