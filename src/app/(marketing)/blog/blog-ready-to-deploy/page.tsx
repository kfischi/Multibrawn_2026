import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import styles from './Blog.module.css';

export const metadata: Metadata = {
  title: 'בלוג MULTIBRAWN - מדריכים, טיפים וסיפורים על צימרים ונופש בישראל',
  description: 'כל מה שצריך לדעת על צימרים, וילות ונופש בישראל. מדריכים מקצועיים, טיפים שימושיים, המלצות אישיות ועוד.',
  keywords: [
    'בלוג צימרים',
    'מדריכי נופש',
    'טיפים לצימרים',
    'המלצות טיולים בישראל',
    'חופשה בצפון',
    'מדריך צימרים',
  ],
  openGraph: {
    title: 'בלוג MULTIBRAWN - מדריכים וטיפים לנופש מושלם בישראל',
    description: 'כל מה שצריך לדעת על צימרים, וילות ונופש בישראל',
    url: 'https://multibrawn.co.il/blog',
    type: 'website',
  },
};

// Blog posts data - 9 מאמרים אמיתיים מ-Gemini עם תמונות!
const blogPosts = [
  {
    slug: 'heated-pool-guide',
    title: 'המדריך המלא לבריכות מחוממות',
    excerpt: '"מחוממת" או "פושרת"? המדריך המלא לבדיקת בריכה בחורף - לפני שזורקים כסף.',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766252877/תמונה_bqjuyx.png',
    category: 'מדריכים',
    date: '2024-12-20',
    readTime: '6 דקות',
  },
  {
    slug: 'modesty-check-religious',
    title: 'מבחן הצניעות (לציבור הדתי/חרדי)',
    excerpt: 'כתוב "פרטיות מלאה", אבל השכן מלמעלה רואה הכל. כך תבדקו באמת.',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253110/תמונה_ha3oeo.png',
    category: 'מדריכים',
    date: '2024-12-20',
    readTime: '5 דקות',
  },
  {
    slug: 'jacuzzi-hygiene-check',
    title: 'הג\'קוזי המלוכלך - מדריך היגיינה',
    excerpt: 'נכנסתם לג\'קוזי ויש קצף צהוב? צאו מיד. המדריך המלא להיגיינה.',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766252967/תמונה_lgez2k.png',
    category: 'טיפים',
    date: '2024-12-20',
    readTime: '5 דקות',
  },
  {
    slug: 'adults-only-quiet-guide',
    title: 'שקט בבקשה! Adults Only',
    excerpt: 'איך למצוא צימר שקט באמת - ללא ילדים, ללא רעש, רק שלווה.',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253191/תמונה_mujulg.png',
    category: 'טיפים',
    date: '2024-12-20',
    readTime: '5 דקות',
  },
  {
    slug: 'breakfast-value-guide',
    title: 'ארוחת הבוקר - המחיר מול התמורה',
    excerpt: 'חביתה ב-150 ש"ח? מתי שווה להזמין ארוחת בוקר לצימר ומתי זו עקיצה?',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766252778/תמונה_jwj0zg.png',
    category: 'טיפים',
    date: '2024-12-20',
    readTime: '5 דקות',
  },
  {
    slug: 'photos-vs-reality-guide',
    title: 'תמונות מול מציאות - החדר הקטן',
    excerpt: 'איך להבין שהצימר בתמונות קטן פי 3 במציאות? הטריקים לגילוי.',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253283/תמונה_ga3cj2.png',
    category: 'טיפים',
    date: '2024-12-20',
    readTime: '5 דקות',
  },
  {
    slug: 'real-fireplace-guide',
    title: 'קמין אמיתי - האווירה',
    excerpt: 'קמין אמיתי או דקורטיבי? איך לדעת לפני ההזמנה ולהימנע מאכזבות.',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253408/תמונה_fwjqkl.png',
    category: 'מדריכים',
    date: '2024-12-20',
    readTime: '4 דקות',
  },
  {
    slug: 'last-minute-deals-guide',
    title: 'הדקה ה-90 - המיתוס והאמת',
    excerpt: 'מתי באמת כדאי לחכות ל"דקה ה-90"? המדריך למהמרים חכמים.',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253024/תמונה_pl6aee.png',
    category: 'טיפים',
    date: '2024-12-20',
    readTime: '4 דקות',
  },
  {
    slug: 'massage-service-guide',
    title: 'מסאז\' עד החדר - שירות פרימיום',
    excerpt: 'כל מה שצריך לדעת על שירותי מסאז\' בצימרים - מחירים, סוגים והמלצות.',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253468/מיטת_עיסוי_nvydzb.png',
    category: 'שירותים',
    date: '2024-12-20',
    readTime: '4 דקות',
  },
];
    category: 'כסף',
    date: '2024-12-20',
    readTime: '6 דקות',
  },
  {
    slug: 'last-minute-zimmer-deals',
    title: '📉 מתי באמת כדאי לחכות ל"דקה ה-90"?',
    excerpt: 'האמת על הזמנות דקה אחרונה - מתי באמת תחסכו כסף, מתי תשלמו יותר, ואיך לא להישאר בלי צימר בכלל.',
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726367/AA_s4nej0.jpg',
    category: 'טיפים',
    date: '2024-12-20',
    readTime: '8 דקות',
  },
  {
    slug: 'modesty-check-religious',
    title: '🫣 כתוב "פרטיות מלאה", אבל השכן מלמעלה רואה הכל',
    excerpt: 'מבחן הצניעות והפרטיות לציבור הדתי/חרדי - השאלות החשובות שצריך לשאול לפני הזמנת צימר.',
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726367/AA_s4nej0.jpg',
    category: 'דתי',
    date: '2024-12-20',
    readTime: '7 דקות',
  },
];

