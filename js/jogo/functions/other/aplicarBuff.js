function aplicarBuff(item) {
  switch (item.id) {
    case 1: //vida
    case 7:
    case 33:
      playerMaxHP += 40;
      playerHP += 40;
      break;

    case 8: // Escudo
    case 32:
    case 35:
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
    case 36:
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
      playerHP += 50;
      energyMax += 1;
      energy = energyMax;
      break;

    case 14:
      playerMaxHP += 10;
      playerHP += 10;
      energyMax += 1;
      energy = energyMax;
      playerShieldInit += 5;
      playerShield = playerShieldInit;
      break;

    case 31:
    case 34:
      playerMaxHP += 100;
      playerHP += 100;
      break;
  }
  updateHUD();
};