function abrirRemocaoCartas() {
  const lojaDiv = document.getElementById("div4");
  lojaDiv.innerHTML = "";

  const titulo = document.createElement("h2");
  titulo.textContent = "Remover Carta do Deck";
  titulo.style.textAlign = "center";
  lojaDiv.appendChild(titulo);

  const container = document.createElement("div");
  container.classList.add("remocao-container");
  lojaDiv.appendChild(container);

  if (!playerDeck || playerDeck.length === 0) {
    const vazio = document.createElement("p");
    vazio.textContent = "Seu deck está vazio!";
    vazio.style.textAlign = "center";
    container.appendChild(vazio);
    return;
  }

  playerDeck.forEach((carta, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.classList.add(carta.rarity ?? "common");
    if (carta.type) cardDiv.classList.add(carta.type);

    if (carta.img) {
      const img = document.createElement("img");
      img.src = carta.img;
      cardDiv.appendChild(img);
    }

    const nome = document.createElement("div");
    nome.classList.add("titulo");
    nome.textContent = carta.name;
    cardDiv.appendChild(nome);

    cardDiv.addEventListener("click", () => {
      // remove a carta do deck
      playerDeck.splice(index, 1);
      cardDiv.remove();
      if (typeof floatText === "function") floatText(lojaDiv, "Carta removida!", "red");
    });

    container.appendChild(cardDiv);
  });

  // botão para voltar à loja
  const btnVoltarLoja = document.createElement("button");
  btnVoltarLoja.textContent = "Voltar à Loja";
  btnVoltarLoja.style.marginTop = "20px";
  btnVoltarLoja.addEventListener("click", abrirLoja);
  lojaDiv.appendChild(btnVoltarLoja);
};