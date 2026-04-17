/**
 * GAEA PROTOCOL - Game Enhancements
 * Sistema de autosave, resultado da run, notificações toast,
 * logout automático, continuar partida e compartilhamento.
 */

// ============================================================
// 1. SISTEMA DE TOAST NOTIFICATIONS
// ============================================================
const ToastSystem = (() => {
  let container = null;

  function init() {
    if (document.getElementById('toast-container')) return;
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = `
      position: fixed; top: 80px; right: 20px; z-index: 99999;
      display: flex; flex-direction: column; gap: 10px;
      pointer-events: none; max-width: 340px;
    `;
    document.body.appendChild(container);
  }

  function show(message, type = 'info', duration = 4000) {
    init();
    const icons = {
      success: '✅', error: '❌', warning: '⚠️',
      info: 'ℹ️', achievement: '🏆', conquest: '⚔️'
    };
    const colors = {
      success: '#2caf50', error: '#f44336', warning: '#ff9800',
      info: '#00bcd4', achievement: '#ffd700', conquest: '#9c27b0'
    };
    const toast = document.createElement('div');
    toast.style.cssText = `
      background: rgba(10,30,20,0.97);
      border: 2px solid ${colors[type] || colors.info};
      border-left: 5px solid ${colors[type] || colors.info};
      border-radius: 8px;
      padding: 14px 18px;
      color: #e0e0e0;
      font-family: 'Segoe UI', sans-serif;
      font-size: 14px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.6);
      pointer-events: all;
      cursor: pointer;
      opacity: 0;
      transform: translateX(120px);
      transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
      display: flex; align-items: flex-start; gap: 10px;
    `;
    toast.innerHTML = `
      <span style="font-size:18px;flex-shrink:0">${icons[type] || icons.info}</span>
      <div style="flex:1">
        <div style="color:${colors[type]};font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">${type.toUpperCase()}</div>
        <div>${message}</div>
      </div>
      <span style="color:#666;font-size:18px;line-height:1;flex-shrink:0" onclick="this.parentElement.remove()">×</span>
    `;
    container.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(0)';
    });
    const timer = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(120px)';
      setTimeout(() => toast.remove(), 350);
    }, duration);
    toast.addEventListener('click', () => {
      clearTimeout(timer);
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(120px)';
      setTimeout(() => toast.remove(), 350);
    });
    return toast;
  }

  return { show, init };
})();

window.ToastSystem = ToastSystem;

// ============================================================
// 2. SISTEMA DE AUTOSAVE
// ============================================================
const AutoSave = (() => {
  const KEY = 'gaea_run_save';
  const ZONES = [7, 14, 21, 28]; // após cada zona

  function save(data) {
    try {
      const save = {
        timestamp: Date.now(),
        version: '1.0',
        mapaBatalha: data.mapaBatalha ?? 0,
        zonaAtual: data.zonaAtual ?? 1,
        playerHP: data.playerHP ?? 100,
        playerMaxHP: data.playerMaxHP ?? 100,
        playerShield: data.playerShield ?? 0,
        playerShieldInit: data.playerShieldInit ?? 0,
        energy: data.energy ?? 3,
        energyMax: data.energyMax ?? 3,
        lixoReciclado: data.lixoReciclado ?? 0,
        dinheiro: data.dinheiro ?? 0,
        alma1: data.alma1 ?? 5,
        limiteMao: data.limiteMao ?? 5,
        maoInicio: data.maoInicio ?? 5,
        personagemSelecionado: data.personagemSelecionado ?? null,
        playerDeck: (data.playerDeck ?? []).map(c => ({ name: c.name, rarity: c.rarity, type: c.type, cost: c.cost, basePower: c.basePower, desc: c.desc, img: c.img })),
        itensJaPegos: data.itensJaPegos ?? [],
        SoliceApareceu: data.SoliceApareceu ?? false,
        dialogoAyla: data.dialogoAyla ?? false,
      };
      localStorage.setItem(KEY, JSON.stringify(save));
      return true;
    } catch (e) {
      console.warn('AutoSave falhou:', e);
      return false;
    }
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      const save = JSON.parse(raw);
      // Valida que o save tem menos de 24h
      if (Date.now() - save.timestamp > 86400000) {
        clear();
        return null;
      }
      return save;
    } catch (e) {
      return null;
    }
  }

  function clear() {
    localStorage.removeItem(KEY);
  }

  function hasSave() {
    return !!load();
  }

  function tryAutoSave(mapaBatalha) {
    if (ZONES.includes(mapaBatalha)) {
      const state = window._getGameState ? window._getGameState() : {};
      if (save(state)) {
        ToastSystem.show(`Progresso salvo automaticamente! Zona ${Math.ceil(mapaBatalha / 7)} concluída.`, 'success', 3000);
      }
    }
  }

  return { save, load, clear, hasSave, tryAutoSave };
})();

