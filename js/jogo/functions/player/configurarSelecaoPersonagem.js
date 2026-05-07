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
      lor: "\"Um cara é um humano mas também é um cara, e caras tem trabalho, caras que trabalham fazem muita coisa, e eu faço muita coisa, por isso eu sou o cara\". [...]<br><br> -Jão o cara",
      extras: [
        {
          img: "./../img/jogo/itens/peruEsterminador.png",
          titulo: "Óculos Supimpa",
          desc: "Inicia com o item \"Óculos Supimpa\".",
          cor: "lime"
        }
      ]
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
      lor: "Ex soldado da gaea, após achar um mecha de construção abandonado decidiu por conta propria ajudar, mesmo que aposentado e debilitado ele nunca deixou de acreditar em um futuro melhor [...] mas suas economias durante sua carreira podem ajudar com isso [...]",
      extras: [
        {
          img: "./../img/jogo/itens/criptoGaea.png",
          titulo: "Financiamento",
          desc: "Inicia com ouro adicional: 250🪙",
          cor: "lime"
        }
      ]
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
      img: "./../img/jogo/player/animado/gaeaReen/statico/gaeaReen1.png",
      lor: "[...]",
      extras: [
        {
          img: "./../img/jogo/cards/cintilante/gaea.png",
          titulo: "GÆA",
          desc: "Inicia com a carta \"Gaea Protocol\"",
          cor: "lime"
        },
        {
          img: "./../img/jogo/itens/peluciaDeGaea.png",
          titulo: "Pelucia",
          desc: "Inicia com o item \"Gaeazinha\"",
          cor: "lime"
        },
        {
          img: "./../img/jogo/itens/coroaDeGaea.png",
          titulo: "Coroada",
          desc: "Inicia com o item \"Coroa Da Gaea\"",
          cor: "lime"
        }
      ]
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
      img: "./../img/jogo/player/animado/bruno/statico/bruno1.png",
      lor: "Líder do GLEBA PROTOCOL, um ex-membro do GAEA, decidiu continuar cuidando do meio ambiente, então decidiu ir para o GLEBA e rapidamente se tornou o líder[...]",
      extras: [
        {
          img: "./../img/jogo/itens/sorteElemental.png",
          titulo: "Elementarista",
          desc: "Inicia com o item \"Sorte Elemental\".",
          cor: "lime"
        }
      ]
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
      img: "./../img/jogo/player/animado/porto/statico/porto1.png",
      lor: "Assim como seu pai ela assumiu o manto de autoridade do porto, aprendeu bem com seu velho estratégias muito boas de ataque a distância, mas ela se apaixonou pelo mar assim como sua mãe. [...]",
      extras: [
        {
          img: "./../img/jogo/itens/sorteElemental.png",
          titulo: "Elementarista",
          desc: "Inicia com o item \"Sorte Elemental\".",
          cor: "lime"
        }
      ]
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
      img: "./../img/jogo/player/animado/gabriel/statico/gabriel1.png",
      lor: "Salva animais com velocidade e precisão de situações inesperadas, combate à caça e ao tráfico animal.",
      extras: [
        {
          img: "./../img/jogo/itens/olhoKraken.png",
          titulo: "Alto Dano",
          desc: "Inicia com o item \"Olho Do Kraken\".",
          cor: "lime"
        }
      ]
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
      lor: "Um homem de sorte? Não, a sorte que precisa desse homem, além da sua compulção por comprar ele curte apostar, um belo exemplo do tipo de pessoa que tem tudo para perder suas economias... Bom era para ele perder, mas aparentemente ele tem menos chance de perder? Ele não é um \"apostador qualquer\" ele utiliza de muita estrategia para ganhar dinheiro, ele percebeu que para sustentar seu vicio em comprar ele precisaria ser rico, e um mero trabalho jamais daria o dinheiro que ele precisa, além de CLT, dono de multiplas empresas, investidor de risco e mestre do poker, ele é um apostador nato, ele fez tudo isso só para... comprar coisas inuteis que ele nunca vai usar?",
      extras: [
        {
          img: "./../img/jogo/cards/cintilante/niquel.png",
          titulo: "Pessoa De Sorte",
          desc: "Seu deck é formado por cartas de spawn e sorte.",
          cor: "yellow"
        }
      ]
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
      img: "./../img/jogo/player/animado/lucius/statico/lucius1.png",
      lor: "Ninguém sabe onde ele vive, por onde anda, ele vai trabalhar quando ele quer, pelo tempo que ele quer e até hoje se perguntam como ele não foi demitido. Se não fosse pelos seus feitos lendários ele provavelmente não estaria aqui, mas ninguém sabe se são verdade, mas tambem não discordam, afinal nenhum deles tem provas, mas seu irmão Jão é o único quem sabe a verdade e sabe por onde ele anda.",
      extras: [
        {
          img: "./../img/jogo/itens/albumMagico.png",
          titulo: "Legendary",
          desc: "Seu deck é formado por cartas Lendaria",
          cor: "yellow"
        }
      ]
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
      img: "./../img/jogo/player/animado/lilia/statico/lilia1.png",
      lor: "Líder do GLACIAL PROTOCOL (GLA.P), dona de muitas lendas, ao mesmo tempo que sabem muito sobre ela também sabem tão pouco, há muitos rumores e histórias lendárias dela, uma grande estrategista, dizem que ela já foi capaz de apenas com mais 3 soldados do GLA.P derrubar um imenso batalhão de mais de 100mil robos corrompidos e destruir uma das principais bases da IA, também falam que ela sozinha já bateu de frente contra multiplos exercitos para salvar seu povo, verdade ou não, esse mitos ecoam por todos do GLA.P e até outros protocols já ouviram dela, ela é muito respeitada por todos, até Magnolia a lider do G.P a respeita muito[...], \"Será que é verdade que ela não precisa de um mecha?\"",
      extras: [
        {
          img: "./../img/jogo/passivas/fria.png",
          titulo: "Fria Como A Neve",
          desc: "Seu deck é formado por cartas de Gelo",
          cor: "yellow"
        },
        {
          img: "./../img/jogo/passivas/adaptacao.png",
          titulo: "Adaptação",
          desc: "Conforme Lilia avaça pelas fasses ela fica mais forte e ganha \"ALL STATS UP\" (❤️⬆️/🛡️⬆️/🤚⬆️/🔷⬆️)",
          cor: "lime"
        },
        {
          img: "./../img/jogo/itens/sorteElemental.png",
          titulo: "Elementarista",
          desc: "Inicia com o item \"Sorte Elemental\".",
          cor: "lime"
        }
      ]
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
      lor: "\"Em desenvolvimento?\"",
      extras: [
        {
          img: "./../img/jogo/cards/atk/fraqueza.png",
          titulo: "Coração Fraco",
          desc: "Inicia com 1/2 da sua vida maxima.",
          cor: "red"
        },
        {
          img: "./../img/jogo/passivas/aminesia.png",
          titulo: "Neblina",
          desc: "Seu deck é gerado aleatoriamente a cada nova partida",
          cor: "red"
        }
      ]
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
      img: "./../img/jogo/player/animado/ferrus/statico/ferrus1.png",
      lor: "\"Em desenvolvimento\"[...]",
      extras: [
        {
          img: "./../img/jogo/cards/atk/fraqueza.png",
          titulo: "Coração Fraco",
          desc: "Inicia com 1/4 da sua vida maxima.",
          cor: "red"
        },
        {
          img: "./../img/jogo/passivas/ferrus11.png",
          titulo: "Gigante De Ferro",
          desc: "Magnus possui um mecha protetor.<br>Ele tem uma armadura inicial bem alta devido ao seu guardião.",
          cor: "lime"
        },
        {
          img: "./../img/jogo/itens/criptoGaea.png",
          titulo: "Financiamento",
          desc: "Inicia com ouro adicional: 50🪙",
          cor: "lime"
        }
      ]
    },
    criadora: {
      nome: "🎨Mayumi, A Criadora Limitada🎨",
      dificuldade: "🎨NÍVEL DE DIFICULDADE: ☠️☠️☠️☠️☠️🎨",
      cor: "rgb(141, 7, 231)",
      descricao: "Uma pintora talentosa e uma arqueira nata, deck focado em trocar de estilos e mistura de cores. Sua maior força também é sua maior fraqueza, Mayumi sofre de daltonismo, especificamente acromatopsia, um tipo extremamente raro, acredita-se que ela viveu no Período 600–1000 d.C. (período Asuka a Heian, Japão), não se sabe ao certo, será que isso lhe impede de ver o fim?",
      cardFoco: "Deck de cores, focado em troca de modos de combate e combo.",
      hp: 85,
      maxHp: 85,
      energia: 5,
      escudo: 0,
      mao: 6,
      img: "./../img/jogo/player/animado/criadora/statico/criadora1.png",
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
      nome: "☀️Cleopatra VIII, A Criadora Incompreendida☀️",
      dificuldade: "☀️NÍVEL DE DIFICULDADE: ☠️☠️☠️☠️☠️☀️",
      cor: "rgb(141, 7, 231)",
      descricao: "Seu nome original era Aparna, mas após um ocorrido que ela diz ser a \"escolhida\", ela se auto intitulou Cleopatra VIII, e recebe ajuda dos deuses antigos do egito para ajudar ela em sua jornada, sendo capaz de os invocar e até entrar em estado divino para lutar.",
      cardFoco: "Deck focado em spawn de aliados, buff de aliados e geração de cargas.",
      hp: 100,
      maxHp: 100,
      energia: 5,
      escudo: 0,
      mao: 6,
      img: "./../img/jogo/player/animado/cleopatra/statico/cleopatra1.png",
      lor: "Aparna sempre foi apaixonada por animes. Seu maior sonho? Viajar entre realidades, provar comidas impossíveis… e, por algum motivo, dirigir um caminhão.<br><br>Mas sonhos curiosos costumam levar a caminhos perigosos.<br><br>Em um dia aparentemente comum, ela decidiu explorar uma área da cidade que sua família sempre proibiu — um lugar abandonado, esquecido… e temido. A curiosidade falou mais alto.<br><br>Dois minutos.<br>Foi o tempo que levou para tudo dar errado.<br><br>Ela foi cercada.<br>Homens desconhecidos, olhares frios, intenções claras.<br><br>Aparna correu.<br>Desviou.<br>Lutou como pôde.<br><br>Mas não saiu ilesa.<br>Um corte profundo rasgou sua pele, e o sangue começou a escorrer sem parar.<br><br>Com a visão ficando turva, ela encontrou refúgio em uma fábrica abandonada.<br>Ou pelo menos… era o que parecia.<br><br>Lá dentro, havia pessoas.<br>Cientistas.<br>Guardas.<br>E um símbolo… o mesmo dos homens que a perseguiam.<br><br>Ela se escondeu e escutou.<br><br>Eles falavam sobre algo impossível.<br>Sobre trazer de volta uma divindade…<br>Em um corpo robótico.<br><br>Assim como haviam feito com uma IA.<br><br>Mesmo fraca, sangrando, quase desmaiando… Aparna queria ver mais.<br><br>Subiu pelas vigas enferrujadas no topo da fábrica.<br>Cada movimento era dor.<br>Cada segundo, um risco.<br><br>E então… ela viu.<br><br>Um corpo metálico…<br>Majestoso…<br>Imponente…<br><br>Sem dúvidas… inspirado em Cleopatra VII.<br><br>Aparna ficou fascinada.<br><br>Até que…<br>Uma gota de sangue caiu.<br><br>Direto na cabeça de um dos guardas.<br><br>Silêncio.<br><br>— Ela está ali!<br><br>Tudo aconteceu rápido.<br>Os cientistas entraram em desespero.<br>A máquina precisava ser ativada imediatamente.<br>Uma tempestade de raios rugia do lado de fora.<br><br>Os guardas começaram a subir.<br><br>Aparna… não aguentava mais.<br><br>A perda de sangue venceu.<br><br>E ela caiu.<br><br>Direto… sobre o corpo da divindade mecânica.<br><br>Escuridão.<br><br>...<br><br>Quando abriu os olhos…<br>o mundo havia mudado.<br><br>A fábrica estava destruída.<br>Reduzida a cinzas.<br><br>E então…<br>ela ouviu uma voz.<br><br>— Aparna...<br><br>— Quem está aí?! Eu não tenho medo!<br><br>— Cleopatra VII. Eu escolhi você… como minha herdeira espiritual.<br><br>— ...o quê?<br><br>— Seu sacrifício foi belo. Você entregou sua vida tentando me trazer de volta a este mundo.<br><br>— Ah… claro… era exatamente isso que eu tava fazendo...<br><br>— Eu sei que estava. E por isso… concedo a você meus poderes… e o auxílio dos deuses do Egito, para erguer novamente nosso glorioso império.<br><br>— Tá… mas… que poderes são esses?<br><br>— Muitos. Eles variam… de Cleopatra para Cleopatra.<br><br>Aparna, em pensamento, só conseguia repetir:<br>'por favor que seja um stand… por favor que seja um stand…'<br><br>— Você precisará descobrir sozinha como usá-los…<br>Mas pode invocar os deuses… sempre que precisar.<br><br>Com um leve deboche, Aparna responde:<br><br>— Ah claro… então Anubis, aparece aí pra gente trocar uma ideia.<br><br>Das cinzas…<br>algo surgiu.<br><br>Um robô.<br>Com a forma de Anubis.<br><br>— Aqui estou, Vizir.<br><br>Aparna ficou em choque.<br><br>— Ué… então os deuses são robôs?!<br><br>— Somos seres divinos… incompreendidos por sua visão limitada.<br><br>— ...ah…<br><br>— Assumi a forma que seu coração desejava.<br><br>O silêncio durou um segundo.<br><br>Então…<br>Aparna começou a pular de alegria.<br><br>Ela caiu de joelhos.<br>Agradeceu.<br><br>— Eu vou honrar isso… eu juro!<br><br>Decidiu naquele momento:<br>Seu nome também seria Cleopatra.<br><br>Não apenas como homenagem…<br>Mas como renascimento.<br><br>E assim…<br>ela partiu em sua jornada.<br><br>Para descobrir seus poderes.<br>Seu destino.<br><br>E talvez…<br>finalmente…<br>viajar entre dimensões.",
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
    },
    agatha: {
      nome: "🎵Agatha, A Criadora Oprimida🎵",
      dificuldade: "🎵NÍVEL DE DIFICULDADE: ☠️☠️☠️☠️☠️🎵",
      cor: "rgb(141, 7, 231)",
      descricao: "[...]",
      cardFoco: "[...]",
      hp: 60,
      maxHp: 60,
      energia: 4,
      escudo: 0,
      mao: 8,
      img: "./../img/jogo/player/animado/agatha/agathaDefalt.png",
      lor: `Agatha, quando era mais nova, era uma garota cheia de vida. Seu sorriso parecia aquecer qualquer ambiente, e seus olhos brilhavam sempre que falava sobre música.<br><br>
Nascida no Japão, ela cresceu sonhando em se tornar cantora. Passava horas ouvindo canções antigas, imaginando-se em um palco iluminado enquanto o mundo inteiro escutava sua voz.<br><br>
Mas seus pais nunca enxergaram aquilo como um sonho.<br><br>
Sua mãe era uma renomada advogada.<br>
Seu pai, um neurocirurgião respeitado internacionalmente.<br><br>
Para eles, música era apenas uma fantasia infantil, algo incapaz de sustentar um futuro.<br><br>
— Nós sabemos o que é melhor para você.<br><br>
Essa frase acompanhou Agatha durante anos.<br><br>
No começo, ela tentou resistir. Discutiu, chorou, implorou. Mas, pouco a pouco, sua voz foi se apagando dentro da própria casa. No fim, cedeu.<br><br>
Entrou para a faculdade de medicina.<br><br>
Mesmo sem amar aquilo, era brilhante.<br>
Uma aluna impecável.<br>
Fria, precisa e absurdamente inteligente.<br><br>
Enquanto seus colegas comemoravam festas, paixões e sonhos, Agatha apenas observava. Invejava a liberdade deles. Invejava pessoas que podiam seguir o próprio coração sem culpa.<br><br>
Tentou desabafar algumas vezes, mas nunca era compreendida.<br><br>
— Por que você está reclamando?<br>
— Você tem tudo.<br>
— Seus pais são influentes.<br>
— Seu futuro já está garantido.<br><br>
Então ela começou a se perguntar se talvez estivesse errada.<br><br>
“Será que eu sou ingrata?”<br>
“Será que meus sonhos realmente não têm valor?”<br>
“Talvez felicidade seja apenas um luxo para algumas pessoas...”<br><br>
Depois de anos refletindo, Agatha matou seus próprios sonhos.<br><br>
E foi naquele momento que algo dentro dela morreu também.<br><br>
O sorriso caloroso desapareceu.<br>
Seu olhar tornou-se distante.<br>
Vazio.<br><br>
Os pais perceberam a mudança, mas acreditavam que era apenas cansaço pelos estudos.<br><br>
Eles nunca perceberam que a filha alegre que conheciam havia desaparecido havia muito tempo.<br><br>
Agatha viveu durante anos como a sombra de alguém que nunca quis ser.<br><br>
Formou-se em medicina.<br>
Não apenas isso.<br><br>
Tornou-se a melhor médica de sua área.<br><br>
Pessoas influentes, milionários e até líderes políticos viajavam quilômetros apenas para serem tratados por ela. Seu nome começou a circular pelo mundo como uma lenda.<br><br>
Ela realizou mais de vinte cirurgias impossíveis.<br>
Todas terminaram com os pacientes vivos.<br><br>
Casos que até médicos experientes desistiam de operar eram entregues às mãos dela.<br><br>
Quando Agatha entrava em uma sala cirúrgica, era como se a própria morte recuasse alguns passos.<br><br>
Foi então que começaram a chamá-la de:<br><br>
“O Anjo da Medicina.”<br><br>
Até seu pai, um homem incapaz de demonstrar sentimentos facilmente, admitiu:<br><br>
— Você é a melhor médica que já conheci.<br>
— Tenho orgulho de você.<br><br>
Mas aquelas palavras chegaram tarde demais.<br><br>
Para Agatha, soavam ocas.<br>
Sem peso.<br>
Sem calor.<br><br>
Como aplausos em um teatro vazio.<br><br>
Certo dia, ela viajou para o Brasil, terra natal de sua mãe.<br><br>
Um dos homens mais ricos e influentes do país precisava urgentemente de uma cirurgia extremamente arriscada: um aneurisma cerebral múltiplo de ruptura iminente, combinado com uma hemorragia profunda no tronco encefálico.<br><br>
As chances de sobrevivência eram inferiores a 3%.<br><br>
Muitos médicos consideravam a operação impossível.<br>
Outros sequer aceitavam tentar.<br><br>
O homem já havia aceitado a morte... até ouvir falar do “Anjo da Medicina”.<br><br>
Naquele instante, algo dentro dele reacendeu.<br><br>
— Se alguém pode me salvar... é ela.<br><br>
Seu estado era tão grave que uma viagem até o Japão poderia matá-lo no caminho. Então enviaram um pedido urgente para Agatha.<br><br>
— Não importa quanto custe.<br>
— Quero que seja ela.<br><br>
A notícia se espalhou rapidamente pelo hospital onde Agatha trabalhava. Corredores inteiros foram tomados por sussurros.<br><br>
“Dessa vez ela não consegue.”<br>
“Nem ela pode fazer milagres.”<br><br>
Mas aqueles que já haviam trabalhado ao lado dela apenas permaneceram em silêncio.<br><br>
Eles sabiam.<br><br>
Agatha não aceitava perder pacientes.<br><br>
Com o peso de seu juramento nos ombros, ela partiu para o Brasil no jatinho pessoal do homem.<br><br>
Foi recebida calorosamente pelos funcionários da mansão e, logo depois, levada ao hospital.<br><br>
Ao entrar no quarto, encontrou um homem extremamente debilitado, respirando com dificuldade, já convencido de que morreria.<br><br>
Médicos renomados observavam Agatha com descrença.<br><br>
Então ela disse, com uma calma assustadora:<br><br>
— Eu posso salvá-lo.<br>
— E eu vou salvá-lo.<br><br>
A cirurgia começou.<br><br>
Horas se passaram.<br>
Depois mais horas.<br><br>
Do lado de fora, familiares, empresários e especialistas aguardavam em absoluto nervosismo.<br><br>
Cada minuto aumentava a sensação de fracasso iminente.<br><br>
Até que, no meio dos sussurros, a porta da sala cirúrgica se abriu.<br><br>
Agatha surgiu coberta pelo cansaço.<br>
Seu olhar parecia frio o suficiente para congelar o ambiente inteiro.<br><br>
Então disse:<br><br>
— Em uma sala de cirurgia, falhar é o mesmo que assassinar alguém.<br>
— E eu não sou uma assassina.<br><br>
O homem estava vivo.<br><br>
Fraco.<br>
Quase irreconhecível.<br>
Mas vivo.<br><br>
Meses depois, ele recebeu alta completamente recuperado.<br><br>
Os médicos ficaram chocados ao ver alguém que estava à beira da morte voltar a caminhar normalmente.<br><br>
Em homenagem àquela conquista impossível, foi organizada uma festa luxuosa, repleta de pessoas influentes, artistas, empresários e figuras importantes.<br><br>
A convidada principal era Agatha.<br><br>
Mas, no meio da celebração, ela simplesmente saiu.<br><br>
Sozinha.<br><br>
Debaixo da chuva.<br><br>
Ficou parada em silêncio enquanto a água escorria pelo rosto como lágrimas que ela já não conseguia esconder.<br><br>
Então olhou para o céu e pensou:<br><br>
“Era isso?”<br>
“Era esse o melhor futuro para mim?”<br><br>
Porque, no fundo, seus sonhos nunca desapareceram.<br><br>
Eles apenas continuavam vivos em algum lugar doloroso dentro dela.<br><br>
Enquanto caminhava sem direção pelas ruas molhadas, Agatha avistou uma pequena escola de música iluminada no meio da noite.<br><br>
Ela hesitou por apenas um segundo.<br><br>
E entrou.<br><br>
Lá dentro, encontrou um velho senhor ensinando sua sobrinha a cantar.<br><br>
Agatha ficou parada observando em silêncio.<br><br>
As lágrimas escorriam sem que ela percebesse.<br><br>
O homem então olhou para ela e perguntou suavemente:<br><br>
— O que a traz aqui tão tarde?<br><br>
— E-eu... não sei...<br>
— Talvez meu coração...<br><br>
O velho sorriu de forma serena.<br><br>
— Seu coração sabe mais sobre você do que você mesma.<br><br>
— Isso faz sentido?<br><br>
— Sim, querida.<br>
— O coração entende aquilo que nos faz viver.<br>
— Nem sempre o que parece certo é aquilo que nos salva.<br>
— De que adianta existir sem felicidade?<br>
— Isso não é viver.<br><br>
— O senhor é professor de música?<br><br>
— Já fui.<br>
— Hoje sou apenas um velho apaixonado por canções.<br><br>
Agatha abaixou o olhar antes de perguntar:<br><br>
— Poderia me ensinar a cantar...?<br>
— Nem que seja só um pouco...<br>
— Eu posso pagar.<br><br>
O homem apenas riu baixinho.<br><br>
— Não precisa.<br>
— Apenas tire essa roupa molhada antes de ficar doente.<br><br>
E naquela pequena sala simples, longe dos hospitais luxuosos e dos aplausos vazios, Agatha viveu o momento mais feliz de toda sua vida.<br><br>
Foram apenas algumas horas.<br><br>
Mas, pela primeira vez em muitos anos, ela voltou a sorrir de verdade.<br><br>
Ao sair da escola de música, olhou para o céu escuro enquanto a chuva diminuía lentamente.<br><br>
Então pensou:<br><br>
“Não existe sentido em possuir tudo... se você nunca puder descobrir até onde o céu alcança.”<br><br>
Agatha não abandonou a medicina.<br><br>
Não porque amasse aquilo.<br><br>
Mas porque entendia o significado que seu nome carregava para outras pessoas.<br><br>
Esperança.<br><br>
Então decidiu unir as duas coisas.<br><br>
Música e medicina.<br><br>
Ela começou a estudar novamente.<br><br>
Mas, dessa vez...<br><br>
Com um sorriso verdadeiro no rosto.`,
      extras: [
        {
          img: "./../img/jogo/passivas/fervor.png",
          titulo: "Fervor",
          desc: "A barra de Fervor quando cheia coloca a personagem em estado de Fervor (Lar/Trauma).<br>Errar as notas tira pontos de Fervor, zerar a barra remove o Fervor.<br><br>Esse estado se mantem até o proximo \"Palco\" independente de qual seja.<br>Caso desativado e reativado no mesmo \"Palco\" ele volta para o Fervor que estava e não o novo,<br> só entre em um novo Fervor caso o personagem sai do \"Palco\" sem nenhum Fervor ativo.",
          cor: "lime"
        },
        {
          img: "./../img/jogo/passivas/palco.png",
          titulo: "Palco",
          desc: "Invoque um Palco no qual cai notas com as teclas: A S D F. <br>Abrir um Palco coloca seu Fervor em 0 mas não tira o estado de Fervor. <br>(Caso erre as primeira nota, Agatha sai do Fervor)<br> Acertar notas proporciona pontos para a ação, e pontos de Fervor.<br>Perfect: +2<br>Good: +1<br>Miss: -2<br><br>Fervor Lar: Aumenta a quantidade de pontos em x2 enquanto estiver nesse estado. Aumente a velocidade<br>das notas em 25%.<br><br>Fervor Trauma: Aumenta a quantidade de pontos em x4. Aumenta a velocidade das notas 50%, errar causa<br>um dano forte direto a vida podendo ser LETAL (-50❤️).",
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
