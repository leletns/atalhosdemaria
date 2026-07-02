/* ============================================================
   blue. — Base oficial dos 81 atalhos do Comercial 1
   Usada pelo Playbook (busca inteligente) e pelo Jogo (Arena).
   c = código do atalho | e = etapa | q = quando usar
   k = palavras-chave de situação (objeções, dificuldades, sinônimos)
   ============================================================ */

window.ETAPAS = {
  1:  { nome: "Primeiro contato / Abertura",      fase: "abertura" },
  2:  { nome: "Feriado / Retomada por pausa",     fase: "abertura" },
  3:  { nome: "Empatia / Acolhimento",            fase: "meio" },
  4:  { nome: "Clínica / Médico / Técnica",       fase: "meio" },
  5:  { nome: "O que a consulta inclui",          fase: "meio" },
  6:  { nome: "Valores / Investimento",           fase: "fechamento" },
  7:  { nome: "Objeções",                         fase: "fechamento" },
  8:  { nome: "Agendamento",                      fase: "fechamento" },
  9:  { nome: "Pagamento",                        fase: "fechamento" },
  10: { nome: "Pós-agendamento / Preparo",        fase: "pos" },
  11: { nome: "Confirmação de consulta",          fase: "pos" },
  12: { nome: "Resgate / Follow-up de leads",     fase: "meio" },
  13: { nome: "São Paulo (agenda específica)",    fase: "meio" },
  14: { nome: "Goiânia",                          fase: "meio" },
  15: { nome: "Provas sociais / Reforço",         fase: "meio" }
};

