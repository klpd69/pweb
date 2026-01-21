import { useEffect, useRef } from 'react';

interface NativeBannerProps {
  title?: string;
  className?: string;
}

const NativeBanner = ({ title = 'NativeBanner_1', className = '' }: NativeBannerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Dynamically load the native banner script
    const loadScript = () => {
      // Check if script already exists
      if (scriptRef.current) return;

      const script = document.createElement('script');
      script.src = 'https://pl28534864.effectivegatecpm.com/f248029efe8daebdd1513b1a364d6761/invoke.js';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.onerror = () => console.error('Failed to load native banner script');
      
      scriptRef.current = script;
      document.head.appendChild(script);
    };

    // Wait a bit to ensure DOM is ready
    const timer = setTimeout(loadScript, 100);

    return () => {
      clearTimeout(timer);
      // Cleanup - remove script on unmount
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`w-full bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border border-border rounded-lg p-6 ${className}`}
    >
      <div className="mb-4 text-sm font-semibold text-muted-foreground opacity-75">{title}</div>
      <div id="container-f248029efe8daebdd1513b1a364d6761" className="w-full min-h-[300px]"></div>
    </div>
  );
};

export default NativeBanner;
