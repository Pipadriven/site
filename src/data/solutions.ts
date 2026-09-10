import { MessageSquare, Users, Megaphone, Zap, BarChart3, Heart, type LucideIcon } from "lucide-react";
export type Solution = {
slug: string; name: string; title: string; group: string; headline: string; description: string; longDescription: string; audience: string; note?: string; features: string[]; benefits: {title:string; description:string}[]; useCases:string[]; steps:{title:string; text:string}[]; faq:{pergunta:string; resposta:string}[]; icon:LucideIcon; color:string;
};
const content = [
  {
    "slug": "captacao-inteligente",
    "name": "PRÉ-VENDAS",
    "title": "Pré-vendas com IA",
    "group": "Captação e atendimento",
    "headline": "O interesse chega. A conversa começa.",
    "description": "Atendimento no WhatsApp, qualificação e follow-up para o lead avançar até a conversa com o corretor.",
    "longDescription": "A pré-venda com IA da PIPADriven atende os leads gerados pela incorporadora no WhatsApp, entende o interesse de compra e organiza as informações para o time comercial. A conversa considera o empreendimento, o perfil do comprador e as regras de atendimento da operação. O corretor recebe contexto para conduzir a visita e a negociação.",
    "audience": "Incorporadoras com leads de anúncios, portais, formulários ou WhatsApp que precisam dar continuidade ao atendimento.",
    "features": [
      "Primeiro atendimento no WhatsApp",
      "Qualificação por perfil, interesse e momento",
      "Follow-ups conforme a jornada",
      "Distribuição com regras comerciais",
      "Histórico e contexto no CRM"
    ],
    "benefits": [
      {
        "title": "Conversa desde a entrada",
        "description": "O atendimento inicia a jornada e reduz a dependência da disponibilidade imediata de um vendedor, inclusive fora do expediente."
      },
      {
        "title": "Qualificação com contexto",
        "description": "Entenda tipologia, região, intenção, faixa de investimento e prazo para reconhecer o momento de compra."
      },
      {
        "title": "Continuidade no relacionamento",
        "description": "Cadências retomam conversas de acordo com o interesse e as respostas do lead, com regras para interromper contatos."
      },
      {
        "title": "Passagem organizada",
        "description": "O corretor recebe histórico e informações relevantes. O encaminhamento segue critérios definidos com a incorporadora."
      }
    ],
    "useCases": [
      "Leads sem primeiro retorno",
      "Atendimento fora do horário comercial",
      "Contatos que esfriam sem follow-up",
      "Leads repassados sem contexto"
    ],
    "steps": [
      {
        "title": "Receber",
        "text": "O lead entra com a origem identificada."
      },
      {
        "title": "Entender",
        "text": "A IA conversa e organiza perfil e interesse."
      },
      {
        "title": "Conectar",
        "text": "O corretor assume com contexto e um próximo passo."
      }
    ],
    "faq": [
      {
        "pergunta": "A IA substitui o corretor?",
        "resposta": "A IA apoia a etapa de pré-vendas. A construção de confiança, a visita, a negociação e o fechamento continuam com os profissionais da operação."
      },
      {
        "pergunta": "O atendimento é igual para todos os empreendimentos?",
        "resposta": "O conteúdo, a qualificação e os encaminhamentos são configurados a partir dos materiais, do público e das regras comerciais de cada empreendimento."
      },
      {
        "pergunta": "Como o lead chega ao CRM?",
        "resposta": "A integração registra os dados e eventos previstos no projeto. Campos, permissões e compatibilidade são validados antes da implantação."
      }
    ]
  },
  {
    "slug": "rede-de-parceiros",
    "name": "REDE DE PARCEIROS",
    "title": "Gestão da rede de parceiros",
    "group": "Operação comercial",
    "headline": "Mais apoio ao corretor. Mais visão para a incorporadora.",
    "description": "Um canal de apoio no WhatsApp que transforma a rotina dos parceiros em informação para a gestão comercial.",
    "longDescription": "A gestão da rede de parceiros da PIPADriven organiza o apoio a corretores e imobiliárias em um canal de WhatsApp da incorporadora. Pedidos de materiais, consultas e conversas comerciais geram registros que ajudam o gestor a entender a atividade da rede. O parceiro encontra suporte no canal que já usa; a incorporadora ganha contexto para orientar o relacionamento. Comprador, parceiro e gestor têm fluxos separados, conectados ao mesmo núcleo de informações.",
    "audience": "Incorporadoras que vendem por corretores parceiros e imobiliárias, com ou sem investimento em mídia própria.",
    "note": "A implantação acontece por etapas. Disponibilidade, reservas, simulações e aprovações dependem dos dados, das integrações e das regras comerciais validadas para cada projeto.",
    "features": [
      "Apoio ao parceiro no WhatsApp",
      "Materiais e informações do empreendimento",
      "Registro de atividade e interesse da rede",
      "Contexto e alçadas no WhatsApp do gestor",
      "Evolução para reservas e alçadas conforme o projeto"
    ],
    "benefits": [
      {
        "title": "Um canal que ajuda a vender",
        "description": "O parceiro consulta informações e solicita apoio na conversa. O valor começa pela utilidade do canal na rotina comercial."
      },
      {
        "title": "Conversas que geram visibilidade",
        "description": "Consultas, interesses e pedidos se tornam registros. O gestor passa a diferenciar uma rede cadastrada de uma rede em atividade."
      },
      {
        "title": "Relacionamento com direção",
        "description": "Identifique parceiros que precisam de apoio, interesses recorrentes e oportunidades de treinamento ou reativação."
      },
      {
        "title": "Regras claras entre as partes",
        "description": "O canal do corretor é separado do atendimento ao comprador. Pedidos fora da política podem seguir com contexto ao WhatsApp do gestor. A integração, as alçadas e o registro da decisão são definidos no projeto."
      }
    ],
    "useCases": [
      "Gerente sobrecarregado com pedidos de tabela",
      "Baixa visibilidade da atividade dos parceiros",
      "Informações dispersas em conversas",
      "Uma rede grande, mas pouco ativada"
    ],
    "steps": [
      {
        "title": "Apoiar",
        "text": "O parceiro pede informações no WhatsApp."
      },
      {
        "title": "Organizar",
        "text": "A conversa gera atividade e contexto comercial."
      },
      {
        "title": "Orientar",
        "text": "O gestor identifica o que merece sua próxima ação."
      }
    ],
    "faq": [
      {
        "pergunta": "Funciona sem investimento em mídia paga?",
        "resposta": "Sim. Na operação com parceiros, a demanda vem da carteira dos corretores. O foco é apoiar a rede e acompanhar a evolução das oportunidades que ela traz."
      },
      {
        "pergunta": "A PIPA conversa com o cliente do corretor parceiro?",
        "resposta": "O desenho mantém o canal do parceiro separado do canal do comprador. A IA apoia o corretor; qualquer contato direto com o cliente da carteira precisa seguir uma regra previamente acordada entre as partes."
      },
      {
        "pergunta": "Reservas e descontos são automáticos?",
        "resposta": "Essas funções dependem de integração, disponibilidade confiável e regras comerciais. Uma reserva só pode ser confirmada quando houver registro efetivo no sistema responsável. Condições fora da política seguem para decisão humana."
      }
    ]
  },
  {
    "slug": "gestao-de-midia",
    "name": "MÍDIA E DEMANDA",
    "title": "Gestão de mídia e captação",
    "group": "Captação e atendimento",
    "headline": "Invista em demanda. Enxergue o que ela movimenta.",
    "description": "Campanhas conectadas ao atendimento e ao avanço comercial para olhar além do custo por lead.",
    "longDescription": "A gestão de mídia da PIPADriven conecta a captação digital ao processo comercial da incorporadora. O trabalho considera público, empreendimento, campanhas e pontos de conversão, acompanhando a evolução dos leads quando o registro comercial está disponível. As decisões podem considerar qualidade, visitas e oportunidades, além do volume de contatos.",
    "audience": "Incorporadoras que investem em mídia digital e querem aproximar decisões de marketing e vendas.",
    "features": [
      "Planejamento e gestão de campanhas",
      "Captação em Meta Ads e Google Ads",
      "Identificação de origem e campanha",
      "Conexão com a pré-venda",
      "Análise dos indicadores da jornada"
    ],
    "benefits": [
      {
        "title": "Estratégia por empreendimento",
        "description": "Públicos, mensagens e pontos de conversão definidos a partir do produto e da estratégia comercial."
      },
      {
        "title": "Origem preservada",
        "description": "A identificação da campanha acompanha o lead nos pontos integrados, relacionando investimento e avanço no funil."
      },
      {
        "title": "Aprendizado com o atendimento",
        "description": "Interesses, objeções e sinais de qualificação ajudam a interpretar a qualidade da demanda."
      },
      {
        "title": "Investimento com contexto",
        "description": "Com dados confiáveis de visita e venda, a análise pode avançar do CPL para o custo por visita e resultado por origem."
      }
    ],
    "useCases": [
      "Leads de mídia que não avançam",
      "Marketing e vendas olhando números diferentes",
      "Dificuldade de comparar campanhas",
      "Lançamentos com captação própria"
    ],
    "steps": [
      {
        "title": "Planejar",
        "text": "Definir público, oferta, canais e medição."
      },
      {
        "title": "Conectar",
        "text": "Levar o contato a um atendimento organizado."
      },
      {
        "title": "Ajustar",
        "text": "Usar os dados disponíveis para orientar campanhas."
      }
    ],
    "faq": [
      {
        "pergunta": "Preciso contratar mídia para usar a PIPA?",
        "resposta": "Não. A PIPADriven pode atuar no atendimento, na operação comercial ou na rede de parceiros. A gestão de mídia entra quando faz sentido para o cenário da incorporadora."
      },
      {
        "pergunta": "A PIPA pode trabalhar com a minha agência?",
        "resposta": "Sim. O projeto pode conectar as campanhas da agência ao atendimento e aos registros comerciais. Responsabilidades e acessos são alinhados no diagnóstico."
      },
      {
        "pergunta": "A verba de anúncios está incluída?",
        "resposta": "A verba de mídia e o escopo de gestão são definidos separadamente na proposta, conforme os empreendimentos, os canais e os objetivos da operação."
      }
    ]
  },
  {
    "slug": "assistente-comercial",
    "name": "ASSISTENTE COMERCIAL",
    "title": "Assistente comercial",
    "group": "Operação comercial",
    "headline": "Mais contexto para agir. Mais tempo para vender.",
    "description": "Informações, histórico e próximas ações para o time conduzir cada oportunidade com mais clareza.",
    "longDescription": "O Assistente Comercial da PIPADriven apoia corretores e equipes de vendas, reunindo contexto do lead, materiais e registros da jornada. A solução ajuda a organizar o acompanhamento das oportunidades e as tarefas de rotina, respeitando os fluxos da incorporadora e as integrações previstas no projeto.",
    "audience": "Equipes comerciais que precisam reduzir tarefas repetitivas e melhorar a continuidade do atendimento.",
    "features": [
      "Contexto antes do contato",
      "Priorização de oportunidades",
      "Sugestões de próximas ações",
      "Acesso a materiais comerciais",
      "Atualização de registros integrados"
    ],
    "benefits": [
      {
        "title": "Preparação para a conversa",
        "description": "Consulte o que o lead procura, o que já perguntou e o que ficou combinado antes de retomar o contato."
      },
      {
        "title": "Acompanhamento com direção",
        "description": "Organize o próximo passo a partir do momento da jornada e do histórico disponível."
      },
      {
        "title": "Informação à mão",
        "description": "Materiais aprovados do empreendimento ajudam a preparar respostas consistentes."
      },
      {
        "title": "Continuidade da operação",
        "description": "Registros nos sistemas integrados preservam o contexto quando o atendimento muda de responsável."
      }
    ],
    "useCases": [
      "Oportunidades paradas no pipeline",
      "Follow-up dependente da memória",
      "Informação espalhada em vários canais",
      "Passagens de atendimento sem histórico"
    ],
    "steps": [
      {
        "title": "Reunir",
        "text": "Organizar as informações que já existem."
      },
      {
        "title": "Priorizar",
        "text": "Identificar o que pede atenção comercial."
      },
      {
        "title": "Acompanhar",
        "text": "Conduzir e registrar o próximo passo."
      }
    ],
    "faq": [
      {
        "pergunta": "Qual é a diferença para a pré-venda com IA?",
        "resposta": "A pré-venda conversa com o lead de entrada. O assistente comercial apoia o profissional que conduz a oportunidade, com histórico, informação e organização da rotina."
      },
      {
        "pergunta": "Qual é a diferença para a gestão da rede?",
        "resposta": "O assistente apoia o acompanhamento das oportunidades pelo time de vendas. A solução de rede organiza o canal de apoio e a atividade de corretores e imobiliárias parceiras."
      },
      {
        "pergunta": "É necessário trocar de CRM?",
        "resposta": "O ponto de partida é avaliar o CRM e o processo existentes. Campos, eventos e possibilidades de integração são definidos no escopo da implantação."
      }
    ]
  },
  {
    "slug": "inteligencia-de-performance",
    "name": "INTELIGÊNCIA DE PERFORMANCE",
    "title": "Inteligência de performance",
    "group": "Gestão e relacionamento",
    "headline": "A próxima decisão começa no que acontece de verdade.",
    "description": "Indicadores de mídia, atendimento e parceiros conectados para identificar gargalos e orientar a gestão.",
    "longDescription": "A Inteligência de Performance da PIPADriven reúne os registros da operação comercial para apoiar decisões da incorporadora. A análise conecta origens, atendimentos, atividade de parceiros e etapas do funil, conforme os dados disponíveis e as integrações do projeto. O objetivo é entender onde a jornada avança, onde para e qual ação pode destravá-la.",
    "audience": "Diretores e gestores que precisam acompanhar a operação por canal, empreendimento e responsável.",
    "features": [
      "Indicadores por origem e empreendimento",
      "Tempo de resposta e avanço no funil",
      "Atividade e oportunidades da rede",
      "Visitas, propostas e vendas registradas",
      "Leitura de gargalos e próximas ações"
    ],
    "benefits": [
      {
        "title": "Um vocabulário comum",
        "description": "Defina com a equipe o que significa lead atendido, qualificado, visita realizada e venda confirmada."
      },
      {
        "title": "Leitura por etapa",
        "description": "Diferencie um problema de captação de uma falha no atendimento, no repasse ou na continuidade comercial."
      },
      {
        "title": "Visão da rede",
        "description": "Entenda quais parceiros interagem e onde surgem oportunidades ou necessidade de apoio."
      },
      {
        "title": "Gestão orientada à ação",
        "description": "Use o diagnóstico para ajustar uma campanha, retomar uma oportunidade, apoiar um corretor ou rever uma rotina."
      }
    ],
    "useCases": [
      "Relatórios que não orientam decisões",
      "Indicadores desconectados entre áreas",
      "Dificuldade de medir a atividade da rede",
      "Falta de contexto sobre perdas"
    ],
    "steps": [
      {
        "title": "Definir",
        "text": "Alinhar eventos, critérios e fontes."
      },
      {
        "title": "Acompanhar",
        "text": "Consolidar a jornada registrada."
      },
      {
        "title": "Decidir",
        "text": "Transformar o indicador em ação."
      }
    ],
    "faq": [
      {
        "pergunta": "É possível medir até a venda?",
        "resposta": "Sim, quando há registros confiáveis e a integração contempla esse evento. A atribuição depende da preservação da origem e da atualização das etapas comerciais."
      },
      {
        "pergunta": "A análise muda sem mídia própria?",
        "resposta": "Sim. A leitura prioriza atividade da rede, oportunidades por parceiro e evolução até visita, proposta e venda, conforme os eventos registrados."
      },
      {
        "pergunta": "Os indicadores garantem previsibilidade?",
        "resposta": "Indicadores consistentes melhoram a leitura da operação. Projeções dependem de histórico, qualidade dos dados e condições de mercado; não representam garantia de resultado."
      }
    ]
  },
  {
    "slug": "gestao-do-cliente",
    "name": "RELACIONAMENTO",
    "title": "Gestão do cliente e pós-venda",
    "group": "Gestão e relacionamento",
    "headline": "O contrato é uma etapa. O relacionamento continua.",
    "description": "Comunicação, suporte e acompanhamento para manter a proximidade com a base de clientes após a compra.",
    "longDescription": "A Gestão do Cliente da PIPADriven apoia o relacionamento da incorporadora com compradores após a venda. A solução organiza comunicações, informações do empreendimento e encaminhamentos de suporte a partir do escopo definido com a equipe. O histórico ajuda a manter a continuidade do atendimento e a reconhecer oportunidades de relacionamento, indicação e recompra.",
    "audience": "Incorporadoras que querem organizar o atendimento e a comunicação com a base de compradores.",
    "features": [
      "Comunicações sobre o empreendimento",
      "Materiais e informações aprovados",
      "Triagem e encaminhamento de solicitações",
      "Histórico do relacionamento",
      "Apoio à indicação e recompra"
    ],
    "benefits": [
      {
        "title": "Informação com consistência",
        "description": "Estruture comunicações a partir das atualizações aprovadas pela incorporadora."
      },
      {
        "title": "Solicitações bem encaminhadas",
        "description": "Organize a entrada de dúvidas e o direcionamento aos responsáveis técnicos ou operacionais."
      },
      {
        "title": "Histórico preservado",
        "description": "Consulte o contexto disponível para dar continuidade ao relacionamento."
      },
      {
        "title": "Proximidade ao longo do tempo",
        "description": "Planeje ações relevantes, considerando preferências de contato e o estágio de cada cliente."
      }
    ],
    "useCases": [
      "Dúvidas repetidas após a compra",
      "Comunicações sem padrão",
      "Demandas no setor errado",
      "Relacionamento interrompido após o contrato"
    ],
    "steps": [
      {
        "title": "Organizar",
        "text": "Definir conteúdos, canais e responsáveis."
      },
      {
        "title": "Acompanhar",
        "text": "Apoiar comunicação e atendimento."
      },
      {
        "title": "Relacionar",
        "text": "Manter contexto para próximos contatos."
      }
    ],
    "faq": [
      {
        "pergunta": "A solução envia atualizações de obra?",
        "resposta": "O projeto pode contemplar esse fluxo a partir das informações aprovadas pela incorporadora. Conteúdo, frequência e canal são definidos na implantação."
      },
      {
        "pergunta": "A IA resolve o suporte técnico?",
        "resposta": "A IA pode ajudar na triagem e nas orientações previstas na base de conhecimento. Demandas técnicas e decisões que exigem especialistas são encaminhadas aos responsáveis."
      },
      {
        "pergunta": "Posso começar por uma parte do pós-venda?",
        "resposta": "Sim. O diagnóstico identifica o fluxo prioritário e o escopo é definido conforme a estrutura e as necessidades da incorporadora."
      }
    ]
  }
];
const icons = [MessageSquare, Users, Megaphone, Zap, BarChart3, Heart];
export const solutions: Solution[] = content.map((s,i) => ({...s,icon:icons[i],color:"from-primary/20 to-primary/5"}));
export const getSolutionBySlug = (slug?: string) => solutions.find(s => s.slug === slug);
