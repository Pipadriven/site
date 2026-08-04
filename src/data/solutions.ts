import { MessageSquare, Users, UserCheck, BarChart3, type LucideIcon } from "lucide-react";

export type Solution = {
  slug: string;
  icon: LucideIcon;
  name: string;
  title: string;
  description: string;
  features: string[];
  color: string;
  longDescription: string;
  benefits: { title: string; description: string }[];
  useCases: string[];
};

export const solutions: Solution[] = [
  {
    slug: "captacao-inteligente",
    icon: MessageSquare,
    name: "ACQUISITION",
    title: "Captação Inteligente",
    description:
      "A IA que capta, qualifica e prepara seus leads para a compra. Atendimento rápido, humanizado e alinhado ao tom de voz da sua marca.",
    features: [
      "Captura e resposta imediata de leads",
      "Condução estruturada de conversas",
      "Priorização inteligente de oportunidades",
      "Roteamento automático para corretores",
      "Integração nativa com CRM",
      "Organização do funil em tempo real",
      "Enriquecimento contínuo de dados",
    ],
    color: "from-primary/20 to-primary/5",
    longDescription:
      "A Captação Inteligente da PIPADriven responde cada lead em segundos, conduz a conversa de forma estruturada e entrega ao time comercial apenas oportunidades qualificadas, prontas para avançar no funil. Transformando cada interação em dados que organizam, qualificam e priorizam sua operação comercial.",
    benefits: [
      {
        title: "Resposta em segundos",
        description:
          "Cada lead é atendido em segundos, aumentando a taxa de conexão e evitando que oportunidades esfriem.",
      },
      {
        title: "Qualificação inteligente",
        description:
          "A IA identifica e prioriza leads com maior aderência ao perfil, intenção e potencial de compra, aumentando a eficiência comercial.",
      },
      {
        title: "Consistência comercial",
        description:
          "Todas as interações seguem uma lógica estruturada, garantindo padrão de atendimento.",
      },
      {
        title: "Dados que organizam a operação",
        description:
          "Cada interação é organizada e registrada, criando uma base confiável para análise e tomada de decisão.",
      },
    ],
    useCases: [
      "Leads recebidos fora do horário comercial",
      "Operações com alto volume de entrada simultânea",
      "Falta de padrão na abordagem comercial",
      "Leads sem contexto para o time de vendas",
      "Dificuldade de priorização de oportunidades",
      "Queda de engajamento ao longo da jornada",
      "Baixa visibilidade sobre o funil comercial",
    ],
  },
  {
    slug: "assistente-comercial",
    icon: Users,
    name: "SALES",
    title: "Assistente Comercial",
    description:
      "O assistente que transforma a rotina comercial em performance. Centraliza dados, automatiza tarefas e mantém todo o time produtivo.",
    features: [
      "Organização e atualização automática do pipeline",
      "Sugestão de próximas ações comerciais",
      "Priorização de oportunidades em tempo real",
      "Preparação de respostas com base no contexto do lead",
      "Acesso instantâneo a materiais e informações dos empreendimentos",
      "Registro automático do histórico de interações",
      "Padronização de comunicações comerciais",
    ],
    color: "from-primary/20 to-primary/5",
    longDescription:
      "O Assistente Comercial é o copiloto do seu time de vendas. Ele organiza o pipeline, sugere próximas ações e garante que nenhuma oportunidade fique parada, elevando a produtividade dos corretores no dia a dia.",
    benefits: [
      {
        title: "Controle do pipeline",
        description:
          "Pipeline sempre atualizado, com visibilidade em tempo real do andamento das oportunidades e da performance da operação, por etapa, corretor e canal.",
      },
      {
        title: "Apoio inteligente ao corretor",
        description:
          "Sugestões, direcionamentos em tempo real e cadências inteligentes com base no contexto do lead e da conversa.",
      },
      {
        title: "Automação operacional",
        description:
          "Redução de tarefas manuais ao longo da jornada, liberando o corretor para focar em negociação e fechamento. Atualização automática do pipeline, envio de materiais e organização do contexto do lead antes de cada interação.",
      },
      {
        title: "Padrão de atendimento elevado",
        description:
          "Interações mais consistentes e alinhadas, garantindo qualidade independente do corretor.",
      },
    ],
    useCases: [
      "Dificuldade de priorização de oportunidades",
      "Falta de direcionamento nas interações com leads",
      "Acesso disperso a informações comerciais",
      "Desorganização do pipeline ao longo da operação",
      "Oportunidades sem avanço claro",
      "Sobrecarga operacional do time comercial",
      "Inconsistência no padrão de atendimento",
    ],
  },
  {
    slug: "gestao-do-cliente",
    icon: UserCheck,
    name: "CUSTOMER",
    title: "Gestão do Cliente",
    description:
      "Fidelização e cuidado com o cliente após a compra. Suporte inteligente e contínuo que transforma o pós-venda em experiência.",
    features: [
      "Atualizações relevantes sobre o empreendimento",
      "Suporte técnico e operacional centralizado",
      "Relatórios de valorização do investimento",
      "Insights de mercado baseados em dados e notícias",
      "Estímulos para recompra e novas aquisições",
    ],
    color: "from-primary/20 to-primary/5",
    longDescription:
      "Fidelização e gestão ativa da base de clientes após a compra, transformando o pós-venda em uma alavanca de novas oportunidades.",
    benefits: [
      {
        title: "Comunicação proativa",
        description:
          "Atualizações de obra, prazos e documentos enviados automaticamente nos canais preferidos do cliente.",
      },
      {
        title: "Suporte técnico ágil",
        description:
          "Triagem inteligente das solicitações e direcionamento para o time correto, reduzindo o tempo de resposta.",
      },
      {
        title: "Experiência fidelizadora",
        description:
          "Relacionamento contínuo que aumenta indicações, recompra e a reputação da incorporadora.",
      },
    ],
    useCases: [
      "Demandas de suporte no pós-venda",
      "Comunicação contínua com a base de clientes",
      "Atualizações recorrentes sobre o andamento da obra",
      "Acesso a documentos e informações do empreendimento",
      "Dúvidas técnicas ao longo da jornada do cliente",
      "Perda de proximidade após a conversão",
      "Inconsistência na experiência do cliente",
    ],
  },
  {
    slug: "inteligencia-de-performance",
    icon: BarChart3,
    name: "ANALYTICS",
    title: "Inteligência de Performance",
    description:
      "Dados, insights e análises em tempo real para orientar decisões, eliminar gargalos e gerar previsibilidade de vendas.",
    features: [
      "Lead scoring e insights de comportamento",
      "Visão completa do funil",
      "Performance por canal e etapa",
      "Consolidação de dados da operação comercial",
      "Identificação de gargalos no funil",
      "Monitoramento de metas e resultados",
      "Comparação de performance ao longo do tempo",
    ],
    color: "from-primary/20 to-primary/5",
    longDescription:
      "A Inteligência de Performance transforma os dados gerados pelos demais agentes em insights acionáveis, permitindo decisões baseadas em evidências e previsibilidade real de vendas.",
    benefits: [
      {
        title: "Lead scoring preditivo",
        description:
          "Modelos que identificam quais leads têm maior probabilidade de conversão para priorização imediata.",
      },
      {
        title: "Visão 360º do funil",
        description:
          "Acompanhe cada etapa, desde o primeiro contato até a assinatura do contrato, em um só lugar.",
      },
      {
        title: "Decisões orientadas a dados",
        description:
          "Identifique gargalos, otimize investimentos em mídia e direcione esforços onde há maior retorno.",
      },
      {
        title: "Previsibilidade comercial",
        description:
          "Maior clareza sobre o que esperar e como ajustar a operação para atingir metas.",
      },
    ],
    useCases: [
      "Falta de clareza sobre onde estão os gargalos",
      "Dificuldade de entender a qualidade dos leads",
      "Baixa visibilidade sobre conversão por etapa",
      "Falta de controle sobre performance de canais",
      "Decisões baseadas em percepção, não em dados",
      "Dificuldade de prever resultados comerciais",
    ],
  },
];

export const getSolutionBySlug = (slug?: string) =>
  solutions.find((solution) => solution.slug === slug);