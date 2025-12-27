function aplicarBuff(item) {
  switch (item.id) {
    case 1: //vida
    case 7:
    case 33:
      playerMaxHP += 40;
      break;

    case 8: // Escudo
    case 32:
      playerShieldInit += 10;
      playerShield = playerShieldInit;
      break;

    case 3: // money
      dinheiro += 50;
      atualizarDinheiro();
      break;

    case 2: // energia
    case 4:
    case 9:
    case 25:
    case 28:
    case 30:
      energyMax += 1;
      energy = energyMax;
      break;

    case 10: // mao +
    case 29:
      if (limiteMao < maxMao) {
        limiteMao += 1;
        maoInicio = limiteMao;
      }
      break;

    case 11: // mao -
    case 30:
      limiteMao -= 1;
      maoInicio = limiteMao;
      break;

    case 5:
    case 6:
      playerMaxHP += 50;
      energyMax += 1;
      energy = energyMax;
      break;

    case 14:
      playerMaxHP += 10;
      energyMax += 1;
      energy = energyMax;
      playerShieldInit += 5;
      playerShield = playerShieldInit;
      break;

    case 31:
      playerMaxHP += 100;
      break;
  }
  updateHUD();
};