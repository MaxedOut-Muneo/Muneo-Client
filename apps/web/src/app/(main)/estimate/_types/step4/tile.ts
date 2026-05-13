export const TILE_LOCATIONS = [
  '현관 바닥',
  '주방 벽면(백스플래시)',
  '발코니 바닥',
  '발코니 벽면',
  '거실 바닥',
] as const;
export type TileLocation = (typeof TILE_LOCATIONS)[number];

export const TILE_SIZES = ['소형(200각 이하)', '중형(300~400각)', '대형(600각 이상)'] as const;
export type TileSize = (typeof TILE_SIZES)[number];

export const TILE_GRADES = ['일반', '중급', '고급(수입)'] as const;
export type TileGrade = (typeof TILE_GRADES)[number];

export interface TileDetail {
  tileLocations: TileLocation[];
  tileSize: TileSize | null;
  tileGrade: TileGrade | null;
}
