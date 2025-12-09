function configurarSelecaoPersonagem() {
  const personagensInfo = {
    vermelho: {
      nome: "♨️VIKLAV, O GENERAL SANGUINARIO♨️",
      dificuldade: "♨️NÍVEL DE DIFICULDADE: 💀💀💀♨️",
      cor: "rgb(172, 0, 0)",
      descricao: "Focado em causar muito dano em área, ele pode ser letal para ambos os lados.",
      hp: 50,
      maxHp: 50,
      energia: 4,
      escudo: 0,
      mao: 6
    },
    olaf: {
      nome: "❄️OLAF, O GUARDIÃO GELIDO❄️",
      dificuldade: "❄️NÍVEL DE DIFICULDADE: 💀💀💀❄️",
      cor: "rgb(128, 240, 255)",
      descricao: "Focado em usar o gelo como defesa, deck de gelo bem defensivo, porem fraco em atacar.",
      hp: 150,
      maxHp: 150,
      energia: 3,
      escudo: 5,
      mao: 5
    },
    lilia: {
      nome: "🐼❄️LILIA, AMANTE DE PANDAS E ARMAS❄️🐼",
      dificuldade: "🐼❄️NÍVEL DE DIFICULDADE: 💀💀💀❄️🐼",
      cor: "rgba(255, 128, 251, 1)",
      descricao: "Ela sabe muito bem se adpatar a tudo, ela pode parecer fraca e indefesa como um panda, mas quando ela se adapta... Ela mostra suas imensas garras, com uma força, vitalidade, energia e pensamento incrivel ela possui um deck de gelo capaz de causar muito estrago se usado sob condições favoraveis, combe marcação para turbinar seu dano e def imensuraveis.",
      hp: "60",
      maxHp: "60",
      energia: "2",
      escudo: "0",
      mao: "4"
    },
    olga: {
      nome: "❄️OLGA, A PESQUISADORA PRODIGIO❄️",
      dificuldade: "❄️NÍVEL DE DIFICULDADE: 💀💀💀❄️",
      cor: "rgb(128, 240, 255)",
      descricao: "Focada em causar muito dano de gelo, deck de gelo capaz de causar muito estrago se usado sob condições favoraveis, ela é bem fraca na defesa.",
      hp: 90,
      maxHp: 90,
      energia: 3,
      escudo: 0,
      mao: 6
    },
    glacia: {
      nome: "❄️GLACIA, VICE LIDER DOS PESQUISADORES❄️",
      dificuldade: "❄️NÍVEL DE DIFICULDADE: 💀💀❄️",
      cor: "rgb(128, 240, 255)",
      descricao: "Focada em enfraquecer e marcar o inimigo, deck de gelo capaz de causar muito estrago se usado sob condições favoraveis, ela tem uma margem de visão tão boa e estratégia que sua mão raramente fica vazia, você sabera como gastar sua energia?.",
      hp: 80,
      maxHp: 80,
      energia: 4,
      escudo: 0,
      mao: 8
    },
    laranja: {
      nome: "🐦‍🔥GABRIEL, O INABALÁVEL🐦‍🔥",
      dificuldade: "🐦‍🔥NÍVEL DE DIFICULDADE: 💀💀🐦‍🔥",
      cor: "rgb(255, 128, 0)",
      descricao: "Agressivo e ágil, perfeito para combates rápidos, causa múltiplos danos em um único alvo.",
      hp: 70,
      maxHp: 70,
      energia: 3,
      escudo: 0,
      mao: 6
    },
    cleber: {
      nome: "🐦‍🔥CLEBER, PROTETOR DA FAUNA🐦‍🔥",
      dificuldade: "🐦‍🔥NÍVEL DE DIFICULDADE: 💀💀🐦‍🔥",
      cor: "rgb(255, 128, 0)",
      descricao: "Focado em defesa, ele fez questão que seu mecha parecesse com um leão, ele até hoje odeia arranhar ele, e sempre abre escudos para não danificar sua pintura, um arranhão para ele é pior que a morte, um leonino orgulhoso talvez? como será que ele lidará com quem joga sujo?.",
      hp: 160,
      maxHp: 160,
      energia: 3,
      escudo: 5,
      mao: 5
    },
    malaquias: {
      nome: "🐦‍🔥MALAQUIAS, ESPECIALISTA EM REPTEIS🐦‍🔥",
      dificuldade: "🐦‍🔥NÍVEL DE DIFICULDADE: 💀💀💀💀🐦‍🔥",
      cor: "rgb(255, 128, 0)",
      descricao: "Maluco por compras, se ele pudesse comprava uma casa no shooping só para fazer compras lá, ele curte comprar bastante mas será que ele vai ter saldo para sustentar isso?.",
      hp: 78,
      maxHp: 78,
      energia: 6,
      escudo: 0,
      mao: 3
    },
    renata: {
      nome: "🐦‍🔥RENATA, ESPECIALISTA EM MAMIFEROS🐦‍🔥",
      dificuldade: "🐦‍🔥NÍVEL DE DIFICULDADE: 💀🐦‍🔥",
      cor: "rgb(255, 128, 0)",
      descricao: "Mestre em fotografia, ágil exploradora, porém uma estrategista cautelosa, é capaz de gerar muita energia, como utilizar já é outra historia, .",
      hp: 50,
      maxHp: 50,
      energia: 3,
      escudo: 0,
      mao: 6
    },
    marcos: {
      nome: "🌪️MARCOS, EX BOMBEIRO🌪️",
      dificuldade: "🌪️NÍVEL DE DIFICULDADE: 💀💀🌪️",
      cor: "rgba(255, 255, 255, 1)",
      descricao: "Após muitos anos trabalhando com queimadas e como bombeiro, ele decidiu se alistar para a aeronautica e seguir carreira, quem diria que suas abilidades com manuseio de fogo e controle dele seriam bem uteis, seu deck é focado em causar dano a inimigos em chamas e marcar com água.",
      hp: 120,
      maxHp: 120,
      energia: 3,
      escudo: 0,
      mao: 5
    },
    cleide: {
      nome: "🌪️CLEIDE, A VETERANA🌪️",
      dificuldade: "🌪️NÍVEL DE DIFICULDADE: 💀💀💀🌪️",
      cor: "rgba(255, 255, 255, 1)",
      descricao: "Já participou de muitas coisas na vida, mas ainda se lembra de tudo, sabe usar a estratégia ensinada pela Glacia, pela Autoridade do porto e pela Magnolia, muito respeitada por ambos os grupos, seu deck é uma mistura de todos os elementos, usufluir de sinergia é algo vital, mas como lidar com alguém imune a isso?.",
      hp: 100,
      maxHp: 100,
      energia: 3,
      escudo: 0,
      mao: 7
    },
    magna: {
      nome: "🌪️MAGNA, A IMPACIENTE🌪️",
      dificuldade: "🌪️NÍVEL DE DIFICULDADE: 💀🌪️",
      cor: "rgba(255, 255, 255, 1)",
      descricao: "Ela não curte focar apenas um alvo quando ela pode focar todos, utiliza de muitos golpes em área, perfeita para lidar com grandes grupos porém fraca contra inimigos solo.",
      hp: 128,
      maxHp: 128,
      energia: 4,
      escudo: 0,
      mao: 5
    },
    lucius: {
      nome: "🌪️LUCIUS, IRMÃO DO JÃO🌪️",
      dificuldade: "🌪️NÍVEL DE DIFICULDADE: 💀💀🌪️",
      cor: "rgba(255, 255, 255, 1)",
      descricao: "Ninguem sabe onde ele vive, por onde anda, ele vai trabalhar quando ele quer pelo tempo que quer e até hoje se perguntão como ele não foi demitido, se não fosse pelos seus feitos lendários ele provavelmente não estária aqui, digamos que seu deck é algo lendário assim como dito.",
      hp: 100,
      maxHp: 100,
      energia: 3,
      escudo: 0,
      mao: 5
    },
    azul: {
      nome: "⚓REINOR, O ESCUDO DA HUMANIDADE⚓",
      dificuldade: "⚓NÍVEL DE DIFICULDADE: 💀⚓",
      cor: "rgba(69, 89, 222, 1)",
      descricao: "Recrudado pelo ex lider, sempre sonhou em proyteger os mais fracos e faz de seu escudo o abri daqueles que não podem se defender, focado em defesa, extremamente defensivo, utiliza de seus escudos para se proteger e causar dano.",
      hp: 130,
      maxHp: 130,
      energia: 3,
      escudo: 5,
      mao: 5
    },
    amarelo: {
      nome: "⛏️BRUNO, O MINEIRO CHEFE⛏️",
      dificuldade: "⛏️NÍVEL DE DIFICULDADE: 💀⛏️",
      cor: "rgb(231, 201, 7)",
      descricao: "Deck focado em cartas de terra, extremamente forte contra água mas fraco contra fogo, versátil e sabe como conseguir xenofluxo.",
      hp: 100,
      maxHp: 100,
      energia: 3,
      escudo: 0,
      mao: 5
    },
    celso: {
      nome: "⛏️CELSO, O ARQUEOLOGO⛏️",
      dificuldade: "⛏️NÍVEL DE DIFICULDADE: 💀💀⛏️",
      cor: "rgb(231, 201, 7)",
      descricao: "Deck focado em cartas de terra, seu foco é em atacar com terra e se defender de forma fraca, versátil e sabe como conseguir xenofluxo.",
      hp: 75,
      maxHp: 75,
      energia: 4,
      escudo: 0,
      mao: 5
    },
    felipe: {
      nome: "⛏️FELIPE, GEO MAPEADOR⛏️",
      dificuldade: "⛏️NÍVEL DE DIFICULDADE: 💀💀⛏️",
      cor: "rgb(231, 201, 7)",
      descricao: "Deck focado em cartas de terra, seu foco é usar a terra para se proteger, fraco no ataque, versátil e sabe como conseguir xenofluxo.",
      hp: 130,
      maxHp: 130,
      energia: 3,
      escudo: 5,
      mao: 5
    },
    maria: {
      nome: "⛏️MARIA, ESPECIALISTA EM EXPLOSÕES⛏️",
      dificuldade: "⛏️NÍVEL DE DIFICULDADE: 💀💀💀⛏️",
      cor: "rgb(231, 201, 7)",
      descricao: "Nem muito forte nem fraco, deck equilibrado com cartas de terra, ela sabe que reciclar agora gera um futuro melhor, focada em escalar reciclagem.",
      hp: 110,
      maxHp: 110,
      energia: 3,
      escudo: 0,
      mao: 7
    },
    verde: {
      nome: "🌿JÃO, O CARA🌿",
      dificuldade: "🌿NÍVEL DE DIFICULDADE: 💀💀🌿",
      cor: "rgb(0, 188, 16)",
      descricao: "Deck versátil, com um pouco de tudo e status balanceados.",
      hp: 100,
      maxHp: 100,
      energia: 3,
      escudo: 0,
      mao: 6
    },
    magnolia: {
      nome: "🌿MAGNOLIA, LIDER DA GAEA🌿",
      dificuldade: "🌿NÍVEL DE DIFICULDADE: 💀🌿",
      cor: "rgb(0, 188, 16)",
      descricao: "Deck versátil com diversas cartas de terra, tem estatus bem maiores que muitos soldados da gaea, status balanceados e fortes.",
      hp: 120,
      maxHp: 120,
      energia: 4,
      escudo: 0,
      mao: 6
    },
    roxo: {
      nome: "⚙️MALAQUIAS, A INTERFACE CAÓTICA⚙️",
      dificuldade: "⚙️NÍVEL DE DIFICULDADE: 💀💀⚙️",
      cor: "rgb(141, 7, 231)",
      descricao: "Um engenheiro estratégico, utiliza de seus drones para tudo, saber como usar sua energia é algo vital.",
      hp: 60,
      maxHp: 60,
      energia: 5,
      escudo: 0,
      mao: 7
    },
    ferrus: {
      nome: "⚒️MAGNUS FERRUS, O PRODÍGIO⚒️",
      dificuldade: "⚒️NÍVEL DE DIFICULDADE: 💀💀⚒️",
      cor: "rgb(103, 67, 0)",
      descricao: "Deck focado em reciclagem, no inicio ele começa bem fraco mas com o tempo ele vai ganhando força com forme o tempo passa, quem diria que reciclar seria bom para todos os lados, por incrivel que pareça no meio do lixo ele achou... ouro? ok ele inicia com 50🪙 ao inves de 0🪙.",
      hp: 80,
      maxHp: 160,
      energia: 3,
      escudo: 0,
      mao: 5
    },
    wallace: {
      nome: "🌿WALLACE, O ESPECTRO DA FLORESTA🌿",
      dificuldade: "🌿NÍVEL DE DIFICULDADE: 💀💀🌿",
      cor: "rgb(0, 188, 16)",
      descricao: "Ex soldado da gaea, após achar um mecha de construção abandonado decidiu por conta propria ajudar, mesmo que aposentado e debilitado ele nunca deixou de acreditar em um futuro melhor, possui um deck bem leve e fraco, mas suas economias durante sua carreira podem ajudar com isso, ele inicia com 100🪙 ao inves de 0🪙",
      hp: 100,
      maxHp: 100,
      energia: 4,
      escudo: 0,
      mao: 5
    },
    porto: {
      nome: "⚓CLARICE, A AUTORIDADE DO PORTO⚓",
      dificuldade: "⚓NÍVEL DE DIFICULDADE: 💀💀⚓",
      cor: "rgba(69, 89, 222, 1)",
      descricao: "Assim como seu pai ela assumiu o manto de autoridade do porto, aprendeu bem com seu velho estratégias muito boas de ataque a distancia, mas ela se apaixonou pelo mar assim como sua mãe e por conta disso seu deck é hibrido com água.",
      hp: 110,
      maxHp: 110,
      energia: 3,
      escudo: 5,
      mao: 5
    },
    fergus: {
      nome: "⚓FERGUS, EX AUTORIDADE DO PORTO⚓",
      dificuldade: "⚓NÍVEL DE DIFICULDADE: 💀💀⚓",
      cor: "rgba(69, 89, 222, 1)",
      descricao: "Após conquistar todos os mares, extremamente respeitado ele foi, um deles ele renomeou em homenagem a sua amada filha e esposa, conquistou todos os mares com sua estrategia famosa de focar na linha de trás, aposentado ou não esse velho ainda está na ativa, enquanto ele não matar o KRAKEN e vingar sua esposa ele continuara na ativa!",
      hp: 145,
      maxHp: 145,
      energia: 3,
      escudo: 0,
      mao: 5
    },
    mercuri: {
      nome: "⚓MERCURI, GUARDA PORTO⚓",
      dificuldade: "⚓NÍVEL DE DIFICULDADE: 💀⚓",
      cor: "rgba(69, 89, 222, 1)",
      descricao: "Estrategista em causar dano na linha de trás, aprendeu com a ex autoridade do porto, sabe se defender bem e usa isso a seu favor, após ver os lindos mares ficarem poluidos ele não pensou duas vezes em fazer algo para ajudar.",
      hp: 100,
      maxHp: 100,
      energia: 3,
      escudo: 0,
      mao: 5
    },
    tomoeh: {
      nome: "🩸TOMOEH, A SOMBRA🩸",
      dificuldade: "🩸NÍVEL DE DIFICULDADE: 💀💀💀🩸",
      cor: "rgb(255, 147, 250)",
      descricao: "Uma assassina ágil e mortal, porém frágil. Tente finalizar a batalha rapidamente antes que o pior aconteça...",
      hp: 30,
      maxHp: 30,
      energia: 6,
      escudo: 0,
      mao: 9
    },
    gaeaReen: {
      nome: "🌿ELIZE, A ESPERANÇA🌿",
      dificuldade: "🌿NÍVEL DE DIFICULDADE: 💀🌿",
      cor: "rgb(0, 188, 16)",
      descricao: "Deck focado em sustentabilidade, reciclagem é a melhor coisa a se fazer para o mundo e para melhorar suas cartas, deck focado em reciclagem e melhoria de cartas, no inicio é dificil mas no final ajuda todos",
      hp: 120,
      maxHp: 120,
      energia: 4,
      escudo: 0,
      mao: 6
    },
    x: {
      nome: "🔮A ESQUECIDA🔮",
      dificuldade: "🔮NÍVEL DE DIFICULDADE: 💀💀💀💀💀🔮",
      cor: "rgb(0, 114, 129)",
      descricao: "Seu deck é... Assim como suas memórias... Sempre em neblina, seu deck é aleatório a cada partida",
      hp: 100,
      maxHp: 200,
      energia: 3,
      escudo: 2,
      mao: 4
    }
  };

  imagens.forEach(img => {
    img.addEventListener("click", () => {
      const info = personagensInfo[img.id];
      if (!info) return;

      // Atualiza borda e sombra
      descBox.style.border = `5px solid ${info.cor}`;
      descBox.style.boxShadow = `0 0 25px ${info.cor}`;
      descBox.style.padding = "15px";
      descBox.style.borderRadius = "12px";
      descBox.style.background = "rgba(0, 0, 0, 0.7)";
      descBox.style.color = "#fff";
      descBox.style.transition = "all 0.3s ease";

      // Exibe nome, dificuldade, descrição e status
      descBox.innerHTML = `
        <strong style=" margin: 5px 0; color:${info.cor};">${info.nome}</strong>
        <em style="display:block; margin: 5px 0; color:${info.cor}; font-weight:bold;">${info.dificuldade}</em>
        <em style="display:block; margin: 5px 0; color:${info.cor}; font-weight:bold;">❤️${info.hp} / ${info.maxHp}, 🛡️${info.escudo}, 🤚${info.mao}, 🔷${info.energia}</em><br><br><br>
        <span>${info.descricao}</span>
      `;

      // Atualiza a seleção visual
      imagens.forEach(el => el.classList.remove("selecionado"));
      img.classList.add("selecionado");

      // Guarda globalmente o personagem selecionado
      window.personagemSelecionado = img.id;
    });
  });
};