import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { videoService } from '@/services/api';
import { Video } from '@/data/mockArticles';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdSpace from '@/components/AdSpace';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import VideoPlayer from '@/components/VideoPlayer';
import ArticleCard from '@/components/VideoCard';

const VideoDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [video, setVideo] = useState<Video | null>(null);
    const [loading, setLoading] = useState(true);
    const [recommendedVideos, setRecommendedVideos] = useState<Video[]>([]);
    const [visibleCount, setVisibleCount] = useState(12);
    const [hasLoadedMore, setHasLoadedMore] = useState(false);

    // Scroll to top when video ID changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [id]);

    useEffect(() => {
        const fetchVideoData = async () => {
            if (!id) return;
            try {
                // Reset states on new video
                setVisibleCount(12);
                setHasLoadedMore(false);

                // Fetch current video
                const currentVideo = await videoService.getVideoById(id);
                setVideo(currentVideo);

                // Fetch recommendations (all videos excluding current)
                const allVideos = await videoService.getVideos();

                // Filter and Shuffle
                const otherVideos = allVideos.filter(v => v.id !== id);
                for (let i = otherVideos.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [otherVideos[i], otherVideos[j]] = [otherVideos[j], otherVideos[i]];
                }

                setRecommendedVideos(otherVideos);

            } catch (error) {
                console.error(error);
                toast.error('Failed to load video');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchVideoData();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <p className="text-lg">Loading video...</p>
                </main>
                <Footer />
            </div>
        );
    }

    if (!video) return null;

    // Helper to render recommendations
    const renderRecommendations = () => {
        return recommendedVideos.slice(0, visibleCount).map(video => ({ type: 'video', data: video }));
    };

    const handleLoadMore = () => {
        if (!hasLoadedMore) {
            // First click: Load 6 more videos
            setVisibleCount(prev => prev + 6);
            setHasLoadedMore(true);
        } else {
            // Second click: Redirect to homepage
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                {/* Top Banner Ad */}
                <div className="container py-3">
                    <AdSpace variant="native" className="w-full" />
                </div>

                <div className="container py-8 max-w-5xl mx-auto">
                    <article className="space-y-8">
                        <div className="space-y-4">
                            <VideoPlayer key={video.id} url={video.videoUrl} title={video.title} />

                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-2">
                                    <Badge variant="secondary" className="capitalize">
                                        {video.category}
                                    </Badge>
                                    <h1 className="text-2xl md:text-4xl font-bold font-headline leading-tight">
                                        {video.title}
                                    </h1>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground py-2 border-b">
                                <span className="flex items-center gap-2">
                                    <User size={16} /> {video.author}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Calendar size={16} /> {video.publishedAt}
                                </span>
                            </div>
                        </div>

                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <div className="whitespace-pre-wrap leading-relaxed">
                                {video.description}
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border border-border rounded-lg p-4 my-6">
                            <AdSpace variant="card" className="w-full" />
                        </div>
                    </article>

                    {/* Recommended Videos Section */}
                    <div className="space-y-6 mt-12 pt-8 border-t">
                        <h2 className="text-2xl font-bold font-headline">Recommended Videos</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {renderRecommendations().map((item, idx) => (
                                <React.Fragment key={idx}>
                                    <ArticleCard article={item.data as Video} />
                                </React.Fragment>
                            ))}
                        </div>

                        <div className="flex justify-center pt-6">
                            <Button size="lg" variant="outline" className="min-w-[200px]" onClick={handleLoadMore}>
                                {hasLoadedMore ? 'View More on Homepage' : 'Load More Videos'}
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default VideoDetail;
