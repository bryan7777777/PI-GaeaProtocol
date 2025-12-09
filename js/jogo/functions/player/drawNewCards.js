function drawNewCards() {
  deck.length = 0;

  while (deck.length < limiteMao) {
    const base = { ...playerDeck[Math.floor(Math.random() * playerDeck.length)] };

    // conta quantas vezes a carta existe no deck do player
    const maxCopies = playerDeck.filter(card => card.name === base.name).length;

    // conta quantas vezes essa carta já foi adicionada à mão
    const count = deck.filter(card => card.name === base.name).length;

    if (count < maxCopies) {
      deck.push({ ...base, power: base.basePower });
    }
  }
};