import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Google GenAI client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export interface BusinessProfile {
  name: string;
  cnpj: string;
  category: string;
  address: string;
  hours: string;
  services: string[];
  products: string[];
  phone: string;
  whatsapp: string;
  email: string;
  pixKey?: string;
  customRules?: string[];
}

const defaultProfile: BusinessProfile = {
  name: 'PetShop Latido Feliz',
  cnpj: '45.123.456/0001-89',
  category: 'Pet Shop & Clínica Veterinária',
  address: 'Rua das Flores, 123, Centro',
  hours: 'Segunda a Sexta, das 08h às 18h. Sábados, das 08h às 12h.',
  services: [
    'Banho e tosa (R$ 50)',
    'Consulta veterinária (R$ 120)',
    'Vacinação (V8, V10, Antirrábica)',
    'Hospedagem pet e creche diurna',
    'Tele-busca e entrega de pets'
  ],
  products: [
    'Rações premium e super premium para cães e gatos',
    'Brinquedos interativos e mordedores',
    'Acessórios (coleiras, guias, caminhas e caixas de transporte)',
    'Medicamentos veterinários e antipulgas/carrapatos'
  ],
  phone: '(19) 99999-9999',
  whatsapp: '19999999999',
  email: 'contato@latidofeliz.com.br',
  pixKey: '45.123.456/0001-89',
  customRules: [
    'Responda apenas com base nas informações fornecidas.',
    'Se o cliente perguntar algo fora do escopo do pet shop, responda educadamente que não possui essa informação e sugira entrar em contato pelo telefone (19) 99999-9999.',
    'Seja sucinto e use formatação limpa (tópicos quando necessário).'
  ]
};

// Healthcheck and profile endpoint
app.get('/api/business/profile', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    profile: defaultProfile,
    hasApiKey: Boolean(process.env.GEMINI_API_KEY)
  });
});

// Chat endpoint (Async HTTP POST)
app.post('/api/chat', async (req: Request, res: Response) => {
  const { message, history = [], businessProfile } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Mensagem inválida ou ausente.' });
  }

  const profile: BusinessProfile = businessProfile || defaultProfile;

  // Build specialized system instruction based on knowledge base
  const systemInstruction = `
Você é o assistente virtual do "${profile.name}". 
Seu papel é atender os clientes de forma educada, ágil e amigável.
Base de Conhecimento Oficial da Empresa:
- CNPJ: ${profile.cnpj} (Empresa parceira com cadastro ativo)
- Segmento: ${profile.category}
- Endereço: ${profile.address}
- Horário de Funcionamento: ${profile.hours}
- Serviços Disponíveis:
${profile.services.map(s => `  * ${s}`).join('\n')}
- Produtos Disponíveis:
${profile.products.map(p => `  * ${p}`).join('\n')}
- Telefone / WhatsApp de Contato Humano: ${profile.phone}
- E-mail: ${profile.email}

Regras Obrigatórias de Atendimento:
1. Responda apenas com base nas informações fornecidas nesta base de conhecimento.
2. Se o cliente perguntar algo fora do escopo de ${profile.name} (como receitas, futebol, conselhos médicos humanos, política, outros negócios), responda educadamente que não possui essa informação e sugira entrar em contato pelo telefone/WhatsApp ${profile.phone}.
3. Seja sucinto, acolhedor e use formatação limpa (use tópicos ou destaques em negrito quando listar valores ou horários).
4. Mantenha tom prestativo e profissional em Português do Brasil.
`.trim();

  // Try calling Gemini API via @google/genai SDK
  if (ai) {
    try {
      // Map conversation history
      const formattedContents = [];

      for (const item of history.slice(-6)) {
        if (item.sender === 'user') {
          formattedContents.push({
            role: 'user',
            parts: [{ text: item.text }]
          });
        } else if (item.sender === 'bot') {
          formattedContents.push({
            role: 'model',
            parts: [{ text: item.text }]
          });
        }
      }

      // Append current message
      formattedContents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.4,
          topP: 0.9,
        }
      });

      const replyText = response.text || 'Desculpe, não consegui processar a resposta no momento. Por favor, tente novamente.';

      return res.json({
        reply: replyText,
        source: 'gemini-3.8-flash',
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      console.error('Erro na chamada ao Gemini API:', err);
      // Fallback response with knowledge base reasoning if API key quota or transient error
      const fallbackReply = generateLocalSmartFallback(message, profile);
      return res.json({
        reply: fallbackReply,
        source: 'fallback-knowledge-base',
        note: 'Resposta gerada pela base de conhecimento local de contingência.',
        timestamp: new Date().toISOString()
      });
    }
  } else {
    // If no GEMINI_API_KEY environment variable is configured, supply intelligent local rule-based response
    const fallbackReply = generateLocalSmartFallback(message, profile);
    return res.json({
      reply: fallbackReply,
      source: 'fallback-knowledge-base',
      timestamp: new Date().toISOString()
    });
  }
});

