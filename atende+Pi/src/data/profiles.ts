import { BusinessProfile, QuickFaq } from '../types';

export const DEFAULT_PROFILES: BusinessProfile[] = [
  {
    id: 'petshop-latido-feliz',
    name: 'PetShop Latido Feliz',
    cnpj: '45.123.456/0001-89',
    category: 'Pet Shop & Cuidados Veterinários',
    address: 'Rua das Flores, 123, Centro',
    hours: 'Segunda a Sexta, das 08h às 18h. Sábados, das 08h às 12h.',
    services: [
      'Banho e tosa (R$ 50)',
      'Consulta veterinária (R$ 120)',
      'Vacinação (V8, V10, Antirrábica)',
      'Hidratação e tosa higiênica',
      'Táxi Dog (Leva e traz)'
    ],
    products: [
      'Rações premium e super premium para cães e gatos',
      'Brinquedos e mordedores antiestresse',
      'Acessórios (coleiras, guias, caminhas)',
      'Medicamentos e antipulgas'
    ],
    phone: '(19) 99999-9999',
    whatsapp: '5519999999999',
    email: 'contato@latidofeliz.com.br',
    pixKey: '45.123.456/0001-89',
    avatarIcon: '🐾',
    accentColor: 'emerald',
    customRules: [
      'Responda apenas com base nas informações fornecidas.',
      'Se o cliente perguntar algo fora do escopo do pet shop, responda educadamente que não possui essa informação e sugira entrar em contato pelo telefone (19) 99999-9999.',
      'Seja sucinto e use formatação limpa (tópicos quando necessário).'
    ]
  },
  {
    id: 'oficina-autotech',
    name: 'Oficina AutoTech Mecânica',
    cnpj: '28.987.654/0001-32',
    category: 'Centro Automotivo & Reparos',
    address: 'Av. Industrial, 450, Distrito Norte',
    hours: 'Segunda a Sexta, das 07h30 às 18h00. Sábados, das 08h às 13h.',
    services: [
      'Troca de óleo e filtros (a partir de R$ 90)',
      'Alinhamento 3D e balanceamento (R$ 80)',
      'Revisão preventiva de freios e suspensão',
      'Diagnóstico eletrônico via scanner (R$ 100)',
      'Higienização de ar-condicionado'
    ],
    products: [
      'Baterias automotivas de 60Ah e 70Ah',
      'Palhetas de limpador de parabrisa',
      'Óleos sintéticos e aditivos homologados',
      'Lâmpadas automotivas LED e halógenas'
    ],
    phone: '(19) 98888-7777',
    whatsapp: '5519988887777',
    email: 'atendimento@autotechmecanica.com.br',
    pixKey: '28.987.654/0001-32',
    avatarIcon: '🔧',
    accentColor: 'blue',
    customRules: [
      'Responda apenas com base nas informações fornecidas da oficina mecânica.',
      'Caso a dúvida envolva marcas fora do escopo ou orçamentos sob medida de motor, instrua o cliente a enviar fotos do veículo pelo WhatsApp.',
      'Seja técnico porém acessível e cordial.'
    ]
  },
  {
    id: 'barbearia-estilo',
    name: 'Barbearia Vintage & Estilo',
    cnpj: '33.456.789/0001-15',
    category: 'Estética Masculina & Bem-Estar',
    address: 'Rua Coronel Silva, 88, Jardim Paulista',
    hours: 'Terça a Sábado, das 09h às 20h. Domingos e Segundas: Fechado.',
    services: [
      'Corte de cabelo clássico/degradê (R$ 45)',
      'Barba com toalha quente e navalha (R$ 40)',
      'Combo Cabelo + Barba (R$ 75)',
      'Camuflagem de fios brancos e sobrancelha',
      'Lavagem e hidratação capilar'
    ],
    products: [
      'Pomadas modeladoras matte e efeito brilho',
      'Óleos e balms hidratantes para barba',
      'Shampoos mentolados antiqueda',
      'Perfumes importados e pós-barba artesanal'
    ],
    phone: '(19) 97777-6666',
    whatsapp: '5519977776666',
    email: 'agendamento@barbeariaestilo.com.br',
    pixKey: '33.456.789/0001-15',
    avatarIcon: '💈',
    accentColor: 'amber',
    customRules: [
      'Responda com agilidade sobre horários de agendamento e valores de serviços da barbearia.',
      'Se perguntado sobre atendimento aos domingos ou segundas, reforce educadamente que o estabelecimento fica fechado.',
      'Use tom moderno, descontraído e educado.'
    ]
  }
];

export const QUICK_FAQS: QuickFaq[] = [
  {
    icon: 'Clock',
    label: 'Qual o horário de funcionamento?',
    question: 'Qual o horário de funcionamento?',
    category: 'Horários'
  },
  {
    icon: 'MapPin',
    label: 'Onde vocês ficam?',
    question: 'Onde vocês ficam localizados?',
    category: 'Localização'
  },
  {
    icon: 'Scissors',
    label: 'Quais serviços oferecem?',
    question: 'Quais serviços vocês oferecem e quais são os valores?',
    category: 'Serviços'
  },
  {
    icon: 'ShoppingBag',
    label: 'Quais produtos têm?',
    question: 'Quais produtos vocês têm disponíveis no estabelecimento?',
    category: 'Produtos'
  },
  {
    icon: 'PhoneCall',
    label: 'Falar com atendente humano',
    question: 'Como faço para falar com um atendente humano pelo WhatsApp ou telefone?',
    category: 'Contato'
  },
  {
    icon: 'FileText',
    label: 'Dados do CNPJ da empresa',
    question: 'Qual é o CNPJ e a situação cadastral da empresa parceira?',
    category: 'Institucional'
  }
];
