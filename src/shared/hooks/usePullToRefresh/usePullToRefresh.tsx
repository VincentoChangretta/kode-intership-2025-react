import { useEffect, useState } from 'react';

export const usePullToRefresh = (onRefresh: () => void, threshold = 15) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState<number | null>(null);
  const [currentY, setCurrentY] = useState<number | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (scrollY === 0) {
        setStartY(e.touches[0].clientY);
        setCurrentY(e.touches[0].clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (scrollY === 0 && startY !== null) {
        setCurrentY(e.touches[0].clientY);

        const pullDistance = e.touches[0].clientY - startY;
        if (pullDistance > threshold) {
          setIsRefreshing(true);
        } else {
          setIsRefreshing(false);
        }
      }
    };

    const handleTouchEnd = () => {
      if (scrollY === 0 && isRefreshing) {
        onRefresh();
      }
      setIsRefreshing(false);
      setStartY(null);
      setCurrentY(null);
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isRefreshing, startY, onRefresh, threshold, scrollY]);

  return {
    isRefreshing,
    pullDistance: startY !== null && currentY !== null ? currentY - startY : 0,
  };
};
