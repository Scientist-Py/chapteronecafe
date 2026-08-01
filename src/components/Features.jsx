import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Features() {
  const featureCards = [
    {
      icon: "🍕",
      title: "17 Inch Giant Pizza",
      desc: "The biggest pizza in Baghpat. Cut into 12 giant monster slices.",
      tag: "SIGNATURE"
    },
    {
      icon: "🌾",
      title: "Healthy Options",
      desc: "Fresh high-fiber wheat burgers, wheat momos & wholesome artisan food.",
      tag: "HEALTHY"
    },
    {
      icon: "🥤",
      title: "Refreshing Drinks",
      desc: "Hazelnut cold coffees, artisan mint mojitos & thick ice cream shakes.",
      tag: "ARTISAN"
    },
    {
      icon: "❤️",
      title: "Made Fresh",
      desc: "Every single order prepared fresh to order using quality ingredients.",
      tag: "QUALITY"
    }
  ];

  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-widest text-[#B8860B] uppercase mb-1.5"
          >
            CHAPTER ONE ADVANTAGE
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl font-bold text-[#1D1D1F] font-heading"
          >
            Crafted for Extraordinary Taste
          </motion.h2>
        </div>

        {/* 4 Light Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {featureCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-light-card hover:shadow-light-hover transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                    {card.icon}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-[9px] font-bold text-[#B8860B] border border-amber-200/60 tracking-wider uppercase">
                    {card.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#1D1D1F] mb-1.5 group-hover:text-[#B8860B] transition-colors">
                  {card.title}
                </h3>

                <p className="text-xs text-secondaryText leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-500 group-hover:text-[#B8860B]">
                <span>Discover</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
