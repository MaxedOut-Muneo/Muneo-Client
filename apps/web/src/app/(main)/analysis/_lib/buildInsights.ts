interface Counts {
  missingCount: number;
  riskCount: number;
  insufficientCount: number;
}

/**
 * 누락·불분명·중복 카운트를 바탕으로 사용자에게 전달할 액션 인사이트 3문장을 반환합니다.
 */
export const buildInsights = ({ missingCount, riskCount, insufficientCount }: Counts): [string, string, string] => {
  const total = missingCount + riskCount + insufficientCount;

  if (total === 0) {
    return [
      '검토 결과 리스크 항목이 발견되지 않았습니다.',
      '견적서 전체를 한 번 더 살펴보고, 공사 범위와 자재 기준이 계약서에 명확히 기재되었는지 확인하세요.',
      '문제가 없더라도 계약 전 업체에 공정별 일정과 하자 보증 조건을 서면으로 확인받는 것을 권장합니다.',
    ];
  }

  // 1. 전체 상황 요약
  const overview =
    total <= 3
      ? `총 ${total}건(누락 ${missingCount} · 불분명 ${riskCount} · 중복 ${insufficientCount})의 확인이 필요한 항목이 발견되었습니다. 계약 전 업체에 해당 항목을 반드시 문의하세요.`
      : `총 ${total}건(누락 ${missingCount} · 불분명 ${riskCount} · 중복 ${insufficientCount})의 리스크 항목이 발견되어 주의가 필요합니다. 업체와 항목별로 충분히 협의한 뒤 계약을 진행하세요.`;

  // 2. 우선순위가 가장 높은 유형별 구체적 액션 (누락 > 불분명 > 중복)
  let primaryAction: string;
  if (missingCount > 0) {
    primaryAction = `누락된 ${missingCount}개 항목은 공사 중 예상치 못한 추가 비용으로 이어질 수 있으므로, 포함 여부와 예상 금액을 업체에 서면으로 확인받으세요.`;
  } else if (riskCount > 0) {
    primaryAction = `불분명하게 기재된 ${riskCount}개 항목은 단가·수량·자재 규격을 구체적으로 명시해 달라고 요청해 추후 분쟁 소지를 없애세요.`;
  } else {
    primaryAction = `중복 청구가 의심되는 ${insufficientCount}개 항목은 업체에 실제 중복 여부를 확인하고, 해당 금액 차감을 협의하세요.`;
  }

  // 3. 계약 시 공통 조언
  const contractAdvice =
    '업체의 답변은 반드시 문자·이메일 등 서면으로 받아 계약서에 반영하세요. 구두 확인만으로는 분쟁 발생 시 보호받기 어렵습니다.';

  return [overview, primaryAction, contractAdvice];
};
