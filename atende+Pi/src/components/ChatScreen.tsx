import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Trash2,
  Copy,
  Check,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Info,
  ChevronDown
} from 'lucide-react';
import { BusinessProfile, ChatMessage } from '../types';
import { QUICK_FAQS } from '../data/profiles';

interface ChatScreenProps {
  profile: BusinessProfile;
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (text: string) => Promise<void>;
  onClearHistory: () => void;
  pendingInitialQuestion?: string | null;
  onClearPendingQuestion?: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  profile,
  messages,
  isLoading,
  onSendMessage,
  onClearHistory,
  pendingInitialQuestion,
  onClearPendingQuestion,
}) => {
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [ratings, setRatings] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle pending initial question triggered from Home chips
  useEffect(() => {
    if (pendingInitialQuestion) {
      onSendMessage(pendingInitialQuestion);
      if (onClearPendingQuestion) {
        onClearPendingQuestion();
      }
    }
  }, [pendingInitialQuestion]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    const textToSend = inputText.trim();
    setInputText('');
    await onSendMessage(textToSend);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRate = (id: string, isPositive: boolean) => {
    setRatings(prev => ({ ...prev, [id]: isPositive }));
  };

  // Helper to render basic markdown like bold text and bullet points
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Check for bullet list item
      const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*');
      const cleanLine = isBullet ? line.trim().replace(/^[•\-\*]\s*/, '') : line;

      // Simple parser for bold **text**
      const parts = cleanLine.split(/(\*\*.*?\*\*)/g);

      const parsedContent = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-semibold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (isBullet) {
        return (
          <li key={idx} className="ml-4 list-disc text-slate-200 my-0.5 leading-relaxed">
            {parsedContent}
          </li>
        );
      }

      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="my-0.5 leading-relaxed">
          {parsedContent}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 selection:bg-emerald-500">
      {/* Chat Top App Bar */}
      <div className="bg-slate-850/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md border border-emerald-400/30">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-slate-900 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-bold text-white tracking-tight">
                Assistente {profile.name}
              </h2>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
              <Sparkles className="w-3 h-3" />
              <span>Gemini 3.8 Flash • Online</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {messages.length > 1 && (
            <button
              onClick={onClearHistory}
              title="Limpar conversa"
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Notice bar about scope */}
      <div className="bg-slate-800/40 border-b border-slate-800/60 px-4 py-1.5 text-[11px] text-slate-400 flex items-center justify-between">
        <span className="truncate">
          Base de conhecimento oficial: <strong className="text-slate-300 font-medium">{profile.name}</strong>
        </span>
        <span className="text-[10px] text-emerald-400/90 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded">
          {profile.cnpj}
        </span>
      </div>

      {/* Conversation ListView */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isHelpful = ratings[msg.id];

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} transition-all`}
            >
              <div
                className={`flex gap-2.5 max-w-[88%] sm:max-w-[80%] ${
                  isUser ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 text-xs shadow-sm ${
                    isUser
                      ? 'bg-slate-700 text-slate-200'
                      : 'bg-gradient-to-tr from-emerald-600 to-teal-600 text-white'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl px-4 py-3 text-xs shadow-md transition-all ${
                    isUser
                      ? 'bg-emerald-600 text-white rounded-tr-xs'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-xs backdrop-blur-sm'
                  }`}
                >
                  <div className="space-y-1">
                    {renderFormattedText(msg.text)}
                  </div>

                  {/* Metadata and action footer for bot */}
                  <div
                    className={`mt-2 pt-1.5 flex items-center justify-between text-[10px] gap-3 ${
                      isUser
                        ? 'text-emerald-200/80 border-t border-emerald-500/30'
                        : 'text-slate-400 border-t border-slate-700/50'
                    }`}
                  >
                    <span>{msg.timestamp}</span>

                    {!isUser && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="hover:text-slate-200 transition p-0.5 rounded hover:bg-slate-700"
                          title="Copiar resposta"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                        <button
                          onClick={() => handleRate(msg.id, true)}
                          className={`hover:text-emerald-400 transition p-0.5 rounded ${
                            isHelpful === true ? 'text-emerald-400 font-bold' : ''
                          }`}
                          title="Resposta útil"
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleRate(msg.id, false)}
                          className={`hover:text-rose-400 transition p-0.5 rounded ${
                            isHelpful === false ? 'text-rose-400 font-bold' : ''
                          }`}
                          title="Não foi útil"
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator (Flutter-style typing indicator with animated dots) */}
        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
              <Bot className="w-4 h-4 animate-spin" />
            </div>

            <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl rounded-tl-xs px-4 py-3 shadow-md">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-300 font-medium">Assistente digitando</span>
                <span className="flex gap-1 items-center ml-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Consultando base de conhecimento via Gemini API...
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions Carousel Chips */}
      <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-850/50 overflow-x-auto flex gap-2 no-scrollbar">
        {QUICK_FAQS.slice(0, 4).map((faq, i) => (
          <button
            key={i}
            onClick={() => onSendMessage(faq.question)}
            disabled={isLoading}
            className="flex-shrink-0 bg-slate-800 hover:bg-slate-750 active:bg-slate-700 text-[11px] text-slate-300 hover:text-emerald-300 px-3 py-1.5 rounded-full border border-slate-700 transition disabled:opacity-50"
          >
            {faq.label}
          </button>
        ))}
      </div>

      {/* Input Area (TextField & IconButton) */}
      <div className="bg-slate-850 border-t border-slate-800 p-3 sm:p-4 z-10">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Digite sua dúvida aqui..."
              disabled={isLoading}
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-3 pl-4 pr-10 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition disabled:opacity-50 shadow-inner"
            />
            {inputText.length > 0 && (
              <button
                type="button"
                onClick={() => setInputText('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs p-1"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="w-11 h-11 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 disabled:text-slate-600 flex items-center justify-center transition-all duration-200 shadow-md active:scale-95 flex-shrink-0"
            title="Enviar mensagem"
          >
            <Send className="w-5 h-5 ml-0.5" />
          </button>
        </form>
        <p className="text-[10px] text-slate-400 text-center mt-2">
          IA pode cometer enganos. Para emergências ou agendamentos, use a aba Contato.
        </p>
      </div>
    </div>
  );
};
