import React from 'react';
import { motion } from 'framer-motion';
import { Tag, Sparkles, CheckCircle2, Gift, ArrowRight, Pizza } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function OffersSection() {
  const {
    promoEval,
    claimFreePromoItem,
    isMondayPizzaModalOpen,
    setIsMondayPizzaModalOpen,
    applyLoyalty,
    setApplyLoyalty,
  } = useCart();

  return (
    <section className="py-6 px-3 sm:px-6 lg:px-8 bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto space-y-3">
        
        {/* Section Header */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#1D1D1F] uppercase tracking-wider font-heading">
            <Tag className="w-4 h-4 text-[#B8860B]" />
            <span>Offers For You</span>
          </div>

          <span className="text-[10px] font-semibold text-[#B8860B] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            {promoEval.isMonday ? '🍕 Monday Live Deals' : 'Live Savings'}
          </span>
        </div>

        {/* Compact Grid of Active Offers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          
          {/* 1. MONDAY PIZZA OFFER */}
          <div className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
            promoEval.isMonday
              ? 'bg-gradient-to-br from-amber-500/10 via-amber-50 to-white border-amber-300 shadow-xs'
              : 'bg-white border-gray-200/80 opacity-75'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-base">🍕</span>
                <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                  promoEval.isMonday
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-500 border border-gray-200'
                }`}>
                  {promoEval.isMonday ? 'ACTIVE TODAY' : 'MONDAYS ONLY'}
                </span>
              </div>
              <h4 className="text-xs font-extrabold text-[#1D1D1F] font-heading leading-snug">
                Buy 1 Large → Get 1 Medium FREE
              </h4>
              <p className="text-[10px] text-secondaryText mt-0.5 leading-tight">
                Order any 1 Large Pizza on Mondays to claim.
              </p>
            </div>

            {promoEval.isMonday && (
              <div className="pt-2 mt-2 border-t border-amber-200/60">
                {promoEval.hasFreeMondayPizzaInCart ? (
                  <div className="text-[10px] text-green-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Free Pizza Claimed!</span>
                  </div>
                ) : promoEval.isMondayQualified ? (
                  <button
                    onClick={() => setIsMondayPizzaModalOpen(true)}
                    className="w-full py-1.5 rounded-xl bg-[#1D1D1F] text-white hover:bg-[#B8860B] text-[10px] font-extrabold shadow-xs transition-all flex items-center justify-center gap-1"
                  >
                    <span>Choose Free Pizza</span>
                    <ArrowRight className="w-3 h-3 text-[#B8860B]" />
                  </button>
                ) : (
                  <a
                    href="#menu"
                    className="text-[10px] text-[#B8860B] font-bold hover:underline block text-center"
                  >
                    + Add Large Pizza to Unlock
                  </a>
                )}
              </div>
            )}
          </div>

          {/* 2. SPEND ₹399+ MOJITO OFFER */}
          <div className="p-3.5 rounded-2xl bg-white border border-gray-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-base">🍏</span>
                {promoEval.mojitoUnlocked ? (
                  <span className="text-[9px] font-extrabold bg-green-100 text-green-800 px-2 py-0.5 rounded-full border border-green-300">
                    UNLOCKED 🎉
                  </span>
                ) : (
                  <span className="text-[9px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    SPEND ₹399+
                  </span>
                )}
              </div>

              <h4 className="text-xs font-extrabold text-[#1D1D1F] font-heading leading-snug">
                FREE Green Apple Mojito
              </h4>
              
              {/* Live Progress Bar */}
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-[10px] font-semibold text-secondaryText">
                  <span>Progress</span>
                  <span className="text-[#1D1D1F] font-bold">₹{promoEval.paidSubtotal} / ₹399</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#B8860B] rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, promoEval.mojitoProgress * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 mt-2 border-t border-gray-100">
              {promoEval.hasFreeMojitoInCart ? (
                <div className="text-[10px] text-green-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                  <span>Mojito Added at ₹0</span>
                </div>
              ) : promoEval.mojitoUnlocked ? (
                <button
                  onClick={() => claimFreePromoItem('MOJITO_399')}
                  className="w-full py-1.5 rounded-xl bg-green-600 hover:bg-green-500 text-white text-[10px] font-extrabold shadow-xs transition-all flex items-center justify-center gap-1"
                >
                  <Gift className="w-3 h-3" />
                  <span>Claim Free Mojito</span>
                </button>
              ) : (
                <span className="text-[10px] text-secondaryText font-medium block text-center">
                  ₹{promoEval.mojitoNeeded} more to unlock
                </span>
              )}
            </div>
          </div>

          {/* 3. SPEND ₹599+ COFFEE OFFER */}
          <div className="p-3.5 rounded-2xl bg-white border border-gray-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-base">☕</span>
                {promoEval.coffeeUnlocked ? (
                  <span className="text-[9px] font-extrabold bg-green-100 text-green-800 px-2 py-0.5 rounded-full border border-green-300">
                    UNLOCKED 🎉
                  </span>
                ) : (
                  <span className="text-[9px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    SPEND ₹599+
                  </span>
                )}
              </div>

              <h4 className="text-xs font-extrabold text-[#1D1D1F] font-heading leading-snug">
                FREE Cold Coffee
              </h4>

              {/* Live Progress Bar */}
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-[10px] font-semibold text-secondaryText">
                  <span>Progress</span>
                  <span className="text-[#1D1D1F] font-bold">₹{promoEval.paidSubtotal} / ₹599</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#B8860B] rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, promoEval.coffeeProgress * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 mt-2 border-t border-gray-100">
              {promoEval.hasFreeCoffeeInCart ? (
                <div className="text-[10px] text-green-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                  <span>Coffee Added at ₹0</span>
                </div>
              ) : promoEval.coffeeUnlocked ? (
                <button
                  onClick={() => claimFreePromoItem('COFFEE_599')}
                  className="w-full py-1.5 rounded-xl bg-green-600 hover:bg-green-500 text-white text-[10px] font-extrabold shadow-xs transition-all flex items-center justify-center gap-1"
                >
                  <Gift className="w-3 h-3" />
                  <span>Claim Free Coffee</span>
                </button>
              ) : (
                <span className="text-[10px] text-secondaryText font-medium block text-center">
                  ₹{promoEval.coffeeNeeded} more to unlock
                </span>
              )}
            </div>
          </div>

          {/* 4. LOYALTY REWARD */}
          <div className="p-3.5 rounded-2xl bg-white border border-gray-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-base">🔄</span>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                  promoEval.isLoyaltyQualified ? 'bg-amber-100 text-[#B8860B] border border-amber-300 font-extrabold' : 'bg-gray-100 text-gray-600'
                }`}>
                  {promoEval.isLoyaltyQualified ? 'QUALIFIED' : 'LOYALTY REWARD'}
                </span>
              </div>

              <h4 className="text-xs font-extrabold text-[#1D1D1F] font-heading leading-snug">
                12% OFF Loyalty Discount
              </h4>
              <p className="text-[10px] text-secondaryText mt-0.5 leading-tight">
                Valid on 3rd visit within 7 days.
              </p>
            </div>

            <div className="pt-2 mt-2 border-t border-gray-100">
              {promoEval.isLoyaltyQualified ? (
                <button
                  onClick={() => setApplyLoyalty(!applyLoyalty)}
                  className={`w-full py-1.5 rounded-xl text-[10px] font-extrabold shadow-xs transition-all flex items-center justify-center gap-1 ${
                    applyLoyalty
                      ? 'bg-[#1D1D1F] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{applyLoyalty ? '✓ 12% Discount Applied' : 'Apply 12% Discount'}</span>
                </button>
              ) : (
                <span className="text-[10px] text-secondaryText italic block text-center">
                  Visit 3 times to unlock
                </span>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
