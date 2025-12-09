function takeDamage(dmg) {
  if (playerShield > 0) {
    const absorbed = Math.min(playerShield, dmg);
    playerShield -= absorbed;
    dmg -= absorbed;
  }

  if (dmg > 0) {
    playerHP -= dmg;
  }

  if (playerHP < 0) playerHP = 0;

  playerShield = playerShieldInit;
  updateHUD();
};