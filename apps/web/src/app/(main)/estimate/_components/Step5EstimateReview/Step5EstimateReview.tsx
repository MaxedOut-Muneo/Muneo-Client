'use client';

import { ArrowLeftMdIcon, Button, CaretDownSmIcon } from '@muneo/design-system';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { saveEstimate } from '@/api/estimate';
import { useAuthStore } from '@/store/authStore';
import { useEstimateStore } from '../../_store/estimateStore';
import { type EstimateGenerateResponse, type EstimateLineItem } from '../../_types/api';
import { mapToApiPayload } from '../../_utils/mapToApiPayload';
import * as styles from './Step5EstimateReview.css';

const formatWon = (amount: number): string => {
  const man = Math.round(amount / 10000);
  return `${man.toLocaleString('ko-KR')}만원`;
};

const formatRange = (min: number, max: number): string => `${formatWon(min)} ~ ${formatWon(max)}`;

// ─────────── 아코디언 아이템 ───────────

interface DisplayItem {
  name: string;
  range: string;
  refCount: number;
}

interface ProcessEstimateDisplay {
  processName: string;
  totalRange: string;
  items: DisplayItem[];
}

const buildDisplayItems = (lineItems: EstimateLineItem[]): DisplayItem[] =>
  lineItems.map((item) => ({
    name: item.description,
    range: formatRange(item.amount_range.최소, item.amount_range.최대),
    refCount: item.등장_사례_수,
  }));

const AccordionItem = ({ estimate }: { estimate: ProcessEstimateDisplay }) => {
  const [isOpen, setIsOpen] = useState(estimate.items.length > 0);

  return (
    <div className={styles.accordionItemWrapper}>
      <button type="button" className={styles.accordionHeader} onClick={() => setIsOpen((prev) => !prev)}>
        <div className={styles.accordionHeaderLeft}>
          <span className={`${styles.accordionArrow}${isOpen ? ` ${styles.accordionArrowOpen}` : ''}`}>
            <CaretDownSmIcon width={24} height={24} />
          </span>
          <span className={styles.accordionTitle}>{estimate.processName} 공사</span>
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
          </div>
        ) : (
          <p className={styles.emptyNote}>상세 항목 준비 중입니다.</p>
        )}
      </div>
    </div>
  );
};

// ─────────── 총 견적 배너 ───────────

interface TotalBannerProps {
  result: EstimateGenerateResponse;
}

const TotalBanner = ({ result }: TotalBannerProps) => {
  const { 최소, 최대 } = result.총_견적_범위;
  return (
    <div className={styles.totalBanner}>
      <div className={styles.bannerLeft}>
        <span className={styles.bannerSubtitle}>총 예상 견적 범위 (부가세 별도)</span>
        <span className={styles.bannerAmount}>{formatRange(최소, 최대)}</span>
      </div>
      <span className={styles.bannerRef}>{result.참고_사례_수}건 참고</span>
    </div>
  );
};

// ─────────── 공정별 합산 테이블 ───────────

interface ProcessTotalTableProps {
  result: EstimateGenerateResponse;
}

const ProcessTotalTable = ({ result }: ProcessTotalTableProps) => {
  const rows = Object.entries(result.공종별_단가_범위).map(([processName, range]) => ({
    name: processName,
    range: formatRange(range.최소, range.최대),
  }));

  const { 최소, 최대 } = result.총_견적_범위;

  return (
    <div className={styles.processTotal}>
      <span className={styles.processTotalTitle}>공정별 합산</span>
      <div className={styles.processTotalTable}>
        <div className={styles.tableRows}>
          <div className={styles.tableHeader}>
            <span className={styles.tableHeaderCell}>공정</span>
            <span className={styles.tableHeaderCell}>범위</span>
          </div>
          {rows.map((row) => (
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
            <span className={styles.totalValue}>{formatRange(최소, 최대)}</span>
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
  corrections: string[];
  result: EstimateGenerateResponse;
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
  corrections,
  result,
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
            {corrections.map((c) => (
              <span key={c} className={styles.correctionItem}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ProcessTotalTable result={result} />
    </div>
  );
};

// ─────────── 면책 & 액션 섹션 ───────────

interface DisclaimerSectionProps {
  isSaved: boolean;
  isSaving: boolean;
  saveError: string | null;
  onEdit: () => void;
  onSave: () => void;
}

const DisclaimerSection = ({ isSaved, isSaving, saveError, onEdit, onSave }: DisclaimerSectionProps) => {
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

      {saveError && <p style={{ color: '#EF4444', fontSize: '13px', marginBottom: '8px' }}>{saveError}</p>}

      <div className={styles.actionRow}>
        <Button variant="outlineSecondary" size="md" onClick={onEdit}>
          <ArrowLeftMdIcon width={20} height={20} />
          수정하기
        </Button>
        <Button variant="outline" size="md" style={{ color: '#6B7280', borderRadius: '12px' }}>
          PDF 다운로드
        </Button>
        <Button variant="primary" size="md" onClick={onSave} disabled={isSaved || isSaving}>
          {isSaved ? '저장됨 ✓' : isSaving ? '저장 중...' : '저장하기'}
        </Button>
      </div>
    </div>
  );
};

// ─────────── 메인: 가 견적 결과 ───────────

export const EstimateResult = () => {
  const { step1, step2, step3, step4, estimateResult, goToStep, reset } = useEstimateStore();
  const { user } = useAuthStore();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  if (!estimateResult) {
    return null;
  }

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

  const accordionItems: ProcessEstimateDisplay[] = estimateResult.선택_공종.map((processName) => {
    const rangeData = estimateResult.공종별_단가_범위[processName];
    const lineItems = estimateResult.공종별_항목_명세[processName] ?? [];
    return {
      processName,
      totalRange: rangeData ? formatRange(rangeData.최소, rangeData.최대) : '-',
      items: buildDisplayItems(lineItems),
    };
  });

  const handleSave = async () => {
    if (!user) {
      return;
    }
    setIsSaving(true);
    setSaveError(null);
    try {
      const payload = mapToApiPayload(step1, step2, step3, step4);
      await saveEstimate({ input: payload, result: estimateResult }, user.id);
      reset();
      router.push('/home');
    } catch {
      setSaveError('저장에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSaving(false);
    }
  };

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
          corrections={estimateResult.보정_적용}
          result={estimateResult}
          onEdit={() => goToStep(1)}
        />

        <div className={styles.rightPanel}>
          <TotalBanner result={estimateResult} />

          <div className={styles.detailSection}>
            <span className={styles.detailTitle}>공정별 세부 견적</span>
            <div className={styles.accordionList}>
              {accordionItems.map((estimate) => (
                <AccordionItem key={estimate.processName} estimate={estimate} />
              ))}
            </div>
          </div>

          <DisclaimerSection
            isSaved={false}
            isSaving={isSaving}
            saveError={saveError}
            onEdit={() => goToStep(4)}
            onSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
};
