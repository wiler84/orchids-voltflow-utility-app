import React from 'react';
import { Receipt, Wallet } from 'lucide-react';

/**
 * StatsGrid component
 * Closes the two-column grid containing the "Last Payment" and "Wallet Balance" cards.
 * Features: Subtle gradients, hover elevation states, and responsive layout.
 */
const StatsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6 animate-fade-up-delay-2">
      {/* Last Payment Card */}
      <button 
        className="bg-card rounded-2xl p-4 shadow-soft text-left cursor-pointer transition-all duration-300 hover:shadow-float hover:-translate-y-0.5 group"
        data-testid="card-last-payment"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22C55E]/10 to-[#22C55E]/5 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-105">
          <Receipt size={20} className="text-[#22C55E]" />
        </div>
        <p className="text-xs text-[#64748B] mb-1 font-medium">Last Payment</p>
        <p className="text-lg font-semibold text-[#0F172A] tracking-tight">$127.45</p>
        <p className="text-[12px] text-[#64748B] mt-1 font-medium">Dec 28, 2025</p>
      </button>

      {/* Wallet Balance Card */}
      <a href="/wallet" className="block">
        <div 
          className="bg-[#FEFBF6] dark:bg-[hsl(35_15%_14%)] rounded-2xl p-4 shadow-soft cursor-pointer transition-all duration-300 hover:shadow-float hover:-translate-y-0.5 group"
          data-testid="card-wallet"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F59E0B]/10 to-[#F59E0B]/5 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-105">
            <Wallet size={20} className="text-[#F59E0B]" />
          </div>
          <p className="text-xs text-[#64748B] mb-1 font-medium">Wallet Balance</p>
          <p className="text-lg font-semibold text-[#0F172A] tracking-tight">$250.00</p>
          <p className="text-[12px] text-[#64748B] mt-1 font-medium">Add funds</p>
        </div>
      </a>
    </div>
  );
};

export default StatsGrid;