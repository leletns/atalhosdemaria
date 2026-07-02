/* Netlify Function: proxy seguro para a API do Gemini.
   A chave fica na variável de ambiente GEMINI_API_KEY (Site settings →
   Environment variables no painel do Netlify) e nunca chega ao navegador. */

const MODELO = "gemini-2.0-flash";

exports.handler = async (event) => {
  const chave = process.env.GEMINI_API_KEY;

  // GET = verificação de saúde usada pelo front para saber se o proxy existe
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

  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODELO}:generateContent?key=${chave}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpo),
      }
    );
    const texto = await r.text();
    return {
      statusCode: r.status,
      headers: { "Content-Type": "application/json" },
      body: texto,
    };
  } catch (e) {
    return { statusCode: 502, body: "Falha ao falar com a API do Gemini: " + e.message };
  }
};
