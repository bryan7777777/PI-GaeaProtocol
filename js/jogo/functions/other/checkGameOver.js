function checkGameOver() {
  if (playerHP <= 0) {
    document.getElementById("cards").innerHTML = "";
  }
};