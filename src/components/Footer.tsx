/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Mail, MapPin, Globe, Film } from 'lucide-react';

interface FooterProps {
  onOpenConsultation: () => void;
  onOpenDashboard: () => void;
}

export default function Footer({ onOpenConsultation, onOpenDashboard }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.pageYOffset - 70,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-brand-black border-t border-brand-border py-16 px-6 md:px-12 select-none relative overflow-hidden text-gray-500 font-sans">
      {/* Absolute faint branding glowing effect background */}
      <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-gold-glow blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-start justify-between gap-12 border-b border-brand-border pb-12">
        
        {/* Left Col: Studio branding statement */}
        <div className="max-w-xs flex flex-col gap-4">
          <h4 className="font-serif text-[20px] font-bold text-white tracking-[0.16em]">
            BRAN<span className="text-gold">DEM</span>
          </h4>
          <p className="text-xs text-gray-500 leading-relaxed font-light">
            Bangladesh's premier filmmaker-led, cinema-grade brand strategy and production agency. Registered studio at BFDC.
          </p>
          <div className="flex items-center gap-1.5 font-condensed text-[10px] tracking-widest text-gold uppercase font-bold animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>We Engineer Want</span>
          </div>
        </div>

        {/* Mid Col: Navigations split */}
        <div className="grid grid-cols-2 gap-8 text-xs font-light">
          
          <div className="flex flex-col gap-3">
            <h5 className="font-condensed text-[9px] tracking-widest text-[#444] uppercase font-bold mb-1">
              Navigate
            </h5>
            <a href="#weapons" onClick={(e) => handleScrollTo(e, '#weapons')} className="hover:text-gold transition-colors">
              Four Weapons
            </a>
            <a href="#director" onClick={(e) => handleScrollTo(e, '#director')} className="hover:text-gold transition-colors">
              The Director
            </a>
            <a href="#gear" onClick={(e) => handleScrollTo(e, '#gear')} className="hover:text-gold transition-colors">
              Cinema Arsenal
            </a>
            <a href="#proof" onClick={(e) => handleScrollTo(e, '#proof')} className="hover:text-gold transition-colors">
              Project Proofs
            </a>
          </div>

          <div className="flex flex-col gap-3 text-[11px]">
            <h5 className="font-condensed text-[9px] tracking-widest text-[#444] uppercase font-bold mb-1">
              Secure Operations
            </h5>
            <button onClick={onOpenDashboard} className="hover:text-gold transition-colors text-left font-condensed tracking-wider uppercase text-[10px] text-gray-500 font-bold">
              Leads Dashboard ➔
            </button>
            <button onClick={onOpenConsultation} className="hover:text-gold transition-colors text-left text-gold hover:underline">
              Request Strategy Call
            </button>
            <a href="https://www.studiobrandem.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors flex items-center gap-1">
              <Globe className="w-3 h-3 text-gold/60" />
              <span>Global Website</span>
            </a>
          </div>

        </div>

        {/* Right Col: Contact details info */}
        <div className="flex flex-col gap-4 max-w-xs text-xs font-light">
          <h5 className="font-condensed text-[9px] tracking-widest text-[#444] uppercase font-bold select-none text-left">
            Headquarter Node
          </h5>
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
            <div>
              <p className="text-gray-400 font-normal">Studio Brandem</p>
              <p className="text-gray-500 mt-0.5 leading-normal">BFDC certified studio office suite, Tejgaon, Dhaka, Bangladesh</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-gold shrink-0" />
            <a href="mailto:kmthirty3@gmail.com" className="text-gray-400 hover:text-gold transition-colors select-text">
              kmthirty3@gmail.com
            </a>
          </div>
        </div>

      </div>

      {/* Copy footer lines */}
      <div className="max-w-5xl mx-auto pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 font-condensed text-[10px] tracking-widest uppercase">
        <p className="text-gray-600">
          © {currentYear} Brandem Studio. All Rights Reserved. Founded by KM Abdul Kaium.
        </p>
        <div className="flex items-center gap-2 select-none text-gold/35">
          <Film className="w-3.5 h-3.5" />
          <span>Focal ratio calibrated</span>
        </div>
      </div>
    </footer>
  );
}
