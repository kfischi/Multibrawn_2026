'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Home.module.css';

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      {/* Hero Section with Video Background */}
      <section className={styles.heroVideo}>
        <video 
          className={styles.videoBg} 
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source 
            src="https://res.cloudinary.com/dptyfvwyo/video/upload/v1763834667/Video-Multi_b11ehy.mp4" 
            type="video/mp4" 
          />
        </video>
        
        <div className={styles.videoOverlay}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              הלוקיישן המושלם<br />מחכה לכם
            </h1>
            <p className={styles.heroSubtitle}>
              וילות יוקרה, צימרים ומתחמי אירועים בסטנדרט בינלאומי
            </p>
            <div className={styles.heroBtnGroup}>
              <Link href="/contact" className={`${styles.heroBtn} ${styles.btnPrimary}`}>
                בואו נמצא לכם מקום
                <i className="fas fa-arrow-left"></i>
              </Link>
              <Link href="/gallery" className={`${styles.heroBtn} ${styles.btnGlass}`}>
                צפו בגלריה
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Location Cards Grid */}
      <section className={styles.locationsGrid}>
        <Link href="/gallery?category=villa" className={styles.locationCard}>
          <Image
            src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/22_tt9jvz.jpg"
            alt="וילות מפוארות"
            fill
            className={styles.locationImage}
          />
          <div className={styles.locationOverlay}>
            <h3>וילות מפוארות</h3>
          </div>
        </Link>

        <Link href="/gallery?category=zimmer" className={styles.locationCard}>
          <Image
            src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726367/AA_s4nej0.jpg"
            alt="צימרים"
            fill
            className={styles.locationImage}
          />
          <div className={styles.locationOverlay}>
            <h3>צימרים</h3>
          </div>
        </Link>

        <Link href="/gallery?category=apartment" className={styles.locationCard}>
          <Image
            src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Apartment1_mrxdad.jpg"
            alt="דירות נופש"
            fill
            className={styles.locationImage}
          />
          <div className={styles.locationOverlay}>
            <h3>דירות נופש</h3>
          </div>
        </Link>

        <Link href="/gallery?category=hotel" className={styles.locationCard}>
          <Image
            src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Hotel1_ihkey7.jpg"
            alt="מלונות בוטיק"
            fill
            className={styles.locationImage}
          />
          <div className={styles.locationOverlay}>
            <h3>מלונות בוטיק</h3>
          </div>
        </Link>

        <Link href="/gallery?category=event" className={styles.locationCard}>
          <Image
            src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1762003191/1_tsc6xx.jpg"
            alt="מתחמי אירועים"
            fill
            className={styles.locationImage}
          />
          <div className={styles.locationOverlay}>
            <h3>מתחמי אירועים</h3>
          </div>
        </Link>
      </section>
    </div>
  );
}
