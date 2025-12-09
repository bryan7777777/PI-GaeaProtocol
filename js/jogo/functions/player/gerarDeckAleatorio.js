// Função para gerar o deck aleatório (só uma vez)
function gerarDeckAleatorio(allCards) {
  if (window.deckGerado) return window.deckGerado;
  const cartasDisponiveis = [...allCards];
  const deckAleatorio = [];

  for (let i = 0; i < 12; i++) {
    if (cartasDisponiveis.length === 0) break;
    const indice = Math.floor(Math.random() * cartasDisponiveis.length);
    deckAleatorio.push(cartasDisponiveis[indice]);
    cartasDisponiveis.splice(indice, 1);
  }

  window.deckGerado = deckAleatorio;
  return deckAleatorio;
};