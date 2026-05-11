export const WATERPROOF_NEEDS = ['필요', '불필요', '모름'] as const;
export type WaterproofNeed = (typeof WATERPROOF_NEEDS)[number];

export const WATERPROOF_COUNTS = ['1개', '2개', '3개 이상'] as const;
export type WaterproofCount = (typeof WATERPROOF_COUNTS)[number];

export const PIPING_WORKS = ['수도 배관 교체', '난방 배관 이설', '둘 다', '불필요'] as const;
export type PipingWork = (typeof PIPING_WORKS)[number];

export const BALCONY_EXPANSIONS = ['있음', '없음'] as const;
export type BalconyExpansion = (typeof BALCONY_EXPANSIONS)[number];

export const BALCONY_COUNTS = ['1개소', '2개소', '3개소 이상'] as const;
export type BalconyCount = (typeof BALCONY_COUNTS)[number];

export const BOILER_REPLACEMENTS = ['있음', '없음', '모름'] as const;
export type BoilerReplacement = (typeof BOILER_REPLACEMENTS)[number];

export interface PlumbingDetail {
  waterproofNeed: WaterproofNeed | null;
  waterproofCount: WaterproofCount | null;
  pipingWork: PipingWork | null;
  balconyExpansion: BalconyExpansion | null;
  balconyCount: BalconyCount | null;
  boilerReplacement: BoilerReplacement | null;
}
