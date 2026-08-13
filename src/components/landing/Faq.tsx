import { FAQ_HOME } from "@/data/faq";

/**
 * FAQ da home.
 *
 * Renderizado como <details>/<summary> nativo, e não com um acordeão de JS:
 * o conteúdo de um <details> fechado continua no HTML e é lido por crawler.
 * Um acordeão que só monta o texto ao clicar entregaria ao modelo uma lista de
 * perguntas sem nenhuma resposta — exatamente o oposto do que esta seção existe
 * para fazer.
 *
 * O texto vem de data/faq.ts, o mesmo arquivo que gera o FAQPage do JSON-LD.
 * Não editar as respostas aqui: editar lá muda os dois lados de uma vez.
 */
const Faq = () => {
  return (
    <section className="py-20 relative" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Perguntas sobre <span className="gradient-text">gestão de leads em incorporadoras</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            As dúvidas que aparecem com mais frequência em diretoria comercial de lançamento
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_HOME.map((item) => (
            <details
              key={item.pergunta}
              className="group rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
            >
              {/* list-none tira o marcador no Chrome/Firefox; o seletor de
                  webkit tira no Safari, que ignora o list-style. */}
              <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden p-5 md:p-6 flex items-start justify-between gap-4">
                <h3 className="text-base md:text-lg font-semibold text-foreground">
                  {item.pergunta}
                </h3>
                {/* aria-hidden: é decoração. O <summary> já anuncia o estado sozinho. */}
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-primary transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="px-5 md:px-6 pb-5 md:pb-6 text-muted-foreground leading-relaxed">
                {item.resposta}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
