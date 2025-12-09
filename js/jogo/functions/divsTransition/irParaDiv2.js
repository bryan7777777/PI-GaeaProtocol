function irParaDiv2() {
  const mb = mapaBatalha;
  if (mb >= 28) return mostrarTela(10);
  if (mb >= 21) return mostrarTela(9);
  if (mb >= 14) return mostrarTela(8);
  if (mb >= 7) return mostrarTela(7);
  return mostrarTela(2);
};