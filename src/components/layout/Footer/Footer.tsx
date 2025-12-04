'use client';

import Link from 'next/link';
import Image from 'next/image';
import SocialLinks from '@/components/ui/SocialLinks/SocialLinks';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Logo */}
        <div className={styles.logoSection}>
          <div className={styles.logo}>
            <Image
              src="https://github.com/kfischi/MULTIBRAWN-V.1/raw/main/Gallery/לוגו2.png"
              alt="MULTIBRAWN Logo"
              width={50}
              height={50}
            />
            <span className={styles.logoText}>MULTIBRAWN</span>
          </div>
        </div>

        {/* Social Links */}
        <div className={styles.socialSection}>
          <SocialLinks />
        </div>

        {/* Footer Links */}
        <div className={styles.linksSection}>
          <Link href="/privacy" className={styles.footerLink}>
            מדיניות פרטיות
          </Link>
          <Link href="/accessibility-statement" className={styles.footerLink}>
            הצהרת נגישות
          </Link>
        </div>

        {/* CTA Button */}
        <Link href="/contact" className={styles.ctaButton}>
          הזמן עכשיו
        </Link>

        {/* Copyright */}
        <p className={styles.copyright}>
          © 2025 MULTIBRAWN. כל הזכויות שמורות.
        </p>
      </div>
    </footer>
  );
}
