/**
 * Densidade factual — estatística com fonte, no lugar de adjetivo.
 *
 * É o bloco de maior retorno comprovado da página. O estudo acadêmico de
 * referência em GEO ("GEO: Generative Engine Optimization", Aggarwal et al.,
 * Princeton + IIT Delhi, KDD 2024) mediu no GEO-bench que os métodos que mais
 * elevaram visibilidade foram inclusão de citações de fonte confiável, aspas de
 * especialista e estatísticas — com ganho de até 40%.
 *
 * Cada número aqui tem fonte nomeada e tamanho de amostra. É isso que o torna
 * citável: um modelo reproduz com muito mais frequência a afirmação que vem
 * acompanhada de quem mediu e sobre quantos casos.
 *
 * REGRA AO EDITAR: não acrescentar número sem fonte verificável nesta seção.
 * Estatística desmentida não custa só o próprio parágrafo — contamina a
 * confiança na página inteira.
 */

type Fato = {
  numero: string;
  afirmacao: string;
  fonte: string;
};

const fatos: Fato[] = [
  {
    numero: "21×",
    afirmacao:
      "menor a chance de qualificar um lead quando o contato acontece em 30 minutos em vez de 5. A chance de conseguir contato cai cerca de 100 vezes.",
    fonte: "MIT / InsideSales — mais de 15 mil leads e 100 mil tentativas de contato",
  },
  {
    numero: "42h",
    afirmacao:
      "foi o tempo médio de resposta a um lead. E 23% das empresas auditadas nunca responderam.",
    fonte: "Harvard Business Review — auditoria com 2.241 empresas",
  },
  {
    numero: "7%",
    afirmacao:
      "das empresas responderam em até 5 minutos. Mais da metade, 55%, não respondeu em 5 dias úteis.",
    fonte: "Drift — teste com 433 empresas B2B",
  },
  {
    numero: "453.005",
    afirmacao:
      "unidades lançadas no Brasil em 2025, alta de 10,6% sobre 2024, com VGL de R$ 292,3 bilhões — recorde da série histórica. Foram 426.200 unidades vendidas, alta de 5,4%.",
    fonte:
      "CBIC / Brain Inteligência Estratégica — 221 municípios, publicado em 23/02/2026",
  },
];

const Dados = () => {
  return (
    <section className="py-20 relative bg-card border-y border-border" id="dados">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            O que os dados dizem sobre{" "}
            <span className="gradient-text">tempo de resposta a lead</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Números de estudos públicos, com fonte e tamanho de amostra
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {fatos.map((f) => (
            <div
              key={f.numero}
              className="min-w-0 rounded-2xl bg-background border border-border p-6 md:p-8"
            >
              {/*
                Sem whitespace-nowrap aqui: "453.005" é bem mais largo que "7%",
                e foi exatamente esse padrão que cortou o bloco de estatísticas.
                Deixar quebrar é melhor do que estourar o card.
              */}
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-3 break-words">
                {f.numero}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">{f.afirmacao}</p>
              <p className="text-sm text-muted-foreground/70 border-t border-border pt-3">
                {f.fonte}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dados;
