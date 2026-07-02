# blue. — Playbook Comercial 1 + Arena de treino

Sistema de produtividade da comercial: playbook com busca inteligente dos 81 atalhos,
assistente de IA (Gemini) e jogo de treino com 4 modos.

## O que tem aqui

| Arquivo | O que é |
|---|---|
| `index.html` | Playbook completo com busca inteligente por situação (a lupa) e assistente de IA flutuante |
| `jogo.html` | Arena de treino: Jornada, Relâmpago, Sequência perfeita e Simulador de lead com IA |
| `assets/atalhos.js` | Base dos 81 atalhos com palavras-chave de situação (usada pela busca e pelo jogo) |
| `assets/gemini.js` | Cliente do Gemini (usa o servidor do Netlify ou uma chave local) |
| `netlify/functions/gemini.js` | Função do Netlify que guarda a chave da API em segurança no servidor |
| `netlify.toml` | Configuração do deploy |

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
