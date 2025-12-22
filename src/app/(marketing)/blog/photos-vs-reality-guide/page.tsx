'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../Article.module.css';

export default function PhotosVsRealityPage() {
  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Link href="/">בית</Link> / <Link href="/blog">בלוג</Link> / תמונות מול מציאות
        </div>

        <header className={styles.header}>
          <span className={styles.category}>טיפים</span>
          <h1 className={styles.title}>בתמונה זה נראה אולם נשפים, במציאות הספה חוסמת את הדלת. איך לא ליפול בפח?</h1>
          <div className={styles.meta}>
            <span>📅 20.12.2024</span>
            <span>⏱️ 5 דקות קריאה</span>
          </div>
        </header>

        <div className={styles.featuredImage}>
          <Image 
            // החלף בתמונה שלך כשתהיה
            src="https://res.cloudinary.com/dptyfvwyo/image/upload/f_auto,q_auto/v1765034116/Logo_1_dgyryu_e_background_removal_f_png_xpwl2w.png"
            alt="חדר קטן מול רחב" 
            fill 
            style={{ objectFit: 'cover' }} 
          />
        </div>

        <div className={styles.content}>
          <p>
            אנחנו חיים בעידן האינסטגרם. אתם גולשים באתר, רואים תמונה של סלון ענק... מגיעים למקום, פותחים את הדלת וחטפים שוק. החדר צפוף, המיטה צמודה לקיר, והמזוודה? אין איפה לפתוח אותה.
          </p>
          
          <h2>הטריק: עדשה רחבה (Wide Lens)</h2>
          <p>
            צלמי נדל"ן משתמשים בעדשה ש"פותחת" את החלל. היא לוקחת חדר של 3X3 מטר וגורמת לו להיראות כמו אולם. זה חוקי, אבל מטעה.
          </p>

          <h2>איך מזהים את הטריק?</h2>
          <ul>
            <li><strong>שיטת המרצפות:</strong> חפשו את הרצפה. ספרו כמה מרצפות יש בין המיטה לקיר. אם יש רק אחת וחצי? המרחק הוא בקושי מטר.</li>
            <li><strong>עיוות בפינות:</strong> הסתכלו על הטלוויזיה או העציץ בקצה התמונה. אם הם נראים "מרוחים" או רחבים בצורה מוזרה, זו עדשה רחבה.</li>
            <li><strong>וילונות סגורים:</strong> למה סגור בצהריים? אולי כדי להסתיר קיר בטון או חניה.</li>
          </ul>

          <h3>הסכנה האמיתית: משפחות עם לול</h3>
          <p>
            לזוגות זה אולי "אינטימי", אבל למשפחה שצריכה להכניס לול קמפינג – חדר קטן הוא אסון.
          </p>

          <div className={styles.cta}>
            <h2>אנחנו העיניים שלכם בשטח</h2>
            <p>ב-Multibrawn אנחנו בודקים פיזית שהחדרים מרווחים ולא "קופסאות גפרורים".</p>
            <div className={styles.ctaButtons}>
              <a href="https://wa.me/972XXXXXXXXX" className={styles.ctaButtonWhatsapp}>מצאו לי צימר מרווח 💬</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
