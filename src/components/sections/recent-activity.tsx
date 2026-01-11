import React from "react";
import { ChevronRight, ArrowUpRight, Receipt } from "lucide-react";

/**
 * RecentActivity Component
 * 
 * A pixel-perfect clone of the "Recent Activity" section for the VoltFlow dashboard.
 * Features a list of transactions (Payments and Bill Generations) with specific
 * color coding for success (green) and muted (gray) states.
 */
const RecentActivity = () => {
  const activities = [
    {
      id: 0,
      type: "Payment",
      date: "Dec 28",
      amount: "-$127.45",
      isPositive: false,
      iconType: "payment",
    },
    {
      id: 1,
      type: "Bill Generated",
      date: "Dec 15",
      amount: "+$127.45",
      isPositive: true,
      iconType: "bill",
    },
    {
      id: 2,
      type: "Payment",
      date: "Nov 28",
      amount: "-$115.20",
      isPositive: false,
      iconType: "payment",
    },
  ];

  return (
    <section className="mt-8 animate-fade-up">
      {/* Header with "View all" link */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-[#171C26] leading-normal">
          Recent Activity
        </h3>
        <a 
          href="/history" 
          className="group focus:outline-none"
        >
          <button 
            className="text-sm font-medium text-black flex items-center gap-1 transition-colors hover:opacity-70"
            data-testid="link-view-all"
          >
            View all
            <ChevronRight className="w-4 h-4" />
          </button>
        </a>
      </div>

      {/* Activity List Items */}
      <div className="space-y-3">
        {activities.map((activity) => (
          <a key={activity.id} href="/history" className="block outline-none">
            <div 
              className="flex items-center justify-between p-4 bg-white rounded-[1rem] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] cursor-pointer transition-all duration-300 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] active:scale-[0.98]"
              data-testid={`activity-item-${activity.id}`}
            >
              <div className="flex items-center gap-3">
                {/* Icon Container with conditional backgrounds */}
                <div 
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    activity.iconType === "payment" 
                      ? "bg-[#22C55E]/10" 
                      : "bg-[#F1F5F9]"
                  }`}
                >
                  {activity.iconType === "payment" ? (
                    <ArrowUpRight 
                      className="w-[18px] h-[18px] text-[#22C55E] transform rotate-180" 
                    />
                  ) : (
                    <Receipt 
                      className="w-[18px] h-[18px] text-[#64748B]" 
                    />
                  )}
                </div>

                {/* Text Content */}
                <div>
                  <p className="font-semibold text-[#171C26] text-sm leading-tight">
                    {activity.type}
                  </p>
                  <p className="text-xs font-medium text-[#64748B] mt-0.5">
                    {activity.date}
                  </p>
                </div>
              </div>

              {/* Amount - directional color coding */}
              <p 
                className={`font-semibold text-sm ${
                  activity.isPositive 
                    ? "text-[#64748B]" 
                    : "text-[#171C26]"
                }`}
              >
                {activity.amount}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default RecentActivity;