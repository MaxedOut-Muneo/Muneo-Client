export const BATHROOM_COUNTS = ['1개', '2개', '3개 이상'] as const;
export type BathroomCount = (typeof BATHROOM_COUNTS)[number];

export const BATHROOM_SIZES = ['소형(1평 미만)', '중형(1~2평)', '대형(2평 이상)'] as const;
export type BathroomSize = (typeof BATHROOM_SIZES)[number];

export const BATHROOM_SCOPES = ['전면 리모델링', '부분 교체'] as const;
export type BathroomScope = (typeof BATHROOM_SCOPES)[number];

export const BATHROOM_TILE_GRADES = ['일반', '중급', '고급(수입)'] as const;
export type BathroomTileGrade = (typeof BATHROOM_TILE_GRADES)[number];

export const BATHROOM_TILE_SIZES = ['300각', '600각', '대형(800각 이상)'] as const;
export type BathroomTileSize = (typeof BATHROOM_TILE_SIZES)[number];

export const SANITARY_WARES = ['양변기', '세면대', '욕조', '샤워부스'] as const;
export type SanitaryWare = (typeof SANITARY_WARES)[number];

export const FAUCET_REPLACEMENTS = ['전체 교체', '일부 교체', '교체 안함'] as const;
export type FaucetReplacement = (typeof FAUCET_REPLACEMENTS)[number];

export const CEILING_REPLACEMENTS = ['있음', '없음'] as const;
export type CeilingReplacement = (typeof CEILING_REPLACEMENTS)[number];

export const VENTILATION_FANS = ['있음', '없음'] as const;
export type VentilationFan = (typeof VENTILATION_FANS)[number];

export const BATHROOM_ACCESSORIES = ['포함', '미포함'] as const;
export type BathroomAccessory = (typeof BATHROOM_ACCESSORIES)[number];

export interface BathroomDetail {
  bathroomCount: BathroomCount | null;
  bathroomSize: BathroomSize | null;
  bathroomScope: BathroomScope | null;
  bathroomTileGrade: BathroomTileGrade | null;
  bathroomTileSize: BathroomTileSize | null;
  sanitaryWare: SanitaryWare[];
  faucetReplacement: FaucetReplacement | null;
  ceilingReplacement: CeilingReplacement | null;
  ventilationFan: VentilationFan | null;
  accessory: BathroomAccessory | null;
}