const categories = ['הכל', 'מדריכים', 'טיפים', 'כסף', 'דתי'];

export default function BlogPage() {
  return (
    <>
      {/* Schema Markup */}
      <SchemaMarkup type="organization" />
      
      <div className={styles.page}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <h1 className={styles.title}>
              בלוג MULTIBRAWN
            </h1>
            <p className={styles.subtitle}>
              מדריכים מקצועיים, טיפים שימושיים והמלצות אישיות לחופשה מושלמת בישראל
            </p>
          </div>
        </section>

        {/* Categories Filter */}
        <section className={styles.categories}>
          <div className={styles.container}>
            <div className={styles.categoryList}>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`${styles.categoryButton} ${category === 'הכל' ? styles.active : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className={styles.posts}>
          <div className={styles.container}>
            <div className={styles.postsGrid}>
              {blogPosts.map((post) => (
                <article key={post.slug} className={styles.postCard}>
                  <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                    <div className={styles.postImage}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }}
                      />
                      <div className={styles.postCategory}>{post.category}</div>
                    </div>
                    
                    <div className={styles.postContent}>
                      <h2 className={styles.postTitle}>{post.title}</h2>
                      <p className={styles.postExcerpt}>{post.excerpt}</p>
                      
                      <div className={styles.postMeta}>
                        <span className={styles.postDate}>
                          {new Date(post.date).toLocaleDateString('he-IL', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                        <span className={styles.postReadTime}>⏱️ {post.readTime}</span>
                      </div>
                      
                      <div className={styles.postCta}>
                        קרא עוד →
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className={styles.newsletter}>
          <div className={styles.container}>
            <div className={styles.newsletterContent}>
              <h2 className={styles.newsletterTitle}>
                רוצים לקבל טיפים והמלצות חדשים?
              </h2>
              <p className={styles.newsletterText}>
                הצטרפו לניוזלטר שלנו וקבלו כל שבוע מדריכים, המלצות והצעות מיוחדות
              </p>
              <div className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="המייל שלך..."
                  className={styles.newsletterInput}
                />
                <button className={styles.newsletterButton}>
                  הצטרפו עכשיו
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
