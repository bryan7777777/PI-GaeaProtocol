/**
 * GAEA PROTOCOL - Game API Client
 * 
 * Arquivo: /js/jogo/api/gameApiClient.js
 * Descrição: Cliente para comunicação com API REST de partidas.
 *            Cuida de validação, retry, fallback local.
 * 
 * Uso:
 *   const client = new GameAPIClient();
 *   await client.salvarPartida(dados);
 */

class GameAPIClient {
    constructor(config = {}) {
        // Configurações padrão
        this.apiUrl = config.apiUrl || '/php/api/partida.php';
        this.maxRetries = config.maxRetries || 3;
        this.retryDelay = config.retryDelay || 1000; // ms
        this.timeout = config.timeout || 10000; // ms
        this.useLocalStorage = config.useLocalStorage !== false; // true por padrão

        // Chave do localStorage para fallback
        this.storageKey = 'gaea_partidas_pendentes';
    }

    /**
     * Valida struktura mínima do payload
     * Retorna { válido: bool, erros: string[] }
     */
    validarPayload(dados) {
        const erros = [];

        // Campos obrigatórios de nível 1
        if (!Number.isInteger(dados.usuario_id) || dados.usuario_id <= 0) {
            erros.push('usuario_id deve ser um inteiro positivo');
        }

        const resultadosValidos = ['vitoria', 'derrota'];
        if (!resultadosValidos.includes(String(dados.resultado).toLowerCase())) {
            erros.push('resultado deve ser "vitoria" ou "derrota"');
        }

        if (!Number.isInteger(dados.pontuacao) || dados.pontuacao < 0) {
            erros.push('pontuacao deve ser um inteiro não-negativo');
        }

        if (!Number.isInteger(dados.duracao_segundos) || dados.duracao_segundos < 0) {
            erros.push('duracao_segundos deve ser um inteiro não-negativo');
        }

        // data_hora é opcional, mas se presente deve ser válida
        if (dados.data_hora && !this.validarDataISO8601(dados.data_hora)) {
            erros.push('data_hora deve estar em formato ISO 8601 (YYYY-MM-DDTHH:MM:SS)');
        }

        // Objeto estatisticas obrigatório
        if (!dados.estatisticas || typeof dados.estatisticas !== 'object') {
            erros.push('estatisticas deve ser um objeto JSON');
        } else {
            const statsErros = this.validarEstatisticas(dados.estatisticas);
            erros.push(...statsErros);
        }

        return {
            válido: erros.length === 0,
            erros: erros
        };
    }

    /**
     * Valida objeto de estatísticas
     */
    validarEstatisticas(stats) {
        const erros = [];
        const campos = [
            'cartas_jogadas',
            'dinheiro_acumulado',
            'dinheiro_gasto',
            'lixo_reciclado',
            'dano_total',
            'cura_total',
            'rodadas_sobrevividas'
        ];

        campos.forEach(campo => {
            const valor = stats[campo];
            if (!Number.isInteger(valor) || valor < 0) {
                erros.push(`estatisticas.${campo} deve ser um inteiro não-negativo`);
            }
        });

        return erros;
    }

    /**
     * Valida formato ISO 8601
     */
    validarDataISO8601(data) {
        const formato = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z?$/;
        return formato.test(data);
    }

