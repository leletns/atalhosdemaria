/* ============================================================
   blue. — Cliente do Gemini
   Dois modos de conexão, nesta ordem de preferência:
   1) Netlify Function (/.netlify/functions/gemini) — a chave fica
      segura no servidor (variável de ambiente GEMINI_API_KEY).
   2) Chave local no navegador (localStorage) — para uso imediato
      sem deploy, configurada pelo link "Configurar chave".

   Chaves novas do AI Studio (prefixo AQ.) autenticam pelo header
   x-goog-api-key. A escada de modelos usa a família 3.x.
   ============================================================ */
(function(){
  const CHAVE_LOCAL = 'blue_gemini_api_key';
  const MODELOS = [
    'gemini-3.5-flash-lite',
    'gemini-3.6-flash',
    'gemini-flash-latest',
    'gemini-flash-lite-latest'
  ];
  let netlifyOk = null;

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

  function montaContents(pergunta, historico, extra, opcoes){
    const contents = [];
    (historico||[]).forEach(h=>{
      contents.push({ role:'user',  parts:[{ text:h.eu }] });
      contents.push({ role:'model', parts:[{ text:h.bot }] });
    });
    contents.push({ role:'user', parts:[{ text:pergunta }] });
    const cfg = Object.assign({ temperature: 0.6, maxOutputTokens: 900 }, opcoes||{});
    return {
      system_instruction: { parts: [{ text: (window.PLAYBOOK_RESUMO||'') + (extra ? '\n\n' + extra : '') }] },
      contents,
      generationConfig: cfg
    };
  }

  function extraiTexto(data){
    try{
      return data.candidates[0].content.parts.map(p=>p.text||'').join('').trim();
    }catch(e){ return ''; }
  }

  function erroAmigavel(status){
    if(status===429) return 'A cota do Gemini esgotou por agora (erro 429). Aguarde 1–2 minutos e tente de novo. Se persistir o dia todo, o limite diário foi atingido.';
    if(status===400 || status===403) return 'A chave da API parece inválida ou sem permissão. Confira em aistudio.google.com.';
    if(status===503) return 'Os servidores do Gemini estão sobrecarregados neste momento. Aguarde alguns segundos e tente de novo.';
    return 'O servidor da IA respondeu com erro (' + status + '). Tente novamente em instantes.';
  }

  async function chamaModelo(corpo, chave, modelo){
    return fetch('https://generativelanguage.googleapis.com/v1beta/models/' + modelo + ':generateContent', {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'x-goog-api-key': chave
      },
      body: JSON.stringify(corpo)
    });
  }

  async function perguntar(pergunta, historico, extra, opcoes){
    const corpo = montaContents(pergunta, historico, extra, opcoes);

    if(await testaNetlify()){
      const r = await fetch('/.netlify/functions/gemini', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify(corpo)
      });
      if(!r.ok) throw new Error(erroAmigavel(r.status));
      const data = await r.json();
      const texto = extraiTexto(data);
      if(!texto) throw new Error('A IA não retornou texto. Tente reformular a pergunta.');
      return texto;
    }

    const chave = chaveLocal();
    if(!chave) throw new Error('Configure a chave da API do Gemini no link "Configurar chave" (ou publique no Netlify com a variável GEMINI_API_KEY).');

    let ultimoStatus = 0;
    for(const modelo of MODELOS){
      const r = await chamaModelo(corpo, chave, modelo);
      if(r.ok){
        const data = await r.json();
        const texto = extraiTexto(data);
        if(!texto) throw new Error('A IA não retornou texto. Tente reformular a pergunta.');
        return texto;
      }
      ultimoStatus = r.status;
      if(r.status!==429 && r.status!==404 && r.status!==503) break;
    }
    throw new Error(erroAmigavel(ultimoStatus));
  }

  function parseJSON(txt){
    const limpo = txt.replace(/```json|```/g,'').trim();
    const ini = limpo.indexOf('{')>=0 && (limpo.indexOf('[')===-1 || limpo.indexOf('{')<limpo.indexOf('['))
      ? limpo.indexOf('{') : limpo.indexOf('[');
    const fim = Math.max(limpo.lastIndexOf('}'), limpo.lastIndexOf(']'));
    return JSON.parse(limpo.slice(ini, fim+1));
  }

  async function perguntarJSON(pergunta, historico, extra, opcoes){
    const cfg = Object.assign({ temperature: 0.85, maxOutputTokens: 2500 }, opcoes||{});
    const texto = await perguntar(pergunta + '\n\nResponda SOMENTE JSON válido, sem markdown e sem crases.', historico, extra, cfg);
    return parseJSON(texto);
  }

  window.GeminiBlue = { perguntar, perguntarJSON, configurarChave, statusConexao, chaveLocal };
})();
