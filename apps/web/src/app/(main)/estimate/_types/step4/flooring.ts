export const FLOOR_MATERIALS = ['강마루', '강화마루', '원목마루', '장판', '데코타일'] as const;
export type FloorMaterial = (typeof FLOOR_MATERIALS)[number];

export const FLOORING_SCOPES = ['전체', '거실+방만', '방만'] as const;
export type FlooringScope = (typeof FLOORING_SCOPES)[number];

export const BASEBOARD_INCLUDEDS = ['포함', '미포함'] as const;
export type BaseboardIncluded = (typeof BASEBOARD_INCLUDEDS)[number];

export const FLOOR_DEMOLITIONS = ['필요', '불필요', '모름'] as const;
export type FloorDemolition = (typeof FLOOR_DEMOLITIONS)[number];

export const FLOOR_SANDINGS = ['필요', '불필요', '모름'] as const;
export type FloorSanding = (typeof FLOOR_SANDINGS)[number];

export const FLOOR_PATTERNS = ['일반', '헤링본'] as const;
export type FloorPattern = (typeof FLOOR_PATTERNS)[number];

export interface FlooringDetail {
  floorMaterial: FloorMaterial | null;
  flooringScope: FlooringScope | null;
  baseboardIncluded: BaseboardIncluded | null;
  floorDemolition: FloorDemolition | null;
  floorSanding: FloorSanding | null;
  floorPattern: FloorPattern | null;
}
