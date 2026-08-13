/**
 * SEO/GEO por rota — sem dependência nova.
 *
 * Por que não react-helmet-async: o hook abaixo escreve direto no DOM dentro de
 * um useEffect. Como o prerender roda o JavaScript antes de salvar o HTML, tudo
 * o que este hook escreve é capturado no arquivo final. E na navegação client-side
 * ele continua atualizando normalmente. Uma dependência a menos no bundle.
 *
 * Sem isso, as 5 rotas do site compartilham o mesmo <title> e a mesma
 * description da home — o que, depois do prerender, vira sinal de conteúdo
 * duplicado em vez de 5 páginas distintas.
 */
import { useEffect } from "react";

export const SITE_URL = "https://pipadriven.com.br";

type SeoInput = {
  title: string;
  description: string;
  /** Caminho da rota, começando com "/". Ex.: "/solucoes/captacao-inteligente" */
  path: string;
  /** JSON-LD específico da rota. O Organization global fica no index.html. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

/** Cria a tag se não existir e atualiza o conteúdo. Idempotente. */
function upsertMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * O bloco JSON-LD da rota é marcado com data-seo-route para poder ser removido
 * na navegação seguinte. Sem essa marcação, ao navegar entre soluções os blocos
 * se acumulariam e a página passaria a declarar schema de páginas que não são ela.
 */
function upsertJsonLd(data: SeoInput["jsonLd"]) {
  document.head
    .querySelectorAll('script[data-seo-route="true"]')
    .forEach((el) => el.remove());
  if (!data) return;
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-seo-route", "true");
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

export function useSeo({ title, description, path, jsonLd }: SeoInput) {
  useEffect(() => {
    const url = `${SITE_URL}${path === "/" ? "/" : path}`;

    document.title = title;
    upsertMeta("name", "description", description);
    upsertCanonical(url);

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);

    upsertJsonLd(jsonLd);
  }, [title, description, path, jsonLd]);
}
