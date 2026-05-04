'use client';

import { MOCK_SUMMARY } from '../../_mocks/analysis.mock';
import { useAnalysisStore } from '../../_store/analysisStore';
import { ProcessSection } from '../ProcessSection/ProcessSection';
import { StatusSummaryCard } from '../StatusSummaryCard/StatusSummaryCard';
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
        <StatusSummaryCard
          variant="danger"
          icon="⚠"
          label="누락항목"
          count={result.missingCount}
          hint="필수 항목 미포함"
        />
        <StatusSummaryCard
          variant="warning"
          icon="!"
          label="발견한 리스크 항목"
          count={result.riskCount}
          hint="모호 표현/중복 기재"
        />
        <StatusSummaryCard
          variant="info"
          icon="i"
          label="정보 미비"
          count={result.insufficientCount}
          hint="수량·단위·브랜드 누락"
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
            <span className={`${styles.summaryBadge} ${styles.badgeDanger}`}>누락 {MOCK_SUMMARY.missingCount}</span>
            <span className={`${styles.summaryBadge} ${styles.badgeWarning}`}>불분명 {MOCK_SUMMARY.unclearCount}</span>
            <span className={`${styles.summaryBadge} ${styles.badgeInfo}`}>미비 {MOCK_SUMMARY.insufficientCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
