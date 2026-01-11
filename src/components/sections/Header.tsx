import React from 'react';
import { Bell } from 'lucide-react';

/**
 * Header Section Component
 * 
 * Features:
 * - User greeting "Good morning Alex"
 * - Exact typography from computed styles (Inter/Plus Jakarta Sans)
 * - Notification bell button with primary color active indicator
 * - Fade-up entrance animation
 */

export default function Header() {
  return (
    <header 
      className="flex items-center justify-between mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-forwards"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'between',
        marginBottom: '32px',
      }}
    >
      <div>
        {/* Greeting Label */}
        <p 
          className="text-muted-foreground font-medium"
          style={{
            fontSize: '14px',
            lineHeight: '20px',
            color: '#64748B', // text-muted-foreground
            marginBottom: '0px',
          }}
        >
          Good morning
        </p>
        
        {/* User Name */}
        <h1 
          className="font-semibold text-foreground tracking-tight"
          style={{
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '32px',
            letterSpacing: '-0.025em',
            color: '#0F172A', // text-foreground
            margin: '0px',
          }}
        >
          Alex
        </h1>
      </div>

      {/* Notification Button Container */}
      <a 
        href="/notifications" 
        className="block"
        style={{
          width: '44px',
          height: '44px',
          textDecoration: 'none',
        }}
      >
        <button 
          className="relative flex items-center justify-center transition-all duration-300 hover:bg-secondary active:scale-95"
          data-testid="button-notifications"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '9999px',
            backgroundColor: '#FFFFFF', // bg-card
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.02)', // shadow-soft/card-soft
            border: 'none',
            cursor: 'pointer',
            padding: '0px',
          }}
        >
          <Bell 
            size={20} 
            strokeWidth={2}
            className="text-foreground"
            style={{
              color: '#0F172A',
            }}
          />
          
          {/* Primary Active Indicator Dot */}
          <span 
            className="absolute"
            style={{
              top: '10px',
              right: '10px',
              width: '8px',
              height: '8px',
              backgroundColor: '#0F172A', // bg-primary
              borderRadius: '50%',
              border: '2px solid #FFFFFF', // Creates a clean gap from the button
              boxSizing: 'content-box',
            }}
          />
        </button>
      </a>
    </header>
  );
}