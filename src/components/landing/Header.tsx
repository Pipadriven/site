import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoImage from "@/assets/logo-pipa.png";
import { whatsappUrl, trackWhatsAppClick } from "@/lib/whatsapp";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * Os href são "/#secao" e não "#secao".
   *
   * Âncora relativa só funciona se a seção existir NA PÁGINA ATUAL. Nas quatro
   * rotas /solucoes/* não existe #solutions nem #faq, então esses links não
   * levavam a lugar nenhum — e agora que as 5 rotas são pré-renderizadas e
   * rastreadas, isso é link interno quebrado em 4 delas, na navegação principal.
   * Com a barra na frente, o link volta para a home e desce até a seção.
   *
   * O FAQ entrou no menu; Problema, Dados e Comparativo não. São seções que se
   * leem no fluxo da página, e um menu com 8 itens não destaca nenhum.
   */
  const navLinks = [
    { label: "Soluções", href: "/#solutions" },
    { label: "Sobre", href: "/#about" },
    { label: "Recursos", href: "/#features" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contato", href: "/#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      {/* Announcement Bar */}
      <div className="bg-primary/10 border-b border-primary/20 py-2">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm">
            <span className="text-primary font-semibold">Novidade!</span>
            <span className="text-muted-foreground ml-2">
              Potencialize seus resultados com inteligência artificial.
            </span>
            <a href="/#contact" className="text-primary hover:underline ml-2 font-medium">
              Saiba mais →
            </a>
          </p>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src={logoImage} alt="PIPADriven" className="h-14 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={whatsappUrl("header_desktop")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("header_desktop")}
            >
              <Button variant="default" size="sm">
                Agende uma Demo
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                <a
                  href={whatsappUrl("header_mobile")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                  onClick={() => {
                    trackWhatsAppClick("header_mobile");
                    setIsMenuOpen(false);
                  }}
                >
                  <Button variant="default" className="w-full">
                    Agende uma Demo
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
