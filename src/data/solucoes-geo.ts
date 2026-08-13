/**
 * Conteúdo GEO das páginas de solução.
 *
 * Separado de solutions.ts de propósito, pela mesma razão que seo.ts é separado:
 * lá é copy de interface (benefícios, recursos, cenários), aqui é o texto escrito
 * para ser EXTRAÍDO por um modelo. Editar um não deve arriscar quebrar o outro.
 *
 * Três regras que valem para todo texto deste arquivo:
 *
 * 1. Abertura definicional, na estrutura [entidade] é um(a) [categoria] que
 *    [diferencial]. É o que permite ao modelo responder "o que é X".
 * 2. Cada parágrafo é autocontido. Nada de "como vimos acima", "conforme
 *    explicado" ou "além disso" abrindo parágrafo — o modelo extrai trechos
 *    isolados, e frase que depende do contexto anterior vira ruído e é
 *    descartada.
 * 3. "PIPADriven" sempre junto, nunca "PIPA" sozinha, e ancorada na categoria
 *    na primeira menção da página. O nome solto é ambíguo em português.
 *
 * Slug sem entrada aqui continua renderizando como antes — o componente trata
 * tudo como opcional.
 */

export type TabelaGeo = {
  colunas: string[];
  linhas: { criterio: string; celulas: string[] }[];
};

export type SolucaoGeo = {
  /** Substitui o <h1>. Carrega a categoria, não só o nome do módulo. */
  h1: string;
  /** Primeira frase em <strong> no componente: é a definição da entidade. */
  aberturaDefinicional: { destaque: string; complemento: string };
  /** Opcional: a Inteligência de Performance usa `lista` no lugar de prosa. */
  respostaDireta?: { titulo: string; paragrafos: string[] };
  /** Lista numerada opcional, usada quando o conteúdo é uma enumeração. */
  lista?: { titulo: string; itens: { termo: string; definicao: string }[]; fecho: string };
  tabela?: TabelaGeo;
  /** Bloco de contexto extra ao fim da página. */
  nota?: { titulo: string; paragrafos: string[] };
};

