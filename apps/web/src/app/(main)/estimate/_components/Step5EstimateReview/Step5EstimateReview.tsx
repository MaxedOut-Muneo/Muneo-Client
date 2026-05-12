'use client';

import { ArrowLeftMdIcon, Button, CaretDownSmIcon } from '@muneo/design-system';
import { useState } from 'react';
import { useEstimateStore } from '../../_store/estimateStore';
import { type ProcessId } from '../../_types';
import * as styles from './Step5EstimateReview.css';

interface EstimateItem {
  name: string;
  range: string;
  refCount: number;
}

interface ProcessEstimate {
  id: ProcessId;
  name: string;
  totalRange: string;
  items: EstimateItem[];
  footnote?: string;
}

const MOCK_ESTIMATES: ProcessEstimate[] = [
  {
    id: 'demolition',
    name: '철거',
    totalRange: '150만 ~ 220만원',
    items: [
      { name: '일반 철거 (몰딩/걸레받이/도어/문틀)', range: '80만 ~ 120만', refCount: 11 },
      { name: '마루 철거 및 샌딩', range: '30만 ~ 50만', refCount: 4 },
      { name: '폐기물 처리', range: '20만 ~ 35만', refCount: 10 },
    ],
    footnote: '32평 전체 철거 기준, 건물연식 20년 이상 할증 반영',
  },
  { id: 'wallpaper', name: '도배', totalRange: '150만 ~ 220만원', items: [] },
  { id: 'bathroom', name: '욕실', totalRange: '150만 ~ 220만원', items: [] },
  { id: 'kitchen', name: '주방', totalRange: '150만 ~ 220만원', items: [] },
  { id: 'carpentry', name: '목공', totalRange: '150만 ~ 220만원', items: [] },
  { id: 'furniture', name: '가구', totalRange: '150만 ~ 220만원', items: [] },
];

const MOCK_PROCESS_TOTALS = [
  { name: '철거', range: '150만 ~ 220만' },
  { name: '도배', range: '150만 ~ 220만' },
  { name: '바닥', range: '150만 ~ 220만' },
  { name: '욕실', range: '150만 ~ 220만' },
  { name: '설비', range: '150만 ~ 220만' },
];

const AccordionItem = ({ estimate }: { estimate: ProcessEstimate }) => {
  const [isOpen, setIsOpen] = useState(estimate.items.length > 0);

  return (
    <div className={styles.accordionItemWrapper}>
      <button type="button" className={styles.accordionHeader} onClick={() => setIsOpen((prev) => !prev)}>
        <div className={styles.accordionHeaderLeft}>
          <span className={`${styles.accordionArrow}${isOpen ? ` ${styles.accordionArrowOpen}` : ''}`}>
            <CaretDownSmIcon width={24} height={24} />
          </span>
          <span className={styles.accordionTitle}>{estimate.name} 공사</span>
        </div>
        <span className={styles.accordionAmount}>{estimate.totalRange}</span>
      </button>

      <div className={`${styles.accordionBody}${isOpen ? ` ${styles.accordionBodyOpen}` : ''}`}>
        {estimate.items.length > 0 ? (
          <div className={styles.accordionContent}>
            <div className={styles.accordionTableHeader}>
              <span>항목</span>
              <span>예상 범위</span>
              <span>참조</span>
            </div>
            <div className={styles.accordionDivider} />

            {estimate.items.map((item) => (
              <div key={item.name} className={styles.accordionRow}>
                <div className={styles.accordionRowContent}>
                  <span>{item.name}</span>
                  <span>{item.range}</span>
                  <span className={item.refCount >= 5 ? styles.refCountGreen : styles.refCountOrange}>
                    {item.refCount}건{item.refCount < 5 ? ' ⚠' : ''}
                  </span>
                </div>
                <div className={styles.accordionItemDivider} />
              </div>
            ))}

            {estimate.footnote && (
              <div className={styles.footnotes}>
                <span className={styles.footnoteGray}>ⓘ {estimate.footnote}</span>
                <span className={styles.footnoteOrange}>⚠ 일부 항목 참조 5건 미만 — 범위가 넓을 수 있음</span>
              </div>
            )}
          </div>
        ) : (
          <p className={styles.emptyNote}>상세 항목 준비 중입니다.</p>
        )}
      </div>
    </div>
  );
};

// ─────────── 총 견적 배너 ───────────

const TotalBanner = () => {
  return (
    <div className={styles.totalBanner}>
      <div className={styles.bannerLeft}>
        <span className={styles.bannerSubtitle}>총 예상 견적 범위 (부가세 별도)</span>
        <span className={styles.bannerAmount}>2,680만원 ~ 3,890만원</span>
      </div>
      <span className={styles.bannerRef}>12건 참고</span>
    </div>
  );
};

// ─────────── 공정별 합산 테이블 ───────────

