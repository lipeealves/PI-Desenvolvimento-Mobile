import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ShieldCheck,
  Copy,
  Check,
  ExternalLink,
  Building,
  Mail,
  QrCode,
  Sparkles,
  Info
} from 'lucide-react';
import { BusinessProfile } from '../types';

interface ContactScreenProps {
  profile: BusinessProfile;
  onNavigateToChat: (question?: string) => void;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({
  profile,
  onNavigateToChat,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleOpenWhatsApp = () => {
    const rawNumber = profile.whatsapp.replace(/\D/g, '');
    const cleanNumber = rawNumber.startsWith('55') ? rawNumber : `55${rawNumber}`;
    const message = encodeURIComponent(`Olá! Vim pelo aplicativo Atende+ e gostaria de mais informações sobre o ${profile.name}.`);
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  const handleOpenDialer = () => {
    const rawNumber = profile.phone.replace(/\D/g, '');
    window.location.href = `tel:${rawNumber}`;
  };

  const handleOpenMaps = () => {
    const encodedAddress = encodeURIComponent(profile.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 pb-24 text-slate-100 selection:bg-emerald-500">
      {/* Institutional Top Header */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 shadow-lg relative overflow-hidden backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-4xl shadow-md border border-emerald-400/30 flex-shrink-0">
            {profile.avatarIcon || '🏪'}
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-white tracking-tight truncate">
              {profile.name}
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              {profile.category}
            </p>
            <div className="inline-flex items-center gap-1.5 mt-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CNPJ Regular e Ativo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Action Buttons: WhatsApp & Phone Dialer */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleOpenWhatsApp}
          className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-2xl p-4 shadow-lg flex flex-col items-center justify-center gap-2 transition-all duration-200 group border border-emerald-400/40"
        >
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div className="text-center">
            <span className="block text-xs font-bold uppercase tracking-wider">
              WhatsApp
            </span>
            <span className="text-[11px] text-emerald-100">
              Atendimento Humano
            </span>
          </div>
        </button>

        <button
          onClick={handleOpenDialer}
          className="bg-slate-800 hover:bg-slate-750 active:bg-slate-700 text-white rounded-2xl p-4 shadow-lg flex flex-col items-center justify-center gap-2 transition-all duration-200 group border border-slate-700"
        >
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform text-emerald-400">
            <Phone className="w-5 h-5" />
          </div>
          <div className="text-center">
            <span className="block text-xs font-bold uppercase tracking-wider">
              Ligar Agora
            </span>
            <span className="text-[11px] text-slate-400">
              {profile.phone}
            </span>
          </div>
        </button>
      </div>

      {/* Address & Interactive Map Card */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-md space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-700/80 text-emerald-400 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Endereço Completo
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {profile.address}
              </p>
            </div>
          </div>
        </div>

        {/* Visual Map Preview Simulation */}
        <div className="relative h-28 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 flex items-center justify-center text-center p-3 group">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative z-10 space-y-1">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40">
              <MapPin className="w-4 h-4" />
            </div>
            <p className="text-[11px] text-slate-300 font-medium truncate max-w-[260px]">
              {profile.address}
            </p>
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button
            onClick={handleOpenMaps}
            className="flex-1 bg-slate-700/80 hover:bg-slate-700 text-slate-200 text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            <span>Abrir no Google Maps</span>
          </button>
          <button
            onClick={() => copyToClipboard(profile.address, 'address')}
            className="bg-slate-700/80 hover:bg-slate-700 text-slate-200 text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition"
          >
            {copiedField === 'address' ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>Copiar</span>
          </button>
        </div>
      </div>

      {/* Opening Hours Card */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-md space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-slate-700/80 text-emerald-400 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Horário de Atendimento
            </h3>
            <span className="text-[11px] text-slate-400">
              Atendimento presencial e suporte telefônico
            </span>
          </div>
        </div>

        <div className="bg-slate-850/60 rounded-xl p-3 border border-slate-700/50 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-200">
            <span className="font-medium">Segunda a Sexta:</span>
            <span className="text-emerald-400 font-mono">08:00 às 18:00</span>
          </div>
          <div className="flex items-center justify-between text-slate-200 pt-1.5 border-t border-slate-700/40">
            <span className="font-medium">Sábados:</span>
            <span className="text-emerald-400 font-mono">08:00 às 12:00</span>
          </div>
          <div className="flex items-center justify-between text-slate-400 pt-1.5 border-t border-slate-700/40 text-[11px]">
            <span>Domingos e Feriados:</span>
            <span>Plantão de emergência / Fechado</span>
          </div>
        </div>
      </div>

      {/* Institutional CNPJ & Fiscal Transparency Card */}
      <div className="bg-gradient-to-b from-slate-800/90 to-slate-850/90 border border-slate-700/80 rounded-2xl p-4 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Dados Cadastrais da Empresa
              </h3>
              <p className="text-[10px] text-slate-400">
                Parceiro credenciado na plataforma Atende+
              </p>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
            ATIVO
          </span>
        </div>

        <div className="space-y-2 text-xs divide-y divide-slate-700/60">
          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-400">CNPJ:</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-white font-medium">{profile.cnpj}</span>
              <button
                onClick={() => copyToClipboard(profile.cnpj, 'cnpj')}
                className="text-slate-400 hover:text-slate-200 p-1"
                title="Copiar CNPJ"
              >
                {copiedField === 'cnpj' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-slate-400">Razão Social:</span>
            <span className="text-white font-medium text-right">{profile.name} LTDA</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-slate-400">E-mail:</span>
            <span className="text-slate-300 font-mono text-[11px] truncate max-w-[190px]">
              {profile.email}
            </span>
          </div>

          {profile.pixKey && (
            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-400">Chave Pix:</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-emerald-300 text-[11px]">{profile.pixKey}</span>
                <button
                  onClick={() => copyToClipboard(profile.pixKey!, 'pix')}
                  className="text-slate-400 hover:text-slate-200 p-1"
                  title="Copiar Pix"
                >
                  {copiedField === 'pix' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ask AI shortcut */}
      <button
        onClick={() => onNavigateToChat('Gostaria de saber mais sobre a história e os valores da empresa.')}
        className="w-full bg-slate-800/60 hover:bg-slate-800 border border-dashed border-slate-700 rounded-2xl p-3 text-xs text-slate-300 hover:text-emerald-300 flex items-center justify-center gap-2 transition"
      >
        <Sparkles className="w-4 h-4 text-emerald-400" />
        <span>Fazer perguntas institucionais para a IA</span>
      </button>
    </div>
  );
};
