/**
 * "O problema que a PIPADriven resolve" — resposta direta, alta na página.
 *
 * Vem logo depois do Hero de propósito: os primeiros 150–200 tokens do HTML
 * pesam de forma desproporcional na sumarização que o modelo faz da página,
 * então o que abre é o que ele repete depois.
 *
 * Cada parágrafo é autocontido. Nada de "como vimos acima" ou "além disso" —
 * o modelo extrai trechos isolados, e frase que depende do contexto anterior
 * vira ruído quando arrancada da página e acaba descartada.
 */
const Problema = () => {
  return (
    <section className="py-20 relative" id="problema">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            O problema que a <span className="gradient-text">PIPADriven resolve</span>
          </h2>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              A incorporadora investe em mídia paga e perde a visibilidade do lead no exato
              momento em que ele é repassado à imobiliária ou ao corretor parceiro. De 100
              pessoas que clicaram no anúncio, ela não sabe quantas foram atendidas, em
              quanto tempo, quantas visitaram o estande, nem com qual corretor cada uma está.
              O que sobra é custo por lead na ponta de entrada e número de vendas na ponta de
              saída — e nenhuma informação entre os dois pontos.
            </p>
            <p>
              A PIPADriven instrumenta esse meio. O primeiro contato passa a ser feito pela
              própria plataforma, em segundos, então cada evento fica registrado: horário da
              conversão, horário do primeiro atendimento, teor da conversa, nível de
              qualificação, corretor responsável, comparecimento ao estande.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problema;
