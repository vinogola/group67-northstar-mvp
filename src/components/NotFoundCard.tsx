import React from 'react';
import { SearchX, HelpCircle, ArrowRight } from 'lucide-react';

interface NotFoundCardProps {
  searchedId: string;
  onTryExample: (id: string) => void;
  onReset: () => void;
}

export const NotFoundCard: React.FC<NotFoundCardProps> = ({ searchedId, onTryExample, onReset }) => {
  return (
    <div 
      id="order-not-found-card" 
      className="bg-slate-950/90 rounded-2xl border border-rose-900/40 shadow-xl p-6 sm:p-7 text-center space-y-4 animate-fadeIn text-slate-200"
    >
      <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
        <SearchX className="w-6 h-6" />
      </div>

      <div className="space-y-1">
        <h4 className="text-base font-semibold text-white">
          No order found for <span className="font-mono text-rose-400 font-bold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/60">"{searchedId}"</span>
        </h4>
        <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
          We couldn't locate any active or past shipments matching this identifier.
        </p>
      </div>

      {/* Helpful tips to deflect support tickets */}
      <div className="bg-slate-900/90 rounded-xl p-4 text-left border border-slate-800 space-y-2 text-xs">
        <div className="flex items-center gap-1.5 font-medium text-slate-300">
          <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
          <span>Troubleshooting Tips:</span>
        </div>
        <ul className="list-disc pl-5 space-y-1 text-slate-400">
          <li>Check for typos or misplaced numbers in your order confirmation email.</li>
          <li>Make sure to include the prefix (e.g. <strong className="font-mono text-slate-200">NS-</strong>).</li>
          <li>Recent orders may take up to <strong className="text-slate-200">15 minutes</strong> to appear in the lookup system.</li>
        </ul>
      </div>

      {/* Try valid example prompt */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border-t border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Try a valid example:</span>
          <button
            id="btn-try-example-ns10892"
            type="button"
            onClick={() => onTryExample('NS-10892')}
            className="font-mono text-blue-400 font-semibold hover:underline bg-blue-950/50 hover:bg-blue-900/50 px-2.5 py-1 rounded-lg border border-blue-800/50 transition-colors"
          >
            NS-10892
          </button>
        </div>

        <button
          id="btn-retry-search"
          type="button"
          onClick={onReset}
          className="text-slate-400 hover:text-white font-medium flex items-center gap-1 cursor-pointer transition-colors"
        >
          Try another ID
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
