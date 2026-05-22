/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Film, Award, TrendingUp, Group, Heart } from 'lucide-react';
import { CaseStudy } from '../types';

export default function CaseStudies() {
  const [activeTab, setActiveTab] = useState<'all' | 'media' | 'brands' | 'political'>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filterLabels = [
    { id: 'all' as const, label: 'All Projects' },
    { id: 'media' as const, label: 'Cinematic & TV' },
    { id: 'brands' as const, label: 'Brand Growth' },
    { id: 'political' as const, label: 'High-Stakes & NGO' },
  ];

  const cases: (CaseStudy & { filterType: 'media' | 'brands' | 'political'; icon: React.ReactNode })[] = [
    {
      id: 'case-beiman',
      title: '"Beiman"',
      subtitle: 'BFDC Feature Film',
      category: 'Cinematic Cinema Release',
      filterType: 'media',
      description: 'Supervised full production scheduling, emotional narrative transitions, and visual layout parameters. Starring Bobby Haque and Aman Reza. Certified by Bangladesh Film Development Corporation.',
      statNumber: 'AD',
      statLabel: 'Assistant Director / BFDC',
      banglaContext: 'চলচ্চিত্রের আবেগ সরাসরি ব্র্যান্ডের বিজ্ঞাপনে সংযোজন',
      icon: <Film className="w-5 h-5 text-gold" />,
    },
    {
      id: 'case-anarkoli',
      title: '"Anarkoli"',
      subtitle: 'Global TV Mega-Serial',
      category: 'Mass Entertainment Series',
      filterType: 'media',
      description: 'Creative and direction oversight of continuous television screenplays viewed by millions. Solidified our direct capture of traditional Bangladeshi household attention models.',
      statNumber: 'M+',
      statLabel: 'Voter & Household Viewers',
      banglaContext: 'মিলিয়ন দর্শকের মনস্তাত্ত্বিক মনোযোগ গ্রাস',
      icon: <Film className="w-5 h-5 text-gold" />,
    },
    {
      id: 'case-chandpur',
      title: 'Chandpur-4',
      subtitle: 'National Parliamentary Campaign',
      category: 'Electoral Digital Strategy',
      filterType: 'political',
      description: 'Drafted, scheduled, and secured the complete digital outreach, live counter-PR responses, virtual voter assembly routes, and social media platforms for the winning campaign.',
      statNumber: '100%',
      statLabel: 'Strategic Execution & Win',
      banglaContext: 'একটি সম্পূর্ণ সংসদীয় আসন জয় কৌশল',
      icon: <Award className="w-5 h-5 text-gold" />,
    },
    {
      id: 'case-edubase',
      title: 'Edubase Global',
      subtitle: 'EdTech Platform Growth',
      category: 'Corporate Digital Strategy',
      filterType: 'brands',
      description: 'Administered multi-channel content funnels and acquisition marketing tactics as core Digital Marketing Manager, establishing them as an EdTech industry leader.',
      statNumber: 'DMM',
      statLabel: 'Digital Manager Title',
      banglaContext: 'শিক্ষামূলক ব্র্যান্ডের ব্যবসায়িক রূপান্তর',
      icon: <TrendingUp className="w-5 h-5 text-gold" />,
    },
    {
      id: 'case-katabon',
      title: 'Katabononline',
      subtitle: 'E-commerce Growth Engine',
      category: 'Full-Scale Acquisition',
      filterType: 'brands',
      description: 'Constructed new digital buyer pipelines from ground zero as Chief Digital Strategist. Transformed web visitors into highly loyal, direct-converting product purchasers.',
      statNumber: 'HoD',
      statLabel: 'Head of Growth Admin',
      banglaContext: 'বিডি প্রথম অ্যানিমেল হাবের রিভিনিউ বৃদ্ধি',
      icon: <TrendingUp className="w-5 h-5 text-gold" />,
    },
    {
      id: 'case-ycbd',
      title: 'YCBD NGO',
      subtitle: 'Youth Community of BD',
      category: 'Social Movement Mobilization',
      filterType: 'political',
      description: 'Founder and Chairman of a pioneer non-profit mobilization network. This outlines our raw organizational leadership strength, driving large-scale community impact outside the screen.',
      statNumber: 'CEO',
      statLabel: 'Founding Chairman Structure',
      banglaContext: 'জাতীয় স্তরে তরুণদের একীকরণের মহাকাব্য',
      icon: <Heart className="w-5 h-5 text-gold" />,
    },
  ];

  const filteredCases = cases.filter(
    (item) => activeTab === 'all' || item.filterType === activeTab
  );

  return (
    <section id="proof" className="bg-[#080808] py-20 md:py-28 text-white select-none relative">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span className="font-condensed text-[10px] tracking-[0.2em] text-gold uppercase mb-3 inline-block">
              CAMPAIGN CASE PORTFOLIO
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-light tracking-wide">
              পদ্ধতি নিয়ে বড় কথা না বলে, <br />
              <em className="text-gold italic font-serif">সরাসরি প্রমাণ দেখুন।</em>
            </h2>
          </div>
          
          {/* Custom Tabs Navigation Filter */}
          <div className="flex flex-wrap gap-2 border-b md:border-b-0 border-brand-border-mid pb-2 md:pb-0">
            {filterLabels.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`font-condensed text-[10px] tracking-widest uppercase px-3 py-1.5 transition-colors ${
                  activeTab === item.id
                    ? 'border-b-2 border-gold text-white font-semibold'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento/Details Grid with Micro-animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCases.map((item) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="bg-[#0f0f0f] border border-brand-border hover:border-gold-dim transition-colors rounded p-6 flex flex-col justify-between h-[360px] relative overflow-hidden group shadow-md"
              >
                {/* Visual line highlights */}
                <div className="absolute top-0 left-0 h-[2px] bg-gold/50 w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-condensed text-[9px] tracking-widest text-[#555] group-hover:text-gold-dim transition-colors uppercase font-bold">
                      {item.category}
                    </span>
                    <div className="text-gold/60">{item.icon}</div>
                  </div>

                  <h3 className="font-serif text-2xl text-white font-light mt-2 group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-condensed text-[9.5px] tracking-wider text-gray-500 uppercase mt-0.5">
                    {item.subtitle}
                  </p>
                  
                  <p className="text-xs text-gray-400 font-light leading-relaxed mt-4 line-clamp-4">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-brand-border-mid pt-4">
                  {item.banglaContext && (
                    <p className="font-serif italic text-[#777] text-xs mb-3 group-hover:text-gray-400 transition-colors">
                      "{item.banglaContext}"
                    </p>
                  )}
                  
                  <div className="flex items-baseline gap-1.5 pt-1">
                    <span className="font-serif text-xl text-gold font-normal">{item.statNumber}</span>
                    <span className="font-condensed text-[9px] tracking-widest text-gray-500 uppercase">
                      {item.statLabel}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
