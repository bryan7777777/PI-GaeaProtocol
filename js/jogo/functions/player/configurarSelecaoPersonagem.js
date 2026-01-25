function configurarSelecaoPersonagem() {
  const personagensInfo = {
    verde: {
      nome: "🌿JÃO, O CARA🌿",
      dificuldade: "🌿NÍVEL DE DIFICULDADE: 💀💀🌿",
      cor: "rgb(0, 188, 16)",
      descricao: "Deck versátil, com um pouco de tudo e status balanceados.",
      cardFoco: "Não possui foco em uma carta principal.",
      hp: 100,
      maxHp: 100,
      energia: 3,
      escudo: 0,
      mao: 6,
      img: "./../img/jogo/player/jao.png",
      lor: "\"Um cara é um humano mas também é um cara, e caras tem trabalho, caras que trabalham fazem muita coisa, e eu faço muita coisa, por isso eu sou o cara\". [...]<br><br> -Jão o cara"
    },
    magnolia: {
      nome: "🌿MAGNOLIA, LIDER DA GAEA🌿",
      dificuldade: "🌿NÍVEL DE DIFICULDADE: 💀🌿",
      cor: "rgb(0, 188, 16)",
      descricao: "Deck versátil com diversas cartas de terra, tem estatus bem maiores que muitos soldados da gaea, status balanceados e fortes.",
      cardFoco: "Tem o foco principal em cartas de terra.",
      hp: 120,
      maxHp: 120,
      energia: 4,
      escudo: 0,
      mao: 6,
      img: "./../img/jogo/player/magnolia.png",
      lor: "[...]"
    },
    wallace: {
      nome: "🌿WALLACE, O ESPECTRO DA FLORESTA🌿",
      dificuldade: "🌿NÍVEL DE DIFICULDADE: 💀💀🌿",
      cor: "rgb(0, 188, 16)",
      descricao: "Possui um deck bem leve e fraco, ele tem GÆA PROTOCOOL, ele inicia com 250🪙 ao inves de 0🪙",
      cardFoco: "Começa com ataques e defesas basicas e fracas, com o intuito de moldar seu deck.",
      hp: 100,
      maxHp: 100,
      energia: 4,
      escudo: 0,
      mao: 5,
      img: "./../img/jogo/player/wallace.png",
      lor: "Ex soldado da gaea, após achar um mecha de construção abandonado decidiu por conta propria ajudar, mesmo que aposentado e debilitado ele nunca deixou de acreditar em um futuro melhor [...] mas suas economias durante sua carreira podem ajudar com isso [...]"
    },
    gaeaReen: {
      nome: "🌿ELIZE, A ESPERANÇA🌿",
      dificuldade: "🌿NÍVEL DE DIFICULDADE: 💀🌿",
      cor: "rgb(0, 188, 16)",
      descricao: "Deck focado em sustentabilidade, reciclagem é a melhor coisa a se fazer para o mundo e para melhorar suas cartas, deck focado em reciclagem e melhoria de cartas, no inicio é dificil mas no final ajuda todos.",
      cardFoco: "Ela inicia com GÆA PROTOCOOL, diversas cartas de reciclagem e varios lixos.",
      hp: 120,
      maxHp: 120,
      energia: 4,
      escudo: 0,
      mao: 6,
      img: "./../img/jogo/player/kalenart.png",
      lor: "[...]"
    },
    amarelo: {
      nome: "⛏️BRUNO, O MINEIRO CHEFE⛏️",
      dificuldade: "⛏️NÍVEL DE DIFICULDADE: 💀💀⛏️",
      cor: "rgb(231, 201, 7)",
      descricao: "Deck focado em cartas de terra, extremamente forte contra água mas fraco contra fogo, versátil e sabe como conseguir xenofluxo.",
      cardFoco: "Focado em cartas de terra e combo com terra, inicia com Mineração.",
      hp: 100,
      maxHp: 100,
      energia: 3,
      escudo: 0,
      mao: 5,
      img: "./../img/jogo/player/mineiro.png",
      lor: "[...]"
    },
    felipe: {
      nome: "⛏️FELIPE, GEO MAPEADOR⛏️",
      dificuldade: "⛏️NÍVEL DE DIFICULDADE: 💀💀⛏️",
      cor: "rgb(231, 201, 7)",
      descricao: "Deck focado em cartas de terra, seu foco é usar a terra para se proteger, fraco no ataque, versátil e sabe como conseguir xenofluxo.",
      cardFoco: "Focado em cartas de terra na parte defensiva, tem cartas de ataque basicas e fracas, inicia com Mineração.",
      hp: 130,
      maxHp: 130,
      energia: 3,
      escudo: 5,
      mao: 5,
      img: "./../img/jogo/player/felipe.png",
      lor: "[...]"
    },
    celso: {
      nome: "⛏️CELSO, O ARQUEOLOGO⛏️",
      dificuldade: "⛏️NÍVEL DE DIFICULDADE: 💀💀⛏️",
      cor: "rgb(231, 201, 7)",
      descricao: "Deck focado em cartas de terra, seu foco é usar a terra para atacar, fraco na defesa, versátil e sabe como conseguir xenofluxo.",
      cardFoco: "Focado em cartas de terra na parte de ataque, tem cartas de defesa basicas e fracas, inicia com Mineração.",
      hp: 75,
      maxHp: 75,
      energia: 4,
      escudo: 0,
      mao: 5,
      img: "./../img/jogo/player/celso.png",
      lor: "[...]"
    },
    maria: {
      nome: "⛏️MARIA, ESPECIALISTA EM EXPLOSÕES⛏️",
      dificuldade: "⛏️NÍVEL DE DIFICULDADE: 💀💀⛏️",
      cor: "rgb(231, 201, 7)",
      descricao: "Nem muito forte nem fraco, deck equilibrado com cartas de terra, ela sabe que reciclar agora gera um futuro melhor, focada em escalar reciclagem.",
      cardFoco: "Focada em cartas de reciclagem e terra, inicia com Mineração.",
      hp: 110,
      maxHp: 110,
      energia: 3,
      escudo: 0,
      mao: 7,
      img: "./../img/jogo/player/maria.png",
      lor: "[...]"
    },
    porto: {
      nome: "⚓CLARICE, A AUTORIDADE DO PORTO⚓",
      dificuldade: "⚓NÍVEL DE DIFICULDADE: 💀💀⚓",
      cor: "rgba(69, 89, 222, 1)",
      descricao: "Deck hibrido com água e cartas de ataque na linha de trás, um deck extremamente forte para se defender e atacar ao mesmo tempo, fraco contra os tipos terra porém extremamente forte quando se combado com água",
      cardFoco: "Carta principal é o Arpão e possui diversas cartas de água",
      hp: 110,
      maxHp: 110,
      energia: 3,
      escudo: 5,
      mao: 5,
      img: "./../img/jogo/player/autoridadeDoPorto.png",
      lor: "Assim como seu pai ela assumiu o manto de autoridade do porto, aprendeu bem com seu velho estratégias muito boas de ataque a distancia, mas ela se apaixonou pelo mar assim como sua mãe. [...]"
    },
    azul: {
      nome: "⚓REINOR, O ESCUDO DA HUMANIDADE⚓",
      dificuldade: "⚓NÍVEL DE DIFICULDADE: 💀⚓",
      cor: "rgba(69, 89, 222, 1)",
      descricao: "Focado em defesa, extremamente defensivo, utiliza de seus escudos para se proteger e causar muito dano, deck extremamente defensivo e seu potencial de ataque é baseado no seu escudo.",
      cardFoco: "Sua carta principal é Escudo Retaliante para causar dano, e possui em maioria no seu deck cartas de defesa.",
      hp: 130,
      maxHp: 130,
      energia: 3,
      escudo: 5,
      mao: 5,
      img: "./../img/jogo/player/tank.png",
      lor: "Recrudado pelo ex lider, sempre sonhou em proteger os mais fracos e faz de seu escudo o abrigo daqueles que não podem se defender [...]"
    },
    fergus: {
      nome: "⚓FERGUS, EX AUTORIDADE DO PORTO⚓",
      dificuldade: "⚓NÍVEL DE DIFICULDADE: 💀💀⚓",
      cor: "rgba(69, 89, 222, 1)",
      descricao: "Deck principalmente focado em causar dano na linha de trás, possui um escalonamento fraco e defesa levemente fraca, seu potencial principal é retaliar a linha de trás",
      cardFoco: "Carta principal é o Arpão, inicia com Alma Do Mar.1 e diversas cartas de ataque focadas em atacar o ultimo alvo",
      hp: 145,
      maxHp: 145,
      energia: 3,
      escudo: 0,
      mao: 5,
      img: "./../img/jogo/player/fergus.png",
      lor: "Após conquistar todos os mares, extremamente respeitado ele foi, um deles ele renomeou em homenagem a sua amada filha e esposa, conquistou todos os mares com sua estrategia famosa de focar na linha de trás, aposentado ou não esse velho ainda está na ativa, enquanto ele não matar o KRAKEN e vingar sua esposa ele continuara na ativa! [...]"
    },
    mercuri: {
      nome: "⚓MERCURI, GUARDA PORTO⚓",
      dificuldade: "⚓NÍVEL DE DIFICULDADE: 💀⚓",
      cor: "rgba(69, 89, 222, 1)",
      descricao: "Estrategista em causar dano na linha de trás, sabe se defender bem e usa isso a seu favor, contem diversas cartas de combo com água o que o torna fraco contra terra.",
      cardFoco: "Suas cartas principais são cartas de defesa, tem uma parte do deck com cartas de água focada principalmente em buff.",
      hp: 100,
      maxHp: 100,
      energia: 3,
      escudo: 0,
      mao: 5,
      img: "./../img/jogo/player/mercuri.png",
      lor: "Grande estrategista aprendeu tudo o que sabe com a ex autoridade do porto, era o braço direito dele, após ver os lindos mares ficarem poluidos ele não pensou duas vezes em fazer algo para ajudar. [...]"
    },
    laranja: {
      nome: "🐦‍🔥GABRIEL, O INABALÁVEL🐦‍🔥",
      dificuldade: "🐦‍🔥NÍVEL DE DIFICULDADE: 💀💀🐦‍🔥",
      cor: "rgb(255, 128, 0)",
      descricao: "Agressivo e ágil, perfeito para combates rápidos, causa múltiplos danos em um único alvo.",
      cardFoco: "Não possui foco em uma carta principal.",
      hp: 70,
      maxHp: 70,
      energia: 3,
      escudo: 0,
      mao: 6,
      img: "./../img/jogo/player/corredor.png",
      lor: "[...]"
    },
    cleber: {
      nome: "🐦‍🔥CLEBER, PROTETOR DA FAUNA🐦‍🔥",
      dificuldade: "🐦‍🔥NÍVEL DE DIFICULDADE: 💀💀🐦‍🔥",
      cor: "rgb(255, 128, 0)",
      descricao: "Focado em defesa, ele fez questão que seu mecha parecesse com um leão, ele até hoje odeia arranhar ele, e sempre abre escudos para não danificar sua pintura, um arranhão para ele é pior que a morte, um leonino orgulhoso talvez? como será que ele lidará com quem joga sujo?.",
      cardFoco: "Não possui foco em uma carta principal.",
      hp: 160,
      maxHp: 160,
      energia: 3,
      escudo: 5,
      mao: 5,
      img: "./../img/jogo/player/cleber.png",
      lor: "[...]"
    },
    malaquias: {
      nome: "🐦‍🔥MALAQUIAS, ESPECIALISTA EM REPTEIS🐦‍🔥",
      dificuldade: "🐦‍🔥NÍVEL DE DIFICULDADE: 💀💀💀💀💀🐦‍🔥",
      cor: "rgb(255, 128, 0)",
      descricao: "Maluco por compras, se ele pudesse comprava uma casa no shooping só para fazer compras lá, ele curte comprar bastante mas será que ele vai ter saldo para sustentar isso?.",
      cardFoco: "Foco na carta Compra Dupla.",
      hp: 78,
      maxHp: 78,
      energia: 6,
      escudo: 0,
      mao: 3,
      img: "./../img/jogo/player/malaquias.png",
      lor: "Um homem de sorte? Não a sorte que precisa desse homem, além da sua compulção por comprar ele curte apostar, um belo exemplo do tipo de pessoa que tem tudo para perder suas economias... Bom era para ele perder, mas aparentemente ele tem menos chance de perder? Ele não é um \"apostador qualquer\" ele utiliza de muita estrategia para ganhar dinheiro, ele percebeu que para sustentar seu vicio em comprar ele precisaria ser rico, e um mero trabalho jamais daria o dinheiro que ele precisa, além de CLT, dono de multiplas empresas, investidor de risco e mestre do poker, ele é um apostador nato, ele fez tudo isso só para... comprar coisas inuteis que ele nunca vai usar?"
    },
    renata: {
      nome: "🐦‍🔥RENATA, ESPECIALISTA EM MAMIFEROS🐦‍🔥",
      dificuldade: "🐦‍🔥NÍVEL DE DIFICULDADE: 💀🐦‍🔥",
      cor: "rgb(255, 128, 0)",
      descricao: "Mestre em fotografia, ágil exploradora, porém uma estrategista cautelosa, é capaz de gerar muita energia, como utilizar já é outra historia, .",
      cardFoco: "Não possui foco em uma carta principal.",
      hp: 50,
      maxHp: 50,
      energia: 3,
      escudo: 0,
      mao: 6,
      img: "./../img/jogo/player/renata.png",
      lor: "[...]"
    },
    marcos: {
      nome: "🌪️MARCOS, EX BOMBEIRO🌪️",
      dificuldade: "🌪️NÍVEL DE DIFICULDADE: 💀💀🌪️",
      cor: "rgba(255, 255, 255, 1)",
      descricao: "Após muitos anos trabalhando com queimadas e como bombeiro, ele decidiu se alistar para a aeronautica e seguir carreira, quem diria que suas abilidades com manuseio de fogo e controle dele seriam bem uteis, seu deck é focado em causar dano a inimigos em chamas e marcar com água.",
      cardFoco: "Não possui foco em uma carta principal.",
      hp: 120,
      maxHp: 120,
      energia: 3,
      escudo: 0,
      mao: 5,
      img: "./../img/jogo/player/marcos.png",
      lor: "[...]"
    },
    cleide: {
      nome: "🌪️CLEIDE, A VETERANA🌪️",
      dificuldade: "🌪️NÍVEL DE DIFICULDADE: 💀💀💀🌪️",
      cor: "rgba(255, 255, 255, 1)",
      descricao: "Já participou de muitas coisas na vida, mas ainda se lembra de tudo, sabe usar a estratégia ensinada pela Glacia, pela Autoridade do porto e pela Magnolia, muito respeitada por ambos os grupos, seu deck é uma mistura de todos os elementos, usufluir de sinergia é algo vital, mas como lidar com alguém imune a isso?.",
      cardFoco: "Não possui foco em uma carta principal.",
      hp: 100,
      maxHp: 100,
      energia: 3,
      escudo: 0,
      mao: 7,
      img: "./../img/jogo/player/cleide.png",
      lor: "[...]"
    },
    magna: {
      nome: "🌪️MAGNA, A IMPACIENTE🌪️",
      dificuldade: "🌪️NÍVEL DE DIFICULDADE: 💀🌪️",
      cor: "rgba(255, 255, 255, 1)",
      descricao: "Ela não curte focar apenas um alvo quando ela pode focar todos, utiliza de muitos golpes em área, perfeita para lidar com grandes grupos porém fraca contra inimigos solo.",
      cardFoco: "Não possui foco em uma carta principal.",
      hp: 128,
      maxHp: 128,
      energia: 4,
      escudo: 0,
      mao: 5,
      img: "./../img/jogo/player/magna.png",
      lor: "[...]"
    },
    lucius: {
      nome: "🌪️LUCIUS, IRMÃO DO JÃO🌪️",
      dificuldade: "🌪️NÍVEL DE DIFICULDADE: 💀💀🌪️",
      cor: "rgba(255, 255, 255, 1)",
      descricao: "Ninguem sabe onde ele vive, por onde anda, ele vai trabalhar quando ele quer pelo tempo que quer e até hoje se perguntão como ele não foi demitido, se não fosse pelos seus feitos lendários ele provavelmente não estária aqui, digamos que seu deck é algo lendário assim como dito.",
      cardFoco: "Não possui foco em uma carta principal.",
      hp: 100,
      maxHp: 100,
      energia: 3,
      escudo: 0,
      mao: 5,
      img: "./../img/jogo/player/lucius.png",
      lor: "[...]"
    },
    lilia: {
      nome: "🐼❄️LILIA, LIDER DO GLACIAL PROTOCOOL❄️🐼",
      dificuldade: "🐼❄️NÍVEL DE DIFICULDADE: 💀💀💀💀❄️🐼",
      cor: "rgba(255, 128, 251, 1)",
      descricao: "Ela sabe muito bem se adpatar a tudo, ela pode parecer fraca e indefesa como um panda, mas quando ela se adapta, ela mostra suas imensas garras, com uma força, vitalidade, energia e pensamento incrivel ela possui um deck de gelo capaz de causar muito estrago se usado sob condições favoraveis, combe marcação para turbinar seu dano e def imensuraveis.",
      cardFoco: "Focada em cartas de gelo baratas com custo max.2, seus status aumentão ao decorrer das fases.",
      hp: "60",
      maxHp: "60",
      energia: "2",
      escudo: "0",
      mao: "4",
      img: "./../img/jogo/player/lilia.png",
      lor: "Lider do GLACIAL PROTOCOOL (GLA.P), dona de muitas lendas, ao mesmo tempo que sabem muito sobre ela também sabem tão pouco, há muitos rumores e historias lendarias dela, uma grande estrategista, dizem que ela ja foi capaz de apenas com mais 3 soldados do GLA.P derrubar um imenso batalhão de mais de 100mil robos corrompidos e destruir uma das principais bases da IA, também falam que ela sozinha já bateu de frente contra multiplos exercitos para salvar seu povo, verdade ou não, esse mitos ecoam por todos do GLA.P e até outros protocools já ouviram dela, ela é muito respeitada por todos, até Magnolia a lider do G.P a respeita muito[...], \"Será que é verdade que ela não precisa de um mecha?\""
    },
    glacia: {
      nome: "❄️GLACIA, VICE LIDER DOS PESQUISADORES❄️",
      dificuldade: "❄️NÍVEL DE DIFICULDADE: 💀💀❄️",
      cor: "rgb(128, 240, 255)",
      descricao: "Focada em enfraquecer e marcar o inimigo, deck de gelo capaz de causar muito estrago se usado sob condições favoraveis, ela tem uma margem de visão tão boa e estratégia que sua mão raramente fica vazia, você sabera como gastar sua energia?.",
      cardFoco: "Não possui foco em uma carta principal.",
      hp: 80,
      maxHp: 80,
      energia: 4,
      escudo: 0,
      mao: 8,
      img: "./../img/jogo/player/glacia.png",
      lor: "[...]"
    },
    olaf: {
      nome: "❄️OLAF, O GUARDIÃO GELIDO❄️",
      dificuldade: "❄️NÍVEL DE DIFICULDADE: 💀💀💀❄️",
      cor: "rgb(128, 240, 255)",
      descricao: "Focado em usar o gelo como defesa, deck de gelo bem defensivo, porem fraco em atacar.",
      cardFoco: "Não possui foco em uma carta principal.",
      hp: 150,
      maxHp: 150,
      energia: 3,
      escudo: 5,
      mao: 5,
      img: "./../img/jogo/player/olaf.png",
      lor: "[...]"
    },
    olga: {
      nome: "❄️OLGA, A PESQUISADORA PRODIGIO❄️",
      dificuldade: "❄️NÍVEL DE DIFICULDADE: 💀💀💀❄️",
      cor: "rgb(128, 240, 255)",
      descricao: "Focada em causar muito dano de gelo, deck de gelo capaz de causar muito estrago se usado sob condições favoraveis, ela é bem fraca na defesa.",
      cardFoco: "Não possui foco em uma carta principal.",
      hp: 90,
      maxHp: 90,
      energia: 3,
      escudo: 0,
      mao: 6,
      img: "./../img/jogo/player/olga.png",
      lor: "[...]"
    },
    x: {
      nome: "🔮A ESQUECIDA🔮",
      dificuldade: "🔮NÍVEL DE DIFICULDADE: 💀💀💀💀🔮",
      cor: "rgb(0, 114, 129)",
      descricao: "Seu deck é... Assim como suas memórias... Sempre em neblina, seu deck é aleatório a cada partida",
      cardFoco: "Não possui foco em uma carta principal.",
      hp: 100,
      maxHp: 200,
      energia: 3,
      escudo: 2,
      mao: 4,
      img: "./../img/jogo/player/x.png",
      lor: "[...]"
    },
    tomoeh: {
      nome: "🩸TOMOEH, A SOMBRA🩸",
      dificuldade: "🩸NÍVEL DE DIFICULDADE: 💀💀💀🩸",
      cor: "rgb(255, 147, 250)",
      descricao: "Uma assassina ágil e mortal, porém frágil. Tente finalizar a batalha rapidamente antes que o pior aconteça...",
      cardFoco: "Não possui foco em uma carta principal.",
      hp: 30,
      maxHp: 30,
      energia: 6,
      escudo: 0,
      mao: 9,
      img: "./../img/jogo/player/sombra.png",
      lor: "[...]"
    },
    ferrus: {
      nome: "⚒️MAGNUS FERRUS, O PRODÍGIO⚒️",
      dificuldade: "⚒️NÍVEL DE DIFICULDADE: 💀💀⚒️",
      cor: "rgb(103, 67, 0)",
      descricao: "Deck focado em reciclagem, no inicio ele começa bem fraco mas com o tempo ele vai ganhando força com forme o tempo passa, quem diria que reciclar seria bom para todos os lados, por incrivel que pareça no meio do lixo ele achou... ouro? ok ele inicia com 50🪙 ao inves de 0🪙.",
      cardFoco: "Não possui foco em uma carta principal.",
      hp: 80,
      maxHp: 160,
      energia: 3,
      escudo: 0,
      mao: 5,
      img: "./../img/jogo/player/sal2.png",
      lor: "[...]"
    },
    roxo: {
      nome: "⚙️VINICIUS, A INTERFACE CAÓTICA⚙️",
      dificuldade: "⚙️NÍVEL DE DIFICULDADE: 💀💀⚙️",
      cor: "rgb(141, 7, 231)",
      descricao: "Um engenheiro estratégico, utiliza de seus drones para tudo, saber como usar sua energia é algo vital.",
      cardFoco: "Não possui foco em uma carta principal.",
      hp: 60,
      maxHp: 60,
      energia: 5,
      escudo: 0,
      mao: 7,
      img: "./../img/jogo/player/cabaDosDrones.png",
      lor: "[...]"
    }
  };

  const personagens = document.querySelectorAll(".personagens img");
  const imgPreview = document.getElementById("imgPersonagem");

  window.selecionarPersonagem = function (id) {
    const info = personagensInfo[id];
    if (!info) return;

    personagens.forEach(p => p.classList.remove("selecionado"));

    const img = document.getElementById(id);
    if (img) img.classList.add("selecionado");

    personagemSelecionado = id;

    topoInfo.innerHTML = `
      <em>${info.nome}</em>
      <em>${info.dificuldade}</em>
      <span class="destaqueDesc">
        ❤️ HP: ${info.hp}/${info.maxHp}
        🛡️ Escudo: ${info.escudo}
        🤚 Mão: ${info.mao}
        🔷 Energia: ${info.energia}
      </span>
    `;

   descricaoInfo.innerHTML = `
  <span class="destaqueDesc">DESCRIÇÃO DO DECK:</span>
  <span>${info.descricao}</span>
  <span class="destaqueCard">${info.cardFoco}</span><br>
  <span class="destaqueDesc">HISTÓRIA DO PERSONAGEM:</span>
  <span>${info.lor}</span>
  <span class="destaqueCard">Confira com mais detalhes o resto da história no site!</span><br>
`;

    imgPreview.src = info.img;
    imgPreview.alt = info.nome;
  };

  personagens.forEach(img => {
    img.addEventListener("click", () => {
      selecionarPersonagem(img.id);
    });
  });
}

const btnConfirmar = document.getElementById("fimSelecao");

btnConfirmar.addEventListener("click", () => {
  if (!personagemSelecionado) {
    alert("Selecione um personagem antes de confirmar!");
    return;
  }

  mostrarTela(2);
  mapaCanvas("divMapa", fases, caminhos, corMapa1, corMapa2, iconBoss);
});
