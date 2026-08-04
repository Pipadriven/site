/**
 * Ponto único de configuração do WhatsApp comercial.
 * Trocar o número aqui atualiza o site inteiro.
 */

export const WHATSAPP_NUMBER = "5547992663388";

/** Origem do clique — usada para medir qual CTA converte melhor. */
export type WhatsAppOrigin =
  | "hero"
  | "header_desktop"
  | "header_mobile"
  | "solution_detail";

const MESSAGES: Record<WhatsAppOrigin, string> = {
  hero: "Olá! Gostaria de ver a PIPA na prática.",
  header_desktop: "Olá! Gostaria de agendar uma demonstração.",
  header_mobile: "Olá! Gostaria de agendar uma demonstração.",
  solution_detail: "Olá! Tenho interesse na solução de {solution}.",
};

/**
 * Monta a URL do WhatsApp com a mensagem já preenchida e codificada.
 * A codificação evita que acentos e espaços quebrem o link em
 * navegadores ou webviews mais restritivos.
 */
export function whatsappUrl(origin: WhatsAppOrigin, solution?: string): string {
  const text = MESSAGES[origin].replace("{solution}", solution ?? "");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Envia o clique para o dataLayer do GTM.
 * Sem isso, todo lead que chega pelo WhatsApp é invisível na medição.
 */
export function trackWhatsAppClick(
  origin: WhatsAppOrigin,
  solution?: string
): void {
  if (typeof window === "undefined") return;

  const w = window as Window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: "whatsapp_click",
    cta_origin: origin,
    solution: solution ?? null,
    page_path: window.location.pathname,
  });
}
