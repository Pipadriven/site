const stats = [
  { value: "+30%", label: "aumento na qualificação de leads" },
  { value: "+25%", label: "melhoria na conversão de vendas" },
  { value: "+7 mil", label: "contatos atendidos" },
  { value: "+R$40 mi", label: "em VGV negociado" },
];

const Stats = () => {
  return (
    <section className="py-20 relative overflow-hidden" id="about">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            A IA referência em <span className="gradient-text">operações comerciais imobiliárias</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Resultados comprovados que elevam performance com inteligência
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              // min-w-0 é obrigatório aqui: item de grid nasce com min-width:auto,
              // então ele se recusa a ficar menor que o próprio conteúdo. Com o
              // whitespace-nowrap do número abaixo, a coluna crescia junto com o
              // texto e a linha inteira estourava a largura do container — em
              // 1024px a grade passava 92px do limite e o 4º card era cortado
              // pelo overflow-hidden da section.
              className="group relative min-w-0 p-4 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:card-glow"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 text-center">
                {/*
                  Os tamanhos abaixo saíram de medição, não de estimativa. A string
                  mais larga é "+R$40 mi"; o que cabe no card, por breakpoint:

                    375px   28px máx   →  text-2xl  (24px)
                    768px   61px máx   →  md:text-5xl  (48px)   ainda 2 colunas
                   1024px   33px máx   →  lg:text-3xl  (30px)   vira 4 colunas
                   1280px   47px máx   →  xl:text-4xl  (36px)
                   1536px+  54px máx   →  2xl:text-5xl (48px)   container trava em 1400px

                  A queda de md:text-5xl para lg:text-3xl parece errada e não é:
                  é em lg que a grade passa de 2 para 4 colunas e cada card perde
                  mais da metade da largura.

                  O lg:text-6xl anterior (60px) não cabia em NENHUM breakpoint —
                  nem numa tela de 1920px, porque o container trava em 1400px.
                */}
                <p className="text-2xl sm:text-3xl md:text-5xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold gradient-text mb-1 md:mb-2 whitespace-nowrap">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm md:text-base">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
