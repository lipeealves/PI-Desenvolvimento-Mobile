import React from 'react';
import { Smartphone, Monitor, Wifi, Battery, Signal, Award, Store } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  isPhoneFrame: boolean;
  onToggleFrame: () => void;
  onOpenReport: () => void;
  onOpenSettings: () => void;
  businessName: string;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  isPhoneFrame,
  onToggleFrame,
  onOpenReport,
  onOpenSettings,
  businessName,
}) => {
  // Current time for status bar
  const currentTime = new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-start text-slate-100 selection:bg-emerald-500 font-sans">
      {/* Top Global Control Bar for AI Studio & Academic Presentation */}
      <header className="w-full bg-slate-900/90 border-b border-slate-800/80 px-4 py-2.5 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-sm shadow-md">
            A+
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-white tracking-tight">
                Atende+
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                Flutter UI & Gemini IA
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Autoatendimento Inteligente com CNPJ Ativo • ODS 8 & 9
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Business Switcher */}
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs px-3 py-1.5 rounded-xl border border-slate-700 transition"
            title="Alterar ou personalizar empresa parceira"
          >
            <Store className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline font-medium truncate max-w-[130px]">
              {businessName}
            </span>
            <span className="md:hidden">Empresa</span>
          </button>

          {/* Academic Report & ODS */}
          <button
            onClick={onOpenReport}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600/30 to-teal-600/30 hover:from-emerald-600/50 hover:to-teal-600/50 text-emerald-300 text-xs px-3 py-1.5 rounded-xl border border-emerald-500/40 transition font-semibold"
          >
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>Extensão & ODS</span>
          </button>

          {/* Frame Toggle Button */}
          <button
            onClick={onToggleFrame}
            className="p-1.5 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded-xl border border-slate-700 transition flex items-center gap-1 text-xs"
            title={isPhoneFrame ? "Expandir para Tela Cheia" : "Modo Smartphone"}
          >
            {isPhoneFrame ? (
              <>
                <Monitor className="w-4 h-4 text-emerald-400" />
                <span className="hidden lg:inline text-[11px]">Tela Cheia</span>
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span className="hidden lg:inline text-[11px]">Smartphone</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Frame Container */}
      <main className="flex-1 w-full flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden">
        {isPhoneFrame ? (
          /* Phone Frame Mockup */
          <div className="relative w-full max-w-[400px] h-[844px] max-h-[calc(100vh-65px)] bg-slate-900 rounded-none sm:rounded-[44px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-0 sm:border-[8px] sm:border-slate-800 flex flex-col overflow-hidden ring-1 ring-slate-700/50">
            {/* Phone Speaker & Dynamic Island */}
            <div className="hidden sm:flex justify-between items-center px-6 pt-3 pb-1 text-slate-300 text-xs select-none bg-slate-900 z-30">
              <span className="font-semibold text-xs text-white">{currentTime}</span>

              {/* Dynamic Island Pill */}
              <div className="w-24 h-4.5 bg-black rounded-full flex items-center justify-center gap-1.5 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-slate-800" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="flex items-center gap-1.5">
                <Signal className="w-3.5 h-3.5 text-slate-300" />
                <Wifi className="w-3.5 h-3.5 text-slate-300" />
                <Battery className="w-4 h-4 text-emerald-400" />
              </div>
            </div>

            {/* Inner Mobile Screen */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
              {children}
            </div>

            {/* iOS / Flutter Home Indicator Line */}
            <div className="hidden sm:flex justify-center pb-2 pt-1 bg-slate-900 select-none z-30">
              <div className="w-32 h-1 bg-slate-600 rounded-full" />
            </div>
          </div>
        ) : (
          /* Full View / Responsive Desktop Mode */
          <div className="w-full max-w-4xl h-[calc(100vh-70px)] bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden">
            {children}
          </div>
        )}
      </main>
    </div>
  );
};
