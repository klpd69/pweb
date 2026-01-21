import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AdSpaceProps {
    className?: string;
    variant?: 'native' | 'vertical' | 'card' | 'banner';
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

        loadAdScript();

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
                className
            )}
        >
            <div className="flex flex-col items-center justify-center gap-0 w-full h-full">
                <ins 
                    className={getAdClass()}
                    data-zoneid={getZoneId()}
                    data-keywords="keywords"
                    data-sub="123450000"
                    style={{ display: 'block', width: '100%', height: '100%' }}
                ></ins>
            </div>
        </div>
    );
};

export default AdSpace;
