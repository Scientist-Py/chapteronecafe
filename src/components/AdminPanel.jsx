import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, ShieldCheck, MapPin, Phone, User, Clock, Trash2, CheckCircle2, Search, Download, RefreshCw, Key } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function AdminPanel() {
  const {
    isAdminOpen,
    setIsAdminOpen,
    ordersHistory,
    updateOrderStatus,
    deleteOrder,
    clearAllOrders,
  } = useCart();

  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  if (!isAdminOpen) return null;

  const DEFAULT_PIN = '1234';

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === DEFAULT_PIN || pinInput === 'admin') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Invalid Admin PIN code');
    }
  };

  // Filtered orders
  const filteredOrders = ordersHistory.filter((ord) => {
    const matchesStatus = statusFilter === 'All' || ord.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      ord.orderId.toLowerCase().includes(q) ||
      ord.customerName.toLowerCase().includes(q) ||
      ord.customerPhone.toLowerCase().includes(q) ||
      ord.tableNumber.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  const totalRevenue = ordersHistory.reduce((sum, ord) => sum + ord.totalAmount, 0);
  const pendingCount = ordersHistory.filter((ord) => ord.status === 'Pending').length;

  // Export orders to JSON file
  const exportOrders = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ordersHistory, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `chapter_one_orders_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAdminOpen(false)}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-2xl z-10 my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-200 bg-[#1D1D1F] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B8860B] flex items-center justify-center text-white font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold font-heading leading-tight">
                  Chapter One Cafe - Admin Dashboard
                </h2>
                <span className="text-xs text-gray-400">
                  Secret Order Logging & GPS Location Tracking
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* PIN AUTHENTICATION SCREEN */}
          {!isAuthenticated ? (
            <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6">
              <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-[#B8860B]">
                <Key className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#1D1D1F] mb-1 font-heading">
                  Enter Admin PIN Code
                </h3>
                <p className="text-xs text-secondaryText">
                  Default PIN code is <strong className="text-[#1D1D1F]">1234</strong>
                </p>
              </div>

              <form onSubmit={handlePinSubmit} className="space-y-4">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter 4-digit PIN"
                  className="w-full text-center px-4 py-3 rounded-2xl border border-gray-300 text-lg font-bold tracking-widest text-[#1D1D1F] focus:outline-none focus:border-[#B8860B]"
                  maxLength={6}
                  autoFocus
                />

                {pinError && (
                  <p className="text-xs text-red-600 font-bold">{pinError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl font-bold bg-[#1D1D1F] text-white hover:bg-[#B8860B] transition-all shadow-md"
                >
                  Access Dashboard
                </button>
              </form>
            </div>
          ) : (
            /* ADMIN DASHBOARD VIEW */
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-gray-50">
              
              {/* Analytics Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
                  <div>
                    <div className="text-xs text-secondaryText font-bold uppercase">Total Saved Orders</div>
                    <div className="text-2xl font-extrabold text-[#1D1D1F]">{ordersHistory.length}</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    📋
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
                  <div>
                    <div className="text-xs text-secondaryText font-bold uppercase">Total Order Revenue</div>
                    <div className="text-2xl font-extrabold text-[#B8860B]">₹{totalRevenue}</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#B8860B] flex items-center justify-center font-bold">
                    💰
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
                  <div>
                    <div className="text-xs text-secondaryText font-bold uppercase">Pending Orders</div>
                    <div className="text-2xl font-extrabold text-orange-600">{pendingCount}</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                    ⏳
                  </div>
                </div>
              </div>

              {/* Controls Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
                
                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, phone, order ID..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-xs text-[#1D1D1F] focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                {/* Filter Pills & Actions */}
                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                  {['All', 'Pending', 'Preparing', 'Completed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                        statusFilter === st
                          ? 'bg-[#1D1D1F] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}

                  <button
                    onClick={exportOrders}
                    className="p-2 rounded-xl bg-amber-50 text-[#B8860B] border border-amber-200 hover:bg-amber-100 flex items-center gap-1 text-xs font-bold"
                    title="Export Orders Data"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Export</span>
                  </button>

                  {ordersHistory.length > 0 && (
                    <button
                      onClick={clearAllOrders}
                      className="p-2 rounded-xl bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 flex items-center gap-1 text-xs font-bold"
                      title="Clear History"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>

              {/* Order Cards List */}
              {filteredOrders.length === 0 ? (
                <div className="py-16 text-center bg-white rounded-2xl border border-gray-200 p-8">
                  <ShieldCheck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-[#1D1D1F]">No Saved Orders Found</h3>
                  <p className="text-xs text-secondaryText mt-1">
                    When customers place orders on WhatsApp, their details, phone number & exact GPS location will automatically log here!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((ord) => (
                    <div
                      key={ord.orderId}
                      className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-xs hover:border-[#B8860B]/50 transition-all space-y-4"
                    >
                      {/* Order Header */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-extrabold text-[#1D1D1F] font-heading">
                              {ord.orderId}
                            </span>
                            <span className="text-xs text-gray-400">
                              • {ord.dateFormatted}
                            </span>
                          </div>
                          <div className="text-xs text-[#B8860B] font-bold mt-0.5">
                            Table/Note: {ord.tableNumber}
                          </div>
                        </div>

                        {/* Status selector */}
                        <div className="flex items-center gap-2">
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.orderId, e.target.value)}
                            className={`px-3 py-1 rounded-full text-xs font-bold border focus:outline-none ${
                              ord.status === 'Completed'
                                ? 'bg-green-50 text-green-700 border-green-300'
                                : ord.status === 'Preparing'
                                ? 'bg-blue-50 text-blue-700 border-blue-300'
                                : 'bg-orange-50 text-orange-700 border-orange-300'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Preparing">Preparing</option>
                            <option value="Completed">Completed</option>
                          </select>

                          <button
                            onClick={() => deleteOrder(ord.orderId)}
                            className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Customer Info & GPS Location Badge */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100 text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-[#1D1D1F]">
                            <User className="w-3.5 h-3.5 text-[#B8860B]" />
                            <span>Name: {ord.customerName}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[#1D1D1F]">
                            <Phone className="w-3.5 h-3.5 text-green-600" />
                            <span>Phone: </span>
                            <a href={`tel:${ord.customerPhone}`} className="text-green-700 font-bold hover:underline">
                              {ord.customerPhone}
                            </a>
                          </div>
                        </div>

                        {/* GPS Location Link */}
                        <div className="flex flex-col justify-center">
                          {ord.location && ord.location.available ? (
                            <a
                              href={ord.location.mapsLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-xs"
                            >
                              <MapPin className="w-3.5 h-3.5" />
                              <span>📍 Open Exact GPS Location on Maps</span>
                            </a>
                          ) : (
                            <span className="text-gray-400 italic">
                              GPS Location: Not provided by device
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Itemized Items */}
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">
                          Ordered Items ({ord.totalCount})
                        </div>

                        <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl bg-white overflow-hidden text-xs">
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="p-2.5 flex items-center justify-between">
                              <div>
                                <span className="font-bold text-[#1D1D1F]">
                                  {it.name}
                                </span>
                                {it.sizeName && (
                                  <span className="text-[#B8860B] font-semibold ml-1.5">
                                    ({it.sizeName})
                                  </span>
                                )}
                                {it.stuffedCrust && (
                                  <span className="text-[10px] text-gray-500 block">
                                    + Stuffed Crust
                                  </span>
                                )}
                                {it.extraCheeseSlice && (
                                  <span className="text-[10px] text-gray-500 block">
                                    + Extra Cheese Slice
                                  </span>
                                )}
                              </div>

                              <div className="font-extrabold text-[#1D1D1F]">
                                x{it.quantity} = ₹{it.unitPrice * it.quantity}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Total */}
                      <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-sm font-extrabold">
                        <span className="text-secondaryText">Grand Total</span>
                        <span className="text-[#B8860B] text-base">₹{ord.totalAmount}</span>
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
