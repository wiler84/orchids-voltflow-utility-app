import React from 'react';
import { RefreshCw, ChartLine, Headphones, Gauge } from 'lucide-react';

const QuickActions = () => {
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
    <section className="animate-fade-up-delay-3" style={{ animationDelay: '300ms' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 
          className="font-semibold text-foreground" 
          style={{ 
            fontSize: '1rem', 
            lineHeight: '1.5',
            color: 'rgb(23, 28, 38)' 
          }}
        >
          Quick Actions
        </h3>
      </div>
      
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-1 px-1">
        {actions.map((action, index) => {
          const Content = (
            <button
              data-testid={action.testId}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-card card-soft text-sm font-medium text-foreground whitespace-nowrap transition-smooth hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/10"
              style={{
                backgroundColor: '#FFFFFF',
                boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                fontSize: '14px',
                fontWeight: 500,
                color: 'rgb(23, 28, 38)',
              }}
            >
              {action.icon}
              {action.label}
            </button>
          );

          if (action.href !== '#') {
            return (
              <a key={index} href={action.href} className="inline-block">
                {Content}
              </a>
            );
          }

          return (
            <div key={index} className="inline-block">
              {Content}
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .transition-smooth {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-fade-up-delay-3 {
          animation: fadeUp 0.5s ease-out forwards;
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default QuickActions;