/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Play, CheckCircle, RefreshCw, AlertCircle, Camera } from 'lucide-react';
import { ServiceId } from '../types';

interface AiBriefGeneratorProps {
  onLeadAdded: (newLead: any) => void;
}

export default function AiBriefGenerator({ onLeadAdded }: AiBriefGeneratorProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '' as ServiceId | '',
    challenge: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [briefResult, setBriefResult] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps = [
    'Locking camera focal nodes...',
    'Loading Netflix visual parameters...',
    'Consulting KM Abdul Kaium\'s BFDC story frames...',
    'Analyzing target customer desire dynamics...',
    'Engineering market wanting...',
    'Writing customized campaign slogan...'
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.email || !formData.challenge) {
      setError('Please fill in Name, Email, Brand/Company, and core Challenge.');
      return;
    }

    setLoading(true);
    setError(null);
    setBriefResult(null);
    setLoadingStep(0);

    // Simulate animated loading steps
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1200);

    try {
      const response = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Our creative proxy is offline. Please try again.');
      }

      const freshLeadData = await response.json();
      clearInterval(stepInterval);
      
      setBriefResult(freshLeadData.aiConcept || '');
      setIsCompleted(true);
      onLeadAdded(freshLeadData);
    } catch (err: any) {
      clearInterval(stepInterval);
      setError(err?.message || 'Server error generating campaign brief.');
    } finally {
      setLoading(false);
    }
  };

  const resetSandbox = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      service: '',
      challenge: '',
    });
    setBriefResult(null);
    setIsCompleted(false);
    setError(null);
  };

  return (
    <section id="ai-sandbox" className="relative bg-[#0f0f0f] border-b border-brand-border py-20 md:py-28 cinematic-grain text-white">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-16">
          <span className="font-condensed text-[10px] tracking-[0.2em] text-gold uppercase mb-3 inline-block">
            THE BRIEF GENERATOR
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-light tracking-wide mb-6">
            AI Strategy Sandbox <br />
            <em className="text-gold italic font-serif">আপনার ব্র্যান্ডের ট্রিটমেন্ট।</em>
          </h2>
          <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed">
            Fill in your brand data and instantly unlock a tailored, professional campaign strategy statement, visual frame description, and master tagline.
            We run this assessment through Brandem’s digital core, powered by the **Gemini 3.5 Flash** model. No sales fluff. Pure cinematic strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative min-h-[500px]">
          
          {/* Left Form Panel */}
          <div className="lg:col-span-5 bg-brand-black border border-brand-border p-8 rounded relative shadow-2xl">
            <div className="absolute top-2 right-2 flex items-center gap-1.5 font-condensed text-[8.5px] tracking-widest text-gold uppercase bg-brand-panel px-2.5 py-1 select-none border border-gold-dim/25 rounded-sm">
              <Sparkles className="w-3 h-3 text-gold animate-pulse" />
              <span>Gemini 3.5 Active</span>
            </div>

            <h3 className="font-serif text-xl tracking-wide font-light text-white mb-6 pt-1">
              Submit Brand Brief
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              <div>
                <label className="block font-condensed text-[9px] tracking-wider text-gray-500 uppercase mb-1.5 font-bold">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="KM Abdul Kaium"
                  required
                  disabled={loading || isCompleted}
                  className="w-full bg-brand-panel/60 border border-brand-border-mid focus:border-gold-dim px-4 py-2.5 text-xs font-light text-white outline-none rounded transition-colors disabled:opacity-55"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-condensed text-[9px] tracking-wider text-gray-500 uppercase mb-1.5 font-bold">
                    Company / Brand *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Brandem Studio"
                    required
                    disabled={loading || isCompleted}
                    className="w-full bg-brand-panel/60 border border-brand-border-mid focus:border-gold-dim px-4 py-2.5 text-xs font-light text-white outline-none rounded transition-colors disabled:opacity-55"
                  />
                </div>
                <div>
                  <label className="block font-condensed text-[9px] tracking-wider text-gray-500 uppercase mb-1.5 font-bold">
                    WhatsApp / Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+8801..."
                    disabled={loading || isCompleted}
                    className="w-full bg-brand-panel/60 border border-brand-border-mid focus:border-gold-dim px-4 py-2.5 text-xs font-light text-white outline-none rounded transition-colors disabled:opacity-55"
                  />
                </div>
              </div>

              <div>
                <label className="block font-condensed text-[9px] tracking-wider text-gray-500 uppercase mb-1.5 font-bold">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="kmthirty3@gmail.com"
                  required
                  disabled={loading || isCompleted}
                  className="w-full bg-brand-panel/60 border border-brand-border-mid focus:border-gold-dim px-4 py-2.5 text-xs font-light text-white outline-none rounded transition-colors disabled:opacity-55"
                />
              </div>

              <div>
                <label className="block font-condensed text-[9px] tracking-wider text-gray-500 uppercase mb-1.5 font-bold">
                  Desired Capabilities Category
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  disabled={loading || isCompleted}
                  className="w-full bg-brand-panel/60 border border-brand-border-mid focus:border-gold-dim px-4 py-2.5 text-xs font-light text-white outline-none rounded transition-colors disabled:opacity-55 cursor-pointer appearance-none"
                >
                  <option value="">Select Service Area</option>
                  <option value="tvc">TVC / OVC Cinematic Production</option>
                  <option value="pr">Artist Relations & Campaigns</option>
                  <option value="strategy">High-Stakes Brand Growth Layout</option>
                  <option value="political">Political mobilization & Mass Campaigns</option>
                  <option value="full">Comprehensive Growth Partnership</option>
                </select>
              </div>

              <div>
                <label className="block font-condensed text-[9px] tracking-wider text-gray-500 uppercase mb-1.5 font-bold">
                  Describe Brand's Challenge & Core Dream *
                </label>
                <textarea
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleInputChange}
                  placeholder="আমরা ঢাকার সেরা পেট ক্লিনিক হতে চাই, কিন্তু মানুষ মনে করে আমাদের সার্ভিস অনেক দামী..."
                  required
                  disabled={loading || isCompleted}
                  rows={4}
                  className="w-full bg-brand-panel/60 border border-brand-border-mid focus:border-gold-dim px-4 py-2.5 text-xs font-light text-white outline-none rounded transition-colors disabled:opacity-55 resize-none leading-relaxed"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-950/40 border border-red-900 text-xs text-red-200 rounded select-none">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {!isCompleted ? (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 font-condensed text-xs font-bold tracking-[0.2em] uppercase bg-gold text-brand-black py-3.5 transition-all hover:bg-[#dfbd58] disabled:opacity-50 select-none cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse" />
                  <span>{loading ? 'Consulting Core...' : 'Engineer Audience Want'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={resetSandbox}
                  className="w-full flex items-center justify-center gap-2 font-condensed text-xs font-bold tracking-[0.2em] uppercase border border-gold-dim text-gold py-3.5 hover:bg-gold/10 transition-all select-none cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Orchestrate New Brief</span>
                </button>
              )}

            </form>
          </div>

          {/* Right Concept Output Display Panel */}
          <div className="lg:col-span-7 bg-[#141414]/30 border border-brand-border rounded p-8 md:p-10 select-none h-full min-h-[500px] flex flex-col justify-between relative shadow-2xl overflow-hidden self-stretch">
            
            {/* Ambient vignette background effects */}
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-gold-glow blur-[80px] rounded-full pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  key="loading-sandbox"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#0f0f0f]/90 z-10 flex flex-col items-center justify-center p-8 text-center"
                >
                  <Camera className="w-10 h-10 text-gold animate-spin mb-4" />
                  <motion.p
                    key={loadingStep}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="font-serif text-lg text-white font-light h-10"
                  >
                    {loadingSteps[loadingStep]}
                  </motion.p>
                  <p className="font-condensed text-[9px] tracking-widest text-[#555] uppercase mt-2">
                    Running complex pipeline operations inside Gemini Flash-2.5
                  </p>
                </motion.div>
              )}

              {briefResult ? (
                <motion.div
                  key="result-pane"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col gap-6"
                >
                  <div className="flex items-center gap-2 border-b border-brand-border-mid pb-4 select-none">
                    <CheckCircle className="w-5 h-5 text-gold shrink-0" />
                    <div>
                      <h4 className="font-serif text-[15px] font-medium tracking-wide text-white">
                        CINEMATIC TREATMENT READY
                      </h4>
                      <p className="font-condensed text-[9px] text-[#555] tracking-widest uppercase">
                        Lead saved successfully • Treatment generated matching founder standards
                      </p>
                    </div>
                  </div>

                  {/* Formatted Text Outputs */}
                  <div className="text-gray-300 font-light text-xs md:text-[13px] leading-relaxed max-h-[380px] overflow-y-auto pr-2 space-y-4 font-sans select-text scrollbar-thin scrollbar-thumb-gold-dim">
                    {briefResult.split('\n\n').map((block, idx) => {
                      if (block.startsWith('###')) {
                        return (
                          <h4 key={idx} className="font-serif text-lg font-light text-gold tracking-wide mt-4 first:mt-0 pb-1 border-b border-dashed border-brand-border-mid">
                            {block.replace('###', '').trim()}
                          </h4>
                        );
                      }
                      if (block.startsWith('*')) {
                        return (
                          <p key={idx} className="font-sans italic text-gold-dim/90 bg-gold-glow p-3.5 border-l-2 border-gold rounded-r-md">
                            {block.replace(/\*/g, '').trim()}
                          </p>
                        );
                      }
                      return <p key={idx} className="text-gray-400 font-light leading-relaxed">{block}</p>;
                    })}
                  </div>

                  <div className="border-t border-brand-border-mid pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
                    <span className="font-serif italic text-[#666] text-xs">
                      "গল্পটা তোমার, কিন্তু সেটা বাজার কাঁপানোর দায়িত্ব আমাদের।"
                    </span>
                    <span className="font-condensed text-[9px] tracking-widest uppercase text-gold">
                      Brandem Creative Co-Pilot
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty-pane"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center p-8 text-center h-full my-auto"
                >
                  <div className="w-12 h-12 border border-brand-border flex items-center justify-center text-gold/30 rounded-full mb-4 group-hover:border-gold-dim transition-colors">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <h4 className="font-serif text-xl font-light text-white tracking-wide">
                    The Director's Screen is Empty
                  </h4>
                  <p className="text-[11.5px] text-gray-500 font-light max-w-[280px] leading-relaxed mt-2.5">
                    Submit your enterprise problem on the left. The strategy engine will render a highly polished blueprint tailored to your targets.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
