export const SITE_PROTECTIONS = ['필요', '불필요'] as const;
export type SiteProtection = (typeof SITE_PROTECTIONS)[number];

export const ELEVATOR_PROTECTIONS = ['필요', '불필요', '해당없음'] as const;
export type ElevatorProtection = (typeof ELEVATOR_PROTECTIONS)[number];

export const MOVING_CLEANS = ['포함', '미포함'] as const;
export type MovingClean = (typeof MOVING_CLEANS)[number];

export const FINISHING_WASTES = ['포함', '별도', '모름'] as const;
export type FinishingWaste = (typeof FINISHING_WASTES)[number];

export const SILICON_FINISHES = ['포함', '미포함'] as const;
export type SiliconFinish = (typeof SILICON_FINISHES)[number];

export interface FinishingDetail {
  siteProtection: SiteProtection | null;
  elevatorProtection: ElevatorProtection | null;
  movingClean: MovingClean | null;
  finishingWaste: FinishingWaste | null;
  siliconFinish: SiliconFinish | null;
}
