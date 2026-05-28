'use client';

import { ArrowLeftMdIcon, Button } from '@muneo/design-system';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { saveEstimate } from '@/api/estimate';
import { useUser } from '@/app/(main)/_components/UserProvider/UserProvider';
import { useEstimateStore } from '../../_store/estimateStore';
import { mapToApiPayload } from '../../_utils/mapToApiPayload';
import { EstimateResultView } from '../EstimateResultView/EstimateResultView';
import * as styles from './Step5EstimateReview.css';

// ─────────── 면책 & 액션 섹션 ───────────

interface DisclaimerSectionProps {
  isSaving: boolean;
  saveError: string | null;
  onEdit: () => void;
  onSave: () => void;
}

const DisclaimerSection = ({ isSaving, saveError, onEdit, onSave }: DisclaimerSectionProps) => {
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
        <Button variant="primary" size="md" onClick={onSave} disabled={isSaving}>
          {isSaving ? '저장 중...' : '저장하기'}
        </Button>
      </div>
    </div>
  );
};

// ─────────── 메인: 가 견적 결과 ───────────

export const EstimateResult = () => {
  const { step1, step2, step3, step4, estimateResult, goToStep, reset } = useEstimateStore();
  const user = useUser();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  if (!estimateResult) {
    return null;
  }

  const input = mapToApiPayload(step1, step2, step3, step4);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    try {
      await saveEstimate({ input, result: estimateResult }, user.id);
      reset();
      router.push('/home');
    } catch {
      setSaveError('저장에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <EstimateResultView
      input={input}
      result={estimateResult}
      onEdit={() => goToStep(1)}
      actions={
        <DisclaimerSection isSaving={isSaving} saveError={saveError} onEdit={() => goToStep(3)} onSave={handleSave} />
      }
    />
  );
};
