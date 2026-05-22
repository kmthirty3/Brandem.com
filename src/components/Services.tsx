/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { PlayCircle, Stars, Landmark, Network } from 'lucide-react';
import { ServiceId } from '../types';

interface ServicesProps {
  onSelectService: (serviceId: ServiceId) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const pillars = [
    {
      id: 'tvc' as ServiceId,
      num: '01',
      icon: <PlayCircle className="w-5 h-5 text-gold" />,
      title: 'TVC / OVC Production',
      bangla: 'চলচ্চিত্রের মতো বিজ্ঞাপন',
      desc: 'Cinema-grade commercial production shot natively on our Sony FX3 package. Your narrative crafted beautifully to last over decades with detailed 3D color-grading and cinematic sound stages.',
      tags: ['Netflix Format', 'Cinematography', 'Color Grading', '3D Mockups'],
    },
    {
      id: 'pr' as ServiceId,
      num: '02',
      icon: <Stars className="w-5 h-5 text-gold" />,
      title: 'Artist Management & PR',
      bangla: 'তারকার আস্থা, brand এর শক্তি',
      desc: 'We do not run sterile databases; we call friends. Instant, direct dialogue pipelines with Bangladesh’s leading silver-screen actors, national musicians, and viral content architects.',
      tags: ['Celebrity Access', 'Influencer Waves', 'Crisis PR', 'Personal Dial'],
    },
    {
      id: 'strategy' as ServiceId,
      num: '03',
      icon: <Network className="w-5 h-5 text-gold" />,
      title: 'Brand Strategy & Growth',
      bangla: 'ব্যবসার স্থায়ী strategy',
      desc: 'Full-funnel campaign architectures. We analyze audience psychological triggers and construct robust consumer funnels that directly drive bottom-line monetization.',
      tags: ['Conversion Mapping', 'Funnels', 'Competitor Auditing', 'Copywriting'],
    },
    {
      id: 'political' as ServiceId,
      num: '04',
      icon: <Landmark className="w-5 h-5 text-gold" />,
      title: 'Political & Mass Campaigns',
      bangla: 'নির্বাচনী শক্তি · Mass Mobilization',
      desc: 'Proven at the highest national level. We designed and orchestrated the complete digital wave and voter mobilization maps for the Chandpur-4 parliamentary seat. If we can mobilize a constituency, we can lead your category.',
      tags: ['Electoral Tech', 'Crisis Response', 'Mass Communication', 'Outreach'],
    },
  ];

  const showcases = [
    {
      title: '"Beiman" Feature Film Production',
      role: 'Assistant Director under BFDC banner',
      actors: 'Bobby Haque & Aman Reza',
      desc: 'A massive benchmark in mainstream Bangladeshi cinema. Serving in the director’s suite, KM Abdul Kaium forged high emotional tension that represents the exact narrative caliber applied to and inherited by Brandem commercials.',
      banglaQuote: '"Beiman যেভাবে দর্শককে আবেগে টেনেছে — আমরা আপনার ব্র্যান্ডকেও শেষ ক্রেতা অবধি টেনে আনব।"',
    },
    {
      title: '"Anarkoli" Global TV Mega-Serial',
      role: 'Creative Production & Narrative Guidance',
      actors: 'National Ensemble Cast',
      desc: 'Orchestrating audience retention across hundreds of continuous episodes. This represents our understanding of mass psychology and attention metrics inside Bangladeshi household culture.',
      banglaQuote: 'মিলিয়ন ভিউজ, শতভাগ ধরে রাখা মনস্তত্ত্ব। আপনার ব্র্যান্ডের গল্পেও ঠিক এই ম্যাজিক হবে।',
    },
  ];

  return (
    <section id="weapons" className="relative bg-[#080808] py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        
        {/* Header Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16">
          <div className="md:col-span-7">
            <span className="font-condensed text-[10px] tracking-[0.2em] text-gold uppercase mb-3 inline-block">
              THE ARSENAL
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-light tracking-wide">
              চারটা weapon। <br />
              <em className="text-gold italic font-serif">একটাই চরম লক্ষ্য।</em>
            </h2>
          </div>
          <p className="md:col-span-5 text-xs md:text-sm text-gray-500 font-light leading-relaxed">
            Every capabilities pillar we marshal is focused entirely on positioning your enterprise as the undisputed leader in your sector.
            বাকিরা কেবল অনুকরণ করবে।
          </p>
        </div>

        {/* Core Services Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-brand-border border border-brand-border">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ backgroundColor: 'rgba(20, 20, 20, 1)' }}
              className="bg-[#0f0f0f] p-8 md:p-10 flex flex-col justify-between min-h-[380px] transition-colors relative group"
            >
              {/* Highlight bar animated */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-gold group-hover:w-full transition-all duration-500 ease-out" />
              
              <div className="flex justify-between items-start">
                <span className="font-condensed text-[11px] tracking-widest text-[#444] font-bold group-hover:text-gold/60 transition-colors uppercase">
                  Pillar {pillar.num}
                </span>
                <div className="border border-brand-border-mid p-2 group-hover:border-gold-dim transition-colors">
                  {pillar.icon}
                </div>
              </div>

              <div className="my-6">
                <h3 className="font-serif text-xl md:text-2xl text-white font-light group-hover:text-gold transition-colors">
                  {pillar.title}
                </h3>
                <p className="font-serif italic text-[11px] text-[#777] mt-1 select-none">
                  {pillar.bangla}
                </p>
                <p className="text-xs text-gray-400 font-light leading-relaxed mt-4">
                  {pillar.desc}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-condensed text-[8.5px] tracking-wider text-gray-500 border border-brand-border-mid px-2 py-0.5 uppercase group-hover:border-gold/30 group-hover:text-gold-dim transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onSelectService(pillar.id)}
                  className="font-condensed text-[10px] tracking-[0.2em] uppercase text-left text-gold hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Configure This Weapon <span>→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Alternating Cinematic Row Production Examples */}
        <div className="mt-20 border border-brand-border bg-brand-panel/10">
          <div className="p-8 border-b border-brand-border bg-[#0f0f0f]/50">
            <h3 className="font-condensed text-[11px] tracking-widest text-gold uppercase font-bold">
              CINEMATIC DIRECTION CREDENTIALS DETAIL:
            </h3>
          </div>
          
          <div className="divide-y divide-brand-border">
            {showcases.map((sc, idx) => (
              <div key={idx} className="p-8 md:p-12 md:flex gap-12 items-center">
                <div className="md:w-1/3 flex flex-col gap-3">
                  <span className="font-condensed text-[9px] tracking-widest text-gold uppercase border border-gold-dim/40 px-2 py-1 w-max">
                    {idx === 0 ? 'BFDC FEATURE CINEMA' : 'GLOBAL TELEVISION RELEASE'}
                  </span>
                  <h4 className="font-serif text-2xl text-white font-light tracking-wide leading-tight">
                    {sc.title}
                  </h4>
                  <p className="font-condensed text-[10px] tracking-wider text-gray-500 uppercase font-mono">
                    {sc.role}
                  </p>
                </div>
                
                <div className="md:w-2/3 mt-6 md:mt-0 font-light flex flex-col gap-4">
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                    {sc.desc}
                  </p>
                  <p className="font-serif italic text-[14px] text-gold pl-4 border-l border-gold-dim leading-snug">
                    "{sc.banglaQuote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
