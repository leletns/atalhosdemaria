/* ============================================================
   blue. — Cliente do Gemini
   Dois modos de conexão, nesta ordem de preferência:
   1) Netlify Function (/.netlify/functions/gemini) — a chave fica
      segura no servidor (variável de ambiente GEMINI_API_KEY).
   2) Chave local no navegador (localStorage) — para uso imediato
      sem deploy, configurada pelo link "Configurar chave".

   Resiliência: escada de modelos com fallback automático quando a
   cota gratuita de um deles esgota (erro 429) ou o modelo está
   indisponível (404/503). Erros chegam para a Maria em português
   claro, com o que fazer.
   ============================================================ */
(function(){
  const CHAVE_LOCAL = 'blue_gemini_api_key';
  const MODELOS = [
    'gemini-2.5-flash-lite', // maior limite por minuto no plano gratuito
    'gemini-2.5-flash',
    'gemini-2.0-flash'
  ];
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

  function erroAmigavel(status){
    if(status===429) return 'A cota gratuita do Gemini esgotou por agora (erro 429). Ela renova sozinha: aguarde 1–2 minutos e tente de novo. Se acontecer o dia todo, o limite diário foi atingido — renova à meia-noite (horário do Pacífico) ou dá para ativar o faturamento em aistudio.google.com para nunca mais travar.';
    if(status===400 || status===403) return 'A chave da API parece inválida ou sem permissão. Confira a chave em aistudio.google.com.';
    if(status===503) return 'Os servidores do Gemini estão sobrecarregados neste momento. Aguarde alguns segundos e tente de novo.';
    return 'O servidor da IA respondeu com erro (' + status + '). Tente novamente em instantes.';
  }

  async function perguntar(pergunta, historico, extra){
    const corpo = montaContents(pergunta, historico, extra);

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
      const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + modelo + ':generateContent?key=' + encodeURIComponent(chave), {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify(corpo)
      });
      if(r.ok){
        const data = await r.json();
        const texto = extraiTexto(data);
        if(!texto) throw new Error('A IA não retornou texto. Tente reformular a pergunta.');
        return texto;
      }
      ultimoStatus = r.status;
      // cota esgotada / modelo indisponível / sobrecarga: tenta o próximo modelo
      if(r.status!==429 && r.status!==404 && r.status!==503) break;
    }
    throw new Error(erroAmigavel(ultimoStatus));
  }

  window.GeminiBlue = { perguntar, configurarChave, statusConexao, chaveLocal };
})();
