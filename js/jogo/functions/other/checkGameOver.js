/**
 * Verifica se o jogo acabou (jogador morreu)
 * Se sim, registra a partida no servidor
 */
function checkGameOver() {
  // Se vida do jogador chegou a zero
  if (playerHP <= 0) {
    // Remove cartas da tela
    document.getElementById("cards").innerHTML = "";
    
    // Registra derrota no servidor
    registrarPartida('Derrota');
  }
}

/**
 * Registra uma partida no servidor
 * @param {string} resultado - 'Vitória' ou 'Derrota'
 */
function registrarPartida(resultado) {
  // Obtém ID do usuário do localStorage
  const userId = localStorage.getItem('userId');
  if (!userId) {
    console.log('Usuário não logado, partida não registrada');
    return;
  }
  
  // Calcula tempo de jogo (aproximado em segundos)
  const tempoJogo = Math.floor((Date.now() - (window.gameStartTime || Date.now())) / 1000);
  
  // Protocolo usado (FIXME: hardcoded, deveria ser dinâmico)
  const protocoloUsado = 'Gleba'; // TODO: Obter do personagem selecionado
  
  // Dificuldade (FIXME: hardcoded, deveria ser detectada)
  const dificuldade = 'Normal'; // TODO: Detectar dificuldade real
  
  // Monta dados da partida
  const data = {
    resultado: resultado,
    lixoColetado: lixoReciclado,
    dinheiroColetado: dinheiro,
    itensColetados: JSON.stringify(itensJaPegos),
    cartasNoDeck: JSON.stringify(playerDeck),
    buffsAtivos: JSON.stringify(buffs),
    zonaAlcancada: zonaAtual,
    wavesCompletadas: zonaAtual, // Usa zona como waves aproximadas
    tempoJogo: tempoJogo,
    protocoloUsado: protocoloUsado,
    dificuldade: dificuldade
  };
  
  // Envia para o servidor
  fetch('../../php/registrar_partida.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Partida registrada:', data);
    } else {
      console.error('Erro ao registrar partida:', data.error);
    }
  })
  .catch(err => console.error('Erro na requisição:', err));
};