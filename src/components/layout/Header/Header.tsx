'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'בית' },
    { href: '/gallery', label: 'גלריה' },
    { href: '/shabbat-hatan', label: 'שבת חתן' },
    // 👇 השינוי כאן: הקישור מוביל ל-#, הטקסט שונה, והוספנו דגל לזיהוי
    { href: '#', label: 'בלוג (בקרוב...)', isComingSoon: true }, 
    { href: '/tips', label: 'טיפים' },
    { href: '/about', label: 'אודות' },
    { href: '/contact', label: 'צור קשר' },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <img 
            src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1765034116/Logo_1_dgyryu_e_background_removal_f_png_xpwl2w.png"
            alt="MULTIBRAWN"
            className={styles.logoImage}
          />
          <span className={styles.logoText}>MULTIBRAWN</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <Link
              key={link.label} // שיניתי ל-label כי ה-href יכול להיות זהה (#)
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
              // 👇 אם זה "בקרוב", נוסיף סטייל שמבטל לחיצה ומשנה שקיפות
              style={link.isComingSoon ? { pointerEvents: 'none', opacity: 0.6, cursor: 'default' } : {}}
              aria-disabled={link.isComingSoon}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="תפריט"
        >
          <span className={`${styles.menuIcon} ${isMenuOpen ? styles.open : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`${styles.mobileNavLink} ${pathname === link.href ? styles.active : ''}`}
                onClick={(e) => {
                    // 👇 מונע סגירה של התפריט או מעבר דף אם זה "בקרוב"
                    if (link.isComingSoon) {
                        e.preventDefault();
                    } else {
                        setIsMenuOpen(false);
                    }
                }}
                style={link.isComingSoon ? { opacity: 0.6, color: '#888' } : {}}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
