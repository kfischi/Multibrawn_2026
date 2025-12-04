'use client';

import Image from 'next/image';
import SocialLinks from '@/components/ui/SocialLinks/SocialLinks';
import styles from './About.module.css';

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.heroAbout}>
        <span className={styles.badge}>הסיפור שלנו</span>
        <h1 className={styles.heroTitle}>
          מתסכול אישי<br />לחזון משנה מציאות
        </h1>
        <p className={styles.heroSubtitle}>
          "לכל אדם מגיע שירות אישי שחוסך לו זמן ומבטיח לו 100% אמינות"
        </p>
      </section>

      {/* Story Section */}
      <section className={styles.storySection}>
        <div className={styles.storyGrid}>
          <div className={styles.storyImage}>
            <Image
              src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1762012646/Ardit_znq9aj.jpg"
              alt="ערדית בראון"
              width={600}
              height={700}
              className={styles.arditImage}
            />
          </div>
          <div className={styles.storyText}>
            <h2 className={styles.storyHeading}>שלום, שמי ערדית בראון</h2>
            <p className={styles.storyParagraph}>
              יזמית עם מעל <strong>10 שנות ניסיון</strong> בחיבור בין אנשים לחלומות שלהם.
            </p>
            <p className={styles.storyParagraph}>
              הכל התחיל מתסכול אישי: ראיתי איך אנשים מבזבזים שעות בחיפושים אינסופיים, רק כדי להתאכזב ממקום שלא תאם את התמונות והשאיפות שלהם.
            </p>
            <div className={styles.quoteBox}>
              הקמתי את Multibrawn על עיקרון פשוט: לכל אדם מגיע שירות אישי שחוסך לו זמן ומבטיח לו 100% אמינות.
            </div>
            <p className={styles.storyParagraph}>
              היום אני גאה להוביל צוות מומחים שמכיר כל נכס באופן אישי. אנחנו לא "עוד פלטפורמה", אנחנו הסוכנים האישיים שלכם.
            </p>
            <p className={styles.storyParagraph}>
              ההבטחה שלנו פשוטה: אנחנו מבצעים את כל הבדיקות, התיאומים והסינונים, כדי שלכם יישאר רק החלק המהנה - החוויה.
            </p>
            
            {/* Social Links */}
            <div className={styles.socialSection}>
              <h3 className={styles.socialHeading}>עקבו אחרינו</h3>
              <SocialLinks />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <div className={styles.statNumber}>10+</div>
            <div className={styles.statLabel}>שנות ניסיון</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statNumber}>500+</div>
            <div className={styles.statLabel}>אירועים</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statNumber}>50+</div>
            <div className={styles.statLabel}>לוקיישנים</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>אמינות</div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className={styles.videoSection}>
        <h2 className={styles.videoHeading}>הכירו את ערדית</h2>
        <div className={styles.videoContainer}>
          <video
            className={styles.videoPlayer}
            controls
            poster="https://res.cloudinary.com/dptyfvwyo/image/upload/v1762012646/Ardit_znq9aj.jpg"
          >
            <source
              src="https://res.cloudinary.com/dptyfvwyo/video/upload/v1763834667/Video-Multi_b11ehy.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </section>
    </div>
  );
}
