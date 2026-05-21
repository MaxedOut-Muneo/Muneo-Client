export const FURNITURE_ITEMS = [
  '붙박이장',
  '신발장',
  '냉장고장',
  '펜트리(다용도장)',
  '드레스룸 수납',
  '아일랜드',
  '기타 수납장',
] as const;
export type FurnitureItem = (typeof FURNITURE_ITEMS)[number];

export const WARDROBE_STYLES = ['슬라이딩', '여닫이', '오픈형'] as const;
export type WardrobeStyle = (typeof WARDROBE_STYLES)[number];

export const WARDROBE_SIZES = ['반통(1.2m 이하)', '전통(1.8m 이상)'] as const;
export type WardrobeSize = (typeof WARDROBE_SIZES)[number];

export const SHOE_CABINET_STYLES = ['키큰장(전면)', '하부장만', '상하분리'] as const;
export type ShoeCabinetStyle = (typeof SHOE_CABINET_STYLES)[number];

export const MAKE_METHODS = ['사제(현장 제작)', '공장 제작', '브랜드(한샘/리바트 등)'] as const;
export type MakeMethod = (typeof MAKE_METHODS)[number];

export const SURFACE_MATERIALS = ['LPM(일반)', 'PET(고광택)', '원목무늬목', '도장마감'] as const;
export type SurfaceMaterial = (typeof SURFACE_MATERIALS)[number];

export interface FurnitureDetail {
  furnitureItems: FurnitureItem[];
  wardrobeCount: number;
  wardrobeStyle: WardrobeStyle | null;
  wardrobeSize: WardrobeSize | null;
  shoeCabinetStyle: ShoeCabinetStyle | null;
  makeMethod: MakeMethod | null;
  surfaceMaterial: SurfaceMaterial | null;
}
