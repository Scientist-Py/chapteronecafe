import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Award, ShieldCheck } from 'lucide-react';

export default function AboutSection() {
  const highlights = [
    { icon: <Award className="w-5 h-5 text-[#B8860B]" />, title: "Baghpat Landmark", desc: "Serving the famous 17-Inch Giant Pizza." },
    { icon: <ShieldCheck className="w-5 h-5 text-[#B8860B]" />, title: "100% Wholesome", desc: "Fresh high-fiber wheat momos & wheat burgers." },
    { icon: <Heart className="w-5 h-5 text-[#B8860B]" />, title: "Luxury Ambience", desc: "Crafted for memorable dining moments." }
  ];

  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-[#B8860B] text-xs font-semibold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OUR STORY</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold text-[#1D1D1F] font-heading leading-tight">
              Why Chapter One Cafe?
            </h2>

            <p className="text-xs sm:text-sm text-secondaryText leading-relaxed">
              We are proud to serve one of Baghpat's most unique cafe experiences with premium ambience, delicious food, fresh ingredients and the biggest pizza in town.
            </p>

            <p className="text-xs sm:text-sm text-secondaryText leading-relaxed">
              Whether you're coming with friends, family or your special someone, Chapter One Cafe is made for unforgettable moments.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {highlights.map((h) => (
                <div key={h.title} className="p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-xs">
                  <div className="mb-1.5">{h.icon}</div>
                  <h4 className="font-bold text-[#1D1D1F] text-xs mb-0.5">{h.title}</h4>
                  <p className="text-[11px] text-secondaryText leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-light-card space-y-4 text-center">
              <img 
                src="/logo.jpg" 
                alt="Chapter One Cafe Baghpat" 
                className="w-16 h-16 rounded-full mx-auto object-cover border border-gray-200 shadow-sm"
              />

              <div>
                <h3 className="text-lg font-bold text-[#1D1D1F] font-heading">
                  Chapter One Cafe
                </h3>
                <p className="text-xs text-secondaryText mt-0.5">
                  Baghpat Bypass, Uttar Pradesh
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-center">
                <div>
                  <div className="text-xl font-extrabold text-[#B8860B]">17"</div>
                  <div className="text-[11px] text-secondaryText">Giant Signature Pizza</div>
                </div>
                <div>
                  <div className="text-xl font-extrabold text-[#B8860B]">4.9 ★</div>
                  <div className="text-[11px] text-secondaryText">Customer Rating</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
