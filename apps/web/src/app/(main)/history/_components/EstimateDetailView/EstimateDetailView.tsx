'use client';

import { useState } from 'react';
import { type EstimateItem } from '@/api/history';
import { type EstimateGenerateResponse } from '@/app/(main)/estimate/_types/api';
import * as styles from './EstimateDetailView.css';

interface EstimateDetailViewProps {
  item: EstimateItem;
}

const fmtAmount = (v: number) => `${Math.round(v / 10000).toLocaleString()}만원`;
const fmtRange = (r: EstimateGenerateResponse['총_견적_범위']) => `${fmtAmount(r.최소)} ~ ${fmtAmount(r.최대)}`;

const toDisplayDate = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
};

export const EstimateDetailView = ({ item }: EstimateDetailViewProps) => {
  const { input, result, created_at: createdAt } = item;
  const [openProcess, setOpenProcess] = useState<string | null>(null);

  const toggle = (name: string) => setOpenProcess((prev) => (prev === name ? null : name));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>가견적 결과</h1>
        <span className={styles.meta}>분석일 {toDisplayDate(createdAt)}</span>
      </div>

      {/* 입력 요약 */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>입력 정보</h2>
        <div className={styles.inputGrid}>
          {input.공간유형 && (
            <div className={styles.inputRow}>
              <span className={styles.inputLabel}>공간 유형</span>
              <span className={styles.inputValue}>{input.공간유형}</span>
            </div>
          )}
          {input.평수 && (
            <div className={styles.inputRow}>
              <span className={styles.inputLabel}>면적</span>
              <span className={styles.inputValue}>{input.평수}평</span>
            </div>
          )}
          {input.지역 && (
            <div className={styles.inputRow}>
              <span className={styles.inputLabel}>지역</span>
              <span className={styles.inputValue}>{input.지역}</span>
            </div>
          )}
          {result.시공범위 && (
            <div className={styles.inputRow}>
              <span className={styles.inputLabel}>시공 범위</span>
              <span className={styles.inputValue}>{result.시공범위}</span>
            </div>
          )}
        </div>
        {input.공종?.length > 0 && (
          <div className={styles.processList}>
            {input.공종.map((p) => (
              <span key={p} className={styles.processBadge}>
                {p}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 총 견적 범위 */}
      <div className={styles.totalCard}>
        <div>
          <div className={styles.totalLabel}>예상 총 견적</div>
          <div className={styles.totalMeta}>참고 사례 {result.참고_사례_수}건</div>
        </div>
        <div className={styles.totalValue}>{fmtRange(result.총_견적_범위)}</div>
      </div>

      {/* 공정별 상세 아코디언 */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>공정별 상세</h2>
        {result.선택_공종.map((processName) => {
          const range = result.공종별_단가_범위[processName];
          const lineItems = result.공종별_항목_명세[processName] ?? [];
          const isOpen = openProcess === processName;

          return (
            <div key={processName} className={styles.accordionItem}>
              <button type="button" className={styles.accordionHeader} onClick={() => toggle(processName)}>
                <div className={styles.accordionHeaderLeft}>
                  <span className={styles.accordionProcessName}>{processName}</span>
                  {range && <span className={styles.accordionRange}>{fmtRange(range)}</span>}
                </div>
                <span className={`${styles.accordionChevron}${isOpen ? ` ${styles.accordionChevronOpen}` : ''}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              <div className={`${styles.accordionBody}${isOpen ? ` ${styles.accordionBodyOpen}` : ''}`}>
                <div className={styles.lineItemList}>
                  {lineItems.map((li, idx) => (
                    <div key={idx} className={styles.lineItem}>
                      <span className={styles.lineItemDesc}>{li.description}</span>
                      <div className={styles.lineItemRight}>
                        <span className={styles.lineItemRange}>{fmtRange(li.amount_range)}</span>
                        <span
                          className={`${styles.lineItemRef}${li.등장_사례_수 < 5 ? ` ${styles.lineItemRefWarn}` : ''}`}
                        >
                          [{li.등장_사례_수}건]
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
