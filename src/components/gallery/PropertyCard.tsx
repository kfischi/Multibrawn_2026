'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './PropertyCard.module.css';
import MediaModal from './MediaModal';

interface PropertyCardProps {
  property: {
    id: string;
    name: string;
    type: string;
    location: string;
    guests: string;
    features: string[];
    images: string[];
    videos?: string[];
    description: string;
  };
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Combine images and videos
  const allMedia = [
    ...property.images.map((url) => ({ url, type: 'image' as const, alt: property.name })),
    ...(property.videos?.map((url) => ({ url, type: 'video' as const })) || []),
  ];

  const handleImageClick = (index: number) => {
    setCurrentMediaIndex(index);
    setIsModalOpen(true);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
  };

  // Show max 5 images in carousel, rest accessible via modal
  const displayImages = property.images.slice(0, 5);
  const hasMoreImages = property.images.length > 5;

  return (
    <>
      <div className={styles.card}>
        {/* Image Carousel */}
        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            <Image
              src={displayImages[currentImageIndex]}
              alt={`${property.name} - תמונה ${currentImageIndex + 1}`}
              width={400}
              height={300}
              className={styles.mainImage}
              onClick={() => handleImageClick(currentImageIndex)}
            />

            {/* Navigation Arrows - Only if multiple images */}
            {displayImages.length > 1 && (
              <>
                <button
                  className={`${styles.navButton} ${styles.prev}`}
                  onClick={handlePrevImage}
                  aria-label="תמונה קודמת"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  className={`${styles.navButton} ${styles.next}`}
                  onClick={handleNextImage}
                  aria-label="תמונה הבאה"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}

            {/* Image Counter */}
            {displayImages.length > 1 && (
              <div className={styles.imageCounter}>
                {currentImageIndex + 1} / {property.images.length}
              </div>
            )}
          </div>

          {/* Thumbnail Dots - Horizontal Scroll */}
          {displayImages.length > 1 && (
            <div className={styles.thumbnails}>
              {displayImages.map((image, index) => (
                <button
                  key={index}
                  className={`${styles.thumbnail} ${index === currentImageIndex ? styles.active : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={image}
                    alt={`תמונה ממוזערת ${index + 1}`}
                    width={60}
                    height={45}
                    className={styles.thumbnailImage}
                  />
                </button>
              ))}
              {hasMoreImages && (
                <button
                  className={`${styles.thumbnail} ${styles.moreThumbnail}`}
                  onClick={() => {
                    setCurrentMediaIndex(5);
                    setIsModalOpen(true);
                  }}
                >
                  <span className={styles.moreText}>+{property.images.length - 5}</span>
                </button>
              )}
            </div>
          )}

          {/* Video Badge */}
          {property.videos && property.videos.length > 0 && (
            <button
              className={styles.videoBadge}
              onClick={() => {
                setCurrentMediaIndex(property.images.length); // First video
                setIsModalOpen(true);
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>{property.videos.length} סרטונים</span>
            </button>
          )}
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.header}>
            <h3 className={styles.title}>{property.name}</h3>
            <span className={styles.type}>{property.type}</span>
          </div>

          <div className={styles.location}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{property.location}</span>
          </div>

          <div className={styles.guests}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>{property.guests}</span>
          </div>

          <p className={styles.description}>{property.description}</p>

          <div className={styles.features}>
            {property.features.slice(0, 3).map((feature, index) => (
              <span key={index} className={styles.feature}>
                {feature}
              </span>
            ))}
            {property.features.length > 3 && (
              <span className={styles.featureMore}>+{property.features.length - 3}</span>
            )}
          </div>

          <button
            className={styles.viewButton}
            onClick={() => {
              setCurrentMediaIndex(0);
              setIsModalOpen(true);
            }}
          >
            צפה בפרטים המלאים
          </button>
        </div>
      </div>

      {/* Media Modal */}
      <MediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        media={allMedia}
        currentIndex={currentMediaIndex}
        onNavigate={setCurrentMediaIndex}
      />
    </>
  );
}
