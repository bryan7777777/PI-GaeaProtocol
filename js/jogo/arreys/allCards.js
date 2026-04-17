const allCards = [
  {
    name: "GÆPROTOCOL",
    cost: 3,
    basePower: 10,
    rarity: "cintilante",
    img: "../img/jogo/cards/cintilante/gaea.png",
    desc: "Recicla lixo. Ganhe vida, defesa e cause dano em 10 por cada carta de lixo reciclada.",
    type: "cintilante"
  },
  {
    name: "Guardião",
    cost: 0,
    basePower: 30,
    rarity: "cintilante",
    img: "../img/jogo/cards/cintilante/guardiao.png",
    desc: "Ganhe 1 de energia, se sua vida for 30 ou menos ganhe 30 de escudo e +1 de energia",
    type: "cintilante"
  },
  {
    name: "Armamento Pesado",
    cost: 2,
    basePower: 0,
    rarity: "cintilante",
    img: "../img/jogo/cards/cintilante/armamentoForte.jpg",
    desc: "Compre <strong>Impacto Bruto</strong>, <strong>Ataque</strong> e <strong>Rajada Dupla</strong> com custo 0 se sua mão for 3 ou menos",
    type: "cintilante"
  },
  {
    name: "Ecosistema Preservado",
    cost: 3,
    basePower: 0,
    rarity: "cintilante",
    img: "../img/jogo/cards/cintilante/ecosistema.png",
    desc: "Compre <strong>GÆPROTOCOL</strong>, <strong>Recicladora</strong> e <strong>Essencia Verde</strong> com custo 0 se sua mão for 3 ou menos",
    type: "cintilante"
  },
  {
    name: "Chuva de Laminas",
    cost: 0,
    basePower: 5,
    rarity: "cintilante",
    img: "../img/jogo/cards/cintilante/chuvaDeLaminas.jpg",
    desc: "Cause dano em area 5/10/15/20/30/40, e gaste energia respectivamente  0/1/2/3/4/5",
    type: "cintilante"
  },
  {
    name: "Royal Flush",
    cost: 4,
    basePower: 10,
    rarity: "cintilante",
    img: "../img/jogo/cards/cintilante/joker.png",
    desc: "FASE 1 FIX: Custo reduzido de 7 para 4 (menos arriscado). Descartar mão, comprar 8 aleatórias.",
    type: "cintilante"
  },
  {
    name: "Carga Divina",
    cost: 0,
    basePower: 20,
    rarity: "cintilante",
    img: "../img/jogo/cards/cintilante/cargaDivina.png",
    desc: "Sua proxima carta nessa batalha tem mais 20 pontos de ação: ataque, defesa ou cura (apenas 1).",
    type: "cintilante"
  },
  {
    name: "Tudo Ou Nada",
    cost: 3,
    basePower: 1,
    rarity: "cintilante",
    img: "../img/jogo/cards/cintilante/niquel.png",
    desc: "Seta sua energia e compra cartas aleatórias entre 1-10. Tem 5% de chance de te causar 50🔱 de dano (não letal) e zerar sua mão",
    type: "cintilante"
  },
  // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  {
    name: "Combustão",
    cost: 0,
    basePower: 0,
    rarity: "fire",
    img: "../img/jogo/cards/fire/combustao.png",
    desc: "Marca o inimigo com 🔥",
    type: "fire"
  },
  {
    name: "Chuva De Fogo",
    cost: 1,
    basePower: 0,
    rarity: "fire",
    img: "../img/jogo/cards/fire/chuvaDeFogo.png",
    desc: "Marca todos os inimigos com 🔥",
    type: "fire"
  },
  {
    name: "Explosão Termica",
    cost: 2,
    basePower: 12,
    rarity: "fire",
    img: "../img/jogo/cards/fire/explosaoCalor.png",
    desc: "Cause 10 de dano ao inimigo, se ele estiver marcado com 🔥 X2 ou ⛰️ X3 o dano",
    type: "fire"
  },
  {
    name: "Ataque De Fogo",
    cost: 1,
    basePower: 6,
    rarity: "fire",
    img: "../img/jogo/cards/fire/atkFogo.png",
    desc: "Cause 6 de dano ao inimigo, se ele estiver marcado com 🔥 X2 ou ⛰️ X3 o dano",
    type: "fire"
  },
  {
    name: "Lança Chamas",
    cost: 2,
    basePower: 6,
    rarity: "fire",
    img: "../img/jogo/cards/fire/lancaChamas.png",
    desc: "Cause 6 de dano a todos os inimigos e marca com 🔥, se ele estiver marcado com 🔥 X2 ou ⛰️ X3 o dano",
    type: "fire"
  },
  {
    name: "Cauterizar",
    cost: 3,
    basePower: 20,
    rarity: "fire",
    img: "../img/jogo/cards/fire/cauterizar.png",
    desc: "Cause 20 de dano ao inimigo e marca com 🔥, se ele estiver marcado com 🔥 X2 o dano",
    type: "fire"
  },
  {
    name: "Vida Na Morte",
    cost: 2,
    basePower: 10,
    rarity: "fire",
    img: "../img/jogo/cards/fire/cinzas.jpg",
    desc: "Cure 10 de vida mais 4% de todo o lixo reciclado ♻️ por inimigos marcados com 🔥",
    type: "fire"
  },
  {
    name: "Cataclisma",
    cost: 3,
    basePower: 20,
    rarity: "fire",
    img: "../img/jogo/cards/fire/anelFogo.jpg",
    desc: "Cause 20 de dano mais 20% de todo o dinheiro 🪙",
    type: "fire"
  },
  {
    name: "Fenix",
    cost: 3,
    basePower: 10,
    rarity: "fire",
    img: "../img/jogo/cards/fire/fenix.jpg",
    desc: "Cure e ganhe escudo em 10 para cada inimigo marcado com 🔥, marca todos com 🔥",
    type: "fire"
  },
  // ⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️
  {
    name: "Soterrar",
    cost: 0,
    basePower: 0,
    rarity: "terra",
    img: "../img/jogo/cards/terra/soterra.jpg",
    desc: "Marca o inimigo com ⛰️",
    type: "terra"
  },
  {
    name: "Arma Ancestral",
    cost: 1,
    basePower: 8,
    rarity: "terra",
    img: "../img/jogo/cards/terra/atkTerra.jpg",
    desc: "Cause 8 de dano ao inimigo, se ele estiver marcado com 💧 cause X3",
    type: "terra"
  },
  {
    name: "Brutalidade Da Terra",
    cost: 1,
    basePower: 12,
    rarity: "terra",
    img: "../img/jogo/cards/terra/atkForte.jpg",
    desc: "Cause 12 de dano ao inimigo, se ele estiver marcado com ⛰️ cause X2",
    type: "terra"
  },
  {
    name: "Força De Gaea",
    cost: 2,
    basePower: 10,
    rarity: "terra",
    img: "../img/jogo/cards/terra/atkBrutoTerra.jpg",
    desc: "Cause 10 de dano mais 10% de todo o lixo reciclado ♻️ ao inimigo, se ele estiver marcado com ⛰️ cause X2",
    type: "terra"
  },
  {
    name: "Escudo De Gaea",
    cost: 1,
    basePower: 6,
    rarity: "terra",
    img: "../img/jogo/cards/terra/escudoTerra.jpg",
    desc: "Ganhe 6 de escudo por cada carta do tipo EARTH e WATHER na mão mais 20% de todo o lixo reciclado ♻️",
    type: "terra"
  },
  {
    name: "Coração De Gaea",
    cost: 1,
    basePower: 2,
    rarity: "terra",
    img: "../img/jogo/cards/terra/vidaTerra.jpg",
    desc: "Ganhe 2 de vida por cada carta do tipo EARTH e WATHER na mão mais 10% de todo o lixo reciclado ♻️",
    type: "terra"
  },
  {
    name: "Tudo Virá Terra",
    cost: 3,
    basePower: 30,
    rarity: "terra",
    img: "../img/jogo/cards/terra/entulhoTerra.jpg",
    desc: "Cause 30 de dano mais 50% de todo o lixo reciclado♻️ ao inimigo se ele estiver marcado com ⛰️",
    type: "terra"
  },
  {
    name: "Chuva Rochosa",
    cost: 1,
    basePower: 5,
    rarity: "terra",
    img: "../img/jogo/cards/terra/chuvaTerra.jpg",
    desc: "Cause 5 de dano a todos os inimigos e marca com ⛰️, se ele estiver marcado com ⛰️ X2 ou 💧 X3 o dano",
    type: "terra"
  },
  {
    name: "Deslizamento",
    cost: 1,
    basePower: 0,
    rarity: "terra",
    img: "../img/jogo/cards/terra/deslizamento.jpg",
    desc: "Marca todos os inimigos com ⛰️",
    type: "terra"
  },
  // 💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧
  {
    name: "Jato De Água",
    cost: 0,
    basePower: 0,
    rarity: "agua",
    img: "../img/jogo/cards/agua/jatoAgua.png",
    desc: "Marca o inimigo com 💧",
    type: "agua"
  },
  {
    name: "Chuva Isolante",
    cost: 1,
    basePower: 8,
    rarity: "agua",
    img: "../img/jogo/cards/agua/chuva.png",
    desc: "Marca os inimigos com 💧, se eles estiverem marcados com 🔥 cause 8 de dano",
    type: "agua"
  },
  {
    name: "Chuva Controlada",
    cost: 2,
    basePower: 12,
    rarity: "agua",
    img: "../img/jogo/cards/agua/chuvaDensa.png",
    desc: "Causa 12 de dano a inimigos marcados com 🔥",
    type: "agua"
  },
  {
    name: "Chuva Corrosiva",
    cost: 3,
    basePower: 22,
    rarity: "agua",
    img: "../img/jogo/cards/agua/chuvaCorrosiva.png",
    desc: "Marca os inimigos com 💧, se eles estiverem marcados com 💧 cause 22 de dano",
    type: "agua"
  },
  {
    name: "Corrosão",
    cost: 3,
    basePower: 42,
    rarity: "agua",
    img: "../img/jogo/cards/agua/corrosao.png",
    desc: "Marca o inimigo com 💧, se ele estiver marcado com 💧 cause 42 de dano",
    type: "agua"
  },
  {
    name: "Mar Denso",
    cost: 0,
    basePower: 0,
    rarity: "agua",
    img: "../img/jogo/cards/agua/afogado.png",
    desc: "Marca todos os inimigos com 💧",
    type: "agua"
  },
  {
    name: "Inicio Da Água",
    cost: 1,
    basePower: 6,
    rarity: "agua",
    img: "../img/jogo/cards/agua/arco.png",
    desc: "Cause 6 de dano, mais 5% de todo o lixo reciclado ♻️ por cada inimigo marcado com 💧",
    type: "agua"
  },
  {
    name: "Alma Do Mar.1",
    cost: 1,
    basePower: 5,
    rarity: "agua",
    img: "../img/jogo/cards/agua/baleia.jpg",
    desc: "Cause 5 de dano. FASE 1 FIX: Máximo 5 usos por batalha (+1 dano permanente por uso = +5 total).",
    maxUsesPerBattle: 5,
    usesThisBattle: 0,
    type: "agua"
  },
  {
    name: "Alma Do Mar.2",
    cost: 3,
    basePower: 10,
    rarity: "agua",
    img: "../img/jogo/cards/agua/abisal.jpg",
    desc: "Cause 10 de dano para cada carta de WATER 💧 na sua mão (essa carta conta também)",
    type: "agua"
  },
  {
    name: "Alma Do Mar.4",
    cost: 2,
    basePower: 10,
    rarity: "agua",
    img: "../img/jogo/cards/agua/orca.jpg",
    desc: "Cause dano a todos os inimigos igual sua armadura atual distribuidas entre eles (arredonda para baixo).",
    type: "agua"
  },
  {
    name: "Alma Do Mar.7",
    cost: 1,
    basePower: 6,
    rarity: "agua",
    img: "../img/jogo/cards/agua/tuba.png",
    desc: "Cause 10 de dano a todos os inimigos marcados com 💧, mais 10% de todo lixo reciclado ♻️ e 10% de todo o dinheiro 🪙",
    type: "agua"
  },
  {
    name: "Alma Do Mar.9",
    cost: 1,
    basePower: 6,
    rarity: "agua",
    img: "../img/jogo/cards/agua/golf.jpg",
    desc: "FASE 1 FIX: Cause dano = 12% lixo (18% se mao<=3, máximo 25%).",
    maxDamagePercent: 25,
    type: "agua"
  },
  {
    name: "Alma Do Mar.12",
    cost: 1,
    basePower: 15,
    rarity: "agua",
    img: "../img/jogo/cards/agua/peixes.jpg",
    desc: "Se sua vida for maior que 30% do maximo, cause 15 de dano, se for menor cure 15",
    type: "agua"
  },
  {
    name: "Aquafluxo",
    cost: 1,
    basePower: 8,
    rarity: "agua",
    img: "../img/jogo/cards/agua/aquafluxo.png",
    desc: "Cause 8 de dano, e ganha por cada inimigos marcados com 💧, 1🔷 de energia",
    type: "agua"
  },
  {
    name: "Choro Da Vida",
    cost: 2,
    basePower: 10,
    rarity: "agua",
    img: "../img/jogo/cards/agua/cachoeira.png",
    desc: "Ganhe 10 de escudo mais 17% de todo o lixo reciclado ♻️",
    type: "agua"
  },
  // ❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️
  {
    name: "Gelo Mortal",
    cost: 2,
    basePower: 1,
    rarity: "frost",
    img: "../img/jogo/cards/frost/geloMortal.png",
    desc: "Marca com ❄️ e reduz 1 de dano do inimigo (Não fica a baixo de 1) e muda sua ação para ataque normal",
    type: "frost"
  },
  {
    name: "Nevasca Mortal",
    cost: 3,
    basePower: 1,
    rarity: "frost",
    img: "../img/jogo/cards/frost/nevasca.png",
    desc: "Marca com ❄️ e reduz 1 de dano de todos os inimigos (Não fica a baixo de 1) e muda sua ação para ataque normal",
    type: "frost"
  },
  {
    name: "Granizo",
    cost: 1,
    basePower: 6,
    rarity: "frost",
    img: "../img/jogo/cards/frost/chuvaDeGranizo.jpg",
    desc: "Cause 6 dano a todos os inimigos, se estiver  marcado com ❄️ X2 o dano, se estiver marcado com 💧 marca com ❄️",
    type: "frost"
  },
  {
    name: "Granizo Mortal",
    cost: 2,
    basePower: 12,
    rarity: "frost",
    img: "../img/jogo/cards/frost/chuvaMortal.jpg",
    desc: "Cause 12 dano a todos os inimigos, se estiver  marcado com ❄️ ou 💧 X2 o dano, se estiver marcado com 🔥 X3",
    type: "frost"
  },
  {
    name: "Misil Termico Guiado",
    cost: 3,
    basePower: 40,
    rarity: "frost",
    img: "../img/jogo/cards/frost/misilGuiado.jpg",
    desc: "Cause 40 dano a todos os inimigos marcados com 🔥",
    type: "frost"
  },
  {
    name: "Golpe Traseiro",
    cost: 1,
    basePower: 6,
    rarity: "frost",
    img: "../img/jogo/cards/frost/golpeTraicoeiro.jpg",
    desc: "Cause 6 dano ao ultimo inimigo inimigo, se estiver marcado com ❄️ ou 💧 X2, se estiver marcado com 🔥 X3",
    type: "frost"
  },
  {
    name: "Marcar",
    cost: 0,
    basePower: 0,
    rarity: "frost",
    img: "../img/jogo/cards/frost/congelar.png",
    desc: "Marca o inimigo com ❄️",
    type: "frost"
  },
  {
    name: "Cemiterio Branco",
    cost: 2,
    basePower: 0,
    rarity: "frost",
    img: "../img/jogo/cards/frost/cemiterioBranco.png",
    desc: "Marca todos os inimigos com ❄️",
    type: "frost"
  },
  {
    name: "Ataque Condensado",
    cost: 1,
    basePower: 8,
    rarity: "frost",
    img: "../img/jogo/cards/frost/atkGelido.png",
    desc: "Cause 8 de dano, se o inimigo estiver marcado com ❄️ cause X3",
    type: "frost"
  },
  {
    name: "Misil Condensado",
    cost: 3,
    basePower: 20,
    rarity: "frost",
    img: "../img/jogo/cards/frost/misil.jpg",
    desc: "Cause 20 de dano, se o inimigo estiver marcado com ❄️ cause X3",
    type: "frost"
  },
  {
    name: "Defesa Condensada",
    cost: 1,
    basePower: 3,
    rarity: "frost",
    img: "../img/jogo/cards/frost/defGelida.png",
    desc: "Ganhe 3 armadura por cada carta do tipo FROST na mão e X1 por cada inimigo marcado com ❄️",
    type: "frost"
  },
  {
    name: "Xenofluxo Glacial",
    cost: 0,
    basePower: 1,
    rarity: "frost",
    img: "../img/jogo/cards/frost/degelo.png",
    desc: "Ganhe 1 de energia por cada inimigo marcado com ❄️",
    type: "frost"
  },
  {
    name: "Coração Frio",
    cost: 1,
    basePower: 1,
    rarity: "frost",
    img: "../img/jogo/cards/frost/vidaGelida.png",
    desc: "Ganhe 1 de vida por cada carta do tipo FROST na mão e X1 por cada inimigo marcado com ❄️",
    type: "frost"
  },
  {
    name: "Prisão de Gelo",
    cost: 2,
    basePower: 8,
    rarity: "frost",
    img: "../img/jogo/cards/frost/prisao.png",
    desc: "FASE 1: Marca com ❄️. Se marcado, inimigo não ataca próximo turno (sinergia Gelo).",
    type: "frost"
  },
  {
    name: "Avalancha Congelante",
    cost: 3,
    basePower: 15,
    rarity: "frost",
    img: "../img/jogo/cards/frost/avalancha.png",
    desc: "FASE 1: Cause 15 dano + 1 por inimigo com ❄️ (X2 se 2+ congelados).",
    type: "frost"
  },
  {
    name: "Escudo de Gelo Permanente",
    cost: 2,
    basePower: 5,
    rarity: "frost",
    img: "../img/jogo/cards/frost/escudoGelo.png",
    desc: "FASE 1: Ganhe 5 escudo × cartas FROST na mão. Escudo não diminui em turno.",
    type: "frost"
  },
  {
    name: "Ressurreição Congelada",
    cost: 3,
    basePower: 0,
    rarity: "frost",
    img: "../img/jogo/cards/frost/ressurreicao.png",
    desc: "FASE 1: Se vida <= 20% max, cure 20 e marca todos inimigos ❄️.",
    type: "frost"
  },
  {
    name: "Baralho Glacial",
    cost: 1,
    basePower: 1,
    rarity: "frost",
    img: "../img/jogo/cards/frost/cardGelidas.png",
    desc: "Compre 1 carta do seu deck (Exceto eu) por cada inimigo marcado com ❄️",
    type: "frost"
  },
  {
    name: "Aura Glacial",
    cost: 3,
    basePower: 1,
    rarity: "frost",
    img: "../img/jogo/cards/frost/auraGelida.jpg",
    desc: "Cause dano igual 12% de todo o lixo reciclado ♻️, aumenta o contador em 1♻️ para cada carta de FROST na mão",
    type: "frost"
  },
  {
    name: "Terras Glaciais",
    cost: 2,
    basePower: 1,
    rarity: "frost",
    img: "../img/jogo/cards/frost/marcoEstrategico.jpg",
    desc: "Cause dano igual 5% de todo o dinheiro 🪙 (arredonda para baixo), aumenta o dano em x1 para cada carta de FROST na mão",
    type: "frost"
  },
  {
    name: "Chama Crescente",
    cost: 1,
    basePower: 8,
    rarity: "fire",
    img: "../img/jogo/cards/fire/chamaCrescente.png",
    desc: "FASE 2: SINERGIA FOGO - Cause 5 dano × (número inimigos 🔥). Coletora elemento.",
    type: "fire"
  },
  {
    name: "Tremor da Terra",
    cost: 2,
    basePower: 15,
    rarity: "terra",
    img: "../img/jogo/cards/terra/tremor.png",
    desc: "FASE 2: SINERGIA TERRA - Cause 15 dano + 5 por inimigo ⛰️. Coletora elemento.",
    type: "terra"
  },
  {
    name: "Ondufluxo Aquático",
    cost: 1,
    basePower: 10,
    rarity: "agua",
    img: "../img/jogo/cards/agua/ondufluxo.png",
    desc: "FASE 2: SINERGIA ÁGUA - Cause 2 dano × (inimigos 💧). Compre 1 se 2+ marcados.",
    type: "agua"
  },
  {
    name: "Prisma de Gelo Total",
    cost: 2,
    basePower: 12,
    rarity: "frost",
    img: "../img/jogo/cards/frost/prisma.png",
    desc: "FASE 2: SINERGIA GELO - Ganhe 2 escudo × (inimigos ❄️). Marca todos se 2+ já marcados.",
    type: "frost"
  },
  // ⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️
  {
    name: "Impacto Bruto",
    cost: 3,
    basePower: 20,
    rarity: "epic",
    img: "../img/jogo/cards/atk/Impacto.png",
    desc: "Causa 20 de dano ao inimigo.",
    type: "attack"
  },
  {
    name: "Ataque",
    cost: 1,
    basePower: 6,
    rarity: "common",
    img: "../img/jogo/cards/atk/ataque.png",
    desc: "Causa 6 de dano ao inimigo.",
    type: "attack"
  },
  {
    name: "Broca Perfurante",
    cost: 1,
    basePower: 8,
    rarity: "rare",
    img: "../img/jogo/cards/atk/atkBroca.png",
    desc: "Causa 8 de dano ao ultimo inimigo, X2 se tiver 3 ou menos cartas na mão.",
    type: "attack"
  },
  {
    name: "Ceifa",
    cost: 2,
    basePower: 12,
    rarity: "legend",
    img: "../img/jogo/cards/atk/fraqueza.png",
    desc: "Causa 12 de dano ao ultimo inimigo, se ele tiver 30 ou menos de vida X3 o dano.",
    type: "attack"
  },
  {
    name: "Desprezo",
    cost: 2,
    basePower: 20,
    rarity: "epic",
    img: "../img/jogo/cards/atk/caido.png",
    desc: "Causa 20 de dano ao ultimo inimigo.",
    type: "attack"
  },
  {
    name: "Artilharia Anti Sniper",
    cost: 2,
    basePower: 1,
    rarity: "epic",
    img: "../img/jogo/cards/atk/armamentoPesado.png",
    desc: "Compre <strong>Broca Perfurante</strong>, <strong>Ceifa</strong> e <strong>Desprezo</strong> com custo -1 se sua mão for 3 ou menos",
    type: "attack"
  },
  {
    name: "Drone de Ataque",
    cost: 2,
    basePower: 6,
    rarity: "epic",
    img: "../img/jogo/cards/atk/droneCombate.jpg",
    desc: "Compre 1 carta <strong>Ataque Preciso</strong> para cada inimigo em campo e causa 6 de dano todos os inimigos.",
    type: "attack"
  },
  {
    name: "Ataque Preciso",
    cost: 1,
    basePower: 6,
    rarity: "epic",
    img: "../img/jogo/cards/atk/precisao.png",
    desc: "Causa 6 de dano ao inimigo, se a vida dele for menor que 30 cause 20 de dano.",
    type: "attack"
  },
  {
    name: "Furia",
    cost: 2,
    basePower: 4,
    rarity: "epic",
    img: "../img/jogo/cards/atk/furia.png",
    desc: "Compre 4 <strong>Ataque Rapido</strong>, se for a unica carta na mão compre X2.",
    type: "attack"
  },
  {
    name: "Ataque Rapido",
    cost: 0,
    basePower: 5,
    rarity: "rare",
    img: "../img/jogo/cards/atk/golpeRapido.png",
    desc: "Causa 5 de dano ao inimigo.",
    type: "attack"
  },
  {
    name: "Liderança",
    cost: 1,
    basePower: 6,
    rarity: "rare",
    img: "../img/jogo/cards/atk/lideranca.jpeg",
    desc: "Causa 6 de dano e clone 2 cartas aleatorias do seu deck para a mão (Exceto ela mesma).",
    type: "attack"
  },
  {
    name: "Vingativo",
    cost: 3,
    basePower: 0,
    rarity: "legend",
    img: "../img/jogo/cards/atk/vinganca.jpeg",
    desc: "Causa dano baseado na vida perdida.",
    type: "attack"
  },
  {
    name: "Rebeldia",
    cost: 1,
    basePower: 7,
    rarity: "epic",
    img: "../img/jogo/cards/atk/rebeldia.jpeg",
    desc: "Cause 7 de dano, +7 se estiver sem escudo, +7 com 30 ou menos de vida.",
    type: "attack"
  },
  {
    name: "Drenagem",
    cost: 1,
    basePower: 10,
    rarity: "epic",
    img: "../img/jogo/cards/atk/drenoDeVida.png",
    desc: "Causa 10 de dano ao inimigo e cure-se em 10.",
    type: "attack"
  },
  {
    name: "Rajada Dupla",
    cost: 1,
    basePower: 12,
    rarity: "rare",
    img: "../img/jogo/cards/atk/tiroCarregado.png",
    desc: "Cause 12 de dano ao inimigo.",
    type: "attack"
  },
  {
    name: "Explosão",
    cost: 2,
    basePower: 12,
    rarity: "rare",
    img: "../img/jogo/cards/atk/ExplosaoDeEnergia.png",
    desc: "Causa 12 de dano em área a todos os inimigos.",
    type: "attack"
  },
  {
    name: "Chuva De Fragmentos",
    cost: 1,
    basePower: 6,
    rarity: "common",
    img: "../img/jogo/cards/atk/ChuvaDeFragmento.png",
    desc: "Causa 6 de dano em área a todos os inimigos.",
    type: "attack"
  },
  {
    name: "Lança Granadas",
    cost: 0,
    basePower: 3,
    rarity: "common",
    img: "../img/jogo/cards/atk/LancaGranadas.png",
    desc: "Causa 3 de dano em área a todos os inimigos.",
    type: "attack"
  },
  {
    name: "Beserck",
    cost: 2,
    basePower: 12,
    rarity: "epic",
    img: "../img/jogo/cards/atk/beserck.png",
    desc: "Cause 12 de dano, se houver 3 ou ou menos cartas na mão aumente em X3",
    type: "attack"
  },
  {
    name: "Fogo Amigo",
    cost: 3,
    basePower: 30,
    rarity: "epic",
    img: "../img/jogo/cards/atk/bombardeio.png",
    desc: "Cause 30 de dano em area, a cada inimigo no campo receba 15 de dano (max 45) e pode ser letal a você.",
    type: "attack"
  },
  // 🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️
  {
    name: "Defesa",
    cost: 1,
    basePower: 6,
    rarity: "common",
    img: "../img/jogo/cards/def/Blindagem.png",
    desc: "Ganha 6 de escudo.",
    type: "defense"
  },
  {
    name: "Tsunami",
    cost: 2,
    basePower: 6,
    rarity: "legend",
    img: "../img/jogo/cards/def/tsunami.png",
    desc: "Ganha 6 de escudo, ganhe X1 para cada carta na mão (Incluindo eu mesma) e para cada inimigo em campo.",
    type: "defense"
  },
  {
    name: "Campo de Força Fraco",
    cost: 0,
    basePower: 3,
    rarity: "common",
    img: "../img/jogo/cards/def/campoFraco.png",
    desc: "Ganha 3 de escudo.",
    type: "defense"
  },
  {
    name: "Campo de Força Instavel",
    cost: 2,
    basePower: 44,
    rarity: "rare",
    img: "../img/jogo/cards/def/campoInstavel.png",
    desc: "Ganhe 44 de escudo se tiver exatamente 4 cartas na mão.",
    type: "defense"
  },
  {
    name: "Campo Presurizado",
    cost: 2,
    basePower: 30,
    rarity: "rare",
    img: "../img/jogo/cards/def/campoPresurizado.png",
    desc: "Ganha 30 de escudo se eu for a unica carta na mão.",
    type: "defense"
  },
  {
    name: "Blindagem Vital",
    cost: 3,
    basePower: 0,
    rarity: "legend",
    img: "../img/jogo/cards/def/blindagemMotivadora.png",
    desc: "Ganha escudo igual a vida atual, x2 se eu for a unica carta na mão.",
    type: "defense"
  },
  {
    name: "Defesa Salvadora",
    cost: 1,
    basePower: 6,
    rarity: "legend",
    img: "../img/jogo/cards/def/umaVida.png",
    desc: "Ganha 6 de escudo, se tiver 3 ou menos cartas na mão cure tambem, se eu for a unica na mão X3.",
    type: "defense"
  },
  {
    name: "Ultima Defesa",
    cost: 3,
    basePower: 80,
    rarity: "legend",
    img: "../img/jogo/cards/def/ultimaDef.png",
    desc: "Ganha 80 de escudo se eu for a unica carta na mão.",
    type: "defense"
  },
  {
    name: "Escudo Triangular",
    cost: 1,
    basePower: 10,
    rarity: "rare",
    img: "../img/jogo/cards/def/escudoTriangular.png",
    desc: "Ganhe 10 de escudo, se tiver 3 ou menos cartas na mão X3 o valor.",
    type: "defense"
  },
  {
    name: "Defesa Lunar",
    cost: 3,
    basePower: 30,
    rarity: "rare",
    img: "../img/jogo/cards/def/lua.png",
    desc: "Ganhe 30 de escudo se tiver 3 ou menos cartas, se não cause 30 de dano.",
    type: "defense"
  },
  {
    name: "Drone Defensivo",
    cost: 1,
    basePower: 2,
    rarity: "epic",
    img: "../img/jogo/cards/def/droneDef.jpg",
    desc: "Compre uma carta de <strong>Defesa</strong> para cada inimigo em campo, se ouver 3 ganhe <strong>Escudo</strong> no lugar.",
    type: "defense"
  },
  {
    name: "Arpão",
    cost: 1,
    basePower: 3,
    rarity: "rare",
    img: "../img/jogo/cards/def/arpao.png",
    desc: "Ataca o alvo mais distante em 3 e ganhe armadura (x3 o dano c/ armadura).",
    type: "defense"
  },
  {
    name: "Indestrutivel",
    cost: 2,
    basePower: 3,
    rarity: "epic",
    img: "../img/jogo/cards/def/indestrutivel.png",
    desc: "Multiplique sua armadura em X3.",
    type: "defense"
  },
  {
    name: "Em guarda",
    cost: 1,
    basePower: 10,
    rarity: "rare",
    img: "../img/jogo/cards/def/emGuarda.png",
    desc: "Se possuir escudo ganhe 10 de escudo.",
    type: "defense"
  },
  {
    name: "PROTOCOL-Campo De Força",
    cost: 1,
    basePower: 40,
    rarity: "epic",
    img: "../img/jogo/cards/def/campoDeForca.png",
    desc: "Se sua vida for 30 ou menos ganhe 40 de escudo",
    type: "defense"
  },
  {
    name: "Brilhando",
    cost: 1,
    basePower: 60,
    rarity: "legend",
    img: "../img/jogo/cards/def/escudoDeVidro.png",
    desc: "Se sua vida estiver cheia ganhe 60 de escudo",
    type: "defense"
  },
  {
    name: "Impulso Defensivo",
    cost: 0,
    basePower: 1,
    rarity: "rare",
    img: "../img/jogo/cards/def/impulsoAzul.png",
    desc: "Ganha 3 de escudo e receba 1 de energia",
    type: "defense"
  },
  {
    name: "Escudo",
    cost: 1,
    basePower: 10,
    rarity: "common",
    img: "../img/jogo/cards/def/escudoHolo.png",
    desc: "Cria um escudo de 10 pontos.",
    type: "defense"
  },
  {
    name: "Sistema de reflexão",
    cost: 1,
    basePower: 4,
    rarity: "rare",
    img: "../img/jogo/cards/def/sisReflexao.png",
    desc: "Cria um escudo de 8 pontos e cause 4 de dano.",
    type: "defense"
  },
  {
    name: "Escudo Retaliante",
    cost: 1,
    basePower: 0,
    rarity: "epic",
    img: "../img/jogo/cards/def/escudoRetaliante.png",
    desc: "Causa dano igual à sua armadura atual.",
    type: "defense"
  },
  // 💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚
  {
    name: "Cura",
    cost: 0,
    basePower: 3,
    rarity: "common",
    img: "../img/jogo/cards/buff/Cura.png",
    desc: "Recupera 3 de vida.",
    type: "heal"
  },
  {
    name: "Fator De Cura",
    cost: 1,
    basePower: 10,
    rarity: "rare",
    img: "../img/jogo/cards/buff/trocaVida.png",
    desc: "Sacrefique 20 de vida (não letal), suas proximas 4 cartas de cura nessa batalha tem mais 10 pontos de ação.",
    type: "heal"
  },
  {
    name: "Escudo De Bolso",
    cost: 0,
    basePower: 10,
    rarity: "legend",
    img: "../img/jogo/cards/buff/armaduraBolso.png",
    desc: "Zera seu escudo e ganha um buff, sua proxima carta de escudo nessa batalha terá os seus pontos de ação mais a quantidade de escudo sacreficado.",
    type: "heal"
  },
  {
    name: "Vida De Bolso",
    cost: 0,
    basePower: 10,
    rarity: "legend",
    img: "../img/jogo/cards/buff/vidaBolso.png",
    desc: "Seta sua vida para 1 e ganha um buff, sua proxima carta de cura nessa batalha terá os seus pontos de ação mais a quantidade de vida sacreficada.",
    type: "heal"
  },
  {
    name: "Carga Concentrada",
    cost: 2,
    basePower: 20,
    rarity: "epic",
    img: "../img/jogo/cards/buff/allBuff.png",
    desc: "Sua proxima carta nessa batalha tem mais 20 pontos de ação: ataque, defesa ou cura (apenas 1).",
    type: "heal"
  },
  {
    name: "Carga Dividida",
    cost: 2,
    basePower: 10,
    rarity: "epic",
    img: "../img/jogo/cards/buff/allBuff2.png",
    desc: "Suas proximas 2 cartas nessa batalha tem mais 10 pontos de ação: ataque, defesa ou cura (apenas 1).",
    type: "heal"
  },
  {
    name: "Carga Estratégica",
    cost: 3,
    basePower: 6,
    rarity: "epic",
    img: "../img/jogo/cards/buff/allBuff3.png",
    desc: "Suas proximas 5 cartas nessa batalha tem mais 6 pontos de ação: ataque, defesa ou cura (apenas 1).",
    type: "heal"
  },
  {
    name: "Carga Defensiva",
    cost: 1,
    basePower: 6,
    rarity: "rare",
    img: "../img/jogo/cards/buff/defBuff.png",
    desc: "Suas proximas 2 cartas de escudo nessa batalha tem mais 6 pontos de ação.",
    type: "heal"
  },
  {
    name: "Carga Ofensiva",
    cost: 1,
    basePower: 6,
    rarity: "rare",
    img: "../img/jogo/cards/buff/atkBuff.png",
    desc: "Suas proximas 2 cartas de dano nessa batalha tem mais 6 pontos de ação.",
    type: "heal"
  },
  {
    name: "Carga Vital",
    cost: 1,
    basePower: 6,
    rarity: "rare",
    img: "../img/jogo/cards/buff/curaBuff.png",
    desc: "Suas proximas 2 cartas de cura nessa batalha tem mais 6 pontos de ação.",
    type: "heal"
  },
  {
    name: "Ritual",
    cost: 2,
    basePower: 20,
    rarity: "common",
    img: "../img/jogo/cards/buff/ritual.png",
    desc: "Recupera 20 de vida se eu for a unica carta na mão, caso contrario perca vida (não pode ser letal a você).",
    type: "heal"
  },
  {
    name: "Cura Forte",
    cost: 2,
    basePower: 30,
    rarity: "rare",
    img: "../img/jogo/cards/buff/coracaoForte.png",
    desc: "Recupera 30 de vida se eu for a unica carta na mão.",
    type: "heal"
  },
  {
    name: "Estratégia",
    cost: 0,
    basePower: 2,
    rarity: "legend",
    img: "../img/jogo/cards/buff/cerebro.png",
    desc: "Se você tiver 3 cartas ou menos na mão clone 2 cartas do seu deck para a mão (Exceto ela mesma), se tiver mais ganhe 2 de energia.",
    type: "heal"
  },
  {
    name: "Limite da Vida",
    cost: 1,
    basePower: 10,
    rarity: "rare",
    img: "../img/jogo/cards/buff/limiteDaVida.png",
    desc: "Se você tiver 3 cartas ou menos na mão recupere 10 de vida, X3 se tiver 30 ou menos de vida.",
    type: "heal"
  },
  {
    name: "Xenofluxo",
    cost: 0,
    basePower: 1,
    rarity: "epic",
    img: "../img/jogo/cards/buff/xenofluxo.jpg",
    desc: "Ganhe 1 de energia.",
    type: "heal"
  },
  {
    name: "Drone Médico",
    cost: 1,
    basePower: 5,
    rarity: "rare",
    img: "../img/jogo/cards/buff/droneVerd.png",
    desc: "Recupera 5 de vida por cada inimigo em campo.",
    type: "heal"
  },
  {
    name: "Sob-Vigia",
    cost: 0,
    basePower: 25,
    rarity: "rare",
    img: "../img/jogo/cards/buff/vigia.png",
    desc: "Ajuste sua vida para 25, se essa carta tirar vida ganhe 1 de energia.",
    type: "heal"
  },
  {
    name: "Mineração",
    cost: 0,
    basePower: 3,
    rarity: "legend",
    img: "../img/jogo/cards/buff/mineracao.png",
    desc: "Mineração sustentavel, fornece 3 de energia, viva a sustentabilidade!",
    type: "heal"
  },
  {
    name: "PROTOCOL-Reforço Estrutural",
    cost: 1,
    basePower: 20,
    rarity: "rare",
    img: "../img/jogo/cards/buff/reforcoDeEstrutura.png",
    desc: "Cure 20 de vida se sua vida estiver em 30 ou menos.",
    type: "heal"
  },
  {
    name: "Impulso",
    cost: 1,
    basePower: 1,
    rarity: "epic",
    img: "../img/jogo/cards/buff/impulsoVerd.png",
    desc: "Aumenta a mão em 1 até o final da luta (limite da mão 10)",
    type: "heal"
  },
  {
    name: "Golpe Neural Retaliante",
    cost: 3,
    basePower: 20,
    rarity: "epic",
    img: "../img/jogo/cards/buff/neural.png",
    desc: "Cause dano igual sua vida atual, perca 20 da vida atual (não pode ser letal a você)",
    type: "heal"
  },
  {
    name: "Sobre Carga",
    cost: 1,
    basePower: 4,
    rarity: "rare",
    img: "../img/jogo/cards/buff/sobreCarga.png",
    desc: "Perca 4 de vida e cause 12 de dano (não pode ser letal a você).",
    type: "heal"
  },
  {
    name: "Compra Dupla",
    cost: 1,
    basePower: 2,
    rarity: "rare",
    img: "../img/jogo/cards/buff/comprarCarta.png",
    desc: "Compra 2 cartas aleatórias.",
    type: "heal"
  },
  // ♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️♻️
  {
    name: "Recicladora",
    cost: 1,
    basePower: 8,
    rarity: "legend",
    img: "../img/jogo/cards/reciclagem/reciclagem.png",
    desc: "Cause dano igual a 20% de todo lixo reciclado ♻️ (Arredondado para baixo).",
    type: "reciclagem"
  },
  {
    name: "Arma Auto Sustentavel",
    cost: 2,
    basePower: 8,
    rarity: "epic",
    img: "../img/jogo/cards/reciclagem/armaForte.jpg",
    desc: "Recicla lixo, para cada lixo reciclado ♻️ cause dano igual a 5% de todo lixo reciclado ♻️.",
    type: "reciclagem"
  },
  {
    name: "Defesa Critica",
    cost: 2,
    basePower: 8,
    rarity: "epic",
    img: "../img/jogo/cards/reciclagem/defesaCritica.jpg",
    desc: "Ganhe escudo igual 5% de todo lixo reciclado ♻️, se sua vida for 30 ou menos, x5 o escudo",
    type: "reciclagem"
  },
  {
    name: "Essencia Verde",
    cost: 1,
    basePower: 8,
    rarity: "legend",
    img: "../img/jogo/cards/reciclagem/reevitalizacao.png",
    desc: "Cure igual a 10% de todo lixo reciclado ♻️ (Arredondado para baixo).",
    type: "reciclagem"
  },
  {
    name: "Defesa Renovavel",
    cost: 1,
    basePower: 8,
    rarity: "legend",
    img: "../img/jogo/cards/reciclagem/escudoForte.jpg",
    desc: "Ganhe escudo igual a 25% de todo lixo reciclado ♻️ (Arredondado para baixo).",
    type: "reciclagem"
  },
  {
    name: "Drone de Coleta",
    cost: 0,
    basePower: 0,
    rarity: "epic",
    img: "../img/jogo/cards/reciclagem/droneColeta.jpg",
    desc: "Transforme os lixos em carta de <strong>Ataque</strong> , se sua vida for menor que 30, transforme em <strong>Cura</strong> no lugar.",
    type: "reciclagem"
  },
  {
    name: "Terror Critico",
    cost: 2,
    basePower: 7,
    rarity: "legend",
    img: "../img/jogo/cards/reciclagem/terror.png",
    desc: "Cause 7 de dano por cada lixo reciclado ♻️, se sua vida estiver em 30 ou menos cause X2.",
    type: "reciclagem"
  },
  {
    name: "Destruir Carta",
    cost: 0,
    basePower: 0,
    rarity: "common",
    img: "../img/jogo/cards/reciclagem/destruirCarta.png",
    desc: "Destroi todas as cartas do tipo 'lixo' na sua mão.",
    type: "reciclagem"
  },
  {
    name: "Ataque Reciclável",
    cost: 1,
    basePower: 0,
    rarity: "rare",
    img: "../img/jogo/cards/reciclagem/atkReciclavel.png",
    desc: "Remove cartas de lixo da mão e causa 5 de dano por cada carta removida.",
    type: "reciclagem"
  },
  {
    name: "Artilharia Reciclável",
    cost: 1,
    basePower: 4,
    rarity: "rare",
    img: "../img/jogo/cards/reciclagem/lancaFoguetes.jpg",
    desc: "Remove cartas de lixo da mão e causa 4 de dano a todos os inimigos por cada carta removida.",
    type: "reciclagem"
  },
  {
    name: "Fogo Reciclável Pesado",
    cost: 3,
    basePower: 5,
    rarity: "legend",
    img: "../img/jogo/cards/reciclagem/lancaFoguetesForte.jpg",
    desc: "Remove cartas de lixo da mão e causa 5 de dano a todos os inimigos por cada carta removida, mais 10% de todo o lixo reciclado.",
    type: "reciclagem"
  },
  {
    name: "Defesa Reciclável",
    cost: 1,
    basePower: 0,
    rarity: "rare",
    img: "../img/jogo/cards/reciclagem/defesaReciclavel.png",
    desc: "Remove cartas de lixo da mão e ganhe 5 de escudo por cada carta removida.",
    type: "reciclagem"
  },
  {
    name: "Xenofluxo Reciclável",
    cost: 0,
    basePower: 0,
    rarity: "epic",
    img: "../img/jogo/cards/reciclagem/ganhoDeEnergia.png",
    desc: "Recicla lixo, ganhe 1 de energia a cada 2 lixos reciclados ♻️ (Arredondado para baixo).",
    type: "reciclagem"
  },
  // 🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️
  {
    name: "Entulho",
    cost: 1,
    basePower: 0,
    rarity: "common",
    img: "../img/jogo/cards/lixo/entulho.png",
    desc: "Um monte de entulho que não faz nada, quem sabe você ache uma utilidade para ele.",
    type: "lixo"
  },
  {
    name: "Drone Quebrado",
    cost: 1,
    basePower: 0,
    rarity: "common",
    img: "../img/jogo/cards/lixo/droneLixo.png",
    desc: "Um drone danificado que não faz nada, quem sabe você ache uma utilidade para ele.",
    type: "lixo"
  },
  {
    name: "Lixo quimico",
    cost: 9,
    basePower: 0,
    rarity: "common",
    img: "../img/jogo/cards/lixo/lixoQuimico.png",
    desc: "Tudo pode ser reciclado ♻️, mas certas coisas custão muito caro...",
    type: "lixo"
  },
  {
    name: "Escudo quebrado",
    cost: 1,
    basePower: 0,
    rarity: "common",
    img: "../img/jogo/cards/lixo/escudoQuebrado.png",
    desc: "Ganhe 0 de defesa.",
    type: "lixo"
  },
  {
    name: "Arma Quebrada",
    cost: 1,
    basePower: 0,
    rarity: "common",
    img: "../img/jogo/cards/lixo/armaQuebrada.png",
    desc: "Cause 0 de dano.",
    type: "lixo"
  },
  {
    name: "Restos de mecha",
    cost: 0,
    basePower: 2,
    rarity: "epic",
    img: "../img/jogo/cards/lixo/mecaLixo.png",
    desc: "Adiciona 3 cartas de <strong>Entulho</strong> à sua mão.",
    type: "lixo"
  },
  {
    name: "Cura Quebrada",
    cost: 1,
    basePower: 0,
    rarity: "common",
    img: "../img/jogo/cards/lixo/agulhaQuebrada.png",
    desc: "Restos de esperança de sobrevivencia, cura 0.",
    type: "lixo"
  },
  {
    name: "Ferro Velho",
    cost: 0,
    basePower: 1,
    rarity: "common",
    img: "../img/jogo/cards/lixo/ferroVelho.png",
    desc: "Adiciona 2 cartas de <strong>Entulho</strong> à sua mão.",
    type: "lixo"
  }
];