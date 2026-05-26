import { type DiagnosisResult } from '../_types/analysis.types';

export const MOCK_DIAGNOSIS_RESULT: DiagnosisResult = {
  vendorLabel: 'A업체',
  areaLabel: '32평 전체 리모델링',
  analyzedAt: '2026.04.11',
  missingCount: 3,
  riskCount: 3,
  insufficientCount: 3,
  sections: [
    {
      id: 'demolition',
      name: '철거 공사',
      items: [
        {
          id: 'demo-1',
          status: '정상',
          title: '일반 철거',
          description: '180만원 · 몰딩/걸레받이/도어/문틀/바닥재 철거 포함',
          actionNote: '',
        },
      ],
    },
    {
      id: 'wallpaper',
      name: '도배 공사',
      items: [
        {
          id: 'wallpaper-1',
          status: '누락',
          title: '폐기물 처리비 미기재',
          description: '32평 전체 철거 시 별도 발생 가능 금액:',
          actionNote: '업체에 폐기물 처리비 포함 여부를 확인하세요',
        },
        {
          id: 'wallpaper-2',
          status: '중복',
          title: '자재 브랜드·모델명 누락',
          description: '→ "실크벽지"만 기재, 구체적 제품 정보 없음. 자재 등급에 따라 평당 4천~1.5만원 차이',
          actionNote: '사용 벽지 브랜드와 모델명을 요청하세요 (예: LX z:in 베스띠)',
        },
      ],
    },
  ],
};

export const MOCK_SUMMARY = {
  missingCount: 1,
  unclearCount: 1,
  insufficientCount: 1,
};
