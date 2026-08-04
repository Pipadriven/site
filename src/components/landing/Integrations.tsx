import { Link, Database, Cloud, Zap, Shield, RefreshCw } from "lucide-react";

const integrations = [
  { icon: Database, name: "CRMs" },
  { icon: Cloud, name: "ERPs" },
  { icon: Link, name: "Anúncios" },
  { icon: Zap, name: "WhatsApp" },
  { icon: Shield, name: "Portais" },
  { icon: RefreshCw, name: "APIs" },
];

const Integrations = () => {
  return (
    <section className="py-24 relative overflow-hidden" id="features">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-glow opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              Integrações
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Os sistemas que você já usa,{" "}
              <span className="gradient-text">conectados à nossa IA</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Conectamos nossas IAs aos principais CRMs, ERPs, plataformas de anúncios 
              e portais do mercado. São mais de 50 integrações que mantêm sua operação 
              fluida, sem retrabalho e com dados sempre atualizados.
            </p>

            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold gradient-text">+50</div>
              <div className="text-muted-foreground">
                integrações<br />disponíveis
              </div>
            </div>
          </div>

          {/* Integration Icons Grid */}
          <div className="relative">
            <div className="grid grid-cols-3 gap-4">
              {integrations.map((integration, index) => (
                <div
                  key={index}
                  className="group aspect-square flex flex-col items-center justify-center rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:card-glow"
                >
                  <integration.icon className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors mb-2" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {integration.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Connecting Lines (Visual) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-dashed border-primary/20 rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-dashed border-primary/10 rounded-full pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
