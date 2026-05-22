/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Play, ArrowDown, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenConsultation: () => void;
}

export default function Hero({ onOpenConsultation }: HeroProps) {
  const scrollDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector('#director');
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.pageYOffset - 70,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden pt-16">
      {/* Cinematic Film-Strip and Grid Layout Backdrop */}
      <div className="absolute inset-0 bg-brand-black cinematic-grain" aria-hidden="true">
        {/* Animated simulation of widescreen camera grid frames */}
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-[2px] opacity-40">
          <div className="bg-gradient-to-br from-[#050505] to-[#12100e] relative overflow-hidden"></div>
          <div className="bg-gradient-to-br from-[#0c0c07] to-[#0e0c0a] relative overflow-hidden"></div>
          <div className="bg-gradient-to-br from-[#040606] to-[#0b0c0c] relative overflow-hidden"></div>
          <div className="bg-gradient-to-br from-[#080806] to-[#0d0d08] relative overflow-hidden"></div>
          <div className="bg-gradient-to-br from-[#060806] to-[#0a0c0a] relative overflow-hidden"></div>
          <div className="bg-gradient-to-br from-[#080606] to-[#0c0a08] relative overflow-hidden"></div>
        </div>

        {/* Dynamic sweeping lens flare overlay */}
        <motion.div
          animate={{
            x: ['-100%', '100%'],
            skewX: [-5, -5],
          }}
          transition={{
            repeat: Infinity,
            duration: 9,
            ease: 'easeInOut',
          }}
          className="absolute top-0 bottom-0 w-[2px] left-[30%] bg-gradient-to-b from-transparent via-gold/15 to-transparent pointer-events-none"
        />

        {/* Radial dark vignettes to frame our text beautifully */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-black/60 to-brand-black z-10 pointer-events-none" />
      </div>

      {/* Main Core Content Container */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 md:px-12 pb-16 md:pb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div className="max-w-[700px] flex flex-col items-start">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-condensed text-[11px] tracking-[0.25em] text-gold mb-4 uppercase"
          >
            STUDIO BRANDEM • FILMMATION & STRATEGY HOUSE
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-serif text-[2.6rem] sm:text-[4vw] md:text-[4.6rem] leading-[1.1] font-light text-white tracking-wide mb-6"
          >
            আমরা বিজ্ঞাপন বানাই না।<br />
            We <em className="text-gold italic font-serif">Engineer</em> Want.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[14px] md:text-base text-gray-400 font-light max-w-[500px] leading-relaxed mb-8"
          >
            Bangladesh's first filmmaker-led, cinema-grade brand strategy agency. 
            BFDC-certified commercial direction meet elite growth systems. 
            Netflix-approved visual assets, purpose-built to convert.
          </motion.p>

          {/* Core Interactive Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap items-center gap-5 md:gap-7"
          >
            <button
              onClick={onOpenConsultation}
              className="group flex items-center gap-2 font-condensed text-[12px] font-bold tracking-[0.2em] uppercase bg-gold text-brand-black px-7 py-3.5 transition-all duration-300 hover:bg-[#dfbd58] hover:tracking-[0.24em]"
            >
              <span>Book Strategy Session</span>
              <Play className="w-3 h-3 fill-current group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#director"
              onClick={scrollDown}
              className="group flex items-center gap-2 font-condensed text-[12px] tracking-[0.2em] uppercase text-gray-400 hover:text-white transition-colors py-2"
            >
              <span>The Director's Frame</span>
              <ArrowDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform text-gold" />
            </a>
          </motion.div>
        </div>

        {/* Widescreen Technical Overlay Badging */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="hidden md:flex flex-col items-end gap-1 font-condensed text-right select-none border-r-2 border-gold/40 pr-4"
        >
          <span className="text-[10px] tracking-widest text-gray-500 uppercase">Netflix Specification grade</span>
          <span className="text-[11px] tracking-wider text-gold uppercase font-serif italic">Sony FX3 Rig / certified</span>
          <span className="text-[10px] tracking-wider text-gray-400 uppercase">BFDC Certified Director</span>
        </motion.div>
      </div>

      {/* Decorative vertical center line pointing down */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 opacity-75">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-10 bg-gradient-to-b from-transparent via-gold-dim to-gold"
        />
      </div>
    </section>
  );
}
