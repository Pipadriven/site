import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { getSolutionBySlug } from "@/data/solutions";
import { getSolutionSeo } from "@/data/seo";
import { getSolucaoGeo } from "@/data/solucoes-geo";
import SolucaoGeoBlocos from "@/components/landing/SolucaoGeoBlocos";
import { useSeo } from "@/lib/seo";
import { useEffect, useMemo } from "react";

const SolutionDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const solution = getSolutionBySlug(slug);
  // Não é hook: pode ficar aqui em cima sem afetar a ordem dos hooks abaixo.
  const geo = solution ? getSolucaoGeo(solution.slug) : undefined;

  // Hooks antes de qualquer return: o caminho "solução não encontrada"
  // também precisa de metadado próprio, senão herda o da última rota visitada.
  const seo = useMemo(() => {
    if (!solution) {
      return {
        title: "Solução não encontrada | PIPADriven",
        description:
          "A solução que você procura não existe ou foi movida. Veja as soluções da PIPADriven para incorporadoras.",
        term: null as null | { name: string; description: string },
      };
    }
    return getSolutionSeo(solution.slug, solution.title, solution.longDescription);
  }, [solution]);

  const jsonLd = useMemo(() => {
    if (!solution || !seo.term) return undefined;
    const url = `https://pipadriven.com.br/solucoes/${solution.slug}`;
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: solution.title,
      description: seo.description,
      inLanguage: "pt-BR",
      isPartOf: { "@id": "https://pipadriven.com.br/#website" },
      about: {
        "@type": "DefinedTerm",
        name: seo.term.name,
        description: seo.term.description,
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: "https://pipadriven.com.br/" },
          { "@type": "ListItem", position: 2, name: solution.title, item: url },
        ],
      },
    } as Record<string, unknown>;
  }, [solution, seo]);

  useSeo({
    title: seo.title,
    description: seo.description,
    path: solution ? `/solucoes/${solution.slug}` : "/",
    jsonLd,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
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

            {/*
              O <h1> vem do solucoes-geo.ts quando existe. O anterior era só o
              nome do módulo ("Captação Inteligente") — sem categoria, sem
              público, sem a entidade. Um modelo lendo aquele h1 não tinha como
              ligar o módulo à PIPADriven nem saber do que a página trata.
              Slug sem conteúdo GEO cai no título de antes.
            */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="gradient-text">{geo ? geo.h1 : solution.title}</span>
            </h1>

            {geo ? (
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                <strong className="text-foreground font-semibold">
                  {geo.aberturaDefinicional.destaque}
                </strong>{" "}
                {geo.aberturaDefinicional.complemento}
              </p>
            ) : (
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {solution.longDescription}
              </p>
            )}
          </div>
        </div>
      </section>

      {geo && <SolucaoGeoBlocos geo={geo} />}

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