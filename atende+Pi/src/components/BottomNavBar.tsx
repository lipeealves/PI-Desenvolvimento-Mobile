import React from 'react';
import { Home, MessageSquare, PhoneCall, Sparkles } from 'lucide-react';
import { ScreenTab } from '../types';

interface BottomNavBarProps {
  currentTab: ScreenTab;
  onTabChange: (tab: ScreenTab) => void;
  unreadCount?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onTabChange,
  unreadCount = 0,
}) => {
  const tabs = [
    {
      id: 'home' as ScreenTab,
      label: 'Início',
      icon: Home,
      description: 'Página inicial',
    },
    {
      id: 'chat' as ScreenTab,
      label: 'Chat IA',
      icon: MessageSquare,
      badge: unreadCount > 0 ? unreadCount : undefined,
      isSpecial: true,
      description: 'Assistente Virtual',
    },
    {
      id: 'contact' as ScreenTab,
      label: 'Contato',
      icon: PhoneCall,
      description: 'Informações & CNPJ',
    },
  ];

  return (
    <nav 
      aria-label="Navegação Principal"
      className="bg-slate-900/95 backdrop-blur-md border-t border-slate-800/80 px-4 py-2 flex items-center justify-around shadow-2xl relative z-20"
    >
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-4 rounded-2xl transition-all duration-200 relative group ${
              isActive
                ? 'text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {/* Active Pill Glow Indicator */}
            {isActive && (
              <span className="absolute -top-2 w-8 h-1 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse" />
            )}

            <div className="relative">
              <div
                className={`p-1.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-400 scale-110 shadow-sm'
                    : 'group-hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-5 h-5 transition-transform duration-200" />
              </div>

              {/* Special Sparkle badge for AI Chat */}
              {tab.isSpecial && !tab.badge && (
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              )}

              {/* Unread badge */}
              {tab.badge && (
                <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full ring-2 ring-slate-900">
                  {tab.badge}
                </span>
              )}
            </div>

            <span className="text-[11px] mt-1 tracking-tight">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
