/* ── detik AI Floating Widget — Campak Outbreak scenario ── */
(function () {

  const css = `
    #detik-ai-fab {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 12px;
      font-family: 'Lato', sans-serif;
    }
    #detik-ai-bubble-btn {
      width: 56px; height: 56px;
      border-radius: 50%;
      background: #e8192c;
      border: none; cursor: pointer;
      box-shadow: 0 4px 20px rgba(232,25,44,0.45);
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.2s, box-shadow 0.2s;
      position: relative;
    }
    #detik-ai-bubble-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 28px rgba(232,25,44,0.55);
    }
    .detik-ai-pulse {
      position: absolute; inset: -4px;
      border-radius: 50%;
      border: 2px solid rgba(232,25,44,0.4);
      animation: aipulse 2s ease-out infinite;
    }
    @keyframes aipulse {
      0%   { transform: scale(1); opacity: 1; }
      100% { transform: scale(1.5); opacity: 0; }
    }
    #detik-ai-badge {
      position: absolute; top: -2px; right: -2px;
      width: 16px; height: 16px;
      background: #fff; border-radius: 50%;
      border: 2px solid #e8192c;
      font-size: 9px; font-weight: 900; color: #e8192c;
      display: flex; align-items: center; justify-content: center;
      line-height: 1;
    }
    #detik-ai-panel {
      width: 360px;
      background: #fff;
      border-radius: 14px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.18);
      display: none;
      flex-direction: column;
      overflow: hidden;
      border: 1px solid #eee;
    }
    #detik-ai-panel.open { display: flex; animation: panelIn 0.22s cubic-bezier(.34,1.56,.64,1) both; }
    @keyframes panelIn {
      from { opacity: 0; transform: scale(0.88) translateY(12px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }
    .ai-panel-head {
      background: #e8192c;
      padding: 12px 16px;
      display: flex; align-items: center; gap: 10px;
    }
    .ai-panel-head .ai-avatar {
      width: 32px; height: 32px;
      border-radius: 50%;
      background: rgba(255,255,255,0.2);
      display: flex; align-items: center; justify-content: center;
    }
    .ai-panel-head .ai-info { flex: 1; }
    .ai-panel-head .ai-name { font-size: 14px; font-weight: 900; color: #fff; }
    .ai-panel-head .ai-status { font-size: 11px; color: rgba(255,255,255,0.85); display: flex; align-items: center; gap: 4px; }
    .ai-panel-head .ai-status::before { content:''; width:6px; height:6px; border-radius:50%; background:#4ade80; display:inline-block; }
    .ai-panel-head .close-btn {
      background: none; border: none; color: rgba(255,255,255,0.8);
      font-size: 22px; cursor: pointer; line-height: 1; padding: 0;
    }
    .ai-greeting {
      padding: 16px 16px 10px;
      font-size: 13px;
      color: #1a1a1a;
      line-height: 1.55;
      background: #fafafa;
    }
    .ai-greeting strong { color: #e8192c; font-weight: 700; }
    .ai-greeting .greet-sub {
      font-size: 11px;
      color: #888;
      margin-top: 6px;
      font-style: italic;
    }
    .ai-suggestions-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 4px 14px 14px;
      background: #fafafa;
    }
    .ai-sug-card {
      background: #fff;
      border: 1.5px solid #e8e8e8;
      color: #1a1a1a;
      border-radius: 10px;
      padding: 11px 14px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      text-align: left;
      font-family: inherit;
      line-height: 1.45;
      transition: all 0.15s;
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }
    .ai-sug-card .sug-icon {
      color: #e8192c;
      font-size: 14px;
      margin-top: 1px;
      flex-shrink: 0;
    }
    .ai-sug-card.enabled:hover {
      border-color: #e8192c;
      background: #fff5f5;
      transform: translateX(3px);
    }
    .ai-sug-card.disabled {
      opacity: 0.45;
      cursor: not-allowed;
      background: #f4f4f4;
    }
    .ai-sug-card.disabled .sug-icon {
      color: #aaa;
    }
    .ai-disabled-hint {
      font-size: 10px;
      color: #aaa;
      margin-top: 2px;
      font-style: italic;
    }
    .ai-panel-footer {
      border-top: 1px solid #eee;
      padding: 10px 14px;
      background: #fff;
      font-size: 11px;
      color: #888;
      text-align: center;
    }
    .ai-panel-footer strong { color: #e8192c; }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const fab = document.createElement('div');
  fab.id = 'detik-ai-fab';
  fab.innerHTML = `
    <div id="detik-ai-panel">
      <div class="ai-panel-head">
        <div class="ai-avatar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="white" stroke-width="1.5"/>
            <path d="M8 10h8M8 14h5" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="ai-info">
          <div class="ai-name">detik AI</div>
          <div class="ai-status">Asisten berita cerdas</div>
        </div>
        <button class="close-btn" id="detik-ai-close">&times;</button>
      </div>

      <div class="ai-greeting">
        Halo! Saya <strong>detik AI</strong>. Pagi ini headline detikNews didominasi <strong>wabah campak 2026</strong>. Mau saya bantu jelaskan?
        <div class="greet-sub">Pilih salah satu pertanyaan di bawah ini:</div>
      </div>

      <div class="ai-suggestions-list">
        <button class="ai-sug-card enabled" data-q="Wabah campak 2026: seberapa luas penyebarannya?">
          <span class="sug-icon">›</span>
          <span>Wabah campak 2026: seberapa luas penyebarannya?</span>
        </button>
        <button class="ai-sug-card disabled" disabled>
          <span class="sug-icon">›</span>
          <span>
            Provinsi mana yang paling terdampak campak sekarang?
            <div class="ai-disabled-hint">demo terkunci</div>
          </span>
        </button>
        <button class="ai-sug-card disabled" disabled>
          <span class="sug-icon">›</span>
          <span>
            Respons Kemenkes terhadap lonjakan kasus campak
            <div class="ai-disabled-hint">demo terkunci</div>
          </span>
        </button>
        <button class="ai-sug-card disabled" disabled>
          <span class="sug-icon">›</span>
          <span>
            Campak berbahaya untuk anak di bawah 5 tahun?
            <div class="ai-disabled-hint">demo terkunci</div>
          </span>
        </button>
      </div>

      <div class="ai-panel-footer">
        Didukung oleh <strong>detik AI</strong> — model bahasa Indonesia
      </div>
    </div>

    <button id="detik-ai-bubble-btn" title="detik AI">
      <span class="detik-ai-pulse"></span>
      <span id="detik-ai-badge">AI</span>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="white" fill-opacity="0.15"/>
        <path d="M8 10h8M8 14h5" stroke="white" stroke-width="2" stroke-linecap="round"/>
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="12" cy="12" r="3" stroke="white" stroke-width="1.5" fill="none"/>
      </svg>
    </button>
  `;
  document.body.appendChild(fab);

  const panel     = document.getElementById('detik-ai-panel');
  const bubbleBtn = document.getElementById('detik-ai-bubble-btn');
  const closeBtn  = document.getElementById('detik-ai-close');

  bubbleBtn.addEventListener('click', () => {
    panel.classList.toggle('open');
  });
  closeBtn.addEventListener('click', () => panel.classList.remove('open'));

  // Only the enabled suggestion routes to ai-chat
  document.querySelectorAll('.ai-sug-card.enabled').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.dataset.q;
      // Mark scenario flag and pass query
      sessionStorage.setItem('detik_ai_scenario', 'campak_outbreak');
      sessionStorage.setItem('detik_ai_first_query', q);
      window.location.href = 'ai-chat-campak.html';
    });
  });

})();
