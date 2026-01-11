import React from 'react';
import { RefreshCw, ChartLine, Headphones, Gauge } from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    {
      label: 'Auto-pay',
      icon: <RefreshCw size={16} className="text-muted-foreground" />,
      href: '/autopay',
      testId: 'button-quick-auto-pay',
    },
    {
      label: 'Usage Graph',
      icon: <ChartLine size={16} className="text-muted-foreground" />,
      href: '/usage',
      testId: 'button-quick-usage-graph',
    },
    {
      label: 'Support',
      icon: <Headphones size={16} className="text-muted-foreground" />,
      href: '#',
      testId: 'button-quick-support',
    },
    {
      label: 'Analytics',
      icon: <Gauge size={16} className="text-muted-foreground" />,
      href: '/analytics',
      testId: 'button-quick-analytics',
    },
  ];

  return (
    <section className="animate-fade-up-delay-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground text-base">Quick Actions</h3>
      </div>
      
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-1 px-1">
        {actions.map((action, index) => {
          const content = (
            <button
              key={index}
              data-testid={action.testId}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-card shadow-card-soft border border-border/40 text-sm font-medium text-foreground whitespace-nowrap transition-all duration-300 hover:bg-secondary active:scale-95"
            >
              {action.icon}
              {action.label}
            </button>
          );

          if (action.href !== '#') {
            return (
              <a key={index} href={action.href} className="inline-block">
                {content}
              </a>
            );
          }

          return content;
        })}
      </div>
    </section>
  );
};

export default QuickActions;