function generateLocalSmartFallback(query: string, profile: BusinessProfile): string {
  const q = query.toLowerCase();

  if (q.includes('horário') || q.includes('hora') || q.includes('abre') || q.includes('fecha') || q.includes('funcionamento')) {
    return `Olá! Nosso horário de funcionamento é:\n\n⏰ **${profile.hours}**\n\nFicamos à disposição para receber você em nosso endereço: ${profile.address}!`;
  }

  if (q.includes('endereço') || q.includes('onde') || q.includes('localiz') || q.includes('fica') || q.includes('rua') || q.includes('bairro')) {
    return `Estamos localizados em:\n\n📍 **${profile.address}**\n\nVenha nos visitar ou se precisar de rotas detalhadas, fale conosco no WhatsApp **${profile.phone}**!`;
  }

  if (q.includes('serviço') || q.includes('banho') || q.includes('tosa') || q.includes('consulta') || q.includes('vacina') || q.includes('preço') || q.includes('valor')) {
    const servicesList = profile.services.map(s => `• ${s}`).join('\n');
    return `Conheça os nossos serviços oferecidos:\n\n${servicesList}\n\nPara agendamentos imediatos, você também pode nos acionar no WhatsApp: **${profile.phone}**.`;
  }

  if (q.includes('produto') || q.includes('ração') || q.includes('brinquedo') || q.includes('remédio') || q.includes('acessório')) {
    const productsList = profile.products.map(p => `• ${p}`).join('\n');
    return `Em nosso estabelecimento você encontra:\n\n${productsList}\n\nConsulte a disponibilidade de marcas e tamanhos pelo WhatsApp: **${profile.phone}**.`;
  }

  if (q.includes('contato') || q.includes('telefone') || q.includes('zap') || q.includes('whatsapp') || q.includes('falar com humano') || q.includes('atendente')) {
    return `Você pode falar diretamente com nossa equipe de atendimento humano através do canal:\n\n📞 Telefone/WhatsApp: **${profile.phone}**\n✉️ E-mail: ${profile.email}\n🏢 CNPJ: ${profile.cnpj}`;
  }

  if (q.includes('cnpj') || q.includes('empresa') || q.includes('cadastro') || q.includes('fiscal')) {
    return `Nossa empresa **${profile.name}** possui cadastro ativo e regular:\n\n📄 **CNPJ:** ${profile.cnpj}\n📍 **Local:** ${profile.address}\n\nEstamos sempre comprometidos com a transparência e excelência no atendimento.`;
  }

  // Out of scope check
  return `Olá! Sou o assistente virtual do **${profile.name}**. Não possuo informações detalhadas sobre esse assunto no momento.\n\nPara dúvidas específicas ou falar com nossa equipe humana, por favor entre em contato pelo telefone/WhatsApp **${profile.phone}** ou venha nos visitar em **${profile.address}**!`;
}

// Development or production static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[Atende+] Server listening on port ${port}`);
  });
}

startServer();
