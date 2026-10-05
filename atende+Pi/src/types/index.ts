export interface BusinessProfile {
  id: string;
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
  avatarIcon?: string;
  accentColor?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  source?: 'gemini-3.8-flash' | 'fallback-knowledge-base';
  isHelpful?: boolean | null;
}

export type ScreenTab = 'home' | 'chat' | 'contact';

export interface QuickFaq {
  icon: string;
  label: string;
  question: string;
  category?: string;
}
