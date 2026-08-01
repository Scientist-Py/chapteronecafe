import React from 'react';
import { motion } from 'framer-motion';

export default function Preloader() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAFAFA]"
    >
      <div className="relative flex items-center justify-center mb-5">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 rounded-full border-2 border-gray-200 border-t-[#B8860B]"
        />
        <img 
          src="/logo.jpg" 
          alt="Chapter One Cafe" 
          className="w-14 h-14 rounded-full absolute object-cover border border-gray-200 shadow-sm"
        />
      </div>
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-base font-bold tracking-widest text-[#1D1D1F] uppercase"
      >
        Chapter One Cafe
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.3 }}
        className="text-xs text-secondaryText tracking-wider mt-0.5"
      >
        BAGHPAT, UTTAR PRADESH
      </motion.p>
    </motion.div>
  );
}
