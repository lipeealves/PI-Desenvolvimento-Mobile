import React, { useState } from 'react';
import {
  X,
  Award,
  Globe2,
  CheckCircle,
  Copy,
  Check,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  FileCheck
} from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const extensionJustificationText = `
ATIVIDADE DE EXTENSÃO UNIVERSITÁRIA - RELATÓRIO TÉCNICO

Projeto: Atende+ - Assistente Virtual Inteligente para Pequenas Empresas
Objetivo: Automatizar o atendimento inicial e tirar dúvidas de clientes de uma empresa parceira (com CNPJ ativo) por meio de uma interface móvel interativa com Inteligência Artificial.

ODS SELECIONADOS:
• ODS 8 — Trabalho Decente e Crescimento Econômico: Promove o crescimento econômico sustentado e o trabalho decente ao aliviar colaboradores de micro e pequenas empresas do atendimento repetitivo, reduzindo filas e tempo de espera do cliente e permitindo que o time humano foque em atividades de maior valor agregado.
• ODS 9 — Indústria, Inovação e Infraestrutura: Fomenta a inovação e modernização tecnológica do comércio local, democratizando o acesso a ferramentas avançadas de IA Generativa (Google Gemini) para estabelecimentos de bairro com CNPJ ativo.

REQUISITOS FUNCIONAIS CUMPRIDOS:
- RF01: Usuário envia mensagens de texto para o assistente virtual.
- RF02: O app exibe respostas geradas pela API de IA em tempo real no chat.
- RF03: Atalhos com perguntas frequentes na tela inicial (chips clicáveis).
- RF04: Exibição de dados institucionais, localização, horário e contato direto.

REQUISITOS NÃO FUNCIONAIS CUMPRIDOS:
- RNF01: Arquitetura inspirada em Flutter com Material 3 e navegação fluida.
- RNF02: Interface móvel responsiva e adaptável a telas diversas.
- RNF03: Requisições HTTP POST assíncronas sem bloqueio da interface.
- RNF04: Feedback visual de carregamento animado com controle de latência.
`.trim();

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-850 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Relatório de Extensão & Alinhamento ODS
              </h2>
              <p className="text-xs text-slate-400">
                Dados oficiais para preenchimento na Intranet acadêmica
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-slate-200 text-xs sm:text-sm">
          {/* Quick Copy Action */}
          <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-bold text-emerald-300 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4" />
                Texto Formatado para o Relatório de Extensão
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Copie o texto pronto com justificativas dos ODS 8 e 9, RFs e RNFs.
              </p>
            </div>
            <button
              onClick={() => copyText(extensionJustificationText, 'fullReport')}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition flex-shrink-0 shadow-md"
            >
              {copiedSection === 'fullReport' ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Relatório</span>
                </>
              )}
            </button>
          </div>

          {/* ODS 8 e ODS 9 Cards */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-emerald-400" />
              Objetivos de Desenvolvimento Sustentável (ODS da ONU)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* ODS 8 */}
              <div className="bg-slate-800/80 border border-red-500/30 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-red-600 text-white font-bold text-xs flex items-center justify-center">
                    8
                  </span>
                  <h4 className="font-bold text-white text-xs">
                    ODS 8: Trabalho Decente & Crescimento Econômico
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A introdução do assistente automatiza a triagem, reduz o tempo de espera do consumidor e descarrega o trabalho repetitivo dos funcionários, aumentando a produtividade e qualidade do ambiente laboral.
                </p>
              </div>

              {/* ODS 9 */}
              <div className="bg-slate-800/80 border border-orange-500/30 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-orange-600 text-white font-bold text-xs flex items-center justify-center">
                    9
                  </span>
                  <h4 className="font-bold text-white text-xs">
                    ODS 9: Indústria, Inovação & Infraestrutura
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Promove a digitalização e modernização tecnológica do pequeno comércio local por meio de infraestrutura de nuvem e IA Generativa (Google Gemini API), reduzindo o abismo tecnológico das PMEs.
                </p>
              </div>
            </div>
          </div>

          {/* Requisitos Funcionais e Não Funcionais */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Requisitos Atendidos (100% de Conformidade)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* RFs */}
              <div className="bg-slate-850 rounded-2xl p-3.5 border border-slate-700/80 space-y-2">
                <h5 className="font-bold text-emerald-400 text-xs uppercase tracking-wider">
                  Requisitos Funcionais (RF)
                </h5>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span><strong>RF01:</strong> Envio de mensagens de texto para o assistente.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span><strong>RF02:</strong> Exibição de respostas geradas pela API de IA em tempo real.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span><strong>RF03:</strong> Botões de atalho com perguntas frequentes na home.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span><strong>RF04:</strong> Dados de contato, CNPJ e localização da empresa.</span>
                  </li>
                </ul>
              </div>

              {/* RNFs */}
              <div className="bg-slate-850 rounded-2xl p-3.5 border border-slate-700/80 space-y-2">
                <h5 className="font-bold text-cyan-400 text-xs uppercase tracking-wider">
                  Requisitos Não Funcionais (RNF)
                </h5>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span><strong>RNF01:</strong> Arquitetura mobile responsiva inspirada em Flutter/Material 3.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span><strong>RNF02:</strong> Interface adaptável para qualquer tamanho de tela ou moldura.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span><strong>RNF03:</strong> Requisições HTTP POST assíncronas sem travar UI.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span><strong>RNF04:</strong> Feedback visual com indicador animado de digitação.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Interactive Async Data Flow Diagram */}
          <div className="bg-slate-850 border border-slate-700/80 rounded-2xl p-4 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-emerald-400" />
              Fluxo de Dados Assíncrono (5 Etapas)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700/60">
                <span className="text-[10px] text-emerald-400 font-bold block mb-1">Passo 1</span>
                <p className="text-slate-300 font-medium">Usuário digita dúvida e clica em enviar</p>
              </div>
              <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700/60">
                <span className="text-[10px] text-emerald-400 font-bold block mb-1">Passo 2</span>
                <p className="text-slate-300 font-medium">Chamada HTTP POST assíncrona (JSON)</p>
              </div>
              <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700/60">
                <span className="text-[10px] text-emerald-400 font-bold block mb-1">Passo 3</span>
                <p className="text-slate-300 font-medium">API Gemini processa com System Prompt</p>
              </div>
              <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700/60">
                <span className="text-[10px] text-emerald-400 font-bold block mb-1">Passo 4</span>
                <p className="text-slate-300 font-medium">Retorno do texto processado em JSON</p>
              </div>
              <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700/60">
                <span className="text-[10px] text-emerald-400 font-bold block mb-1">Passo 5</span>
                <p className="text-slate-300 font-medium">JSON parsing e atualização de estado na tela</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-850 px-5 py-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-4 py-2 rounded-xl text-xs transition"
          >
            Fechar Janela
          </button>
        </div>
      </div>
    </div>
  );
};
