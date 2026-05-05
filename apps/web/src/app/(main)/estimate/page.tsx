'use client';

import { Step1BasicInfo } from './_components/Step1BasicInfo/Step1BasicInfo';
import { Step2ProcessSelection } from './_components/Step2ProcessSelection/Step2ProcessSelection';
import { Step3ConstructionConditions } from './_components/Step3ConstructionConditions/Step3ConstructionConditions';
import { Step4ProcessDetail } from './_components/Step4ProcessDetail/Step4ProcessDetail';
import { EstimateResult } from './_components/Step5EstimateReview/Step5EstimateReview';
import { StepIndicator } from './_components/StepIndicator/StepIndicator';
import { useEstimateStore } from './_store/estimateStore';
import * as styles from './page.css';

const STEP_COMPONENTS = {
  1: Step1BasicInfo,
  2: Step2ProcessSelection,
  3: Step3ConstructionConditions,
  4: Step4ProcessDetail,
  5: EstimateResult,
} as const;

export default function EstimatePage() {
  const currentStep = useEstimateStore((s) => s.currentStep);
  const StepComponent = STEP_COMPONENTS[currentStep];

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <StepIndicator currentStep={currentStep} />
        <StepComponent />
      </div>
    </div>
  );
}
