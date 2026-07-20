# blue. — Playbook Comercial 1 + Arena de treino

Sistema de produtividade da comercial: playbook com busca inteligente dos 81 atalhos,
assistente de IA (Gemini) e jogo de treino com 4 modos.

## O que tem aqui

| Arquivo | O que é |
|---|---|
| `index.html` | Playbook completo com busca inteligente por situação (a lupa) e assistente de IA flutuante |
| `jogo.html` | Central da Comercial: banco de dados de consulta rápida + arena de treino |
| `growth.html` | Growth Blue OS: dashboard de métricas com lançamento diário, tendências, pacing e alertas |
| `assets/atalhos.js` | Base dos 81 atalhos com palavras-chave de situação (usada pela busca e pelo jogo) |
| `assets/conhecimento.js` | Banco de conhecimento total (ficha, quiz e conversas guiadas) |
| `assets/gemini.js` | Cliente do Gemini (usa o servidor do Netlify ou uma chave local) |
| `netlify/functions/gemini.js` | Função do Netlify que guarda a chave da API em segurança no servidor |
| `netlify/functions/growth-dados.mjs` | Função que salva os dados do growth na nuvem (Netlify Blobs), rota `/api/growth` |
| `netlify.toml` | Configuração do deploy |

## Growth Blue OS (growth.html)

- **Lançamento diário** (aba ＋ LANÇAR): gasto, leads, agendamentos, consultas pagas e seguidores — 1 minuto por dia.
- **Métricas calculadas automaticamente:** CPL, conversão lead→agendamento, custo por consulta paga, pacing da meta, projeção do mês, ROI e comparativos semanais e por campanha.
- **Alertas automáticos:** motor de regras que aponta a ação do dia (CPL estourado, conversão baixa, pacing atrasado, verba mal distribuída, dias sem lançamento).
- **Dados na nuvem:** tudo é salvo no próprio site via Netlify Blobs (rota `/api/growth`) e também no navegador (funciona offline). Backup exportável em JSON na aba ⚙︎.
- **PIN opcional:** defina a variável de ambiente `GROWTH_PIN` no Netlify para exigir um PIN de acesso aos dados.

## Como subir no Netlify (vinculado ao repositório `atalhosdemaria`)

1. Suba estes arquivos para o repositório no GitHub:

   ```bash
   git init
   git add .
   git commit -m "Playbook + Arena de treino blue."
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/atalhosdemaria.git
   git push -u origin main
   ```

2. No painel do Netlify: **Add new site → Import an existing project → GitHub → atalhosdemaria**.
   Não precisa de comando de build — o `netlify.toml` já configura tudo.

3. Ative a IA (Gemini): no Netlify, vá em **Site configuration → Environment variables**
   e crie a variável:

   - **Key:** `GEMINI_API_KEY`
   - **Value:** sua chave gerada em [aistudio.google.com](https://aistudio.google.com) → *Get API key*

   Depois clique em **Deploys → Trigger deploy** para publicar de novo.
   A chave fica só no servidor — nunca aparece no navegador da Maria.

4. Pronto. A cada `git push` na branch `main`, o Netlify publica sozinho.

## Usando sem Netlify (teste local)

Abra o `index.html` direto no navegador. Para a IA funcionar sem servidor,
clique em **Configurar chave** (rodapé do assistente) e cole a chave do Gemini —
ela fica salva apenas naquele navegador.

## Atalhos de teclado

- `/` — foca a busca do playbook
- `Esc` — limpa a busca
- Clique em qualquer código de atalho — copia para a área de transferência
