import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

// Validation schema for lead form
const leadSchema = z.object({
  name: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome muito longo"),
  company: z.string().trim().min(2, "Empresa deve ter pelo menos 2 caracteres").max(200, "Nome da empresa muito longo"),
  phone: z.string().trim().max(20, "Telefone muito longo").optional().or(z.literal("")),
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
  });
  const [website, setWebsite] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const location = useLocation();
  const [solution, setSolution] = useState<string | null>(null);

  // Captura a solução de origem e rola até o formulário
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const s = params.get("solution");
    if (s) {
      setSolution(s);
      requestAnimationFrame(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [location.search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    // Validate input with zod
    const validationResult = leadSchema.safeParse(formData);
    
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsLoading(false);
      toast({
        title: "Dados inválidos",
        description: "Por favor, corrija os erros no formulário.",
        variant: "destructive",
      });
      return;
    }

    try {
      const validatedData = validationResult.data;

      // Honeypot: se preenchido, finge sucesso sem enviar
      if (website.trim() !== "") {
        toast({
          title: "Mensagem enviada!",
          description: "Entraremos em contato em breve.",
        });
        setFormData({ name: "", company: "", phone: "" });
        return;
      }

      const webhookUrl = import.meta.env.VITE_LEAD_WEBHOOK_URL;

      // Falha explícita se a variável não foi definida no build
      if (!webhookUrl || !/^https:\/\//.test(webhookUrl)) {
        console.error(
          "[PIPADriven] VITE_LEAD_WEBHOOK_URL ausente ou inválida no build."
        );
        throw new Error("webhook not configured");
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            nome: validatedData.name,
            empresa: validatedData.company,
            telefone: validatedData.phone || "",
            origem: "site_formulario",
            solucao: solution,
            pagina: window.location.pathname,
            referrer: document.referrer || null,
            enviado_em: new Date().toISOString(),
          }),
        });

        if (!response.ok) throw new Error("request failed");
      } finally {
        clearTimeout(timeout);
      }

      // Espelha o rastreio do WhatsApp para permitir comparar os dois funis
      const w = window as Window & { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: "lead_form_submit",
        cta_origin: "contact_form",
        solution: solution ?? null,
        page_path: window.location.pathname,
      });

      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      });
      setFormData({ name: "", company: "", phone: "" });
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Não foi possível enviar sua mensagem. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    "Demonstração personalizada",
    "Análise do seu cenário atual",
    "Proposta sob medida",
    "Suporte dedicado",
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="contact">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-glow opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              Entre em Contato
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Pronto para dar o{" "}
              <span className="gradient-text">próximo passo?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Descubra como a inteligência artificial pode revolucionar seus 
              resultados. Agende uma demonstração gratuita e veja na prática o 
              poder dos nossos agentes.
            </p>

            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="relative">
            <div className="bg-card border border-border rounded-2xl p-8 card-glow">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Fale diretamente com um dos Sócios da PIPADriven
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot anti-spam */}
                <div className="absolute w-px h-px overflow-hidden opacity-0 -z-10 pointer-events-none" aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <div>
                    <Input
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      maxLength={100}
                      className={`bg-secondary border-border focus:border-primary ${errors.name ? 'border-destructive' : ''}`}
                    />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Input
                      placeholder="Empresa"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      required
                      maxLength={200}
                      className={`bg-secondary border-border focus:border-primary ${errors.company ? 'border-destructive' : ''}`}
                    />
                    {errors.company && <p className="text-xs text-destructive mt-1">{errors.company}</p>}
                  </div>
                  <div>
                    <Input
                      type="tel"
                      placeholder="Telefone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      maxLength={20}
                      className={`bg-secondary border-border focus:border-primary ${errors.phone ? 'border-destructive' : ''}`}
                    />
                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <Button variant="hero" size="lg" className="w-full group" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Solicitar demonstração
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Ao enviar, você concorda com nossa política de privacidade.
                </p>
              </form>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-primary/10 rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
