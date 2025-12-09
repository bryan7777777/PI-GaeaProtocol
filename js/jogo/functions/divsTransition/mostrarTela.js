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
};