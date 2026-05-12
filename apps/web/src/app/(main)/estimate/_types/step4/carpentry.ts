export const MOLDING_WORKS = ['전체', '일부', '없음'] as const;
export type MoldingWork = (typeof MOLDING_WORKS)[number];

export const BASEBOARD_WORKS = ['전체', '일부', '없음'] as const;
export type BaseboardWork = (typeof BASEBOARD_WORKS)[number];

export const DOOR_COUNTS = ['0개', '1개', '2개', '3개', '4개', '5개', '6개 이상'] as const;
export type DoorCount = (typeof DOOR_COUNTS)[number];

export const DOOR_FRAME_WORKS = ['도어와 함께', '문틀만', '없음'] as const;
export type DoorFrameWork = (typeof DOOR_FRAME_WORKS)[number];

export const MIDDLE_DOORS = ['있음', '없음'] as const;
export type MiddleDoor = (typeof MIDDLE_DOORS)[number];

export const COFFER_CEILINGS = ['있음', '없음'] as const;
export type CofferCeiling = (typeof COFFER_CEILINGS)[number];

export const CARPENTRY_EXTRAS = ['가벽 신설', '웨인스코팅', '아치문', '아트월', '천장 보강(실링팬)'] as const;
export type CarpentryExtra = (typeof CARPENTRY_EXTRAS)[number];

export interface CarpentryDetail {
  moldingWork: MoldingWork | null;
  baseboardWork: BaseboardWork | null;
  doorCount: DoorCount | null;
  doorFrameWork: DoorFrameWork | null;
  middleDoor: MiddleDoor | null;
  cofferCeiling: CofferCeiling | null;
  carpentryExtra: CarpentryExtra[];
}
