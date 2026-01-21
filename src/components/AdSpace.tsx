import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface AdSpaceProps {
    className?: string;
    variant?: 'native' | 'vertical' | 'card' | 'banner' | 'horizontal' | '320x50';
    zoneId?: string;
}

const AdSpace = ({ className, variant = 'native' }: AdSpaceProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={containerRef}
            className={cn(
                "bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 border border-border flex items-center justify-center text-muted-foreground text-sm font-medium transition-all hover:shadow-md hover:from-primary/10 hover:to-primary/10 overflow-hidden",
                variant === 'native' && "w-full min-h-[90px] rounded-lg py-4",
                variant === 'card' && "w-full h-full min-h-[280px] rounded-xl shadow-sm",
                variant === 'vertical' && "w-[160px] h-[300px] rounded-lg shadow-sm",
                variant === 'banner' && "w-[300px] h-[250px] rounded-lg shadow-sm",
                variant === 'horizontal' && "w-full h-[90px] rounded-lg shadow-sm",
                variant === '320x50' && "w-full max-w-[320px] h-[50px] rounded-lg shadow-sm mx-auto",
                className
            )}
        >
            <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
                <div className="text-xs text-muted-foreground font-medium">Ad Space</div>
            </div>
        </div>
    );
};

export default AdSpace;
