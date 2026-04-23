import React, { useEffect, useRef } from 'react';

// Web3Forms shared hCaptcha site key
const HCAPTCHA_SITE_KEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be7';

interface CaptchaProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  theme?: 'light' | 'dark';
}

declare global {
  interface Window {
    hcaptcha: {
      render: (container: HTMLElement, params: Record<string, any>) => string;
      reset: (widgetId: string) => void;
      execute: (widgetId: string) => void;
    };
  }
}

const Turnstile: React.FC<CaptchaProps> = ({ onVerify, onExpire, theme = 'light' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    const renderWidget = () => {
      if (containerRef.current && window.hcaptcha && widgetIdRef.current === null) {
        widgetIdRef.current = window.hcaptcha.render(containerRef.current, {
          sitekey: HCAPTCHA_SITE_KEY,
          callback: onVerify,
          'expired-callback': () => {
            widgetIdRef.current = null;
            if (onExpire) onExpire();
          },
          theme,
        });
      }
    };

    if (window.hcaptcha) {
      renderWidget();
    } else {
      const interval = setInterval(() => {
        if (window.hcaptcha) {
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
