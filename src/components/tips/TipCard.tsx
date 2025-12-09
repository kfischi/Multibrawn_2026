'use client';

import { useState } from 'react';
import styles from './TipCard.module.css';

interface TipCardProps {
  tip: {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnail: string;
    duration: string;
    category: string;
  };
}

export default function TipCard({ tip }: TipCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className={styles.card}>
      {/* Video Player - EMBEDDED! */}
      <div className={styles.videoContainer}>
        {!isPlaying ? (
          // Thumbnail + Play Button
          <div className={styles.thumbnail} onClick={handlePlay}>
            <img
              src={tip.thumbnail}
              alt={tip.title}
              className={styles.thumbnailImage}
            />
            <div className={styles.playOverlay}>
              <button className={styles.playButton} aria-label="נגן וידאו">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
            <div className={styles.duration}>{tip.duration}</div>
            <div className={styles.category}>{tip.category}</div>
          </div>
        ) : (
          // Video Player - PLAYS IN CARD!
          <div className={styles.videoWrapper}>
            <video
              src={tip.videoUrl}
              controls
              autoPlay
              className={styles.video}
              onEnded={() => setIsPlaying(false)}
            >
              הדפדפן שלך לא תומך בהצגת וידאו.
            </video>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.title}>{tip.title}</h3>
        <p className={styles.description}>{tip.description}</p>
        
        {!isPlaying && (
          <button className={styles.watchButton} onClick={handlePlay}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            צפה עכשיו
          </button>
        )}
      </div>
    </div>
  );
}
