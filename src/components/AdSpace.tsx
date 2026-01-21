import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AdSpaceProps {
    className?: string;
    variant?: 'native' | 'vertical' | 'card' | 'banner';
}

const AdSpace = ({ className, variant = 'native' }: AdSpaceProps) => {
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
                    className="eas6a97888e2" 
                    data-zoneid="5835072"
                    style={{ display: 'block', width: '100%', minHeight: '60px' }}
                ></ins>
            </div>
        </div>
    );
};

export default AdSpace;
