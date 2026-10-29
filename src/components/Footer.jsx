import React from 'react';
import { Instagram, MessageCircle, MapPin, Heart } from 'lucide-react';
import { restaurantInfo } from '../data/menuData';

export default function Footer() {
  return (
    <footer className="bg-white text-secondaryText border-t border-gray-200 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-100">
        
        {/* Brand */}
        <div className="space-y-2.5 md:col-span-1">
          <div className="flex items-center gap-2">
            <img 
              src="/logo.jpg" 
              alt="Chapter One Cafe" 
              className="w-8 h-8 rounded-full object-cover border border-gray-200"
            />
            <span className="text-base font-bold text-[#1D1D1F] tracking-tight font-heading">
              CHAPTER ONE <span className="text-[#B8860B]">CAFE</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-secondaryText">
            Baghpat's premier cafe. Handcrafted artisanal pizzas, fresh burgers, wraps, shakes, and specialty cold coffees.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-xs font-bold text-[#1D1D1F] font-heading uppercase tracking-wider mb-2.5">
            Quick Links
          </h4>
          <ul className="space-y-1.5 text-xs">
            <li><a href="#hero" className="hover:text-[#B8860B] transition-colors">Home</a></li>
            <li><a href="#menu" className="hover:text-[#B8860B] transition-colors">Digital Menu</a></li>
            <li><a href="#about" className="hover:text-[#B8860B] transition-colors">About Us</a></li>
            <li><a href="#contact" className="hover:text-[#B8860B] transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-xs font-bold text-[#1D1D1F] font-heading uppercase tracking-wider mb-2.5">
            Hours & Contact
          </h4>
          <p className="text-xs text-[#1D1D1F] font-medium mb-0.5">
            Monday – Sunday
          </p>
          <p className="text-xs text-[#B8860B] font-semibold mb-2">
            11:00 AM – 11:00 PM
          </p>
          <p className="text-xs text-secondaryText">
            Phone: <a href={`tel:${restaurantInfo.phone}`} className="text-[#1D1D1F] hover:underline font-medium">{restaurantInfo.phoneFormatted}</a>
          </p>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-xs font-bold text-[#1D1D1F] font-heading uppercase tracking-wider mb-2.5">
            Connect With Us
          </h4>
          <div className="flex items-center gap-2 mb-4">
            <a 
              href={restaurantInfo.instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-100 hover:bg-[#B8860B] hover:text-white text-gray-600 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href={`https://wa.me/${restaurantInfo.whatsappNumber}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-100 hover:bg-green-600 hover:text-white text-gray-600 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a 
              href={restaurantInfo.googleMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-100 hover:bg-[#B8860B] hover:text-white text-gray-600 transition-colors"
              aria-label="Google Maps"
            >
              <MapPin className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
        <div>
          © {new Date().getFullYear()} Chapter One Cafe. All rights reserved.
        </div>
        <div className="flex items-center gap-1">
          <span>Made for</span>
          <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          <span>Baghpat, Uttar Pradesh</span>
        </div>
      </div>
    </footer>
  );
}
