export type SpaceType = '아파트' | '빌라' | '오피스텔' | '단독 주택';
export type Region = '서울' | '수도권' | '지방';
export type BuildingAge = '5년 이하' | '5~10년' | '10~20년' | '20년 이상';
export type ElevatorOption = '있음' | '없음';
export type DiagnosisStatus = '정상' | '누락' | '미비' | '불분명';

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
