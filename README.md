# PIPADriven — site renovado

Versão de entrega: 10 de setembro de 2026.

Site institucional em português com a identidade da PIPA, seis páginas de soluções, nova frente de gestão da rede de parceiros, apresentação institucional, dois conteúdos autorais e página de privacidade.

## Publicar pelo seu GitHub

1. Extraia o ZIP e abra a pasta `site-main`.
2. Leve o conteúdo dessa pasta para a raiz do repositório atual. O arquivo `package.json` deve ficar na raiz, junto de `Dockerfile`. Preserve os segredos e as configurações da hospedagem.
3. Faça o commit na branch usada pela sua hospedagem e execute o fluxo de publicação que você já utiliza.
4. Em uma hospedagem com Docker/EasyPanel, mantenha o `Dockerfile` da raiz como método de build. Ele instala as dependências, gera as páginas e publica pelo Nginx.
5. Depois de publicar, confira uma página de solução por acesso direto e confirme o recebimento de um contato de teste na sua automação.

O arquivo ZIP é a entrega do projeto; no repositório entram os arquivos extraídos.

## Rodar localmente

Requisito: Node.js 22 e npm.

```bash
npm ci
npm run dev
```

O servidor de desenvolvimento usa a porta indicada pelo Vite, originalmente 8080.

Para gerar e conferir a versão de publicação:

```bash
npm run build
npm run check
npm run preview
```

O build gera 12 páginas completas e uma página de erro 404 em `dist`. O texto, os links e os dados estruturados já estão no HTML. O JavaScript adiciona as interações, sem precisar produzir o conteúdo principal no navegador.

A pré-renderização agora acontece com React durante o build. Não exige Chromium, Playwright ou um serviço externo. As dependências e o lockfile do projeto original foram preservados.

## Hospedagem estática

A pasta `dist` também está incluída no ZIP. Para uma hospedagem que recebe arquivos prontos, publique o **conteúdo** de `dist` na raiz do site.

Mantenha a resolução das páginas `/solucoes/...` e `/conteudos/...` para seus respectivos arquivos `index.html`. O `nginx.conf` incluído já faz isso. Endereços inexistentes recebem HTTP 404; uma URL de arquivo ausente não recebe o HTML da home.

Abrir `dist/index.html` por duplo clique não reproduz uma hospedagem: as referências dos assets são absolutas. Use um servidor HTTP, como `npm run preview`, ou a sua hospedagem.

## Contato e medição preservados

| Item | Configuração |
| --- | --- |
| Domínio canônico | https://pipadriven.com.br |
| WhatsApp comercial | +55 47 99266-3388 |
| E-mail | pipadriven@gmail.com |
| Google Tag Manager | GTM-PGP7T657 |
| Variável pública do formulário | `VITE_LEAD_WEBHOOK_URL` |
| Integração de formulário | Endpoint de n8n existente no projeto original |

O endpoint original está mantido como padrão, também no Dockerfile. Se for trocá-lo, use `.env.example` como referência e configure a variável **no momento do build**. Refaça o build após alterar. Variáveis `VITE_*` ficam visíveis no navegador e não devem conter chaves secretas.

O formulário valida nome, empresa e telefone, encaminha os mesmos campos principais da integração original e só informa sucesso após resposta HTTP bem-sucedida. Há alternativa de WhatsApp em caso de erro. É preciso confirmar o recebimento real na automação após publicar: a entrega foi verificada com transporte simulado, sem gerar leads reais.

O GTM só é iniciado nos domínios oficiais e após aceitação dos cookies opcionais. Há recusa com a mesma visibilidade e possibilidade de rever a preferência. Revise as tags do seu container para garantir que respeitam o consentimento e os destinos configurados.

## Onde editar

| Conteúdo | Arquivo |
| --- | --- |
| Páginas, menus e seções | `src/components/PipaSite.tsx` |
| Soluções e FAQs de cada solução | `src/data/solutions.ts` |
| FAQ da home | `src/data/faq.ts` |
| Artigos | `src/data/articles.ts` |
| Metadados, schema e lista de rotas | `src/data/seo.ts` |
| Formulário | `src/components/landing/Contact.tsx` |
| Envio e validação de contatos | `src/lib/leads.ts` |
| WhatsApp | `src/lib/whatsapp.ts` |
| Consentimento e GTM | `src/components/CookiePreferences.tsx` |
| Identidade visual e responsividade | `src/index.css` |
| Geração de HTML e arquivos de descoberta | `prerender.mjs` |

Após editar qualquer conteúdo, execute `npm run build`. O sitemap e o `llms.txt` de publicação são gerados a partir das rotas e descrições do site. As cópias em `public` acompanham esta entrega; a versão usada na publicação é a gerada em `dist`.

Consulte `docs/GEO-E-PUBLICACAO.md` para o raciocínio de conteúdo, a medição e os próximos passos após colocar o novo site no ar.