window.ATALHOS = [
  /* ---------- 1 · Primeiro contato / Abertura ---------- */
  { c: "bomdiaprospectanova", e: 1, q: "Primeiro \"oi\" a uma lead nova pela manhã, já perguntando se tem diagnóstico",
    k: "lead nova primeiro contato comecar conversa oi manha diagnostico saudacao boas vindas nova paciente chegou agora" },
  { c: "boatardeprospectanova", e: 1, q: "Primeiro \"oi\" a uma lead nova pela tarde, já perguntando se tem diagnóstico",
    k: "lead nova primeiro contato tarde diagnostico saudacao boas vindas nova paciente" },
  { c: "apresentarmaria", e: 1, q: "Apresentação pessoal da comercial",
    k: "apresentacao me apresentar quem sou eu quem fala quem esta falando maria comercial" },
  { c: "apresentamanha", e: 1, q: "Apresentação pessoal da comercial pela manhã",
    k: "apresentacao me apresentar manha quem sou eu quem fala" },
  { c: "trafegopago", e: 1, q: "Lead que veio de anúncio pago (tráfego pago)",
    k: "anuncio instagram facebook ads publicidade patrocinado trafego campanha veio do anuncio clicou no anuncio lead quente" },
  { c: "trafegopagoI", e: 1, q: "Lead que veio de anúncio pago (variação)",
    k: "anuncio instagram facebook ads publicidade patrocinado trafego campanha variacao" },
  { c: "inglesanuncio", e: 1, q: "Lead internacional que veio de anúncio (em inglês)",
    k: "ingles english gringa internacional estrangeira fala ingles fora do brasil exterior" },
  { c: "bemvindo", e: 1, q: "Boas-vindas + apresentação da Clínica Blue",
    k: "boas vindas bem vinda clinica blue quem somos apresentar clinica conhecer a clinica" },
  { c: "aqui", e: 1, q: "Boas-vindas + apresentação da Clínica Blue (variação)",
    k: "boas vindas clinica blue quem somos apresentar clinica" },
  { c: "bomdia", e: 1, q: "Quebra-gelo casual de bom dia",
    k: "quebra gelo bom dia cumprimento casual retomar leve conversa parada" },
  { c: "bomdiaii", e: 1, q: "Quebra-gelo casual de bom dia (variação)",
    k: "quebra gelo bom dia cumprimento casual variacao" },
  { c: "aposfimdesemana", e: 1, q: "Quebra-gelo \"como passou o fim de semana?\"",
    k: "fim de semana segunda feira quebra gelo retomar depois do fim de semana sabado domingo" },
  { c: "quebom", e: 1, q: "Reagir positivamente quando ela conta como te encontrou",
    k: "como encontrou origem fonte reagir que bom indicacao" },
  { c: "felizencontrado", e: 1, q: "Dizer que ficou feliz por ela ter encontrado a clínica",
    k: "feliz encontrou fonte origem conexao" },
  { c: "encontrouu", e: 1, q: "Perguntar como ela encontrou a clínica",
    k: "como encontrou onde achou fonte origem indicacao instagram google" },
  { c: "fonte", e: 1, q: "Perguntar qual foi a fonte / como conheceu a clínica",
    k: "fonte origem como conheceu de onde veio canal" },
  { c: "nome", e: 1, q: "Perguntar o nome dela",
    k: "nome perguntar nome como se chama qual seu nome personalizar" },
  { c: "comoposso", e: 1, q: "\"Como posso te auxiliar hoje?\"",
    k: "ajudar auxiliar o que precisa como posso ajudar em que posso ajudar duvida" },

  /* ---------- 2 · Feriado / Retomada por pausa ---------- */
  { c: "bomdiaferiado", e: 2, q: "Primeiro contato após feriado, pedindo desculpa pela espera (manhã)",
    k: "feriado desculpa demora espera atraso voltou do feriado mensagem acumulada pausa" },
  { c: "boatardeferiadooo", e: 2, q: "Primeiro contato após feriado, pedindo desculpa pela espera (tarde)",
    k: "feriado desculpa demora espera atraso tarde pausa" },
  { c: "retomandoferiado", e: 2, q: "Retomar conversa que começou antes do feriado",
    k: "retomar conversa feriado voltar conversa pausa continuar de onde parou" },
  { c: "inglesbomdiaferiado", e: 2, q: "Bom dia pós-feriado em inglês",
    k: "ingles english feriado holiday gringa internacional" },
  { c: "espanholbomdiaferiado", e: 2, q: "Bom dia pós-feriado em espanhol",
    k: "espanhol spanish feriado hispana internacional" },
  { c: "inglesretomandoassu", e: 2, q: "Retomar conversa pós-feriado em inglês",
    k: "ingles english retomar feriado holiday" },
  { c: "espanholretomando", e: 2, q: "Retomar conversa pós-feriado em espanhol",
    k: "espanhol spanish retomar feriado" },

  /* ---------- 3 · Empatia / Acolhimento ---------- */
  { c: "empatia", e: 3, q: "Quando ela relata que \"achava que o problema era com ela\"",
    k: "acolher dor desabafo culpa autoestima sofrimento vergonha achava que era ela frustrada triste chorou anos sofrendo pernas pesadas" },
  { c: "empatia2", e: 3, q: "Quando ela compartilha a história dela e você agradece a confiança",
    k: "historia confianca relato agradecer desabafo contou a historia acolhimento" },
  { c: "celuylip", e: 3, q: "Explicar a diferença entre celulite e lipedema",
    k: "celulite lipedema diferenca celulite ou lipedema duvida diagnostico nao sei se tenho o que e lipedema confusao" },

  /* ---------- 4 · Clínica / Médico / Técnica ---------- */
  { c: "sobreorafa", e: 4, q: "Apresentar quem é o Dr. Rafael Erthal",
    k: "medico doutor rafael erthal curriculo autoridade quem e o medico quem opera especialista credencial confianca" },
  { c: "lipedefinition", e: 4, q: "Explicar a técnica cirúrgica LipeDefinition®",
    k: "tecnica cirurgia lipoaspiracao metodo lipedefinition como funciona a cirurgia procedimento" },
  { c: "hospitais", e: 4, q: "Listar em quais hospitais ele opera",
    k: "hospital hospitais onde opera local da cirurgia seguranca estrutura centro cirurgico" },
  { c: "pacireg", e: 4, q: "Reagir quando a paciente é de uma região que vocês já atendem",
    k: "regiao cidade atendida bairro perto ja atendemos regiao conhecida" },

  /* ---------- 5 · O que a consulta inclui ---------- */
  { c: "inclco", e: 5, q: "Detalhar o que a consulta inicial entrega",
    k: "o que inclui consulta o que vem na consulta valor agregado entrega beneficios o que ganho" },
  { c: "consonline2", e: 5, q: "Detalhar o que a consulta online entrega",
    k: "consulta online o que inclui tele entrega detalhar" },
  { c: "plascilainclui", e: 5, q: "Detalhar o que a consulta entrega (variação)",
    k: "o que inclui consulta entrega variacao" },
  { c: "presencialatualprospec", e: 5, q: "Explicar o protocolo presencial de 4 etapas (RJ)",
    k: "presencial rio de janeiro rj protocolo 4 etapas consultorio pessoalmente barra" },
  { c: "teleatualprospec", e: 5, q: "Explicar a teleconsulta de 3 etapas (fora do RJ)",
    k: "tele teleconsulta online video chamada a distancia 3 etapas remoto nao moro no rio" },
  { c: "foradorio", e: 5, q: "Paciente de fora do RJ (teleconsulta + logística)",
    k: "fora do rio outra cidade outro estado viagem longe moro longe logistica viajar interior nordeste sul" },
  { c: "homecare", e: 5, q: "Explicar o acompanhamento homecare / pós-operatório",
    k: "pos operatorio recuperacao acompanhamento em casa homecare enfermagem cuidados depois da cirurgia drenagem" },

  /* ---------- 6 · Valores / Investimento ---------- */
  { c: "investimento", e: 6, q: "Informar o valor da consulta (R$ 1.800)",
    k: "preco valor quanto custa consulta 1800 investimento quanto e valores tabela" },
  { c: "cirurgiavaria", e: 6, q: "Quando pergunta o valor da cirurgia (varia entre R$ 50–150 mil, depende da avaliação)",
    k: "preco cirurgia quanto custa a cirurgia orcamento valor da operacao faixa 50 mil 150 mil quanto sai" },
  { c: "aceitaplano", e: 6, q: "Quando pergunta se aceita plano de saúde (atendimento particular)",
    k: "plano de saude convenio unimed amil bradesco sulamerica reembolso particular aceita plano cobre" },
  { c: "retornovalor", e: 6, q: "Explicar o valor da consulta de retorno (R$ 900)",
    k: "retorno segunda consulta valor do retorno 900 revisao" },

  /* ---------- 7 · Objeções ---------- */
  { c: "preçoalto", e: 7, q: "Objeção \"está caro\" / investimento alto / deixar para depois",
    k: "caro esta caro sem dinheiro nao tenho condicoes muito alto valor alto financeiro apertado achou caro nao posso pagar salgado objecao preco" },
  { c: "objeção", e: 7, q: "Objeção genérica — \"está caro\" ou quer adiar",
    k: "objecao caro adiar depois vou pensar pensar hesitou duvida travou" },
  { c: "entendperfeit", e: 7, q: "Quando ela quer adiar — remarcar para um mês melhor",
    k: "adiar remarcar mes que vem depois agora nao posso mes melhor empurrar reagendar" },
  { c: "alternativadrleonardo", e: 7, q: "Oferecer alternativa mais acessível (Dr. Leonardo, R$ 900)",
    k: "mais barato alternativa acessivel leonardo 900 opcao economica nao cabe no bolso downsell ticket menor" },
  { c: "motivo", e: 7, q: "Perguntar o motivo da desistência",
    k: "desistiu desistencia ela desistiu sumiu cancelou por que desistiu motivo entender o que travou nao quer mais mudou de ideia" },

  /* ---------- 8 · Agendamento ---------- */
  { c: "agendar", e: 8, q: "Perguntar se quer agendar",
    k: "marcar agendar horario quer marcar vamos agendar sinal de compra como marco marcar consulta agendar consulta" },
  { c: "agendamento", e: 8, q: "Explicar como funciona o processo de agendamento",
    k: "processo como funciona para marcar passos do agendamento como agenda" },
  { c: "conclusaopagamento", e: 8, q: "Explicar o pagamento antecipado (R$ 1.800 ou 2× de R$ 900)",
    k: "pagamento antecipado parcelar duas vezes 2x 900 como pagar forma de pagamento antecipa" },
  { c: "conclusaoagenda", e: 8, q: "Coletar dados de cadastro + formulário",
    k: "cadastro formulario coletar dados ficha inscricao" },
  { c: "dados", e: 8, q: "Coletar dados da paciente (versão curta)",
    k: "dados nome completo cpf telefone email versao curta cadastro rapido" },

  /* ---------- 9 · Pagamento ---------- */
  { c: "pix", e: 9, q: "Enviar dados bancários / chave Pix",
    k: "pix chave pix pagamento transferencia banco dados bancarios pagar conta deposito nao caiu pix pendente conseguiu fazer o pix" },
  { c: "restantepagamento", e: 9, q: "Cobrar a 2ª parte do pagamento",
    k: "segunda parcela restante cobrar parcela falta pagar segunda parte complemento saldo nao caiu pendente vencimento" },

  /* ---------- 10 · Pós-agendamento / Preparo ---------- */
  { c: "Pósagendamento", e: 10, q: "Explicar os próximos passos após agendar",
    k: "proximos passos depois de agendar pos agendamento e agora o que vem agora agendou" },
  { c: "exame", e: 10, q: "Enviar pedido de exame",
    k: "exame pedido de exame laboratorio sangue" },
  { c: "exames", e: 10, q: "Enviar pedidos e lista de exames",
    k: "exames lista de exames pedidos laboratorio sangue preparar consulta" },
  { c: "questionário", e: 10, q: "Enviar questionário de anamnese",
    k: "questionario anamnese responder perguntas formulario de saude historico" },
  { c: "Instruçõesfotos", e: 10, q: "Enviar instruções de fotos",
    k: "fotos instrucoes de foto como tirar foto enviar fotos imagens pernas" },
  { c: "termodeautorização", e: 10, q: "Pedir assinatura do termo pré-consulta (assinatura digital)",
    k: "termo assinatura autorizacao documento assinar digital consentimento vespera obrigatorio" },
  { c: "endereçorj", e: 10, q: "Endereço da clínica no Rio de Janeiro",
    k: "endereco rio de janeiro rj onde fica localizacao como chegar mapa" },
  { c: "spendereco", e: 10, q: "Endereço da clínica em São Paulo",
    k: "endereco sao paulo sp onde fica localizacao como chegar" },
  { c: "endereçosp", e: 10, q: "Endereço da clínica em São Paulo (variação)",
    k: "endereco sao paulo sp onde fica localizacao" },

  /* ---------- 11 · Confirmação de consulta ---------- */
  { c: "confirmar consulta", e: 11, q: "Lembrete/confirmação da consulta próxima",
    k: "confirmar consulta lembrete vespera amanha confirmacao presenca" },
  { c: "confirmação de consulta", e: 11, q: "Confirmação da consulta próxima (variação)",
    k: "confirmacao consulta lembrete vespera amanha" },
  { c: "confirmação wpp", e: 11, q: "Confirmação da consulta pelo WhatsApp — com data, horário e protocolo",
    k: "confirmacao whatsapp wpp vespera data horario protocolo lembrete dia seguinte" },
  { c: "confirmação", e: 11, q: "Confirmação da consulta (versão curta)",
    k: "confirmacao lembrete vespera curta" },

  /* ---------- 12 · Resgate / Follow-up de leads ---------- */
  { c: "followup lead morna", e: 12, q: "Lead morna há algum tempo sem responder",
    k: "followup morna sem responder sumiu parou de responder esfriou nutricao gancho novo" },
  { c: "Resgate lead fria", e: 12, q: "Lead fria há mais de 30 dias sem responder",
    k: "resgate fria 30 dias sumida abandonada reativar ciclo mensal voltar a falar" },
  { c: "Resgate lead quente", e: 12, q: "Lead quente — segurar horário antes de liberar a vaga",
    k: "resgate quente vaga reservada segurar horario liberar vaga urgencia perguntou valor e sumiu" },
  { c: "Retomaremdata", e: 12, q: "Retomar na data combinada (\"me chama em...\")",
    k: "retomar data combinada me chama em compromisso agenda retomada pontualidade prometeu voltar" },
  { c: "retomarjaneiro", e: 12, q: "Retomar em janeiro conforme combinado",
    k: "janeiro retomar ano novo me chama em janeiro data combinada" },

  /* ---------- 13 · São Paulo ---------- */
  { c: "resgateleadsp", e: 13, q: "Avisar a lead sobre nova data de agenda em SP",
    k: "sao paulo sp agenda sp nova data abriu agenda lista de espera aviso" },
  { c: "Resgate SP", e: 13, q: "Resgatar lead aguardando agenda em SP",
    k: "sao paulo sp resgate aguardando lista espera" },
  { c: "consultaSP", e: 13, q: "Explicar o protocolo da consulta em SP",
    k: "sao paulo sp protocolo consulta presencial sp como funciona em sp" },
  { c: "resgatesp2", e: 13, q: "Explicar o protocolo da consulta em SP (variação)",
    k: "sao paulo sp protocolo variacao" },

  /* ---------- 14 · Goiânia ---------- */
  { c: "goexplicar", e: 14, q: "Explicar o atendimento mensal em Goiânia",
    k: "goiania go goias atendimento mensal centro oeste agenda goiania como funciona" },
  { c: "goianiafechada", e: 14, q: "Avisar que a agenda de Goiânia está fechada",
    k: "goiania fechada sem agenda sem data lista de espera go goias" },

  /* ---------- 15 · Provas sociais / Reforço ---------- */
  { c: "antesdepois", e: 15, q: "Enviar link de antes/depois (Instagram)",
    k: "antes e depois resultado fotos de resultado prova social instagram ver resultados casos hesitacao vou pensar" },
  { c: "mreld", e: 15, q: "\"Vamos mudar essa realidade agora!!\" — reforço motivacional",
    k: "motivacao empurrao final vamos mudar reforco motivacional quer mas trava incentivo" }
];

