export const SINK_SHAPES = ['ㄱ자(일자)', 'ㄷ자', 'ㄹ자(아일랜드 포함)'] as const;
export type SinkShape = (typeof SINK_SHAPES)[number];

export const SINK_MANUFACTURES = ['사제(일반)', '브랜드(한샘/리바트 등)'] as const;
export type SinkManufacture = (typeof SINK_MANUFACTURES)[number];

export const UPPER_CABINETS = ['교체', '유지', '없음'] as const;
export type UpperCabinet = (typeof UPPER_CABINETS)[number];

export const LOWER_CABINETS = ['교체', '유지'] as const;
export type LowerCabinet = (typeof LOWER_CABINETS)[number];

export const COUNTERTOP_MATERIALS = ['인조대리석', '엔지니어드스톤', '천연석'] as const;
export type CountertopMaterial = (typeof COUNTERTOP_MATERIALS)[number];

export const KITCHEN_TILE_REPLACEMENTS = ['있음', '없음'] as const;
export type KitchenTileReplacement = (typeof KITCHEN_TILE_REPLACEMENTS)[number];

export const HOOD_REPLACEMENTS = ['있음', '없음'] as const;
export type HoodReplacement = (typeof HOOD_REPLACEMENTS)[number];

export const KITCHEN_FAUCETS = ['있음', '없음'] as const;
export type KitchenFaucet = (typeof KITCHEN_FAUCETS)[number];

export interface KitchenDetail {
  sinkShape: SinkShape | null;
  sinkManufacture: SinkManufacture | null;
  upperCabinet: UpperCabinet | null;
  lowerCabinet: LowerCabinet | null;
  countertopMaterial: CountertopMaterial | null;
  kitchenTileReplacement: KitchenTileReplacement | null;
  hoodReplacement: HoodReplacement | null;
  kitchenFaucet: KitchenFaucet | null;
}
