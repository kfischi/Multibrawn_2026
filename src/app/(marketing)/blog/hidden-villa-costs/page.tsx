import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../Article.module.css';

export const metadata: Metadata = {
  title: "עלויות נסתרות בצימרים | MULTIBRAWN",
  description: "כל העלויות הנסתרות שצריך לדעת לפני ההזמנה",
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
          <span>עלויות נסתרות</span>
        </nav>

        <header className={styles.header}>
          <div className={styles.category}>טיפים</div>
          <h1 className={styles.title}>עלויות נסתרות בצימרים</h1>
          <div className={styles.meta}>
            <span>20 בדצמבר 2024</span>
            <span>⏱️ 5 דקות</span>
          </div>
        </header>

        <div className={styles.content}>
          <p>כל העלויות הנסתרות שצריך לדעת לפני ההזמנה.</p>
          <p>תוכן מפורט יתווסף בקרוב.</p>
        </div>

        <div className={styles.cta}>
          <h2>רוצים צימר ללא הפתעות?</h2>
          <p>דברו איתנו!</p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className={styles.ctaButton}>דברו עם ערדית</Link>
            <a href="https://wa.me/972523983394" target="_blank" rel="noopener noreferrer" className={styles.ctaButtonWhatsapp}>וואטסאפ</a>
          </div>
        </div>
      </div>
    </article>
  );
}
