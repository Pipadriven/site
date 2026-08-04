import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { getSolutionBySlug } from "@/data/solutions";
import { useEffect } from "react";

const SolutionDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const solution = getSolutionBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    if (solution) {
      document.title = `${solution.title} | PIPADriven`;
    }
  }, [solution]);

  if (!solution) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <section className="container mx-auto px-4 pt-40 pb-24 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Solução não encontrada</h1>
          <p className="text-muted-foreground mb-8">
            A solução que você procura não existe ou foi movida.
          </p>
          <Link to="/#solutions">
            <Button variant="default">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para as soluções
            </Button>
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  const Icon = solution.icon;

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-glow opacity-60 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <Link
            to="/#solutions"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para soluções
          </Link>

          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                {solution.name}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">{solution.title}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {solution.longDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">
            Principais <span className="gradient-text">benefícios</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {solution.benefits.map((benefit, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features + Use cases */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-xs md:text-sm font-semibold tracking-wider uppercase text-primary bg-primary/10 border border-primary/20 px-4 py-2 rounded-full">
              Da estrutura à aplicação prática
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Recursos inclusos</h2>
            <ul className="space-y-3">
              {solution.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Cenários da operação</h2>
            <ul className="space-y-3">
              {solution.useCases.map((useCase, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative bg-card border border-border rounded-2xl p-10 md:p-14 text-center overflow-hidden">
            <div className="absolute inset-0 bg-glow opacity-50 pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pronto para ativar <span className="gradient-text">{solution.title}</span>?
              </h2>
              <p className="text-muted-foreground mb-8">
                Fale com nosso time e descubra como essa solução se encaixa na sua operação.
              </p>
              <Link to={`/?solution=${encodeURIComponent(solution.title)}#contact`}>
                <Button size="lg" variant="default">
                  Entre em contato
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SolutionDetail;