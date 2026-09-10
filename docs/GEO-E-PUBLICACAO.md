# GEO, conteúdo e publicação

## O que mudou

O objetivo é tornar a oferta da PIPADriven mais compreensível para compradores, buscadores e mecanismos que recuperam páginas para responder perguntas.

- Identidade em preto e laranja PIPA, Montserrat hospedada localmente e imagem arquitetônica ilustrativa.
- Home com proposta clara, seis frentes, explicação dos dois cenários comerciais e chamadas de contato.
- Preservação dos quatro endereços de soluções existentes.
- Novas páginas para rede de parceiros e gestão de mídia.
- Explicação institucional e dois artigos originais baseados na visão de produto fornecida.
- Conteúdo, títulos, descrições e dados estruturados alinhados por página.
- HTML completo gerado no build; FAQs incluídas no HTML e disponíveis na interface.
- Sitemap e índice `llms.txt` gerados pela mesma lista de rotas.
- Página 404 com `noindex`, contatos utilizáveis e ausência dos links sem destino da versão anterior.
- Imagem social e favicons originais preservados.

Os percentuais de melhoria, volumes de atendimento e VGV presentes no site anterior não foram reapresentados como prova nesta versão. O material recebido não traz metodologia, período ou validação desses indicadores. Eles podem voltar como um case documentado, com identificação do contexto e autorização de uso.

O documento da rede é uma nota de arquitetura com exemplos ilustrativos e implementação em etapas. Por isso, a nova página informa que disponibilidade, reservas, simulações e alçadas dependem das integrações e regras do projeto. A conversa da Central Aurora está identificada como exemplo. Não foram criados depoimentos, clientes, preços ou garantias de resultado.

## Por que esta abordagem

A orientação do Google mantém conteúdo útil, estrutura acessível e fundamentos de SEO como base para descoberta em experiências com IA. Não existe uma marcação especial que garanta recomendações. O próprio Google informa que cumprir os requisitos não garante rastreamento, indexação ou exibição.

A documentação da OpenAI distingue o OAI-SearchBot, usado na busca do ChatGPT, do GPTBot, relacionado a treinamento. O acesso de busca deve ser verificado no robots.txt e na infraestrutura. A política de permissão que já existia no projeto foi mantida.

Os dados estruturados descrevem informações presentes nas páginas. FAQs, artigos e serviços não contêm avaliações, preços ou resultados inventados. A presença de FAQPage não deve ser interpretada como garantia de um resultado enriquecido.

O `llms.txt` é um índice complementar. Não é a base da estratégia e não é um mecanismo que obrigue modelos a citar ou recomendar a PIPA.

Aplicação ao caso PIPA: as páginas foram organizadas por necessidades reais da incorporadora, com definição, público, funcionamento, limites de implantação e perguntas frequentes. Os artigos aprofundam a visão de operação que está no material fornecido.

## Após publicar no domínio atual

1. Garanta uma versão canônica do domínio: o projeto usa `https://pipadriven.com.br`. Configure o redirecionamento da versão `www` para essa versão na infraestrutura, caso ainda não exista.
2. Confira o acesso público a `/sitemap.xml`, `/robots.txt`, `/llms.txt` e a uma solução. Confirme que cada arquivo retorna o tipo correto e não a home.
3. Informe o sitemap nas ferramentas de webmaster que a PIPA utiliza. Faça inspeção da home, da rede de parceiros e das páginas de soluções.
4. Verifique se o firewall ou proteção contra bots não bloqueia os rastreadores pretendidos. O robots.txt não configura o firewall.
5. Faça um contato de teste e confira nome, telefone, empresa e solução no destino do formulário.
6. No GTM, confira os eventos `whatsapp_click`, `lead_form_submit` e `pipa_page_view`. Evite configurar mais de uma tag para contar a mesma navegação.
7. Revise os dados institucionais e o aviso de privacidade de acordo com as práticas efetivas da empresa. O texto não declara certificação ou conformidade jurídica automática.
8. Mantenha `datePublished` e `dateModified` dos artigos coerentes com a publicação real. A data inicial desta entrega é 10/09/2026.

## Uma rotina simples de medição

O acompanhamento proposto para a PIPA combina:

- Impressões e cliques orgânicos das páginas de soluções.
- Sessões referidas por ferramentas de IA, quando a origem estiver disponível.
- Cliques em WhatsApp e contatos recebidos por página e solução.
- Uma pequena lista de perguntas de descoberta repetidas periodicamente, registrando ferramenta, data, presença da PIPA e página citada.

Exemplos de perguntas para observação: “Como automatizar a pré-venda de uma incorporadora no WhatsApp?”, “Como gerir uma rede de corretores parceiros?”, “Como conectar mídia paga ao atendimento imobiliário?” e “Quais indicadores acompanhar entre lead e visita ao estande?”.

Essas observações não são um ranking fixo: as respostas variam com contexto e ferramenta. A leitura comercial relevante é se a descoberta traz contatos qualificados.

A próxima evolução editorial recomendada é publicar evidência própria: um caso validado, o método de um estudo de lead oculto ou uma análise assinada da operação. A evidência deve existir antes da promessa.

## Validações desta entrega

O comando `npm run check` confere tipos, as 12 rotas, referências locais, títulos, canonicals, JSON-LD, presença das FAQs e o fluxo de envio com transporte simulado. O build também exige um H1 por página e conteúdo pré-renderizado.

A validação não inclui um envio real ao n8n, a configuração privada do GTM, o ambiente Docker da hospedagem ou ensaios em navegadores e dispositivos. Esses pontos devem ser conferidos no ambiente em que o site será publicado.

## Fontes oficiais consultadas

- Google Search Central — [Otimização para experiências generativas](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).
- Google Search Central — [Recursos de IA e seu site](https://developers.google.com/search/docs/appearance/ai-features).
- Google Search Central — [Diretrizes de dados estruturados](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).
- OpenAI — [Rastreadores](https://developers.openai.com/api/docs/bots).
- ANPD — [Guia orientativo sobre cookies](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-cookies-e-protecao-de-dados-pessoais.pdf).

## Ativos

Os logotipos, os favicons e a imagem social vieram do projeto fornecido. A imagem arquitetônica de abertura é uma ilustração gerada para esta versão, sem representar um empreendimento específico. A fonte Montserrat é distribuída sob SIL Open Font License 1.1; a licença acompanha `public/fonts`.
