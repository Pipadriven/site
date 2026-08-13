# ---------- Stage 1: build ----------
FROM node:22-alpine AS builder

WORKDIR /app

# ---- Chromium para a pré-renderização ----
# O prerender precisa de um navegador real. Instalamos o Chromium do Alpine em
# vez de deixar o Playwright baixar o dele: o binário do Playwright é glibc e
# NÃO roda em Alpine (musl) — daria "Executable doesn't exist" no build.
# Este stage é descartado: a imagem final é só nginx + dist, sem Chromium.
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      font-noto \
      ttf-freefont

# Impede o postinstall do Playwright de baixar navegador (~150MB inúteis aqui).
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
# Caminho lido por prerender.mjs.
ENV PRERENDER_CHROMIUM=/usr/bin/chromium-browser

# ATENÇÃO: no Vite as variáveis VITE_* são embutidas no bundle em TEMPO DE BUILD.
# Por isso precisam chegar aqui como ARG — configurar só no painel do EasyPanel
# NÃO funciona, o site sobe e o formulário falha silenciosamente.
#
# O valor default existe para o build não produzir um site com formulário morto
# caso alguém esqueça o build-arg no EasyPanel. Não é segredo: no Vite toda
# variável VITE_* vai para dentro do bundle que o navegador baixa, então esta
# URL já é pública hoje. Para trocar de webhook, passe o build-arg — ele vence
# o default.
ARG VITE_LEAD_WEBHOOK_URL="https://pipadriven-n8n-webhook.5kksqf.easypanel.host/webhook/lead-site"
ENV VITE_LEAD_WEBHOOK_URL=$VITE_LEAD_WEBHOOK_URL

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

# ---------- Stage 2: serve ----------
FROM nginx:1.27-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
