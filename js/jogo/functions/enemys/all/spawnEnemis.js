function spawnEnemies(tipo) {
  playerShield = playerShieldInit;
  const enemiesContainer = document.getElementById("enemies");
  enemiesContainer.innerHTML = "";
  document.getElementById("lifeBarsContainer").innerHTML = "";

  // --- define zona atual com base no mapa ---
  if (mapaBatalha >= 28) zonaAtual = 5;
  else if (mapaBatalha >= 21) zonaAtual = 4;
  else if (mapaBatalha >= 14) zonaAtual = 3;
  else if (mapaBatalha >= 7) zonaAtual = 2;

  // --- seleciona pool conforme tipo ---
  let pool;
  if (pagina === "tutorial.html") {
    switch (tipo) {
      case "inimigo": pool = normalModelsTuti; break;
      case "elite": pool = eliteModelsTuti; break;
      case "boss": pool = bossModelsTuti; break;
      default:
        console.warn("Tipo desconhecido:", tipo);
        return;
    }
  } else {
    switch (tipo) {
      case "inimigo": pool = normalModels; break;
      case "inimigo2": pool = eliteModels; break;
      case "elite": pool = eliteModels; break;
      case "boss": pool = bossModels; break;
      default:
        console.warn("Tipo desconhecido:", tipo);
        return;
    }
  }

  // --- filtra inimigos pela zona ---
  const blocosZona = pool.filter(grupo =>
    grupo.some(enemy => enemy.zona === zonaAtual)
  );

  if (blocosZona.length === 0) {
    console.warn("Nenhum inimigo encontrado para zona:", zonaAtual, tipo);
    return;
  }

  // --- escolhe bloco aleatório compatível ---
  const block = blocosZona[Math.floor(Math.random() * blocosZona.length)];
  nomeInimigo = block;

  // --- instancia inimigos ---
  block.forEach(base => {
    const enemy = {
      name: base.name,
      hp: base.hp,
      maxHp: base.hp,
      dano: base.dano,
      behavior: base.behavior,
      tipoDano: base.tipoDano,
      tipoVida: base.tipoVida,
      el: createEnemy(base.img)
    };

    enemies.push(enemy);
    enemy.el.style.display = "inline-block";

    const lifeBar = document.createElement("p");
    lifeBar.className = "enemy-bar";
    lifeBar.innerHTML = `
      <strong> ⟪ ${enemy.name} ⟫ </strong><br>
      ⟪ <span class="enemy-vida">${enemy.tipoVida}</span> 
         <span class="enemy-hp">${enemy.hp}</span> - 
         <span class="enemy-dano">${enemy.tipoDano} ${enemy.dano}</span> ⟫
    `;
    document.getElementById("lifeBarsContainer").appendChild(lifeBar);

    enemy.barEl = lifeBar.querySelector(".enemy-hp");
    enemy.dmgEl = lifeBar.querySelector(".enemy-dano");
    enemy.tipoVidaEl = lifeBar.querySelector(".enemy-vida");
  });
};