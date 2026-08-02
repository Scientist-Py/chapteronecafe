import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Utensils, Sparkles, ChevronRight, Plus } from 'lucide-react';
import { menuCategoriesList, menuItemsData } from '../data/menuData';

export default function MenuSection({ onSelectItem }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle category change with smooth scroll to top of menu
  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
    
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      const yOffset = -75; // Account for fixed navbar height
      const y = menuEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  };

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
            <span>OUR GOURMET MENU</span>
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

          {/* Category Filter Pills (Horizontally Scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {menuCategoriesList.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
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

        {/* LIST ITEMS */}
        <div className="space-y-3.5">
          <AnimatePresence mode="popLayout">
            {filteredItems.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 bg-white rounded-2xl border border-gray-200 p-6"
              >
                <Utensils className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-[#1D1D1F]">No Dishes Found</h3>
                <p className="text-xs text-secondaryText mt-1">Try adjusting your search query or select another category.</p>
              </motion.div>
            ) : (
              filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-2xl border border-gray-200/90 p-3.5 sm:p-4 shadow-apple-light hover:border-[#B8860B]/40 transition-all group flex items-center justify-between gap-3 sm:gap-4 relative overflow-hidden"
                >
                  {/* Left Column: Details */}
                  <div className="flex-1 min-w-0 pr-1">
                    
                    {/* Category & Badge */}
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <div className="w-3.5 h-3.5 rounded-sm border border-green-600 flex items-center justify-center p-0.5" title="Pure Veg">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                      </div>

                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-50 text-[#B8860B] border border-amber-200 text-[9px] font-bold uppercase tracking-wider">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-sm sm:text-base font-bold text-[#1D1D1F] font-heading group-hover:text-[#B8860B] transition-colors leading-tight">
                      {item.name}
                    </h3>

                    {/* Price */}
                    <div className="text-xs font-extrabold text-[#1D1D1F] mt-1 flex items-center gap-1.5">
                      <span>{item.displayPrice}</span>
                      {item.hasSizes && (
                        <span className="text-[10px] text-[#B8860B] font-semibold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                          Options
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-[11px] sm:text-xs text-secondaryText leading-relaxed mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Right Column: Image with Floating ADD Button */}
                  <div className="relative flex-shrink-0">
                    <div 
                      onClick={() => onSelectItem(item)}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 shadow-xs cursor-pointer group-hover:scale-102 transition-transform"
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                          <Utensils className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    {/* Floating ADD / SELECT Button */}
                    <button
                      onClick={() => onSelectItem(item)}
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-lg bg-white border border-gray-300 text-green-700 font-extrabold text-xs shadow-md hover:bg-green-600 hover:text-white hover:border-green-600 transition-all flex items-center gap-1 active:scale-95 whitespace-nowrap z-10"
                    >
                      <span>ADD</span>
                      <Plus className="w-3 h-3 stroke-[3]" />
                    </button>
                  </div>

                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
