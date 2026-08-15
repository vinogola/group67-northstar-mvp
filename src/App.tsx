import React, { useState } from 'react';
import OrderStatusLookup from './OrderStatusLookup';
import StockAvailability from './StockAvailability';
import { PackageSearch, ShieldCheck, Sun, Moon, ArrowLeft, Truck, Boxes } from 'lucide-react';

type View = 'home' | 'order' | 'stock';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`min-h-screen transition-colors duration-200 flex flex-col justify-between ${
      isDarkMode
        ? 'bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white'
        : 'bg-slate-900 text-slate-100 selection:bg-blue-500 selection:text-white'
    }`}>

      {/* Top Brand Navigation Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/25 text-white font-black text-base">
            <PackageSearch className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-tight text-sm sm:text-base">NORTHSTAR</span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">Retail Co.</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Customer Support Deflection Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-full border border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            MVP Demo
          </span>
          <button
            id="theme-toggle-btn"
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Toggle theme contrast"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-2xl mx-auto px-4 py-8 sm:py-10 space-y-6">

        {view !== 'home' && (
          <button
            type="button"
            onClick={() => setView('home')}
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}

        {view === 'home' && (
          <div className="grid sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setView('order')}
              className="text-left bg-slate-900/95 rounded-2xl border border-slate-800/90 shadow-xl p-6 space-y-2 hover:border-blue-500/50 transition-colors cursor-pointer"
            >
              <Truck className="w-6 h-6 text-blue-400" />
              <h2 className="text-lg font-bold text-white">Check Order Status</h2>
              <p className="text-sm text-slate-400">Look up shipping and delivery status by order ID.</p>
            </button>

            <button
              type="button"
              onClick={() => setView('stock')}
              className="text-left bg-slate-900/95 rounded-2xl border border-slate-800/90 shadow-xl p-6 space-y-2 hover:border-blue-500/50 transition-colors cursor-pointer"
            >
              <Boxes className="w-6 h-6 text-blue-400" />
              <h2 className="text-lg font-bold text-white">Check Stock Availability</h2>
              <p className="text-sm text-slate-400">See whether an item is in stock before ordering.</p>
            </button>
          </div>
        )}

        {view === 'order' && <OrderStatusLookup />}
        {view === 'stock' && <StockAvailability />}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/70 py-4 px-4 text-center text-xs text-slate-500">
        Northstar Retail Co. Support Deflection MVP • Group 67 (Edith, Owen, Joyce, Edwin, Vincent)
      </footer>

    </div>
  );
}
