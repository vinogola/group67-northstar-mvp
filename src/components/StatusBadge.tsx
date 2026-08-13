import React from 'react';
import { OrderStatusType } from '../types';
import { Clock, Truck, CheckCircle2, AlertTriangle, PackageCheck } from 'lucide-react';

interface StatusBadgeProps {
  status: OrderStatusType;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'Processing':
        return {
          bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
          icon: Clock,
          label: 'Processing'
        };
      case 'Shipped':
        return {
          bg: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
          icon: Truck,
          label: 'Shipped (In Transit)'
        };
      case 'Delivered':
        return {
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          icon: CheckCircle2,
          label: 'Delivered'
        };
      case 'Delayed':
        return {
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          icon: AlertTriangle,
          label: 'Carrier Delay'
        };
      case 'Out for Delivery':
        return {
          bg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
          icon: PackageCheck,
          label: 'Out for Delivery'
        };
      default:
        return {
          bg: 'bg-slate-800 text-slate-300 border-slate-700',
          icon: Clock,
          label: status
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-xs gap-1' 
    : size === 'lg' 
      ? 'px-3.5 py-1.5 text-sm gap-2 font-medium'
      : 'px-2.5 py-1 text-xs gap-1.5 font-medium';

  return (
    <span 
      id={`badge-${status.toLowerCase().replace(/\s+/g, '-')}`}
      className={`inline-flex items-center rounded-full border ${config.bg} ${sizeClasses}`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      <span>{config.label}</span>
    </span>
  );
};
