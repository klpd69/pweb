import { Video } from '@/data/mockArticles';
import ArticleCard from './VideoCard';
import AdSpace from './AdSpace';
import VideoSliderAd from './VideoSliderAd';
import React, { useState, useEffect } from 'react';

interface ArticleGridProps {
  articles: Video[];
  title?: string;
}

const ArticleGrid = ({ articles, title }: ArticleGridProps) => {
  const [columnCount, setColumnCount] = useState(4);

  // Update column count based on window width
  useEffect(() => {
    const updateColumnCount = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumnCount(1);
      } else if (width < 1024) {
        setColumnCount(2);
      } else if (width < 1280) {
        setColumnCount(3);
      } else {
        setColumnCount(4);
      }
    };

    updateColumnCount();
    window.addEventListener('resize', updateColumnCount);
    return () => window.removeEventListener('resize', updateColumnCount);
  }, []);

  const injectAds = (articles: Video[]) => {
    const itemsWithAds: React.ReactNode[] = [];
    // Dynamically calculate ad positions based on column count
    // Distribute ads evenly throughout the grid
    const itemsPerPage = columnCount * 4; // Assume 4 rows visible
    const adSpacing = Math.ceil(itemsPerPage / 3); // Roughly 3 ads per screen
    const adPositions = new Set<number>();
    
    for (let i = adSpacing - 1; i < articles.length; i += adSpacing) {
      adPositions.add(i);
    }

    articles.forEach((article, index) => {
      itemsWithAds.push(<ArticleCard key={article.id} article={article} />);

      if (adPositions.has(index)) {
        // Alternate between regular ads and video slider ads
        const useVideoSliderAd = index % 9 === 8; // Use video slider ad periodically
        itemsWithAds.push(
          <div key={`ad-${index}`} className="col-span-1 rounded-xl overflow-hidden shadow-md border border-border bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center min-h-[300px] p-0 hover:shadow-lg transition-all">
            {useVideoSliderAd ? (
              <VideoSliderAd />
            ) : (
              <AdSpace variant="card" className="w-full h-full" />
            )}
          </div>
        );
      }
    });
    return itemsWithAds;
  };

  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }[columnCount] || 'grid-cols-4';

  return (
    <section className="container py-8">
      {title && (
        <h2 className="font-headline text-2xl font-bold mb-6">
          {title}
        </h2>
      )}

      {/* Dynamic responsive grid */}
      <div className={`grid ${gridColsClass} gap-x-4 gap-y-8`}>
        {injectAds(articles)}
      </div>
    </section>
  );
};

export default ArticleGrid;