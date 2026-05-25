import { create } from 'zustand';
import { analyzeRisk, saveRisk } from '@/api/analyze';
import {
  type AnalysisFormData,
  type DiagnosisResult,
  type RiskAnalyzeRequestBody,
  type RiskReport,
  type UploadedFile,
} from '../_types/analysis.types';

const DEFAULT_FORM: AnalysisFormData = {
  spaceType: null,
  pyeong: null,
  roomCount: null,
  floor: null,
  elevator: null,
  region: null,
  buildingAge: null,
  companyName: null,
};

const formatSize = (bytes: number): string => {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)}KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
};

const mapApiReportToDiagnosisResult = (report: RiskReport): DiagnosisResult => ({
  vendorLabel: report.subtitle_fields.company_name,
  areaLabel: `${report.subtitle_fields.pyeong}평 ${report.construction_info.space_type}`,
  analyzedAt: (report.subtitle_fields.analyzed_date ?? new Date().toISOString()).slice(0, 10).replace(/-/g, '.'),
  missingCount: report.summary.chips.누락,
  riskCount: report.summary.chips.불분명,
  insufficientCount: report.summary.chips.중복,
  sections: report.process_sections.map((s, si) => ({
    id: String(si),
    name: s.display_name,
    items: s.items.map((item, ii) => ({
      id: `${si}_${ii}`,
      status: item.status,
      title: item.title,
      description: item.description,
      actionNote: item.guide,
    })),
  })),
});

interface AnalysisStore {
  view: 'input' | 'report';
  loading: boolean;
  error: string | null;
  form: AnalysisFormData;
  files: UploadedFile[];
  diagnosisResult: DiagnosisResult | null;
  setForm: (patch: Partial<AnalysisFormData>) => void;
  addFile: (file: File) => void;
  removeFile: (name: string) => void;
  submitAnalysis: (userId: number) => Promise<void>;
  cancelAnalysis: () => void;
  reset: () => void;
}

let _abortController: AbortController | null = null;

export const useAnalysisStore = create<AnalysisStore>((set, get) => ({
  view: 'input',
  loading: false,
  error: null,
  form: { ...DEFAULT_FORM },
  files: [],
  diagnosisResult: null,
  setForm: (patch) => set((s) => ({ form: { ...s.form, ...patch } })),
  addFile: (file) =>
    set((s) => ({
      files: [...s.files, { file, name: file.name, size: formatSize(file.size) }],
    })),
  removeFile: (name) => set((s) => ({ files: s.files.filter((f) => f.name !== name) })),
  submitAnalysis: async (userId) => {
    set({ loading: true, error: null });
    try {
      const { form, files } = get();

      if (
        !form.spaceType ||
        form.pyeong === null ||
        form.roomCount === null ||
        form.floor === null ||
        !form.elevator ||
        !form.region ||
        !form.buildingAge ||
        !form.companyName
      ) {
        set({ error: '모든 공사 정보를 입력해주세요.', loading: false });
        return;
      }

      console.group('━━━ [견적서 진단] 분석 시작 ━━━');
      console.log('[공사 정보 폼]', { ...form });
      console.log(
        '[업로드 파일 목록]',
        files.map((f) => ({ name: f.name, size: f.size, type: f.file.type }))
      );

      // 1. 요청 데이터 구성 (saveRisk 재사용)
      const requestBody: RiskAnalyzeRequestBody = {
        space_type: form.spaceType,
        pyeong: form.pyeong,
        room_count: form.roomCount,
        floor: form.floor,
        elevator: form.elevator === '있음',
        region: form.region,
        building_age: form.buildingAge,
        company_name: form.companyName,
      };

      console.group('[STEP 1] analyzeRisk 요청 데이터');
      console.log('[폼 필드]', requestBody);
      console.log(
        '[files 필드]',
        files.map((f) => ({ name: f.name, type: f.file.type, size: f.file.size }))
      );
      console.groupEnd();

      // 2. multipart FormData 구성 — 각 필드를 개별 form 파라미터로 전송
      const formData = new FormData();
      formData.append('space_type', requestBody.space_type);
      formData.append('pyeong', String(requestBody.pyeong));
      formData.append('room_count', String(requestBody.room_count));
      formData.append('floor', String(requestBody.floor));
      formData.append('elevator', String(requestBody.elevator));
      formData.append('region', requestBody.region);
      formData.append('building_age', requestBody.building_age);
      formData.append('company_name', requestBody.company_name);
      files.forEach((f) => formData.append('files', f.file, f.name));

      // 3. 분석 요청
      _abortController = new AbortController();
      const { report } = await analyzeRisk(formData, _abortController.signal);

      console.group('[STEP 2] analyzeRisk 응답 상세');
      console.log('[report.title]', report.title);
      console.log('[report.subtitle_fields]', report.subtitle_fields);
      console.log('[report.construction_info]', report.construction_info);
      console.log('[report.summary]', report.summary);
      console.log('[report.cards]', report.cards);
      console.log('[report.process_sections]', report.process_sections);
      console.groupEnd();

      // 4. 결과 저장
      const saved = await saveRisk({ input: requestBody, result: { report } }, userId);

      console.log('[STEP 3] saveRisk 완료 →', saved);

      // 5. UI 상태 업데이트
      const diagnosisResult = mapApiReportToDiagnosisResult(report);
      console.log('[STEP 4] 매핑된 DiagnosisResult]', diagnosisResult);
      console.groupEnd(); // ━━━ 분석 시작

      set({ diagnosisResult, view: 'report', loading: false });
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      const clientErr = err as Error & { status?: number; body?: unknown };
      console.error('[견적서 진단] 오류 발생');
      console.error('  message:', clientErr.message);
      console.error('  status:', clientErr.status);
      console.error('  body:', clientErr.body);
      console.error('  stack:', clientErr.stack);
      console.groupEnd();
      set({ error: '분석 중 오류가 발생했습니다.', loading: false });
    }
  },
  cancelAnalysis: () => {
    _abortController?.abort();
    _abortController = null;
    set({ view: 'input', form: { ...DEFAULT_FORM }, files: [], diagnosisResult: null, error: null, loading: false });
  },
  reset: () =>
    set({ view: 'input', form: { ...DEFAULT_FORM }, files: [], diagnosisResult: null, error: null, loading: false }),
}));
