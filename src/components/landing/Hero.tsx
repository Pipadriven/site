import { whatsappUrl, trackWhatsAppClick } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden hero-gradient">
      {/* Background Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-glow opacity-50 pointer-events-none" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              {/*
                O espaço depois de "incorporadora" tem que existir DENTRO do span.
                Os dois spans são irmãos, então textContent os concatena sem
                separador: sem esse espaço o crawler extrai "incorporadoracom
                Inteligência Artificial". Para o humano não muda nada — o `block`
                do primeiro span já quebra a linha visualmente.
              */}
              <span className="block">Transforme o processo comercial da sua incorporadora </span>
              <span className="gradient-text">com Inteligência Artificial</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Agentes inteligentes que atendem, qualificam e nutrem leads em escala, 24h por dia.
              Enquanto seu time foca no que realmente importa: vender.
              Mais eficiência, controle e conversão, sem aumentar o time.
            </p>

            <div className="flex justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <a
                href={whatsappUrl("hero")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("hero")}
              >
                <Button variant="hero" size="xl" className="group">
                  Ver na prática
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>

          </div>

          {/* Visual Element */}
          <div className="relative hidden lg:block">
            <div className="relative animate-float">
              {/* Main Card */}
              <div className="relative z-10 bg-card border border-border rounded-2xl p-6 card-glow">
                <div className="space-y-4">
                  {/* Chat Header */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold">AI</span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Agente PIPADriven</p>
                        <p className="text-xs text-muted-foreground">Online agora</p>
                      </div>
                    <div className="ml-auto flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="space-y-3">
                    <div className="bg-secondary rounded-2xl rounded-tl-sm p-4 max-w-[80%]">
                      <p className="text-sm text-foreground">
                        Olá! Sou a assistente virtual da incorporadora. Como posso ajudar você hoje?
                      </p>
                    </div>
                    <div className="bg-primary rounded-2xl rounded-tr-sm p-4 max-w-[80%] ml-auto">
                      <p className="text-sm text-primary-foreground">
                        Gostaria de saber mais sobre os imóveis disponíveis na região sul.
                      </p>
                    </div>
                    <div className="bg-secondary rounded-2xl rounded-tl-sm p-4 max-w-[80%]">
                      <p className="text-sm text-foreground">
                        Perfeito! Vou te fazer algumas perguntas rápidas para entender melhor o que você busca e direcionar seu atendimento da melhor forma.
                      </p>
                    </div>
                    <div className="bg-secondary rounded-2xl rounded-tl-sm p-4 max-w-[80%]">
                      <p className="text-sm text-foreground">
                        Para começar: você procura um imóvel para moradia ou investimento?
                      </p>
                    </div>
                  </div>

                  {/* Input */}
                  <div className="flex gap-2 pt-2">
                    <div className="flex-1 bg-secondary rounded-full px-4 py-3 text-sm text-muted-foreground">
                      Digite sua mensagem...
                    </div>
                    <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
                      <ArrowRight className="w-5 h-5 text-primary-foreground" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-card border border-border rounded-xl p-3 card-glow animate-pulse-slow">
                <p className="text-2xl font-bold text-primary">+87%</p>
                <p className="text-xs text-muted-foreground">conversão</p>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-3 card-glow animate-pulse-slow" style={{ animationDelay: "1s" }}>
                <p className="text-2xl font-bold text-primary">24/7</p>
                <p className="text-xs text-muted-foreground">atendimento</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
