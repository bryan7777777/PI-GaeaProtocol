/**
 * ============================================================
 * CLIENTE JAVASCRIPT - API DE CONQUISTAS
 * ============================================================
 * Arquivo: /js/jogo/api/achievementsClient.js
 * 
 * Classe reutilizável para chamar a API de conquistas
 * com suporte a retry, validação e tratamento de erros.
 * 
 * Uso:
 *   const api = new AchievementsAPIClient({
 *     maxRetries: 3,
 *     retryDelay: 1000
 *   });
 *   
 *   // Listar conquistas
 *   const data = await api.listarConquistas(42);
 *   
 *   // Registrar desbloqueio
 *   await api.registrarConquistas([1, 5, 8], 42, 123);
 * 
 * ============================================================
 */

class AchievementsAPIClient {
    /**
     * Construtor
     * @param {Object} config Configuração
     *   - maxRetries: número de tentativas (padrão: 3)
     *   - retryDelay: delay entre tentativas em ms (padrão: 1000)
     *   - apiBaseUrl: URL base da API (padrão: '/php/api')
     */
    constructor(config = {}) {
        this.maxRetries = config.maxRetries || 3;
        this.retryDelay = config.retryDelay || 1000;
        this.apiBaseUrl = config.apiBaseUrl || '/php/api';
        this.endpoint = `${this.apiBaseUrl}/conquistas.php`;
        
        console.log('[AchievementsAPI] ✓ Cliente inicializado', {
            endpoint: this.endpoint,
            maxRetries: this.maxRetries,
            retryDelay: this.retryDelay
        });
    }

    /**
     * ============================================================
     * GET: Listar todas as conquistas com status de desbloqueio
     * ============================================================
     * @param {number} usuarioId ID do usuário
     * @returns {Promise<Object>} Resposta com lista de conquistas
     * 
     * Resposta:
     * {
     *   "status": "ok",
     *   "conquistas": [...],
     *   "total": 27,
     *   "desbloqueadas": 5,
     *   "progresso_percentual": 18.52
     * }
     */
    async listarConquistas(usuarioId) {
        if (!usuarioId || usuarioId <= 0) {
            throw new Error('usuarioId inválido');
        }

        const url = `${this.endpoint}?usuario_id=${usuarioId}`;

        try {
            const response = await this._fetchComRetry(url, {
                method: 'GET',
                credentials: 'include'
            });

            if (!response.ok) {
                const erro = await response.json();
                throw new Error(`HTTP ${response.status}: ${erro.mensagem || 'Erro ao listar conquistas'}`);
            }

            const data = await response.json();

            if (data.status !== 'ok') {
                throw new Error(data.mensagem || 'Erro desconhecido');
            }

            console.log(`[AchievementsAPI] ✓ Conquistas listadas para user ${usuarioId}`, {
                total: data.total,
                desbloqueadas: data.desbloqueadas,
                progresso: data.progresso_percentual + '%'
            });

            return data;

        } catch (erro) {
            console.error('[AchievementsAPI] ✗ Erro ao listar conquistas:', erro.message);
            throw erro;
        }
    }

