/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Briefcase, Film, HeartHandshake } from 'lucide-react';

export default function Manifesto() {
  const [imgError, setImgError] = useState(false);

  const credentials = [
    {
      icon: <Film className="w-4 h-4 text-gold shrink-0" />,
      text: 'Assistant Director — Feature Film "Beiman" (Starring Aman Reza & Bobby Haque) · BFDC certified',
    },
    {
      icon: <Award className="w-4 h-4 text-gold shrink-0" />,
      text: 'Creative Lead — TV Mega-Serial "Anarkoli" · Global TV Series',
    },
    {
      icon: <Briefcase className="w-4 h-4 text-gold shrink-0" />,
      text: 'Ex-Digital Marketing Manager · Edubase Global Platform',
    },
    {
      icon: <Award className="w-4 h-4 text-gold shrink-0" />,
      text: 'Head of Digital Marketing · Katabononline.com E-commerce',
    },
    {
      icon: <HeartHandshake className="w-4 h-4 text-gold shrink-0" />,
      text: 'Founder & CEO · Youth Community of Bangladesh (YCBD) NGO',
    },
    {
      icon: <Film className="w-4 h-4 text-gold shrink-0" />,
      text: 'Sole Chief Digital Architect — Chandpur-4 National Parliament Election Campaign',
    },
  ];

  return (
    <section id="director" className="relative bg-[#0f0f0f] border-b border-brand-border py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Visual Showcase - Director Portrait Showcase */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 relative aspect-[4/5] bg-brand-panel/40 border border-brand-border overflow-hidden rounded group shadow-2xl"
        >
          {/* Simulated cinematic viewfinder borders */}
          <div className="absolute top-4 left-4 border-t border-l border-gold/40 w-8 h-8 rounded-tl-sm pointer-events-none z-20" />
          <div className="absolute top-4 right-4 border-t border-r border-gold/40 w-8 h-8 rounded-tr-sm pointer-events-none z-20" />
          <div className="absolute bottom-4 left-4 border-b border-l border-gold/40 w-8 h-8 rounded-bl-sm pointer-events-none z-20" />
          <div className="absolute bottom-4 right-4 border-b border-r border-gold/40 w-8 h-8 rounded-br-sm pointer-events-none z-20" />

          {/* Golden abstract composition fallback OR user image */}
          {!imgError ? (
            <img
              src="/director.jpg"
              alt="KM Abdul Kaium"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.12] brightness-[0.92] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-700 z-0"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[70%] h-[70%] border border-brand-border-mid flex items-center justify-center">
                <div className="w-[85%] h-[85%] border border-gold/10 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gold/25" />
                </div>
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent z-10" />
          
          {/* Caption info inside portrait cell */}
          <div className="absolute bottom-6 left-6 right-6 z-20">
            <h4 className="font-serif text-lg text-white font-medium tracking-wide">KM ABDUL KAIUM</h4>
            <p className="font-condensed text-[10px] tracking-[0.16em] text-gold uppercase mt-1">
              Filmmaker · Director · Chief Strategist
            </p>
          </div>
        </motion.div>

        {/* Biography Content / Manifesto Section */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-condensed text-[10px] tracking-[0.2em] text-gold uppercase mb-3 inline-block">
              THE DIRECTOR'S FRAME
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-light tracking-wide mb-6 leading-tight">
              গল্পটা তোমার। কিন্তু কে বলবে — <br />
              <em className="text-gold italic font-serif">সেটাই আসল ব্যাপার।</em>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[13.5px] text-gray-400 font-light leading-relaxed mb-6"
          >
            Brandem is not a traditional boutique media agency. It is a director's chair for your enterprise.
            Led by <strong className="text-gold font-normal">KM Abdul Kaium</strong>, a certified Filmmaker, Director,
            and Screenplay specialist with an extensive BFDC (Bangladesh Film Development Corporation) backing,
            we translate cinematic tension and visual gravity into immediate commercial conversions. 
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-l border-gold pl-4 py-1 mb-8"
          >
            <p className="font-serif italic text-lg text-gray-300 leading-snug">
              "বেশিরভাগ agency তোমাকে content দিবে। আমরা তোমার audience-কে convert করার আকাঙ্ক্ষা তৈরি করি।"
            </p>
          </motion.div>

          {/* Credentials Listing */}
          <div className="space-y-4">
            <h3 className="font-condensed text-[11px] tracking-widest text-[#666] uppercase font-bold">
              PORTFOLIO CREDS & DIRECTORY:
            </h3>
            <ul className="space-y-3">
              {credentials.map((cred, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="flex items-start gap-3.5 text-gray-400 text-xs font-light leading-tight hover:text-white transition-colors"
                >
                  {cred.icon}
                  <span>{cred.text}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
