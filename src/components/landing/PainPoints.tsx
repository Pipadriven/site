const painPoints = [
  "Leads desqualificados consumindo tempo do seu time comercial?",
  "Corretores sem foco nas melhores oportunidades?",
  "Pós-venda falho e clientes insatisfeitos?",
  "Perda de oportunidades por falta de dados organizados e priorização clara?",
];

const PainPoints = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-card border-y border-border">
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Você enfrenta esses <span className="gradient-text">desafios?</span>
          </h2>
        </div>
      </div>

      {/* Scrolling Text */}
      <div className="relative">
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...painPoints, ...painPoints].map((point, index) => (
              <span
                key={index}
                className="mx-8 text-2xl md:text-3xl lg:text-4xl font-bold text-muted-foreground/40 hover:text-primary transition-colors duration-300 cursor-default"
              >
                {point}
              </span>
            ))}
          </div>
          <div className="flex animate-marquee whitespace-nowrap" aria-hidden>
            {[...painPoints, ...painPoints].map((point, index) => (
              <span
                key={index}
                className="mx-8 text-2xl md:text-3xl lg:text-4xl font-bold text-muted-foreground/40 hover:text-primary transition-colors duration-300 cursor-default"
              >
                {point}
              </span>
            ))}
          </div>
        </div>

        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-card to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-card to-transparent pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-6">
            Transforme seus resultados com inteligência artificial
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            Descubra como resolver →
          </a>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