    /**
     * ============================================================
     * POST: Registrar conquistas desbloqueadas
     * ============================================================
     * @param {Array<number>} conquistasDesbloqueadas Array com IDs (1-27)
     * @param {number} usuarioId ID do usuário
     * @param {number} numeroPartida ID da partida (opcional)
     * @returns {Promise<Object>} Resposta com resultado
     * 
     * Resposta:
     * {
     *   "status": "ok",
     *   "novas_conquistas": [1, 5],
     *   "conquistas_ja_desbloqueadas": [8],
     *   "total_novas": 2,
     *   "total_duplicadas": 1
     * }
     */
    async registrarConquistas(conquistasDesbloqueadas, usuarioId, numeroPartida = null) {
        // Validações
        if (!Array.isArray(conquistasDesbloqueadas)) {
            throw new Error('conquistasDesbloqueadas deve ser um array');
        }

        if (!usuarioId || usuarioId <= 0) {
            throw new Error('usuarioId inválido');
        }

        // Filtrar IDs válidos (1-27)
        const idsValidos = conquistasDesbloqueadas.filter(id => {
            id = parseInt(id);
            return id >= 1 && id <= 27;
        });

        if (idsValidos.length === 0) {
            console.log('[AchievementsAPI] ℹ️  Nenhuma conquista válida para registrar');
            return {
                status: 'ok',
                novas_conquistas: [],
                conquistas_ja_desbloqueadas: [],
                total_novas: 0,
                total_duplicadas: 0
            };
        }

        const payload = {
            usuario_id: usuarioId,
            conquistas_desbloqueadas: idsValidos
        };

        if (numeroPartida) {
            payload.numero_partida = numeroPartida;
        }

        try {
            const response = await this._fetchComRetry(this.endpoint, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const erro = await response.json();
                throw new Error(`HTTP ${response.status}: ${erro.mensagem || 'Erro ao registrar conquistas'}`);
            }

            const data = await response.json();

            if (data.status !== 'ok') {
                throw new Error(data.mensagem || 'Erro desconhecido');
            }

            console.log(`[AchievementsAPI] ✓ Conquistas registradas para user ${usuarioId}`, {
                novas: data.total_novas,
                duplicadas: data.total_duplicadas,
                ids: data.novas_conquistas
            });

            return data;

        } catch (erro) {
            console.error('[AchievementsAPI] ✗ Erro ao registrar conquistas:', erro.message);
            throw erro;
        }
    }

    /**
     * ============================================================
     * HELPER: Fetch com retry exponencial
     * ============================================================
     * @private
     * @param {string} url URL a requisitar
     * @param {Object} options Opções do fetch
     * @returns {Promise<Response>}
     */
    async _fetchComRetry(url, options = {}, tentativa = 0) {
        try {
            return await fetch(url, options);

        } catch (erro) {
            if (tentativa < this.maxRetries) {
                const delay = this.retryDelay * Math.pow(2, tentativa); // exponential backoff
                console.warn(`[AchievementsAPI] ⏳ Tentativa ${tentativa + 1}/${this.maxRetries} (aguardando ${delay}ms)`, erro.message);
                
                await this._sleep(delay);
                return this._fetchComRetry(url, options, tentativa + 1);
            }

            throw erro;
        }
    }

    /**
     * ============================================================
     * HELPER: Sleep
     * ============================================================
     * @private
     */
    _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * ============================================================
     * MÉTODO CONVENIENTE: Obter conquista por ID
     * ============================================================
     * @param {Array<Object>} conquistas Array retornado de listarConquistas()
     * @param {number} id ID da conquista (1-27)
     * @returns {Object|null}
     */
    buscarConquistaPorId(conquistas, id) {
        return conquistas.find(c => c.id === id) || null;
    }

    /**
     * ============================================================
     * MÉTODO CONVENIENTE: Filtrar por categoria
     * ============================================================
     * @param {Array<Object>} conquistas Array retornado de listarConquistas()
     * @param {string} categoria Categoria ('boss', 'escudo', 'vida', 'reciclagem', 'sinergia', 'outro')
     * @returns {Array<Object>}
     */
    filtrarPorCategoria(conquistas, categoria) {
        return conquistas.filter(c => c.categoria === categoria);
    }

    /**
     * ============================================================
     * MÉTODO CONVENIENTE: Obter apenas desbloqueadas
     * ============================================================
     * @param {Array<Object>} conquistas Array retornado de listarConquistas()
     * @returns {Array<Object>}
     */
    obterDesbloqueadas(conquistas) {
        return conquistas.filter(c => c.desbloqueada === true);
    }

    /**
     * ============================================================
     * MÉTODO CONVENIENTE: Obter apenas bloqueadas
     * ============================================================
     * @param {Array<Object>} conquistas Array retornado de listarConquistas()
     * @returns {Array<Object>}
     */
    obterBloqueadas(conquistas) {
        return conquistas.filter(c => c.desbloqueada === false);
    }

    /**
     * ============================================================
     * MÉTODO PARA TESTES: Listar todas as 27 conquistas
     * ============================================================
     */
    obterTodosOsIds() {
        return Array.from({ length: 27 }, (_, i) => i + 1);
    }
}

// ============================================================
// EXPORTAR PARA USO GLOBAL
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AchievementsAPIClient;
}