window.AutoSave = AutoSave;

// ============================================================
// 3. TELA DE RESULTADO DA RUN
// ============================================================
const RunResult = (() => {
  function show({ vitoria, personagem, lixoReciclado, dinheiro, mapaBatalha, itensJaPegos, playerDeck, playerMaxHP, tempoMs }) {
    AutoSave.clear();

    const overlay = document.createElement('div');
    overlay.id = 'run-result-overlay';
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:100000;
      background:rgba(0,0,0,0.92);
      display:flex;align-items:center;justify-content:center;
      padding:20px;
      overflow-y:auto;
    `;

    const tempoSeg = Math.floor((tempoMs || 0) / 1000);
    const tempoStr = tempoSeg > 3600
      ? `${Math.floor(tempoSeg/3600)}h ${Math.floor((tempoSeg%3600)/60)}m`
      : `${Math.floor(tempoSeg/60)}m ${tempoSeg%60}s`;

    const zona = Math.min(5, Math.ceil((mapaBatalha || 0) / 7));
    const runCode = btoa(JSON.stringify({
      v: vitoria ? 1 : 0,
      p: personagem,
      lr: lixoReciclado,
      d: dinheiro,
      mb: mapaBatalha,
      t: tempoSeg,
      ts: Date.now()
    })).replace(/=/g, '');
    const shareUrl = `${window.location.origin}${window.location.pathname}?run=${runCode}`;

    overlay.innerHTML = `
      <div style="
        background:linear-gradient(135deg,#0a1f15,#0d2c1c);
        border:2px solid ${vitoria ? '#2caf50' : '#f44336'};
        border-radius:16px;
        max-width:700px;width:100%;
        box-shadow:0 0 60px ${vitoria ? 'rgba(44,175,80,0.3)' : 'rgba(244,67,54,0.3)'};
        overflow:hidden;
        animation:resultSlideIn .5s cubic-bezier(0.34,1.56,0.64,1);
      ">
        <!-- Header -->
        <div style="
          background:${vitoria ? 'linear-gradient(135deg,rgba(44,175,80,0.3),rgba(44,175,80,0.1))' : 'linear-gradient(135deg,rgba(244,67,54,0.3),rgba(244,67,54,0.1))'};
          padding:30px;text-align:center;
          border-bottom:1px solid ${vitoria ? 'rgba(44,175,80,0.3)' : 'rgba(244,67,54,0.3)'};
        ">
          <div style="font-size:64px;margin-bottom:10px">${vitoria ? '🏆' : '💀'}</div>
          <h1 style="margin:0;font-family:'Megrim',cursive;font-size:2.5rem;color:${vitoria ? '#2caf50' : '#f44336'};text-shadow:0 0 20px currentColor">
            ${vitoria ? 'VITÓRIA!' : 'DERROTA'}
          </h1>
          <p style="margin:8px 0 0;color:#90ee90;font-size:1rem">${vitoria ? 'O planeta foi restaurado!' : 'A IA prevaleceu desta vez...'}</p>
        </div>

        <!-- Stats Grid -->
        <div style="padding:25px;display:grid;grid-template-columns:repeat(3,1fr);gap:15px">
          ${stat('♻️', 'Lixo Reciclado', lixoReciclado)}
          ${stat('🪙', 'Dinheiro', dinheiro)}
          ${stat('🗺️', 'Zona Atingida', `${zona}/5`)}
          ${stat('📍', 'Batalhas', mapaBatalha)}
          ${stat('⏱️', 'Tempo', tempoStr)}
          ${stat('🃏', 'Cartas no Deck', playerDeck?.length ?? '?')}
        </div>

        <!-- Mini bar chart: lixo por zona (simulado) -->
        <div style="padding:0 25px 20px">
          <div style="font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px">Progresso por Zona</div>
          <div style="display:flex;gap:8px;align-items:flex-end;height:60px">
            ${[1,2,3,4,5].map(z => {
              const pct = z <= zona ? (z === zona && !vitoria ? 40 : 100) : 0;
              const col = z < zona ? '#2caf50' : z === zona ? (vitoria ? '#2caf50' : '#f44336') : '#1a2a20';
              return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
                <div style="width:100%;background:${col};height:${Math.max(4, pct * 0.6)}px;border-radius:3px;transition:height .5s ease;opacity:${pct?1:.3}"></div>
                <div style="font-size:10px;color:#666">Z${z}</div>
              </div>`;
            }).join('')}
          </div>
        </div>

        <!-- Itens coletados -->
        ${itensJaPegos?.length ? `
        <div style="padding:0 25px 20px">
          <div style="font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px">Relíquias Coletadas (${itensJaPegos.length})</div>
          <div style="font-size:24px;letter-spacing:4px">${'🔮'.repeat(Math.min(itensJaPegos.length, 10))}${itensJaPegos.length > 10 ? ` +${itensJaPegos.length - 10}` : ''}</div>
        </div>` : ''}

        <!-- Ações -->
        <div style="padding:20px 25px 25px;display:flex;flex-wrap:wrap;gap:12px;border-top:1px solid rgba(44,175,80,0.15)">
          <button onclick="RunResult.hide();location.reload()" style="${btnStyle('#2caf50')}">
            🔄 Nova Run
          </button>
          <button onclick="RunResult.share('${shareUrl}')" style="${btnStyle('#00bcd4')}">
            🔗 Compartilhar Run
          </button>
          <button onclick="RunResult.hide()" style="${btnStyle('#555','#aaa')}">
            ✕ Fechar
          </button>
        </div>
      </div>
      <style>
        @keyframes resultSlideIn {
          from { opacity:0; transform:scale(0.8) translateY(40px) }
          to { opacity:1; transform:scale(1) translateY(0) }
        }
      </style>
    `;

    document.body.appendChild(overlay);

    // Registrar partida no servidor
    _registrarPartida({ vitoria, lixoReciclado, mapaBatalha, tempoMs, personagem });
  }

  function stat(icon, label, value) {
    return `
      <div style="
        background:rgba(0,0,0,0.3);border:1px solid rgba(44,175,80,0.2);
        border-radius:8px;padding:15px;text-align:center;
      ">
        <div style="font-size:20px;margin-bottom:6px">${icon}</div>
        <div style="font-size:11px;color:#666;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">${label}</div>
        <div style="font-size:1.3rem;font-weight:bold;color:#2caf50">${value}</div>
      </div>`;
  }

  function btnStyle(bg, color = '#0a1f15') {
    return `
      padding:12px 20px;background:${bg};color:${color};
      border:none;border-radius:8px;cursor:pointer;font-weight:bold;
      font-size:14px;transition:all .3s;
      flex:1;min-width:140px;
    `;
  }

  function hide() {
    const el = document.getElementById('run-result-overlay');
    if (el) el.remove();
  }

  function share(url) {
    if (navigator.share) {
      navigator.share({ title: 'Gaea Protocol - Minha Run', url }).catch(() => copyToClipboard(url));
    } else {
      copyToClipboard(url);
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      ToastSystem.show('Link copiado para a área de transferência!', 'success');
    }).catch(() => {
      prompt('Copie o link da sua run:', text);
    });
  }

  async function _registrarPartida({ vitoria, lixoReciclado, mapaBatalha, tempoMs, personagem }) {
    try {
      // Detecta base path
      const pathname = window.location.pathname;
      let basePath = pathname.includes('/PI-GaeaProtocol/') ? '/PI-GaeaProtocol' : '/PI-GaeaProtocol';
      
      await fetch(basePath + '/php/registrar_partida.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resultado: vitoria ? 'Vitória' : 'Derrota',
          lixoColetado: lixoReciclado || 0,
          wavesCompletadas: mapaBatalha || 0,
          tempoJogo: Math.floor((tempoMs || 0) / 1000),
          protocoloUsado: personagem || 'Desconhecido',
          dificuldade: 'Normal'
        })
      });
    } catch (e) {
      // Offline ou não logado – silencioso
    }
  }

  return { show, hide, share };
})();