const ProcessTotalTable = () => {
  return (
    <div className={styles.processTotal}>
      <span className={styles.processTotalTitle}>공정별 합산</span>
      <div className={styles.processTotalTable}>
        <div className={styles.tableRows}>
          <div className={styles.tableHeader}>
            <span className={styles.tableHeaderCell}>공정</span>
            <span className={styles.tableHeaderCell}>범위</span>
          </div>
          {MOCK_PROCESS_TOTALS.map((row) => (
            <div key={row.name} className={styles.tableRow}>
              <div className={styles.tableRowContent}>
                <span>{row.name}</span>
                <span>{row.range}</span>
              </div>
              <div className={styles.tableDivider} />
            </div>
          ))}
        </div>

        <div className={styles.totalRow}>
          <div className={styles.totalDivider} />
          <div className={styles.totalContent}>
            <span className={styles.totalLabel}>보정 후 합계</span>
            <span className={styles.totalValue}>2,680만 ~ 3,890만</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────── 입력 요약 패널 (좌측) ───────────

interface SummaryPanelProps {
  regionLabel: string;
  spaceLabel: string;
  areaLabel: string;
  roomLabel: string;
  buildingAgeLabel: string;
  elevatorLabel: string;
  floorLabel: string;
  occupancyLabel: string;
  demolitionLabel: string;
  modeLabel: string;
  processCount: number;
  onEdit: () => void;
}

const SummaryPanel = ({
  regionLabel,
  spaceLabel,
  areaLabel,
  roomLabel,
  buildingAgeLabel,
  elevatorLabel,
  floorLabel,
  occupancyLabel,
  demolitionLabel,
  modeLabel,
  processCount,
  onEdit,
}: SummaryPanelProps) => {
  const rows = [
    { label: '시공 범위', value: `${modeLabel} (${processCount}개 공정)` },
    { label: '지역 / 공간', value: `${regionLabel} · ${spaceLabel}` },
    { label: '면적 / 방', value: `${areaLabel} / ${roomLabel}` },
    { label: '연식 / 등급', value: `${buildingAgeLabel} / 중급` },
    { label: '철거 / 거주', value: `${demolitionLabel} / ${occupancyLabel}` },
    { label: '층수 / EV', value: `${floorLabel} / ${elevatorLabel}` },
  ];

  return (
    <div className={styles.leftPanel}>
      <div className={styles.summarySection}>
        <div className={styles.summaryHeader}>
          <span className={styles.summaryTitle}>입력 정보 요약</span>
          <button type="button" className={styles.editButton} onClick={onEdit}>
            수정
          </button>
        </div>

        <div className={styles.summaryRows}>
          {rows.map(({ label, value }) => (
            <div key={label} className={styles.summaryRow}>
              <span className={styles.summaryRowLabel}>{label}</span>
              <span className={styles.summaryRowValue}>{value}</span>
            </div>
          ))}
        </div>

        <div className={styles.correctionBox}>
          <span className={styles.correctionTitle}>적용된 보정</span>
          <div className={styles.correctionItems}>
            <span className={styles.correctionItem}>서울 인건비 보정 +12%</span>
            <span className={styles.correctionItem}>건물연식 20년 이상 +15%</span>
            <span className={styles.correctionItem}>자재등급 중급 (기본값)</span>
          </div>
        </div>
      </div>

      <ProcessTotalTable />
    </div>
  );
};

// ─────────── 면책 & 액션 섹션 ───────────

interface DisclaimerSectionProps {
  onEdit: () => void;
}

const DisclaimerSection = ({ onEdit }: DisclaimerSectionProps) => {
  return (
    <div className={styles.disclaimerSection}>
      <div className={styles.disclaimerBox}>
        <div className={styles.warningBox}>
          <div className={styles.warningText}>
            <span>⚠ 본 견적은 현장 상태에 따라 변동될 수 있으며, 정확한 견적은 현장 방문 후 확정됩니다.</span>
            <span>⚠ 부가세(10%) 별도이며, 업체별 부가세 포함/별도 기준이 다르므로 계약 시 확인이 필요합니다.</span>
          </div>
        </div>
        <span className={styles.infoText}>ⓘ 해당 가견적을 업체 견적서와 비교하여 항목별 금액 적정성을 판단하세요.</span>
      </div>

      <div className={styles.actionRow}>
        <Button variant="outlineSecondary" size="md" onClick={onEdit}>
          <ArrowLeftMdIcon width={20} height={20} />
          수정하기
        </Button>
        <Button variant="outline" size="md" style={{ color: '#6B7280', borderRadius: '12px' }}>
          PDF 다운로드
        </Button>
      </div>
    </div>
  );
};

// ─────────── 메인: 가 견적 결과 ───────────

export const EstimateResult = () => {
  const { step1, step2, step3, goToStep } = useEstimateStore();

  const regionLabel = step1.region ?? '-';
  const spaceLabel = step1.spaceType ?? '-';
  const areaLabel = step1.area ? `${step1.area}평` : '-';
  const roomLabel = step1.roomCount ?? '-';
  const buildingAgeLabel = step3.buildingAge ?? '-';
  const elevatorLabel = step3.elevator ?? '-';
  const floorLabel = step3.floor ? `${step3.floor}층` : '-';
  const occupancyLabel = step3.occupancy ?? '-';
  const processCount = step2.selectedProcesses.length;
  const modeLabel = step2.mode === 'full' ? '전체 리모델링' : '부분 시공';
  const demolitionLabel = step2.selectedProcesses.includes('demolition') ? '있음' : '없음';
  const filteredEstimates = MOCK_ESTIMATES.filter((e) => step2.selectedProcesses.includes(e.id));

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <SummaryPanel
          regionLabel={regionLabel}
          spaceLabel={spaceLabel}
          areaLabel={areaLabel}
          roomLabel={roomLabel}
          buildingAgeLabel={buildingAgeLabel}
          elevatorLabel={elevatorLabel}
          floorLabel={floorLabel}
          occupancyLabel={occupancyLabel}
          demolitionLabel={demolitionLabel}
          modeLabel={modeLabel}
          processCount={processCount}
          onEdit={() => goToStep(1)}
        />

        <div className={styles.rightPanel}>
          <TotalBanner />

          <div className={styles.detailSection}>
            <span className={styles.detailTitle}>공정별 세부 견적</span>
            <div className={styles.accordionList}>
              {filteredEstimates.map((estimate) => (
                <AccordionItem key={estimate.id} estimate={estimate} />
              ))}
            </div>
          </div>

          <DisclaimerSection onEdit={() => goToStep(4)} />
        </div>
      </div>
    </div>
  );
};
