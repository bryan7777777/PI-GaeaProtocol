function mudarBackground(tipo) {
  const jogo = document.getElementById("jogo");
  if (tipo === "atk") {
    jogo.style.backgroundImage = "url('../img/jogo/background/nemoraAtk.png')";
  }
  else if (tipo === "def") {
    jogo.style.backgroundImage = "url('../img/jogo/background/nemoraDef.png')";
  }
};