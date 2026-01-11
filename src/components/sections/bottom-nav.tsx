"use client";

import React from "react";
import { House, CreditCard, Clock, User } from "lucide-react";

/**
 * BottomNav Component
 *
 * A pixel-perfect clone of the fixed glass-morphism bottom navigation bar.
 * Features:
 * - Glassmorphism effect (blur + semi-transparent background)
 * - Navigation items with icons and 11px medium labels
 * - Active state indicator (primary color text/icon + dot above active element)
 * - Responsive container with max-width: 32rem (max-lg) to match the mobile-first design
 * - Support for safe area insets on mobile devices
 */
const BottomNav = () => {
  // Navigation items configuration
  const navItems = [
    { id: "home", label: "Home", icon: House, href: "/", isActive: true },
    { id: "pay", label: "Pay", icon: CreditCard, href: "/pay", isActive: false },
    { id: "history", label: "History", icon: Clock, href: "/history", isActive: false },
    { id: "profile", label: "Profile", icon: User, href: "/profile", isActive: false },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 glass-nav bg-white/70 border-t border-white/50"
      data-testid="bottom-nav"
    >
      <div className="max-w-lg mx-auto px-6 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <a key={item.id} href={item.href} className="flex-1">
              <button
                className="relative w-full flex flex-col items-center gap-1 py-2 px-1 rounded-2xl transition-all duration-300"
                data-testid={`nav-${item.id}`}
              >
                {/* Active Dot Indicator */}
                {item.isActive && (
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}

                {/* Icon */}
                <div className="flex items-center justify-center">
                  <item.icon
                    size={22}
                    strokeWidth={2}
                    className={`transition-all duration-300 ${
                      item.isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                </div>

                {/* Label */}
                <span
                  className={`text-[11px] font-medium leading-none transition-all duration-300 ${
                    item.isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;