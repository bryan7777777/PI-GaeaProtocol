let telaAtual = 1;
let telaAnterior = null;
let lixoReciclado = 0;

function atualizarLixo() {
  lixoReciclado++
  const elementos = document.querySelectorAll(".lixoReciclado");
  elementos.forEach(el => {
    el.textContent = `♻️Lixos Reciclados♻️: ${lixoReciclado}`;
  });
}

configurarSelecaoPersonagem();

document.getElementById('lutaUm').addEventListener('click', irParaDiv2);

document.getElementById('lojaUm').addEventListener('click', irParaDiv2);

document.querySelectorAll('.ferreiro').forEach(el => {
  el.addEventListener('click', irParaDiv2);
});

document.querySelectorAll('.inventario').forEach(el => {
  el.addEventListener('click', irParaDiv2);
});

document.querySelectorAll('.pular').forEach(el => {
  el.addEventListener('click', irParaDiv2);
});

document.querySelectorAll('.curaVida').forEach(el => {
  el.addEventListener('click', curaVida);
});
document.querySelectorAll('.aumentaVida').forEach(el => {
  el.addEventListener('click', aumentaVida);
});
document.querySelectorAll('.aumentaSacre').forEach(el => {
  el.addEventListener('click', aumentaSacre);
});
document.querySelectorAll('.curaSacre').forEach(el => {
  el.addEventListener('click', curaSacre);
});

document.querySelectorAll('.armaduraUp').forEach(el => {
  el.addEventListener('click', armaduraUp);
});
document.querySelectorAll('.armaduraSacre').forEach(el => {
  el.addEventListener('click', armaduraSacre);
});

let playerMaxHP = 100, energyMax = 3, playerShieldInit = 0;
let playerHP = 100, energy = 3, playerShield = playerShieldInit;
let mapaBatalha = 0;
// buff em itens aumenta esse
let maoInicio = 5;
// buff em cards aumenta esse
let limiteMao = 5;
// nenhuma mão pode exceder 10, evitar scrol
let maxMao = 10;

function curaVida() {
  playerHP = Math.min(playerHP + 25, playerMaxHP);
}

function curaSacre() {
  if (playerMaxHP <= 10) {
    playerMaxHP = 10;
    updateHUD();
  } else {
    playerMaxHP -= 10;
  }
  playerHP = Math.min(playerHP + playerMaxHP, playerMaxHP);
  updateHUD();
}

function aumentaVida() {
  playerMaxHP += 10;
  updateHUD();
}

function aumentaSacre() {
  playerMaxHP += 30;
  if (playerHP <= 50) {
    playerHP = 1;
  } else {
    playerHP -= 50;
  }
  updateHUD();
}

function armaduraUp() {
  playerShieldInit += 2;
  updateHUD();
}

function armaduraSacre() {
  playerShieldInit += 15;
  if (playerMaxHP <= 50) {
    playerMaxHP = 10;
  } else {
    playerMaxHP -= 50;
    if (playerMaxHP <= 10) {
      playerMaxHP = 10;
    }
  }
  updateHUD();
}

