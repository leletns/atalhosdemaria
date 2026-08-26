/* Netlify Function: proxy seguro para a API do Gemini.
   A chave fica na variável de ambiente GEMINI_API_KEY (Site settings →
   Environment variables no painel do Netlify) e nunca chega ao navegador.

   Chaves novas do AI Studio começam com AQ. e autenticam pelo header
   x-goog-api-key. Modelos 2.x/2.5 não estão mais disponíveis para contas novas. */

const MODELOS = [
  "gemini-3.5-flash-lite",
  "gemini-3.6-flash",
  "gemini-flash-latest",
  "gemini-flash-lite-latest",
];

exports.handler = async (event) => {
  const chave = (process.env.GEMINI_API_KEY || "").trim();

  if (event.httpMethod === "GET") {
    if (!chave) {
      return { statusCode: 503, body: "GEMINI_API_KEY não configurada no Netlify." };
    }
    return { statusCode: 200, body: "ok" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Método não permitido." };
  }
  if (!chave) {
    return { statusCode: 503, body: "GEMINI_API_KEY não configurada no Netlify." };
  }

  let corpo;
  try {
    corpo = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, body: "Corpo da requisição inválido." };
  }

  let ultimaResposta = null;
  for (const modelo of MODELOS) {
    try {
      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": chave,
          },
          body: JSON.stringify(corpo),
        }
      );
      const texto = await r.text();
      ultimaResposta = { status: r.status, texto };

      if (r.ok) {
        return {
          statusCode: 200,
          headers: { "Content-Type": "application/json", "X-Modelo-Usado": modelo },
          body: texto,
        };
      }
      if (r.status !== 429 && r.status !== 404 && r.status !== 503) {
        return { statusCode: r.status, headers: { "Content-Type": "application/json" }, body: texto };
      }
    } catch (e) {
      ultimaResposta = { status: 502, texto: "Falha de rede ao falar com a API do Gemini: " + e.message };
    }
  }

  return {
    statusCode: ultimaResposta ? ultimaResposta.status : 502,
    headers: { "Content-Type": "application/json" },
    body: ultimaResposta ? ultimaResposta.texto : "Falha ao falar com a API do Gemini.",
  };
};
