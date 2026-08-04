# ---------- Stage 1: build ----------
FROM node:22-alpine AS builder

WORKDIR /app

# ATENÇÃO: no Vite as variáveis VITE_* são embutidas no bundle em TEMPO DE BUILD.
# Por isso precisam chegar aqui como ARG — configurar só no painel do EasyPanel
# NÃO funciona, o site sobe e o formulário falha silenciosamente.
ARG VITE_LEAD_WEBHOOK_URL
ENV VITE_LEAD_WEBHOOK_URL=$VITE_LEAD_WEBHOOK_URL

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Falha o build cedo se a variável não foi passada
RUN test -n "$VITE_LEAD_WEBHOOK_URL" \
    || (echo "ERRO: build-arg VITE_LEAD_WEBHOOK_URL nao foi informado" && exit 1)

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
