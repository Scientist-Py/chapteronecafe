import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Utensils, Sparkles, ChevronRight, Plus } from 'lucide-react';
import { menuCategoriesList, menuItemsData } from '../data/menuData';

export default function MenuSection({ onSelectItem }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering Logic
  const filteredItems = useMemo(() => {
    return menuItemsData.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="menu" className="py-12 px-3 sm:px-6 lg:px-8 bg-[#FAFAFA] min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-[#B8860B] text-xs font-semibold uppercase tracking-wider mb-2 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ZOMATO STYLE DIGITAL MENU</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl font-extrabold text-[#1D1D1F] font-heading"
          >
            Order Your Favorites
          </motion.h2>
        </div>

        {/* Search & Sticky Filter Pills */}
        <div className="sticky top-16 z-30 bg-[#FAFAFA]/95 backdrop-blur-md pt-2 pb-4 space-y-3 mb-4 border-b border-gray-200/80">
          
          {/* Search Box */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (pizza, burger, momos, shake)..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-gray-200 text-[#1D1D1F] placeholder-gray-400 focus:outline-none focus:border-[#B8860B] text-xs sm:text-sm shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-secondaryText hover:text-black"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills (Zomato Style Horizontally Scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {menuCategoriesList.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap active:scale-95 ${
                    isActive
                      ? 'bg-[#1D1D1F] text-white shadow-sm font-bold'
                      : 'bg-white text-[#1D1D1F] border border-gray-200 hover:border-[#B8860B]'
                  }`}
                >
                  <span className="text-sm">{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Counter */}
        <div className="flex items-center justify-between mb-4 text-xs text-secondaryText px-1">
          <div>
            Showing <span className="text-[#1D1D1F] font-bold">{filteredItems.length}</span> delicacies
          </div>
          <div className="text-[11px] text-gray-400">
            Tap item or button to select sizes
          </div>
        </div>

        {/* ZOMATO STYLE LIST ITEMS */}
        {filteredItems.length === 0 ? (
          <div className="py-14 text-center bg-white rounded-2xl p-6 max-w-xs mx-auto border border-gray-200 shadow-xs">
            <Utensils className="w-8 h-8 text-[#B8860B] mx-auto mb-2 opacity-60" />
            <h3 className="text-sm font-bold text-[#1D1D1F] mb-1">No Items Found</h3>
            <p className="text-xs text-secondaryText mb-4">
              Try searching for "pizza", "burger", or "shake".
            </p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="px-4 py-1.5 rounded-full bg-gray-100 text-[#1D1D1F] text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-light-card divide-y divide-gray-100 overflow-hidden">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="p-4 sm:p-5 hover:bg-gray-50/80 transition-colors cursor-pointer flex items-start justify-between gap-4 group"
                >
                  {/* Left Column: Veg Dot, Title, Price, Description, Size Badge */}
                  <div className="flex-1 min-w-0 pr-2">
                    
                    {/* Top row: Veg symbol & Badges */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-4 h-4 rounded-[3px] border border-green-600 flex items-center justify-center p-[2px]">
                        <div className="w-2 h-2 rounded-full bg-green-600"></div>
                      </div>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-50 text-[9px] font-extrabold text-[#B8860B] border border-amber-200/80 uppercase">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Item Name */}
                    <h3 className="text-base font-bold text-[#1D1D1F] group-hover:text-[#B8860B] transition-colors leading-snug font-heading mb-1">
                      {item.name}
                    </h3>

                    {/* Price & Size Option Tag */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-extrabold text-[#1D1D1F]">
                        {item.displayPrice || `₹${item.price}`}
                      </span>
                      {item.hasSizes && (
                        <span className="text-[10px] font-medium text-[#B8860B] bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full">
                          Customizable (Reg / Med / Lrg)
                        </span>
                      )}
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-secondaryText line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                  </div>

                  {/* Right Column: Image with Floating Zomato Style ADD Button */}
                  <div className="relative flex-shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-b from-gray-100 to-gray-50 flex flex-col items-center justify-center text-center p-2">
                        <Utensils className="w-6 h-6 text-[#B8860B] mb-1" />
                        <span className="text-[9px] font-medium text-gray-400">Chef Special</span>
                      </div>
                    )}

                    {/* Floating Zomato Style ADD / SELECT Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectItem(item);
                      }}
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-lg bg-white border border-gray-300 text-green-700 font-extrabold text-xs shadow-md hover:bg-green-50 active:scale-95 transition-all flex items-center gap-1 uppercase tracking-wider"
                    >
                      <span>ADD</span>
                      <Plus className="w-3.5 h-3.5 text-green-700" />
                    </button>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
}
