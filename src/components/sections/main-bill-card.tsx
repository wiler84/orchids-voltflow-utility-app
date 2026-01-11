import React from 'react';
import { Zap, ArrowUpRight } from 'lucide-react';

const MainBillCard = () => {
  return (
    <div 
      className="bg-white rounded-[1.5rem] p-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out"
      data-testid="card-utility-main"
    >
      {/* Header Section */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-[1rem] bg-gradient-to-br from-black/10 to-slate-100 flex items-center justify-center">
            <Zap size={24} className="text-black fill-black" />
          </div>
          <div>
            <h2 className="font-semibold text-[#171C26] text-[1rem] leading-tight">
              City Power & Light
            </h2>
            <p className="text-[0.875rem] text-[#64748B] leading-tight">
              ****-****-4829
            </p>
          </div>
        </div>
        <span className="text-[0.75rem] font-medium text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded-full">
          MTR-2847561
        </span>
      </div>

      {/* Balance Section */}
      <div className="space-y-4">
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-[0.875rem] text-[#64748B]">Current Balance</span>
            <span className="text-[0.75rem] text-[#64748B]">Due Jan 15, 2026</span>
          </div>
          <p className="text-[1.875rem] font-semibold text-[#171C26] tracking-tight leading-none mb-4">
            $84.32
          </p>
        </div>

        {/* Usage Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[0.875rem] text-[#64748B]">Usage this cycle</span>
            <span className="text-[0.875rem] font-semibold text-[#171C26]">68%</span>
          </div>
          <div 
            role="progressbar" 
            aria-valuenow={68} 
            aria-valuemin={0} 
            aria-valuemax={100}
            className="relative w-full overflow-hidden rounded-full h-2 bg-[#F1F5F9]"
          >
            <div 
              className="h-full bg-black transition-all duration-1000 ease-in-out" 
              style={{ width: '68%' }}
            ></div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <a href="/pay" className="block mt-6">
        <button 
          className="w-full py-3.5 rounded-[1rem] bg-gradient-to-r from-black to-[#262626] text-white font-semibold text-[0.875rem] flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-black/20"
          data-testid="button-pay-now"
        >
          Pay Now
          <ArrowUpRight size={18} />
        </button>
      </a>
    </div>
  );
};

export default MainBillCard;