window.RunResult = RunResult;

// ============================================================
// 4. LOGOUT AUTOMÁTICO POR INATIVIDADE
// ============================================================
const AutoLogout = (() => {
  const TIMEOUT = 30 * 60 * 1000; // 30 min
  const WARN_BEFORE = 2 * 60 * 1000; // avisa 2 min antes
  let timer = null;
  let warnTimer = null;
  let warnToast = null;
  let active = false;

  function reset() {
    if (!active) return;
    clearTimeout(timer);
    clearTimeout(warnTimer);
    if (warnToast) { warnToast.remove(); warnToast = null; }

    warnTimer = setTimeout(() => {
      warnToast = ToastSystem.show(
        '⚠️ Sua sessão expirará em 2 minutos por inatividade. Clique aqui para continuar.',
        'warning', WARN_BEFORE
      );
      warnToast.addEventListener('click', reset);
    }, TIMEOUT - WARN_BEFORE);

    timer = setTimeout(() => {
      ToastSystem.show('Sessão encerrada por inatividade.', 'info');
      setTimeout(() => { window.location.href = '/php/User/logout.php'; }, 1500);
    }, TIMEOUT);
  }

  function start() {
    active = true;
    ['mousemove','keydown','click','scroll','touchstart'].forEach(e => {
      document.addEventListener(e, reset, { passive: true });
    });
    reset();
  }

  function stop() {
    active = false;
    clearTimeout(timer);
    clearTimeout(warnTimer);
  }

  return { start, stop, reset };
})();

