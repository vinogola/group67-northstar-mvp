import React, { useState } from 'react';
import { OrderData } from '../types';
import { StatusBadge } from './StatusBadge';
import { 
  Calendar, 
  MapPin, 
  Truck, 
  Copy, 
  Check, 
  Package, 
  ArrowRight,
  Info,
  Clock
} from 'lucide-react';

interface OrderStatusCardProps {
  order: OrderData;
  onReset: () => void;
}

export const OrderStatusCard: React.FC<OrderStatusCardProps> = ({ order, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyTracking = () => {
    if (order.trackingNumber) {
      navigator.clipboard.writeText(order.trackingNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div 
      id="order-result-card" 
      className="bg-slate-950/90 rounded-xl border border-slate-800 shadow-xl overflow-hidden transition-all animate-fadeIn text-slate-200"
    >
      {/* Header Banner */}
      <div className="bg-slate-900/80 p-5 sm:p-6 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Order ID</span>
            <span className="text-lg font-bold text-white font-mono">{order.orderId}</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Placed on {order.orderDate} by {order.customerName}</p>
        </div>
        <div className="self-start sm:self-auto">
          <StatusBadge status={order.status} size="lg" />
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Status Headline & One-line Detail (Prompt requirement) */}
        <div className="rounded-xl bg-blue-950/40 border border-blue-800/60 p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-blue-200">{order.statusHeadline}</h4>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">{order.statusDetail}</p>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Estimated Delivery */}
          <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800/90 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Estimated Arrival</p>
              <p className="text-sm font-semibold text-white mt-0.5">{order.estimatedDelivery}</p>
            </div>
          </div>

          {/* Carrier & Tracking */}
          <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800/90 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-400 font-medium">{order.carrier || 'Carrier'}</p>
              {order.trackingNumber ? (
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-mono font-medium text-slate-200 truncate">{order.trackingNumber}</span>
                  <button
                    id="btn-copy-tracking"
                    onClick={handleCopyTracking}
                    title="Copy tracking number"
                    className="text-slate-400 hover:text-blue-400 transition-colors p-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              ) : (
                <p className="text-xs text-slate-500 mt-0.5">Assigned upon dispatch</p>
              )}
            </div>
          </div>
        </div>

        {/* Tracking Timeline */}
        {order.timeline && order.timeline.length > 0 && (
          <div>
            <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3.5">Progress Timeline</h5>
            <div className="relative pl-6 space-y-4 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-800">
              {order.timeline.map((evt, idx) => {
                const isPast = evt.completed;
                const isCurrent = evt.current;
                return (
                  <div key={idx} className="relative flex items-start justify-between gap-4 text-xs">
                    {/* Timeline Node Dot */}
                    <div 
                      className={`absolute -left-6 top-0.5 w-[14px] h-[14px] rounded-full border-2 transition-all ${
                        isCurrent
                          ? 'bg-blue-500 border-slate-950 ring-4 ring-blue-500/20'
                          : isPast
                            ? 'bg-emerald-500 border-slate-950'
                            : 'bg-slate-900 border-slate-700'
                      }`} 
                    />
                    <div>
                      <p className={`font-medium ${isCurrent ? 'text-blue-300 font-semibold' : isPast ? 'text-slate-200' : 'text-slate-500'}`}>
                        {evt.step}
                      </p>
                      {evt.description && <p className="text-slate-400 mt-0.5">{evt.description}</p>}
                    </div>
                    <span className={`text-[11px] shrink-0 ${isCurrent ? 'text-blue-400 font-medium' : 'text-slate-500'}`}>
                      {evt.date}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Items List */}
        <div>
          <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">Items in this shipment</h5>
          <div className="divide-y divide-slate-800/80 border border-slate-800/80 rounded-xl overflow-hidden bg-slate-900/60">
            {order.items.map((item) => (
              <div key={item.id} className="p-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0">
                    <Package className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-medium text-slate-200">{item.name}</span>
                    <span className="text-slate-400 ml-2">Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="font-semibold text-slate-300 shrink-0">{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address snippet */}
        <div className="flex items-start gap-2 text-xs text-slate-400 pt-3 border-t border-slate-800/80">
          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
          <span>Delivering to: <strong className="text-slate-200">{order.shippingAddress}</strong></span>
        </div>

        {/* Reset / Check Another Action */}
        <div className="pt-2 flex justify-end">
          <button
            id="btn-check-another-order"
            type="button"
            onClick={onReset}
            className="text-xs font-medium text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1 cursor-pointer transition-colors"
          >
            Check another order ID
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
