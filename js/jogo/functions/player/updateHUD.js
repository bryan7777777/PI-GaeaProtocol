// att status player
function updateHUD() {
  document.getElementById("hp").textContent = `${playerHP} / ${playerMaxHP} | 🛡️ ${playerShield}  `;
  document.getElementById("energy").textContent = energy;

  enemies.forEach(e => {
    if (e.barEl) e.barEl.textContent = e.hp > 0 ? e.hp : 0;
  });
};