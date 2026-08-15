import React, { useState } from 'react';
import { lookupOrderStatus, DEMO_ORDER_EXAMPLES } from './orderService';
import { OrderData } from './types';
import { OrderStatusCard } from './components/OrderStatusCard';
import { NotFoundCard } from './components/NotFoundCard';
import { Search, Sparkles, Truck, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function OrderStatusLookup() {
  const [orderInput, setOrderInput] = useState('');
  const [searchedId, setSearchedId] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<OrderData | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const performLookup = (idToSearch: string) => {
    const trimmed = idToSearch.trim();
    if (!trimmed) {
      setValidationError('Please enter an order ID to check status.');
      return;
    }

    setValidationError(null);
    setIsLoading(true);
    setSearchedId(trimmed);

    // Fast simulated response (< 200ms)
    setTimeout(() => {
      const result = lookupOrderStatus(trimmed);
      setSearchResult(result);
      setHasSearched(true);
      setIsLoading(false);
    }, 180);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLookup(orderInput);
  };

  const handleExampleClick = (id: string) => {
    setOrderInput(id);
    setValidationError(null);
    performLookup(id);
  };

  const handleReset = () => {
    setOrderInput('');
    setSearchedId(null);
    setSearchResult(null);
    setHasSearched(false);
    setValidationError(null);
  };

  return (
    <div className="bg-slate-900/95 rounded-2xl border border-slate-800/90 shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden backdrop-blur-xl">

      {/* Subtle Dynamic Ambient Lighting */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Headline */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Truck className="w-3.5 h-3.5" />
          Real-Time Order Tracking
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Order Status Lookup
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
          Enter your Northstar order number to check live packaging, carrier dispatch, tracking info, and estimated delivery dates.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleFormSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              id="order-id-input"
              type="text"
              value={orderInput}
              onChange={(e) => {
                setOrderInput(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="e.g. NS-10234"
              className={`w-full h-12 px-4 text-sm bg-slate-950/90 rounded-xl border text-white placeholder:text-slate-500 font-mono focus:outline-none transition-all shadow-inner ${
                validationError
                  ? 'border-rose-500 ring-2 ring-rose-500/20'
                  : 'border-slate-700/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
              }`}
              autoComplete="off"
              spellCheck="false"
            />
          </div>

          <button
            id="btn-check-order"
            type="submit"
            disabled={isLoading}
            className="h-12 px-7 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] disabled:bg-blue-600/50 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 font-medium"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Check Status</span>
              </>
            )}
          </button>
        </div>

        {/* Validation Message */}
        {validationError && (
          <p className="text-xs text-rose-400 flex items-center gap-1.5 pt-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {validationError}
          </p>
        )}
      </form>

      {/* Test Examples Chips */}
      <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Click to test sample orders:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {DEMO_ORDER_EXAMPLES.map((ex) => {
            const isMissing = ex.type === 'missing';
            const isSelected = orderInput.trim().toUpperCase() === ex.id;
            return (
              <button
                key={ex.id}
                id={`chip-${ex.id.toLowerCase()}`}
                type="button"
                onClick={() => handleExampleClick(ex.id)}
                className={`text-xs px-3 py-1.5 rounded-lg font-mono transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30 font-semibold'
                    : isMissing
                      ? 'bg-rose-950/30 text-rose-300 border-rose-800/50 hover:bg-rose-900/40 hover:border-rose-600'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                <span>{ex.id}</span>
                <span className="text-[11px] opacity-75 ml-1.5">({ex.label})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Results Display */}
      <AnimatePresence mode="wait">
        {hasSearched && (
          <motion.div
            key={searchedId || 'result'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="pt-2"
          >
            {searchResult ? (
              <OrderStatusCard order={searchResult} onReset={handleReset} />
            ) : (
              <NotFoundCard
                searchedId={searchedId || ''}
                onTryExample={handleExampleClick}
                onReset={handleReset}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
