'use client';

import { Button } from '@muneo/design-system';
import { TransitionLink } from '@/components/TransitionLink';
import { CTA_EVENTS } from '@/constants/analyticsEvents';
import { trackCtaClick } from '@/lib/analytics';
import * as styles from './HeroSection.css';

export const HeroCtaButton = () => (
  <Button
    as={TransitionLink}
    href="/login"
    viewTransition
    variant="gradient"
    className={styles.ctaButton}
    onClick={() =>
      trackCtaClick(CTA_EVENTS.landingHeroSignup, {
        linkText: '무료로 시작하기',
        linkUrl: '/login',
        position: 'hero',
      })
    }
  >
    무료로 시작하기
  </Button>
);
