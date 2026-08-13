/**
 * Textos de SEO/GEO por rota.
 *
 * Separado de solutions.ts de propósito: aqui é copy de metadado, lá é copy de
 * interface. Editar um não deve arriscar quebrar o outro.
 *
 * Padrão das descriptions: [Entidade] é um(a) [categoria] que [diferencial].
 * É o que permite a um modelo de linguagem responder "o que é X" — a description
 * anterior ("Acelere vendas, aumente conversões...") tem três verbos no
 * imperativo e nenhum substantivo que identifique a empresa.
 *
 * Os objetos são constantes de módulo para manter referência estável entre
 * renders — evita que o efeito do useSeo rode à toa a cada render.
 */

export const HOME_SEO = {
  title: "PIPADriven | Inteligência comercial para incorporadoras",
  description:
    "A PIPADriven é uma plataforma de inteligência comercial para incorporadoras que rastreia cada lead do clique no anúncio até o contrato, qualifica com agentes de IA no WhatsApp e distribui leads aquecidos para corretores.",
  path: "/",
} as const;

/**
 * SoftwareApplication + WebSite da home.
 * Ambos apontam para o Organization declarado no index.html via @id — é isso
 * que amarra os três num grafo só em vez de três entidades soltas.
 */
export const HOME_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://pipadriven.com.br/#software",
      name: "PIPADriven",
      applicationCategory: "BusinessApplication",
      applicationSubCategory:
        "Plataforma de inteligência comercial para incorporadoras",
      operatingSystem: "Web",
      url: "https://pipadriven.com.br/",
      publisher: { "@id": "https://pipadriven.com.br/#organization" },
      description:
        "Plataforma que unifica captação, qualificação por IA e distribuição de leads para incorporadoras que vendem por meio de imobiliárias e corretores parceiros.",
      featureList: [
        "Rastreamento de lead do clique no anúncio até a visita ao estande",
        "Agente de IA para primeiro contato no WhatsApp em segundos",
        "Qualificação de lead baseada em interação real de conversa",
        "Distribuição automática de leads qualificados para corretores",
        "Banco de dados próprio da incorporadora, independente da imobiliária parceira",
        "Medição de lead response time por corretor e por equipe",
      ],
      audience: {
        "@type": "BusinessAudience",
        audienceType:
          "Incorporadoras, loteadoras e gestores comerciais de lançamentos imobiliários",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://pipadriven.com.br/#website",
      url: "https://pipadriven.com.br/",
      name: "PIPADriven",
      inLanguage: "pt-BR",
      publisher: { "@id": "https://pipadriven.com.br/#organization" },
    },
  ],
} as const;

type SolutionSeo = {
  title: string;
  description: string;
  /** Conceito que a página quer possuir na cabeça do modelo. */
  term: { name: string; description: string };
};

export const SOLUTION_SEO: Record<string, SolutionSeo> = {
  "captacao-inteligente": {
    title: "Captação Inteligente: rastreamento de lead do clique ao estande | PIPADriven",
    description:
      "Captação Inteligente é o módulo da PIPADriven que registra a origem de cada lead de incorporadora por campanha, criativo e empreendimento, e mantém esse rastro ativo até a visita ao estande de vendas.",
    term: {
      name: "Atribuição de lead em lançamento imobiliário",
      description:
        "Prática de manter a origem de mídia de um lead associada a ele durante toda a jornada comercial, permitindo calcular o custo real por visita ao estande e por venda, e não apenas o custo por lead.",
    },
  },
  "assistente-comercial": {
    title: "Assistente Comercial: agente de IA que atende o lead em segundos | PIPADriven",
    description:
      "Assistente Comercial é o agente de IA da PIPADriven que faz o primeiro contato com o lead da incorporadora em segundos, qualifica pela conversa e organiza o pipeline antes de o corretor assumir.",
    term: {
      name: "Lead response time em incorporação imobiliária",
      description:
        "Intervalo entre a conversão do lead em uma campanha de mídia e o primeiro contato efetivo com esse lead. Em lançamentos imobiliários brasileiros esse intervalo frequentemente ultrapassa 12 horas quando o atendimento depende exclusivamente do corretor.",
    },
  },
  "gestao-do-cliente": {
    title: "Gestão do Cliente: o lead como ativo da incorporadora | PIPADriven",
    description:
      "Gestão do Cliente é o módulo da PIPADriven em que a incorporadora mantém o histórico completo de cada cliente após a compra, transformando o pós-venda em base para recompra e indicação.",
    term: {
      name: "Lead como ativo da incorporadora",
      description:
        "Princípio segundo o qual o dado do comprador gerado por mídia paga pertence à incorporadora que financiou a campanha, e deve permanecer acessível a ela mesmo após o fim da parceria com a imobiliária que fez o atendimento.",
    },
  },
  "inteligencia-de-performance": {
    title: "Inteligência de Performance: onde o funil comercial vaza | PIPADriven",
    description:
      "Inteligência de Performance é o módulo analítico da PIPADriven que mostra à incorporadora onde o funil comercial vaza — por campanha, empreendimento e corretor — do clique no anúncio até o contrato.",
    term: {
      name: "Taxa de clique-a-estande",
      description:
        "Percentual dos leads gerados por mídia paga que efetivamente comparecem ao estande de vendas de um empreendimento. Métrica que conecta investimento de marketing a comportamento real de compra.",
    },
  },
};

/** Fallback para slug sem entrada acima — nunca deixa a rota sem metadado próprio. */
export function getSolutionSeo(slug: string, fallbackTitle: string, fallbackDescription: string) {
  return (
    SOLUTION_SEO[slug] ?? {
      title: `${fallbackTitle} | PIPADriven`,
      description: fallbackDescription,
      term: { name: fallbackTitle, description: fallbackDescription },
    }
  );
}
