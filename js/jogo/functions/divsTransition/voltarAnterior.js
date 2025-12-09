function voltarAnterior() {
  if (telaAnterior) {
    mostrarTela(telaAnterior);
    telaAnterior = null;
  } else {
    mostrarTela(1);
  }
};