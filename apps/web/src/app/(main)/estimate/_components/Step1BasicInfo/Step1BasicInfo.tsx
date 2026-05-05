'use client';

import { SelectButton } from '@muneo/design-system';
import { useId } from 'react';
import { useEstimateStore } from '../../_store/estimateStore';
import { type RoomCount, type Region, type SpaceType } from '../../estimate.types';
import { StepActions } from '../StepActions/StepActions';
import * as styles from './Step1BasicInfo.css';

const REGIONS: Region[] = ['서울', '수도권', '지방'];
const SPACE_TYPES: SpaceType[] = ['아파트', '빌라', '오피스텔', '단독 주택'];
const ROOM_COUNTS: RoomCount[] = ['1개', '2개', '3개', '4개 이상'];

export function Step1BasicInfo() {
  const { step1, setStep1, nextStep, reset } = useEstimateStore();
  const areaInputId = useId();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Step 1 <span className={styles.titleAccent}>기본 정보</span>를 입력해주세요
        </h2>
        <span className={styles.titleHint}>(* 가견적 정확도 목표: ±20% 이내 — 상세 입력 시 정확도가 향상합니다.)</span>
      </div>

      <div className={styles.card}>
        <div className={styles.fields}>
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <div className={styles.fieldHeader}>
                <span className={styles.fieldLabel}>지역</span>
                <span className={styles.fieldHint}>인건비 지역 단가 반영</span>
              </div>
              <div className={styles.buttonRow}>
                {REGIONS.map((r) => (
                  <SelectButton key={r} selected={step1.region === r} onClick={() => setStep1({ region: r })}>
                    {r}
                  </SelectButton>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <span className={styles.fieldLabel}>공간 유형</span>
              <div className={styles.buttonRow}>
                {SPACE_TYPES.map((t) => (
                  <SelectButton key={t} selected={step1.spaceType === t} onClick={() => setStep1({ spaceType: t })}>
                    {t}
                  </SelectButton>
                ))}
              </div>
            </div>

            <div className={styles.fieldWithGap}>
              <label htmlFor={areaInputId} className={styles.fieldLabel}>
                전용 면적
              </label>
              <div className={styles.areaInput}>
                <input
                  id={areaInputId}
                  type="number"
                  min={0}
                  className={styles.areaInputNumber}
                  value={step1.area ?? ''}
                  onChange={(e) => {
                    if (e.target.value === '') {
                      setStep1({ area: null });
                      return;
                    }
                    const parsed = Number(e.target.value);
                    setStep1({ area: Number.isFinite(parsed) && parsed > 0 ? parsed : null });
                  }}
                />
                <span className={styles.areaUnit}>평</span>
              </div>
            </div>

            <div className={styles.field}>
              <div className={styles.fieldHeader}>
                <span className={styles.fieldLabel}>방 개수</span>
                <span className={styles.fieldHint}>도배·마루 면적 추정 보정</span>
              </div>
              <div className={styles.buttonRow}>
                {ROOM_COUNTS.map((c) => (
                  <SelectButton key={c} selected={step1.roomCount === c} onClick={() => setStep1({ roomCount: c })}>
                    {c}
                  </SelectButton>
                ))}
              </div>
            </div>
          </div>

          <StepActions onNext={nextStep} onSecondary={reset} secondaryLabel="초기화" showResetIcon />
        </div>
      </div>
    </div>
  );
}
