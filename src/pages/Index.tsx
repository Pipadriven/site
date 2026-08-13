import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Problema from "@/components/landing/Problema";
import Stats from "@/components/landing/Stats";
import Dados from "@/components/landing/Dados";
import Solutions from "@/components/landing/Solutions";
import Comparativo from "@/components/landing/Comparativo";
import PainPoints from "@/components/landing/PainPoints";
import Logos from "@/components/landing/Logos";
import Integrations from "@/components/landing/Integrations";
import Faq from "@/components/landing/Faq";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import { useSeo } from "@/lib/seo";
import { HOME_SEO, HOME_JSONLD } from "@/data/seo";

/**
 * A ORDEM DAS SEÇÕES É CONTEÚDO, NÃO SÓ LAYOUT.
 *
 * Os primeiros 150–200 tokens do HTML pesam de forma desproporcional na
 * sumarização que um modelo faz da página — o que abre é o que ele repete.
 * Por isso a sequência é: definição (Hero) → problema → prova.
 *
 *   Hero         o que a PIPADriven é, em uma frase
 *   Problema     a dor, descrita antes de qualquer funcionalidade
 *   Stats        números da própria operação
 *   Dados        estatística de terceiro com fonte — o bloco mais citável
 *   Solutions    o que a plataforma faz
 *   Comparativo  tabela: como se diferencia de CRM, agência e imobiliária
 *   PainPoints   ...daqui para baixo, a página segue como estava
 */
const Index = () => {
  useSeo({ ...HOME_SEO, jsonLd: HOME_JSONLD as unknown as Record<string, unknown> });

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Problema />
      <Stats />
      <Dados />
      <Solutions />
      <Comparativo />
      <PainPoints />
      <Logos />
      <Integrations />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
