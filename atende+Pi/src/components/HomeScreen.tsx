import React from 'react';
import {
  MessageSquare,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  Phone,
  HelpCircle,
  Scissors,
  CheckCircle2,
  Store,
  ArrowUpRight
} from 'lucide-react';
import { BusinessProfile, ScreenTab } from '../types';
import { QUICK_FAQS } from '../data/profiles';

interface HomeScreenProps {
  profile: BusinessProfile;
  onNavigateToChat: (initialQuestion?: string) => void;
  onNavigateToTab: (tab: ScreenTab) => void;
  onOpenReport: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  profile,
  onNavigateToChat,
  onNavigateToTab,
  onOpenReport,
}) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 pb-24 text-slate-100 selection:bg-emerald-500">
      {/* Top Banner / Academic Extension Badge */}
      <div className="flex items-center justify-between bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-800/40 rounded-2xl p-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide text-emerald-300">
            Atendimento IA 24h Ativo
          </span>
        </div>
        <button
          onClick={onOpenReport}
          className="text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-700 transition flex items-center gap-1"
        >
          <span>ODS 8 & 9</span>
          <ArrowUpRight className="w-3 h-3 text-emerald-400" />
        </button>
      </div>

      {/* Header: Partner Company Info */}
      <div className="bg-slate-800/70 border border-slate-700/60 rounded-3xl p-5 shadow-lg relative overflow-hidden backdrop-blur-sm">
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-3xl shadow-md border border-emerald-400/30 flex-shrink-0">
            {profile.avatarIcon || '🏪'}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg font-bold text-white tracking-tight truncate">
                {profile.name}
              </h1>
              <span className="inline-flex items-center gap-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-medium px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3" />
                CNPJ Ativo
              </span>
            </div>

            <p className="text-xs text-slate-300 mt-1 line-clamp-1">
              {profile.category}
            </p>

            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span className="truncate">{profile.address}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="truncate text-[11px]">{profile.hours.split('.')[0]}</span>
          </div>
          <button
            onClick={() => onNavigateToTab('contact')}
            className="text-[11px] font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-0.5"
          >
            Ver dados
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Action Card: Falar com o Assistente Virtual */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-300" />
        <button
          onClick={() => onNavigateToChat()}
          className="relative w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-3xl p-5 shadow-xl transition-all duration-200 text-left flex items-center justify-between border border-emerald-400/40 active:scale-[0.99]"
        >
          <div className="space-y-1 pr-4">
            <div className="inline-flex items-center gap-1.5 bg-white/20 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase">
              <Sparkles className="w-3 h-3 text-amber-300" />
              IA Gemini 3.8 Integrada
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Falar com o Assistente Virtual
            </h2>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              Tire dúvidas instantâneas sobre preços, serviços, horários e produtos do estabelecimento.
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner flex-shrink-0 group-hover:translate-x-1 transition-transform">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
        </button>
      </div>

      {/* FAQ Chips: Perguntas frequentes de acesso rápido */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Perguntas Frequentes
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">
            Toque para perguntar
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {QUICK_FAQS.map((faq, index) => (
            <button
              key={index}
              onClick={() => onNavigateToChat(faq.question)}
              className="w-full bg-slate-800/80 hover:bg-slate-750 active:bg-slate-700/90 border border-slate-700/80 hover:border-emerald-500/50 rounded-2xl p-3.5 text-left transition-all duration-200 flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-700/60 group-hover:bg-emerald-500/20 text-emerald-400 flex items-center justify-center transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors">
                    {faq.label}
                  </p>
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    {faq.question}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </div>

      {/* Featured Services Preview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Serviços Populares
            </h3>
          </div>
          <button
            onClick={() => onNavigateToChat('Quais são todos os serviços oferecidos e valores?')}
            className="text-[11px] text-emerald-400 hover:underline"
          >
            Ver na IA
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {profile.services.slice(0, 4).map((service, idx) => (
            <div
              key={idx}
              className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3 hover:border-slate-600 transition flex flex-col justify-between"
            >
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs font-medium text-slate-200 line-clamp-2">
                  {service}
                </span>
              </div>
              <button
                onClick={() => onNavigateToChat(`Gostaria de saber detalhes sobre o serviço: ${service}`)}
                className="mt-2.5 text-[10px] font-semibold text-emerald-400 hover:text-emerald-300 text-left flex items-center gap-1"
              >
                Consultar
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Contact Banner */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700/80 rounded-2xl p-4 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-white">Prefere falar com um humano?</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Ligue ou envie mensagem direto no WhatsApp oficial da empresa.
          </p>
        </div>
        <button
          onClick={() => onNavigateToTab('contact')}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 transition flex-shrink-0 ml-3 shadow-md"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Falar</span>
        </button>
      </div>
    </div>
  );
};
