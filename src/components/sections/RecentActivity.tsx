import React from 'react';
import { ChevronRight, ArrowUpRight, Receipt } from 'lucide-react';

interface ActivityItemProps {
  type: 'payment' | 'bill';
  label: string;
  date: string;
  amount: string;
  isPositive?: boolean;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ type, label, date, amount, isPositive }) => {
  const isPayment = type === 'payment';
  
  return (
    <a href="/history" className="block outline-none">
      <div 
        className="flex items-center justify-between p-4 bg-white rounded-2xl border border-[#E2E8F0]/30 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] cursor-pointer transition-all duration-300 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 active:scale-[0.98]"
        data-testid={`activity-item-${label.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isPayment ? 'bg-[rgba(34,197,94,0.1)]' : 'bg-[#F1F5F9]'
          }`}>
            {isPayment ? (
              <ArrowUpRight 
                size={18} 
                className="text-[#22C55E] rotate-180" 
              />
            ) : (
              <Receipt 
                size={18} 
                className="text-[#64748B]" 
              />
            )}
          </div>
          <div>
            <p className="font-medium text-[#0F172A] text-sm leading-tight">{label}</p>
            <p className="text-xs text-[#64748B] mt-0.5">{date}</p>
          </div>
        </div>
        <p className={`font-semibold text-sm ${
          isPositive ? 'text-[#64748B]' : 'text-[#0F172A]'
        }`}>
          {amount}
        </p>
      </div>
    </a>
  );
};

const RecentActivity: React.FC = () => {
  const activities: ActivityItemProps[] = [
    {
      type: 'payment',
      label: 'Payment',
      date: 'Dec 28',
      amount: '-$127.45',
      isPositive: false,
    },
    {
      type: 'bill',
      label: 'Bill Generated',
      date: 'Dec 15',
      amount: '+$127.45',
      isPositive: true,
    },
    {
      type: 'payment',
      label: 'Payment',
      date: 'Nov 28',
      amount: '-$115.20',
      isPositive: false,
    },
  ];

  return (
    <section className="mt-8 px-0 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[#0F172A] text-base">Recent Activity</h3>
        <a href="/history">
          <button 
            className="text-sm font-medium text-[#0F172A] flex items-center gap-1 hover:opacity-70 transition-opacity"
            data-testid="link-view-all"
          >
            View all
            <ChevronRight size={16} />
          </button>
        </a>
      </div>
      
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <ActivityItem 
            key={`${activity.label}-${index}`}
            {...activity}
          />
        ))}
      </div>
    </section>
  );
};

export default RecentActivity;