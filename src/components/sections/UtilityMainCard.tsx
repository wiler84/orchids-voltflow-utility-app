import React from 'react';
import { Zap, ArrowUpRight } from 'lucide-react';

const UtilityMainCard: React.FC = () => {
  return (
    <div 
      className="bg-white rounded-[2rem] p-6 mb-6 shadow-float animate-fade-up-delay-1"
      data-testid="card-utility-main"
      style={{
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Header Info */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F172A]/10 to-[#F1F5F9]/10 flex items-center justify-center">
            <Zap size={24} className="text-[#0F172A]" />
          </div>
          <div>
            <h2 className="font-semibold text-[#0F172A] text-base leading-6">City Power & Light</h2>
            <p className="text-sm text-[#64748B]">****-****-4829</p>
          </div>
        </div>
        <span className="text-[12px] font-medium text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded-full">
          MTR-2847561
        </span>
      </div>

      {/* Balance Section */}
      <div className="space-y-4">
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-sm text-[#64748B]">Current Balance</span>
            <span className="text-[12px] text-[#64748B]">Due Jan 15, 2026</span>
          </div>
          <p className="text-[1.875rem] font-semibold text-[#0F172A] tracking-tight leading-none">
            $84.32
          </p>
        </div>

        {/* Usage Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#64748B]">Usage this cycle</span>
            <span className="text-sm font-medium text-[#0F172A]">68%</span>
          </div>
          <div 
            role="progressbar" 
            aria-valuenow={68} 
            aria-valuemin={0} 
            aria-valuemax={100}
            className="relative w-full overflow-hidden rounded-full h-2 bg-[#F1F5F9]"
          >
            <div 
              className="h-full bg-[#0F172A] transition-all duration-500 ease-out"
              style={{ width: '68%' }}
            ></div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <a href="/pay" className="block mt-6">
        <button 
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-[#0F172A]/20"
          data-testid="button-pay-now"
        >
          Pay Now
          <ArrowUpRight size={18} />
        </button>
      </a>
    </div>
  );
};

export default UtilityMainCard;