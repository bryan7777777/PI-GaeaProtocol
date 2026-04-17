// CORRIGIDO: Guard booleano para impedir dupla execução da partida
let partidaJaSalva = false;

// CORRIGIDO: Flag para bloquear toda execução subsequente de checkGameOver
let isGameOverProcessed = false;

// CORRIGIDO: Contador de cartas jogadas — incrementado em main.js a cada carta usada
let cartasJogadas = 0;

/**
 * Verifica se o jogo acabou (jogador morreu ou inimigos eliminados)
 * Se sim, registra o resultado no servidor
 * 
 * PROTEÇÃO: Flag isGameOverProcessed bloqueia execução múltipla mesmo em setInterval/requestAnimationFrame
 */
function checkGameOver() {
  if (isGameOverProcessed) return; // bloqueia toda execução subsequente

  const playerDead  = playerHP <= 0;
  const enemiesGone = (typeof enemies !== 'undefined' && enemies.length === 0);
  
  if (!playerDead && !enemiesGone) return;

  isGameOverProcessed = true; // trava ANTES de qualquer async

  // Limpar loops
  if (typeof gameLoop !== 'undefined') clearInterval(gameLoop);
  if (typeof animFrame !== 'undefined') cancelAnimationFrame(animFrame);

  document.getElementById("cards").innerHTML = "";
  
  const resultado = playerDead ? 'Derrota' : 'Vitoria';
  registrarPartida(resultado);
}

/**
 * Registra uma partida no servidor
 * @param {string} resultado - 'Vitória' ou 'Derrota'
 */
function registrarPartida(resultado) {
  // CORRIGIDO: Guard booleano para impedir dupla execução
  if (partidaJaSalva) {
    console.warn('[Partida] Partida já registrada, ignorando chamada duplicada.');
    return;
  }
  partidaJaSalva = true;

  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');

  if (!userId) {
    console.warn('[Partida] ⚠️ Usuário não logado, partida não registrada');
    return;
  }

  console.log(`[Partida] ✓ Registrando ${resultado} para usuário ${userName} (ID: ${userId})`);

  // CORRIGIDO: Tempo calculado APÓS gameStartTime ter sido definido
  const tempoJogo = Math.floor((Date.now() - (window.gameStartTime || Date.now())) / 1000);

  // CORRIGIDO: Protocolo lido da variável global em vez de hardcoded
  const protocoloUsado =
    (typeof personagemSelecionado !== 'undefined' && personagemSelecionado)
      ? personagemSelecionado
      : 'Desconhecido';

  const dificuldade = 'Normal';

  // CORRIGIDO: Payload com cartas_jogadas e fase_atual lidos APÓS serem calculados
  const payload = {
    resultado:       resultado,
    lixoColetado:    (typeof lixoReciclado  !== 'undefined') ? lixoReciclado  : 0,
    dinheiroColetado:(typeof dinheiro       !== 'undefined') ? dinheiro       : 0,
    itensColetados:  JSON.stringify((typeof itensJaPegos !== 'undefined') ? itensJaPegos : []),
    cartasNoDeck:    JSON.stringify((typeof playerDeck   !== 'undefined') ? playerDeck   : []),
    buffsAtivos:     JSON.stringify((typeof buffs        !== 'undefined') ? buffs        : {}),
    zonaAlcancada:   (typeof zonaAtual      !== 'undefined') ? zonaAtual      : 0,
    wavesCompletadas:(typeof mapaBatalha    !== 'undefined') ? mapaBatalha    : 0,
    tempoJogo:       tempoJogo,
    protocoloUsado:  protocoloUsado,
    dificuldade:     dificuldade,
    // CORRIGIDO: cartas_jogadas incluído no payload e lido da variável global
    cartas_jogadas:  cartasJogadas,
    fase_atual:      (typeof mapaBatalha    !== 'undefined') ? mapaBatalha    : 0
  };

  // CORRIGIDO: Tratamento defensivo — lê como texto antes de parsear JSON
  fetch('../../php/registrar_partida.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(response => response.text())
  .then(text => {
    try {
      const data = JSON.parse(text);
      if (data.success) {
        console.log('[Partida] ✓ Registrada com sucesso:', data);
      } else {
        console.error('[Partida] Erro ao registrar:', data.error || data);
      }
    } catch (e) {
      // CORRIGIDO: Trata resposta inválida graciosamente sem quebrar o jogo
      console.error('[Partida] Resposta inválida do servidor:', text);
    }
  })
  .catch(err => console.error('[Partida] Erro na requisição:', err));
}

/**
 * Reseta flags de game over para nova partida
 * IMPORTANTE: Chamar quando reiniciar jogo
 */
function resetGameOverFlags() {
  isGameOverProcessed = false;
  partidaJaSalva = false;
  cartasJogadas = 0;
}