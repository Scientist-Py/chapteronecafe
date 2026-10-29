import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative pt-24 pb-14 sm:pt-32 sm:pb-20 overflow-hidden bg-gradient-to-b from-[#FAFAFA] via-white to-[#FAFAFA]">
      
      {/* Decorative Subtle Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-amber-100/30 via-yellow-50/20 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Top Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50/90 border border-amber-200/80 text-[#B8860B] text-xs font-bold tracking-wide uppercase shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chapter One Cafe • Baghpat</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1D1D1F] tracking-tight font-heading leading-tight max-w-3xl mx-auto"
        >
          Artisanal Food & <span className="text-[#B8860B]">Refreshing Craft Sips</span>
        </motion.h1>

        {/* Direct & Clean Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-sm sm:text-base text-secondaryText max-w-xl mx-auto font-normal leading-relaxed"
        >
          Welcome to Chapter One Cafe. Experience handcrafted gourmet pizzas, freshly prepared burgers, wraps, pastas, and signature beverages in a cozy ambience.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pt-2 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#menu"
            className="px-7 py-3.5 rounded-full bg-[#1D1D1F] text-white hover:bg-[#B8860B] font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 group"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#contact"
            className="px-7 py-3.5 rounded-full bg-white text-[#1D1D1F] border border-gray-200 hover:border-[#B8860B] hover:text-[#B8860B] font-bold text-xs sm:text-sm shadow-xs transition-all duration-200"
          >
            Visit Cafe Location
          </a>
        </motion.div>

      </div>
    </section>
  );
}
