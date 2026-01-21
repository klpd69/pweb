import { useEffect } from 'react';

const VideoSliderAd = () => {
    useEffect(() => {
        // Initialize ad provider
        try {
            // @ts-ignore
            (window.AdProvider = window.AdProvider || []).push({ "serve": {} });
        } catch (err) {
            console.error('AdProvider error:', err);
        }
    }, []);

    return (
        <div className="w-full h-full bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 rounded-xl p-3 flex items-center justify-center border border-border shadow-sm hover:shadow-md transition-all">
            <ins className="eas6a97888e31" data-zoneid="5835076"></ins>
        </div>
    );
};

export default VideoSliderAd;
