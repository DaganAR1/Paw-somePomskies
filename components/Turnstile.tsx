import React, { useEffect, useRef } from 'react';

// Web3Forms shared Cloudflare Turnstile site key
const TURNSTILE_SITE_KEY = '0x4AAAAAAAC3vh1zYhFtQMq1';

interface TurnstileProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  theme?: 'light' | 'dark' | 'auto';
}

declare global {
  interface Window {
    turnstile: {
      render: (container: HTMLElement, options: Record<string, any>) => string;
      reset: (widgetId: string) => void;
    };
  }
}

const Turnstile: React.FC<TurnstileProps> = ({ onVerify, onExpire, theme = 'auto' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    const renderWidget = () => {
      if (containerRef.current && window.turnstile && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: onVerify,
          'expired-callback': () => {
            widgetIdRef.current = null;
            if (onExpire) onExpire();
          },
          theme,
        });
      }
    };

    // If Turnstile already loaded, render immediately
    if (window.turnstile) {
      renderWidget();
    } else {
      // Otherwise wait for the script to load
      const interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval);
          renderWidget();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  return <div ref={containerRef} className="mt-2" />;
};

export default Turnstile;
