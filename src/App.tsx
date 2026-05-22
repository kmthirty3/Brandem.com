/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Manifesto from './components/Manifesto';
import Services from './components/Services';
import Gear from './components/Gear';
import CaseStudies from './components/CaseStudies';
import AiBriefGenerator from './components/AiBriefGenerator';
import ConsultationModal from './components/ConsultationModal';
import LeadsDashboard from './components/LeadsDashboard';
import Footer from './components/Footer';
import { Lead, ServiceId } from './types';

export default function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<ServiceId | ''>('');

  // Fetch registered leads on mount
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('/api/leads');
        if (response.ok) {
          const data = await response.json();
          setLeads(data);
        }
      } catch (err) {
        console.error('Failed to sync initial lead logs:', err);
      }
    };
    fetchLeads();
  }, []);

  const handleLeadAdded = (newLead: Lead) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleSelectService = (serviceId: ServiceId) => {
    setPreselectedService(serviceId);
    setIsConsultationOpen(true);
  };

  const handleOpenConsultationModal = () => {
    setPreselectedService('');
    setIsConsultationOpen(true);
  };

  return (
    <div className="bg-brand-black min-h-screen flex flex-col font-sans select-none relative selection:bg-gold-dim selection:text-white">
      {/* Immersive Background Lens Gradient Flare */}
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-gold-glow/5 blur-[120px] rounded-full pointer-events-none select-none z-0" />
      <div className="absolute top-[60%] left-[-10%] w-[450px] h-[450px] bg-gold-glow/4 blur-[130px] rounded-full pointer-events-none select-none z-0" />

      {/* Main Page Layout Wrapper */}
      <div className="relative z-10 flex flex-col flex-1">
        
        {/* Navigation Core */}
        <Navbar
          onOpenConsultation={handleOpenConsultationModal}
          onOpenDashboard={() => setIsDashboardOpen(true)}
          leadsCount={leads.length}
        />

        {/* Hero Banner Section */}
        <Hero onOpenConsultation={handleOpenConsultationModal} />

        {/* Agency stats overview bar */}
        <Stats />

        {/* Manifesto segment - "About KM Abdul Kaium" */}
        <Manifesto />

        {/* capabilities grid - "The Four Weapons" */}
        <Services onSelectService={handleSelectService} />

        {/* Gear specification module */}
        <Gear />

        {/* Filmstrip work studies */}
        <CaseStudies />

        {/* Interactive AI Campaign Strategy Sandbox and brief constructor */}
        <AiBriefGenerator onLeadAdded={handleLeadAdded} />

        {/* Footer info aggregator */}
        <Footer
          onOpenConsultation={handleOpenConsultationModal}
          onOpenDashboard={() => setIsDashboardOpen(true)}
        />

      </div>

      {/* Strategy call request booking portal dialog */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        onLeadAdded={handleLeadAdded}
        preselectedService={preselectedService}
      />

      {/* Private lead database and strategic analyzer dashboard CRM */}
      <LeadsDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        leads={leads}
        onLeadsUpdated={setLeads}
      />
    </div>
  );
}
