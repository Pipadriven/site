import { Linkedin, Instagram, Youtube, Mail } from "lucide-react";
import logoImage from "@/assets/logo-pipa.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    solutions: [
      { label: "Captação", href: "#solutions" },
      { label: "Comercial", href: "#solutions" },
      { label: "Pós-Venda", href: "#solutions" },
      { label: "Performance", href: "#solutions" },
    ],
    company: [
      { label: "Sobre nós", href: "#about" },
      { label: "Blog", href: "#" },
      { label: "Carreiras", href: "#" },
      { label: "Contato", href: "#contact" },
    ],
    resources: [
      { label: "Central de Ajuda", href: "#" },
      { label: "Documentação", href: "#" },
      { label: "Integrações", href: "#features" },
      { label: "Status", href: "#" },
    ],
  };

  const social = [
    { icon: Instagram, href: "https://www.instagram.com/pipadriven/", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/@pipadriven", label: "YouTube" },
    { icon: Mail, href: "mailto:pipadriven@gmail.com", label: "Email" },
  ];

  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <img src={logoImage} alt="PIPADriven" className="h-12 w-auto" />
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Potencialize seus resultados com inteligência artificial. 
              Agentes que trabalham 24h por você.
            </p>
            <div className="flex gap-3">
              {social.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  aria-label={item.label}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Soluções</h4>
            <ul className="space-y-3">
              {links.solutions.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Empresa</h4>
            <ul className="space-y-3">
              {links.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Recursos</h4>
            <ul className="space-y-3">
              {links.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} PIPADriven. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
