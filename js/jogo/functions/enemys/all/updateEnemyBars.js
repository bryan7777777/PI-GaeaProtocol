function updateEnemyBars() {
  enemies.forEach(enemy => {
    if (enemy.barEl) enemy.barEl.textContent = enemy.hp; // HP
    if (enemy.dmgEl) enemy.dmgEl.textContent = `${enemy.tipoDano} ${enemy.dano}`; // Dano
    if (enemy.tipoVidaEl) enemy.tipoVidaEl.textContent = enemy.tipoVida; // tipoVida
  });
};