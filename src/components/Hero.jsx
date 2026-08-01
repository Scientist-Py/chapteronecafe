import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Utensils, MapPin, ArrowRight } from 'lucide-react';

export default function Hero() {
  const healthyCards = [
    {
      icon: "🥟",
      title: "Healthy Wheat Momos",
      desc: "100% wholesome wheat steamed & crispy kurkure momos stuffed with fresh paneer & veggies.",
      tag: "HEALTHY",
      filterId: "Momos"
    },
    {
      icon: "🍔",
      title: "Wholesome Wheat Burgers",
      desc: "Crafted with healthy high-fiber wheat buns, crisp vegetable patties & gourmet sauces.",
      tag: "POPULAR",
      filterId: "Burger"
    },
    {
      icon: "🍕",
      title: "17-Inch Giant Pizza",
      desc: "Baghpat's famous monster crust pizza cut into 12 colossal slices. Built for sharing.",
      tag: "SIGNATURE",
      filterId: "Pizza"
    },
    {
      icon: "🧋",
      title: "Artisan Coffees & Shakes",
      desc: "Handcrafted hazelnut cold coffees, refreshing mint mojitos & rich thick milkshakes.",
      tag: "REFRESHING",
      filterId: "Cold Coffee"
    }
  ];

  return (
    <section id="hero" className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
      
      {/* Ambient Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-[#B8860B]/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto z-10">
        
        {/* Top Hero Heading Area */}
        <div className="text-center flex flex-col items-center mb-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-[#B8860B] text-xs font-semibold mb-4 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="tracking-wider uppercase text-[10px] sm:text-xs">CHAPTER ONE CAFE • BAGHPAT</span>
          </motion.div>

          {/* New Clean Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#1D1D1F] font-heading leading-tight mb-4 max-w-3xl"
          >
            Delicious Gourmet Food <br className="hidden sm:block" />
            <span className="text-[#B8860B]">& Healthy Delights</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-secondaryText max-w-2xl font-normal leading-relaxed mb-6"
          >
            Serving fresh high-fiber wheat burgers, healthy wheat momos, Baghpat's signature 17-inch giant pizza, cold coffees & thick shakes.
          </motion.p>

          {/* Touch Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto"
          >
            <a
              href="#menu"
              className="w-full sm:w-auto px-7 py-3 rounded-full font-bold text-white bg-[#1D1D1F] hover:bg-[#B8860B] transition-all duration-200 shadow-sm active:scale-98 flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              <Utensils className="w-4 h-4 text-[#B8860B]" />
              <span>View Digital Menu</span>
            </a>

            <a
              href="#contact"
              className="w-full sm:w-auto px-7 py-3 rounded-full font-semibold text-[#1D1D1F] bg-white border border-gray-200 hover:border-[#B8860B] transition-all duration-200 shadow-xs active:scale-98 flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              <MapPin className="w-4 h-4 text-[#B8860B]" />
              <span>Visit Cafe</span>
            </a>
          </motion.div>
        </div>

        {/* HEALTHY HIGHLIGHT CARDS GRID */}
        <div className="mt-8 pt-6 border-t border-gray-200/80">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-bold text-[#1D1D1F] font-heading">
              Our Healthy & Signature Specialties
            </h2>
            <a href="#menu" className="text-xs font-semibold text-[#B8860B] hover:underline flex items-center gap-1">
              View All <span>→</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {healthyCards.map((card, idx) => (
              <motion.a
                key={card.title}
                href="#menu"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                whileHover={{ y: -3 }}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-light-card hover:shadow-light-hover transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
                      {card.icon}
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-[9px] font-bold text-[#B8860B] border border-amber-200/60 uppercase">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#1D1D1F] mb-1 group-hover:text-[#B8860B] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs text-secondaryText leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-gray-500 group-hover:text-[#B8860B]">
                  <span>Explore in Menu</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
