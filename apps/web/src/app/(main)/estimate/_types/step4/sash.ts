export const SASH_AREAS = ['거실', '침실1', '침실2', '침실3', '주방', '발코니(전면)', '발코니(후면)'] as const;
export type SashArea = (typeof SASH_AREAS)[number];

export const WINDOW_TYPES = ['이중창', '삼중창', '시스템창'] as const;
export type WindowType = (typeof WINDOW_TYPES)[number];

export const FRAME_TYPES = ['PVC', '알루미늄', '하이브리드(복합)'] as const;
export type FrameType = (typeof FRAME_TYPES)[number];

export const GLASS_SPECS = ['일반 복층유리', '로이(Low-E) 복층유리', '삼중유리'] as const;
export type GlassSpec = (typeof GLASS_SPECS)[number];

export const SASH_MIDDLE_DOOR_TYPES = ['슬라이딩', '폴딩', '여닫이'] as const;
export type SashMiddleDoorType = (typeof SASH_MIDDLE_DOOR_TYPES)[number];

export interface SashDetail {
  replacementAreas: SashArea[];
  windowType: WindowType | null;
  frameType: FrameType | null;
  glassSpec: GlassSpec | null;
  doorReplacement: '포함' | '미포함' | null;
  doorCount: number;
  middleDoorInstall: '있음' | '없음' | null;
  middleDoorType: SashMiddleDoorType | null;
}
