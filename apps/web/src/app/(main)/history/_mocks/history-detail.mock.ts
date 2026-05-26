import { type DiagnosisResult } from '@/app/(main)/analysis/_types/analysis.types';
import { type EstimateSummary } from '../_types/history.types';

export const MOCK_DIAGNOSIS_DETAILS: Record<number, DiagnosisResult> = {
  5: {
    vendorLabel: 'A업체',
    areaLabel: '주거 32평 전체 리모델링',
    analyzedAt: '2026.04.15',
    missingCount: 4,
    riskCount: 2,
    insufficientCount: 1,
    sections: [
      {
        id: 'demolition',
        name: '철거',
        items: [
          {
            id: 'd-1',
            status: '누락',
            title: '철거 범위 미명시',
            description: '계약서에 철거 범위가 구체적으로 명시되지 않았습니다.',
            actionNote: '철거 범위를 평면도 기준으로 명확히 표기하도록 요청하세요.',
          },
          {
            id: 'd-2',
            status: '불분명',
            title: '폐자재 처리 비용',
            description: '폐자재 처리 비용의 포함 여부가 불분명합니다.',
            actionNote: '견적서에 폐자재 처리 비용 포함 여부를 명시하도록 확인하세요.',
          },
        ],
      },
      {
        id: 'plumbing',
        name: '설비',
        items: [
          {
            id: 'p-1',
            status: '누락',
            title: '급배수 교체 범위 미기재',
            description: '급배수관 교체 범위가 계약서에 누락되어 있습니다.',
            actionNote: '급배수 교체 범위와 사용 자재를 명시하도록 요청하세요.',
          },
        ],
      },
      {
        id: 'electrical',
        name: '전기/조명',
        items: [
          {
            id: 'e-1',
            status: '누락',
            title: '조명 기구 수량 미기재',
            description: '조명 기구 수량 및 사양이 계약서에 명시되지 않았습니다.',
            actionNote: '조명 기구 수량, 브랜드, 사양을 구체적으로 명시하세요.',
          },
          {
            id: 'e-2',
            status: '중복',
            title: '전기 용량 정보 부족',
            description: '전기 용량 증설 여부에 대한 정보가 미비합니다.',
            actionNote: '전기 용량 증설 필요 여부와 비용을 확인하세요.',
          },
        ],
      },
      {
        id: 'carpentry',
        name: '목공',
        items: [
          {
            id: 'c-1',
            status: '누락',
            title: '붙박이장 포함 여부 미기재',
            description: '붙박이장 시공 포함 여부가 명시되지 않았습니다.',
            actionNote: '붙박이장 포함/제외 여부와 사양을 명시하도록 요청하세요.',
          },
          {
            id: 'c-2',
            status: '불분명',
            title: '몰딩 처리 방식 불명확',
            description: '몰딩 처리 방식(유무, 종류)이 불명확합니다.',
            actionNote: '몰딩 종류와 적용 범위를 구체적으로 확인하세요.',
          },
        ],
      },
      {
        id: 'flooring',
        name: '바닥',
        items: [
          {
            id: 'f-1',
            status: '정상',
            title: '바닥재 사양 명시',
            description: '바닥재 제품명, 두께, 적용 범위가 정상적으로 명시되어 있습니다.',
            actionNote: '',
          },
        ],
      },
    ],
  },
  3: {
    vendorLabel: 'B업체',
    areaLabel: '주거 28평 리모델링',
    analyzedAt: '2026.04.12',
    missingCount: 2,
    riskCount: 1,
    insufficientCount: 0,
    sections: [
      {
        id: 'demolition',
        name: '철거',
        items: [
          {
            id: 'd-1',
            status: '누락',
            title: '철거 범위 미명시',
            description: '계약서에 철거 범위가 구체적으로 명시되지 않았습니다.',
            actionNote: '철거 범위를 평면도 기준으로 명확히 표기하도록 요청하세요.',
          },
        ],
      },
      {
        id: 'wallpaper',
        name: '도배',
        items: [
          {
            id: 'w-1',
            status: '누락',
            title: '도배 자재 사양 누락',
            description: '도배지 브랜드 및 등급이 명시되지 않았습니다.',
            actionNote: '도배지 브랜드, 등급, 적용 범위를 명시하도록 요청하세요.',
          },
          {
            id: 'w-2',
            status: '불분명',
            title: '도배 시공 범위 불명확',
            description: '천장 포함 여부가 불명확합니다.',
            actionNote: '천장 도배 포함 여부를 확인하세요.',
          },
        ],
      },
      {
        id: 'flooring',
        name: '바닥',
        items: [
          {
            id: 'f-1',
            status: '정상',
            title: '바닥재 사양 명시',
            description: '바닥재 제품명, 두께, 적용 범위가 정상적으로 명시되어 있습니다.',
            actionNote: '',
          },
        ],
      },
    ],
  },
  1: {
    vendorLabel: 'D업체',
    areaLabel: '주거 32평 부분 리모델링',
    analyzedAt: '2026.04.05',
    missingCount: 0,
    riskCount: 0,
    insufficientCount: 0,
    sections: [
      {
        id: 'kitchen',
        name: '주방',
        items: [
          {
            id: 'k-1',
            status: '정상',
            title: '주방 가구 사양 명시',
            description: '주방 가구 브랜드, 사양, 색상이 정상적으로 명시되어 있습니다.',
            actionNote: '',
          },
          {
            id: 'k-2',
            status: '정상',
            title: '싱크대 교체 범위 명시',
            description: '싱크대 교체 범위와 자재가 정상적으로 명시되어 있습니다.',
            actionNote: '',
          },
        ],
      },
      {
        id: 'bathroom',
        name: '욕실',
        items: [
          {
            id: 'b-1',
            status: '정상',
            title: '욕실 타일 사양 명시',
            description: '욕실 타일 제품, 사이즈, 시공 범위가 명시되어 있습니다.',
            actionNote: '',
          },
        ],
      },
    ],
  },
};

export const MOCK_ESTIMATE_DETAILS: Record<number, EstimateSummary> = {
  4: {
    constructionType: '상업 20평 신규',
    selectedProcesses: ['철거', '도배', '바닥', '전기/조명', '마감/공과잡비'],
    totalEstimate: '약 2,800만원',
    analyzedAt: '2026.04.14',
  },
  2: {
    constructionType: '주거 45평 전체',
    selectedProcesses: ['철거', '설비', '전기/조명', '목공', '도배', '바닥', '타일', '욕실', '주방', '마감/공과잡비'],
    totalEstimate: '약 4,500만원',
    analyzedAt: '2026.04.10',
  },
};
