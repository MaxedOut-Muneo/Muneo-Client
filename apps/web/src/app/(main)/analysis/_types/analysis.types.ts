export const SPACE_TYPES = ['아파트', '빌라', '오피스텔', '단독 주택'] as const;
export type SpaceType = (typeof SPACE_TYPES)[number];

export const REGIONS = ['서울', '수도권', '지방'] as const;
export type Region = (typeof REGIONS)[number];

export const BUILDING_AGES = ['10년 이하', '10~20년', '20년 이상'] as const;
export type BuildingAge = (typeof BUILDING_AGES)[number];

export const ELEVATOR_OPTIONS = ['있음', '없음'] as const;
export type ElevatorOption = (typeof ELEVATOR_OPTIONS)[number];

export const DIAGNOSIS_STATUSES = ['정상', '누락', '중복', '불분명'] as const;
export type DiagnosisStatus = (typeof DIAGNOSIS_STATUSES)[number];

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

// ── API 응답 타입 ──────────────────────────────────────────

export interface PresignedUrlResponse {
  uploadUrl: string;
  key: string;
  fileUrl: string;
  uploadMethod: 'PUT';
  contentType: string;
  expiresAt: string;
}

export interface RiskAnalyzeRequestBody {
  space_type: string;
  pyeong: number;
  room_count: number;
  floor: number;
  elevator: boolean;
  region: string;
  building_age: string;
  company_name: string;
}

export interface ApiProcessItem {
  title: string;
  description: string;
  guide: string;
  status: DiagnosisStatus;
}

export interface ApiProcessSection {
  process: string;
  display_name: string;
  items: ApiProcessItem[];
}

export interface RiskSummary {
  total_risk_items: number;
  chips: { 누락: number; 중복: number; 불분명: number };
}

export interface SubtitleFields {
  pyeong: number;
  company_name: string;
  analyzed_date?: string;
}

export interface RiskReport {
  title: string;
  subtitle_fields: SubtitleFields;
  construction_info: {
    space_type: string;
    region: string;
    building_age: string;
    floor: number;
    elevator: boolean;
    room_count: number;
  };
  cards: Record<string, unknown>;
  process_sections: ApiProcessSection[];
  summary: RiskSummary;
}

export interface RiskDetectAnalyzeResponse {
  report: RiskReport;
}

export interface RiskSaveBody {
  input: RiskAnalyzeRequestBody;
  result: { report: RiskReport };
}
