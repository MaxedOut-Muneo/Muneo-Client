import { FaqSection } from './_components/FaqSection/FaqSection';
import { HeroSection } from './_components/HeroSection/HeroSection';
import { ServicesSection } from './_components/ServicesSection/ServicesSection';
import { UsageGuideSection } from './_components/UsageGuideSection/UsageGuideSection';
import * as styles from './page.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <HeroSection />
      <ServicesSection />
      <UsageGuideSection />
      <FaqSection />
    </main>
  );
}
