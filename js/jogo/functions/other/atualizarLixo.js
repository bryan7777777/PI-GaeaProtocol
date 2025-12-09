function atualizarLixo() {
  lixoReciclado++
  const elementos = document.querySelectorAll(".lixoReciclado");
  elementos.forEach(el => {
    el.textContent = `♻️Lixos Reciclados♻️: ${lixoReciclado}`;
  });
};