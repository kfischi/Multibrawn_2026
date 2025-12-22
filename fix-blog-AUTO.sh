#!/bin/bash

echo "🚀 מתחיל תיקון אוטומטי של הבלוג..."
echo ""

# 1. מחיקת blog הישן
echo "📁 שלב 1: מחיקת blog ישן..."
rm -rf src/app/\(marketing\)/blog
echo "✅ נמחק!"
echo ""

# 2. יצירת תיקיית blog חדשה
echo "📁 שלב 2: יצירת תיקייה חדשה..."
mkdir -p src/app/\(marketing\)/blog
echo "✅ נוצר!"
echo ""

# 3. יצירת page.tsx ראשי
echo "📝 שלב 3: יצירת page.tsx ראשי..."
cat > src/app/\(marketing\)/blog/page.tsx << 'ENDOFFILE'
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import styles from './Blog.module.css';

export const metadata: Metadata = {
  title: 'בלוג MULTIBRAWN - מדריכים וטיפים לנופש מושלם',
  description: 'כל מה שצריך לדעת על צימרים ונופש בישראל',
  keywords: ['בלוג צימרים', 'מדריכי נופש', 'טיפים'],
  openGraph: {
    title: 'בלוג MULTIBRAWN',
    description: 'מדריכים וטיפים לנופש מושלם בישראל',
    url: 'https://multibrawn.co.il/blog',
    type: 'website',
  },
};

const blogPosts = [
  {
    slug: 'heated-pool-guide',
    title: 'המדריך המלא לבריכות מחוממות',
    excerpt: 'מחוממת או פושרת? המדריך המלא לבדיקת בריכה בחורף',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766252877/תמונה_bqjuyx.png',
    category: 'מדריכים',
    date: '2024-12-20',
    readTime: '6 דקות',
  },
  {
    slug: 'modesty-check-religious',
    title: 'מבחן הצניעות',
    excerpt: 'כתוב פרטיות מלאה אבל השכן רואה הכל',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253110/תמונה_ha3oeo.png',
    category: 'מדריכים',
    date: '2024-12-20',
    readTime: '5 דקות',
  },
  {
    slug: 'jacuzzi-hygiene-check',
    title: 'הג׳קוזי המלוכלך - מדריך היגיינה',
    excerpt: 'נכנסתם לג׳קוזי ויש קצף צהוב? המדריך המלא',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766252967/תמונה_lgez2k.png',
    category: 'טיפים',
    date: '2024-12-20',
    readTime: '5 דקות',
  },
  {
    slug: 'adults-only-quiet-guide',
    title: 'שקט בבקשה - Adults Only',
    excerpt: 'איך למצוא צימר שקט באמת',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253191/תמונה_mujulg.png',
    category: 'טיפים',
    date: '2024-12-20',
    readTime: '5 דקות',
  },
  {
    slug: 'breakfast-value-guide',
    title: 'ארוחת הבוקר - המחיר מול התמורה',
    excerpt: 'חביתה ב-150 שקל? מתי שווה להזמין',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766252778/תמונה_jwj0zg.png',
    category: 'טיפים',
    date: '2024-12-20',
    readTime: '5 דקות',
  },
  {
    slug: 'photos-vs-reality-guide',
    title: 'תמונות מול מציאות',
    excerpt: 'איך להבין שהצימר קטן פי 3 במציאות',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253283/תמונה_ga3cj2.png',
    category: 'טיפים',
    date: '2024-12-20',
    readTime: '5 דקות',
  },
  {
    slug: 'real-fireplace-guide',
    title: 'קמין אמיתי - האווירה',
    excerpt: 'קמין אמיתי או דקורטיבי? איך לדעת',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253408/תמונה_fwjqkl.png',
    category: 'מדריכים',
    date: '2024-12-20',
    readTime: '4 דקות',
  },
  {
    slug: 'last-minute-deals-guide',
    title: 'הדקה ה-90 - המיתוס והאמת',
    excerpt: 'מתי באמת כדאי לחכות לדקה ה-90',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253024/תמונה_pl6aee.png',
    category: 'טיפים',
    date: '2024-12-20',
    readTime: '4 דקות',
  },
  {
    slug: 'massage-to-room-guide',
    title: 'מסאז׳ עד החדר',
    excerpt: 'כל מה שצריך לדעת על שירותי מסאז׳',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253468/מיטת_עיסוי_nvydzb.png',
    category: 'טיפים',
    date: '2024-12-20',
    readTime: '4 דקות',
  },
];

const categories = ['הכל', 'מדריכים', 'טיפים'];

