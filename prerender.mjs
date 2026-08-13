#!/usr/bin/env node
/**
 * prerender.mjs — pré-renderização estática do site da PIPADriven.
 *
 * PROBLEMA
 * O site é uma SPA (Vite + React + react-router). O HTML servido é
 * `<div id="root"></div>` e todo o conteúdo só existe depois do JavaScript.
 * Crawlers de LLM leem a casca vazia — não há o que citar.
 *
 * O QUE FAZ
 * Sobe o dist local, abre cada rota num Chromium headless, espera o React
 * montar e grava o HTML renderizado em dist/<rota>/index.html.
 * Bot e humano recebem exatamente o mesmo HTML (nada de cloaking).
 *
 * USO
 *   npm run build         # vite build && node prerender.mjs
 *
 * VARIÁVEIS
 *   PRERENDER_CHROMIUM  caminho de um Chromium já instalado (usado no Docker,
 *                       onde instalamos via apk em vez de baixar pelo Playwright)
 */

import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Resolve o binário do Chromium.
 *
 * Local (macOS/Linux com glibc): retorna undefined e o Playwright usa o
 * navegador que ele mesmo baixou no `npm i`.
 *
 * Docker/Alpine: o binário do Playwright é glibc e NÃO roda em musl, por isso
 * instalamos o Chromium do sistema via apk. O nome do executável já mudou entre
 * versões do Alpine (`chromium-browser` virou `chromium`), então tentamos os
 * caminhos conhecidos em vez de fixar um — fixar é o que quebra o build meses
 * depois, quando a imagem base é atualizada.
 */
async function acharChromium() {
  const candidatos = [
    process.env.PRERENDER_CHROMIUM,
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
    "/usr/bin/google-chrome",
  ].filter(Boolean);

  for (const caminho of candidatos) {
    try {
      await access(caminho);
      return caminho;
    } catch {
      /* tenta o próximo */
    }
  }

  if (process.env.PRERENDER_CHROMIUM) {
    throw new Error(
      `PRERENDER_CHROMIUM aponta para "${process.env.PRERENDER_CHROMIUM}", que não existe. ` +
        `Tentei também: ${candidatos.slice(1).join(", ")}. ` +
        `No Alpine, instale com: apk add --no-cache chromium nss freetype harfbuzz ttf-freefont`
    );
  }
  return undefined; // deixa o Playwright usar o navegador dele
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "dist");
const PORT = 41234;

/**
 * As rotas de solução são dinâmicas (/solucoes/:slug), então a lista vem dos
 * slugs declarados em src/data/solutions.ts. Assim, adicionar uma solução nova
 * lá dentro já a inclui no prerender — ninguém precisa lembrar de editar aqui.
 */