function criarPlayerNaDiv3() {
  if (!personagemSelecionado) return; // nenhum personagem selecionado

  const div3 = document.getElementById("player-area");

  // Remove a imagem antiga, se existir
  const imgExistente = document.getElementById("player");
  if (imgExistente) div3.removeChild(imgExistente);

  // Cria nova imagem
  const playerImg = document.createElement("img");
  playerImg.id = "player";

  const characterDecks = {
    laranja: [
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Destruir Carta"),
      allCards.find(c => c.name === "Chuva De Fragmentos"),
      allCards.find(c => c.name === "Chuva De Fragmentos"),
      allCards.find(c => c.name === "Impulso Defensivo"),
      allCards.find(c => c.name === "Impulso Defensivo"),
      allCards.find(c => c.name === "Rajada Dupla"),
      allCards.find(c => c.name === "Rajada Dupla"),
      allCards.find(c => c.name === "Rajada Dupla"),
      allCards.find(c => c.name === "Rajada Dupla"),
      allCards.find(c => c.name === "Rajada Dupla"),
    ],
    azul: [
      allCards.find(c => c.name === "Sistema de reflexão"),
      allCards.find(c => c.name === "Sistema de reflexão"),
      allCards.find(c => c.name === "Sistema de reflexão"),
      allCards.find(c => c.name === "Escudo Retaliante"),
      allCards.find(c => c.name === "Escudo Retaliante"),
      allCards.find(c => c.name === "Escudo Retaliante"),
      allCards.find(c => c.name === "Em guarda"),
      allCards.find(c => c.name === "Em guarda"),
      allCards.find(c => c.name === "Em guarda"),
      allCards.find(c => c.name === "Indestrutivel"),
      allCards.find(c => c.name === "Destruir Carta"),
    ],
    amarelo: [
      allCards.find(c => c.name === "Destruir Carta"),
      allCards.find(c => c.name === "Mineração"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
    ],
    celso: [
      allCards.find(c => c.name === "Destruir Carta"),
      allCards.find(c => c.name === "Mineração"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
    ],
    felipe: [
      allCards.find(c => c.name === "Destruir Carta"),
      allCards.find(c => c.name === "Mineração"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
    ],
    maria: [
      allCards.find(c => c.name === "Destruir Carta"),
      allCards.find(c => c.name === "Mineração"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
    ],
    verde: [
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Liderança"),
      allCards.find(c => c.name === "Liderança"),
      allCards.find(c => c.name === "Chuva De Fragmentos"),
      allCards.find(c => c.name === "Cura"),
      allCards.find(c => c.name === "Escudo"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Ataque Reciclável"),
      allCards.find(c => c.name === "Destruir Carta"),
    ],
    magnolia: [
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Liderança"),
      allCards.find(c => c.name === "Liderança"),
      allCards.find(c => c.name === "Chuva De Fragmentos"),
      allCards.find(c => c.name === "Cura"),
      allCards.find(c => c.name === "Escudo"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Ataque Reciclável"),
      allCards.find(c => c.name === "Destruir Carta"),
    ],
    vermelho: [
      allCards.find(c => c.name === "Sobre Carga"),
      allCards.find(c => c.name === "Sobre Carga"),
      allCards.find(c => c.name === "Rebeldia"),
      allCards.find(c => c.name === "Rebeldia"),
      allCards.find(c => c.name === "Rebeldia"),
      allCards.find(c => c.name === "Explosão"),
      allCards.find(c => c.name === "Chuva De Fragmentos"),
      allCards.find(c => c.name === "Chuva De Fragmentos"),
      allCards.find(c => c.name === "Fogo Amigo"),
      allCards.find(c => c.name === "Fogo Amigo"),
      allCards.find(c => c.name === "Beserck"),
      allCards.find(c => c.name === "Destruir Carta"),
    ],
    roxo: [
      allCards.find(c => c.name === "Drone de Ataque"),
      allCards.find(c => c.name === "Drone de Ataque"),
      allCards.find(c => c.name === "Drone de Ataque"),
      allCards.find(c => c.name === "Drone Defensivo"),
      allCards.find(c => c.name === "Drone Defensivo"),
      allCards.find(c => c.name === "Drone Defensivo"),
      allCards.find(c => c.name === "Drone de Coleta"),
      allCards.find(c => c.name === "Drone de Coleta"),
      allCards.find(c => c.name === "Drone Médico"),
      allCards.find(c => c.name === "Drone Médico"),
      allCards.find(c => c.name === "PROTOCOL-Campo De Força"),
      allCards.find(c => c.name === "Destruir Carta"),
    ],
    porto: [
      allCards.find(c => c.name === "Arpão"),
      allCards.find(c => c.name === "Arpão"),
      allCards.find(c => c.name === "Arpão"),
      allCards.find(c => c.name === "Arpão"),
      allCards.find(c => c.name === "Arpão"),
      allCards.find(c => c.name === "Arpão"),
      allCards.find(c => c.name === "Arpão"),
      allCards.find(c => c.name === "Impulso Defensivo"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Sistema de reflexão"),
      allCards.find(c => c.name === "Sistema de reflexão"),
      allCards.find(c => c.name === "Destruir Carta"),
    ],
    mercuri: [
      allCards.find(c => c.name === "Arpão"),
      allCards.find(c => c.name === "Arpão"),
      allCards.find(c => c.name === "Arpão"),
      allCards.find(c => c.name === "Arpão"),
      allCards.find(c => c.name === "Arpão"),
      allCards.find(c => c.name === "Arpão"),
      allCards.find(c => c.name === "Arpão"),
      allCards.find(c => c.name === "Impulso Defensivo"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Sistema de reflexão"),
      allCards.find(c => c.name === "Sistema de reflexão"),
      allCards.find(c => c.name === "Destruir Carta"),
    ],
    ferrus: [
      allCards.find(c => c.name === "Terror Critico"),
      allCards.find(c => c.name === "Ataque Reciclável"),
      allCards.find(c => c.name === "Ataque Reciclável"),
      allCards.find(c => c.name === "Recicladora"),
      allCards.find(c => c.name === "Defesa Reciclável"),
      allCards.find(c => c.name === "Defesa Reciclável"),
      allCards.find(c => c.name === "Xenofluxo Reciclável"),
      allCards.find(c => c.name === "Entulho"),
      allCards.find(c => c.name === "Entulho"),
      allCards.find(c => c.name === "Ferro Velho"),
      allCards.find(c => c.name === "Ferro Velho"),
      allCards.find(c => c.name === "Ferro Velho"),
    ],
    tomoeh: [
      allCards.find(c => c.name === "Beserck"),
      allCards.find(c => c.name === "Rebeldia"),
      allCards.find(c => c.name === "Rebeldia"),
      allCards.find(c => c.name === "Rebeldia"),
      allCards.find(c => c.name === "Chuva De Fragmentos"),
      allCards.find(c => c.name === "Chuva De Fragmentos"),
      allCards.find(c => c.name === "Impacto Bruto"),
      allCards.find(c => c.name === "Fogo Amigo"),
      allCards.find(c => c.name === "Liderança"),
      allCards.find(c => c.name === "Liderança"),
      allCards.find(c => c.name === "Guardião"),
      allCards.find(c => c.name === "Destruir Carta"),
    ],
    x: [
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Beserck"),
      allCards.find(c => c.name === "Chuva De Fragmentos"),
      allCards.find(c => c.name === "Chuva De Fragmentos"),
      allCards.find(c => c.name === "Vingativo"),
      allCards.find(c => c.name === "Fogo Amigo"),
      allCards.find(c => c.name === "Fogo Amigo"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Guardião"),
      allCards.find(c => c.name === "Destruir Carta"),
    ],
    wallace: [
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Ataque"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "Defesa"),
      allCards.find(c => c.name === "GÆPROTOCOL"),
      allCards.find(c => c.name === "Destruir Carta"),
    ],
    olaf: [
      allCards.find(c => c.name === "Defesa Condensada"),
      allCards.find(c => c.name === "Defesa Condensada"),
      allCards.find(c => c.name === "Coração Frio"),
      allCards.find(c => c.name === "Coração Frio"),
      allCards.find(c => c.name === "Ataque Condensado"),
      allCards.find(c => c.name === "Ataque Condensado"),
      allCards.find(c => c.name === "Nevasca Mortal"),
      allCards.find(c => c.name === "Gelo Mortal"),
      allCards.find(c => c.name === "Marcar"),
      allCards.find(c => c.name === "Cemiterio Branco"),
      allCards.find(c => c.name === "Xenofluxo Glacial"),
      allCards.find(c => c.name === "Baralho Glacial"),
    ],
    olga: [
      allCards.find(c => c.name === "Defesa Condensada"),
      allCards.find(c => c.name === "Defesa Condensada"),
      allCards.find(c => c.name === "Coração Frio"),
      allCards.find(c => c.name === "Coração Frio"),
      allCards.find(c => c.name === "Ataque Condensado"),
      allCards.find(c => c.name === "Ataque Condensado"),
      allCards.find(c => c.name === "Nevasca Mortal"),
      allCards.find(c => c.name === "Gelo Mortal"),
      allCards.find(c => c.name === "Marcar"),
      allCards.find(c => c.name === "Cemiterio Branco"),
      allCards.find(c => c.name === "Xenofluxo Glacial"),
      allCards.find(c => c.name === "Baralho Glacial"),
    ],
    glacia: [
      allCards.find(c => c.name === "Defesa Condensada"),
      allCards.find(c => c.name === "Defesa Condensada"),
      allCards.find(c => c.name === "Coração Frio"),
      allCards.find(c => c.name === "Ataque Condensado"),
      allCards.find(c => c.name === "Ataque Condensado"),
      allCards.find(c => c.name === "Ataque Condensado"),
      allCards.find(c => c.name === "Nevasca Mortal"),
      allCards.find(c => c.name === "Gelo Mortal"),
      allCards.find(c => c.name === "Marcar"),
      allCards.find(c => c.name === "Cemiterio Branco"),
      allCards.find(c => c.name === "Xenofluxo Glacial"),
      allCards.find(c => c.name === "Baralho Glacial"),
    ],
    lilia: [
      allCards.find(c => c.name === "Defesa Condensada"),
      allCards.find(c => c.name === "Defesa Condensada"),
      allCards.find(c => c.name === "Coração Frio"),
      allCards.find(c => c.name === "Ataque Condensado"),
      allCards.find(c => c.name === "Ataque Condensado"),
      allCards.find(c => c.name === "Ataque Condensado"),
      allCards.find(c => c.name === "Nevasca Mortal"),
      allCards.find(c => c.name === "Gelo Mortal"),
      allCards.find(c => c.name === "Marcar"),
      allCards.find(c => c.name === "Cemiterio Branco"),
      allCards.find(c => c.name === "Xenofluxo Glacial"),
      allCards.find(c => c.name === "Baralho Glacial"),
    ],
    gaeaReen: [
      allCards.find(c => c.name === "Combustão"),
      allCards.find(c => c.name === "Chuva De Fogo"),
      allCards.find(c => c.name === "Jato De Água"),
      allCards.find(c => c.name === "Mar Denso"),
      allCards.find(c => c.name === "Soterrar"),
      allCards.find(c => c.name === "Deslizamento"),
      allCards.find(c => c.name === "Chuva de Laminas"),
      allCards.find(c => c.name === "Chuva de Laminas"),
      allCards.find(c => c.name === "Chuva de Laminas"),
      allCards.find(c => c.name === "Chuva de Laminas"),
      allCards.find(c => c.name === "Chuva de Laminas"),
      allCards.find(c => c.name === "Chuva de Laminas"),
      allCards.find(c => c.name === "Chuva de Laminas"),
    ]
  };

  // Escolhe status baseado no personagem
  switch (personagemSelecionado) {
    case "laranja":
      playerImg.src = "./../img/jogo/player/corredor.png";
      playerMaxHP = 70, energyMax = 3, playerShieldInit = 0;
      playerHP = 70, energy = 3, playerShield = playerShieldInit;
      playerDeck = [...characterDecks.laranja];
      maoInicio = 6;
      limiteMao = 6;
      break;
    case "azul":
      playerImg.src = "./../img/jogo/player/tank.png";
      playerMaxHP = 130, energyMax = 3, playerShieldInit = 5;
      playerHP = 130, energy = 3, playerShield = playerShieldInit;
      playerDeck = [...characterDecks.azul];
      break;
    case "amarelo":
      playerImg.src = "./../img/jogo/player/mineiro.png";
      playerDeck = [...characterDecks.amarelo];
      break;
    case "celso":
      playerImg.src = "./../img/jogo/player/celso.png";
      playerDeck = [...characterDecks.celso];
      break;
    case "felipe":
      playerImg.src = "./../img/jogo/player/felipe.png";
      playerDeck = [...characterDecks.felipe];
      break;
    case "maria":
      playerImg.src = "./../img/jogo/player/maria.png";
      playerDeck = [...characterDecks.maria];
      break;
    case "verde":
      playerImg.src = "./../img/jogo/player/jao.png";
      playerDeck = [...characterDecks.verde];
      maoInicio = 6;
      limiteMao = 6;
      break;
    case "magnolia":
      playerImg.src = "./../img/jogo/player/magnolia.png";
      playerDeck = [...characterDecks.magnolia];
      maoInicio = 6;
      limiteMao = 6;
      break;
    case "vermelho":
      playerImg.src = "./../img/jogo/player/mechaBeserck.png";
      playerMaxHP = 50, energyMax = 4, playerShieldInit = 0;
      playerHP = 50, energy = 4, playerShield = playerShieldInit;
      playerDeck = [...characterDecks.vermelho];
      maoInicio = 6;
      limiteMao = 6;
      break;
    case "roxo":
      playerImg.src = "./../img/jogo/player/cabaDosDrones.png";
      playerMaxHP = 60, energyMax = 5, playerShieldInit = 0;
      playerHP = 60, energy = 5, playerShield = playerShieldInit;
      maoInicio = 7;
      limiteMao = 7;
      playerDeck = [...characterDecks.roxo];
      break;
    case "porto":
      playerImg.src = "./../img/jogo/player/autoridadeDoPorto.png";
      playerMaxHP = 110, energyMax = 3, playerShieldInit = 5;
      playerHP = 110, energy = 3, playerShield = playerShieldInit;
      playerDeck = [...characterDecks.porto];
      maoInicio = 5;
      limiteMao = 5;
      break;
    case "mercuri":
      playerImg.src = "./../img/jogo/player/mercuri.png";
      playerMaxHP = 110, energyMax = 3, playerShieldInit = 5;
      playerHP = 110, energy = 3, playerShield = playerShieldInit;
      playerDeck = [...characterDecks.mercuri];
      maoInicio = 5;
      limiteMao = 5;
      break;
    case "lilia":
      if (mapaBatalha == 0) {
        playerDeck = [...characterDecks.lilia];
        imgLilia = "./../img/jogo/player/lilia1.png"
        playerMaxHP = 60, energyMax = 2, energy = 2;
        playerHP = 60;
        maoInicio = 4;
        limiteMao = 4;
      }
      if (mapaBatalha == 31) {
        imgLilia = "./../img/jogo/player/lilia3.png";
        playerMaxHP += 80;
        energyMax += 3;
        energy += 3;
        maoInicio += 4;
        limiteMao += 4;
        playerShieldInit += 15;
        playerShield = playerShieldInit;
      } else if (mapaBatalha == 6) {
        imgLilia = "./../img/jogo/player/lilia2.png";
        playerMaxHP += 20;
        energyMax += 2;
        energy += 2;
        maoInicio += 2;
        limiteMao += 2;
      }

      updateHUD();
      drawNewCards();
      drawCards();
      playerImg.src = imgLilia;
      break;
    case "ferrus":
      playerImg.src = "./../img/jogo/player/sal2.png";
      playerMaxHP = 160, energyMax = 3, playerShieldInit = 0;
      playerHP = 80, energy = 3, playerShield = playerShieldInit;
      playerDeck = [...characterDecks.ferrus];
      break;
    case "tomoeh":
      playerImg.src = "./../img/jogo/player/sombra.png";
      playerMaxHP = 30, energyMax = 6, playerShieldInit = 0;
      playerHP = 30, energy = 6, playerShield = playerShieldInit;
      playerDeck = [...characterDecks.tomoeh];
      maoInicio = 9;
      limiteMao = 9;
      break;
    case "x":
      playerImg.src = "./../img/jogo/player/x.png";
      playerMaxHP = 200, energyMax = 2, playerShieldInit = 2;
      playerHP = 100, energy = 2, playerShield = playerShieldInit;
      playerDeck = [...characterDecks.x];
      maoInicio = 4;
      limiteMao = 4;
      break;
    case "wallace":
      playerImg.src = "./../img/jogo/player/wallace.png";
      playerMaxHP = 100, energyMax = 4, playerShieldInit = 0;
      playerHP = 100, energy = 4, playerShield = playerShieldInit;
      playerDeck = [...characterDecks.wallace];
      break;
    case "gaeaReen":
      playerImg.src = "./../img/jogo/player/kalenart.png";
      playerDeck = [...characterDecks.gaeaReen];
      playerHP = 10000
      energyMax = 400
      energy = 400
      maoInicio = 10;
      limiteMao = 10;
      break;
    case "olaf":
      playerImg.src = "./../img/jogo/player/olaf.png";
      playerDeck = [...characterDecks.olaf];
      break;
    case "olga":
      playerImg.src = "./../img/jogo/player/olga.png";
      playerDeck = [...characterDecks.olga];
      break;
    case "glacia":
      playerImg.src = "./../img/jogo/player/glacia.png";
      playerDeck = [...characterDecks.glacia];
      break;
    default:
      playerImg.src = "./../img/jogo/extra/prototipo.png";
      playerDeck = [...characterDecks.amarelo];
      break;
  }

  playerImg.alt = "Jogador";

  // Insere como primeiro elemento da div3
  div3.insertBefore(playerImg, div3.firstChild);
}

function configurarSelecaoPersonagem() {
  const personagensInfo = {
    vermelho: {
      nome: "🔥VIKLAV, O GENERAL SANGUINARIO🔥",
      dificuldade: "🔥NÍVEL DE DIFICULDADE: 💀💀💀🔥",
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
      dificuldade: "❄️NÍVEL DE DIFICULDADE: 💀💀❄️",
      cor: "rgb(128, 240, 255)",
      descricao: "Focado em enfraquecer e marcar o inimigo, deck de gelo capaz de causar muito estrago se usado sob condições favoraveis.",
      hp: 100,
      maxHp: 100,
      energia: 3,
      escudo: 0,
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
      dificuldade: "❄️NÍVEL DE DIFICULDADE: 💀💀❄️",
      cor: "rgb(128, 240, 255)",
      descricao: "Focado em enfraquecer e marcar o inimigo, deck de gelo capaz de causar muito estrago se usado sob condições favoraveis.",
      hp: 100,
      maxHp: 100,
      energia: 3,
      escudo: 0,
      mao: 5
    },
    glacia: {
      nome: "❄️GLACIA, VICE LIDER DOS PESQUISADORES❄️",
      dificuldade: "❄️NÍVEL DE DIFICULDADE: 💀💀❄️",
      cor: "rgb(128, 240, 255)",
      descricao: "Focado em enfraquecer e marcar o inimigo, deck de gelo capaz de causar muito estrago se usado sob condições favoraveis.",
      hp: 100,
      maxHp: 100,
      energia: 3,
      escudo: 0,
      mao: 5
    },
    laranja: {
      nome: "🐦‍🔥GABRIEL, O INABALÁVEL🐦‍🔥",
      dificuldade: "🐦‍🔥NÍVEL DE DIFICULDADE: 💀🐦‍🔥",
      cor: "rgb(255, 128, 0)",
      descricao: "Agressivo e ágil, perfeito para combates rápidos, causa múltiplos danos em um único alvo.",
      hp: 70,
      maxHp: 70,
      energia: 3,
      escudo: 0,
      mao: 6
    },
    azul: {
      nome: "⚓REINOR, O ESCUDO DA HUMANIDADE⚓",
      dificuldade: "⚓NÍVEL DE DIFICULDADE: 💀⚓",
      cor: "rgba(69, 89, 222, 1)",
      descricao: "Focado em defesa, extremamente defensivo, utiliza de seus escudos para se proteger e causar dano.",
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
      descricao: "Nem muito forte nem fraco, versátil e sabe como conseguir xenofluxo.",
      hp: 100,
      maxHp: 100,
      energia: 3,
      escudo: 0,
      mao: 5
    },
    celso: {
      nome: "⛏️CELSO, O ARQUEOLOGO⛏️",
      dificuldade: "⛏️NÍVEL DE DIFICULDADE: 💀⛏️",
      cor: "rgb(231, 201, 7)",
      descricao: "Nem muito forte nem fraco, versátil e sabe como conseguir xenofluxo.",
      hp: 100,
      maxHp: 100,
      energia: 3,
      escudo: 0,
      mao: 5
    },
    felipe: {
      nome: "⛏️FELIPE, GEO MAPEADOR⛏️",
      dificuldade: "⛏️NÍVEL DE DIFICULDADE: 💀⛏️",
      cor: "rgb(231, 201, 7)",
      descricao: "Nem muito forte nem fraco, versátil e sabe como conseguir xenofluxo.",
      hp: 100,
      maxHp: 100,
      energia: 3,
      escudo: 0,
      mao: 5
    },
    maria: {
      nome: "⛏️MARIA, ESPECIALISTA EM EXPLOSÕES⛏️",
      dificuldade: "⛏️NÍVEL DE DIFICULDADE: 💀⛏️",
      cor: "rgb(231, 201, 7)",
      descricao: "Nem muito forte nem fraco, versátil e sabe como conseguir xenofluxo.",
      hp: 100,
      maxHp: 100,
      energia: 3,
      escudo: 0,
      mao: 5
    },
    verde: {
      nome: "🌿JÃO, O CARA🌿",
      dificuldade: "🌿NÍVEL DE DIFICULDADE: 💀🌿",
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
      descricao: "Deck versátil, com um pouco de tudo e status balanceados.",
      hp: 100,
      maxHp: 100,
      energia: 3,
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
      dificuldade: "⚒️NÍVEL DE DIFICULDADE: 💀💀💀⚒️",
      cor: "rgb(103, 67, 0)",
      descricao: "Deck focado inteiramente em reciclagem, quem diria que reciclar seria bom para todos os lados.",
      hp: 80,
      maxHp: 160,
      energia: 3,
      escudo: 0,
      mao: 5
    },
    wallace: {
      nome: "🌿WALLACE, O ESPECTRO DA FLORESTA🌿",
      dificuldade: "🌿NÍVEL DE DIFICULDADE: NULL🌿",
      cor: "rgb(0, 188, 16)",
      descricao: "NULL",
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
      descricao: "Estrategista em causar dano na linha de trás, sabe se defender bem e usa isso a seu favor.",
      hp: 110,
      maxHp: 110,
      energia: 3,
      escudo: 5,
      mao: 5
    },
    mercuri: {
      nome: "⚓MERCURI, GUARDA PORTO⚓",
      dificuldade: "⚓NÍVEL DE DIFICULDADE: 💀💀⚓",
      cor: "rgba(69, 89, 222, 1)",
      descricao: "Estrategista em causar dano na linha de trás, sabe se defender bem e usa isso a seu favor.",
      hp: 110,
      maxHp: 110,
      energia: 3,
      escudo: 5,
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
      dificuldade: "🌿NÍVEL DE DIFICULDADE: NULL🌿",
      cor: "rgb(0, 188, 16)",
      descricao: "NULL",
      hp: 100,
      maxHp: 100,
      energia: 3,
      escudo: 0,
      mao: 5
    },
    x: {
      nome: "🔮#####, A ESQUECIDA🔮",
      dificuldade: "🔮NÍVEL DE DIFICULDADE: NULL🔮",
      cor: "rgb(0, 114, 129)",
      descricao: "NULL",
      hp: 100,
      maxHp: 200,
      energia: 2,
      escudo: 2,
      mao: 4
    }
  };

  const descBox = document.getElementById("descPersonagem");
  const imagens = document.querySelectorAll("#selecaoPlayer img");

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
}

const deck = [];
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
    name: "Chuva de Laminas",
    cost: 0,
    basePower: 5,
    rarity: "cintilante",
    img: "../img/jogo/cards/cintilante/chuvaDeLaminas.jpg",
    desc: "Cause dano em area 5/10/15/20/30/40, e gaste energia respectivamente  0/1/2/3/4/5",
    type: "cintilante"
  },
  {
    name: "Combustão",
    cost: 1,
    basePower: 0,
    rarity: "fire",
    img: "../img/jogo/cards/fire/combustao.png",
    desc: "Marca o inimigo com FIRE",
    type: "fire"
  },
  {
    name: "Chuva De Fogo",
    cost: 1,
    basePower: 0,
    rarity: "fire",
    img: "../img/jogo/cards/fire/chuvaDeFogo.png",
    desc: "Marca todos os inimigos com FIRE",
    type: "fire"
  },
  {
    name: "Soterrar",
    cost: 1,
    basePower: 0,
    rarity: "terra",
    img: "../img/jogo/cards/terra/soterra.jpg",
    desc: "Marca o inimigo com EARTH",
    type: "terra"
  },
  {
    name: "Deslizamento",
    cost: 1,
    basePower: 0,
    rarity: "terra",
    img: "../img/jogo/cards/terra/deslizamento.jpg",
    desc: "Marca todos os inimigos com EARTH",
    type: "terra"
  },
  {
    name: "Jato De Água",
    cost: 1,
    basePower: 0,
    rarity: "agua",
    img: "../img/jogo/cards/agua/jatoAgua.png",
    desc: "Marca o inimigo com WATER",
    type: "agua"
  },
  {
    name: "Mar Denso",
    cost: 1,
    basePower: 0,
    rarity: "agua",
    img: "../img/jogo/cards/agua/afogado.png",
    desc: "Marca todos os inimigos com WATER",
    type: "agua"
  },
  {
    name: "Gelo Mortal",
    cost: 2,
    basePower: 1,
    rarity: "frost",
    img: "../img/jogo/cards/frost/geloMortal.png",
    desc: "Marca com FROST e reduz 1 de dano do inimigo (Não fica a baixo de 1) e muda sua ação para ataque normal",
    type: "frost"
  },
  {
    name: "Nevasca Mortal",
    cost: 3,
    basePower: 1,
    rarity: "frost",
    img: "../img/jogo/cards/frost/nevasca.png",
    desc: "Marca com FROST e reduz 1 de dano de todos os inimigos (Não fica a baixo de 1) e muda sua ação para ataque normal",
    type: "frost"
  },
  {
    name: "Marcar",
    cost: 0,
    basePower: 0,
    rarity: "frost",
    img: "../img/jogo/cards/frost/congelar.png",
    desc: "Marca o inimigo com FROST",
    type: "frost"
  },
  {
    name: "Cemiterio Branco",
    cost: 2,
    basePower: 0,
    rarity: "frost",
    img: "../img/jogo/cards/frost/cemiterioBranco.png",
    desc: "Marca todos os inimigos com FROST",
    type: "frost"
  },
  {
    name: "Ataque Condensado",
    cost: 1,
    basePower: 8,
    rarity: "frost",
    img: "../img/jogo/cards/frost/atkGelido.png",
    desc: "Cause 8 de dano, se o inimigo estiver marcado cause X3",
    type: "frost"
  },
  {
    name: "Defesa Condensada",
    cost: 1,
    basePower: 3,
    rarity: "frost",
    img: "../img/jogo/cards/frost/defGelida.png",
    desc: "Ganhe 3 de armadura por cada carta do tipo frost na mão e X1 por cada inimigo marcado",
    type: "frost"
  },
  {
    name: "Xenofluxo Glacial",
    cost: 0,
    basePower: 1,
    rarity: "frost",
    img: "../img/jogo/cards/frost/degelo.png",
    desc: "Ganhe 1 de energia por cada inimigo marcado",
    type: "frost"
  },
  {
    name: "Coração Frio",
    cost: 1,
    basePower: 1,
    rarity: "frost",
    img: "../img/jogo/cards/frost/vidaGelida.png",
    desc: "Ganhe 1 de vida por cada carta do tipo frost na mão e X1 por cada inimigo marcado",
    type: "frost"
  },
  {
    name: "Baralho Glacial",
    cost: 1,
    basePower: 1,
    rarity: "frost",
    img: "../img/jogo/cards/frost/cardGelidas.png",
    desc: "Compre 1 carta do seu deck (Exceto eu) por cada inimigo marcado",
    type: "frost"
  },
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
    desc: "Cause 7 de dano, +7 sem sem escudo, +7 com 30 ou menos de vida.",
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
    basePower: 6,
    rarity: "rare",
    img: "../img/jogo/cards/atk/tiroCarregado.png",
    desc: "Ataca 2 vezes com 6 de dano cada.",
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
    desc: "Cause 30 de dano em area, a cada inimigo no campo receba 15 de dano (max 45).",
    type: "attack"
  },
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
    name: "Campo Presurizado",
    cost: 1,
    basePower: 20,
    rarity: "rare",
    img: "../img/jogo/cards/def/campoPresurizado.png",
    desc: "Se só tiver 1 carta na mão ganhe 20 de escudo.",
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
    name: "Ritual",
    cost: 2,
    basePower: 20,
    rarity: "common",
    img: "../img/jogo/cards/buff/ritual.png",
    desc: "Recupera 20 de vida se eu for a unica carta na mão, caso contrario perca vida.",
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
    desc: "Se você tiver 3 cartas ou menos na mão clone 2 cartas (Exceto ela mesma), se tiver mais ganhe 2 de energia.",
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
    desc: "Perca 4 de vida e cause 12 de dano.",
    type: "heal"
  },
  {
    name: "Compra Dupla",
    cost: 1,
    basePower: 1,
    rarity: "rare",
    img: "../img/jogo/cards/buff/comprarCarta.png",
    desc: "Compra 2 cartas aleatórias.",
    type: "heal"
  },
  {
    name: "Recicladora",
    cost: 1,
    basePower: 8,
    rarity: "legend",
    img: "../img/jogo/cards/reciclagem/reciclagem.png",
    desc: "Cause dano igual a 30% de todo lixo reciclado (Arredondado para baixo).",
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
    desc: "Cause 7 de dano por cada lixo reciclado, se sua vida estiver em 30 ou menos cause X2.",
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
    desc: "Recicla lixo, ganhe 1 de energia a cada 2 lixos reciclados (Arredondado para baixo).",
    type: "reciclagem"
  },
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
    desc: "Tudo pode ser reciclado, mas certas coisas custão muito caro...",
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

// 💞 inicio da batalha aumenta a vida maxima dos aliados adjacentes em 15 (dura até apos a morte)
// 💤 eu disperto e revivo mais forte
// ⚔️/❄️ atk normal
// 🔱 ignora armadura
// 🩸 Eu morro após atacar 3 vezes
// 💚 prioriza curar aliados
// 💊 auto cura
// 🪬 quando todos que tem esse status morrem, geram um novo inimigo
// 🧿 imune a marcação de vida e ataque
// (⚔️)💥 chance de (30%) crit X2 (apenas ações dentro do parenteses)
// (⚔️)🧨 chance de (15%) crit X4 (apenas ações dentro do parenteses)
// (⚔️)💣 chance de (10%) crit X5 (apenas ações dentro do parenteses)
// ⚔️🎭💚 se não puder executar a primeira ação executa a segunda
// ⚔️❓💚 pode executar 2 ações, ou uma ou outra que esta adjacente (50% de chance)
// ⚔️❔💚 pode executar 2 ações, ou uma ou outra que esta adjacente, porém uma possui mais chance que a outra
// 🩸💫⚜️✨💤🤢🥶💀👾☠️👻🧿🪬🌟🔥💧⚡ n criado

// NORMAL
const normalModels = [
  // 111111111111111111111
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
      tipoVida: "❤️",
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
      tipoVida: "❤️",
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
      tipoVida: "❤️",
      zona: 1
    }
  ],
  [
    {
      name: "Rinoceronte corrompido",
      hp: 30,
      dano: 4,
      behavior: () => [
        { type: "attackVida", value: 4 }
      ],
      img: "../img/jogo/inimigos/rino.png",
      tipoDano: "🔱",
      tipoVida: "💞",
      zona: 1
    },
    {
      name: "formiga sentinela",
      hp: 30,
      dano: 6,
      behavior: () => [
        { type: "attack", value: 6 }
      ],
      img: "../img/jogo/inimigos/formiga.png",
      tipoDano: "⚔️",
      tipoVida: "❤️",
      zona: 1
    }
  ],
  [
    {
      name: "formiga sentinela",
      hp: 15,
      dano: 6,
      behavior: () => [
        { type: "attack", value: 6 }
      ],
      img: "../img/jogo/inimigos/formiga.png",
      tipoDano: "⚔️",
      tipoVida: "❤️",
      zona: 1
    },
    {
      name: "formiga sentinela",
      hp: 15,
      dano: 6,
      behavior: () => [
        { type: "attack", value: 6 }
      ],
      img: "../img/jogo/inimigos/formiga.png",
      tipoDano: "⚔️",
      tipoVida: "❤️",
      zona: 1
    }
  ],
  [
    {
      name: "Tartaruga",
      hp: 34,
      dano: 6,
      behavior: () => [{ type: "attack", value: 6 }],
      img: "../img/jogo/inimigos/minion.png",
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
      name: "Drone agricola",
      hp: 8,
      dano: 6,
      behavior: () => [{ type: "attackVida", value: 6 }],
      img: "../img/jogo/inimigos/inimigo5.png",
      tipoDano: "🔱",
      tipoVida: "❤️",
      zona: 1
    },
    {
      name: "Drone agricola",
      hp: 8,
      dano: 6,
      behavior: () => [{ type: "attackVida", value: 6 }],
      img: "../img/jogo/inimigos/inimigo5.png",
      tipoDano: "🔱",
      tipoVida: "❤️",
      zona: 1
    }
  ],
  [
    {
      name: "Tartaruga",
      hp: 34,
      dano: 6,
      behavior: () => [{ type: "attack", value: 6 }],
      img: "../img/jogo/inimigos/minion.png",
      tipoDano: "⚔️",
      tipoVida: "❤️",
      zona: 1
    },
    {
      name: "Tatu corrompido",
      hp: 25,
      dano: 8,
      behavior: () => [{ type: "attack", value: 8 }],
      img: "../img/jogo/inimigos/tatu.png",
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
  // 222222222222222222222
  [
    {
      name: "Robo Cargueiro",
      hp: 60,
      dano: 12,
      behavior: () => [{ type: "attack", value: 12 }],
      img: "../img/jogo/inimigos/roboCargueiro.png",
      tipoDano: "⚔️",
      tipoVida: "❤️",
      zona: 2
    }
  ],
  [
    {
      name: "Gaivota Corrompida",
      hp: 15,
      dano: 5,
      behavior: () => [
        { type: "attackVida", value: 5 }
      ],
      img: "../img/jogo/inimigos/gaivota.png",
      tipoDano: "🔱",
      tipoVida: "❤️",
      zona: 2
    },
    {
      name: "Afogado",
      hp: 55,
      dano: 7,
      behavior: () => [
        { type: "attackVida", value: Math.random() < 0.7 ? 7 : 14 }
      ],
      img: "../img/jogo/inimigos/mergulhador.png",
      tipoDano: "(🔱)💥",
      tipoVida: "💧",
      zona: 2
    }
  ],
  [
    {
      name: "Marinheiro",
      hp: 45,
      dano: 16,
      behavior: () => [
        { type: "attack", value: 16 }
      ],
      img: "../img/jogo/inimigos/marinheiro.png",
      tipoDano: "⚔️",
      tipoVida: "💧",
      zona: 2
    },
    {
      name: "Marinheiro Reciclado",
      hp: 30,
      dano: 12,
      behavior: () => [
        { type: "attack", value: 12 }
      ],
      img: "../img/jogo/inimigos/marinheiroDeLixo.png",
      tipoDano: "⚔️",
      tipoVida: "💧",
      zona: 2
    }
  ],
  [
    {
      name: "Gaivota Corrompida",
      hp: 15,
      dano: 5,
      behavior: () => [
        { type: "attackVida", value: 5 }
      ],
      img: "../img/jogo/inimigos/gaivota.png",
      tipoDano: "🔱",
      tipoVida: "❤️",
      zona: 2
    },
    {
      name: "Marinheiro Reciclado",
      hp: 30,
      dano: 12,
      behavior: () => [
        { type: "attack", value: 12 }
      ],
      img: "../img/jogo/inimigos/marinheiroDeLixo.png",
      tipoDano: "⚔️",
      tipoVida: "💧",
      zona: 2
    }
  ],
  [
    {
      name: "Marinheiro Reciclado",
      hp: 30,
      dano: 12,
      behavior: () => [
        { type: "attack", value: 12 }
      ],
      img: "../img/jogo/inimigos/marinheiroDeLixo.png",
      tipoDano: "⚔️",
      tipoVida: "💧",
      zona: 2
    },
    {
      name: "Marinheiro Reciclado",
      hp: 30,
      dano: 12,
      behavior: () => [
        { type: "attack", value: 12 }
      ],
      img: "../img/jogo/inimigos/marinheiroDeLixo.png",
      tipoDano: "⚔️",
      tipoVida: "💧",
      zona: 2
    }
  ],
  [
    {
      name: "Gaivota Corrompida",
      hp: 15,
      dano: 5,
      behavior: () => [
        { type: "attackVida", value: 5 }
      ],
      img: "../img/jogo/inimigos/gaivota.png",
      tipoDano: "🔱",
      tipoVida: "❤️",
      zona: 2
    },
    {
      name: "Gaivota Corrompida",
      hp: 15,
      dano: 5,
      behavior: () => [
        { type: "attackVida", value: 10 }
      ],
      img: "../img/jogo/inimigos/gaivota.png",
      tipoDano: "🔱",
      tipoVida: "❤️",
      zona: 2
    }
  ],
  // 333333333333333333333
  [
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
  [
    {
      name: "Casca Grossa",
      hp: 65,
      dano: 5,
      behavior: () => [
        { type: "attack", value: 5 }
      ],
      img: "../img/jogo/inimigos/cascaGrossa.png",
      tipoDano: "⚔️",
      tipoVida: "❤️",
      zona: 3
    },
    {
      name: "IA sacerdotisa",
      hp: 24,
      dano: 2,
      behavior: () => [{ type: "heal", value: Math.random() < 0.7 ? 2 : 4 }],
      img: "../img/jogo/inimigos/sacerdotisa.png",
      tipoDano: "(💚🎭💊)💥",
      tipoVida: "❤️",
      zona: 3
    },
  ],
  [
    {
      name: "Sacerdote Guerreiro",
      hp: 40,
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
      name: "Sacerdote Guerreiro",
      hp: 40,
      dano: 8,
      behavior: () => [
        { type: "attack", value: 8 }
      ],
      img: "../img/jogo/inimigos/sacerdoteGuerreiro.png",
      tipoDano: "⚔️",
      tipoVida: "❤️",
      zona: 3
    },
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
      name: "Valquiria",
      hp: 40,
      dano: 7,
      behavior: () => [{ type: "attackVida", value: 7 }],
      img: "../img/jogo/inimigos/valquiria.png",
      tipoDano: "🔱",
      tipoVida: "❤️",
      zona: 3
    },
  ],
  // 444444444444444444444
  [
    {
      name: "Cão Corrompido",
      hp: 50,
      dano: 12,
      behavior: () => [{ type: "attack", value: Math.random() < 0.7 ? 12 : 24 }],
      img: "../img/jogo/inimigos/cachorroPolicial.png",
      tipoDano: "(⚔️)💥",
      tipoVida: "❤️",
      zona: 4
    },
    {
      name: "Sentinela Corrompido",
      hp: 80,
      dano: 25,
      behavior: () => [{ type: "attack", value: 25 }],
      img: "../img/jogo/inimigos/sentinelaCorrompido.png",
      tipoDano: "⚔️",
      tipoVida: "❤️",
      zona: 4
    }
  ],
  [
    {
      name: "Vagante",
      hp: 35,
      dano: 12,
      behavior: () => [{ type: "attackVida", value: 12 }],
      img: "../img/jogo/inimigos/ceifadorFantasma.png",
      tipoDano: "🔱",
      tipoVida: "🧿",
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
      name: "Livro Corrompido",
      hp: 30,
      dano: 20,
      behavior: () => [{ type: "attack", value: 20 }],
      img: "../img/jogo/inimigos/livroMaligno.png",
      tipoDano: "⚔️",
      tipoVida: "❤️",
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
      name: "Vagante",
      hp: 35,
      dano: 12,
      behavior: () => [{ type: "attackVida", value: 12 }],
      img: "../img/jogo/inimigos/ceifadorFantasma.png",
      tipoDano: "🔱",
      tipoVida: "🧿",
      zona: 4
    },
    {
      name: "Vagante",
      hp: 35,
      dano: 12,
      behavior: () => [{ type: "attackVida", value: 12 }],
      img: "../img/jogo/inimigos/ceifadorFantasma.png",
      tipoDano: "🔱",
      tipoVida: "🧿",
      zona: 4
    }
  ],
  [
    {
      name: "Vagante",
      hp: 35,
      dano: 12,
      behavior: () => [{ type: "attackVida", value: 12 }],
      img: "../img/jogo/inimigos/ceifadorFantasma.png",
      tipoDano: "🔱",
      tipoVida: "🧿",
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
      name: "Livro Corrompido",
      hp: 30,
      dano: 20,
      behavior: () => [{ type: "attack", value: 20 }],
      img: "../img/jogo/inimigos/livroMaligno.png",
      tipoDano: "⚔️",
      tipoVida: "❤️",
      zona: 4
    }
  ],
  // 555555555555555555555
  [
    {
      name: "Guarda",
      hp: 70,
      dano: 20,
      behavior: () => [{ type: "attack", value: 20 }],
      img: "../img/jogo/inimigos/guarda.png",
      tipoDano: "⚔️",
      tipoVida: "🧿",
      zona: 5
    },
    {
      name: "Guarda",
      hp: 70,
      dano: 20,
      behavior: () => [{ type: "attack", value: 20 }],
      img: "../img/jogo/inimigos/guarda.png",
      tipoDano: "⚔️",
      tipoVida: "🧿",
      zona: 5
    }
  ],
  [
    {
      name: "Drone De Combate",
      hp: 35,
      dano: 10,
      behavior: () => [{ type: "attackVida", value: 10 }],
      img: "../img/jogo/inimigos/droneCombate.png",
      tipoDano: "🔱",
      tipoVida: "❤️",
      zona: 5
    },
    {
      name: "Drone De Combate",
      hp: 35,
      dano: 10,
      behavior: () => [{ type: "attackVida", value: 10 }],
      img: "../img/jogo/inimigos/droneCombate.png",
      tipoDano: "🔱",
      tipoVida: "❤️",
      zona: 5
    }
  ],
  [
    {
      name: "Guarda",
      hp: 70,
      dano: 20,
      behavior: () => [{ type: "attack", value: 20 }],
      img: "../img/jogo/inimigos/guarda.png",
      tipoDano: "⚔️",
      tipoVida: "🧿",
      zona: 5
    },
    {
      name: "Guarda Valquiria",
      hp: 55,
      dano: 18,
      behavior: () => [{ type: "attackVida", value: 18 }],
      img: "../img/jogo/inimigos/guardaValk.png",
      tipoDano: "🔱",
      tipoVida: "❤️",
      zona: 5
    }
  ],
  [
    {
      name: "Guarda",
      hp: 70,
      dano: 20,
      behavior: () => [{ type: "attack", value: 20 }],
      img: "../img/jogo/inimigos/guarda.png",
      tipoDano: "⚔️",
      tipoVida: "🧿",
      zona: 5
    },
    {
      name: "Guarda Forte",
      hp: 65,
      dano: 22,
      behavior: () => [{ type: "attack", value: Math.random() < 0.7 ? 22 : 44 }],
      img: "../img/jogo/inimigos/artilheiro.png",
      tipoDano: "(⚔️)💥",
      tipoVida: "🧿",
      zona: 5
    }
  ],
  [
    {
      name: "Guarda",
      hp: 70,
      dano: 20,
      behavior: () => [{ type: "attack", value: 20 }],
      img: "../img/jogo/inimigos/guarda.png",
      tipoDano: "⚔️",
      tipoVida: "🧿",
      zona: 5
    },
    {
      name: "Guarda Médico",
      hp: 50,
      dano: 20,
      behavior: () => [{ type: Math.random() < 0.5 ? "attack" : "heal", value: 20 }],
      img: "../img/jogo/inimigos/guardaMedico.png",
      tipoDano: "⚔️❓💚🎭💊",
      tipoVida: "❤️",
      zona: 5
    }
  ]
];

// ELITE
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
      tipoVida: "❤️",
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
      tipoVida: "❤️",
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
      tipoVida: "❤️",
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
      tipoVida: "❤️",
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
      dano: 16,
      behavior: () => [
        { type: "attack", value: 16 }
      ],
      img: "../img/jogo/inimigos/marinheiro.png",
      tipoDano: "⚔️",
      tipoVida: "💧",
      zona: 2
    },
    {
      name: "Marinheiro Reciclado",
      hp: 30,
      dano: 12,
      behavior: () => [
        { type: "attack", value: 12 }
      ],
      img: "../img/jogo/inimigos/marinheiroDeLixo.png",
      tipoDano: "⚔️",
      tipoVida: "💧",
      zona: 2
    },
    {
      name: "Capitão",
      hp: 55,
      dano: 8,
      behavior: () => [
        { type: "attack", value: 8 }
      ],
      img: "../img/jogo/inimigos/capitao.png",
      tipoDano: "🔱",
      tipoVida: "💧",
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
      tipoVida: "❤️",
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
      dano: 15,
      behavior: () => [
        { type: Math.random() < 0.6 ? "attack" : "attackVida", value: Math.random() < 0.7 ? 15 : 30 }
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
      tipoVida: "❤️",
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

// BOSS
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
      tipoVida: "❤️",
      zona: 1
    },
    {
      name: "Boss Alfa",
      hp: 100,
      dano: 10,
      behavior: () => [{ type: "attackVida", value: 10 }],
      img: "../img/jogo/inimigos/bossLobo.png",
      tipoDano: "🔱",
      tipoVida: "❤️",
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
      tipoVida: "❤️",
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
      tipoVida: "💧",
      zona: 2
    },
    {
      name: "Boss Prj.Kraken",
      hp: 100,
      dano: 8,
      behavior: () => [{ type: Math.random() < 0.5 ? "attack" : "attackVida", value: Math.random() < 0.7 ? 8 : 16 }],
      img: "../img/jogo/inimigos/bossKraken.png",
      tipoDano: "(⚔️❓🔱)💥",
      tipoVida: "💧",
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
      tipoVida: "💧",
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
      img: "../img/jogo/inimigos/medo.png",
      tipoDano: "(💚🎭💊)💥",
      tipoVida: "💤",
      zona: 4
    }
  ],
  // 5555555555555555
  [
    {
      name: "IA",
      hp: 250,
      maxHp: 250,
      dano: 38,
      behavior: () => [{ type: Math.random() < 0.75 ? "attack" : "attackVida", value: 38 }],
      img: "../img/jogo/inimigos/bossIa.png",
      tipoDano: "⚔️❔🔱",
      tipoVida: "🧿",
      zona: 5
    }
  ]
];

function createEnemy(imgSrc) {
  const div = document.createElement("div");
  div.className = "enemy";
  div.innerHTML = `<img src="${imgSrc}" alt="Inimigo">`;
  document.getElementById("enemies").appendChild(div);
  return div;
}

let enemies = [];
let zonaAtual = 1;

function spawnEnemies(tipo) {
  playerShield = playerShieldInit;
  const enemiesContainer = document.getElementById("enemies");
  enemiesContainer.innerHTML = "";
  document.getElementById("lifeBarsContainer").innerHTML = "";

  // --- define zona atual com base no mapa ---
  if (mapaBatalha >= 40) zonaAtual = 5;
  else if (mapaBatalha >= 30) zonaAtual = 4;
  else if (mapaBatalha >= 20) zonaAtual = 3;
  else if (mapaBatalha >= 10) zonaAtual = 2;

  // --- seleciona pool conforme tipo ---
  let pool;
  switch (tipo) {
    case "inimigo": pool = normalModels; break;
    case "elite": pool = eliteModels; break;
    case "boss": pool = bossModels; break;
    default:
      console.warn("Tipo desconhecido:", tipo);
      return;
  }

  // --- filtra inimigos pela zona ---
  const blocosZona = pool.filter(grupo =>
    grupo.some(enemy => enemy.zona === zonaAtual)
  );

  if (blocosZona.length === 0) {
    console.warn("Nenhum inimigo encontrado para zona:", zonaAtual, tipo);
    return;
  }

  // --- escolhe bloco aleatório compatível ---
  const block = blocosZona[Math.floor(Math.random() * blocosZona.length)];

  // --- instancia inimigos ---
  block.forEach(base => {
    const enemy = {
      name: base.name,
      hp: base.hp,
      maxHp: base.hp,
      dano: base.dano,
      behavior: base.behavior,
      tipoDano: base.tipoDano,
      tipoVida: base.tipoVida,
      el: createEnemy(base.img)
    };

    enemies.push(enemy);
    enemy.el.style.display = "inline-block";

    const lifeBar = document.createElement("p");
    lifeBar.className = "enemy-bar";
    lifeBar.innerHTML = `
      <strong> ⟪ ${enemy.name} ⟫ </strong><br>
      ⟪ <span class="enemy-vida">${enemy.tipoVida}</span> 
         <span class="enemy-hp">${enemy.hp}</span> - 
         <span class="enemy-dano">${enemy.tipoDano} ${enemy.dano}</span> ⟫
    `;
    document.getElementById("lifeBarsContainer").appendChild(lifeBar);

    enemy.barEl = lifeBar.querySelector(".enemy-hp");
    enemy.dmgEl = lifeBar.querySelector(".enemy-dano");
    enemy.tipoVidaEl = lifeBar.querySelector(".enemy-vida");
  });
}


function updateEnemyBars() {
  enemies.forEach(enemy => {
    if (enemy.barEl) enemy.barEl.textContent = enemy.hp; // HP
    if (enemy.dmgEl) enemy.dmgEl.textContent = `${enemy.tipoDano} ${enemy.dano}`; // Dano
    if (enemy.tipoVidaEl) enemy.tipoVidaEl.textContent = enemy.tipoVida; // tipoVida
  });
}


function displayInimigos() {
  document.getElementById("enemies").style.display = "flex";
  document.getElementById("lifeBarsContainer").style.display = "flex";
}

function updateHUD() {
  document.getElementById("hp").textContent = `${playerHP} / ${playerMaxHP} | 🛡️ ${playerShield}  `;
  document.getElementById("energy").textContent = energy;

  enemies.forEach(e => {
    if (e.barEl) e.barEl.textContent = e.hp > 0 ? e.hp : 0;
  });
}

let floatQueue = [];
let showingFloat = false;

function floatText(target, text, color) {
  // Adiciona à fila
  floatQueue.push({ target, text, color });

  // Se já estiver mostrando, não dispara outra
  if (!showingFloat) processFloatQueue();
}

function processFloatQueue() {
  if (floatQueue.length === 0) {
    showingFloat = false;
    return;
  }

  showingFloat = true;
  const { target, text, color } = floatQueue.shift();

  const div = document.createElement("div");
  div.className = "float-text";
  div.style.color = color;
  div.style.fontWeight = "bold";
  div.style.position = "absolute";
  div.style.opacity = "1";
  div.style.pointerEvents = "none";
  div.innerText = text;
  document.body.appendChild(div);

  // 🔹 Posição inicial
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;

  if (target && target.getBoundingClientRect) {
    const rect = target.getBoundingClientRect();
    x = rect.left + rect.width / 2 + window.scrollX;
    y = rect.top + window.scrollY - 20;
  }

  div.style.left = x + "px";
  div.style.top = y + "px";
  div.style.transform = "translateX(-50%)";

  // 🔹 Duração customizada
  const isAylaQuote = text.length > 10 && color === "violet"; // detecta fala da Ayla
  const duration = isAylaQuote ? 3000 : 250; // ← tempo total: 2s Ayla / 0.25s padrão

  // 🔹 Animação
  setTimeout(() => {
    div.style.transition = `all ${duration / 1000}s ease-out`;
    div.style.opacity = "0";
    div.style.top = (y - (isAylaQuote ? 80 : 40)) + "px";
  }, 50);

  // 🔹 Remover e processar próximo
  setTimeout(() => {
    div.remove();
    processFloatQueue();
  }, duration + 100);
}


function glowPlayer(color) {
  const p = document.getElementById("player");
  p.classList.remove("glow-blue", "glow-green");
  if (color === "blue") p.classList.add("glow-blue");
  if (color === "green") p.classList.add("glow-green");
  if (color === "cintilante") p.classList.add("glow-cintilante");
  setTimeout(() => p.classList.remove("glow-blue", "glow-green", "glow-cintilante"), 1000);
}

function animateDamage(el) {
  el.classList.add("shake", "damaged");
  setTimeout(() => el.classList.remove("shake", "damaged"), 400);
}



function drawCards() {
  const cards = document.getElementById("cards");
  cards.innerHTML = "";
  deck.forEach((card, i) => {
    const div = document.createElement("div");
    // Determina o tipo da carta
    let tipo = "";
    switch (card.name) {
      // 46
      //✨✨✨✨✨ CINTILANTE 2 ✨✨✨✨✨
      case "GÆPROTOCOL":
      case "Guardião":
      case "Armamento Pesado":
      case "Chuva de Laminas":
        tipo = "cintilante";
        break;
      //🔥🔥🔥🔥🔥 FIRE 2 🔥🔥🔥🔥🔥
      case "Combustão":
      case "Chuva De Fogo":
        tipo = "fire";
        break;
      //⛰️⛰️⛰️⛰️⛰️ TERRA 2 ⛰️⛰️⛰️⛰️⛰️
      case "Soterrar":
      case "Deslizamento":
        tipo = "terra";
        break;
      //💧💧💧💧💧 AGUA 2 💧💧💧💧💧
      case "Jato De Água":
      case "Mar Denso":
        tipo = "agua";
        break;
      //❄️❄️❄️❄️❄️ FROST ❄️❄️❄️❄️❄️
      case "Gelo Mortal":
      case "Marcar":
      case "Cemiterio Branco":
      case "Ataque Condensado":
      case "Defesa Condensada":
      case "Xenofluxo Glacial":
      case "Coração Frio":
      case "Baralho Glacial":
      case "Nevasca Mortal":
        tipo = "frost";
        break;
      // ⚔️⚔️⚔️⚔️⚔️ ATAQUE 11 ⚔️⚔️⚔️⚔️⚔️
      case "Ataque":
      case "Ceifa":
      case "Desprezo":
      case "Broca Perfurante":
      case "Artilharia Anti Sniper":
      case "Ataque Rapido":
      case "Ataque Preciso":
      case "Liderança":
      case "Furia":
      case "Drone de Ataque":
      case "Vingativo":
      case "Rebeldia":
      case "Impacto Bruto":
      case "Fogo Amigo":
      case "Drenagem":
      case "Beserck":
      case "Explosão":
      case "Chuva De Fragmentos":
      case "Rajada Dupla":
        tipo = "attack";
        break;
      // 🛡️🛡️🛡️🛡️🛡️ DEFESA 10 🛡️🛡️🛡️🛡️🛡️
      case "Defesa":
      case "Tsunami":
      case "Campo de Força Instavel":
      case "Campo de Força Fraco":
      case "Campo Presurizado":
      case "Blindagem Vital":
      case "Defesa Salvadora":
      case "Ultima Defesa":
      case "Drone Defensivo":
      case "Escudo Triangular":
      case "Arpão":
      case "Defesa Lunar":
      case "Campo Presurizado":
      case "Em guarda":
      case "Indestrutivel":
      case "Sistema de reflexão":
      case "Escudo Retaliante":
      case "Impulso Defensivo":
      case "PROTOCOL-Campo De Força":
      case "Brilhando":
      case "Escudo":
        tipo = "defense";
        break;
      // 💚💚💚💚💚 SUPORTE 8 💚💚💚💚💚
      case "Cura":
      case "Ritual":
      case "Cura Forte":
      case "Estratégia":
      case "Limite da Vida":
      case "Xenofluxo":
      case "Drone Médico":
      case "Sob-Vigia":
      case "Mineração":
      case "PROTOCOL-Reforço Estrutural":
      case "Impulso":
      case "Golpe Neural Retaliante":
      case "Compra Dupla":
      case "Sobre Carga":
        tipo = "heal";
        break;
      //  ♻️♻️♻️♻️♻️ RECICLAGEM 6 ♻️♻️♻️♻️♻️
      case "Recicladora":
      case "Drone de Coleta":
      case "Ataque Reciclável":
      case "Terror Critico":
      case "Defesa Reciclável":
      case "Xenofluxo Reciclável":
      case "Destruir Carta":
        tipo = "reciclagem";
        break;
      //  🗑️🗑️🗑️🗑️🗑️ LIXO 9 🗑️🗑️🗑️🗑️🗑️
      case "Entulho":
      case "Drone Quebrado":
      case "Lixo quimico":
      case "Cura Quebrada":
      case "Arma Quebrada":
      case "Escudo quebrado":
      case "Restos de mecha":
      case "Ferro Velho":
        tipo = "lixo";
        break;
    }

    div.className = `card ${card.rarity} ${tipo}`;
    div.innerHTML = `
          <img src="${card.img}" alt="${card.name}">
          <div class="energia"><strong>${card.cost}</strong></div>
          <div class="desc"><strong>${card.name}</strong><br><em>${card.desc}</em></div>
        `;
    div.onclick = () => {
      if (energy < card.cost || playerHP <= 0 || enemies.length === 0) return;
      energy -= card.cost;

      //  ⚔️⚔️⚔️⚔️⚔️ ATAQUE ⚔️⚔️⚔️⚔️⚔️
      if (card.name === "Ataque") {
        animateDamage(enemies[0].el);
        enemies[0].hp -= card.power;
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
      }
      //⚔️
      else if (card.name === "Ceifa") {
        let dano = card.power;
        const alvo = [...enemies].reverse().find(e => e.hp > 0);
        if (alvo.hp <= 30) {
          dano *= 3;
        }
        if (alvo) {
          animateDamage(alvo.el);
          alvo.hp -= dano;
          floatText(alvo.el, `-${dano}⚔️`, "red");
        }
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
      }
      //⚔️
      else if (card.name === "Desprezo") {
        const alvo = [...enemies].reverse().find(e => e.hp > 0);
        if (alvo) {
          animateDamage(alvo.el);
          alvo.hp -= card.power;
          floatText(alvo.el, `-${card.power}⚔️`, "red");
        }
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
      }
      //⚔️
      else if (card.name === "Broca Perfurante") {
        let dano = card.power;
        if (deck.length <= 3) {
          dano *= 2;
        }
        // pega o último inimigo vivo
        const alvo = [...enemies].reverse().find(e => e.hp > 0);
        if (alvo) {
          animateDamage(alvo.el);
          alvo.hp -= dano;
          floatText(alvo.el, `-${dano}⚔️`, "red");
        }
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
      }
      //⚔️
      else if (card.name === "Artilharia Anti Sniper") {
        val = deck.length;
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
        if (val <= 3) {
          deck.push({ ...allCards.find(c => c.name === "Broca Perfurante"), power: 8, cost: 0 });
          deck.push({ ...allCards.find(c => c.name === "Ceifa"), power: 12, cost: 1 });
          deck.push({ ...allCards.find(c => c.name === "Desprezo"), power: 20, cost: 1 });
        }
      }
      //⚔️
      else if (card.name === "Ataque Rapido") {
        animateDamage(enemies[0].el);
        enemies[0].hp -= card.power;
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
      }
      //⚔️
      else if (card.name === "Ataque Preciso") {
        animateDamage(enemies[0].el);
        if (enemies[0].hp <= 30) {
          dano = 20;
        } else {
          dano = card.power;
        }
        enemies[0].hp -= dano;
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
        floatText(enemies[0].el, `-${dano}⚔️`, "red");
      }
      //⚔️
      else if (card.name === "Rebeldia") {
        dano = card.power;
        if (playerShield <= 0) {
          dano += card.power;
        }
        if (playerHP <= 30) {
          dano += card.power;
        }
        animateDamage(enemies[0].el);
        enemies[0].hp -= dano;
        floatText(enemies[0].el, `-${dano}⚔️`, "red");
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
      }
      //⚔️
      else if (card.name === "Vingativo") {
        animateDamage(enemies[0].el);
        dano = playerMaxHP - playerHP;
        enemies[0].hp -= dano;
        floatText(enemies[0].el, `-${dano}⚔️`, "red");
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
      }
      //⚔️
      else if (card.name === "Liderança") {
        if (enemies.length > 0) {
          animateDamage(enemies[0].el);
          enemies[0].hp -= card.power;
          floatText(enemies[0].el, `-${card.power}⚔️`, "red");
        }
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
        // filtra cartas que NÃO sejam Liderança
        const clonePool = playerDeck.filter(c => c.name !== "Liderança");
        const cartasParaAdicionar = 1;
        const espaco = maxMao - deck.length;
        const total = Math.min(cartasParaAdicionar, espaco);
        for (let i = 0; i <= total; i++) {
          if (clonePool.length > 0) {
            const base = clonePool[Math.floor(Math.random() * clonePool.length)];
            const newCard = {
              ...base,
              power: base.basePower ?? base.power ?? 0
            };
            deck.push(newCard); // adiciona diretamente
          }
        }
      }
      //⚔️
      else if (card.name === "Furia") {
        if (deck.length <= 1) {
          j = card.power * 2
        } else {
          j = card.power
        }
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
        const cartasParaAdicionar = j - 1;
        const espaco = maxMao - deck.length;
        const total = Math.min(cartasParaAdicionar, espaco);
        for (let i = 0; i <= total; i++) {
          deck.push({ ...allCards.find(c => c.name === "Ataque Rapido"), power: 5, cost: 0 });
        }
      }
      //⚔️
      else if (card.name === "Drone de Ataque") {
        enemies.forEach(e => {
          animateDamage(e.el);
          e.hp -= card.power;
          floatText(e.el, `-${card.power}⚔️`, "red");
        });

        deck.push({ ...allCards.find(c => c.name === "Drone Quebrado"), power: 0 });
        const cartasParaAdicionar = enemies.length - 1;
        const espaco = maxMao - deck.length;
        const total = Math.min(cartasParaAdicionar, espaco);
        for (let i = 0; i <= total; i++) {
          deck.push({ ...allCards.find(c => c.name === "Ataque Preciso"), power: 6 });
        }
      }
      //⚔️
      else if (card.name === "Drenagem") {
        playerShield += card.power;
        glowPlayer("green");
        playerHP = Math.min(playerHP + card.power, playerMaxHP);
        enemies[0].hp -= card.power;
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
        floatText(document.getElementById("player"), `+${card.power}💚`, "lime")
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });;
      }

      else if (card.name === "Explosão") {
        enemies.forEach(e => {
          animateDamage(e.el);
          e.hp -= card.power;
          floatText(e.el, `-${card.power}⚔️`, "red");
        });
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
      }
      //⚔️
      else if (card.name === "Chuva De Fragmentos") {
        enemies.forEach(e => {
          animateDamage(e.el);
          e.hp -= card.power;
          floatText(e.el, `-${card.power}⚔️`, "red");
        });
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
      }
      //⚔️
      else if (card.name === "Fogo Amigo") {
        enemies.forEach(e => {
          animateDamage(e.el);
          e.hp -= card.power;
          floatText(e.el, `-${card.power}⚔️`, "red");
          let dano = 15;
          floatText(document.getElementById("player"), `-${dano}⚔️`, "red");

          if (playerShield > 0) {
            let absorbed = Math.min(dano, playerShield);
            playerShield -= absorbed;
            dano -= absorbed;
          }
          if (dano > 0) {
            playerHP -= dano;
          }
        });
        animateDamage(document.getElementById("player"));
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
      }
      //⚔️
      else if (card.name === "Rajada Dupla") {
        animateDamage(enemies[0].el);
        enemies[0].hp -= card.power;
        enemies[0].hp -= card.power;
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
      }
      //⚔️
      else if (card.name === "Impacto Bruto") {
        animateDamage(enemies[0].el);
        enemies[0].hp -= card.power;
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
      }
      //⚔️
      else if (card.name === "Beserck") {
        let dano = card.power;
        if (deck.length <= 3) {
          dano = card.power * 3;
        }
        animateDamage(enemies[0].el);
        enemies[0].hp -= dano;
        floatText(enemies[0].el, `-${dano}⚔️`, "red");
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
      }

      //  🛡️🛡️🛡️🛡️🛡️ DEFESA 🛡️🛡️🛡️🛡️🛡️
      else if (card.name === "Defesa") {
        playerShield += card.power;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
      }
      //🛡️
      else if (card.name === "Campo de Força Fraco") {
        playerShield += card.power;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
      }
      //🛡️
      else if (card.name === "Tsunami") {
        def = card.power * (deck.length + enemies.length);
        playerShield += def;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${def}🛡️`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
      }
      //🛡️
      else if (card.name === "Defesa Salvadora") {
        def = card.power;
        if (deck.length <= 1) {
          def *= 3
          playerShield += def;
          playerHP = Math.min(playerHP + def, playerMaxHP);
          glowPlayer("green");
          floatText(document.getElementById("player"), `+${def}💚`, "lime");
        } else if (deck.length <= 3) {
          playerShield += def;
          playerHP = Math.min(playerHP + def, playerMaxHP);
          glowPlayer("green");
          floatText(document.getElementById("player"), `+${def}💚`, "lime");
        } else {
          playerShield += def;
        }
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${def}🛡️`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
      }
      //🛡️
      else if (card.name === "Ultima Defesa") {
        if (deck.length <= 1) {
          playerShield += card.power;
          glowPlayer("blue");
          floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
        }
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
      }
      //🛡️
      else if (card.name === "Campo de Força Instavel") {
        if (deck.length == 4) {
          playerShield += card.power;
          glowPlayer("blue");
          floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
        }
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
      }
      //🛡️
      else if (card.name === "Campo Presurizado") {
        if (deck.length <= 1) {
          playerShield += card.power;
          glowPlayer("blue");
          floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
        }
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
      }
      //🛡️
      else if (card.name === "Blindagem Vital") {
        def = playerHP;
        if (deck.length <= 1) {
          def *= 2;
        }
        playerShield += def;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${def}🛡️`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
      }
      //🛡️
      else if (card.name === "Campo Presurizado") {
        if (deck.length == 1) {
          playerShield += card.power;
          glowPlayer("blue");
          floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
          deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
        }
      }
      //🛡️
      else if (card.name === "Escudo Triangular") {
        if (deck.length <= 3) {
          def = card.power * 3;
        } else {
          def = card.power;
        }
        playerShield += def;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${def}🛡️`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
      }
      //🛡️
      else if (card.name === "Defesa Lunar") {
        if (deck.length <= 3) {
          playerShield += card.power;
          glowPlayer("blue");
          floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
          deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
        } else {
          animateDamage(enemies[0].el);
          enemies[0].hp -= card.power;
          deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
          floatText(enemies[0].el, `-${card.power}⚔️`, "red");
        }
      }
      //🛡️
      else if (card.name === "Em guarda") {
        if (playerShield > 0) {
          playerShield += card.power;
          glowPlayer("blue");
          floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
        }
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
      }
      //🛡️
      else if (card.name === "Drone Defensivo") {
        if (enemies.length >= 3) {
          oq = { ...allCards.find(c => c.name === "Escudo"), power: 10 };
        } else {
          oq = { ...allCards.find(c => c.name === "Defesa"), power: 6 };
        }
        deck.push({ ...allCards.find(c => c.name === "Drone Quebrado"), power: 0 });
        const cartasParaAdicionar = enemies.length - 1;
        const espaco = maxMao - deck.length;
        const total = Math.min(cartasParaAdicionar, espaco);
        for (let i = 0; i <= total; i++) {
          deck.push(oq);
        }
      }
      //🛡️
      else if (card.name === "Impulso Defensivo") {
        energy += 1;
        playerShield += 3;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${card.power}🔷`, "cyan");
        floatText(document.getElementById("player"), `+${card.power + 2}🛡️`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
      }
      //🛡️
      else if (card.name === "Arpão") {
        let dano = card.basePower;
        if (playerShield > 0) {
          dano *= 3;
        }
        // pega o último inimigo vivo
        const alvo = [...enemies].reverse().find(e => e.hp > 0);
        if (alvo) {
          animateDamage(alvo.el);
          alvo.hp -= dano;
          floatText(alvo.el, `-${dano}⚔️`, "red");
        }
        playerShield += 3;
        floatText(document.getElementById("player"), `+3🛡️`, "blue");
        deck.push({ ...allCards.find(c => c.name === "Arma Quebrada"), power: 0 });
      }
      //🛡️
      else if (card.name === "Escudo") {
        playerShield += card.power;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
      }
      //🛡️
      else if (card.name === "Indestrutivel") {
        escudo = playerShield * 2;
        playerShield = playerShield * card.power;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${escudo}🛡️`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
      }
      //🛡️
      else if (card.name === "Sistema de reflexão") {
        animateDamage(enemies[0].el);
        glowPlayer("blue");
        playerShield += (card.power * 2);
        enemies[0].hp -= card.power;
        floatText(enemies[0].el, `-${card.power}⚔️`, "red");
        floatText(document.getElementById("player"), `+${(card.power * 2)}🛡️`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
      }
      //🛡️
      else if (card.name === "PROTOCOL-Campo De Força") {
        if (playerHP <= 30) {
          playerShield += card.power;
          floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
          glowPlayer("blue");
        }
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
      }

      else if (card.name === "Brilhando") {
        if (playerHP == playerMaxHP) {
          playerShield += card.power;
          floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
          glowPlayer("blue");
        }
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
      }
      //🛡️
      else if (card.name === "Escudo Retaliante") {
        animateDamage(enemies[0].el);
        enemies[0].hp -= playerShield;
        floatText(enemies[0].el, `-${playerShield}⚔️`, "red");
        glowPlayer("blue");
        deck.push({ ...allCards.find(c => c.name === "Escudo quebrado"), power: 0 });
      }

      //  💚💚💚💚💚 BUFF 💚💚💚💚💚
      else if (card.name === "Cura") {
        playerHP = Math.min(playerHP + card.power, playerMaxHP);
        glowPlayer("green");
        floatText(document.getElementById("player"), `+${card.power}💚`, "lime");
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
      }
      //💚
      else if (card.name === "Ritual") {
        if (deck.length <= 1) {
          playerHP = Math.min(playerHP + card.power, playerMaxHP);
          glowPlayer("green");
          floatText(document.getElementById("player"), `+${card.power}💚`, "lime");
        } else {
          animateDamage(document.getElementById("player"));
          floatText(document.getElementById("player"), `-${card.power}⚔️`, "red");
          playerHP -= card.power;
        }
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
      }
      //💚
      else if (card.name === "Cura Forte") {
        if (deck.length <= 1) {
          playerHP = Math.min(playerHP + card.power, playerMaxHP);
          glowPlayer("green");
          floatText(document.getElementById("player"), `+${card.power}💚`, "lime");
        }
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
      }
      //💚
      else if (card.name === "Limite da Vida") {
        cura = card.power;
        if (playerHP <= 30) {
          cura = card.power * 3;
        }
        if (deck.length <= 3) {
          playerHP = Math.min(playerHP + cura, playerMaxHP);
          glowPlayer("green");
          floatText(document.getElementById("player"), `+${cura}💚`, "lime");
        }
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
      }
      //💚
      else if (card.name === "Estratégia") {
        if (deck.length <= 3) {
          deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
          const clonePool = playerDeck.filter(c => c.name !== "Estratégia");
          const cartasParaAdicionar = 1;
          const espaco = maxMao - deck.length;
          const total = Math.min(cartasParaAdicionar, espaco);
          for (let i = 0; i <= total; i++) {
            if (clonePool.length > 0) {
              const base = clonePool[Math.floor(Math.random() * clonePool.length)];
              const newCard = {
                ...base,
                power: base.basePower ?? base.power ?? 0
              };
              deck.push(newCard); // adiciona diretamente
            }
          }
        } else {
          energy += card.power;
          floatText(document.getElementById("player"), `+${card.power}🔷`, "cyan");
          glowPlayer("green");
          deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
        }
      }
      //💚
      else if (card.name === "Xenofluxo") {
        energy += 1;
        glowPlayer("green");
        floatText(document.getElementById("player"), `+${card.power}🔷`, "cyan");
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
      }
      //💚
      else if (card.name === "Drone Médico") {
        glowPlayer("green");
        floatText(document.getElementById("player"), `+${card.power * enemies.length}💚`, "lime");
        deck.push({ ...allCards.find(c => c.name === "Drone Quebrado"), power: 0 });

        for (let i = 0; i < enemies.length; i++) {
          playerHP = Math.min(playerHP + card.power, playerMaxHP);
        }
      }
      //💚
      else if (card.name === "Sob-Vigia") {
        if (playerHP > 25) {
          dano = playerHP - 25;
          playerHP = 25;
          energy += 1;
          animateDamage(document.getElementById("player"));
          floatText(document.getElementById("player"), `-${dano}💔`, "red");
        } else {
          dano = 25 - playerHP;
          playerHP = 25;
          glowPlayer("green");
          floatText(document.getElementById("player"), `+${dano}💚`, "lime");
        }
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
      }
      //💚
      else if (card.name === "Sobre Carga") {
        animateDamage(enemies[0].el);
        animateDamage(document.getElementById("player"));
        playerHP = Math.min(playerHP - card.power, playerMaxHP);
        enemies[0].hp -= card.power * 3;
        floatText(enemies[0].el, `-${card.power * 3}⚔️`, "red");
        floatText(document.getElementById("player"), `-${card.power}💔`, "red");
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
      }
      //💚
      else if (card.name === "Golpe Neural Retaliante") {
        if (playerHP < 20) {
          dano = playerHP - 1;
          playerHP = 1;
        } else {
          dano = card.power;
          playerHP -= card.power;
        }
        animateDamage(enemies[0].el);
        animateDamage(document.getElementById("player"));
        enemies[0].hp -= playerHP;
        floatText(enemies[0].el, `-${playerHP}⚔️`, "red");
        floatText(document.getElementById("player"), `-${dano}💔`, "red");
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
      }
      //💚
      else if (card.name === "Impulso") {
        if (limiteMao < 10) {
          limiteMao += 1;
        }
        glowPlayer("green");
        floatText(document.getElementById("player"), `+${card.power}➕`, "lime");
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
      }
      //💚
      else if (card.name === "Mineração") {
        energy += 3;
        glowPlayer("green");
        floatText(document.getElementById("player"), `+${3}🔷`, "lime");
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
      }
      //💚
      else if (card.name === "PROTOCOL-Reforço Estrutural") {
        if (playerHP <= 30) {
          playerHP = Math.min(playerHP + card.power, playerMaxHP);
          floatText(document.getElementById("player"), `+${card.power}💚`, "lime");
          glowPlayer("green");
        }
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
      }
      //💚
      else if (card.name === "Compra Dupla") {
        deck.push({ ...allCards.find(c => c.name === "Cura Quebrada"), power: 0 });
        const cartasParaAdicionar = card.power;
        const espaco = maxMao - deck.length;
        const total = Math.min(cartasParaAdicionar, espaco);
        for (let i = 0; i <= total; i++) {
          const newCard = {
            ...allCards[Math.floor(Math.random() * allCards.length)],
            power: allCards[Math.floor(Math.random() * allCards.length)].basePower
          };
          deck.push(newCard); // adiciona diretamente, ignorando limite
        }
        glowPlayer("green");
      }

      //  ♻️♻️♻️♻️♻️ RECICLAGEM ♻️♻️♻️♻️♻️
      else if (card.name === "Recicladora") {
        let dano = Math.floor(lixoReciclado / 3);

        animateDamage(enemies[0].el);
        enemies[0].hp -= dano;
        floatText(enemies[0].el, `-${dano}⚔️`, "red");
      }
      //♻️
      else if (card.name === "Destruir Carta") {
        const toRemove = new Set();
        toRemove.add(card); // também remover a própria carta usada
        let lixoRemovido = 0;

        for (let j = 0; j < deck.length; j++) {
          const c = deck[j];
          if (c !== card && c.type === "lixo") {
            toRemove.add(c);
            lixoRemovido++;
            atualizarLixo();
          }
        }

        if (lixoRemovido === 0) {
          // anima só a carta usada e remova-a normalmente
          div.classList.add("card-remove");
          setTimeout(() => {
            for (let k = deck.length - 1; k >= 0; k--) {
              if (deck[k] === card) { deck.splice(k, 1); break; }
            }
            drawCards();
            updateHUD();
          }, 300);
          return;
        }


        updateHUD();

        // anima e depois remove todas as cartas marcadas
        div.classList.add("card-remove");
        setTimeout(() => {
          for (let k = deck.length - 1; k >= 0; k--) {
            if (toRemove.has(deck[k])) deck.splice(k, 1);
          }
          drawCards();
          checkEnemies();
          updateHUD();
        }, 300);

        return;
      }
      //♻️
      else if (card.name === "Ataque Reciclável") {
        // marca as cartas a remover (por identidade)
        const toRemove = new Set();
        toRemove.add(card); // também remover a própria carta usada
        let lixoRemovido = 0;

        for (let j = 0; j < deck.length; j++) {
          const c = deck[j];
          if (c !== card && c.type === "lixo") {
            toRemove.add(c);
            lixoRemovido++;
            atualizarLixo();
          }
        }

        if (lixoRemovido === 0) {
          // anima só a carta usada e remova-a normalmente
          div.classList.add("card-remove");
          setTimeout(() => {
            for (let k = deck.length - 1; k >= 0; k--) {
              if (deck[k] === card) { deck.splice(k, 1); break; }
            }
            drawCards();
            updateHUD();
          }, 300);
          return;
        }

        // aplica efeito imediatamente
        const dano = lixoRemovido * 5;
        if (enemies.length > 0) {
          enemies[0].hp -= dano;
          animateDamage(enemies[0].el);
          floatText(enemies[0].el, `-${dano}⚔️`, "red");
        }
        updateHUD();

        // anima e depois remove todas as cartas marcadas
        div.classList.add("card-remove");
        setTimeout(() => {
          for (let k = deck.length - 1; k >= 0; k--) {
            if (toRemove.has(deck[k])) deck.splice(k, 1);
          }
          drawCards();
          checkEnemies();
          updateHUD();
        }, 300);

        return; // importante: impede que o handler padrão remova outra carta
      }
      //♻️
      else if (card.name === "Drone de Coleta") {
        // marca as cartas a remover (por identidade)
        const toRemove = new Set();
        toRemove.add(card); // também remover a própria carta usada
        let lixoRemovido = 0;

        for (let j = 0; j < deck.length; j++) {
          const c = deck[j];
          if (c !== card && c.type === "lixo") {
            toRemove.add(c);
            lixoRemovido++;
            atualizarLixo();
            if (playerHP <= 30) {
              deck.push({ ...allCards.find(c => c.name === "Cura"), power: 3 });
            } else {
              deck.push({ ...allCards.find(c => c.name === "Ataque"), power: 6 });
            }
          }
        }

        if (lixoRemovido === 0) {
          // anima só a carta usada e remova-a normalmente
          div.classList.add("card-remove");
          setTimeout(() => {
            for (let k = deck.length - 1; k >= 0; k--) {
              if (deck[k] === card) { deck.splice(k, 1); break; }
            }
            drawCards();
            updateHUD();
          }, 300);
          return;
        }

        updateHUD();

        // anima e depois remove todas as cartas marcadas
        div.classList.add("card-remove");
        setTimeout(() => {
          for (let k = deck.length - 1; k >= 0; k--) {
            if (toRemove.has(deck[k])) deck.splice(k, 1);
          }
          drawCards();
          checkEnemies();
          updateHUD();
        }, 300);

        return; // importante: impede que o handler padrão remova outra carta
      }
      //♻️
      else if (card.name === "Defesa Reciclável") {
        const toRemove = new Set();
        toRemove.add(card);
        let lixoRemovido = 0;

        for (let j = 0; j < deck.length; j++) {
          const c = deck[j];
          if (c !== card && c.type === "lixo") {
            toRemove.add(c);
            lixoRemovido++;
            atualizarLixo();
          }
        }

        if (lixoRemovido === 0) {
          div.classList.add("card-remove");
          setTimeout(() => {
            for (let k = deck.length - 1; k >= 0; k--) {
              if (deck[k] === card) { deck.splice(k, 1); break; }
            }
            drawCards();
            updateHUD();
          }, 300);
          return;
        }

        const defesa = lixoRemovido * 5;
        playerShield += defesa;
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${defesa}🛡️`, "cyan");
        updateHUD();

        div.classList.add("card-remove");
        setTimeout(() => {
          for (let k = deck.length - 1; k >= 0; k--) {
            if (toRemove.has(deck[k])) deck.splice(k, 1);
          }
          drawCards();
          updateHUD();
        }, 300);

        return;
      }
      //♻️
      else if (card.name === "Xenofluxo Reciclável") {
        const toRemove = new Set();
        toRemove.add(card);
        let lixoRemovido = 0;

        for (let j = 0; j < deck.length; j++) {
          const c = deck[j];
          if (c !== card && c.type === "lixo") {
            toRemove.add(c);
            lixoRemovido++;
            atualizarLixo();
          }
        }
        if (lixoRemovido === 0) {
          div.classList.add("card-remove");
          setTimeout(() => {
            for (let k = deck.length - 1; k >= 0; k--) {
              if (deck[k] === card) { deck.splice(k, 1); break; }
            }
            drawCards();
            updateHUD();
          }, 300);
          return;
        }

        energy += Math.floor(lixoRemovido / 2);
        glowPlayer("green");
        floatText(document.getElementById("player"), `+${lixoRemovido}🔷`, "cyan");
        updateHUD();

        div.classList.add("card-remove");
        setTimeout(() => {
          for (let k = deck.length - 1; k >= 0; k--) {
            if (toRemove.has(deck[k])) deck.splice(k, 1);
          }
          drawCards();
          updateHUD();
        }, 300);

        return;
      }
      //♻️
      else if (card.name === "Terror Critico") {
        // marca as cartas a remover (identidade)
        const toRemove = new Set();
        toRemove.add(card); // também remover a própria carta usada
        let lixoRemovido = 0;
        // percorre deck (mão) e marca lixos
        for (let j = deck.length - 1; j >= 0; j--) {
          const c = deck[j];
          if (c !== card && c.type === "lixo") {
            toRemove.add(c);
            lixoRemovido++;
            atualizarLixo();
          }
        }
        if (lixoRemovido === 0) {
          // anima só a carta usada e remova-a normalmente
          div.classList.add("card-remove");
          setTimeout(() => {
            for (let k = deck.length - 1; k >= 0; k--) {
              if (deck[k] === card) { deck.splice(k, 1); break; }
            }
            drawCards();
            updateHUD();
          }, 300);
          return;
        }
        // calcula dano agregado
        const base = card.power;
        let totalDamage = lixoRemovido * base;
        if (playerHP <= 30) totalDamage *= 2;
        // aplica dano (no primeiro inimigo) com animação
        if (enemies.length > 0) {
          animateDamage(enemies[0].el);
          enemies[0].hp -= totalDamage;
          floatText(enemies[0].el, `-${totalDamage}⚔️`, "red");
        }
        // anima a carta usada e, após a animação, remova todas as cartas marcadas
        div.classList.add("card-remove");
        setTimeout(() => {
          for (let k = deck.length - 1; k >= 0; k--) {
            if (toRemove.has(deck[k])) deck.splice(k, 1);
          }
          drawCards();
          checkEnemies();
          updateHUD();
        }, 300);
        return; // evita que o handler genérico remova outra vez
      }

      //  🗑️🗑️🗑️🗑️🗑️ LIXO 🗑️🗑️🗑️🗑️🗑️
      else if (card.name === "Entulho") {
      }
      else if (card.name === "Drone Quebrado") {
      }
      //🗑️
      else if (card.name === "Lixo quimico") {
      }
      //🗑️
      else if (card.name === "Escudo quebrado") {
        floatText(document.getElementById("player"), `+${"0"}🛡️`, "cyan");
      }
      //🗑️
      else if (card.name === "Cura Quebrada") {
        floatText(document.getElementById("player"), `+${"0"}💚`, "lime");
      }
      //🗑️
      else if (card.name === "Arma Quebrada") {
        floatText(enemies[0].el, `-${"0"}⚔️`, "red");
      }
      //🗑️
      else if (card.name === "Restos de mecha") {
        if (energy < card.cost) return;
        energy -= card.cost;
        const cartasParaAdicionar = card.power;
        const espaco = maxMao - deck.length;
        const total = Math.min(cartasParaAdicionar, espaco);
        for (let i = 0; i <= total; i++) {
          deck.push({ ...allCards.find(c => c.name === "Entulho"), power: 0 });
        }
      }
      //🗑️
      else if (card.name === "Ferro Velho") {
        if (energy < card.cost) return;
        energy -= card.cost;

        const cartasParaAdicionar = card.power;
        const espaco = maxMao - deck.length;
        const total = Math.min(cartasParaAdicionar, espaco);
        for (let i = 0; i <= total; i++) {
          deck.push({ ...allCards.find(c => c.name === "Entulho"), power: 0 });
        }
      }

      //  ❄️❄️❄️❄️❄️ FROST ❄️❄️❄️❄️❄️
      else if (card.name === "Gelo Mortal") {
        animateDamage(enemies[0].el);

        if (enemies[0].dano <= 1) {

        } else {
          if (enemies[0].tipoVida !== "🧿") {
            enemies[0].tipoDano = "❄️";
            marcarInimigos("❄️", "unico")
            enemies[0].dano = Math.max(0, enemies[0].dano - 1);
            enemies[0].behavior = () => [{ type: "attack", value: enemies[0].dano }];
          }
          floatText(enemies[0].el, `${card.power}❄️`, "blue");
        }
      }
      //❄️
      else if (card.name === "Nevasca Mortal") {
        marcarInimigos("❄️", "area")
        // percorre todos os inimigos vivos
        enemies.forEach(enemy => {
          if (!enemy || enemy.hp <= 0) return;

          animateDamage(enemy.el);

          if (enemy.dano > 1) {
            if (enemy.tipoVida !== "🧿") {
              enemy.tipoDano = "❄️";
              enemy.dano = Math.max(0, enemy.dano - 1); // reduz o dano em 1
              enemy.behavior = () => [{ type: "attack", value: enemy.dano }];
            }
            floatText(enemy.el, `${card.power}❄️`, "blue");
          }
        });
      }
      //❄️
      else if (card.name === "Marcar") {
        marcarInimigos("❄️", "unico", true)
      }
      //❄️
      else if (card.name === "Cemiterio Branco") {
        marcarInimigos("❄️", "area", true)
      }
      //❄️
      else if (card.name === "Ataque Condensado") {
        if (enemies[0].tipoVida === "❄️") {
          dano = card.power * 3;
        } else {
          dano = card.power;
        }
        animateDamage(enemies[0].el);
        enemies[0].hp -= dano;
        floatText(enemies[0].el, `-${dano}❄️`, "red");
      }
      //❄️
      else if (card.name === "Defesa Condensada") {
        armorGain = card.power;
        frostCount = deck.filter(c => c.type === "frost").length;
        armorGain *= frostCount;

        markedCount = enemies.filter(e => e.tipoVida === "❄️").length;
        if (markedCount > 0) {
          armorGain *= markedCount + 1;
        }

        // Aplica armadura
        glowPlayer("blue");
        floatText(document.getElementById("player"), `+${armorGain}🛡️`, "cyan");
        playerShield += armorGain;
      }
      //❄️
      else if (card.name === "Coração Frio") {
        armorGain = card.power;
        frostCount = deck.filter(c => c.type === "frost").length;
        armorGain *= frostCount;

        markedCount = enemies.filter(e => e.tipoVida === "❄️").length;
        if (markedCount > 0) {
          armorGain *= markedCount + 1;
        }

        // Aplica armadura
        glowPlayer("green");
        floatText(document.getElementById("player"), `+${armorGain}💚`, "lime");
        playerHP = Math.min(playerHP + armorGain, playerMaxHP);
      }
      //❄️
      else if (card.name === "Xenofluxo Glacial") {
        energiInimigo = enemies.filter(e => e.tipoVida === "❄️").length;
        energy += 1 * energiInimigo;

        glowPlayer("green");
        floatText(document.getElementById("player"), `+${energiInimigo}🔷`, "lime");
      }
      //❄️
      else if (card.name === "Baralho Glacial") {
        energiInimigo = enemies.filter(e => e.tipoVida === "❄️").length;

        const clonePool = playerDeck.filter(c => c.name !== "Baralho Glacial");
        const cartasParaAdicionar = energiInimigo;
        const espaco = maxMao - deck.length;
        const total = Math.min(cartasParaAdicionar, espaco) - 1;
        for (let i = 0; i <= total; i++) {
          if (clonePool.length > 0) {
            const base = clonePool[Math.floor(Math.random() * clonePool.length)];
            const newCard = {
              ...base,
              power: base.basePower ?? base.power ?? 0
            };
            deck.push(newCard);
            glowPlayer("green");
          }
        }
      }
      //  🔥🔥🔥🔥🔥 FIRE 🔥🔥🔥🔥🔥
      else if (card.name === "Combustão") {
        marcarInimigos("🔥", "unico", true)
      }
      else if (card.name === "Chuva De Fogo") {
        marcarInimigos("🔥", "area", true)
      }
      //  💧💧💧💧💧 AGUA 💧💧💧💧💧
      else if (card.name === "Jato De Água") {
        marcarInimigos("💧", "unico", true)
      }
      else if (card.name === "Mar Denso") {
        marcarInimigos("💧", "area", true)
      }
      //  ⛰️⛰️⛰️⛰️⛰️ TERRA ⛰️⛰️⛰️⛰️⛰️
      else if (card.name === "Soterrar") {
        marcarInimigos("⛰️", "unico", true)
      }
      else if (card.name === "Deslizamento") {
        marcarInimigos("⛰️", "area", true)
      }
      //  ✨✨✨✨✨ CINTILANTE ✨✨✨✨✨
      else if (card.name === "Guardião") {
        if (playerHP <= 30) {
          playerShield += card.power;
          energy += 2;
          floatText(document.getElementById("player"), `+${card.power}🛡️`, "cyan");
          floatText(document.getElementById("player"), `+${2}🔷`, "lime");
          glowPlayer("cintilante");
        } else {
          energy += 1;
          floatText(document.getElementById("player"), `+${1}🔷`, "lime");
          glowPlayer("cintilante");
        }
      }
      //✨
      else if (card.name === "Armamento Pesado") {
        if (deck.length <= 3) {
          deck.push({ ...allCards.find(c => c.name === "Impacto Bruto"), power: 20, cost: 0 });
          deck.push({ ...allCards.find(c => c.name === "Ataque"), power: 6, cost: 0 });
          deck.push({ ...allCards.find(c => c.name === "Rajada Dupla"), power: 6, cost: 0 });
        }
      }
      //✨
      else if (card.name === "Chuva de Laminas") {
        if (energy >= 5) {
          power1 = 40;
          energy -= 5;
        } else if (energy === 4) {
          power1 = 30;
          energy -= 4;
        } else if (energy === 3) {
          power1 = 20;
          energy -= 3;
        } else if (energy === 2) {
          power1 = 15;
          energy -= 2;
        } else if (energy === 1) {
          power1 = 10;
          energy -= 1;
        } else if (energy === 0) {
          power1 = 5;
        }

        enemies.forEach(e => {
          animateDamage(e.el);
          e.hp -= power1;
          floatText(e.el, `-${power1}⚔️`, "red");
        });
      }
      //✨
      else if (card.name === "GÆPROTOCOL") {
        const power = card.basePower ?? card.power ?? 0;
        const toRemove = new Set();
        toRemove.add(card);
        // coleta somente as cartas da "mão" (o seu deck representa a mão aqui)
        const matches = [];
        for (let j = deck.length - 1; j >= 0; j--) {
          const c = deck[j];
          if (c !== card && (c.type === "lixo")) {
            matches.push(c);
            toRemove.add(c);
            atualizarLixo();
          }
        }
        if (matches.length === 0) {
          div.classList.add("card-remove");
          setTimeout(() => {
            for (let k = deck.length - 1; k >= 0; k--) {
              if (deck[k] === card) { deck.splice(k, 1); break; }
            }
            drawCards();
            updateHUD();
          }, 300);
          return;
        }

        // calcula efeitos agregados
        const totalRemoved = matches.length;
        const totalDamage = totalRemoved * power;
        const totalHeal = totalRemoved * power;
        const totalShield = totalRemoved * power;

        // aplica efeitos (um único efeito agregado)
        if (enemies.length > 0) {
          animateDamage(enemies[0].el);
          enemies[0].hp -= totalDamage;
          floatText(enemies[0].el, `-${totalDamage}⚔️`, "red");
        }
        glowPlayer("cintilante");
        playerShield += totalShield;
        playerHP = Math.min(playerHP + totalHeal, playerMaxHP);
        floatText(document.getElementById("player"), `+${totalShield}🛡️`, "cyan");
        floatText(document.getElementById("player"), `+${totalHeal}💚`, "green");

        // anima a carta usada
        div.classList.add("card-remove");

        // após animação, remova **todos** os objetos marcados de uma vez (iterando de trás p/ frente)
        setTimeout(() => {
          for (let k = deck.length - 1; k >= 0; k--) {
            if (toRemove.has(deck[k])) deck.splice(k, 1);
          }
          drawCards();
          checkEnemies();
          updateHUD();
        }, 300);

        return; // importante: evita que o handler continue e faça o splice(i,1) genérico
      }

      div.classList.add("card-remove");
      setTimeout(() => {
        deck.splice(i, 1);
        drawCards();
        checkEnemies();
      }, 300);
      updateHUD();
      updateEnemyBars();
      // caso a energia seja 0 ele skipa o turno auto
      // if (energy === 0) enemyTurn();
    };
    cards.appendChild(div);
  });
}

// Seletores
const btnInfoCards = document.querySelector(".infoCards");
const popupOverlayDeck = document.getElementById("popupOverlayDeck");
const closePopupDeck = document.getElementById("closePopupDeck");
const deckContainer = document.getElementById("deckContainer");

// Função para abrir popup e mostrar as cartas do deck
btnInfoCards.addEventListener("click", () => {
  deckContainer.innerHTML = ""; // limpa conteúdo anterior

  // Garante que playerDeck existe
  if (!playerDeck || playerDeck.length === 0) {
    deckContainer.innerHTML = "<p>O deck está vazio.</p>";
  } else {
    playerDeck.forEach(card => {
      if (!card) return;

      // Cria o contêiner da carta
      const cartaDiv = document.createElement("div");
      cartaDiv.className = `card ${card.rarity} ${card.type}`; // usa o padrão do CSS .card

      // Estrutura visual completa da carta
      cartaDiv.innerHTML = `
        <img src="${card.img}" alt="${card.name}">
        <div class="energia"><strong>${card.cost ?? 0}</strong></div>
        <div class="desc">
          <strong>${card.name || "Carta sem nome"}</strong><br>
          <em>${card.desc || "Sem descrição."}</em>
        </div>
      `;

      // Adiciona ao container
      deckContainer.appendChild(cartaDiv);
    });
  }

  // Mostra o popup
  popupOverlayDeck.style.opacity = "1";
  popupOverlayDeck.style.pointerEvents = "auto";
});

// Fechar popup
closePopupDeck.addEventListener("click", () => {
  popupOverlayDeck.style.opacity = "0";
  popupOverlayDeck.style.pointerEvents = "none";
});

// Fechar ao clicar fora do conteúdo
popupOverlayDeck.addEventListener("click", (e) => {
  if (e.target === popupOverlayDeck) {
    popupOverlayDeck.style.opacity = "0";
    popupOverlayDeck.style.pointerEvents = "none";
  }
});

function marcarInimigos(elemento, tipo, txt = false) {
  if (tipo == "area") {
    enemies.forEach(e => {
      if (e.tipoVida === "🧿") return;
      e.tipoVida = elemento;

      if (txt == true) {
        floatText(e.el, elemento, "blue");
      }
    });
  } else if (tipo == "unico") {
    if (enemies[0].tipoVida !== "🧿") {
      enemies[0].tipoVida = elemento;
    }

    if (txt == true) {
      floatText(enemies[0].el, elemento, "blue");
    }
  }
}


function drawNewCards() {
  deck.length = 0;

  while (deck.length < limiteMao) {
    const base = { ...playerDeck[Math.floor(Math.random() * playerDeck.length)] };

    // conta quantas vezes a carta existe no deck do player
    const maxCopies = playerDeck.filter(card => card.name === base.name).length;

    // conta quantas vezes essa carta já foi adicionada à mão
    const count = deck.filter(card => card.name === base.name).length;

    if (count < maxCopies) {
      deck.push({ ...base, power: base.basePower });
    }
  }
}

function takeDamage(dmg) {
  if (playerShield > 0) {
    const absorbed = Math.min(playerShield, dmg);
    playerShield -= absorbed;
    dmg -= absorbed;
  }

  if (dmg > 0) {
    playerHP -= dmg;
  }

  if (playerHP < 0) playerHP = 0;

  playerShield = playerShieldInit;
  updateHUD();
}

function enemyTurn() {
  setTimeout(() => {
    [...enemies].forEach(e => {
      const actions = e.behavior();

      actions.forEach(act => {
        // ⚔️ ATAQUE NORMAL
        if (act.type === "attack") {
          let dano = act.value;

          if (playerShield > 0) {
            let absorbed = Math.min(dano, playerShield);
            playerShield -= absorbed;
            dano -= absorbed;
            animateDamage(document.getElementById("player"));
            floatText(document.getElementById("player"), `-${absorbed}🛡️`, "orange");
          }

          if (dano > 0) {
            playerHP -= dano;
            animateDamage(document.getElementById("player"));
            floatText(document.getElementById("player"), `-${dano}⚔️`, "orange");
            redScreenGlow(300, 30);
          }
          // 💚 CURA
        } else if (act.type === "heal") {
          let target = null;
          if (enemies.length > 0) {
            if (enemies[0] !== e && enemies[0].hp > 0) {
              target = enemies[0];
            } else {
              for (let t of enemies) {
                if (t !== e && t.hp > 0) { target = t; break; }
              }
            }
          }
          if (!target) {
            if (e.hp > 0) target = e;
          }
          if (target) {
            const max = target.maxHp ?? target.hp;
            const healed = act.value;
            target.hp = Math.min(target.hp + healed, max);
            floatText(target.el, `+${healed}💚`, "green");
            target.el.classList.add("healed");
            setTimeout(() => target.el.classList.remove("healed"), 600);
          }
          // 🔱 ATAQUE DIRETO À VIDA
        } else if (act.type === "attackVida") {
          playerHP -= act.value;
          animateDamage(document.getElementById("player"));
          floatText(document.getElementById("player"), `-${act.value}🔱`, "orange");
          redScreenGlow(300, 30);

          // ☠️ COMPORTAMENTO "MORRER" (auto-destruição após 3 turnos)
        } else if (act.type === "morrer") {
          if (e.turnosRestantes === undefined) {
            e.turnosRestantes = 3;
          }

          let dano = e.dano;
          if (playerShield > 0) {
            let absorbed = Math.min(dano, playerShield);
            playerShield -= absorbed;
            dano -= absorbed;
            floatText(document.getElementById("player"), `-${e.dano}🛡️`, "orange");
          }
          if (dano > 0) {
            playerHP -= dano;
            redScreenGlow(300, 30);
            floatText(document.getElementById("player"), `-${e.dano}⚔️`, "orange");
          }
          animateDamage(document.getElementById("player"));

          e.turnosRestantes--;
          if (e.turnosRestantes <= 0) {
            floatText(e.el, `💀`, "red");
            e.hp = 0;
            checkEnemies();
          }
        }

        // Fala da Ayla
        if (e.name === "Ayla") {
          setTimeout(() => {
            const frasesAyla = [
              "Raiva: COVARDE!",
              "Medo: Por que atacou alguém indefesa?",
              "Nojo: Sua fraqueza me da nojo",
              "Tristeza: A IA me permitiu sentir...",
              "Amor: Isso doi!",
              "Ansiedade: VAMOS ACABE COM ELE AGORA! RÁPIDO",
              "Angustia: Ainda estou aqui...",
              "Ayla: Vencer minhas emoções não significa NADA!",
              "Ayla: Juntese a IA, sua tal GAEA não vai te salvar!",
              "Ayla: Salvar a natureza? Patético!",
              "Ayla: EU SOU MAIS HUMANA QUE VOCÊ!",
              "Ayla: Sou a mais forte dentre todas"
            ];
            const frase = frasesAyla[Math.floor(Math.random() * frasesAyla.length)];
            floatText(e.el, frase, "violet");
          }, 500);
        }

        // MORTE DO JOGADOR
        if (playerHP <= 0) {
          document.getElementById("overlay").style.display = "block";
          document.getElementById("popupOver").style.display = "flex";
          gerarItens();
          limiteMao = maoInicio;
          document.getElementById("enemies").style.display = "none";
          document.getElementById("lifeBarsContainer").style.display = "none";
          energy = energyMax;
          drawNewCards();
          drawCards();
          updateHUD();
          playerShield = playerShieldInit;
        }
      });
    });
    // FIM DO TURNO
    energy = energyMax;
    playerShield = playerShieldInit;
    drawNewCards();
    drawCards();
    updateHUD();
    checkGameOver();
  }, 600);
}



reviver = 0;
let aylaPhase = 0;

function checkEnemies() {
  if (playerHP <= 0) {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("popupOver").style.display = "flex";
    gerarItens();
    limiteMao = maoInicio;
    document.getElementById("enemies").style.display = "none";
    document.getElementById("lifeBarsContainer").style.display = "none";
    energy = energyMax;
    drawNewCards();
    drawCards();
    updateHUD();
    playerShield = playerShieldInit;
  }

  for (let i = enemies.length - 1; i >= 0; i--) {
    if (enemies[i].hp <= 0) {

      const morto = enemies[i];
      const parentEnemies = document.getElementById("enemies");
      const parentBars = document.getElementById("lifeBarsContainer");

      // animação de morte do inimigo
      if (morto.el) {
        morto.el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        morto.el.style.opacity = "0";
        morto.el.style.transform = "scale(0.8)";
      }

      if (morto.barEl) {
        const barP = morto.barEl.closest("p");
        if (barP) {
          barP.style.transition = "opacity 0.5s ease";
          barP.style.opacity = "0";
        }
      }

      ((index) => {
        setTimeout(() => {
          if (!enemies[index]) return;

          const oldEl = morto.el;
          const oldBar = morto.barEl.closest("p");

          if (oldEl) oldEl.remove();
          if (oldBar) oldBar.remove();

          enemies.splice(index, 1);

          if (
            morto.name === "Irislidriz" ||
            morto.name === "Vigia de Irislidriz" ||
            morto.name === "Observador de Irislidriz" ||
            morto.name === "Medo De Ayla" ||
            morto.name === "Tristeza De Ayla" ||
            morto.name === "Ansiedade De Ayla" ||
            morto.name === "Raiva De Ayla" ||
            morto.name === "Amor De Ayla" ||
            morto.name === "Nojo De Ayla" ||
            morto.name === "Boss Ayla"
          ) {
            let novos = [];

            if (morto.name === "Irislidriz" && reviver === 0) {
              shakeScreenNatural(10, 400);
              novos.push({
                name: "Irislidriz",
                hp: 50,
                dano: 20,
                behavior: () => [{ type: "attack", value: 20 }],
                img: "../img/jogo/inimigos/valkFantasmaElite.png",
                tipoDano: "⚔️",
                tipoVida: "💤",
              });
              reviver++;
            } else if (morto.name === "Irislidriz" && reviver === 1) {
              shakeScreenNatural(30, 800);
              novos.push({
                name: "Irislidriz",
                hp: 40,
                dano: 25,
                behavior: () => [{ type: "attackVida", value: 30 }],
                img: "../img/jogo/inimigos/valkFantasma.png",
                tipoDano: "🔱",
                tipoVida: "❤️",
              });
              reviver++;
            }

            if (morto.name.includes("Ayla")) {
              if (morto.name === "Medo De Ayla" && aylaPhase === 0) {
                aylaPhase = 1;
                shakeScreenNatural(10, 400);
                document.getElementById("jogo").style.backgroundImage = "url('../img/jogo/background/cidadeAsustadora.png')";
                novos.push(
                  {
                    name: "Nojo De Ayla",
                    hp: 60,
                    dano: 20,
                    behavior: () => [{ type: "attackVida", value: 20 }],
                    img: "../img/jogo/inimigos/nojo.png",
                    tipoDano: "🔱",
                    tipoVida: "🪬",
                  },
                  {
                    name: "Tristeza De Ayla",
                    hp: 40,
                    dano: 12,
                    behavior: () => [{ type: "heal", value: Math.random() < 0.7 ? 12 : 24 }],
                    img: "../img/jogo/inimigos/tristeza.png",
                    tipoDano: "(💚🎭💊)💥",
                    tipoVida: "🪬",
                  }
                );
              }
              else if (
                ["Nojo De Ayla", "Tristeza De Ayla"].includes(morto.name) &&
                aylaPhase === 1
              ) {
                if (enemies.every(e => !["Nojo De Ayla", "Tristeza De Ayla"].includes(e.name))) {
                  aylaPhase = 2;
                  novos.push(
                    {
                      name: "Ansiedade De Ayla",
                      hp: 70,
                      dano: 12,
                      behavior: () => [
                        { type: Math.random() < 0.5 ? "heal" : "attack", value: Math.random() < 0.7 ? 12 : 24 },
                      ],
                      img: "../img/jogo/inimigos/ansiedade.png",
                      tipoDano: "(⚔️❓💚🎭💊)💥",
                      tipoVida: "🪬",
                    },
                    {
                      name: "Raiva De Ayla",
                      hp: 30,
                      dano: 30,
                      behavior: () => [{ type: "attack", value: 30 }],
                      img: "../img/jogo/inimigos/raiva.png",
                      tipoDano: "⚔️",
                      tipoVida: "🪬",
                    }
                  );
                }
              }
              else if (
                ["Angustia De Ayla", "Ansiedade De Ayla"].includes(morto.name) &&
                aylaPhase === 2
              ) {
                if (enemies.every(e => !["Angustia De Ayla", "Ansiedade De Ayla"].includes(e.name))) {
                  aylaPhase = 3;
                  novos.push(
                    {
                      name: "Amor De Ayla",
                      hp: 120,
                      dano: 25,
                      behavior: () => [{ type: Math.random() < 0.5 ? "heal" : "attack", value: 25 }],
                      img: "../img/jogo/inimigos/amor.png",
                      tipoDano: "⚔️❓💚🎭💊",
                      tipoVida: "🪬",
                    },
                    {
                      name: "Angustia De Ayla",
                      hp: 50,
                      dano: 20,
                      behavior: () => [{ type: "heal", value: 20 }],
                      img: "../img/jogo/inimigos/Vulnerabilidade.png",
                      tipoDano: "💚🎭💊",
                      tipoVida: "🪬",
                    }

                  );
                }
              }
              else if (
                ["Angustia De Ayla", "Amor De Ayla"].includes(morto.name) &&
                aylaPhase === 3
              ) {
                if (enemies.every(e => !["Angustia De Ayla", "Amor De Ayla"].includes(e.name))) {
                  aylaPhase = 4;
                  shakeScreenNatural(30, 800);
                  document.getElementById("jogo").style.backgroundImage =
                    "url('../img/jogo/background/lutaSuperior.png')";
                  novos.push({
                    name: "Ayla",
                    hp: 200,
                    dano: 20,
                    behavior: () => [
                      { type: Math.random() < 0.5 ? "heal" : "attack", value: Math.random() < 0.9 ? 20 : 100 },
                    ],
                    img: "../img/jogo/inimigos/bossIra.png",
                    tipoDano: "(⚔️❓💊)💣",
                    tipoVida: "🧿",
                  });
                }
              }
            }

            if (morto.name === "Vigia de Irislidriz") {
              novos.push({
                name: "Protetor de Irislidriz",
                hp: 100,
                maxHp: 100,
                dano: 5,
                behavior: () => [{ type: "attack", value: 5 }],
                img: "../img/jogo/inimigos/olhoIra.png",
                tipoDano: "⚔️",
                tipoVida: "❤️",
              });
            }

            if (morto.name === "Observador de Irislidriz") {
              novos.push({
                name: "Guardião de Irislidriz",
                hp: 35,
                maxHp: 35,
                dano: 10,
                behavior: () => [
                  { type: "heal", value: Math.random() < 0.7 ? 10 : 20 },
                ],
                img: "../img/jogo/inimigos/olhoRedencao.png",
                tipoDano: "(💚🎭💊)💥",
                tipoVida: "❤️",
              });
            }

            // Criação visual dos novos inimigos (sem mudar o resto da lógica)
            if (novos.length > 0) {
              novos.forEach((novo, j) => {
                enemies.splice(index + j, 0, novo);

                novo.el = createEnemy(novo.img);
                novo.el.style.display = "inline-block";
                parentEnemies.insertBefore(
                  novo.el,
                  parentEnemies.children[index + j] || null
                );

                const lifeBar = document.createElement("p");
                lifeBar.className = "enemy-bar";
                lifeBar.innerHTML = `
                  <strong> ⟪ ${novo.name} ⟫ </strong><br>
                  ⟪ <span class="enemy-vida">${novo.tipoVida}</span> 
                  <span class="enemy-hp">${novo.hp}</span> - 
                  <span class="enemy-dano">${novo.tipoDano} ${novo.dano}</span> ⟫
                `;
                parentBars.insertBefore(
                  lifeBar,
                  parentBars.children[index + j] || null
                );

                novo.barEl = lifeBar.querySelector(".enemy-hp");
                novo.dmgEl = lifeBar.querySelector(".enemy-dano");
                novo.tipoVidaEl = lifeBar.querySelector(".enemy-vida");
              });

              displayInimigos();
            }
          }

          // Checagem se acabou a batalha
          if (mapaBatalha === 50 && enemies.length === 0 && playerHP > 0) {
            document.getElementById("overlay").style.display = "block";
            document.getElementById("popupFinal").style.display = "flex";
            gerarItens();
            limiteMao = maoInicio;
            document.getElementById("enemies").style.display = "none";
            document.getElementById("lifeBarsContainer").style.display = "none";
            energy = energyMax;
            drawNewCards();
            drawCards();
            updateHUD();
            playerShield = playerShieldInit;
          } else if (enemies.length === 0 && playerHP > 0) {
            document.getElementById("overlay").style.display = "block";
            document.getElementById("popup").style.display = "flex";
            gerarItens();
            limiteMao = maoInicio;
            document.getElementById("enemies").style.display = "none";
            document.getElementById("lifeBarsContainer").style.display = "none";
            energy = energyMax;
            drawNewCards();
            drawCards();
            updateHUD();
            playerShield = playerShieldInit;
            reviver = 0;
          }
        }, 500);
      })(i);
    }
  }
}


function redScreenGlow(duration = 500, intensity = 30) {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.pointerEvents = "none"; // não bloqueia cliques
  overlay.style.boxSizing = "border-box";
  overlay.style.zIndex = "9999";

  // cria o glow vermelho para dentro
  overlay.style.boxShadow = `0 0 ${intensity}px ${intensity / 2}px rgba(214, 77, 77, 1) inset`;
  overlay.style.opacity = "1";
  overlay.style.transition = `opacity 0.3s ease-out`;

  document.body.appendChild(overlay);

  // desaparece suavemente
  setTimeout(() => {
    overlay.style.opacity = "0";
    setTimeout(() => overlay.remove(), 300);
  }, duration);
}

function shakeScreenNatural(maxIntensity = 20, duration = 600) {
  const container = document.body; // ou outro container principal
  const start = Date.now();

  function step() {
    const elapsed = Date.now() - start;
    const progress = elapsed / duration;

    if (progress < 1) {
      // intensidade diminui com o tempo (ease out)
      const intensity = maxIntensity * (1 - progress);
      const x = (Math.random() * 2 - 1) * intensity;
      const y = (Math.random() * 2 - 1) * intensity;

      container.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(step);
    } else {
      // reseta posição
      container.style.transform = '';
    }
  }

  step();
}

function gerarItens() {
  const container = document.getElementById("recompensa");
  container.innerHTML = ""; // limpa itens antigos

  container.style.display = "flex";
  container.style.flexDirection = "row";
  container.style.justifyContent = "center";
  container.style.alignItems = "center";
  container.style.gap = "15px";
  container.style.flexWrap = "wrap";
  container.style.width = "100%";

  // Seleciona 3 cartas aleatórias do deck geral
  const opcoes = [];
  while (opcoes.length < 3 && opcoes.length < allCards.length) {
    const carta = allCards[Math.floor(Math.random() * allCards.length)];
    if (!opcoes.includes(carta)) opcoes.push(carta);
  }

  opcoes.forEach(carta => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.classList.add(carta.rarity ?? "common"); // adiciona raridade
    cardDiv.style.cursor = "pointer";

    // tipo de carta para imagem de fundo
    switch (carta.type) {
      case "attack": cardDiv.classList.add("attack"); break;
      case "defense": cardDiv.classList.add("defense"); break;
      case "heal": cardDiv.classList.add("heal"); break;
      case "reciclagem": cardDiv.classList.add("reciclagem"); break;
      case "lixo": cardDiv.classList.add("lixo"); break;
      case "cintilante": cardDiv.classList.add("cintilante"); break;
    }

    // Imagem da carta
    if (carta.img) {
      const img = document.createElement("img");
      img.src = carta.img;
      cardDiv.appendChild(img);
    }

    // Nome da carta
    const nome = document.createElement("div");
    nome.classList.add("titulo");
    nome.textContent = carta.name;
    nome.style.font.size = "20px";
    cardDiv.appendChild(nome);

    // Custo da carta
    const custo = document.createElement("div");
    custo.classList.add("energia");
    custo.textContent = carta.cost ?? 0;
    cardDiv.appendChild(custo);

    // Descrição
    const desc = document.createElement("div");
    desc.classList.add("desc");
    desc.innerHTML = carta.desc ?? "";
    cardDiv.appendChild(desc);

    // Clique: adiciona ao deck do jogador e fecha popup
    cardDiv.addEventListener("click", () => {
      playerDeck.push({ ...carta, power: carta.basePower ?? carta.power ?? 0 });
      fecharPopup();     // fecha popup
      irParaDiv2();   // volta para o mapa
      updateHUD();      // atualiza HUD
    });

    container.appendChild(cardDiv);
  });
}


function fecharPopup() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("popup").style.display = "none";
}

function checkGameOver() {
  if (playerHP <= 0) {
    document.getElementById("cards").innerHTML = "";
  }
}

// gera inimigos aleatórios no início

function mostrarTela(n) {
  for (let i = 1; i <= 10; i++) {
    const tela = document.getElementById(`div${i}`);
    if (tela) {
      if (i === n) {
        tela.style.transform = "translateY(0)";
        tela.style.zIndex = 10;
      } else {
        tela.style.transform = "translateY(100%)";
        tela.style.zIndex = i;
      }
    }
  }
  telaAtual = n;
}

function proximaTela() {
  if (telaAtual >= 3) return;
  mostrarTela(telaAtual + 1);
}

function irParaDiv2() {
  const mb = mapaBatalha;
  if (mb >= 40) return mostrarTela(10);
  if (mb >= 30) return mostrarTela(9);
  if (mb >= 20) return mostrarTela(8);
  if (mb >= 10) return mostrarTela(7);
  return mostrarTela(2);
}

function irParaDiv4() {
  telaAnterior = telaAtual;
  mostrarTela(4);
}

function irParaDiv5() {
  telaAnterior = telaAtual;
  mostrarTela(5);
}

function irParaDiv6() {
  telaAnterior = telaAtual;
  mostrarTela(6);
}

function voltarAnterior() {
  if (telaAnterior) {
    mostrarTela(telaAnterior);
    telaAnterior = null;
  } else {
    mostrarTela(1);
  }
}
// SELECAO
// --- SELEÇÃO DE PERSONAGEM (um por vez) ---
const personagens = document.querySelectorAll("#selecaoPlayer img");
let personagemSelecionado = null;

personagens.forEach(img => {
  img.addEventListener("click", () => {
    // Remove seleção anterior
    personagens.forEach(p => p.classList.remove("selecionado"));

    // Marca o atual
    img.classList.add("selecionado");
    personagemSelecionado = img.id;
  });
});

// Botão confirmar seleção
document.getElementById("fimSelecao").addEventListener("click", () => {
  if (!personagemSelecionado) {
    // Opcional: destacar os personagens para indicar que precisam ser selecionados
    const personagens = document.querySelectorAll(".personagem");
    personagens.forEach(p => {
      p.classList.add("destacar"); // você pode criar no CSS um efeito de borda ou brilho
      setTimeout(() => p.classList.remove("destacar"), 1000);
    });

    return; // impede que saia da tela
  }

  // Se houver seleção
  criarPlayerNaDiv3(); // cria o player na tela de batalha
  irParaDiv2();      // vai para o mapa ou próxima tela
  console.log("Selecionado:", personagemSelecionado);
});

// MAPA
function mapaCanvas(dv, fases, caminhos, corMapa1, corMapa2) {
  const container = document.getElementById(dv);
  const shadow = container.attachShadow({ mode: "open" });

  // Define CSS isolado
  const style = `
  // body {
  //   margin: 0;
  //   background-image: url(../img/background/mapa.png);
  //   background-size: cover;
  //   background-position: bottom;
  //   background-repeat: no-repeat;
  //   background-attachment: fixed;
  //   padding: 10px;
  //   overflow-x: auto;
  //   color: white;
  //   font-family: sans-serif;
  //   width:100%;
  // }

  canvas {
    margin-left: 16.8%;
    margin-top: 3.3%;
    width:100%;
  }

  #mapa {
    display: flex;
    gap: 100px;
    padding: 60px 40px;
    position: relative;
    width: max-content;
    align-items: center;
    height: 700px;
    margin-left: 5.7%;
  }
  .coluna {
    display: flex;
    flex-direction: column;
    gap: 50px;
    justify-content: center;
    position: relative;
    height: 700px;
  }
  .nodo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    font-size: 18px;
    position: relative;
    user-select: none;
    transition: transform 0.2s, opacity 0.3s;
    z-index: 10;
    background-color: #666;
  }
  .nodo:hover { transform: scale(1.1); }
  .inimigo  { background: #d33; }
  .loot     { background: #fd0; }
  .loja     { background: #0d8; }
  .ferreiro { background: rgba(99, 78, 49, 1); }
  .elite    { background: #a3f; }
  .hospital { background: #4cf; }
  .boss     { background: #000; border: 2px solid white; }
  .invalido { opacity: 0; pointer-events: none; }
  .nodo.inacessivel {
    background-color: #444 !important;
    color: #999 !important;
    cursor: default;
    pointer-events: none;
    transform: none !important;
  }
  .nodo.selecionado {
    box-shadow: 0 0 10px 3px #fff;
    transform: scale(1.2);
  }
  canvas#conexoes {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 5;
  }

/* =================== DESKTOP =================== */
@media (min-width: 1941px) {
  #mapa {
    max-width: 700px;
    height: 160vh;
  }
  .coluna {
    gap: 40px;
  }
  .nodo {
    width: 8vw;
    height: 8vw;
    max-width: 45px;
    max-height: 45px;
  }
    #mapa #conexoes{
    margin-top:92px;
    }
}

  /* =================== NOTEBOOK =================== */
@media (min-width: 1025px) and (max-width: 1940px) {
  #mapa {
    max-width: 1000px;
    height: 180vh;
    margin-right: 306px;
    margin-top:54px;
  }
  .coluna {
    gap: 50px;
  }
  .nodo {
    width: 6vw;
    height: 6vw;
    max-width: 50px;
    max-height: 50px;
  }
}

/* =================== TABLET =================== */
@media (min-width: 769px) and (max-width: 1024px) {
#div1 {
  overflow-y: auto;  /* gera scroll só na vertical quando precisar */
  overflow-x: hidden;
}
  #mapa {
    height: 100vh;
    width: 100vw;
    gap: 10px;
    margin-right: -276px;
    margin-top:10px;
  }
  canvas{
  margin-top: -50px;
  transform: scale(1.0);
  }  
  .coluna {
    gap: 10px;
  }
  .nodo {
    width: 8vw;
    height: 8vw;
    max-width: 45px;
    max-height: 45px;
  }
}

/* =================== CELULAR =================== */
@media (max-width: 768px) {
  #mapa {
    height: 100vh;
    width: 100vw;
    gap: 10px;
    margin-right: -288px;
    margin-top:-20px;
  }
  canvas{
  margin-top: -78px;
  transform: scale(1.0);
  }  
  .coluna {
    gap: 10px;
  }
  .nodo {
    width: 5vw;
    height: 5vw;
    max-width: 25px;
    max-height: 25px;
  }
}
`;

  // Define HTML da interface
  shadow.innerHTML = `
  <style>${style}</style>
  <canvas id="conexoes"></canvas>
  <div id="mapa"></div>
`;


  // Começa o código JavaScript isolado no Shadow DOM
  (() => {
    const tipos = ['inimigo', 'hospital', 'ferreiro', 'elite'];
    const mapa = [];
    const numFases = fases;
    const caminhosPorFase = caminhos;
    const mapaContainer = shadow.getElementById("mapa");
    const canvas = shadow.getElementById("conexoes");
    const ctx = canvas.getContext("2d");
    let nodoAtual = null;
    let iniciado = false;

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function gerarMapa() {
      // Tipos com pesos
      const tipos = [
        { tipo: 'inimigo', peso: 55 },
        { tipo: 'elite', peso: 18 },
        { tipo: 'hospital', peso: 8 },
        { tipo: 'ferreiro', peso: 8 }
      ];

      // Sorteio ponderado de tipo
      function sortearTipo() {
        const totalPeso = tipos.reduce((soma, t) => soma + t.peso, 0);
        let rand = Math.random() * totalPeso;
        for (const t of tipos) {
          if (rand < t.peso) return t.tipo;
          rand -= t.peso;
        }
        return tipos[0].tipo;
      }

      // Criação da estrutura do mapa
      for (let i = 0; i < numFases; i++) {
        const coluna = [];

        for (let j = 0; j < caminhosPorFase; j++) {
          let tipo;

          // Primeira fase: início fixo no centro
          if (i === 0) {
            tipo = (j === Math.floor(caminhosPorFase / 2)) ? 'inimigo' : 'invalido';
          }
          // Última fase: boss fixo no centro
          else if (i === numFases - 1) {
            tipo = (j === Math.floor(caminhosPorFase / 2)) ? 'boss' : 'invalido';
          }
          // Penúltima fase: toda de hospital
          else if (i === numFases - 2) {
            tipo = 'hospital';
          }
          // Restante: tipos aleatórios com peso
          else {
            tipo = sortearTipo();
          }

          coluna.push({ tipo, conexoes: [] });
        }

        mapa.push(coluna);
      }

      // Conexões entre colunas
      for (let i = 0; i < numFases - 1; i++) {
        for (let j = 0; j < caminhosPorFase; j++) {
          if (mapa[i][j].tipo === 'invalido') continue;

          // Primeira fase: conecta a todos os válidos da próxima
          if (i === 0) {
            mapa[i][j].conexoes = [];
            for (let k = 0; k < caminhosPorFase; k++) {
              if (mapa[i + 1][k].tipo !== 'invalido') {
                mapa[i][j].conexoes.push(k);
              }
            }
            continue;
          }

          // Penúltima fase: conecta ao boss
          if (i === numFases - 2) {
            mapa[i][j].conexoes.push(Math.floor(caminhosPorFase / 2));
            continue;
          }

          // Conexões aleatórias entre caminhos próximos
          let possiveis = [];
          if (j > 0 && mapa[i + 1][j - 1].tipo !== 'invalido') possiveis.push(j - 1);
          if (mapa[i + 1][j].tipo !== 'invalido') possiveis.push(j);
          if (j < caminhosPorFase - 1 && mapa[i + 1][j + 1].tipo !== 'invalido') possiveis.push(j + 1);
          mapa[i][j].conexoes = shuffle(possiveis).slice(0, Math.floor(Math.random() * 2) + 1);
        }
      }

      // Garante entradas para todos os nós válidos
      for (let i = 1; i < numFases; i++) {
        for (let j = 0; j < caminhosPorFase; j++) {
          if (mapa[i][j].tipo === 'invalido') continue;
          let temEntrada = mapa[i - 1].some(n => n.conexoes.includes(j));
          if (!temEntrada) {
            let vizinhos = [j, j - 1, j + 1].filter(x => x >= 0 && x < caminhosPorFase);
            shuffle(vizinhos);
            for (let v of vizinhos) {
              if (mapa[i - 1][v].tipo !== 'invalido') {
                mapa[i - 1][v].conexoes.push(j);
                break;
              }
            }
          }
        }
      }
    }


    function desenharMapa() {
      mapaContainer.innerHTML = '';
      mapa.forEach((coluna, i) => {
        const colDiv = document.createElement('div');
        colDiv.classList.add('coluna');

        coluna.forEach((nodo, j) => {
          const el = document.createElement('div');
          el.classList.add('nodo', nodo.tipo);
          el.dataset.pos = `${i}-${j}`;
          el.textContent = {
            boss: '👑',
            inimigo: '💀',
            loja: '🛒',
            elite: '☠️',
            ferreiro: '⚒️',
            hospital: '💚',
          }[nodo.tipo] || '';

          el.addEventListener('click', () => clicarNodo(i, j));
          colDiv.appendChild(el);
          nodo.element = el;
        });
        mapaContainer.appendChild(colDiv);
      });

      atualizarAcessibilidade();
      desenharConexoes();
    }

    function desenharConexoes() {
      const rect = mapaContainer.getBoundingClientRect();
      canvas.width = mapaContainer.scrollWidth;
      canvas.height = mapaContainer.scrollHeight;
      canvas.style.width = canvas.width + 'px';
      canvas.style.height = canvas.height + 'px';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      gradient = ctx.createLinearGradient(0, 0, 1000, 0);
      gradient.addColorStop(0, corMapa1);
      gradient.addColorStop(1, corMapa2);

      // Aplicando o gradiente como a cor do contorno
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';

      for (let i = 0; i < mapa.length - 1; i++) {
        mapa[i].forEach((nodo, j) => {
          const de = nodo.element.getBoundingClientRect();
          nodo.conexoes.forEach(k => {
            const para = mapa[i + 1][k].element.getBoundingClientRect();
            const x1 = de.left - rect.left + 20;
            const y1 = de.top - rect.top + 20;
            const x2 = para.left - rect.left + 20;
            const y2 = para.top - rect.top + 20;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          });
        });
      }
    }

    function clicarNodo(i, j) {
      const tipo = mapa[i][j].tipo;

      if (!iniciado) {
        if (i === 0 && j === Math.floor(caminhosPorFase / 2)) {
          iniciado = true;
          nodoAtual = { i, j };
          executarAcao(tipo);
          atualizarAcessibilidade();
          marcarSelecionado();
          centralizarNodo(mapa[i][j].element);
        } else {
          alert('Clique no ponto inicial para começar.');
        }
        return;
      }

      if (i === nodoAtual.i + 1 && mapa[nodoAtual.i][nodoAtual.j].conexoes.includes(j)) {
        nodoAtual = { i, j };
        executarAcao(tipo);
        atualizarAcessibilidade();
        marcarSelecionado();
        centralizarNodo(mapa[i][j].element);
      } else {
        alert('Você só pode avançar para os pontos conectados na próxima fase.');
      }
    }

    function atualizarAcessibilidade() {
      mapa.forEach((coluna, i) => {
        coluna.forEach((nodo, j) => {
          if (nodo.tipo === 'invalido') return;
          let podeClicar = false;
          if (!iniciado) {
            if (i === 0 && j === Math.floor(caminhosPorFase / 2)) podeClicar = true;
          } else {
            if (i === nodoAtual.i && j === nodoAtual.j) podeClicar = true;
            if (i === nodoAtual.i + 1 && mapa[nodoAtual.i][nodoAtual.j].conexoes.includes(j)) podeClicar = true;
          }

          if (podeClicar) {
            nodo.element.classList.remove('inacessivel');
            nodo.element.style.pointerEvents = "auto";
            nodo.element.style.opacity = "1";
          } else {
            nodo.element.classList.add('inacessivel');
            nodo.element.style.pointerEvents = "none";
            nodo.element.style.opacity = "0.85";
          }
        });
      });
    }

    function marcarSelecionado() {
      mapa.forEach(coluna => {
        coluna.forEach(nodo => nodo.element.classList.remove('selecionado'));
      });
      if (nodoAtual) {
        mapa[nodoAtual.i][nodoAtual.j].element.classList.add('selecionado');
      }
    }

    function centralizarNodo(el) {
      const rect = el.getBoundingClientRect();
      const contRect = mapaContainer.getBoundingClientRect();
      const scrollX = rect.left - contRect.left + mapaContainer.scrollLeft - contRect.width / 2 + rect.width / 2;
      mapaContainer.scrollTo({ left: scrollX, behavior: "smooth" });
    }

    function executarAcao(tipo) {
      switch (tipo) {
        case 'inimigo':
        case 'elite':
        case 'boss':
          document.getElementById("enemies").style.display = "flex";
          document.getElementById("lifeBarsContainer").style.display = "flex";
          mostrarTela(3); // Tela de luta (div3)
          // window.location.href = "batalha.html";
          spawnEnemies(tipo);
          drawNewCards();
          drawCards();
          updateHUD();
          break;

        case 'loja':
          mostrarTela(4); // Tela da loja (div4)
          break;

        case 'ferreiro':
          mostrarTela(6);
          break;

        case 'hospital':
          mostrarTela(5); // Tela do hospital (div5)
          break;

        default:
          alert('Tipo de sala não reconhecido.');
      }

      mapaBatalha++
      const fundos = {
        6: "luta3.png",

        11: "lutaMapa2.png",
        16: "lutaMapa22.jpg",
        20: "lutaMapa333.jpg",

        21: "lutaMapa3.png",
        26: "lutaMapa33.jpg",

        31: "lutaMapa4.jpg",
        36: "lutaMapa44.jpg",

        41: "lutaMapa5.jpg",
        46: "lutaMapa55.jpg"
      };

      if (mapaBatalha == 31 && personagemSelecionado == "lilia") {
        criarPlayerNaDiv3()
      } else if (mapaBatalha == 6 && personagemSelecionado == "lilia") {
        criarPlayerNaDiv3()
      }

      const imagem = fundos[mapaBatalha];
      if (imagem) {
        document.getElementById("jogo").style.backgroundImage = `url('../img/jogo/background/${imagem}')`;
      }
    }

    gerarMapa();
    desenharMapa();
  })();
}

mapaCanvas("div2", 10, 5, "#45ff45ff", "#ff8834ff");
mapaCanvas("div7", 10, 3, "#60ff34ff", "#34ffe1ff");
mapaCanvas("div8", 10, 7, "#fbfbfbff", "#737373ff");
mapaCanvas("div9", 10, 3, "#f5fd54ff", "#5db0e7ff");
mapaCanvas("div10", 10, 9, "#5db0e7ff", "#e75d5dff");

var myMusic = new Audio("./../audio/artblock.ogg");
myMusic.loop = true;
myMusic.play();

const btnInfo = document.querySelector(".infoEmojis");
const popupOverlayOpcoes = document.getElementById("popupOverlayOpcoes");
const closePopupOpcoes = document.getElementById("closePopupOpcoes");

// abrir popup
btnInfo.addEventListener("click", () => {
  popupOverlayOpcoes.classList.add("active");
});

// fechar ao clicar no X
closePopupOpcoes.addEventListener("click", () => {
  popupOverlayOpcoes.classList.remove("active");
});

// fechar ao clicar fora do conteúdo
popupOverlayOpcoes.addEventListener("click", (e) => {
  if (e.target === popupOverlayOpcoes) {
    popupOverlayOpcoes.classList.remove("active");
  }
});