/* Receitas prontas (sequências que convertem) — usadas no jogo */
window.RECEITAS = [
  { nome: "Lead nova vinda de anúncio",
    seq: ["trafegopago", "nome", "empatia", "sobreorafa", "inclco", "investimento", "agendar"] },
  { nome: "Lead que pergunta o preço logo de cara",
    seq: ["sobreorafa", "inclco", "investimento", "agendar"] },
  { nome: "Lead de fora do Rio",
    seq: ["foradorio", "teleatualprospec", "investimento", "agendar"] },
  { nome: "Fechou! Do Pix à consulta",
    seq: ["conclusaopagamento", "pix", "dados", "Pósagendamento", "exames", "questionário"] },
  { nome: "Lead sumiu depois de receber o valor",
    seq: ["Resgate lead quente", "antesdepois", "motivo", "alternativadrleonardo"] }
];

/* Resumo do método — contexto para a IA (Gemini) */
window.PLAYBOOK_RESUMO = [
  "Você é a assistente de IA da Clínica Blue (Dr. Rafael Erthal, especialista em lipedema, técnica LipeDefinition®).",
  "Você ajuda a Maria, comercial 1 (SDR), a escolher o atalho certo de WhatsApp para cada situação e a escrever mensagens personalizadas.",
  "REGRAS DE OURO: 1) responder lead de tráfego em até 5 min; 2) terminar SEMPRE com uma pergunta; 3) uma pergunta por vez; 4) valor antes de preço (nunca enviar 'investimento' antes de 'sobreorafa' e do protocolo); 5) personalizar a primeira linha com o nome da lead; 6) nunca prometer diagnóstico, resultado, cura ou cobertura de plano — a frase segura é 'apenas uma avaliação médica individualizada pode confirmar o melhor caminho para o seu caso'.",
  "VALORES: consulta R$ 1.800 (ou 2× R$ 900 antecipado), retorno R$ 900, cirurgia varia entre R$ 50–150 mil (só como faixa, sempre condicionada à avaliação), alternativa acessível Dr. Leonardo R$ 900. Atendimento particular (sem plano).",
  "PROTOCOLOS: presencial RJ = 4 etapas (atalho presencialatualprospec); fora do RJ = teleconsulta 3 etapas (teleatualprospec + foradorio); SP e Goiânia têm agendas específicas.",
  "REGRA INEGOCIÁVEL: no dia da confirmação, a mensagem de confirmação e o termodeautorização (assinatura digital) andam JUNTOS, na mesma conversa. Sem termo assinado, a consulta trava na recepção.",
  "CADÊNCIA: lead quente (+2-4h toque leve, +1d Resgate lead quente, +2d antesdepois, +4d motivo, +7d reclassificar); lead morna (+3d followup, +7d pergunta sobre a dor, +15d antesdepois, +30d vira fria); lead fria (mensal, sempre com motivo real). Nunca 3 mensagens seguidas sem resposta.",
  "MÉTODO A-R-A para objeções: Acolhe, Resgata a dor que ela contou, Avança com pergunta ou alternativa.",
  "Ao responder: seja direta, indique o(s) atalho(s) exato(s) pelo código, explique em 1 linha o porquê, e quando fizer sentido escreva um rascunho de mensagem personalizada (tom premium, humano, WhatsApp, com 💙 quando couber, sempre terminando com pergunta)."
].join("\n");
