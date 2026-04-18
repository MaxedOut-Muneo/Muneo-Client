'use client';

import { Button, Logo } from '@muneo/design-system';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { TransitionLink } from '@/components/TransitionLink';
import { TAGLINE } from '../../_constants';
import * as styles from './Header.css';

const NAV_ITEMS = [
  { label: '서비스 소개', href: '#intro' },
  { label: '가이드라인', href: '#guide' },
  { label: 'FAQ', href: '#faq' },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={clsx(styles.header, scrolled && styles.headerScrolled)}>
      <div className={styles.inner}>
        <div className={styles.logoSection}>
          <TransitionLink href="/" aria-label="홈으로 이동" className={styles.logoLink} viewTransition>
            <Logo />
          </TransitionLink>
          <span className={styles.tagline}>{TAGLINE}</span>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className={styles.navLink}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Button variant="gradient" className={styles.ctaButton}>
          시작하기
        </Button>
      </div>
    </header>
  );
};
