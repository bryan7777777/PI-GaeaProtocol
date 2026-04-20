function configurarSelecaoPersonagem() {
  const personagensInfo = {
    verde: {
      nome: "🌿JÃO, O CARA🌿",
      dificuldade: "🌿NÍVEL DE DIFICULDADE: 💀💀🌿",
      cor: "rgb(0, 188, 16)",
      descricao: "Deck versátil, com um pouco de tudo e status balanceados.",
      cardFoco: "Não possui foco em uma carta principal. Deck balanceado e equilibrado.",
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
      lor: "Léder do Gaea Protocol (G.P)[...]"
    },
    wallace: {
      nome: "🌿WALLACE, O ESPECTRO DA FLORESTA🌿",
      dificuldade: "🌿NÍVEL DE DIFICULDADE: 💀💀🌿",
      cor: "rgb(0, 188, 16)",
      descricao: "Possui um deck bem leve e fraco, ele tem GÆA PROTOCOL, ele inicia com 250🪙 ao inves de 0🪙",
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
      cardFoco: "Ela inicia com GÆA PROTOCOL, diversas cartas de reciclagem e varios lixos.",
      hp: 120,
      maxHp: 120,
      energia: 4,
      escudo: 0,
      mao: 6,
      img: "./../img/jogo/player/gaeaReen.gif",
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
      img: "./../img/jogo/player/bruno.gif",
      lor: "Líder do GLEBA PROTOCOL, um ex-membro do GAEA, decidiu continuar cuidando do meio ambiente, então decidiu ir para o GLEBA e rapidamente se tornou o líder[...]"
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
      lor: "\"Em desenvolvimento\"[...]"
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
      lor: "\"Em desenvolvimento\"[...]"
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
      lor: "\"Em desenvolvimento\"[...]"
    },
    porto: {
      nome: "⚓CLARICE, A AUTORIDADE DO PORTO⚓",
      dificuldade: "⚓NÍVEL DE DIFICULDADE: 💀💀⚓",
      cor: "rgba(69, 89, 222, 1)",
      descricao: "Deck híbrido com água e cartas de ataque na linha de trás, um deck extremamente forte para se defender e atacar ao mesmo tempo, fraco contra os tipos terra porém extremamente forte quando se combado com água",
      cardFoco: "Carta principal é o Arpão e possui diversas cartas de água",
      hp: 110,
      maxHp: 110,
      energia: 3,
      escudo: 5,
      mao: 5,
      img: "./../img/jogo/player/autoridadeDoPorto.gif",
      lor: "Assim como seu pai ela assumiu o manto de autoridade do porto, aprendeu bem com seu velho estratégias muito boas de ataque a distância, mas ela se apaixonou pelo mar assim como sua mãe. [...]"
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
      lor: "Recrutado pelo ex lider, sempre sonhou em proteger os mais fracos e faz de seu escudo o abrigo daqueles que não podem se defender [...]"
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
      cardFoco: "Focado na carta Rajada Dupla",
      hp: 70,
      maxHp: 70,
      energia: 3,
      escudo: 0,
      mao: 6,
      img: "./../img/jogo/player/gabriel.gif",
      lor: "Salva animais com velocidade e precisão de situações inesperadas, combate à caça e ao tráfico animal."
    },
    cleber: {
      nome: "🐦‍🔥CLEBER, PROTETOR DA FAUNA🐦‍🔥",
      dificuldade: "🐦‍🔥NÍVEL DE DIFICULDADE: 💀💀🐦‍🔥",
      cor: "rgb(255, 128, 0)",
      descricao: "Focado em defesa, ele fez questão que seu mecha parecesse com um leão, ele até hoje odeia arranhar ele, e sempre abre escudos para não danificar sua pintura, um arranhão para ele é pior que a morte, um leonino orgulhoso talvez? como será que ele lidará com quem joga sujo?",
      cardFoco: "Focado na carta Brilhando",
      hp: 160,
      maxHp: 160,
      energia: 3,
      escudo: 5,
      mao: 5,
      img: "./../img/jogo/player/cleber.png",
      lor: "\"Em desenvolvimento\"[...]"
    },
    malaquias: {
      nome: "🐦‍🔥MALAQUIAS, ESPECIALISTA EM REPTEIS🐦‍🔥",
      dificuldade: "🐦‍🔥NÍVEL DE DIFICULDADE: 💀💀💀💀💀🐦‍🔥",
      cor: "rgb(255, 128, 0)",
      descricao: "Maluco por compras, se ele pudesse comprava uma casa no shooping só para fazer compras lá, ele curte comprar bastante mas será que ele vai ter saldo para sustentar isso?",
      cardFoco: "Foco na carta Compra Dupla.",
      hp: 78,
      maxHp: 78,
      energia: 6,
      escudo: 0,
      mao: 3,
      img: "./../img/jogo/player/malaquias.png",
      lor: "Um homem de sorte? Não, a sorte que precisa desse homem, além da sua compulção por comprar ele curte apostar, um belo exemplo do tipo de pessoa que tem tudo para perder suas economias... Bom era para ele perder, mas aparentemente ele tem menos chance de perder? Ele não é um \"apostador qualquer\" ele utiliza de muita estrategia para ganhar dinheiro, ele percebeu que para sustentar seu vicio em comprar ele precisaria ser rico, e um mero trabalho jamais daria o dinheiro que ele precisa, além de CLT, dono de multiplas empresas, investidor de risco e mestre do poker, ele é um apostador nato, ele fez tudo isso só para... comprar coisas inuteis que ele nunca vai usar?"
    },
    renata: {
      nome: "🐦‍🔥RENATA, ESPECIALISTA EM MAMIFEROS🐦‍🔥",
      dificuldade: "🐦‍🔥NÍVEL DE DIFICULDADE: 💀🐦‍🔥",
      cor: "rgb(255, 128, 0)",
      descricao: "Ágil exploradora, porém uma estrategista cautelosa, é capaz de gerar muita energia, como utilizar já é outra historia.",
      cardFoco: "Deck focado em gerar energia, e na carta Chuva de laminas.",
      hp: 50,
      maxHp: 50,
      energia: 3,
      escudo: 0,
      mao: 6,
      img: "./../img/jogo/player/renata.png",
      lor: "Especialista em fotografia, um de seus hobbys favoritos, consequentemente a tornando uma das melhores fotografas se não a melhor, foi recrutada para o FAUNA PROTOCOL quando estava tirado fotos de diversos animais, devido ao seu vasto conhecimento em mamiferos ela se tornou uma peça essencial para o grupo, principalmente quando se trata de preservar especies de mamiferos."
    },
    marcos: {
      nome: "🌪️MARCOS, EX BOMBEIRO🌪️",
      dificuldade: "🌪️NÍVEL DE DIFICULDADE: 💀💀🌪️",
      cor: "rgba(255, 255, 255, 1)",
      descricao: "Após muitos anos trabalhando com queimadas e como bombeiro, ele decidiu se alistar para a aeronautica e seguir carreira, quem diria que suas abilidades com manuseio de fogo e controle dele seriam bem uteis, seu deck é focado em causar dano a inimigos em chamas e marcar com água.",
      cardFoco: "Focado em cartas de elementais, do tipo fogo e água.",
      hp: 120,
      maxHp: 120,
      energia: 3,
      escudo: 0,
      mao: 5,
      img: "./../img/jogo/player/marcos.png",
      lor: "\"Em desenvolvimento\"[...]"
    },
    cleide: {
      nome: "🌪️CLEIDE, A VETERANA🌪️",
      dificuldade: "🌪️NÍVEL DE DIFICULDADE: 💀💀💀🌪️",
      cor: "rgba(255, 255, 255, 1)",
      descricao: "Já participou de muitas coisas na vida, mas ainda se lembra de tudo, sabe usar a estratégia ensinada pela Glacia, pela Autoridade do porto e pela Magnolia, muito respeitada por ambos os grupos, seu deck é uma mistura de todos os elementos, usufluir de sinergia é algo vital, mas como lidar com alguém imune a isso?",
      cardFoco: "Deck focado em cartas elementais de todos os tipos",
      hp: 100,
      maxHp: 100,
      energia: 3,
      escudo: 0,
      mao: 7,
      img: "./../img/jogo/player/cleide.png",
      lor: "\"Em desenvolvimento\"[...]"
    },
    magna: {
      nome: "🌪️MAGNA, A IMPACIENTE🌪️",
      dificuldade: "🌪️NÍVEL DE DIFICULDADE: 💀🌪️",
      cor: "rgba(255, 255, 255, 1)",
      descricao: "Ela não curte focar apenas um alvo quando ela pode focar todos, utiliza de muitos golpes em área, perfeita para lidar com grandes grupos porém fraca contra inimigos solo.",
      cardFoco: "Deck focado em causar muito dano em área e marcação de Fogo",
      hp: 128,
      maxHp: 128,
      energia: 4,
      escudo: 0,
      mao: 5,
      img: "./../img/jogo/player/magna.png",
      lor: "\"Em desenvolvimento\"[...]"
    },
    lucius: {
      nome: "🌪️LUCIUS, IRMÃO DO JÃO🌪️",
      dificuldade: "🌪️NÍVEL DE DIFICULDADE: 💀💀🌪️",
      cor: "rgba(255, 255, 255, 1)",
      descricao: "Digamos que seu deck é algo lendário",
      cardFoco: "Foco principal em cartas lendarias.",
      hp: 100,
      maxHp: 100,
      energia: 3,
      escudo: 0,
      mao: 5,
      img: "./../img/jogo/player/lucius.gif",
      lor: "Ninguém sabe onde ele vive, por onde anda, ele vai trabalhar quando ele quer, pelo tempo que ele quer e até hoje se perguntam como ele não foi demitido. Se não fosse pelos seus feitos lendários ele provavelmente não estaria aqui, mas ninguém sabe se são verdade, mas tambem não discordam, afinal nenhum deles tem provas, mas seu irmão Jão é o único quem sabe a verdade e sabe por onde ele anda."
    },
    lilia: {
      nome: "🐼❄️LILIA, LÍDER DO GLACIAL PROTOCOL❄️🐼",
      dificuldade: "🐼❄️NÍVEL DE DIFICULDADE: 💀💀💀💀❄️🐼",
      cor: "rgba(255, 128, 251, 1)",
      descricao: "Ela sabe muito bem se adaptar a tudo, ela pode parecer fraca e indefesa como um panda, mas quando ela se adapta, ela mostra suas imensas garras, com uma força, vitalidade, energia e pensamento incrível ela possui um deck de gelo capaz de causar muito estrago se usado sob condições favoráveis, combe marcação para turbinar seu dano e defesa imensuráveis.",
      cardFoco: "Focada em cartas de gelo baratas com custo max.2, seus status aumentão ao decorrer das fases.",
      hp: "60",
      maxHp: "60",
      energia: "2",
      escudo: "0",
      mao: "4",
      img: "./../img/jogo/player/lilia.gif",
      lor: "Líder do GLACIAL PROTOCOL (GLA.P), dona de muitas lendas, ao mesmo tempo que sabem muito sobre ela também sabem tão pouco, há muitos rumores e histórias lendárias dela, uma grande estrategista, dizem que ela já foi capaz de apenas com mais 3 soldados do GLA.P derrubar um imenso batalhão de mais de 100mil robos corrompidos e destruir uma das principais bases da IA, também falam que ela sozinha já bateu de frente contra multiplos exercitos para salvar seu povo, verdade ou não, esse mitos ecoam por todos do GLA.P e até outros protocols já ouviram dela, ela é muito respeitada por todos, até Magnolia a lider do G.P a respeita muito[...], \"Será que é verdade que ela não precisa de um mecha?\""
    },
    glacia: {
      nome: "❄️GLACIA, VICE LÍDER DOS PESQUISADORES❄️",
      dificuldade: "❄️NÍVEL DE DIFICULDADE: 💀💀❄️",
      cor: "rgb(128, 240, 255)",
      descricao: "Focada em enfraquecer e marcar o inimigo, deck de gelo capaz de causar muito estrago se usado sob condições favoraveis, ela tem uma margem de visão tão boa e estratégia que sua mão raramente fica vazia, você sabera como gastar sua energia?",
      cardFoco: "Deck Focado em cartas de Gelo, extremamente forte sobe condições favoraveis",
      hp: 80,
      maxHp: 80,
      energia: 4,
      escudo: 0,
      mao: 8,
      img: "./../img/jogo/player/glacia.png",
      lor: "Vice líder do GLACIAL PROTOCOL, foi escolida a dedo pela propria Lilia, seus grandes marcos a fizeram chegar neste posto, grande estrátegista com conhecimento militar e tecnologico avançado, ja trabalhou com mecanica de mechas e foi ela quem ajudou a criar a \"Frost Abisal\", a arma favorita de Lilia, ela témbem auciliou na montage do hexoesqueleto de Lilia, o que a tornou seu braço direito e sua melhor amiga, na qual foi apelidada de Glacia, ela gostou tanto que se auto nomeou assim"
    },
    olaf: {
      nome: "❄️OLAF, O GUARDIÃO GELIDO❄️",
      dificuldade: "❄️NÍVEL DE DIFICULDADE: 💀💀💀❄️",
      cor: "rgb(128, 240, 255)",
      descricao: "Focado em usar o gelo como defesa, deck de gelo bem defensivo, porem fraco em atacar.",
      cardFoco: "Deck Focado em cartas de defesa de Gelo, bem defensivo e fraco no ataque.",
      hp: 150,
      maxHp: 150,
      energia: 3,
      escudo: 5,
      mao: 5,
      img: "./../img/jogo/player/olaf.png",
      lor: "Ele odeia os \"Friligeloz\", por isso ele resolveu entrar para o GLACIAL PROTOCOL. Após sua familia e seu povo serem exterminados por essas criaturas ele jurou vingança, apenas ele e Olga sobreviveram a esse dia, eles se aproximaram pela nescecidade, vasculharam o local inteiro e vagaram por dias em meio a uma nevasca mortal, com muita sorte foram encontratos por um grupo de patrulha da GLACIAL PROTOCOL, a lider do grupo Glacia os encontrou em estado critico e os levou até a base deles, após explicar quem são e o que os atacou, eles se uniram ao protocol, Olaf prometeu a Glacia que a protegeria com com sua vida já que ela os salvou, desde então ele se tornou o guarda pessoal da Glacia, não era bom nas pesquisas ja que o grupo era formado por cientistas e pesquisadores, mas quando precisavam da sua força, ele era o cara! Além de ser o encarregado de proteger o grupo."
    },
    olga: {
      nome: "❄️OLGA, A PESQUISADORA PRODIGIO❄️",
      dificuldade: "❄️NÍVEL DE DIFICULDADE: 💀💀💀❄️",
      cor: "rgb(128, 240, 255)",
      descricao: "Focada em causar muito dano de gelo, deck de gelo capaz de causar muito estrago se usado sob condições favoraveis, ela é bem fraca na defesa.",
      cardFoco: "Deck Focado em cartas de ataque de Gelo, bem ofensivo e fraco na defesa.",
      hp: 90,
      maxHp: 90,
      energia: 3,
      escudo: 0,
      mao: 6,
      img: "./../img/jogo/player/olga.png",
      lor: "Após um ataque dos \"Friligeloz\", o lugar onde ela morava foi completamente destruido, com muito medo ela foi obrigada a se esconder, com muita raiva e medo, ela queria apenas que aquele dia acabasse, até que após ver sua familia sem vida ela acabou desmaiando, e quando havia acordado ela estava sendo carregada por um rapaz no qual nem se quer ela conhecia, após muito tempo vagando eles foram se conhecendo, e juraram vingar todos que aquelas criaturas mataram, após uma nevasca mortal ambos se encontravam quase sem suprimentos, em meio a nevasca proximos da morte, até que um grupo da GLACIAL PROTOCOL apareceu e os resgatou. Esse dia ecoa em sua memoria até hoje, ela nunca foi capaz de esquecer o que havia escutado daquela criaturas \"Pragas eliminadas, processo de purificação do mundo em 65%\". Depois de muito tempo ela subiu de cargo graças as suas pesquisas inovadoras e acabou compartilhando essa frase para Glacia, na qual ambas chegaram a conclusão de que o erros dos \"outros\" seria problema delas agora!"
    },
    x: {
      nome: "🔮A ESQUECIDA🔮",
      dificuldade: "🔮NÍVEL DE DIFICULDADE: 💀💀💀💀🔮",
      cor: "rgb(0, 114, 129)",
      descricao: "Seu deck é... Assim como suas memórias... Sempre em neblina, seu deck é aleatório a cada partida",
      cardFoco: "Deck aleatório. Não possui foco em uma carta principal.",
      hp: 100,
      maxHp: 200,
      energia: 3,
      escudo: 2,
      mao: 4,
      img: "./../img/jogo/player/x.png",
      lor: "\"Em desenvolvimento?\""
    },
    tomoeh: {
      nome: "🩸TOMOEH, A SOMBRA🩸",
      dificuldade: "🩸NÍVEL DE DIFICULDADE: 💀💀💀🩸",
      cor: "rgb(255, 147, 250)",
      descricao: "Uma assassina ágil e mortal, porém frágil. Tente finalizar a batalha rapidamente antes que o pior aconteça...",
      cardFoco: "Deck focado em causar muito dano, principalmente se sua vida estiver baixa.",
      hp: 30,
      maxHp: 30,
      energia: 6,
      escudo: 0,
      mao: 9,
      img: "./../img/jogo/player/sombra.png",
      lor: "\"Em desenvolvimento\"[...]"
    },
    ferrus: {
      nome: "⚒️MAGNUS FERRUS, O PRODÍGIO⚒️",
      dificuldade: "⚒️NÍVEL DE DIFICULDADE: 💀💀⚒️",
      cor: "rgb(103, 67, 0)",
      descricao: "Deck focado em reciclagem, no início ele começa bem fraco mas com o tempo ele vai ganhando força conforme o tempo passa, quem diria que reciclar seria bom para todos os lados, por incrivel que pareça no meio do lixo ele achou... ouro? Ele inicia com 50🪙 ao inves de 0🪙, também possui um imenso guardião de sucata no qual luta por ele e o defende com tudo o que pode!",
      cardFoco: "Deck focado em múltiplas cartas de reciclagem.",
      hp: 32,
      maxHp: 160,
      energia: 3,
      escudo: 17,
      mao: 5,
      img: "./../img/jogo/player/sal2.gif",
      lor: "\"Em desenvolvimento\"[...]"
    },
    roxo: {
      nome: "⚙️VINICIUS, A INTERFACE CAÓTICA⚙️",
      dificuldade: "⚙️NÍVEL DE DIFICULDADE: 💀💀⚙️",
      cor: "rgb(141, 7, 231)",
      descricao: "Um engenheiro estratégico, utiliza de seus drones para tudo, saber como usar sua energia é algo vital.",
      cardFoco: "Deck de drones, muito forte contra multiplos inimigos porém fraco contra um alvo isolado.",
      hp: 60,
      maxHp: 60,
      energia: 5,
      escudo: 0,
      mao: 7,
      img: "./../img/jogo/player/cabaDosDrones.png",
      lor: "\"Em desenvolvimento\"[...]"
    },
      criadora: {
      nome: "🎨Mayumi, A criadoura caida🎨",
      dificuldade: "🎨NÍVEL DE DIFICULDADE: ☠️☠️☠️☠️☠️🎨",
      cor: "rgb(141, 7, 231)",
      descricao: "Uma pintora talentosa e uma arqueira nata, deck focado entroca de estilos e mistura de cores. Sua maior força também é sua maior fraqueza, Mayumi sofre de daltonismo, especificamente acromatopsia, um tipo extremamente raro, acredita-se que ela viveu no Período 600–1000 d.C. (período Asuka a Heian, Japão), não se sabe ao certo, será que isso lhe impede de ver o fim?",
      cardFoco: "Deck de cores, focado em troca de modos de combate e combo.",
      hp: 85,
      maxHp: 85,
      energia: 5,
      escudo: 0,
      mao: 6,
      img: "./../img/jogo/player/criadora.gif",
      lor: "Mayumi era uma artista extraordinária. Suas obras eram conhecidas por uma beleza quase sobrenatural, descritas por outros como repletas de cores vibrantes que encantavam todos que as contemplavam.<br><br>Mas havia uma verdade silenciosa — invisível para o mundo.<br><br>Mayumi era portadora de acromatopsia.<br><br>Ela nunca havia visto uma única cor em toda a sua vida.<br><br>Para ela, o mundo sempre existiu apenas em tons de cinza — sombras, luz e contraste. Nada além disso.<br><br>E ainda assim... ela pintava cores que nunca viu.<br><br>Desde jovem, serviu como artista e arqueira de elite para um governante regional de renome, guiando-se não por cor, mas por forma, movimento e intenção. Sua fama se espalhou, e ela era respeitada tanto pelo talento artístico quanto pela precisão mortal em combate.<br><br>Em busca de aperfeiçoamento, partiu em uma jornada que mudaria sua vida. Durante o caminho, encontrou um grupo budista devoto das cores e da percepção do mundo, permanecendo com eles por muitos anos, aprendendo, evoluindo... tentando compreender algo que, para ela, não existia.<br><br>Foi então que a verdade se tornou impossível de ignorar.<br><br>Enquanto falavam de vermelho, azul e dourado... Mayumi percebeu que nunca havia entendido o que essas palavras realmente significavam.<br><br>Não era falta de conhecimento.<br><br>Era ausência de experiência.<br><br>Mesmo assim, ela continuou criando. Continuou sonhando.<br><br>Certo dia, ouviu rumores sobre um elixir milagroso, capaz de conceder, ainda que por breves instantes, a visão das cores verdadeiras — algo impossível para alguém como ela.<br><br>Aquilo deixou de ser apenas um desejo.<br><br>Tornou-se obsessão.<br><br>Sua missão. Seu propósito. Sua fé.<br><br>Atravessou vales, sobreviveu a guerras, enfrentou a própria exaustão... mas nunca caiu.<br><br>Até que chegou a um majestoso palácio de luz, onde encontrou o Deus do Sol. Diante dele, fez seu pedido: desejava o elixir.<br><br>Desejava, ao menos uma vez na vida, ver aquilo que sempre pintou sem jamais conhecer.<br><br>O deus respondeu com desprezo. Disse possuir o elixir, mas jamais o entregaria a uma mortal tão determinada e “miserável”.<br><br>Sem hesitar, Mayumi o desafiou.<br><br>O duelo foi breve... e brutal. Em poucos minutos, seu corpo já não respondia, e a morte parecia inevitável. Ainda assim, com o último fio de voz, declarou:<br><br>“Se me deixar viver... eu viverei para te derrotar.”<br><br>Intrigado — talvez até entediado pela eternidade solitária — o Deus do Sol decidiu poupá-la.<br><br>E assim começou um ciclo.<br><br>Todos os meses, sem falhar, Mayumi retornava. Contava suas batalhas, suas derrotas, suas evoluções. E, a cada encontro, estava mais forte. Mais rápida. Mais determinada.<br><br>Até que, finalmente, a superou.<br><br>Diante dela, derrotado, o Deus do Sol sorriu e disse:<br><br>“Eu não poderia desejar uma oponente melhor.”<br><br>Então, finalmente, entregou-lhe o elixir. Mas havia um preço: seu efeito duraria apenas por instantes... e qualquer ferimento encerraria sua magia imediatamente.<br><br>Além disso, concedeu a ela uma dádiva — ou talvez uma maldição: imortalidade temporária. Mayumi não envelheceria, mas ainda poderia morrer em batalha. E quando reunisse todas as cores do mundo e consumisse o elixir... tudo chegaria ao fim.<br><br>Sem hesitar, ela aceitou.<br><br>Seu novo objetivo era claro: reunir todas as cores existentes — mesmo sem jamais tê-las visto.<br><br>Ela vagou por anos... décadas... até que o mundo começou a mudar.<br><br>Ao despertar de um longo sono, encontrou um futuro distópico, um mundo apagado. As cores estavam desaparecendo.<br><br>Foi então que descobriu a existência de uma IA, uma entidade que, pouco a pouco, estava drenando todas as cores do mundo — destruindo aquilo que ela passou a vida inteira tentando compreender.<br><br>Diante disso, Mayumi fez seu último juramento:<br><br>Ela destruiria a IA.<br><br>E, finalmente... veria as cores.",
      extras: [
  {
    img: "./../img/jogo/cards/cria/trocandoDeModo.png",
    titulo: "Acromatopsia",
    desc: "Mayumi é incapaz de ver cores de forma natural",
    cor: "red"
  },
  {
    img: "./../img/jogo/cards/cria/estiloCria.png",
    titulo: "Estilo Cria",
    desc: "Mayumi é capaz de alterna entre dois modos:<br> modo pincel e modo arco",
    cor: "yellow"
  },
  {
    img: "./../img/jogo/cards/cria/paleta.png",
    titulo: "Artista Magnifica",
    desc: "Ela possui a capacidade de ganhar e gastar cargas de tinta",
    cor: "yellow"
  }
]
    },
      cleopatra: {
      nome: "☀️Cleopatra VIII, A Reencarnação Divina☀️",
      dificuldade: "☀️NÍVEL DE DIFICULDADE: ☠️☠️☠️☠️☠️☀️",
      cor: "rgb(141, 7, 231)",
      descricao: "...",
      cardFoco: "...",
      hp: 100,
      maxHp: 100,
      energia: 5,
      escudo: 0,
      mao: 6,
      img: "./../img/jogo/player/animado/cleopatra/statico/cleopatra1.png",
      lor: "...",
      extras: [
  {
    img: "./../img/jogo/cards/desert/era.png",
    titulo: "Confusão",
    desc: "Todos os iconis de eventos são substituidos por ❓",
    cor: "red"
  },
  {
    img: "./../img/jogo/cards/desert/monarca.png",
    titulo: "Deusa Dos Deuses",
    desc: "Cleopatra pode invocar aliados para defender ela e atacar",
    cor: "lime"
  },
  {
    img: "./../img/jogo/cards/desert/cleo.png",
    titulo: "Sol e Lua",
    desc: "Cleopatra possui a capacidade de gerar cargas,<br>porém varias cartas de aliados nescecitam de cargas",
    cor: "yellow"
  }
]
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

    const extrasContainer = document.getElementById("extrasPersonagem");
extrasContainer.innerHTML = "";

// se NÃO tiver extras → esconde o bloco inteiro
if (!info.extras || info.extras.length === 0) {
  extrasContainer.style.display = "none";
  return;
}

// se tiver → mostra
extrasContainer.style.display = "flex";

// limita a no máximo 3 (segurança)
info.extras.slice(0, 3).forEach(extra => {
  const div = document.createElement("div");
  div.classList.add("extra-item");

  div.innerHTML = `
    <div class="img-wrap" style="border-color:${extra.cor}">
      <img src="${extra.img}">
      <span class="tooltip">${extra.desc}</span>
    </div>
    <span class="extra-title" style="color:${extra.cor}">
      ${extra.titulo}
    </span>
  `;

  extrasContainer.appendChild(div);
});
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
