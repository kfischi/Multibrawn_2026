'use client';

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
          &quot;לכל אדם מגיע שירות אישי שחוסך לו זמן ומבטיח לו 100% אמינות&quot;
        </p>
      </section>

      {/* Story Section with Video */}
      <section className={styles.storySection}>
        <div className={styles.storyGrid}>
          <div className={styles.storyVideo}>
            <video
              className={styles.video}
              controls
              poster="https://res.cloudinary.com/dptyfvwyo/image/upload/v1762012646/Ardit_znq9aj.jpg"
            >
              <source
                src="https://res.cloudinary.com/dptyfvwyo/video/upload/v1763834667/Video-Multi_b11ehy.mp4"
                type="video/mp4"
              />
              הדפדפן שלך לא תומך בוידאו.
            </video>
          </div>
          <div className={styles.storyText}>
            <h2 className={styles.storyHeading}>שלום, שמי ערדית בראון</h2>
            <p className={styles.storyParagraph}>
              יזמית עם מעל <strong>10 שנות ניסיון</strong> בחיבור בין אנשים לחלומות שלהם.
            </p>
            <p className={styles.storyParagraph}>
              הכל התחיל מתסכול אישי: ראיתי איך אנשים מבזבזים שעות בחיפושים אינסופיים,
              רק כדי להתאכזב ממקום שלא תאם את התמונות והשאיפות שלהם.
            </p>
            <div className={styles.quoteBox}>
              הקמתי את Multibrawn על עיקרון פשוט: לכל אדם מגיע שירות אישי שחוסך לו זמן
              ומבטיח לו 100% אמינות.
            </div>
            <p className={styles.storyParagraph}>
              היום אני גאה להוביל צוות מומחים שמכיר כל נכס באופן אישי. אנחנו לא &quot;עוד
              פלטפורמה&quot;, אנחנו הסוכנים האישיים שלכם.
            </p>
            <p className={styles.storyParagraph}>
              ההבטחה שלנו פשוטה: אנחנו מבצעים את כל הבדיקות, התיאומים והסינונים, כדי
              שלכם יישאר רק החלק המהנה - החוויה.
            </p>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className={styles.differenceSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>מה מייחד את Multibrawn?</h2>
          <h3 className={styles.sectionSubtitle}>למה לעבוד עם סוכן ולא לחפש לבד?</h3>
          
          <p className={styles.problemText}>
            <strong>הבעיה שכולם מכירים:</strong> אתם מחפשים צימר לסופ&quot;ש רומנטי. פותחים 20 אתרים, קוראים 100 ביקורות, מתקשרים ל-15 מקומות, ובסוף - מגלים שהמקום &quot;המושלם&quot; בתמונות הוא בעצם דירה ישנה עם בריכה מוזנחת.
          </p>
          <p className={styles.problemQuestion}>נשמע מוכר?</p>

          <h3 className={styles.solutionTitle}>הפתרון של Multibrawn:</h3>

          <div className={styles.featuresGrid}>
            <div className={styles.featureBox}>
              <h4>1. אנחנו מכירים כל נכס אישית</h4>
              <ul>
                <li>לא סתם רשימה מהאינטרנט</li>
                <li>ביקרנו, בדקנו, צילמנו בעצמנו</li>
                <li>אנחנו יודעים מה רואים בתמונות ומה לא</li>
              </ul>
            </div>

            <div className={styles.featureBox}>
              <h4>2. חוסכים לכם זמן וכסף</h4>
              <ul>
                <li>במקום 5 שעות חיפוש → כמה דקות שיחה</li>
                <li>במקום לשלם על מקום שלא ראיתם בעיניים → מקבלים תמורה מלאה למחיר</li>
                <li>במקום להתאכזב → 100% התאמה למה שרציתם</li>
              </ul>
            </div>

            <div className={styles.featureBox}>
              <h4>3. שירות אישי עד הסוף</h4>
              <ul>
                <li>אין עמלות, אין עלויות נסתרות</li>
                <li>אתם משלמים למקום הלינה בלבד</li>
                <li>השירות שלנו? מתנה!</li>
              </ul>
            </div>

            <div className={styles.featureBox}>
              <h4>4. התאמה מדויקת</h4>
              <ul>
                <li>משפחה עם ילדים? נמצא מקום עם משחקייה ובטיחות</li>
                <li>זוג רומנטי? נמצא צימר עם ג&apos;קוזי פרטי ונוף</li>
                <li>קבוצת חברים? נמצא וילה עם ברביקיו ושטח</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Comparison */}
      <section className={styles.comparisonSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>למה אנשים בוחרים בנו?</h2>
          
          <div className={styles.comparisonGrid}>
            <div className={styles.comparisonBox}>
              <h3>תסריט א&apos; - ללא סוכן:</h3>
              <ul>
                <li>5 שעות חיפוש באינטרנט</li>
                <li>15 שיחות טלפון</li>
                <li>חוסר ודאות: &quot;האם זה באמת טוב?&quot;</li>
                <li>מחיר מלא + סיכון להתאכזבות</li>
                <li>לחץ והתלבטויות</li>
              </ul>
            </div>

            <div className={styles.comparisonBoxHighlight}>
              <h3>תסריט ב&apos; - עם Multibrawn:</h3>
              <ul>
                <li>10 דקות שיחה אחת</li>
                <li>קיבלתם 3 אפשרויות מושלמות</li>
                <li>ביטחון מלא: &quot;ערדית בדקה בעצמה&quot;</li>
                <li>מחיר אטרקטיבי</li>
                <li>רגועים ושמחים - נשאר רק ליהנות!</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Principles */}
      <section className={styles.principlesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>העקרונות שלנו</h2>
          
          <div className={styles.principlesGrid}>
            <div className={styles.principleBox}>
              <h4>1. אמינות 100%</h4>
              <ul>
                <li>כל מה שאנחנו אומרים - זה מה שתקבלו</li>
                <li>ללא הפתעות, ללא תירוצים</li>
                <li>המילה שלנו = הבטחה</li>
              </ul>
            </div>

            <div className={styles.principleBox}>
              <h4>2. שירות אישי אמיתי</h4>
              <ul>
                <li>לא בוט, לא מוקד טלפוני</li>
                <li>ערדית או אחד מהצוות - תמיד זמינים</li>
                <li>מתייחסים לכל לקוח כמו למשפחה</li>
              </ul>
            </div>

            <div className={styles.principleBox}>
              <h4>3. איכות ללא פשרות</h4>
              <ul>
                <li>רק מקומות שאנחנו היינו שולחים את המשפחה שלנו</li>
                <li>בדיקות קפדניות לפני כל המלצה</li>
                <li>עדכון שוטף - אם משהו השתנה, אנחנו יודעים</li>
              </ul>
            </div>

            <div className={styles.principleBox}>
              <h4>4. תשוקה אמיתית למה שאנחנו עושים</h4>
              <ul>
                <li>זה לא סתם עבודה - זו השליחות שלנו</li>
                <li>אנחנו שמחים כשאתם שמחים</li>
                <li>הביקורות שלכם = הסיפוק המקצועי שלנו</li>
              </ul>
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
            <div className={styles.statDesc}>למדנו כל טריק בשטח</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statNumber}>500+</div>
            <div className={styles.statLabel}>אירועים</div>
            <div className={styles.statDesc}>חתונות, בר מצוות, ימי הולדת</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statNumber}>50+</div>
            <div className={styles.statLabel}>לוקיישנים</div>
            <div className={styles.statDesc}>בכל הארץ, לכל תקציב</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>שביעות רצון</div>
            <div className={styles.statDesc}>או שנמצא פתרון אחר</div>
          </div>
        </div>
        <div className={styles.availability}>
          <p>זמינות 24/7: פניות ישירות לוואטסאפ. הצ&apos;אטבוט שלנו באתר יאסוף מכם את כל המידע ויעביר ישירות אלינו - לווטסאפ</p>
        </div>
      </section>

      {/* What You Get */}
      <section className={styles.benefitsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>מה אתם מקבלים</h2>
          <h3 className={styles.sectionSubtitle}>כשאתם עובדים איתנו:</h3>
          
          <div className={styles.benefitsList}>
            <div className={styles.benefitItem}>ייעוץ מקצועי ללא עלות</div>
            <div className={styles.benefitItem}>גישה למחירים מיוחדים</div>
            <div className={styles.benefitItem}>חיסכון של שעות חיפוש</div>
            <div className={styles.benefitItem}>ביטחון של בחירה נכונה</div>
            <div className={styles.benefitItem}>תמיכה לפני, במהלך ואחרי</div>
            <div className={styles.benefitItem}>גיבוי מלא במקרה של בעיה</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonialsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>מה לקוחות אומרים</h2>
          
          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <h4>&quot;חסכתם לנו את החתונה&quot;</h4>
              <p>&quot;היינו במשבר שבוע לפני האירוע. ערדית מצאה לנו מקום מדהים תוך יום אחד!&quot;</p>
              <div className={styles.testimonialAuthor}>— שרון ויוסי, חיפה</div>
            </div>

            <div className={styles.testimonialCard}>
              <h4>&quot;שירות אגדי&quot;</h4>
              <p>&quot;לא האמנתי שיש עדיין שירות כזה בארץ. ענו לנו בשבת, מצאו פתרון, והכל חינם!&quot;</p>
              <div className={styles.testimonialAuthor}>— דני, תל אביב</div>
            </div>

            <div className={styles.testimonialCard}>
              <h4>&quot;100% מקצועיות&quot;</h4>
              <p>&quot;עבדנו עם 3 סוכנים אחרים שהבטיחו וכזבו. ערדית מצאה לנו בדיוק מה שחלמנו עליו.&quot;</p>
              <div className={styles.testimonialAuthor}>— משפחת כהן, ירושלים</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>בואו נדבר</h2>
          <p className={styles.contactIntro}>לא משנה אם אתם מחפשים:</p>
          
          <ul className={styles.servicesList}>
            <li>צימר רומנטי לסופ&quot;ש</li>
            <li>וילה משפחתית לחופשה</li>
            <li>מתחם אירועים לחתונה</li>
            <li>מלון בוטיק למשפחה המורחבת</li>
          </ul>

          <p className={styles.contactCta}>אנחנו כאן בשבילכם!</p>
        </div>
      </section>

      {/* Final Quote */}
      <section className={styles.finalQuoteSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>הבטחה אישית מערדית</h2>
          <div className={styles.finalQuote}>
            <p>&quot;אני מתחייבת אישית שכל לקוח יקבל ממני את אותו שירות שהייתי רוצה לקבל בעצמי. אם זה לא מושלם, זה לא מספיק טוב. נקודה.&quot;</p>
            <div className={styles.quoteAuthor}>— ערדית בראון, מייסדת Multibrawn</div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className={styles.socialSection}>
        <SocialLinks />
      </section>
    </div>
  );
}
