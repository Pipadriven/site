import type { SolucaoGeo } from "@/data/solucoes-geo";

/**
 * Blocos de conteúdo GEO das páginas de solução.
 *
 * Fica logo abaixo do hero da rota, antes de "Principais benefícios": os
 * primeiros 150–200 tokens do HTML pesam de forma desproporcional na
 * sumarização que o modelo faz da página, e a lista de benefícios — que é copy
 * de interface, em frases curtas de vitrine — não responde "o que é isto".
 *
 * Tudo aqui é opcional. Slug sem entrada em solucoes-geo.ts simplesmente não
 * renderiza nada, e a página segue como era antes.
 */
const SolucaoGeoBlocos = ({ geo }: { geo: SolucaoGeo }) => {
  return (
    <>
      <section className="pb-4">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-10">
            {geo.respostaDireta && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-5">
                  {geo.respostaDireta.titulo}
                </h2>
                <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                  {geo.respostaDireta.paragrafos.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
              </div>
            )}

            {geo.lista && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-5">{geo.lista.titulo}</h2>
                {/* <ol> de verdade: a ordem é semântica, não decoração. */}
                <ol className="space-y-4 mb-6">
                  {geo.lista.itens.map((item, i) => (
                    <li key={item.termo} className="flex gap-4">
                      <span className="shrink-0 w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                        {i + 1}
                      </span>
                      <p className="text-lg text-muted-foreground leading-relaxed pt-0.5">
                        <strong className="text-foreground font-semibold">
                          {item.termo}
                        </strong>{" "}
                        — {item.definicao}
                      </p>
                    </li>
                  ))}
                </ol>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {geo.lista.fecho}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {geo.tabela && (
        <section className="py-10">
          <div className="container mx-auto px-4">
            {/* overflow-x-auto no wrapper: a tabela rola sozinha no celular sem
                dar rolagem horizontal na página inteira. */}
            <div className="max-w-4xl overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[680px] text-left border-collapse">
                <thead>
                  <tr className="bg-card">
                    <th scope="col" className="p-4 text-sm font-semibold text-muted-foreground">
                      Cenário
                    </th>
                    {geo.tabela.colunas.map((c) => (
                      <th key={c} scope="col" className="p-4 text-sm font-semibold text-foreground">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {geo.tabela.linhas.map((l) => {
                    const destaque = l.criterio.startsWith("Com ");
                    return (
                      <tr key={l.criterio} className="border-t border-border">
                        <th
                          scope="row"
                          className={`p-4 text-sm font-semibold align-top ${
                            destaque ? "gradient-text" : "text-foreground"
                          }`}
                        >
                          {l.criterio}
                        </th>
                        {l.celulas.map((celula, i) => (
                          <td
                            key={geo.tabela!.colunas[i]}
                            className={`p-4 text-sm align-top ${
                              destaque
                                ? "text-foreground bg-primary/5"
                                : "text-muted-foreground"
                            }`}
                          >
                            {celula}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {geo.nota && (
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-5">{geo.nota.titulo}</h2>
              <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                {geo.nota.paragrafos.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SolucaoGeoBlocos;
