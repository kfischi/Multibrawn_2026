import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../Article.module.css';

export const metadata: Metadata = {
  title: "ממה להיזהר בוילה | טיפים MULTIBRAWN",
  description: "כל מה שצריך לדעת כדי להימנע מבעיות בוילה",
  keywords: ["וילות", "בטיחות", "טיפים"],
};

export default function Article() {
  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/">בית</Link>
          <span>/</span>
          <Link href="/blog">בלוג</Link>
          <span>/</span>
          <span>ממה להיזהר בוילה</span>
        </nav>

        <header className={styles.header}>
          <div className={styles.category}>וידאו</div>
          <h1 className={styles.title}>⚠️ ממה להיזהר בוילה</h1>
          <div className={styles.meta}>
            <span>23 בדצמבר 2024</span>
            <span>⏱️ 2 דקות</span>
          </div>
        </header>

        <div className={styles.content}>
          <div style={{ 
            position: 'relative', 
            paddingBottom: '177.78%',
            height: 0,
            overflow: 'hidden',
            maxWidth: '400px',
            margin: '0 auto 2rem',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
          }}>
            <video
              controls
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              poster="https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/22_tt9jvz.jpg"
            >
              <source src="https://res.cloudinary.com/dptyfvwyo/video/upload/v1763684101/Video3_omgivy.mp4" type="video/mp4" />
            </video>
          </div>

          <p>נקודות חשובות לבדוק כשמגיעים לוילה - למען הבטיחות שלכם.</p>
          
          <h2>על מה לשים לב?</h2>
          <p>צ'קליסט חשוב לוודא שהכל תקין ובטוח.</p>
        </div>

        <div className={styles.cta}>
          <h2>רוצים וילה בטוחה ומאובטחת?</h2>
          <p>נמצא לכם רק מקומות שעברו בדיקה!</p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className={styles.ctaButton}>דברו עם ערדית</Link>
            <a href="https://wa.me/972523983394?text=היי! רוצה וילה בטוחה" target="_blank" rel="noopener noreferrer" className={styles.ctaButtonWhatsapp}>וואטסאפ</a>
          </div>
        </div>
      </div>
    </article>
  );
}
