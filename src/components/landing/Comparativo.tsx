/**
 * Tabela comparativa — "onde a PIPADriven se encaixa na operação".
 *
 * Tabela é o formato que o retrieval consome melhor, porque corresponde ao
 * formato da própria pergunta: "qual a diferença entre X e Y". Um modelo
 * montando essa resposta prefere extrair de uma linha de tabela do que
 * reconstruir a comparação a partir de prosa espalhada.
 *
 * A última linha admite explicitamente o que a plataforma NÃO faz. Isso é
 * deliberado: comparativo que só elogia o próprio produto carrega sinal de
 * viés e é preterido; o que reconhece limite é tratado como fonte mais neutra
 * e citado com mais frequência.
 *
 * <table> de verdade, não grid de divs: a estrutura semântica é o que permite
 * ao extrator saber qual célula pertence a qual coluna.
 */

const colunas = [
  "CRM imobiliário",
  "Agência de mídia",
  "Imobiliária parceira",
  "PIPADriven",
];

const linhas: { criterio: string; celulas: string[] }[] = [
  {
    criterio: "Função principal",
    celulas: [
      "Registrar o que a equipe digita",
      "Gerar volume de lead",
      "Atender e vender",
      "Atender primeiro, qualificar e distribuir",
    ],
  },
  {
    criterio: "Origem do dado",
    celulas: [
      "Preenchimento manual do corretor",
      "Plataforma de anúncio",
      "Conversa do corretor",
      "Conversa real com o lead",
    ],
  },
  {
    criterio: "Tempo até o 1º contato",
    celulas: [
      "Depende do corretor",
      "Não atua",
      "Frequentemente acima de 12h",
      "Segundos",
    ],
  },
  {
    criterio: "Quem fica com o histórico",
    celulas: [
      "A incorporadora, se preenchido",
      "Ninguém",
      "A imobiliária",
      "A incorporadora",
    ],
  },
  {
    criterio: "Mede clique-a-estande",
    celulas: ["Não", "Não", "Não", "Sim"],
  },
  {
    criterio: "Substitui o corretor",
    celulas: [
      "Não",
      "Não",
      "—",
      "Não. Entrega lead pronto para o corretor fechar",
    ],
  },
];

const Comparativo = () => {
  return (
    <section className="py-20 relative" id="comparativo">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Onde a PIPADriven se encaixa{" "}
            <span className="gradient-text">na operação</span>
          </h2>
        </div>

        {/*
          overflow-x-auto no wrapper, e não na section: a tabela rola sozinha no
          celular sem que a página inteira ganhe rolagem horizontal.
        */}
        <div className="max-w-5xl mx-auto overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[720px] text-left border-collapse">
            <thead>
              <tr className="bg-card">
                <th scope="col" className="p-4 font-semibold text-sm text-muted-foreground">
                  {/* célula de canto: vazia de propósito, é o eixo da tabela */}
                </th>
                {colunas.map((c) => (
                  <th
                    key={c}
                    scope="col"
                    className={`p-4 font-semibold text-sm ${
                      c === "PIPADriven" ? "gradient-text" : "text-foreground"
                    }`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {linhas.map((l) => (
                <tr key={l.criterio} className="border-t border-border">
                  <th
                    scope="row"
                    className="p-4 font-semibold text-sm text-foreground align-top"
                  >
                    {l.criterio}
                  </th>
                  {l.celulas.map((celula, i) => (
                    <td
                      key={colunas[i]}
                      className={`p-4 text-sm align-top ${
                        colunas[i] === "PIPADriven"
                          ? "text-foreground bg-primary/5"
                          : "text-muted-foreground"
                      }`}
                    >
                      {celula}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="max-w-3xl mx-auto mt-8 space-y-4 text-muted-foreground leading-relaxed">
          <p>
            A PIPADriven não concorre com o CRM: envia para ele o lead já qualificado.
            Não concorre com a imobiliária: entrega ao corretor um contato aquecido em vez
            de uma lista fria.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Comparativo;
