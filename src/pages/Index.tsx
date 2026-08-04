import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import Solutions from "@/components/landing/Solutions";
import PainPoints from "@/components/landing/PainPoints";
import Logos from "@/components/landing/Logos";
import Integrations from "@/components/landing/Integrations";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Stats />
      <Solutions />
      <PainPoints />
      <Logos />
      <Integrations />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