export default function BlogPage() {
  return (
    <>
      <SchemaMarkup type="organization" />
      
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>בלוג MULTIBRAWN</h1>
            <p>מדריכים, טיפים וכל מה שצריך לדעת על נופש בישראל</p>
          </div>
        </section>

        <section className={styles.categories}>
          {categories.map((cat) => (
            <button key={cat} className={styles.categoryButton}>
              {cat}
            </button>
          ))}
        </section>

        <section className={styles.posts}>
          <div className={styles.grid}>
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <span className={styles.category}>{post.category}</span>
                </div>
                <div className={styles.cardContent}>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <div className={styles.meta}>
                    <span>{post.date}</span>
                    <span>⏱️ {post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
ENDOFFILE
echo "✅ page.tsx נוצר!"
echo ""

# 4. יצירת CSS files
echo "🎨 שלב 4: יצירת קבצי CSS..."

cat > src/app/\(marketing\)/blog/Blog.module.css << 'ENDOFCSS'
.page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero {
  padding: 80px 20px;
  text-align: center;
  color: white;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.categories {
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 20px;
}

.categoryButton {
  padding: 10px 20px;
  background: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.posts {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s;
  text-decoration: none;
  color: inherit;
}

.card:hover {
  transform: translateY(-5px);
}

.imageWrapper {
  position: relative;
  height: 200px;
}

.category {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255,255,255,0.9);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.85rem;
}

.cardContent {
  padding: 20px;
}

.cardContent h2 {
  font-size: 1.4rem;
  margin-bottom: 10px;
}

.cardContent p {
  color: #666;
  margin-bottom: 15px;
}

.meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #999;
}
ENDOFCSS

cat > src/app/\(marketing\)/blog/Article.module.css << 'ENDOFARTICLECSS'
.article {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 15px;
  padding: 40px;
}

.breadcrumb {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  font-size: 0.9rem;
  color: #666;
}

.breadcrumb a {
  color: #667eea;
  text-decoration: none;
}

.header {
  margin-bottom: 30px;
}

.category {
  display: inline-block;
  background: #667eea;
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.85rem;
  margin-bottom: 15px;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  line-height: 1.2;
}

.meta {
  display: flex;
  gap: 20px;
  color: #999;
  font-size: 0.9rem;
}

.featuredImage {
  position: relative;
  width: 100%;
  height: 400px;
  margin-bottom: 40px;
  border-radius: 10px;
  overflow: hidden;
}

.content {
  font-size: 1.1rem;
  line-height: 1.8;
}

.content h2 {
  font-size: 1.8rem;
  margin: 40px 0 20px;
}

.content h3 {
  font-size: 1.4rem;
  margin: 30px 0 15px;
}

.content p {
  margin-bottom: 20px;
}

.content ul {
  margin: 20px 0;
  padding-right: 20px;
}

.content li {
  margin-bottom: 10px;
}

.cta {
  margin-top: 60px;
  padding: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  text-align: center;
  color: white;
}

.cta h2 {
  margin-bottom: 15px;
}

.ctaButtons {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 30px;
}

.ctaButton,
.ctaButtonWhatsapp {
  padding: 15px 30px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s;
}

.ctaButton {
  background: white;
  color: #667eea;
}

.ctaButtonWhatsapp {
  background: #25D366;
  color: white;
}
ENDOFARTICLECSS

echo "✅ קבצי CSS נוצרו!"
echo ""

# 5. יצירת תיקיות למאמרים
echo "📁 שלב 5: יצירת תיקיות למאמרים..."
mkdir -p src/app/\(marketing\)/blog/heated-pool-guide
mkdir -p src/app/\(marketing\)/blog/modesty-check-religious
mkdir -p src/app/\(marketing\)/blog/jacuzzi-hygiene-check
mkdir -p src/app/\(marketing\)/blog/adults-only-quiet-guide
mkdir -p src/app/\(marketing\)/blog/breakfast-value-guide
mkdir -p src/app/\(marketing\)/blog/photos-vs-reality-guide
mkdir -p src/app/\(marketing\)/blog/real-fireplace-guide
mkdir -p src/app/\(marketing\)/blog/last-minute-deals-guide
mkdir -p src/app/\(marketing\)/blog/massage-to-room-guide
echo "✅ כל התיקיות נוצרו!"
echo ""

# 6. יצירת page.tsx לג'קוזי (הקובץ הבעייתי)
echo "📝 שלב 6: יצירת מאמר ג׳קוזי..."
cat > src/app/\(marketing\)/blog/jacuzzi-hygiene-check/page.tsx << 'ENDOFJACUZZI'
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import styles from '../Article.module.css';

export const metadata: Metadata = {
  title: "הג׳קוזי המלוכלך - מדריך היגיינה | בלוג MULTIBRAWN",
  description: "נכנסתם לג׳קוזי ויש קצף צהוב? צאו מיד. המדריך המלא להיגיינה",
  keywords: ["צימרים", "נופש", "טיפים", "ג׳קוזי", "היגיינה"],
  openGraph: {
    title: "הג׳קוזי המלוכלך - מדריך היגיינה",
    description: "נכנסתם לג׳קוזי ויש קצף צהוב? המדריך המלא",
    url: "https://multibrawn.co.il/blog/jacuzzi-hygiene-check",
    type: "article",
    images: [{
      url: "https://res.cloudinary.com/decirk3zb/image/upload/v1766252967/תמונה_lgez2k.png",
      width: 1200,
      height: 630,
    }],
  },
};

export default function Article() {
  const breadcrumbData = {
    items: [
      { name: "בית", url: "https://multibrawn.co.il" },
      { name: "בלוג", url: "https://multibrawn.co.il/blog" },
      { name: "הג׳קוזי המלוכלך", url: "https://multibrawn.co.il/blog/jacuzzi-hygiene-check" },
    ],
  };

  const articleData = {
    title: "הג׳קוזי המלוכלך - מדריך היגיינה",
    description: "נכנסתם לג׳קוזי ויש קצף צהוב? צאו מיד. המדריך המלא להיגיינה",
    image: "https://res.cloudinary.com/decirk3zb/image/upload/v1766252967/תמונה_lgez2k.png",
    datePublished: "2024-12-20",
    dateModified: "2024-12-20",
  };

  return (
    <>
      <SchemaMarkup type="breadcrumb" data={breadcrumbData} />
      <SchemaMarkup type="article" data={articleData} />

      <article className={styles.article}>
        <div className={styles.container}>
          <nav className={styles.breadcrumb}>
            <Link href="/">בית</Link>
            <span>/</span>
            <Link href="/blog">בלוג</Link>
            <span>/</span>
            <span>הג׳קוזי המלוכלך</span>
          </nav>

          <header className={styles.header}>
            <div className={styles.category}>טיפים</div>
            <h1 className={styles.title}>נכנסתם לג׳קוזי ויש קצף צהוב? צאו מיד</h1>
            <div className={styles.meta}>
              <span className={styles.date}>20 בדצמבר 2024</span>
              <span className={styles.readTime}>⏱️ 5 דקות קריאה</span>
            </div>
          </header>

          <div className={styles.featuredImage}>
            <Image
              src="https://res.cloudinary.com/decirk3zb/image/upload/v1766252967/תמונה_lgez2k.png"
              alt="ג׳קוזי נקי"
              fill
              priority
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className={styles.content}>
            <p>
              זה הרגע שחיכיתם לו. הגעתם לצימר, הדלקתם נרות, מזגתם יין. הג׳קוזי הענק בפינת החדר כבר מלא במים חמים ומזמינים.
            </p>

            <p>
              אתם נכנסים פנימה, לוחצים על כפתור הבועות, ופתאום... על פני המים מתחיל לצוף קצף עכור, צהבהב-אפור, עם ריח לא נעים.
            </p>

            <h2>מה זה הקצף הזה?</h2>

            <p>
              זו שכבת לכלוך שמורכבת משומן גוף, שארי סבון, וחיידקים שהצטברו בצינורות. זה לא מסוכן בהכרח, אבל זה מגעיל.
            </p>

            <h2>איך לבדוק ג׳קוזי לפני ההזמנה?</h2>

            <ul>
              <li>שאלו: מתי המים הוחלפו לאחרונה?</li>
              <li>בקשו תמונה של הג׳קוזי כשהוא דולק</li>
              <li>וודאו שיש מערכת סינון</li>
              <li>בדקו ביקורות על ניקיון</li>
            </ul>

            <h2>מה עושים אם זה קרה?</h2>

            <p>
              התקשרו למארח מיד. צלמו תמונה. בקשו החלפת מים או החזר כספי חלקי.
            </p>

            <h2>איך Multibrawn עוזרת?</h2>

            <p>
              אנחנו בודקים כל צימר לפני ההמלצה. אנחנו יודעים איפה מחליפים מים לפני כל אורח ואיפה מתקמצנים.
            </p>
          </div>

          <div className={styles.cta}>
            <h2>רוצים צימר נקי מובטח?</h2>
            <p>דברו עם המומחים שלנו וקבלו המלצות אישיות!</p>
            <div className={styles.ctaButtons}>
              <Link href="/contact" className={styles.ctaButton}>
                דברו עם ערדית
              </Link>
              <a
                href="https://wa.me/972523983394?text=היי! קראתי את המאמר על ג׳קוזי"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaButtonWhatsapp}
              >
                שלחו וואטסאפ
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
ENDOFJACUZZI
echo "✅ מאמר ג׳קוזי נוצר!"
echo ""

echo "🎉 סיימתי!"
echo ""
echo "🚀 עכשיו תריץ:"
echo "   npm run build"
echo "   git add ."
echo "   git commit -m '🐛 Fix blog structure'"
echo "   git push origin main"
echo ""
echo "✅ זה אמור לעבוד עכשיו!"
