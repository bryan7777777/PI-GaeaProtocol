function gerarCartaRecomp() {
  const container = document.getElementById("recompensa");
  container.innerHTML = ""; // limpa itens antigos

  container.style.display = "flex";
  container.style.flexDirection = "row";
  container.style.justifyContent = "center";
  container.style.alignItems = "center";
  container.style.gap = "15px";
  container.style.flexWrap = "wrap";
  container.style.width = "100%";

function sortearRaridade() {
  const total = rarityWeights.reduce((s, r) => s + r.weight, 0);
  let rand = Math.random() * total;

  for (const r of rarityWeights) {
    rand -= r.weight;
    if (rand <= 0) return r.name;
  }

  return "common";
}

function pegarCartaPorRaridade() {
  console.log("personagem:", personagemSelecionado);
console.log("deckCria:", deckCria);
  if (deckCria) {
    if (!cardsCria || cardsCria.length === 0) return null;
    return cardsCria[Math.floor(Math.random() * cardsCria.length)];
  } else if(personagemSelecionado === "cleopatra"){
    if (!cardsDesert || cardsDesert.length === 0) return null;
    return cardsDesert[Math.floor(Math.random() * cardsDesert.length)];
  }
  
  let tentativas = 0;

  while (tentativas < 20) {
    const raridade = sortearRaridade();

    const pool = allCards.filter(c => (c.rarity ?? "common") === raridade);

    if (pool.length > 0) {
      return pool[Math.floor(Math.random() * pool.length)];
    }
    tentativas++;
  }

  return allCards[Math.floor(Math.random() * allCards.length)];
}

  // Seleciona 3 cartas aleatórias do deck geral
  const opcoes = [];
while (opcoes.length < 3) {
  const carta = pegarCartaPorRaridade();
  if (!opcoes.some(c => c.name === carta.name)) {
    opcoes.push(carta);
  }
}

  opcoes.forEach(carta => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.classList.add(carta.rarity ?? "common"); // adiciona raridade
    cardDiv.style.cursor = "pointer";

    // tipo de carta para imagem de fundo
    switch (carta.type) {
      case "attack": cardDiv.classList.add("attack"); break;
      case "defense": cardDiv.classList.add("defense"); break;
      case "heal": cardDiv.classList.add("heal"); break;
      case "reciclagem": cardDiv.classList.add("reciclagem"); break;
      case "lixo": cardDiv.classList.add("lixo"); break;
      case "cintilante": cardDiv.classList.add("cintilante"); break;
      case "cria": cardDiv.classList.add("cria"); break;
    }

    // Imagem da carta
    if (carta.img) {
      const img = document.createElement("img");
      img.src = carta.img;
      cardDiv.appendChild(img);
    }

    // Nome da carta
    const nome = document.createElement("div");
    nome.classList.add("titulo");
    nome.textContent = carta.name;
    nome.style.fontSize = "20px";
    cardDiv.appendChild(nome);

    // Custo da carta
    const custo = document.createElement("div");
    custo.classList.add("energia");
    custo.textContent = carta.cost ?? 0;
    cardDiv.appendChild(custo);

    // Descrição
    const desc = document.createElement("div");
    desc.classList.add("desc");
    desc.innerHTML = carta.desc ?? "";
    cardDiv.appendChild(desc);

    // Clique: adiciona ao deck do jogador e fecha popup
    cardDiv.addEventListener("click", () => {
      playerDeck.push({ ...carta, power: carta.basePower ?? carta.power ?? 0 });
      fecharPopup();     // fecha popup
      irParaDiv2();   // volta para o mapa
      updateHUD();      // atualiza HUD
    });

    container.appendChild(cardDiv);
  });
};