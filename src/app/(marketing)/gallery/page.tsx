'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import styles from './Gallery.module.css';

export default function GalleryPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const categories = [
    { id: 'all', name: 'הכל', icon: '🏠' },
    { id: 'villa', name: 'וילות', icon: '🏛️' },
    { id: 'zimmer', name: 'צימרים', icon: '🏡' },
    { id: 'apartment', name: 'דירות', icon: '🏙️' },
    { id: 'hotel', name: 'מלונות', icon: '🏨' },
    { id: 'event', name: 'אירועים', icon: '💍' },
  ];

  const galleryItems = {
    villa: [
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/21_f14cql.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Hotel2_ag6ani.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818933/18_uwsdum.jpg' },
      { type: 'video', src: 'https://res.cloudinary.com/dptyfvwyo/video/upload/v1760818935/villa4.1_dhev1f.mp4' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/22_tt9jvz.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/20_t6yw8m.jpg' },
    ],
    zimmer: [
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726367/AA_s4nej0.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726074/A7_rwzsuo.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726071/A6_h6irii.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726071/A5_irr575.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726070/A4_mtzg9u.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818996/Zimmer2_ge7g6h.jpg' },
    ],
    apartment: [
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Apartment1_mrxdad.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Apartment2_u9fsdk.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/20_t6yw8m.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763724320/2_tlbzz1.jpg' },
    ],
    hotel: [
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Hotel1_ihkey7.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Hotel2_ag6ani.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1764666932/1_dywsb8.jpg' },
    ],
    event: [
      { type: 'video', src: 'https://res.cloudinary.com/dptyfvwyo/video/upload/v1762002985/1_s3cpd8.mp4' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1762003191/1_tsc6xx.jpg' },
    ],
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ type: '', src: '' });

  const openModal = (type: string, src: string) => {
    setModalContent({ type, src });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent({ type: '', src: '' });
  };

  const getFilteredItems = () => {
    if (selectedCategory === 'all') {
      return Object.entries(galleryItems).map(([category, items]) => ({
        category,
        items,
      }));
    }
    return [{ category: selectedCategory, items: galleryItems[selectedCategory as keyof typeof galleryItems] || [] }];
  };

  return (
    <div className={styles.galleryPage}>
      {/* Hero */}
      <div className={styles.galleryHero}>
        <div className={styles.heroContentInner}>
          <h1 className={styles.heroTitle}>הגלריה שלנו</h1>
          <p className={styles.heroSubtitle}>הצצה למקומות הכי שווים בארץ</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className={styles.filterContainer}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.filterBtn} ${selectedCategory === cat.id ? styles.active : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className={styles.gallerySection}>
        {getFilteredItems().map(({ category, items }) => (
          <div key={category} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>
              {categories.find(c => c.id === category)?.icon} {categories.find(c => c.id === category)?.name}
            </h2>
            <div className={styles.galleryRow}>
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className={styles.galleryCard}
                  onClick={() => openModal(item.type, item.src)}
                >
                  {item.type === 'image' ? (
                    <Image
                      src={item.src}
                      alt="Gallery item"
                      fill
                      className={styles.galleryImage}
                    />
                  ) : (
                    <>
                      <video className={styles.galleryImage} muted playsInline>
                        <source src={`${item.src}#t=0.1`} type="video/mp4" />
                      </video>
                      <div className={styles.videoPlayOverlay}>
                        <i className="fas fa-play"></i>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className={styles.videoModal} onClick={closeModal}>
          <div className={styles.modalCloseBtn}>
            <i className="fas fa-times"></i>
          </div>
          {modalContent.type === 'image' ? (
            <Image
              src={modalContent.src}
              alt="Gallery"
              width={1200}
              height={800}
              className={styles.modalImage}
            />
          ) : (
            <video className={styles.modalVideo} controls autoPlay>
              <source src={modalContent.src} type="video/mp4" />
            </video>
          )}
        </div>
      )}
    </div>
  );
}
