import React from 'react';
import { Bell } from 'lucide-react';

/**
 * HeaderSection Component
 * 
 * Clones the header section with the "Good morning" greeting, user name "Alex",
 * and a notification bell button with a primary color dot indicator.
 * 
 * Styled according to the "Modern Fintech Soft-UI" aesthetic.
 */
const HeaderSection: React.FC = () => {
  return (
    <header className="flex items-center justify-between mb-8 animate-fade-up">
      <div className="flex flex-col">
        <p className="text-muted-foreground text-sm font-medium leading-[1.4] transition-all">
          Good morning
        </p>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight leading-[1.25]">
          Alex
        </h1>
      </div>
      
      <a href="/notifications" className="block">
        <button 
          className="relative w-11 h-11 rounded-full bg-card card-soft flex items-center justify-center transition-all hover:bg-secondary cursor-pointer focus:outline-none"
          aria-label="Notifications"
          data-testid="button-notifications"
        >
          <Bell 
            size={20} 
            strokeWidth={2}
            className="text-foreground transition-colors" 
          />
          {/* Notification Indicator Dot */}
          <span className="absolute top-[10px] right-[10px] w-2 h-2 bg-primary rounded-full ring-[2px] ring-card"></span>
        </button>
      </a>
    </header>
  );
};

export default HeaderSection;