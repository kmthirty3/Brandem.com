/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Camera, Layers, Disc, Compass, Zap } from 'lucide-react';
import { GearItem } from '../types';

export default function Gear() {
  const gears: (GearItem & { icon: React.ReactNode })[] = [
    {
      id: 'gear-fx3',
      name: 'Sony FX3',
      category: 'PRIMARY CINEMA RIG',
      badge: 'Netflix Approved',
      spec: 'Full Frame, 12.1MP dual-native ISO line cameras. Native S-Cinetone colors.',
      description: 'The standard choice for high-end boutique commercials and streaming platform deliverables. Unmatched low-light color performance.',
      icon: <Camera className="w-5 h-5 text-gold" />,
    },
    {
      id: 'gear-a7iv',
      name: 'Sony A7 IV',
      category: 'B-CAMERA SETUPS',
      spec: '33MP high-definition sensor system. 4K high frames secondary angles B-rolls.',
      description: 'Used perfect matching in multi-camera interviews, secondary commercial details and swift social media deliverables.',
      icon: <Layers className="w-5 h-5 text-gold" />,
    },
    {
      id: 'gear-sigma85',
      name: 'Sigma 85mm f/1.4',
      category: 'CINEMATIC GLASS',
      spec: 'Art lens high depth-compression, ultra fast lens for portrait focus and isolating products.',
      description: 'The creative standard for isolating subjects and creating signature cinematic background compression.',
      icon: <Disc className="w-5 h-5 text-gold" />,
    },
    {
      id: 'gear-rs4pro',
      name: 'DJI RS4 Pro',
      category: 'CAMERA STABILIZATION',
      spec: 'Carbon fiber motorized stabilizers with AI target trackers autofocusing accessories.',
      description: 'Seamless motion, complex tracking shots, crane emulation, and active vehicle-mount sweeps.',
      icon: <Zap className="w-5 h-5 text-gold" />,
    },
    {
      id: 'gear-drone',
      name: 'Pro Aerial Wing',
      category: 'AERIAL CAPTURE',
      spec: 'Integrated active optical grids, landscape sweeps, corporate asset overview mapping.',
      description: 'Adding cinematic scope, scaling, and high industrial value to political campaign mobilization and location layouts.',
      icon: <Compass className="w-5 h-5 text-gold" />,
    },
  ];

  return (
    <section id="gear" className="relative bg-[#0f0f0f] border-b border-brand-border py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <span className="font-condensed text-[10px] tracking-[0.2em] text-gold uppercase mb-3 inline-block">
              THE ARSENAL SPECIFICATIONS
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-light tracking-wide">
              Netflix-grade gear. <br />
              <em className="text-gold italic font-serif">No compromise.</em>
            </h2>
          </div>
          <p className="max-w-[320px] text-xs text-gray-500 font-light leading-relaxed md:text-right select-none">
            আমাদের গিয়ার লিস্টই প্রমাণ করে — ব্র্যান্ডেম কোনো সাধারণ এজেন্সি নয়। এটি একটি পুরোদস্তুর প্রোডাকশন হাউস।
          </p>
        </div>

        {/* Custom Gear Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[1px] bg-brand-border border border-brand-border select-none">
          {gears.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-brand-panel/30 p-6 flex flex-col justify-between min-h-[300px] hover:bg-brand-panel/65 transition-colors group relative"
            >
              <div>
                {/* Header info */}
                <div className="flex justify-between items-start mb-6">
                  <span className="font-condensed text-[8.5px] tracking-[0.16em] text-[#666] group-hover:text-gold-dim transition-colors uppercase">
                    {item.category}
                  </span>
                  {item.badge && (
                    <span className="font-condensed text-[7px] tracking-wider bg-gold text-brand-black px-1.5 py-0.5 uppercase font-extrabold rounded-sm mt-0.5">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Display Placeholder Grid */}
                <div className="aspect-square bg-brand-black/40 border border-brand-border-mid flex items-center justify-center relative rounded mb-6 overflow-hidden">
                  <div className="absolute top-2 left-2 border-t border-l border-brand-border-mid w-3 h-3" />
                  <div className="absolute bottom-2 right-2 border-b border-r border-brand-border-mid w-3 h-3" />
                  {item.icon}
                </div>

                {/* Info Text */}
                <h4 className="font-serif text-lg text-white font-normal group-hover:text-gold transition-colors">
                  {item.name}
                </h4>
                <p className="text-[10px] text-gray-500 leading-normal tracking-wide mt-2">
                  {item.spec}
                </p>
              </div>

              <p className="text-[11px] text-[#666] leading-relaxed mt-4 group-hover:text-[#999] transition-colors border-t border-brand-border pt-4">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Small technical disclosure footer */}
        <div className="mt-8 text-center select-none font-mono text-[9px] text-gray-600 tracking-wider">
          Sony FX3 Cine & Sigma Art Systems • Log-3 Gamma • Sound Devices Mix-Pre Audio Setup
        </div>

      </div>
    </section>
  );
}
