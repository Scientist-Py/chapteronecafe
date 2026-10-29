import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import FoodModal from './components/FoodModal';
import CartDrawer from './components/CartDrawer';
import FloatingCartBar from './components/FloatingCartBar';
import ToastNotification from './components/ToastNotification';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#FAFAFA] text-[#1D1D1F] selection:bg-[#B8860B] selection:text-white pb-16">
        
        {/* Initial Preloader */}
        <AnimatePresence>
          {loading && <Preloader key="preloader" />}
        </AnimatePresence>

        {/* Main App Layout */}
        {!loading && (
          <>
            <Navbar />
            <ToastNotification />
            <main>
              <Hero />
              <MenuSection onSelectItem={(item) => setSelectedFood(item)} />
              <AboutSection />
              <ContactSection />
            </main>
            <Footer />
            <FloatingActions />
            <FloatingCartBar />

            {/* Zomato-style Size Customization Modal */}
            {selectedFood && (
              <FoodModal 
                item={selectedFood} 
                onClose={() => setSelectedFood(null)} 
              />
            )}

            {/* Multi-Item Cart Drawer */}
            <CartDrawer />
          </>
        )}

      </div>
    </CartProvider>
  );
}
