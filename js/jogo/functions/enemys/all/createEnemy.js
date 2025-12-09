function createEnemy(imgSrc) {
  const div = document.createElement("div");
  div.className = "enemy";
  div.innerHTML = `<img src="${imgSrc}" alt="Inimigo">`;
  document.getElementById("enemies").appendChild(div);
  return div;
};