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

// Blog posts data - יתעדכן בהמשך
const blogPosts = [
  {
    slug: 'best-zimmers-north-2025',
    title: '10 הצימרים הכי מומלצים בצפון ב-2025',
    excerpt: 'רשימה מעודכנת ומקיפה של הצימרים הכי טובים בצפון - עם ביקורות אמיתיות, מחירים ומה שחשוב לדעת לפני ההזמנה.',
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726367/AA_s4nej0.jpg',
    category: 'המלצות',
    date: '2024-12-15',
    readTime: '8 דקות',
  },
  {
    slug: 'planning-romantic-weekend-north',
    title: 'איך לתכנן סוף שבוע רומנטי מושלם בצפון',
    excerpt: 'מדריך שלב אחר שלב לתכנון חופשה רומנטית בצפון - מבחירת הצימר ועד המסעדות והאטרקציות הכי טובות.',
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726367/AA_s4nej0.jpg',
    category: 'מדריכים',
    date: '2024-12-12',
    readTime: '10 דקות',
  },
  {
    slug: 'zimmers-with-heated-pool-guide',
    title: 'המדריך המלא לצימרים עם בריכה מחוממת',
    excerpt: 'כל מה שצריך לדעת על צימרים עם בריכה מחוממת - יתרונות, מחירים, איך לבחור והמלצות מקצועיות.',
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726367/AA_s4nej0.jpg',
    category: 'טיפים',
    date: '2024-12-10',
    readTime: '7 דקות',
  },
  {
    slug: 'winter-vs-summer-zimmers',
    title: 'צימר בחורף vs צימר בקיץ - מה עדיף?',
    excerpt: 'השוואה מפורטת בין צימר בחורף לקיץ - יתרונות וחסרונות, מחירים, ומה באמת כדאי לכם.',
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726367/AA_s4nej0.jpg',
    category: 'השוואות',
    date: '2024-12-08',
    readTime: '6 דקות',
  },
  {
    slug: 'common-zimmer-mistakes',
    title: '7 טעויות נפוצות בבחירת צימר (ואיך להימנע מהן)',
    excerpt: 'הטעויות שכולם עושים בבחירת צימר - ואיך אתם יכולים לחסוך אלפי שקלים ואכזבות.',
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726367/AA_s4nej0.jpg',
    category: 'טיפים',
    date: '2024-12-05',
    readTime: '8 דקות',
  },
  {
    slug: 'shabbat-hatan-complete-guide',
    title: 'איך לארגן שבת חתן מושלם? המדריך המלא',
    excerpt: 'מדריך מקיף לארגון שבת חתן מושלם - מבחירת המקום ועד הפרטים הקטנים שעושים את ההבדל.',
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726367/AA_s4nej0.jpg',
    category: 'אירועים',
    date: '2024-12-03',
    readTime: '12 דקות',
  },
];

const categories = ['הכל', 'המלצות', 'מדריכים', 'טיפים', 'השוואות', 'אירועים'];

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
