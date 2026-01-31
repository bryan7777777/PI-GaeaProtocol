// MAPA
let telaAtual = 1;
let telaAnterior = null;
let mapaBatalha = 0;
let zonaAtual = 1;
let tipoFase;
let custoAtualizarBase = 5;
let custoAtualizarAtual = null;
let custoRemoverBase = 10;
let custoRemoverAtual = null;
let custoAtualizarFerreiro = null;
const custoAtualizarFerreiroBase = 50;
let custoCuraMedico = 0;
let custoVidaMaxMedico = 0;

// CONFS
var myMusic = new Audio("./../audio/artblock.ogg");
myMusic.loop = true;
let showingFloat = false;
let nemoraDef = false;
let nemoraAtk = false;
let nemoraSnowInterval = null;
let nemoraFireInterval = null;
let reviver = 0;
let aylaPhase = 0;
let playerImgDialogo;
let nomeInimigo;
let identificadorBoss;
let PULAR_TODO_TUTORIAL = false;
const pagina = location.pathname.split("/").pop();

// FLAGS
let SoliceApareceu=false;
let dialogoSolice=false;
let dialogoAyla=false;
let primeiraGeracaoItem = true;
let primeiraAberturaFerreiro = true;
let belindaSpawnBoss = true;
let svetlanaSpawnBoss = true;
let pedroSpawnBoss = true;
let guinevereSpawnBoss = true;
let islaSpawnBoss = true;
let peruSpawnBoss = true;
let animarCompra = false;
let bloqueioCliqueCartas = false;
let playerAlive = true;

// ARREY
const deck = [];
let enemies = [];
let floatQueue = [];
let itensJaPegos = [];
const buffs = {
  atk: [],
  def: [],
  cura: [],
  geral: []
};
const BUFF_VISUAL = {
  atk:   { emoji: "⚔️", border: "10px", color: "#ff5555" },
  def:   { emoji: "🛡️", border: "0px 0px 20px 20px", color: "#55aaff" },
  cura:  { emoji: "💚", border: "0px 20px 0px 20px", color: "#66ff66" },
  geral: { emoji: "✨", border: "100px", color: "#ff9ad5" }
};
const rarityWeights = [
  { name: "common", weight: 50 },
  { name: "rare", weight: 27 },
  { name: "fire", weight: 10 },
  { name: "agua", weight: 10 },
  { name: "terra", weight: 10 },
  { name: "frost", weight: 10 },
  { name: "epic", weight: 8 },
  { name: "legend", weight: 4 },
  { name: "cintilante", weight: 2 }
];

// STATUS
let lixoReciclado = 0;
let dinheiro = 0;
let alma1 = 5;

// PLAYER
let playerMaxHP = 100 
let playerHP = 100
let energyMax = 3 
let energy = 3
let playerShieldInit = 0;
let playerShield = playerShieldInit;
let personagemSelecionado = null;
// buff em itens aumenta esse
let maoInicio = 5;
// buff em cards aumenta esse
let limiteMao = 5;
// nenhuma mão pode exceder 10, evitar scrol
let maxMao = 10;

// ALL DOCUMENTS
//ID 
const descBox = document.getElementById("descPersonagem");
const popupOverlayOpcoes = document.getElementById("popupOverlayOpcoes");
const closePopupOpcoes = document.getElementById("closePopupOpcoes");
const popupOverlayDeck = document.getElementById("popupOverlayDeck");
const closePopupDeck = document.getElementById("closePopupDeck");
const deckContainer = document.getElementById("deckContainer");
const topoInfo = document.getElementById("topoInfo");
const descricaoInfo = document.getElementById("descricaoInfo");
const imgPersonagem = document.getElementById("imgPersonagem");
// SELECTOR ALL
const imagens = document.querySelectorAll("#selecaoPlayer img");
const personagens = document.querySelectorAll("#selecaoPlayer img");
// SELECTOR
const btnInfo = document.querySelector(".infoEmojis");
const btnInfoCards = document.querySelector(".infoCards");

/*TOOLTIP GLOBAL*/
const tooltip = document.createElement("div");
tooltip.style.position = "fixed";
tooltip.style.padding = "8px 12px";
tooltip.style.background = "rgba(0, 255, 60, 0.5)";
tooltip.style.border = "2px solid #00ff66";
tooltip.style.borderRadius = "0 25px 0 25px";
tooltip.style.color = "black";
tooltip.style.fontWeight = "bold";
tooltip.style.pointerEvents = "none";
tooltip.style.zIndex = "9999";
tooltip.style.display = "none";
document.body.appendChild(tooltip);

// ALL POPUP
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