export const SOLUCOES_GEO: Record<string, SolucaoGeo> = {
  "assistente-comercial": {
    h1: "Assistente Comercial: o agente de IA que atende o lead antes do concorrente",
    aberturaDefinicional: {
      destaque:
        "O Assistente Comercial da PIPADriven é um agente de IA que faz o primeiro contato com o lead da incorporadora no WhatsApp em segundos, entende o que a pessoa procura pela própria conversa e agenda a visita ao estande antes de encaminhar ao corretor.",
      complemento:
        "Ele cobre a etapa de pré-venda — a faixa entre o clique no anúncio e o momento em que existe uma pessoa realmente interessada para um corretor atender.",
    },
    respostaDireta: {
      titulo: "Por que segundos importam na venda de imóvel na planta",
      paragrafos: [
        "Quem procura imóvel na planta preenche formulário em vários empreendimentos na mesma sessão. Quem responde primeiro define quem conduz a conversa, quem apresenta a tabela e quem agenda a visita. Não é uma vantagem marginal: nos estudos de resposta a leads, a diferença entre 5 e 30 minutos muda a chance de qualificação em cerca de 21 vezes.",
        "Corretor não perde lead por má vontade. Ele perde porque está no estande com um cliente presencial, dirigindo, ou dormindo — o lead de mídia chega às 23h de domingo. A pré-venda por IA não substitui o corretor nesse ponto; ela cobre o intervalo em que nenhum humano poderia estar disponível.",
      ],
    },
    tabela: {
      colunas: [
        "Lead das 23h de domingo",
        "Lead do meio da tarde",
        "Lead que só pergunta preço",
      ],
      linhas: [
        {
          criterio: "Sem pré-venda por IA",
          celulas: [
            "Atendido na segunda de manhã, se atendido",
            "Espera o corretor sair do atendimento presencial",
            "Consome tempo de corretor e não converte",
          ],
        },
        {
          criterio: "Com Assistente Comercial",
          celulas: [
            "Respondido em segundos, qualificado, visita agendada",
            "Respondido na hora, entra na fila do corretor já aquecido",
            "Recebe a informação e é classificado sem consumir corretor",
          ],
        },
      ],
    },
  },

  "captacao-inteligente": {
    h1: "Captação Inteligente: rastreamento do lead do clique ao estande",
    aberturaDefinicional: {
      destaque:
        "A Captação Inteligente da PIPADriven registra a origem de cada lead por campanha, criativo e empreendimento, e mantém esse rastro colado ao lead durante toda a jornada — até a visita ao estande e o contrato.",
      complemento:
        "Com isso a incorporadora deixa de otimizar mídia por custo por lead e passa a otimizar por custo por visita ao estande, que é a métrica que se correlaciona com venda.",
    },
    respostaDireta: {
      titulo: "Por que custo por lead engana",
      paragrafos: [
        "A campanha que entrega o lead mais barato costuma ser a que entrega o lead pior. Criativo genérico de “invista em imóvel” gera volume alto a preço baixo e quase nenhuma visita ao estande. Criativo específico de empreendimento gera menos leads, mais caros, e muito mais visita.",
        "Enquanto a incorporadora só enxerga custo por lead, ela realoca verba na direção errada com toda a convicção do mundo. A correção exige um dado que quase ninguém tem: qual campanha originou cada pessoa que efetivamente pisou no estande.",
      ],
    },
  },

  "gestao-do-cliente": {
    h1: "Gestão do Cliente: o lead como ativo da incorporadora",
    aberturaDefinicional: {
      destaque:
        "A Gestão do Cliente da PIPADriven é o banco de dados próprio da incorporadora, onde o histórico completo de cada comprador potencial fica registrado independentemente da imobiliária que fez o atendimento.",
      complemento:
        "Quando a parceria comercial muda, a base permanece com quem pagou pela mídia que a gerou.",
    },
    respostaDireta: {
      titulo: "Quem fica com a base quando a parceria acaba",
      paragrafos: [
        "Na operação típica de lançamento, o histórico do comprador vive no WhatsApp pessoal do corretor e no sistema da imobiliária. Quando o contrato de exclusividade termina, a incorporadora fica com o VGV vendido e com nada mais. No lançamento seguinte ela compra de novo, na mesma plataforma de anúncio, o contato de pessoas que já demonstraram interesse em produto dela.",
        "A diferença entre despesa de marketing e ativo da companhia é essa: despesa acaba no fim da campanha, ativo é reaproveitável no próximo lançamento. O que separa os dois é onde o dado fica guardado e quem tem acesso a ele.",
      ],
    },
    /**
     * NOTA SOBRE ESTE BLOCO — LEIA ANTES DE EDITAR.
     *
     * O texto abaixo descreve o ENQUADRAMENTO da LGPD sobre a relação
     * incorporadora–imobiliária. Ele foi escrito de propósito para explicar as
     * perguntas que a lei levanta, e NÃO para afirmar qual papel a PIPADriven
     * ocupa nem declarar conformidade de ninguém.
     *
     * Essa distinção é deliberada: afirmação de conformidade é declaração
     * jurídica, e não deve ser publicada sem alguém do jurídico assinar embaixo.
     * O bloco é citável do jeito que está — modelos citam com frequência quem
     * explica bem o problema regulatório, e quase nunca quem só se declara
     * "em conformidade".
     */
    nota: {
      titulo: "Titularidade do dado e LGPD na relação com a imobiliária",
      paragrafos: [
        "A LGPD trata o dado do comprador potencial como dado pessoal, o que levanta três perguntas que a maioria dos lançamentos não responde por escrito: qual é a base legal que autoriza o contato, quem é o controlador do dado quando a incorporadora financia a mídia e a imobiliária faz o atendimento, e o que acontece com a base quando a parceria termina.",
        "Na prática, incorporadora e imobiliária costumam tratar os mesmos dados sem definir formalmente os papéis de cada uma. Isso importa porque as obrigações da lei — atender pedido de exclusão, informar a finalidade do tratamento, responder a incidente de segurança — recaem sobre quem é controlador, e não sobre quem tem o arquivo na mão.",
        "Centralizar o registro do contato em uma plataforma da própria incorporadora não resolve a questão jurídica sozinho, mas torna possível respondê-la: sem saber onde o dado está e quem o acessou, não há como cumprir pedido de titular nem demonstrar a base legal usada.",
      ],
    },
  },

  "inteligencia-de-performance": {
    h1: "Inteligência de Performance: onde o funil comercial vaza",
    aberturaDefinicional: {
      destaque:
        "A Inteligência de Performance da PIPADriven mostra o funil completo de um lançamento — do clique no anúncio ao contrato — segmentado por campanha, empreendimento e corretor.",
      complemento:
        "É o módulo que separa problema de mídia de problema de atendimento, distinção que muda completamente onde a incorporadora deve realocar dinheiro.",
    },
    lista: {
      titulo: "As quatro métricas que explicam a maior parte do resultado",
      itens: [
        {
          termo: "Lead response time",
          definicao:
            "tempo entre a conversão no anúncio e o primeiro contato efetivo, medido por corretor e por equipe.",
        },
        {
          termo: "Taxa de clique-a-estande",
          definicao:
            "percentual dos leads de mídia paga que comparecem ao plantão de vendas.",
        },
        {
          termo: "Taxa de lead sem contato",
          definicao:
            "percentual que nunca recebeu nenhuma tentativa registrada. Costuma ser o número mais desconfortável da operação.",
        },
        {
          termo: "Conversão de visita em proposta, por corretor",
          definicao:
            "mostra se o gargalo está em gerar visita ou em fechar quem já veio.",
        },
      ],
      fecho:
        "Se a taxa de clique-a-estande é baixa mas o lead response time é bom, o problema é de mídia ou de produto. Se o response time é ruim, o problema é de atendimento — e nenhuma verba adicional de mídia vai corrigi-lo.",
    },
  },
};

export const getSolucaoGeo = (slug: string): SolucaoGeo | undefined =>
  SOLUCOES_GEO[slug];