window.AutoLogout = AutoLogout;

// ============================================================
// 5. BANNER "CONTINUAR PARTIDA"
// ============================================================
const ContinueRun = (() => {
  function check(onContinue, onNew) {
    const save = AutoSave.load();
    if (!save) { if (onNew) onNew(); return; }

    const date = new Date(save.timestamp);
    const dateStr = date.toLocaleString('pt-BR', { day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit' });
    const zona = Math.min(5, Math.ceil((save.mapaBatalha || 0) / 7));

    const modal = document.createElement('div');
    modal.style.cssText = `
      position:fixed;inset:0;z-index:99999;
      background:rgba(0,0,0,0.85);
      display:flex;align-items:center;justify-content:center;padding:20px;
    `;
    modal.innerHTML = `
      <div style="
        background:linear-gradient(135deg,#0a1f15,#0d2c1c);
        border:2px solid #2caf50;border-radius:16px;
        max-width:460px;width:100%;padding:32px;
        box-shadow:0 0 60px rgba(44,175,80,0.3);
        animation:resultSlideIn .4s ease;text-align:center;
      ">
        <div style="font-size:52px;margin-bottom:12px">💾</div>
        <h2 style="margin:0 0 8px;color:#2caf50;font-family:'Megrim',cursive;font-size:1.8rem">Run Salva Encontrada</h2>
        <p style="color:#90ee90;margin:0 0 6px">Salvo em ${dateStr}</p>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin:20px 0">
          <div style="background:rgba(0,0,0,0.3);border:1px solid rgba(44,175,80,0.2);border-radius:8px;padding:12px">
            <div style="font-size:11px;color:#666;margin-bottom:4px">ZONA</div>
            <div style="color:#2caf50;font-size:1.4rem;font-weight:bold">${zona}/5</div>
          </div>
          <div style="background:rgba(0,0,0,0.3);border:1px solid rgba(44,175,80,0.2);border-radius:8px;padding:12px">
            <div style="font-size:11px;color:#666;margin-bottom:4px">HP</div>
            <div style="color:#2caf50;font-size:1.4rem;font-weight:bold">${save.playerHP}</div>
          </div>
          <div style="background:rgba(0,0,0,0.3);border:1px solid rgba(44,175,80,0.2);border-radius:8px;padding:12px">
            <div style="font-size:11px;color:#666;margin-bottom:4px">♻️</div>
            <div style="color:#2caf50;font-size:1.4rem;font-weight:bold">${save.lixoReciclado}</div>
          </div>
        </div>
        <div style="display:flex;gap:12px">
          <button id="continue-btn" style="flex:1;padding:14px;background:#2caf50;color:#0a1f15;border:none;border-radius:8px;cursor:pointer;font-weight:bold;font-size:15px">
            ▶ Continuar Run
          </button>
          <button id="newrun-btn" style="flex:1;padding:14px;background:rgba(244,67,54,0.2);color:#f44336;border:2px solid #f44336;border-radius:8px;cursor:pointer;font-weight:bold;font-size:15px">
            🗑 Nova Run
          </button>
        </div>
      </div>
      <style>@keyframes resultSlideIn{from{opacity:0;transform:scale(.8) translateY(40px)}to{opacity:1;transform:scale(1) translateY(0)}}</style>
    `;

    document.body.appendChild(modal);

    modal.querySelector('#continue-btn').onclick = () => {
      modal.remove();
      if (onContinue) onContinue(save);
    };
    modal.querySelector('#newrun-btn').onclick = () => {
      AutoSave.clear();
      modal.remove();
      if (onNew) onNew();
    };
  }

  function restore(save) {
    // Restaura variáveis globais do jogo
    if (typeof window.mapaBatalha !== 'undefined') window.mapaBatalha = save.mapaBatalha;
    if (typeof window.zonaAtual !== 'undefined') window.zonaAtual = save.zonaAtual;
    if (typeof window.playerHP !== 'undefined') window.playerHP = save.playerHP;
    if (typeof window.playerMaxHP !== 'undefined') window.playerMaxHP = save.playerMaxHP;
    if (typeof window.playerShield !== 'undefined') window.playerShield = save.playerShield;
    if (typeof window.playerShieldInit !== 'undefined') window.playerShieldInit = save.playerShieldInit;
    if (typeof window.energy !== 'undefined') window.energy = save.energy;
    if (typeof window.energyMax !== 'undefined') window.energyMax = save.energyMax;
    if (typeof window.lixoReciclado !== 'undefined') window.lixoReciclado = save.lixoReciclado;
    if (typeof window.dinheiro !== 'undefined') window.dinheiro = save.dinheiro;
    if (typeof window.alma1 !== 'undefined') window.alma1 = save.alma1;
    if (typeof window.limiteMao !== 'undefined') window.limiteMao = save.limiteMao;
    if (typeof window.maoInicio !== 'undefined') window.maoInicio = save.maoInicio;
    if (typeof window.personagemSelecionado !== 'undefined') window.personagemSelecionado = save.personagemSelecionado;
    if (typeof window.itensJaPegos !== 'undefined') window.itensJaPegos = save.itensJaPegos || [];
    if (typeof window.SoliceApareceu !== 'undefined') window.SoliceApareceu = save.SoliceApareceu;
    if (typeof window.dialogoAyla !== 'undefined') window.dialogoAyla = save.dialogoAyla;

    // Restaurar deck (referenciar a allCards se disponível)
    if (save.playerDeck && typeof window.allCards !== 'undefined') {
      window.playerDeck = save.playerDeck.map(savedCard => {
        const found = window.allCards.find(c => c.name === savedCard.name);
        return found ? { ...found, power: found.basePower } : savedCard;
      });
    }

    ToastSystem.show(`Run restaurada! Zona ${save.zonaAtual}, HP ${save.playerHP}`, 'success');
  }

  return { check, restore };
})();

window.ContinueRun = ContinueRun;

// ============================================================
// 6. COMPARTILHAMENTO DE RUN
// ============================================================
const ShareRun = (() => {
  function encode(data) {
    return btoa(JSON.stringify(data)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  }

  function decode(str) {
    try {
      const padded = str.replace(/-/g, '+').replace(/_/g, '/');
      const pad = padded.length % 4;
      return JSON.parse(atob(pad ? padded + '===='.slice(pad) : padded));
    } catch { return null; }
  }

  function generateLink({ vitoria, personagem, lixoReciclado, dinheiro, mapaBatalha, tempoSeg }) {
    const data = encode({ v: vitoria?1:0, p: personagem, lr: lixoReciclado, d: dinheiro, mb: mapaBatalha, t: tempoSeg, ts: Math.floor(Date.now()/1000) });
    return `${location.origin}${location.pathname}?run=${data}`;
  }

  function checkUrlRun() {
    const params = new URLSearchParams(location.search);
    const runParam = params.get('run');
    if (!runParam) return null;
    const data = decode(runParam);
    if (!data) return null;
    return {
      vitoria: !!data.v,
      personagem: data.p,
      lixoReciclado: data.lr,
      dinheiro: data.d,
      mapaBatalha: data.mb,
      tempoSeg: data.t,
      timestamp: data.ts * 1000
    };
  }

  function showSharedResult(runData) {
    const ts = new Date(runData.timestamp).toLocaleString('pt-BR');
    const banner = document.createElement('div');
    banner.style.cssText = `
      position:fixed;top:80px;left:50%;transform:translateX(-50%);
      z-index:99998;background:rgba(10,30,20,0.97);
      border:2px solid #00bcd4;border-radius:12px;
      padding:20px 28px;text-align:center;
      box-shadow:0 8px 32px rgba(0,188,212,0.3);
      max-width:460px;width:90%;
    `;
    banner.innerHTML = `
      <div style="font-size:11px;color:#00bcd4;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">🔗 Run Compartilhada</div>
      <div style="font-size:1.3rem;font-weight:bold;color:${runData.vitoria?'#2caf50':'#f44336'};margin-bottom:4px">
        ${runData.vitoria ? '🏆 Vitória' : '💀 Derrota'}
        ${runData.personagem ? ` — ${runData.personagem}` : ''}
      </div>
      <div style="color:#90ee90;font-size:13px;margin-bottom:12px">${ts}</div>
      <div style="display:flex;gap:16px;justify-content:center;font-size:13px;color:#b0b0b0">
        <span>♻️ ${runData.lixoReciclado ?? '?'}</span>
        <span>🗺️ ${Math.min(5, Math.ceil((runData.mapaBatalha||0)/7))}/5 zonas</span>
        <span>⏱️ ${Math.floor((runData.tempoSeg||0)/60)}m</span>
      </div>
      <button onclick="this.parentElement.remove()" style="
        margin-top:14px;padding:8px 20px;background:rgba(0,188,212,0.2);
        color:#00bcd4;border:1px solid #00bcd4;border-radius:6px;cursor:pointer;font-size:13px
      ">Fechar</button>
    `;
    document.body.appendChild(banner);
    setTimeout(() => banner.remove(), 12000);
  }

  return { generateLink, checkUrlRun, showSharedResult, encode, decode };
})();

window.ShareRun = ShareRun;

// ============================================================
// 7. CONQUISTAS / NOTIFICAÇÕES IN-GAME
// ============================================================
const Achievements = (() => {
  const STORAGE_KEY = 'gaea_achievements_unlocked';

  function getUnlocked() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  }

  function unlock(id, name, desc) {
    const unlocked = getUnlocked();
    if (unlocked.includes(id)) return;
    unlocked.push(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(unlocked));
    ToastSystem.show(`<strong>${name}</strong><br><small>${desc}</small>`, 'achievement', 6000);
  }

  function check(gameState) {
    const { lixoReciclado, playerShield, playerMaxHP, vitoria, mapaBatalha } = gameState;
    if (lixoReciclado >= 150) unlock('eco_start', '🌱 O Começo', 'Reciclou 150 lixos em uma run.');
    if (playerShield >= 200) unlock('shield_200', '🛡️ Reforçado', 'Conseguiu 200 de escudo em uma partida.');
    if (playerMaxHP >= 300) unlock('hp_300', '❤️ Vitalício', 'Chegou a 300 de vida máxima.');
    if (vitoria) unlock('first_win', '🏆 Líder', 'Conquistou sua primeira vitória.');
    if (mapaBatalha >= 35) unlock('all_zones', '🌍 Completo', 'Concluiu todas as 5 zonas.');
  }

  return { unlock, check, getUnlocked };
})();

window.Achievements = Achievements;

// ============================================================
// 8. HELPER: expor estado do jogo para o AutoSave
// ============================================================
window._getGameState = function() {
  return {
    mapaBatalha: typeof mapaBatalha !== 'undefined' ? mapaBatalha : 0,
    zonaAtual: typeof zonaAtual !== 'undefined' ? zonaAtual : 1,
    playerHP: typeof playerHP !== 'undefined' ? playerHP : 100,
    playerMaxHP: typeof playerMaxHP !== 'undefined' ? playerMaxHP : 100,
    playerShield: typeof playerShield !== 'undefined' ? playerShield : 0,
    playerShieldInit: typeof playerShieldInit !== 'undefined' ? playerShieldInit : 0,
    energy: typeof energy !== 'undefined' ? energy : 3,
    energyMax: typeof energyMax !== 'undefined' ? energyMax : 3,
    lixoReciclado: typeof lixoReciclado !== 'undefined' ? lixoReciclado : 0,
    dinheiro: typeof dinheiro !== 'undefined' ? dinheiro : 0,
    alma1: typeof alma1 !== 'undefined' ? alma1 : 5,
    limiteMao: typeof limiteMao !== 'undefined' ? limiteMao : 5,
    maoInicio: typeof maoInicio !== 'undefined' ? maoInicio : 5,
    personagemSelecionado: typeof personagemSelecionado !== 'undefined' ? personagemSelecionado : null,
    playerDeck: typeof playerDeck !== 'undefined' ? playerDeck : [],
    itensJaPegos: typeof itensJaPegos !== 'undefined' ? itensJaPegos : [],
    SoliceApareceu: typeof SoliceApareceu !== 'undefined' ? SoliceApareceu : false,
    dialogoAyla: typeof dialogoAyla !== 'undefined' ? dialogoAyla : false,
  };
};

// ============================================================
// 9. INICIALIZAÇÃO AUTOMÁTICA
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  ToastSystem.init();

  // Verificar run compartilhada na URL
  const sharedRun = ShareRun.checkUrlRun();
  if (sharedRun) {
    setTimeout(() => ShareRun.showSharedResult(sharedRun), 1000);
  }

  // Auto logout apenas em páginas autenticadas (dashboard)
  if (document.body.dataset.authenticated === 'true') {
    AutoLogout.start();
  }
});