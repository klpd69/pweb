import { useEffect, useRef } from 'react';

const VideoSliderAd = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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
        const timer = setTimeout(initAdProvider, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div 
            ref={containerRef}
            className="w-full h-full bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 rounded-xl p-3 flex items-center justify-center border border-border shadow-sm hover:shadow-md transition-all overflow-hidden"
        >
            <ins 
                className="eas6a97888e31" 
                data-zoneid="5835076"
                style={{ display: 'block', width: '100%', minHeight: '250px' }}
            ></ins>
        </div>
    );
};

export default VideoSliderAd;
