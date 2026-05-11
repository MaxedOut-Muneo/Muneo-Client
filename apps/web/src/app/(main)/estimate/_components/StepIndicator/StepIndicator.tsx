import { DoneRingRoundFillIcon } from '@muneo/design-system';
import { ESTIMATE_STEPS, STEP_LABELS, type EstimateStep } from '../../_types';
import * as styles from './StepIndicator.css';

interface StepIndicatorProps {
  currentStep: EstimateStep;
}

type StepState = 'pending' | 'active' | 'completed';

function getStepState(step: EstimateStep, currentStep: EstimateStep): StepState {
  if (step < currentStep) {
    return 'completed';
  }
  if (step === currentStep) {
    return 'active';
  }
  return 'pending';
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className={styles.container}>
      {ESTIMATE_STEPS.map((step) => {
        const state = getStepState(step, currentStep);
        const isWide = step === 4;

        return (
          <div key={step} style={{ display: 'contents' }}>
            <div className={isWide ? styles.stepItemWide : styles.stepItem}>
              <div
                className={
                  state === 'completed'
                    ? styles.circleCompleted
                    : state === 'active'
                      ? styles.circleActive
                      : styles.circlePending
                }
              >
                {state === 'completed' ? (
                  <DoneRingRoundFillIcon width={30} height={30} className={styles.iconCompleted} />
                ) : (
                  <span className={state === 'active' ? styles.stepNumberActive : styles.stepNumberPending}>
                    {step}
                  </span>
                )}
              </div>
              <span
                className={
                  state === 'completed'
                    ? styles.stepLabelCompleted
                    : state === 'active'
                      ? styles.stepLabelActive
                      : styles.stepLabelPending
                }
              >
                {STEP_LABELS[step]}
              </span>
            </div>
            {step < ESTIMATE_STEPS.length && (
              <div className={state === 'completed' ? styles.connectorGreen : styles.connectorGray} />
            )}
          </div>
        );
      })}
    </div>
  );
}
