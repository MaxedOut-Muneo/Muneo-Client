'use client';

import { useState } from 'react';
import { useEstimateStore } from '../../_store/estimateStore';
import { BASIC_PROCESSES, OPTIONAL_PROCESSES } from '../../_types';
import { ProcessCheckbox } from '../ProcessCheckbox/ProcessCheckbox';
import { StepActions } from '../StepActions/StepActions';
import * as styles from './Step2ProcessSelection.css';

const BASIC_ROWS = [BASIC_PROCESSES.slice(0, 5), BASIC_PROCESSES.slice(5, 10), BASIC_PROCESSES.slice(10)];

export function Step2ProcessSelection() {
  const { step2, setStep2, toggleProcess, nextStep, prevStep } = useEstimateStore();
  const [validationError, setValidationError] = useState(false);

  const handleNext = () => {
    if (step2.selectedProcesses.length === 0) {
      setValidationError(true);
      return;
    }
    setValidationError(false);
    nextStep();
  };

  const handleModeChange = (mode: 'full' | 'partial') => {
    if (mode === 'full') {
      setStep2({ mode, selectedProcesses: BASIC_PROCESSES.map((p) => p.id) });
    } else {
      setStep2({ mode, selectedProcesses: [] });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Step 2 <span className={styles.titleAccent}>시공 대상 공정</span>를 선택해주세요
        </h2>
        <span className={styles.titleHint}>전체 리모델링 선택 시 기본 공정이 자동 포함됩니다. 개별 해제 가능.</span>
      </div>

      <div className={styles.card}>
        <div className={styles.tabBar}>
          {(['full', 'partial'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              className={step2.mode === mode ? styles.tabActive : styles.tabInactive}
              onClick={() => handleModeChange(mode)}
            >
              {mode === 'full' ? '전체 리모델링' : '부분 시공'}
            </button>
          ))}
        </div>

        <div className={styles.cardBody}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
            <div className={styles.processSection}>
              <span className={styles.sectionLabel}>기본 공정 (자동 포함)</span>
              <div className={styles.processGrid}>
                {BASIC_ROWS.map((row, rowIdx) => (
                  <div key={rowIdx} className={styles.processRow}>
                    {row.map((process) => (
                      <ProcessCheckbox
                        key={process.id}
                        process={process}
                        selected={step2.selectedProcesses.includes(process.id)}
                        onToggle={toggleProcess}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.processSection}>
              <span className={styles.sectionLabel}>선택 공정 (필요 시 추가)</span>
              <div className={styles.processRow}>
                {OPTIONAL_PROCESSES.map((process) => (
                  <ProcessCheckbox
                    key={process.id}
                    process={process}
                    selected={step2.selectedProcesses.includes(process.id)}
                    onToggle={toggleProcess}
                  />
                ))}
              </div>
            </div>
          </div>

          {validationError && (
            <p style={{ color: 'red', fontSize: '13px', marginBottom: '8px' }}>공정을 1개 이상 선택해주세요.</p>
          )}
          <StepActions onNext={handleNext} onSecondary={prevStep} />
        </div>
      </div>
    </div>
  );
}
