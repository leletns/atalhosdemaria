/* Netlify Function (v2): armazenamento na nuvem do Growth Blue OS.
   Guarda os lançamentos diários, campanhas e configurações no Netlify Blobs —
   os dados ficam no site, acessíveis de qualquer dispositivo.

   Proteção opcional: defina a variável de ambiente GROWTH_PIN no Netlify
   (Site configuration → Environment variables). Com ela definida, toda
   requisição precisa do header x-growth-pin com o mesmo valor. */

import { getStore } from "@netlify/blobs";

const VAZIO = {
  config: {
    cliente: "Dr. Rafael Erthal — Lipedema",
    ticket: 2500,
    meta_mes: 30,
    meta_cpl: 80,
  },
  dias: [],
  campanhas: [],
};

function json(corpo, status = 200) {
  return new Response(JSON.stringify(corpo), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export default async (req) => {
  const pin = (process.env.GROWTH_PIN || "").trim();
  if (pin && (req.headers.get("x-growth-pin") || "").trim() !== pin) {
    return json({ erro: "pin" }, 401);
  }

  const store = getStore("growth-blue-os");

  if (req.method === "GET") {
    const dados = await store.get("dados", { type: "json" });
    return json(dados || VAZIO);
  }

  if (req.method === "PUT" || req.method === "POST") {
    let corpo;
    try {
      corpo = await req.json();
    } catch (e) {
      return json({ erro: "JSON inválido" }, 400);
    }
    if (!corpo || !Array.isArray(corpo.dias) || !Array.isArray(corpo.campanhas) || typeof corpo.config !== "object") {
      return json({ erro: "Estrutura inválida: esperado {config, dias, campanhas}" }, 400);
    }
    // limite de segurança para não estourar o blob com lixo
    if (JSON.stringify(corpo).length > 900000) {
      return json({ erro: "Dados grandes demais" }, 413);
    }
    await store.setJSON("dados", corpo);
    return json({ ok: true });
  }

  return json({ erro: "Método não permitido" }, 405);
};

export const config = { path: "/api/growth" };
