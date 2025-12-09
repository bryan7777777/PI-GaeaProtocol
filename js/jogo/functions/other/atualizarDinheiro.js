function atualizarDinheiro() {
  const elementos = document.querySelectorAll(".dinheiroAtual");
  elementos.forEach(el => {
    el.textContent = `🪙: ${dinheiro}`;
  });
};