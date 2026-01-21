import { useEffect } from 'react';

interface NativeBannerProps {
  title?: string;
  className?: string;
}

const NativeBanner = ({ title = 'NativeBanner_1', className = '' }: NativeBannerProps) => {
  useEffect(() => {
    // Dynamically load the native banner script
    const script = document.createElement('script');
    script.src = 'https://pl28534864.effectivegatecpm.com/f248029efe8daebdd1513b1a364d6761/invoke.js';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    
    const container = document.getElementById('container-f248029efe8daebdd1513b1a364d6761');
    if (container) {
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup - remove script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className={`w-full bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border border-border rounded-lg p-6 ${className}`}>
      <div className="mb-4 text-sm font-semibold text-muted-foreground opacity-75">{title}</div>
      <div id="container-f248029efe8daebdd1513b1a364d6761" className="w-full"></div>
    </div>
  );
};

export default NativeBanner;
