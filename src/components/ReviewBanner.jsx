import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ExternalLink, X, Heart } from 'lucide-react';
import { restaurantInfo } from '../data/menuData';

export default function ReviewBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Show polite review banner after 8 seconds of browsing
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-40">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: 'spring', damping: 22, stiffness: 300 }}
          className="bg-[#1D1D1F] text-white p-4 rounded-2xl shadow-2xl border border-gray-700/80 relative overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => setShowBanner(false)}
            className="absolute top-2.5 right-2.5 p-1 rounded-full text-gray-400 hover:text-white transition-colors"
            aria-label="Close review prompt"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3">
            {/* Gold Star Icon */}
            <div className="w-10 h-10 rounded-xl bg-[#B8860B]/20 text-[#B8860B] flex items-center justify-center flex-shrink-0 border border-[#B8860B]/40 mt-0.5">
              <Star className="w-5 h-5 fill-[#B8860B]" />
            </div>

            <div className="flex-1 space-y-1 pr-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-[10px] text-amber-400 font-bold ml-1">4.9 / 5</span>
              </div>

              <h4 className="text-xs font-bold text-white font-heading leading-tight">
                Loving your food at Chapter One?
              </h4>
              <p className="text-[11px] text-gray-300 leading-snug">
                Help Baghpat discover us! Tap below to leave a 5-star Google review.
              </p>

              <div className="pt-2">
                <a
                  href={restaurantInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowBanner(false)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#B8860B] hover:bg-amber-600 text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
                >
                  <span>Rate 5 Stars on Google</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
