import React, { useState } from 'react';
import { X, Building2, Check, Sparkles, Plus, RefreshCw } from 'lucide-react';
import { BusinessProfile } from '../types';
import { DEFAULT_PROFILES } from '../data/profiles';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: BusinessProfile;
  onSelectProfile: (profile: BusinessProfile) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSelectProfile,
}) => {
  const [isEditingCustom, setIsEditingCustom] = useState(false);
  const [customName, setCustomName] = useState(currentProfile.name);
  const [customCnpj, setCustomCnpj] = useState(currentProfile.cnpj);
  const [customAddress, setCustomAddress] = useState(currentProfile.address);
  const [customHours, setCustomHours] = useState(currentProfile.hours);
  const [customPhone, setCustomPhone] = useState(currentProfile.phone);
  const [customServices, setCustomServices] = useState(currentProfile.services.join('\n'));

  if (!isOpen) return null;

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: BusinessProfile = {
      ...currentProfile,
      id: 'custom-' + Date.now(),
      name: customName || 'Empresa Parceira',
      cnpj: customCnpj || '00.000.000/0001-00',
      address: customAddress || 'Endereço Comercial',
      hours: customHours || 'Segunda a Sexta, 08h às 18h',
      phone: customPhone || '(11) 99999-9999',
      services: customServices.split('\n').filter(s => s.trim().length > 0),
    };
    onSelectProfile(updated);
    setIsEditingCustom(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="bg-slate-850 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Empresa Parceira & Base de Conhecimento
              </h2>
              <p className="text-xs text-slate-400">
                Alterne o estabelecimento ou personalize os dados do CNPJ
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {!isEditingCustom ? (
            <>
              <div className="space-y-2">
                <span className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                  Modelos Prontos de Estabelecimento Parceiro
                </span>

                <div className="space-y-2.5">
                  {DEFAULT_PROFILES.map((p) => {
                    const isSelected = currentProfile.id === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          onSelectProfile(p);
                          onClose();
                        }}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                          isSelected
                            ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-md'
                            : 'bg-slate-800/80 border-slate-700/80 hover:bg-slate-800 text-slate-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl p-1 bg-slate-750 rounded-xl">
                            {p.avatarIcon}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-white">
                                {p.name}
                              </h4>
                              {isSelected && (
                                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                                  Ativo
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              {p.category} • CNPJ: {p.cnpj}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                              📍 {p.address}
                            </p>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center flex-shrink-0 mt-1">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsEditingCustom(true)}
                  className="w-full bg-slate-800 hover:bg-slate-750 border border-dashed border-slate-700 rounded-2xl p-3.5 text-slate-300 hover:text-white flex items-center justify-center gap-2 transition"
                >
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-xs">
                    Cadastrar / Editar Dados da Empresa Parceira
                  </span>
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSaveCustom} className="space-y-3.5">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Nome Fantasia da Empresa
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    CNPJ Ativo
                  </label>
                  <input
                    type="text"
                    value={customCnpj}
                    onChange={(e) => setCustomCnpj(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Telefone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={customPhone}
                    onChange={(e) => setCustomPhone(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Endereço Completo
                </label>
                <input
                  type="text"
                  value={customAddress}
                  onChange={(e) => setCustomAddress(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Horário de Atendimento
                </label>
                <input
                  type="text"
                  value={customHours}
                  onChange={(e) => setCustomHours(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Serviços Oferecidos (um por linha)
                </label>
                <textarea
                  rows={3}
                  value={customServices}
                  onChange={(e) => setCustomServices(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Ex: Banho e tosa (R$ 50)&#10;Consulta veterinária (R$ 120)"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingCustom(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl font-medium transition"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl transition"
                >
                  Salvar e Usar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
