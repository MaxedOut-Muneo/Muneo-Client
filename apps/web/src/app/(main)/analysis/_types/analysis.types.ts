import { type DiagnosisStatus } from '@/api/analyze';

export const SPACE_TYPES = ['아파트', '빌라', '오피스텔', '단독 주택'] as const;
export type SpaceType = (typeof SPACE_TYPES)[number];

export const REGIONS = ['서울', '수도권', '지방'] as const;
export type Region = (typeof REGIONS)[number];

export const BUILDING_AGES = ['10년 이하', '10~20년', '20년 이상'] as const;
export type BuildingAge = (typeof BUILDING_AGES)[number];

export const ELEVATOR_OPTIONS = ['있음', '없음'] as const;
export type ElevatorOption = (typeof ELEVATOR_OPTIONS)[number];

export interface AnalysisFormData {
  spaceType: SpaceType | null;
  pyeong: number | null;
  roomCount: number | null;
  floor: number | null;
  elevator: ElevatorOption | null;
  region: Region | null;
  buildingAge: BuildingAge | null;
  companyName: string | null;
}

export interface UploadedFile {
  file: File;
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
