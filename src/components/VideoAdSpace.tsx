import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface VideoAdSpaceProps {
    className?: string;
}

const VideoAdSpace = ({ className = '' }: VideoAdSpaceProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load ad provider script for video ads
        const loadVideoAdScript = () => {
            if (document.querySelector('script[src="https://a.magsrv.com/ad-provider.js"]')) {
                return; // Script already loaded
            }
            const script = document.createElement('script');
            script.src = 'https://a.magsrv.com/ad-provider.js';
            script.type = 'application/javascript';
            script.async = true;
            document.head.appendChild(script);
        };

        loadVideoAdScript();

        // Initialize video ad provider
        const initVideoAd = () => {
            try {
                // @ts-ignore
                if (window.AdProvider) {
                    // @ts-ignore
                    window.AdProvider.push({ "serve": {} });
                }
            } catch (err) {
                console.error('Video AdProvider initialization error:', err);
            }
        };

        const timer = setTimeout(initVideoAd, 800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            ref={containerRef}
            className={cn(
                "bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 border border-border flex items-center justify-center text-muted-foreground text-sm font-medium transition-all hover:shadow-md overflow-hidden rounded-lg",
                "w-full min-h-[300px]",
                className
            )}
        >
            <div className="flex flex-col items-center justify-center gap-0 w-full h-full">
                <ins 
                    className="eas6a97888e1"
                    data-zoneid="5835074"
                    data-vasturl="https://s.magsrv.com/v1/vast.php?idzone=5835074"
                    style={{ display: 'block', width: '100%', height: '100%' }}
                ></ins>
            </div>
        </div>
    );
};

export default VideoAdSpace;
