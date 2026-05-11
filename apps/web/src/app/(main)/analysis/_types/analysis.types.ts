export const SPACE_TYPES = ['아파트', '빌라', '오피스텔', '단독 주택'] as const;
export type SpaceType = (typeof SPACE_TYPES)[number];

export const REGIONS = ['서울', '수도권', '지방'] as const;
export type Region = (typeof REGIONS)[number];

export const BUILDING_AGES = ['5년 이하', '5~10년', '10~20년', '20년 이상'] as const;
export type BuildingAge = (typeof BUILDING_AGES)[number];

export const ELEVATOR_OPTIONS = ['있음', '없음'] as const;
export type ElevatorOption = (typeof ELEVATOR_OPTIONS)[number];

export const DIAGNOSIS_STATUSES = ['정상', '누락', '미비', '불분명'] as const;
export type DiagnosisStatus = (typeof DIAGNOSIS_STATUSES)[number];

export interface AnalysisFormData {
  spaceType: SpaceType | null;
  area: number | null;
  roomCount: number | null;
  floor: number | null;
  elevator: ElevatorOption | null;
  region: Region | null;
  buildingAge: BuildingAge | null;
}

export interface UploadedFile {
  name: string;
  size: string;
}

export interface DiagnosisItemData {
  id: string;
  status: DiagnosisStatus;
  title: string;
  description: string;
  actionNote: string;
}

export interface ProcessSectionData {
  id: string;
  name: string;
  items: DiagnosisItemData[];
}

export interface DiagnosisResult {
  vendorLabel: string;
  areaLabel: string;
  analyzedAt: string;
  missingCount: number;
  riskCount: number;
  insufficientCount: number;
  sections: ProcessSectionData[];
}
