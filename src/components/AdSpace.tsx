import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AdSpaceProps {
    className?: string;
    variant?: 'native' | 'vertical' | 'card' | 'banner' | 'horizontal' | '320x50';
    zoneId?: string;
}

const AdSpace = ({ className, variant = 'native', zoneId }: AdSpaceProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load ad provider script
        const loadAdScript = () => {
            if (document.querySelector('script[src="https://a.magsrv.com/ad-provider.js"]')) {
                return; // Script already loaded
            }
            const script = document.createElement('script');
            script.src = 'https://a.magsrv.com/ad-provider.js';
            script.type = 'application/javascript';
            script.async = true;
            document.head.appendChild(script);
        };

        // Load 320x50 ad script
        const load320x50Script = () => {
            if (variant === '320x50') {
                const script = document.createElement('script');
                script.innerHTML = `
                  atOptions = {
                    'key' : '404184b13749a2a96a3ca9c588f1aa38',
                    'format' : 'iframe',
                    'height' : 50,
                    'width' : 320,
                    'params' : {}
                  };
                `;
                document.head.appendChild(script);
                
                const invokeScript = document.createElement('script');
                invokeScript.src = 'https://vetofellowshipfly.com/404184b13749a2a96a3ca9c588f1aa38/invoke.js';
                invokeScript.async = true;
                document.head.appendChild(invokeScript);
            }
        };

        loadAdScript();
        load320x50Script();

        // Initialize ad provider after component mounts
        const initAdProvider = () => {
            try {
                // @ts-ignore
                if (window.AdProvider) {
                    // @ts-ignore
                    window.AdProvider.push({ "serve": {} });
                }
            } catch (err) {
                console.error('AdProvider initialization error:', err);
            }
        };

        // Wait a bit for scripts to load
        const timer = setTimeout(initAdProvider, 800);

        return () => clearTimeout(timer);
    }, []);

    // Determine which zone ID to use based on variant
    const getZoneId = () => {
        if (zoneId) return zoneId;
        switch (variant) {
            case 'native':
                return '5835076'; // Display ad zone
            case 'vertical':
                return '5835072'; // Vertical ad zone
            case 'card':
                return '5835072'; // Card ad zone
            default:
                return '5835072';
        }
    };

    const getAdClass = () => {
        switch (variant) {
            case 'native':
                return 'eas6a97888e31';
            case 'vertical':
            case 'card':
                return 'eas6a97888e2';
            default:
                return 'eas6a97888e2';
        }
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 border border-border flex items-center justify-center text-muted-foreground text-sm font-medium transition-all hover:shadow-md hover:from-primary/10 hover:to-primary/10 overflow-hidden",
                // Default styling based on expectations of previous components
                variant === 'native' && "w-full min-h-[90px] rounded-lg py-4",
                variant === 'card' && "w-full h-full min-h-[280px] rounded-xl shadow-sm",
                variant === 'vertical' && "w-[160px] h-[300px] rounded-lg shadow-sm",
                variant === 'banner' && "w-[300px] h-[250px] rounded-lg shadow-sm",
                variant === 'horizontal' && "w-full h-[90px] rounded-lg shadow-sm",
                variant === '320x50' && "w-full max-w-[320px] h-[50px] rounded-lg shadow-sm mx-auto",
                className
            )}
        >
            <div className="flex flex-col items-center justify-center gap-0 w-full h-full">
                {variant === '320x50' ? (
                    // 320x50 ad placeholder - rendered by external script
                    <div className="w-full h-full flex items-center justify-center">
                        <ins className="adsbygoogle" style={{ display: 'inline-block', width: '320px', height: '50px' }} data-ad-client="ca-pub-0000000000000000" data-ad-slot="0000000000"></ins>
                    </div>
                ) : (
                    <ins 
                        className={getAdClass()}
                        data-zoneid={getZoneId()}
                        data-keywords="keywords"
                        data-sub="123450000"
                        style={{ display: 'block', width: '100%', height: '100%' }}
                    ></ins>
                )}
            </div>
        </div>
    );
};

export default AdSpace;
