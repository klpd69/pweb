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
        <div className="w-full bg-muted/30 rounded-lg p-4">
            <ins className="eas6a97888e31" data-zoneid="5835076"></ins>
        </div>
    );
};

export default VideoSliderAd;
