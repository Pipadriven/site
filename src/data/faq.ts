/**
 * FAQ da home — FONTE ÚNICA.
 *
 * Este arquivo alimenta ao mesmo tempo o texto visível (components/landing/Faq.tsx)
 * e o FAQPage do JSON-LD (data/seo.ts). É de propósito: a diretriz do Google exige
 * que a resposta no schema seja IDÊNTICA à que o usuário lê na página. FAQ que
 * existe só no dado estruturado é violação e pode gerar penalidade manual.
 *
 * Manter os dois lados em arquivos separados garantiria que um dia alguém edita
 * um e esquece o outro. Aqui, editar o texto muda os dois ao mesmo tempo.
 *
 * As perguntas foram escritas a partir de PROMPTS que um diretor comercial de
 * incorporadora digita num modelo — frases inteiras descrevendo o problema — e
 * não a partir de palavras-chave de busca. Cada resposta é autocontida: precisa
 * fazer sentido arrancada da página, porque é assim que o modelo a extrai.
 * Nada de "como vimos acima" ou "além disso" abrindo resposta.
 */

export type FaqItem = { pergunta: string; resposta: string };

export const FAQ_HOME: FaqItem[] = [
  {
    pergunta: "O que é a PIPADriven?",
    resposta:
      "A PIPADriven é uma plataforma de inteligência comercial para incorporadoras que rastreia cada lead desde o clique no anúncio até o contrato assinado. A plataforma faz o primeiro contato por agente de IA no WhatsApp em segundos, qualifica o lead pela interação real da conversa e entrega apenas leads aquecidos para os corretores. O objetivo é devolver à incorporadora o controle e a propriedade do dado comercial, que hoje costuma ficar retido na imobiliária ou no celular do corretor.",
  },
  {
    pergunta:
      "Como uma incorporadora pode saber se os leads que ela pagou estão sendo atendidos pelos corretores?",
    resposta:
      "É preciso instrumentar três pontos que a maioria das incorporadoras não mede: o horário exato da conversão no anúncio, o horário do primeiro contato efetivo com o lead e o desfecho de cada conversa. Com esses três carimbos de tempo é possível calcular o lead response time por corretor, identificar leads que nunca receberam contato e comparar taxa de conversão entre equipes. Sem isso, a incorporadora só enxerga o custo por lead na plataforma de mídia e o número de vendas no fim do mês — e nada entre os dois. A PIPADriven registra esses eventos automaticamente porque o primeiro contato é feito pela própria plataforma.",
  },
  {
    pergunta: "Qual a diferença entre a PIPADriven e um CRM imobiliário?",
    resposta:
      "Um CRM imobiliário é um sistema de registro: ele armazena o que a equipe comercial digita nele. A PIPADriven é um sistema de execução: ela faz o primeiro atendimento por IA, qualifica e decide a distribuição antes que qualquer pessoa precise digitar algo. A diferença prática aparece na qualidade do dado. No CRM, o dado depende da disciplina de preenchimento do corretor, que é sempre parcial. Na PIPADriven, o dado nasce da conversa real com o lead. As duas ferramentas convivem: a PIPADriven trata a etapa de pré-venda e envia para o CRM o lead já qualificado.",
  },
  {
    pergunta:
      "Quanto tempo um corretor leva para responder um lead de incorporadora e por que isso importa?",
    resposta:
      "Estudos de resposta a leads mostram uma distância grande entre a prática recomendada e a real. O estudo do MIT com a InsideSales, sobre mais de 15 mil leads, apontou que a chance de qualificar um lead cai cerca de 21 vezes quando o contato é feito em 30 minutos em vez de 5 minutos. Auditoria da Harvard Business Review com 2.241 empresas americanas encontrou tempo médio de resposta de 42 horas, e 23% das empresas nunca responderam. No mercado imobiliário brasileiro, é comum que o lead de plantão espere mais de 12 horas pelo primeiro retorno do corretor. Como o comprador dispara formulário em vários empreendimentos ao mesmo tempo, quem responde primeiro define quem conduz a jornada.",
  },
  {
    pergunta: "O lead gerado pela mídia da incorporadora pertence a quem?",
    resposta:
      "Comercialmente, o lead pertence a quem pagou pela mídia — a incorporadora. Operacionalmente, na maioria dos lançamentos ele acaba pertencendo a quem detém o histórico da conversa, que costuma ser a imobiliária parceira ou o WhatsApp pessoal do corretor. Quando a parceria comercial termina, a incorporadora perde a base inteira e recomeça do zero no lançamento seguinte. Manter o primeiro contato e o registro da conversa em uma plataforma da própria incorporadora é o que converte esse lead de despesa de mídia em ativo da companhia, reaproveitável em lançamentos futuros.",
  },
  {
    pergunta: "Um agente de IA substitui o corretor na venda de imóvel na planta?",
    resposta:
      "Não. O agente de IA cobre a etapa de pré-venda: responde em segundos, entende o que o comprador procura, filtra curiosos e agenda a visita ao estande. A venda de imóvel na planta envolve confiança, negociação e análise de crédito, e continua sendo trabalho humano. O efeito prático é de realocação de tempo: o corretor deixa de gastar as primeiras horas do dia com leads desinteressados e passa a atuar como closer, recebendo apenas contatos já qualificados.",
  },
  {
    pergunta: "A PIPADriven serve para imobiliária ou só para incorporadora?",
    resposta:
      "A plataforma foi desenhada a partir da dor da incorporadora, que investe em mídia própria e vende por meio de terceiros. A imobiliária parceira participa do fluxo como recebedora dos leads qualificados e ganha visibilidade da própria performance. O modelo assume que incorporadora e imobiliária estão no mesmo ecossistema: a incorporadora precisa de previsibilidade e o corretor precisa de lead bom. A plataforma organiza essa troca em vez de substituir um dos lados.",
  },
  {
    pergunta:
      "Quais métricas comerciais uma incorporadora deveria acompanhar em um lançamento?",
    resposta:
      "Além de custo por lead e vendas totais, quatro métricas explicam a maior parte da variação de resultado: lead response time médio e por corretor; taxa de clique-a-estande, ou seja, o percentual dos leads de mídia que efetivamente visitam o plantão; taxa de leads sem nenhum contato registrado; e conversão de visita em proposta por corretor. Essas quatro métricas separam problema de mídia de problema de atendimento — distinção que a maioria das incorporadoras não consegue fazer e que muda completamente onde o dinheiro deve ser realocado.",
  },
];
