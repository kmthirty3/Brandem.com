/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export default function Stats() {
  const stats = [
    { number: '7+', label: 'Years of Corporate & Election Strategy' },
    { number: '2', label: 'BFDC Feature Films (Assistant Direction)' },
    { number: '1', label: 'National Parliament Election Won' },
    { number: '∞', label: 'Audience Desire Manufactured' },
  ];

  return (
    <div className="bg-brand-black border-y border-brand-border py-12 md:py-16 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 divide-y lg:divide-y-0 lg:divide-x divide-brand-border text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`flex flex-col items-center px-4 ${idx > 0 ? 'pt-8 lg:pt-0' : ''}`}
            >
              <span className="font-serif text-[2.8rem] md:text-5xl font-light text-gold tracking-tight select-none">
                {stat.number}
              </span>
              <span className="font-condensed text-[10px] tracking-widest text-gray-500 uppercase mt-2 max-w-[180px] leading-tight">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
