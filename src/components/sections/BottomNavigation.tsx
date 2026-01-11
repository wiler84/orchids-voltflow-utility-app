import React from 'react';
import { House, CreditCard, Clock, User } from 'lucide-react';

/**
 * BottomNavigation Component
 * 
 * A fixed bottom navigation bar with a glassmorphism background effect.
 * Features Home, Pay, History, and Profile items with active state indicators.
 * Optimized for mobile-first views with a max-width constraint for desktop.
 */
const BottomNavigation: React.FC = () => {
  // Navigation items definition
  const navItems = [
    { id: 'home', label: 'Home', icon: House, href: '/', active: true },
    { id: 'pay', label: 'Pay', icon: CreditCard, href: '/pay', active: false },
    { id: 'history', label: 'History', icon: Clock, href: '/history', active: false },
    { id: 'profile', label: 'Profile', icon: User, href: '/profile', active: false },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 glass-nav"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.5)',
      }}
      data-testid="bottom-nav"
    >
      <div className="max-w-lg mx-auto px-6 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <a 
              key={item.id} 
              href={item.href}
              className="group"
            >
              <button 
                className={`relative flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]`}
                data-testid={`nav-${item.id}`}
              >
                {/* Icon Container */}
                <div className="flex items-center justify-center">
                  <item.icon 
                    size={22} 
                    strokeWidth={item.active ? 2.5 : 2}
                    className={`transition-all duration-300 ${
                      item.active 
                        ? 'text-[#0F172A]' 
                        : 'text-[#64748B] group-hover:text-[#0F172A]'
                    }`}
                  />
                </div>

                {/* Label */}
                <span 
                  className={`text-[11px] font-medium transition-all duration-300 ${
                    item.active 
                      ? 'text-[#0F172A]' 
                      : 'text-[#64748B] group-hover:text-[#0F172A]'
                  }`}
                >
                  {item.label}
                </span>

                {/* Active Indicator Dot */}
                {item.active && (
                  <div 
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0F172A] animate-in fade-in zoom-in duration-300"
                  />
                )}
              </button>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;