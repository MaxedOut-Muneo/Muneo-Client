'use client';

import { CircleWarningIcon, StatusCard, TriangleWarningIcon } from '@muneo/design-system';
import { useAnalysisStore } from '../../_store/analysisStore';
import { ProcessSection } from '../ProcessSection/ProcessSection';
import * as styles from './DiagnosisReport.css';

export function DiagnosisReport() {
  const result = useAnalysisStore((s) => s.diagnosisResult);

  if (!result) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.reportHeader}>
        <div className={styles.headerLeft}>
          <h1 className={styles.reportTitle}>진단 레포트</h1>
          <span className={styles.reportMeta}>
            {result.vendorLabel} · {result.areaLabel} · 분석일 {result.analyzedAt}
          </span>
        </div>
        <button type="button" className={styles.pdfButton} onClick={() => window.print()}>
          PDF ↓
        </button>
      </div>

      <div className={styles.summaryCards}>
        <StatusCard
          variant="danger"
          icon={<TriangleWarningIcon width={24} height={24} />}
          label="누락항목"
          value={`${result.missingCount}건`}
          className={styles.summaryCard}
        />
        <StatusCard
          variant="warning"
          icon={<CircleWarningIcon width={24} height={24} />}
          label="발견한 리스크 항목"
          value={`${result.riskCount}건`}
          className={styles.summaryCard}
        />
        <StatusCard
          variant="info"
          icon={<CircleWarningIcon width={24} height={24} />}
          label="정보 미비"
          value={`${result.insufficientCount}건`}
          className={styles.summaryCard}
        />
      </div>

      <div className={styles.sections}>
        {result.sections.map((section) => (
          <ProcessSection key={section.id} section={section} />
        ))}
      </div>

      <div className={styles.summaryBox}>
        <span className={styles.summaryTitle}>진단 요약</span>
        <div className={styles.summaryBody}>
          <span className={styles.summarySubtitle}>전체 리스크 의심 항목</span>
          <div className={styles.summaryBadges}>
            <span className={`${styles.summaryBadge} ${styles.badgeDanger}`}>누락 {result.missingCount}</span>
            <span className={`${styles.summaryBadge} ${styles.badgeWarning}`}>불분명 {result.riskCount}</span>
            <span className={`${styles.summaryBadge} ${styles.badgeInfo}`}>미비 {result.insufficientCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
