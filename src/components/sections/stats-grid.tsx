import React from 'react';
import { Receipt, Wallet } from 'lucide-react';

/**
 * StatsGrid Component
 * Clones the two-column grid containing the "Last Payment" and "Wallet Balance" cards.
 * Features: hover elevation effects, subtle entry animations, and pixel-perfect styling from computed styles.
 */
const StatsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6 animate-fade-up-delay-2">
      {/* Last Payment Card */}
      <button 
        className="group bg-card rounded-2xl p-4 card-soft text-left cursor-pointer transition-all duration-300 ease-in-out hover:card-elevated hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary/10"
        data-testid="card-last-payment"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-success/10 to-success/5 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
          <Receipt 
            size={20} 
            className="text-success" 
            strokeWidth={2.5}
          />
        </div>
        <p className="text-[12px] font-medium text-muted-foreground mb-1 leading-[1.4]">
          Last Payment
        </p>
        <p className="text-[18px] font-semibold text-foreground leading-[1.1]">
          $127.45
        </p>
        <p className="text-[12px] font-medium text-muted-foreground mt-1 leading-[1.4]">
          Dec 28, 2025
        </p>
      </button>

      {/* Wallet Balance Card */}
      <a 
        href="/wallet" 
        className="group block"
        data-testid="card-wallet"
      >
        <div className="h-full bg-[hsl(35,25%,98%)] rounded-2xl p-4 card-soft cursor-pointer transition-all duration-300 ease-in-out hover:card-elevated hover:-translate-y-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber/10 to-amber/5 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
            <Wallet 
              size={20} 
              className="text-[#F59E0B]" 
              strokeWidth={2.5}
            />
          </div>
          <p className="text-[12px] font-medium text-muted-foreground mb-1 leading-[1.4]">
            Wallet Balance
          </p>
          <p className="text-[18px] font-semibold text-foreground leading-[1.1]">
            $250.00
          </p>
          <p className="text-[12px] font-medium text-muted-foreground mt-1 leading-[1.4] transition-colors group-hover:text-primary">
            Add funds
          </p>
        </div>
      </a>
    </div>
  );
};

export default StatsGrid;