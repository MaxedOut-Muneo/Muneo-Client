'use client';

import { clsx } from 'clsx';
import { useInView } from '@/hooks/useInView';
import { sectionDivider, sectionHeader, sectionSubtitle, sectionTitle } from '../sectionHeader.css';
import * as styles from './UsageGuideSection.css';

const STEPS = [
  {
    number: '01',
    title: '견적서 업로드',
    description: 'PDF 또는 이미지 형식의 견적서를 업로드하세요',
  },
  {
    number: '02',
    title: 'AI 자동 분석',
    description: 'AI가 누락·중복·과다 청구 항목을 자동으로 탐지합니다',
  },
  {
    number: '03',
    title: '결과 확인 및 상담',
    description: '분석 결과를 확인하고 AI 챗봇으로 추가 질문하세요',
  },
];

const DELAYS = [styles.delay1, styles.delay2, styles.delay3];

const SECTION_TITLE_ID = 'usage-guide-title';

export const UsageGuideSection = () => {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section id="guide" ref={ref} className={styles.section} aria-labelledby={SECTION_TITLE_ID}>
      <div className={styles.container}>
        <div className={clsx(styles.inner, inView && styles.innerVisible)}>
          <header className={sectionHeader}>
            <h2 id={SECTION_TITLE_ID} className={sectionTitle}>
              이용 방법
            </h2>
            <div className={sectionDivider} aria-hidden="true" />
            <p className={sectionSubtitle}>3단계로 완성하는 인테리어 견적 검토</p>
          </header>
          <ol className={styles.stepsRow}>
            {STEPS.map(({ number, title, description }, index) => (
              <li key={number} className={clsx(styles.stepItem, DELAYS[index], inView && styles.stepItemVisible)}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {number}
                </span>
                <div className={styles.stepLine} aria-hidden="true" />
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{title}</h3>
                  <p className={styles.stepDescription}>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
