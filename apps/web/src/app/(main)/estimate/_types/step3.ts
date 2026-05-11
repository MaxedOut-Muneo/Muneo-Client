export const BUILDING_AGES = ['신축(3년 이하)', '10년 이하', '10~20년 이하', '20년 이상'] as const;
export type BuildingAge = (typeof BUILDING_AGES)[number];

export const ELEVATOR_OPTIONS = ['있음', '없음'] as const;
export type Elevator = (typeof ELEVATOR_OPTIONS)[number];

export const OCCUPANCIES = ['거주 중', '공실'] as const;
export type Occupancy = (typeof OCCUPANCIES)[number];

export const TRUCK_ACCESSES = ['가능', '불가(골목/지하)', '모름'] as const;
export type TruckAccess = (typeof TRUCK_ACCESSES)[number];

export const CONSTRUCTION_TIMINGS = ['1개월 이내', '1~3개월', '3개월 이후', '미정'] as const;
export type ConstructionTiming = (typeof CONSTRUCTION_TIMINGS)[number];

export interface Step3Data {
  buildingAge: BuildingAge | null;
  elevator: Elevator | null;
  floor: number | null;
  occupancy: Occupancy | null;
  truckAccess: TruckAccess | null;
  constructionTiming: ConstructionTiming | null;
}
