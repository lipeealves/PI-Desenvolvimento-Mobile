import React, { useState, useEffect } from 'react';
import { ScreenTab, BusinessProfile, ChatMessage } from './types';
import { DEFAULT_PROFILES } from './data/profiles';
import { PhoneFrame } from './components/PhoneFrame';
import { BottomNavBar } from './components/BottomNavBar';
import { HomeScreen } from './components/HomeScreen';
import { ChatScreen } from './components/ChatScreen';
import { ContactScreen } from './components/ContactScreen';
import { ReportModal } from './components/ReportModal';
import { SettingsModal } from './components/SettingsModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ScreenTab>('home');
  const [profile, setProfile] = useState<BusinessProfile>(DEFAULT_PROFILES[0]);
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // Initialize messages with an assistant greeting
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'bot',
      text: `Olá! Sou o assistente virtual inteligente do **${DEFAULT_PROFILES[0].name}** 🐾.\n\nComo posso ajudar você hoje? Você pode tirar dúvidas sobre nossos serviços (banho, tosa, consultas), preços, horários de atendimento ou localização!`,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      source: 'gemini-3.8-flash'
    }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Whenever the business profile changes, update the greeting
  const handleSelectProfile = (newProfile: BusinessProfile) => {
    setProfile(newProfile);
    setMessages([
      {
        id: `welcome-${newProfile.id}-${Date.now()}`,
        sender: 'bot',
        text: `Olá! Sou o assistente virtual do **${newProfile.name}** ${newProfile.avatarIcon || '🏪'}.\n\nEstou à disposição para tirar dúvidas sobre nossos produtos, serviços, horários e localização! Como posso te ajudar hoje?`,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        source: 'gemini-3.8-flash'
      }
    ]);
  };

  // Asynchronous message submission (HTTP POST -> Gemini API)
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text.trim(),
          history: newMessages.slice(-6),
          businessProfile: profile,
        }),
      });

      if (!response.ok) {
        throw new Error(`Falha no servidor: ${response.status}`);
      }

      const data = await response.json();

      const botMessage: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: data.reply || 'Desculpe, ocorreu uma instabilidade momentânea. Por favor, tente novamente.',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        source: data.source || 'gemini-3.8-flash',
      };

      setMessages((prev) => [...prev, botMessage]);

      if (currentTab !== 'chat') {
        setUnreadCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      const errorMessage: ChatMessage = {
        id: 'err-' + Date.now(),
        sender: 'bot',
        text: `Desculpe, não consegui obter resposta no momento. Por favor tente novamente ou entre em contato pelo telefone/WhatsApp **${profile.phone}**.`,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        source: 'fallback-knowledge-base',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'reset-' + Date.now(),
        sender: 'bot',
        text: `Conversa reiniciada. Olá! Sou o assistente virtual do **${profile.name}**. Em que posso te ajudar hoje?`,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        source: 'gemini-3.8-flash'
      }
    ]);
  };

  const handleNavigateToChat = (question?: string) => {
    setCurrentTab('chat');
    setUnreadCount(0);
    if (question) {
      setPendingQuestion(question);
    }
  };

  const handleTabChange = (tab: ScreenTab) => {
    setCurrentTab(tab);
    if (tab === 'chat') {
      setUnreadCount(0);
    }
  };

  return (
    <PhoneFrame
      isPhoneFrame={isPhoneFrame}
      onToggleFrame={() => setIsPhoneFrame(!isPhoneFrame)}
      onOpenReport={() => setIsReportOpen(true)}
      onOpenSettings={() => setIsSettingsOpen(true)}
      businessName={profile.name}
    >
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-900 relative">
        {/* Active Screen Rendering */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {currentTab === 'home' && (
            <HomeScreen
              profile={profile}
              onNavigateToChat={handleNavigateToChat}
              onNavigateToTab={handleTabChange}
              onOpenReport={() => setIsReportOpen(true)}
            />
          )}

          {currentTab === 'chat' && (
            <ChatScreen
              profile={profile}
              messages={messages}
              isLoading={isLoading}
              onSendMessage={handleSendMessage}
              onClearHistory={handleClearHistory}
              pendingInitialQuestion={pendingQuestion}
              onClearPendingQuestion={() => setPendingQuestion(null)}
            />
          )}

          {currentTab === 'contact' && (
            <ContactScreen
              profile={profile}
              onNavigateToChat={handleNavigateToChat}
            />
          )}
        </div>

        {/* Flutter-style Bottom Navigation Bar */}
        <BottomNavBar
          currentTab={currentTab}
          onTabChange={handleTabChange}
          unreadCount={unreadCount}
        />
      </div>

      {/* Extension Report & ODS 8/9 Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />

      {/* Business Partner & Knowledge Base Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentProfile={profile}
        onSelectProfile={handleSelectProfile}
      />
    </PhoneFrame>
  );
}
