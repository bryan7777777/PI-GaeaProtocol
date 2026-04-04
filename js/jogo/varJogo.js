// ==========================================
// VARIAVEIS GLOBAIS DO JOGO GAEA PROTOCOL
// Este arquivo contém todas as variáveis de estado do jogo
// ==========================================

// MAPA - Controla navegação e localização
let telaAtual = 1; // Tela atual do jogo (1-6)
let telaAnterior = null; // Tela anterior para voltar
let mapaBatalha = 0; // ID da batalha atual no mapa
let zonaAtual = 1; // Zona/progressão atual (1-35+)
let tipoFase; // Tipo da fase atual (batalha, evento, etc.)
let custoAtualizarBase = 5; // Custo base para atualizar base
let custoAtualizarAtual = null; // Custo atual calculado
let custoRemoverBase = 10; // Custo base para remover cartas
let custoRemoverAtual = null; // Custo atual calculado
let custoAtualizarFerreiro = null; // Custo para atualizar ferreiro
const custoAtualizarFerreiroBase = 50; // Custo base do ferreiro
let custoCuraMedico = 0; // Custo de cura no médico
let custoVidaMaxMedico = 0; // Custo para aumentar vida máxima

// CONFS - Configurações e estado visual/áudio
var myMusic = new Audio("./../audio/artblock.ogg"); // Música de fundo
myMusic.loop = true; // Música em loop
let showingFloat = false; // Se está mostrando texto flutuante
let nemoraDef = false; // Estado de defesa de Nemora
let nemoraAtk = false; // Estado de ataque de Nemora
let nemoraSnowInterval = null; // Intervalo da neve de Nemora
let nemoraFireInterval = null; // Intervalo do fogo de Nemora
let reviver = 0; // Contador de revives
let aylaPhase = 0; // Fase atual de Ayla
let playerImgDialogo; // Imagem do jogador no diálogo
let nomeInimigo; // Nome do inimigo atual
let identificadorBoss; // ID do boss atual
let PULAR_TODO_TUTORIAL = false; // Flag para pular tutorial
const pagina = location.pathname.split("/").pop(); // Página atual

// FLAGS - Flags booleanas para eventos únicos
let SoliceApareceu=false; // Se Solice já apareceu
let dialogoSolice=false; // Se diálogo com Solice foi visto
let dialogoAyla=false; // Se diálogo com Ayla foi visto
let primeiraGeracaoItem = true; // Primeira geração de itens
let primeiraAberturaFerreiro = true; // Primeira abertura do ferreiro
let belindaSpawnBoss = true; // Spawn de boss Belinda
let svetlanaSpawnBoss = true; // Spawn de boss Svetlana
let pedroSpawnBoss = true; // Spawn de boss Pedro
let guinevereSpawnBoss = true; // Spawn de boss Guinevere
let islaSpawnBoss = true; // Spawn de boss Isla
let peruSpawnBoss = true; // Spawn de boss Peru
let animarCompra = false; // Animação de compra ativa
let bloqueioCliqueCartas = false; // Bloqueia cliques em cartas
let playerAlive = true; // Jogador está vivo
let flagItem37=true; // Flag para item 37
let flagItem38=true; // Flag para item 38
let flagItem39=true; // Flag para item 39
let flagItem40=true; // Flag para item 40

// ARRAYS - Arrays e objetos do jogo
const deck = []; // Deck completo disponível
let enemies = []; // Inimigos na batalha atual
let floatQueue = []; // Fila de textos flutuantes
let itensJaPegos = []; // IDs de itens já coletados
const buffs = { // Buffs ativos por tipo
  atk: [],   // Buffs de ataque
  def: [],   // Buffs de defesa
  cura: [],  // Buffs de cura
  geral: [],  // Buffs gerais

  amarelo: [],
  azul: [],
  vermelho: []
};

const STACK_REAL = ["amarelo", "azul", "vermelho"];

const BUFF_VISUAL = { // Configuração visual dos buffs
  atk:   { emoji: "⚔️", border: "10px", color: "#ff5555" },
  def:   { emoji: "🛡️", border: "0px 0px 20px 20px", color: "#55aaff" },
  cura:  { emoji: "💚", border: "0px 20px 0px 20px", color: "#66ff66" },
  geral: { emoji: "✨", border: "100px", color: "#ff9ad5" },

  amarelo:  { emoji: "🟡", border: "50%", color: "#ffd700" },
  azul:     { emoji: "🔵", border: "50%", color: "#3399ff" },
  vermelho: { emoji: "🔴", border: "50%", color: "#ff4444" }
};
const rarityWeights = [ // Pesos para raridade de cartas
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

// STATUS - Recursos e estatísticas do jogador
let lixoReciclado = 0; // Lixo reciclado (pontuação principal)
let dinheiro = 0; // Dinheiro coletado
let alma1 = 5; // Alma tipo 1 (recurso especial)

// PLAYER - Atributos do jogador
let playerMaxHP = 100; // Vida máxima do jogador
let playerHP = 100; // Vida atual do jogador
let energyMax = 3; // Energia máxima
let energy = 3; // Energia atual
let playerShieldInit = 0; // Escudo inicial
let playerShield = playerShieldInit; // Escudo atual
let personagemSelecionado = null; // Personagem selecionado
let playerDeck = []; // Deck atual do jogador
// Buffs em itens aumentam mão inicial
let maoInicio = 5; // Mão inicial
// Buffs em cartas aumentam limite de mão
let limiteMao = 5; // Limite atual de mão
// Nenhuma mão pode exceder 10 para evitar scroll
let maxMao = 10; // Máximo absoluto de mão

// TEMPO DE JOGO
window.gameStartTime = Date.now();

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