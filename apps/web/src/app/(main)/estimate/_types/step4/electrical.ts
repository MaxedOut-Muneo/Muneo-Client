export const LIGHTING_SCOPES = ['전체 교체', '거실+주방만', '방만', '교체 안함'] as const;
export type LightingScope = (typeof LIGHTING_SCOPES)[number];

export const LIGHTING_TYPES = ['LED 매입등', 'LED 직부등', '레일조명', '혼합'] as const;
export type LightingType = (typeof LIGHTING_TYPES)[number];

export const OUTLET_SWITCHES = ['전체 교체', '일부 교체', '교체 안함'] as const;
export type OutletSwitch = (typeof OUTLET_SWITCHES)[number];

export const OUTLET_ADDS = ['있음', '없음'] as const;
export type OutletAdd = (typeof OUTLET_ADDS)[number];

export const BREAKER_REPLACEMENTS = ['있음', '없음', '모름'] as const;
export type BreakerReplacement = (typeof BREAKER_REPLACEMENTS)[number];

export const DETECTOR_REPLACEMENTS = ['있음', '없음'] as const;
export type DetectorReplacement = (typeof DETECTOR_REPLACEMENTS)[number];

export interface ElectricalDetail {
  lightingScope: LightingScope | null;
  lightingType: LightingType | null;
  outletSwitch: OutletSwitch | null;
  outletAdd: OutletAdd | null;
  outletAddCount: number;
  breakerReplacement: BreakerReplacement | null;
  detectorReplacement: DetectorReplacement | null;
}
