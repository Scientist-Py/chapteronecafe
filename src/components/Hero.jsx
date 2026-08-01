import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Pizza, Flame, Wheat, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden bg-gradient-to-b from-[#FAFAFA] via-white to-[#FAFAFA]">
      
      {/* Decorative Subtle Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-amber-100/40 via-yellow-50/30 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Top Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-[#B8860B] text-xs font-bold tracking-wide uppercase shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chapter One Cafe • Baghpat</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1D1D1F] tracking-tight font-heading leading-tight max-w-4xl mx-auto"
        >
          Baghpat's Biggest Pizza & <span className="text-[#B8860B]">Wholesome Healthy Bites</span>
        </motion.h1>

        {/* Short & Direct Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-secondaryText max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Home of the famous <strong className="text-[#1D1D1F] font-semibold">17-inch Giant Pizza</strong>, 100% high-fiber <strong className="text-[#1D1D1F] font-semibold">wheat burgers & wheat momos</strong>, and handcrafted artisan drinks.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-2 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#menu"
            className="px-6 py-3.5 rounded-full bg-[#1D1D1F] text-white hover:bg-[#B8860B] font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 group"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#contact"
            className="px-6 py-3.5 rounded-full bg-white text-[#1D1D1F] border border-gray-200 hover:border-[#B8860B] hover:text-[#B8860B] font-bold text-xs sm:text-sm shadow-xs transition-all duration-200"
          >
            Visit Cafe Location
          </a>
        </motion.div>

        {/* 3 Core Highlights (Clean & Direct) */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto"
        >
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-apple-light text-left flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#B8860B] flex items-center justify-center flex-shrink-0 font-bold">
              🍕
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#1D1D1F] font-heading">17-Inch Giant Pizza</h3>
              <p className="text-[11px] text-secondaryText mt-0.5">12 colossal slices built for epic sharing.</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-apple-light text-left flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-green-50 text-green-700 flex items-center justify-center flex-shrink-0 font-bold">
              🌾
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#1D1D1F] font-heading">Healthy Wheat Options</h3>
              <p className="text-[11px] text-secondaryText mt-0.5">Wholesome wheat burgers & wheat momos.</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-apple-light text-left flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0 font-bold">
              🧋
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#1D1D1F] font-heading">Artisan Drinks & Coffees</h3>
              <p className="text-[11px] text-secondaryText mt-0.5">Hazelnut cold coffee, mojitos & shakes.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
