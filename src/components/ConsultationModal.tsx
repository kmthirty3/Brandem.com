/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, AlertCircle, CheckCircle, Smartphone } from 'lucide-react';
import { ServiceId } from '../types';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadAdded: (newLead: any) => void;
  preselectedService?: ServiceId | '';
}

export default function ConsultationModal({
  isOpen,
  onClose,
  onLeadAdded,
  preselectedService = '',
}: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: preselectedService || '',
    challenge: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.email || !formData.challenge) {
      setError('Please fill in Name, Email, Brand/Company, and core Challenge.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Our backend registry is offline. Please retry.');
      }

      const registeredLead = await response.json();
      setSuccess(true);
      onLeadAdded(registeredLead);
    } catch (err: any) {
      setError(err?.message || 'Server error booking consultation.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      service: '',
      challenge: '',
    });
    setError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-brand-black/95 backdrop-blur-sm"
          />

          {/* Core Dialog Content Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-brand-off border border-brand-border-mid w-full max-w-lg p-8 rounded relative shadow-2xl overflow-y-auto max-h-[90vh] z-10 font-sans"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-1"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {!success ? (
              <>
                <div className="mb-6">
                  <span className="font-condensed text-[9px] tracking-[0.2em] text-gold uppercase mb-1.5 inline-block">
                    RESTRICTED PRIVATE ACCESS
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-light text-white leading-tight">
                    Request Strategy Session
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 font-light">
                    KM Abdul Kaium reviews every single consultation request personally. We take on a strictly limited number of strategic brand partnerships each quarter.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-condensed text-[9.5px] tracking-wider text-gray-500 uppercase mb-1 font-bold">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="KM Abdul Kaium"
                      required
                      className="w-full bg-brand-black border border-brand-border px-4 py-2 text-xs font-light text-white outline-none focus:border-gold-dim rounded transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-condensed text-[9.5px] tracking-wider text-gray-500 uppercase mb-1 font-bold">
                        Company / Brand *
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Brandem Studio"
                        required
                        className="w-full bg-brand-black border border-brand-border px-4 py-2 text-xs font-light text-white outline-none focus:border-gold-dim rounded transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-condensed text-[9.5px] tracking-wider text-gray-500 uppercase mb-1 font-bold">
                        WhatsApp / Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+8801..."
                        className="w-full bg-brand-black border border-brand-border px-4 py-2 text-xs font-light text-white outline-none focus:border-gold-dim rounded transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-condensed text-[9.5px] tracking-wider text-gray-500 uppercase mb-1 font-bold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="kmthirty3@gmail.com"
                      required
                      className="w-full bg-brand-black border border-brand-border px-4 py-2 text-xs font-light text-white outline-none focus:border-gold-dim rounded transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-condensed text-[9.5px] tracking-wider text-gray-500 uppercase mb-1 font-bold">
                      Primary Weapon Needed
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full bg-brand-black border border-brand-border px-4 py-2 text-xs font-light text-white outline-none focus:border-gold-dim rounded transition-colors cursor-pointer appearance-none"
                    >
                      <option value="">Select Service Area</option>
                      <option value="tvc">TVC / OVC Cinematic Production</option>
                      <option value="pr">Artist & PR Relations</option>
                      <option value="strategy">High-Stakes Brand Strategy</option>
                      <option value="political">Political & Mass Campaigns</option>
                      <option value="full">Comperehensive Growth Alliance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-condensed text-[9.5px] tracking-wider text-gray-500 uppercase mb-1 font-bold">
                      Your Brand Challenge & Target Goals *
                    </label>
                    <textarea
                      name="challenge"
                      value={formData.challenge}
                      onChange={handleInputChange}
                      placeholder="Briefly explain what you want to achieve. Where do you want to see your brand?"
                      required
                      rows={3}
                      className="w-full bg-brand-black border border-brand-border px-4 py-2 text-xs font-light text-white outline-none focus:border-gold-dim rounded transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-950/40 border border-red-900 text-xs text-red-200 rounded">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 font-condensed text-xs font-semibold tracking-[0.2em] uppercase bg-gold text-brand-black py-4 hover:bg-[#dfbd58] transition-all cursor-pointer disabled:opacity-50 select-none"
                  >
                    <Sparkles className="w-4 h-4 fill-current animate-pulse" />
                    <span>{loading ? 'Sending Request...' : 'Submit Request — আমি প্রস্তুত'}</span>
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 flex flex-col items-center"
              >
                <div className="w-12 h-12 bg-gold-glow border border-gold rounded-full flex items-center justify-center text-gold mb-6 select-none">
                  <CheckCircle className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="font-serif text-2xl text-white font-medium mb-3">
                  Request <span className="text-gold">Received.</span>
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed max-w-[340px]">
                  আপনার ইনকোয়ারিটি আমাদের ডিজিটাল সুরক্ষিত ডাটাবেসে সফলভাবে নিবন্ধিত হয়েছে।
                  <br /><br />
                  **KM Abdul Kaium** will review your details personally. Expect a confidential response within 24 hours.
                </p>

                <div className="mt-8 pt-6 border-t border-brand-border w-full flex items-center justify-center gap-2 text-[10px] uppercase font-condensed tracking-wider text-gray-500 select-none">
                  <Smartphone className="w-3.5 h-3.5 text-gold animate-bounce" />
                  <span>Expect a direct WhatsApp message</span>
                </div>

                <button
                  onClick={handleClose}
                  className="mt-8 font-condensed text-[11px] tracking-widest text-[#777] hover:text-white uppercase font-bold border-b border-[#333] hover:border-white transition-all pb-0.5"
                >
                  Return to Screen Box
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
