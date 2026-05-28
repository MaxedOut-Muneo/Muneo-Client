'use client';

import { useMemo } from 'react';
import { LoadingScreen } from '@/app/(main)/_components/LoadingScreen';

const TIPS = [
  '가견적은 실제 시공비와 ±20% 오차가 있을 수 있어요',
  '공정을 세밀하게 입력할수록 견적 정확도가 높아져요',
  '철거 공정은 건물 연식에 따라 비용이 달라질 수 있어요',
  '인테리어 견적은 계절·시기에 따라 15~30% 차이가 날 수 있어요',
  '엘리베이터 유무는 자재 운반비에 직접 영향을 줘요',
  '창호 교체는 단열 성능 향상에 가장 효과적인 공정이에요',
  '트럭 접근이 어려울수록 하차 비용이 추가돼요',
];

const PROGRESS_STEPS = [
  { delay: 100, value: 30, duration: 3000, easing: 'ease-out' },
  { delay: 3200, value: 70, duration: 8000, easing: 'linear' },
  { delay: 11200, value: 85, duration: 12000, easing: 'linear' },
  { delay: 23200, value: 92, duration: 20000, easing: 'linear' },
];

interface Props {
  region: string | null;
  processCount: number;
  onCancel: () => void;
}

export const EstimateLoadingScreen = ({ region, processCount, onCancel }: Props) => {
  const messages = useMemo(
    () => [
      '입력하신 조건과 유사한 사례를 검색하고 있어요',
      `${processCount}개 공정의 세부 항목별 시세를 분석 중이에요`,
      `${region ?? '해당 지역'} 기준 인건비 단가를 반영하고 있어요`,
      '공정별 재료비와 철거·폐기 비용을 계산하고 있어요',
      '최종 견적 범위를 산출하고 있어요',
    ],
    [region, processCount]
  );

  return (
    <LoadingScreen
      messages={messages}
      tips={TIPS}
      warningMessage="시간이 예상보다 걸리고 있어요. 조금만 더 기다려 주세요."
      warningDelayMs={30000}
      progressSteps={PROGRESS_STEPS}
      footerText="보통 10~15초 정도 소요돼요"
      onCancel={onCancel}
    />
  );
};
