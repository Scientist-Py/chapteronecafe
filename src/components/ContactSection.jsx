import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageCircle, Navigation, Clock, Sparkles } from 'lucide-react';
import { restaurantInfo } from '../data/menuData';

export default function ContactSection() {
  const whatsappUrl = `https://wa.me/${restaurantInfo.whatsappNumber}?text=${encodeURIComponent('Hi Chapter One Cafe! I would like to inquire or visit.')}`;

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-[#B8860B] text-xs font-semibold uppercase tracking-wider mb-2 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>VISIT US</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl font-extrabold text-[#1D1D1F] font-heading"
          >
            Find & Contact Us
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-light-card text-center space-y-5"
        >
          {/* Location Pin */}
          <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-[#B8860B]">
            <MapPin className="w-6 h-6" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#1D1D1F] mb-1 font-heading">
              Chapter One Cafe
            </h3>
            <p className="text-xs sm:text-sm text-secondaryText max-w-xs mx-auto leading-relaxed">
              📍 Chapter One Cafe, Baghpat Bypass,<br />
              Baghpat, Uttar Pradesh
            </p>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs text-secondaryText">
            <Clock className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>{restaurantInfo.openingHours}</span>
          </div>

          {/* Touch Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-gray-100">
            
            {/* Phone Button */}
            <a
              href={`tel:${restaurantInfo.phone}`}
              className="py-3 px-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-[#B8860B] text-[#1D1D1F] font-bold flex flex-col items-center gap-1 transition-all active:scale-98"
            >
              <Phone className="w-4 h-4 text-[#B8860B]" />
              <span className="text-[10px] uppercase text-secondaryText">Call Cafe</span>
              <span className="text-xs">{restaurantInfo.phoneFormatted}</span>
            </a>

            {/* Google Maps Button */}
            <a
              href={restaurantInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-[#1D1D1F] text-white font-bold flex flex-col items-center gap-1 transition-all active:scale-98 shadow-sm"
            >
              <Navigation className="w-4 h-4 text-[#B8860B]" />
              <span className="text-[10px] uppercase text-white/70">Navigate</span>
              <span className="text-xs">Google Maps</span>
            </a>

            {/* WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold flex flex-col items-center gap-1 transition-all active:scale-98"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-[10px] uppercase text-white/70">Instant Chat</span>
              <span className="text-xs">WhatsApp</span>
            </a>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
