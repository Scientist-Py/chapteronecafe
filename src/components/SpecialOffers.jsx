import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flame, PlusCircle } from 'lucide-react';
import { specialOffers, addOns } from '../data/menuData';

export default function SpecialOffers() {
  return (
    <section id="offers" className="py-14 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Monday Offer Card */}
        {specialOffers.map((offer) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative rounded-2xl p-6 sm:p-8 border border-amber-200/80 bg-gradient-to-r from-amber-500/10 via-white to-white shadow-light-card"
          >
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B8860B]/10 text-[#B8860B] text-xs font-bold uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{offer.title}</span>
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-[#1D1D1F] font-heading">
                  {offer.details}
                </h3>
                <p className="text-xs text-secondaryText">
                  * {offer.terms}. Mention to server while ordering.
                </p>
              </div>

              <a
                href="#menu"
                className="w-full md:w-auto px-6 py-3 rounded-full font-bold bg-[#B8860B] text-white hover:bg-[#8A6405] transition flex items-center justify-center gap-2 text-xs sm:text-sm shadow-sm active:scale-98"
              >
                <Sparkles className="w-4 h-4" />
                <span>Claim Offer</span>
              </a>
            </div>
          </motion.div>
        ))}

        {/* Add-ons showcase */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-light-card">
          <div className="flex items-center gap-2 mb-4">
            <PlusCircle className="w-5 h-5 text-[#B8860B]" />
            <h4 className="text-base sm:text-lg font-bold text-[#1D1D1F] font-heading">
              Gourmet Meal Upgrades & Cheese Add-ons
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {addOns.map((addon) => (
              <div key={addon.name} className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/60 flex flex-col justify-between">
                <div>
                  <h5 className="font-semibold text-[#1D1D1F] text-xs mb-0.5">{addon.name}</h5>
                  <p className="text-[11px] text-secondaryText">{addon.desc}</p>
                </div>
                <div className="mt-2.5 text-[#B8860B] font-bold text-xs">
                  + ₹{addon.price}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