    /**
     * Salva partida com retry e fallback
     * Retorna { sucesso: bool, partidaId?: number, erro?: string }
     */
    async salvarPartida(dados) {
        console.log('[GameAPI] Iniciando salvamento de partida...');

        // Validar payload
        const validacao = this.validarPayload(dados);
        if (!validacao.válido) {
            const mensagem = `Dados inválidos: ${validacao.erros.join(', ')}`;
            console.error('[GameAPI]', mensagem);
            return { sucesso: false, erro: mensagem };
        }

        // Tentar enviar para servidor com retries
        let ultimoErro = null;
        for (let tentativa = 1; tentativa <= this.maxRetries; tentativa++) {
            try {
                console.log(`[GameAPI] Tentativa ${tentativa}/${this.maxRetries}...`);
                const resposta = await this.enviarParaServidor(dados);

                if (resposta.sucesso) {
                    console.log('[GameAPI] ✓ Partida salva com sucesso!', resposta);
                    // Remover de pendentes se estava lá
                    this.removerDePendentes(dados);
                    return resposta;
                } else {
                    ultimoErro = resposta.erro;
                    // Se foi erro de autenticação, não fazer retry
                    if (resposta.statusCode === 401) {
                        console.warn('[GameAPI] Erro 401: Usuário não autenticado');
                        return resposta;
                    }
                }
            } catch (erro) {
                ultimoErro = erro.message;
                console.warn(`[GameAPI] Tentativa ${tentativa} falhou:`, erro);

                // Aguardar antes de retry (exceto na última tentativa)
                if (tentativa < this.maxRetries) {
                    const delay = this.retryDelay * Math.pow(2, tentativa - 1); // Exponential backoff
                    console.log(`[GameAPI] Aguardando ${delay}ms antes de retry...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }

        // Todas as tentativas falharam - usar fallback local
        console.warn('[GameAPI] Todas as tentativas falharam. Usando fallback local.');
        if (this.useLocalStorage) {
            this.armazenarPendente(dados);
            console.log('[GameAPI] Partida armazenada localmente. Sincronizará quando reconectar.');
            return {
                sucesso: false,
                erro: 'Sem conexão com servidor. Partida armazenada localmente.',
                armazenadoLocalmente: true
            };
        }

        return {
            sucesso: false,
            erro: `Erro após ${this.maxRetries} tentativas: ${ultimoErro}`
        };
    }

    /**
     * Envia dados para o servidor
     * Retorna { sucesso: bool, partidaId?: number, statusCode?: number, erro?: string }
     */
    async enviarParaServidor(dados) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(dados),
                credentials: 'same-origin', // Enviar cookies de sessão
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            const resposta = await response.json();

            if (response.ok && resposta.status === 'ok') {
                return {
                    sucesso: true,
                    partidaId: resposta.dados?.partida_id,
                    usuarioId: resposta.dados?.usuario_id
                };
            } else {
                return {
                    sucesso: false,
                    statusCode: response.status,
                    erro: resposta.mensagem || 'Erro desconhecido'
                };
            }

        } catch (erro) {
            if (erro.name === 'AbortError') {
                throw new Error('Timeout na requisição (> ' + this.timeout + 'ms)');
            }
            throw erro;
        }
    }

    /**
     * Armazena partida no localStorage para sincronizar depois
     */
    armazenarPendente(dados) {
        if (!this.useLocalStorage) return;

        try {
            const pendentes = this.obterPendentes();
            pendentes.push({
                dados: dados,
                timestamp: new Date().toISOString(),
                tentativas: 0
            });
            localStorage.setItem(this.storageKey, JSON.stringify(pendentes));
        } catch (erro) {
            console.error('[GameAPI] Erro ao armazenar no localStorage:', erro);
        }
    }

    /**
     * Obtém partidas pendentes do localStorage
     */
    obterPendentes() {
        if (!this.useLocalStorage) return [];

        try {
            const dados = localStorage.getItem(this.storageKey);
            return dados ? JSON.parse(dados) : [];
        } catch (erro) {
            console.error('[GameAPI] Erro ao ler localStorage:', erro);
            return [];
        }
    }

    /**
     * Remove partida de pendentes após sucesso
     */
    removerDePendentes(dados) {
        if (!this.useLocalStorage) return;

        try {
            let pendentes = this.obterPendentes();
            // Comparar por usuário_id e resultado (aproximado)
            pendentes = pendentes.filter(p =>
                !(p.dados.usuario_id === dados.usuario_id &&
                  p.dados.resultado === dados.resultado)
            );
            localStorage.setItem(this.storageKey, JSON.stringify(pendentes));
        } catch (erro) {
            console.error('[GameAPI] Erro ao remover de pendentes:', erro);
        }
    }

    /**
     * Tenta sincronizar partidas pendentes
     * Chamada periódica ou quando conexão é restabelecida
     */
    async sincronizarPendentes() {
        const pendentes = this.obterPendentes();
        if (pendentes.length === 0) {
            console.log('[GameAPI] Nenhuma partida pendente');
            return { sucesso: true, sincronizadas: 0 };
        }

        console.log(`[GameAPI] Sincronizando ${pendentes.length} partidas pendentes...`);
        let sincronizadas = 0;

        for (const item of pendentes) {
            const resultado = await this.salvarPartida(item.dados);
            if (resultado.sucesso) {
                sincronizadas++;
            }
        }

        console.log(`[GameAPI] ${sincronizadas}/${pendentes.length} partidas sincronizadas`);
        return { sucesso: true, sincronizadas };
    }

    /**
     * Inicializa sincronização periódica a cada intervalo
     */
    iniciarSincronizacaoPeriodica(intervaloMs = 30000) {
        console.log(`[GameAPI] Sincronização periódica ativada (${intervaloMs}ms)`);
        setInterval(() => {
            this.sincronizarPendentes().catch(erro =>
                console.error('[GameAPI] Erro na sincronização periódica:', erro)
            );
        }, intervaloMs);
    }
}

// Exportar para uso global
window.GameAPIClient = GameAPIClient;

// ============================================================
// EXEMPLO DE USO NO JOGO
// ============================================================

/*

// No arquivo principal do jogo, após importar este script:

// 1. INICIALIZAR CLIENTE
const gameApi = new GameAPIClient({
    maxRetries: 3,
    retryDelay: 1000,
    useLocalStorage: true
});

// 2. INICIAR SINCRONIZAÇÃO PERIÓDICA (opcional)
gameApi.iniciarSincronizacaoPeriodica(30000); // A cada 30 segundos

// 3. QUANDO A PARTIDA TERMINAR
async function finalizarPartida(resultado, pontos, tempoInicio) {
    const dados = {
        usuario_id: window.USER_ID, // Obter do HTML ou server
        resultado: resultado, // "vitoria" or "derrota"
        pontuacao: pontos,
        duracao_segundos: Math.floor((Date.now() - tempoInicio) / 1000),
        data_hora: new Date().toISOString().slice(0, 19),
        estatisticas: {
            cartas_jogadas: window.STATS.cartas,
            dinheiro_acumulado: window.STATS.dinheiro,
            dinheiro_gasto: window.STATS.gasto,
            lixo_reciclado: window.STATS.lixo,
            dano_total: window.STATS.dano,
            cura_total: window.STATS.cura,
            rodadas_sobrevividas: window.STATS.rodadas
        }
    };

    const resposta = await gameApi.salvarPartida(dados);
    
    if (resposta.sucesso) {
        // Mostrar tela de resultado
        mostrarTelaResultado(resposta.partidaId);
    } else if (resposta.armazenadoLocalmente) {
        // Mostrar tela com aviso de offline
        mostrarTelaResultadoOffline();
    } else {
        // Mostrar erro
        mostrarErro(resposta.erro);
    }
}

*/