async function descobrirRotas() {
  const fonte = await readFile(join(__dirname, "src/data/solutions.ts"), "utf-8");
  const slugs = [...fonte.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  if (slugs.length === 0) {
    throw new Error(
      "Nenhum slug encontrado em src/data/solutions.ts — o formato do arquivo mudou?"
    );
  }
  return ["/", ...slugs.map((s) => `/solucoes/${s}`)];
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript", ".mjs": "text/javascript",
  ".css": "text/css", ".json": "application/json",
  ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".woff": "font/woff", ".woff2": "font/woff2", ".txt": "text/plain", ".xml": "application/xml",
};

/**
 * O fallback serve sempre o template ORIGINAL guardado em memória.
 * Sem isso, a rota "/" já pré-renderizada vira o fallback das rotas seguintes
 * e o conteúdo da home vaza para dentro das páginas de solução.
 */
function subirServidor(template) {
  const server = createServer(async (req, res) => {
    const caminho = decodeURIComponent(req.url.split("?")[0]);
    if (extname(caminho)) {
      const arquivo = join(DIST, caminho);
      try {
        await access(arquivo);
        res.writeHead(200, { "Content-Type": MIME[extname(arquivo)] || "application/octet-stream" });
        return res.end(await readFile(arquivo));
      } catch {
        return res.writeHead(404).end("not found");
      }
    }
    res.writeHead(200, { "Content-Type": MIME[".html"] });
    res.end(template);
  });
  return new Promise((r) => server.listen(PORT, () => r(server)));
}

async function main() {
  const rotas = await descobrirRotas();

  const template = await readFile(join(DIST, "index.html"), "utf-8");
  if (template.includes("data-prerendered")) {
    console.error("ERRO: dist/index.html já está pré-renderizado. Rode `vite build` antes.");
    process.exit(1);
  }

  const executablePath = await acharChromium();
  console.log(`Chromium: ${executablePath ?? "o que veio com o Playwright"}`);

  const server = await subirServidor(template);

  let browser;
  try {
    browser = await chromium.launch({
      executablePath,
      // --no-sandbox é necessário rodando como root dentro do container.
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });
  } catch (err) {
    server.close();
    console.error(
      "\nNão consegui abrir o Chromium.\n" +
        "  Local: rode `npx playwright install chromium`.\n" +
        "  Docker/Alpine: `apk add --no-cache chromium` e defina PRERENDER_CHROMIUM.\n" +
        `  Detalhe: ${err.message.split("\n")[0]}\n`
    );
    process.exit(1);
  }
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (compatible; PipaPrerender/1.0; +https://pipadriven.com.br)",
    viewport: { width: 1280, height: 1000 },
  });

  /**
   * Bloqueia GTM e analytics durante o prerender.
   * Dois motivos: (1) o GTM injeta tags no <head> em runtime, que seriam
   * gravadas no HTML final e disparariam duas vezes no navegador do usuário;
   * (2) não faz sentido contabilizar pageview do robô de build.
   */
  await context.route("**/*", (route) => {
    const url = route.request().url();
    const bloqueado = [
      "googletagmanager.com",
      "google-analytics.com",
      "analytics.google.com",
      "connect.facebook.net",
      "clarity.ms",
    ].some((d) => url.includes(d));
    return bloqueado ? route.abort() : route.continue();
  });

  let ok = 0;
  const problemas = [];

  for (const rota of rotas) {
    const page = await context.newPage();
    const erros = [];
    page.on("pageerror", (e) => erros.push(e.message));
    try {
      await page.goto(`http://localhost:${PORT}${rota}`, {
        waitUntil: "networkidle",
        timeout: 45000,
      });
      await page.waitForFunction(
        () => (document.querySelector("#root")?.children.length ?? 0) > 0,
        { timeout: 20000 }
      );
      // Margem para o useEffect do useSeo escrever title/description/JSON-LD.
      await page.waitForTimeout(500);

      // Confere que a rota realmente ganhou metadado próprio.
      const meta = await page.evaluate(() => ({
        title: document.title,
        description:
          document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
        canonical:
          document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "",
        h1: document.querySelector("h1")?.textContent?.trim() ?? "",
        jsonLd: document.querySelectorAll('script[type="application/ld+json"]').length,
      }));

      let html = await page.content();

      /**
       * Remove as tags injetadas em runtime por GTM/analytics.
       * Bloquear a requisição não basta: o snippet inline do GTM cria o
       * <script src="...gtm.js"> e o insere no DOM antes de a rede ser
       * abortada, então a tag acaba gravada no arquivo. Se ficasse, o snippet
       * inline carregaria o GTM UMA VEZ e a tag gravada carregaria de NOVO —
       * pageview duplicado em toda visita.
       */
      html = html.replace(
        /<script[^>]*src="[^"]*(?:googletagmanager\.com|google-analytics\.com|analytics\.google\.com|connect\.facebook\.net|clarity\.ms)[^"]*"[^>]*>\s*<\/script>/gi,
        ""
      );

      html = html.replace("<html", `<html data-prerendered="${new Date().toISOString()}"`);

      const destino = rota === "/" ? DIST : join(DIST, rota);
      await mkdir(destino, { recursive: true });
      await writeFile(join(destino, "index.html"), html, "utf-8");

      const texto = html
        .replace(/<script[\s\S]*?<\/script>/g, "")
        .replace(/<style[\s\S]*?<\/style>/g, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      console.log(`  ok  ${rota}`);
      console.log(`      ${texto.length} chars · h1: "${meta.h1.slice(0, 60)}" · ${meta.jsonLd} bloco(s) JSON-LD`);

      if (texto.length < 800) problemas.push(`${rota}: só ${texto.length} chars de texto`);
      if (!meta.h1) problemas.push(`${rota}: sem <h1>`);
      if (!meta.description) problemas.push(`${rota}: sem meta description`);
      if (meta.canonical !== `https://pipadriven.com.br${rota === "/" ? "/" : rota}`)
        problemas.push(`${rota}: canonical errado (${meta.canonical})`);
      if (erros.length) problemas.push(`${rota}: erro de JS — ${erros[0]}`);
      ok++;
    } catch (err) {
      problemas.push(`${rota}: FALHOU — ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  console.log(`\n${ok}/${rotas.length} rotas pré-renderizadas.`);
  if (problemas.length) {
    console.error("\nProblemas encontrados:");
    problemas.forEach((p) => console.error(`  - ${p}`));
    // Falhar o build é proposital: melhor o deploy quebrar do que subir
    // silenciosamente um site que os crawlers não conseguem ler.
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`\nprerender falhou: ${err.message}\n`);
  process.exit(1);
});
