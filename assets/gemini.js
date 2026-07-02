/* ============================================================
   blue. — Cliente do Gemini
   Dois modos de conexão, nesta ordem de preferência:
   1) Netlify Function (/.netlify/functions/gemini) — a chave fica
      segura no servidor (variável de ambiente GEMINI_API_KEY).
   2) Chave local no navegador (localStorage) — para uso imediato
      sem deploy, configurada pelo link "Configurar chave".
   ============================================================ */
(function(){
  const CHAVE_LOCAL = 'blue_gemini_api_key';
  const MODELO = 'gemini-2.0-flash';
  let netlifyOk = null; // cache: null = ainda não testado

  function chaveLocal(){ return (localStorage.getItem(CHAVE_LOCAL)||'').trim(); }

  function configurarChave(){
    const atual = chaveLocal();
    const nova = prompt(
      'Cole aqui a sua chave da API do Gemini (Google AI Studio).\n' +
      'Ela fica salva apenas neste navegador.\n\n' +
      'Para gerar: aistudio.google.com → Get API key.\n' +
      'Deixe em branco e confirme para remover a chave.',
      atual
    );
    if(nova===null) return;
    if(nova.trim()) localStorage.setItem(CHAVE_LOCAL, nova.trim());
    else localStorage.removeItem(CHAVE_LOCAL);
  }

  async function testaNetlify(){
    if(netlifyOk!==null) return netlifyOk;
    try{
      const r = await fetch('/.netlify/functions/gemini', { method:'GET' });
      netlifyOk = r.ok;
    }catch(e){ netlifyOk = false; }
    return netlifyOk;
  }

  async function statusConexao(){
    if(await testaNetlify()) return 'netlify';
    if(chaveLocal()) return 'chave';
    return 'off';
  }

  function montaContents(pergunta, historico, extra){
    const contents = [];
    (historico||[]).forEach(h=>{
      contents.push({ role:'user',  parts:[{ text:h.eu }] });
      contents.push({ role:'model', parts:[{ text:h.bot }] });
    });
    contents.push({ role:'user', parts:[{ text:pergunta }] });
    return {
      system_instruction: { parts: [{ text: (window.PLAYBOOK_RESUMO||'') + (extra ? '\n\n' + extra : '') }] },
      contents,
      generationConfig: { temperature: 0.6, maxOutputTokens: 900 }
    };
  }

  function extraiTexto(data){
    try{
      return data.candidates[0].content.parts.map(p=>p.text||'').join('').trim();
    }catch(e){ return ''; }
  }

  async function perguntar(pergunta, historico, extra){
    const corpo = montaContents(pergunta, historico, extra);

    if(await testaNetlify()){
      const r = await fetch('/.netlify/functions/gemini', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify(corpo)
      });
      if(!r.ok){
        const msg = await r.text().catch(()=> '');
        throw new Error('O servidor da IA respondeu com erro (' + r.status + '). ' + msg.slice(0,200));
      }
      const data = await r.json();
      const texto = extraiTexto(data);
      if(!texto) throw new Error('A IA não retornou texto. Tente reformular a pergunta.');
      return texto;
    }

    const chave = chaveLocal();
    if(!chave) throw new Error('Configure a chave da API do Gemini no link "Configurar chave" (ou publique no Netlify com a variável GEMINI_API_KEY).');

    const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + MODELO + ':generateContent?key=' + encodeURIComponent(chave), {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify(corpo)
    });
    if(r.status===400 || r.status===403){
      throw new Error('A chave da API parece inválida. Confira em "Configurar chave".');
    }
    if(r.status===429){
      throw new Error('Limite de uso da API atingido. Aguarde um minuto e tente de novo.');
    }
    if(!r.ok) throw new Error('Erro na API do Gemini (' + r.status + ').');
    const data = await r.json();
    const texto = extraiTexto(data);
    if(!texto) throw new Error('A IA não retornou texto. Tente reformular a pergunta.');
    return texto;
  }

  window.GeminiBlue = { perguntar, configurarChave, statusConexao, chaveLocal };
})();
