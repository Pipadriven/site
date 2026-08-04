import { useState } from "react";
import { Play } from "lucide-react";
import sebraeStartupsLogo from "@/assets/logo-sebrae-startups.jpg";
import linkSchoolLogo from "@/assets/logo-link-school.jpg";

const credentials = [
  {
    title: "Sebrae for Startups",
    logo: "SEBRAE",
    description:
      "Selecionados para um programa nacional voltado ao desenvolvimento de startups e empresas inovadoras, com foco em validação de modelo, estratégia e crescimento.",
    highlights: [
      "Processo seletivo e validação institucional",
      "Mentorias estratégicas",
      "Evolução de proposta de valor e modelo comercial",
      "Conexão com ecossistema de inovação",
    ],
  },
  {
    title: "Link School of Business",
    logo: "LINK",
    description:
      "Convidados para iniciativas de alto nível em negócios, estratégia e crescimento, conectadas a founders, executivos e mercado de investimento.",
    highlights: [
      "Programas e eventos estratégicos",
      "Discussões sobre crescimento e fundraising",
      "Conexão com investidores e founders",
      "Reconhecimento público do nosso modelo",
    ],
  },
];

const YOUTUBE_SHORT_ID = "Tu37KBsziFU";

const getYouTubeEmbedSrc = () => {
  const origin = typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : "";

  return `https://www.youtube-nocookie.com/embed/${YOUTUBE_SHORT_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1${origin ? `&origin=${origin}` : ""}`;
};

const Logos = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Reconhecida</span> por instituições
            referência em inovação e empreendedorismo
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Participação em programas seletivos que validam nossa visão, método
            e capacidade de execução.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {credentials.map((credential, index) => (
            <div
              key={index}
              className="group p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 relative"
            >
              {/* Logo - positioned top right on desktop, below title on mobile */}
              <div className="flex flex-col-reverse md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <h3 className="text-xl md:text-2xl font-bold text-foreground">
                  {credential.title}
                </h3>
                <img 
                  src={index === 0 ? sebraeStartupsLogo : linkSchoolLogo} 
                  alt={credential.title} 
                  className="h-10 md:h-12 w-auto object-contain shrink-0"
                />
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {credential.description}
              </p>

              {/* Highlights */}
              <ul className="space-y-2">
                {credential.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-muted-foreground text-sm"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Video Highlight Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Video Embed */}
          <div className="w-full max-w-[320px] mx-auto lg:mx-0">
            <div className="relative rounded-2xl bg-card border border-border overflow-hidden">
              <div className="relative w-full aspect-[9/16] min-h-[520px]">
                {isPlaying ? (
                  <iframe
                    src={getYouTubeEmbedSrc()}
                    title="Depoimento Link School of Business"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 w-full h-full text-left"
                    aria-label="Assistir vídeo"
                  >
                    <img
                      src={`https://i.ytimg.com/vi/${YOUTUBE_SHORT_ID}/hqdefault.jpg`}
                      alt="Prévia do vídeo: Depoimento Link School of Business"
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-background/10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center hover:bg-primary/20 transition-colors">
                        <Play className="w-6 h-6 text-primary ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        Assistir vídeo
                      </span>
                    </div>
                  </button>
                )}
              </div>
            </div>

            <a
              href={`https://youtube.com/shorts/${YOUTUBE_SHORT_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Abrir no YouTube ↗
            </a>
          </div>

          {/* Video Description */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Reconhecimento direto do ecossistema
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Depoimento do coordenador da Link School of Business sobre a
              PIPADriven e nossa aplicação prática de tecnologia em um mercado
              tradicional.
            </p>

            {/* Quote */}
            <blockquote className="relative pl-6 border-l-2 border-primary">
              <p className="text-foreground italic leading-relaxed">
                "A PIPADriven se destaca pela clareza de problema, solidez de
                modelo e aplicação prática de tecnologia em um mercado
                tradicional."
              </p>
              <footer className="mt-4 text-sm text-muted-foreground">
                — Mauro Pagano, Coordenador e Mentor de Negócios - Link School of Business
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Logos;
