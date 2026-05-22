/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, FolderLock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenConsultation: () => void;
  onOpenDashboard: () => void;
  leadsCount: number;
}

export default function Navbar({ onOpenConsultation, onOpenDashboard, leadsCount }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'The Director', href: '#director' },
    { label: 'Weapons', href: '#weapons' },
    { label: 'Certified Gear', href: '#gear' },
    { label: 'Proof', href: '#proof' },
    { label: 'AI Strategy Sandbox', href: '#ai-sandbox' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const headerOffset = 70;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-black/90 border-b border-brand-border backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => handleLinkClick(e, '#')}
          className="font-serif text-xl tracking-[0.15em] font-bold text-white transition-opacity hover:opacity-90"
        >
          BRAN<span className="text-gold">DEM</span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="font-condensed text-[12px] tracking-[0.16em] uppercase text-gray-400 hover:text-white relative py-1 group transition-colors"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Dashboard Icon Button */}
          <button
            onClick={onOpenDashboard}
            className="flex items-center gap-1.5 font-condensed text-[11px] tracking-wider text-gray-400 hover:text-gold border border-brand-border hover:border-gold-dim px-3 py-1.5 rounded transition-all bg-brand-panel/40"
            title="View Lead CRM Dashboard"
          >
            <FolderLock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline uppercase">Leads Dashboard</span>
            {leadsCount > 0 && (
              <span className="ml-1 bg-gold text-brand-black font-sans font-bold px-1.5 py-0.5 rounded-full text-[9px] min-w-[16px] h-4 flex items-center justify-center">
                {leadsCount}
              </span>
            )}
          </button>

          {/* Core CTA */}
          <button
            onClick={onOpenConsultation}
            className="hidden sm:flex items-center gap-1.5 font-condensed text-[11px] tracking-[0.18em] uppercase text-gold border border-gold-dim hover:border-gold px-4 py-2 transition-all duration-300 hover:bg-gold hover:text-brand-black fill-current"
          >
            <Sparkles className="w-3 h-3" />
            <span>Strategy Call</span>
          </button>

          {/* Hamburger (Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 lg:hidden text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 bg-brand-black z-40 flex flex-col justify-center items-center px-6 gap-6"
          >
            {menuItems.map((item, idx) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="font-serif text-2xl text-gray-300 hover:text-gold tracking-wide transition-colors"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {item.label}
              </motion.a>
            ))}

            <motion.button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex items-center gap-2 font-condensed text-sm tracking-[0.2em] uppercase text-brand-black bg-gold font-bold px-8 py-3 w-64 justify-center"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Strategy Call</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
