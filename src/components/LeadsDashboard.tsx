/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RefreshCw, Trash2, Check, Send, AlertCircle, Sparkles, FolderOpen, Database } from 'lucide-react';
import { Lead } from '../types';

interface LeadsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  leads: Lead[];
  onLeadsUpdated: (updatedLeads: Lead[]) => void;
}

export default function LeadsDashboard({
  isOpen,
  onClose,
  leads,
  onLeadsUpdated,
}: LeadsDashboardProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/leads');
      if (!response.ok) {
        throw new Error('Failed to retrieve consultation registry records.');
      }
      const data = await response.json();
      onLeadsUpdated(data);
      
      // Auto-select first lead if available
      if (data.length > 0 && !selectedLead) {
        setSelectedLead(data[0]);
      }
    } catch (err: any) {
      setError(err?.message || 'Error syncing data with database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLeads();
    }
  }, [isOpen]);

  const updateStatus = async (id: string, status: 'pending' | 'reviewed' | 'contacted') => {
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        const updated = await response.json();
        const nextLeads = leads.map((l) => (l.id === id ? updated : l));
        onLeadsUpdated(nextLeads);
        if (selectedLead?.id === id) {
          setSelectedLead(updated);
        }
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this brand consultation record?')) return;
    try {
      const response = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      if (response.ok) {
        const nextLeads = leads.filter((l) => l.id !== id);
        onLeadsUpdated(nextLeads);
        if (selectedLead?.id === id) {
          setSelectedLead(nextLeads.length > 0 ? nextLeads[0] : null);
        }
      }
    } catch (err) {
      console.error('Error deleting lead:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'contacted':
        return 'text-green-400 bg-green-950/45 border-green-800';
      case 'reviewed':
        return 'text-blue-400 bg-blue-950/45 border-blue-800';
      default:
        return 'text-gold bg-gold-glow border-gold-dim/40';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-black/95 backdrop-blur-sm"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 15 }}
            className="bg-brand-black border border-brand-border-mid w-full max-w-5xl h-[85vh] rounded relative shadow-2xl overflow-hidden z-10 flex flex-col font-sans"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-brand-border-mid bg-brand-off flex items-center justify-between select-none">
              <div className="flex items-center gap-2.5">
                <FolderOpen className="w-5 h-5 text-gold" />
                <div>
                  <h3 className="font-serif text-lg md:text-xl font-medium tracking-wide text-white">
                    Brandem CRM Portal
                  </h3>
                  <div className="flex items-center gap-1.5 text-[9px] uppercase font-condensed tracking-widest text-gray-500 mt-0.5">
                    <Database className="w-3 h-3 text-gold/60" />
                    <span>Local lead file database active</span>
                    <span>•</span>
                    <span className="text-gray-400">confidential records only</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={fetchLeads}
                  disabled={loading}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-brand-panel rounded transition-all disabled:opacity-45"
                  title="Force Refresh Strategy Leads"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={onClose}
                  className="p-1 text-gray-400 hover:text-white hover:bg-brand-panel rounded transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Split Layout Panel */}
            <div className="flex-1 flex overflow-hidden min-h-0">
              
              {/* Left Bar: Leads List */}
              <div className="w-full md:w-[350px] border-r border-brand-border-mid flex flex-col overflow-y-auto bg-[#0a0a0a] min-h-0 select-none">
                {leads.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-500">
                    <AlertCircle className="w-8 h-8 text-gold-dim/40 mb-3" />
                    <p className="font-serif text-sm font-light text-gray-400">No active enquiries</p>
                    <p className="text-[10px] mt-1 max-w-[200px]">Go to the AI Strategy Sandbox or request slot booking to populate leads data.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-brand-border">
                    {leads.map((lead) => (
                      <button
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className={`w-full text-left p-5 transition-colors flex flex-col gap-2 relative border-l-2 ${
                          selectedLead?.id === lead.id
                            ? 'bg-[#141414] border-gold'
                            : 'border-transparent hover:bg-brand-panel/30'
                        }`}
                      >
                        <div className="flex justify-between items-start w-full gap-2">
                          <h4 className="font-serif text-[15px] font-medium text-white truncate max-w-[170px]">
                            {lead.company}
                          </h4>
                          <span className={`font-condensed text-[8px] tracking-widest px-2 py-0.5 rounded border uppercase shrink-0 ${getStatusColor(lead.status)}`}>
                            {lead.status}
                          </span>
                        </div>
                        
                        <p className="text-[11px] text-gray-400 font-light truncate w-full">
                          {lead.name} ({lead.email})
                        </p>

                        <p className="text-[9px] text-[#555] font-mono">
                          {new Date(lead.createdAt).toLocaleDateString()} at {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Bar: Active Lead details panel */}
              <div className="hidden md:flex flex-1 flex-col overflow-y-auto bg-brand-black min-h-0 relative">
                {selectedLead ? (
                  <div className="p-8 flex flex-col gap-8">
                    
                    {/* Inner header metadata */}
                    <div className="flex flex-wrap items-start justify-between gap-6 border-b border-brand-border-mid pb-6">
                      <div className="flex-1 min-w-[200px]">
                        <span className="font-condensed text-[9px] tracking-widest text-[#555] uppercase font-bold">
                          Core Registered Prospect Profile
                        </span>
                        <h4 className="font-serif text-2xl md:text-3xl font-light text-white mt-1">
                          {selectedLead.company}
                        </h4>
                        <p className="text-xs text-gold font-light mt-1 select-text">
                          {selectedLead.name} • {selectedLead.email} {selectedLead.phone && `• ${selectedLead.phone}`}
                        </p>
                      </div>

                      {/* Action status indicators */}
                      <div className="flex items-center gap-2 shrink-0 select-none">
                        <button
                          onClick={() => updateStatus(selectedLead.id, 'reviewed')}
                          className="flex items-center gap-1.5 font-condensed text-[9.5px] tracking-widest text-blue-400 hover:text-white border border-blue-900 bg-blue-950/30 px-3 py-1.5 rounded transition-all uppercase"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Review</span>
                        </button>
                        <button
                          onClick={() => updateStatus(selectedLead.id, 'contacted')}
                          className="flex items-center gap-1.5 font-condensed text-[9.5px] tracking-widest text-green-400 hover:text-white border border-green-900 bg-green-950/30 px-3 py-1.5 rounded transition-all uppercase"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Contacted</span>
                        </button>
                        <button
                          onClick={() => deleteLead(selectedLead.id)}
                          className="flex items-center gap-1.5 font-condensed text-[9.5px] tracking-widest text-red-500 hover:text-white border border-red-950 hover:bg-red-950/40 p-2 rounded transition-all uppercase"
                          title="Delete Lead permanently"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
                        </button>
                      </div>
                    </div>

                    {/* Prospect challenge text */}
                    <div>
                      <h4 className="font-condensed text-[10px] tracking-widest text-[#555] uppercase font-bold mb-2 select-none">
                        PROSPECT PROBLEM BLOCK:
                      </h4>
                      <p className="text-[#999] font-sans font-light text-xs md:text-[13px] bg-brand-panel/40 border border-brand-border rounded p-4 leading-relaxed select-text">
                        "{selectedLead.challenge}"
                      </p>
                    </div>

                    {/* AI generated concept result output */}
                    <div>
                      <div className="flex items-center gap-1.5 select-none mb-3">
                        <Sparkles className="w-4 h-4 text-gold animate-pulse shrink-0" />
                        <h4 className="font-condensed text-[10px] tracking-widest text-gold uppercase font-bold">
                          AI CAMPAIGN TREATMENT OUTLINE:
                        </h4>
                      </div>

                      <div className="bg-[#141414] border border-brand-border rounded p-6 md:p-8 select-text">
                        {selectedLead.aiConcept ? (
                          <div className="space-y-4 text-gray-300 font-light text-xs md:text-[13px] leading-relaxed">
                            {selectedLead.aiConcept.split('\n\n').map((block, i) => {
                              if (block.startsWith('###')) {
                                return (
                                  <h5 key={i} className="font-serif text-base font-light text-gold tracking-wide mt-4 border-b border-brand-border-mid pb-1">
                                    {block.replace('###', '').trim()}
                                  </h5>
                                );
                              }
                              if (block.startsWith('*')) {
                                return (
                                  <p key={i} className="font-serif italic text-gold-dim bg-gold-glow p-3.5 border-l border-gold rounded-r-md">
                                    {block.replace(/\*/g, '').trim()}
                                  </p>
                                );
                              }
                              return <p key={i} className="text-gray-400 font-light leading-relaxed">{block}</p>;
                            })}
                          </div>
                        ) : (
                          <p className="text-gray-500 italic text-xs">No AI Campaign Strategy Generated for this lead.</p>
                        )}
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500 p-8 select-none">
                    <FolderOpen className="w-12 h-12 text-[#333] mb-4 animate-bounce" />
                    <h4 className="font-serif text-lg font-light text-white tracking-wide">Select a Lead</h4>
                    <p className="text-xs text-gray-500 max-w-[260px] leading-relaxed mt-2">
                       Select any prospect record on the left to see their profile details and review their AI Strategy Briefly treatment.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
