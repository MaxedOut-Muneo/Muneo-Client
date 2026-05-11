export const DEMOLITION_SCOPES = ['전체 철거', '부분 철거'] as const;
export type DemolitionScope = (typeof DEMOLITION_SCOPES)[number];

export const DEMOLITION_ITEMS = [
  '몰딩·걸레받이',
  '도어·문틀',
  '마루·장판',
  '욕실 타일',
  '주방',
  '천정',
  '벽체·조적',
  '붙박이장·가구',
] as const;
export type DemolitionItem = (typeof DEMOLITION_ITEMS)[number];

export const WASTE_DISPOSALS = ['업체 포함', '별도 처리', '모름'] as const;
export type WasteDisposal = (typeof WASTE_DISPOSALS)[number];

export interface DemolitionDetail {
  scope: DemolitionScope | null;
  partialItems: DemolitionItem[];
  wasteDisposal: WasteDisposal | null;
}
