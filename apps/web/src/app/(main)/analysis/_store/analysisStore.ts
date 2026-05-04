import { create } from 'zustand';
import { MOCK_DIAGNOSIS_RESULT } from '../_mocks/analysis.mock';
import { type AnalysisFormData, type DiagnosisResult, type UploadedFile } from '../_types/analysis.types';

const DEFAULT_FORM: AnalysisFormData = {
  spaceType: null,
  area: null,
  roomCount: null,
  floor: null,
  elevator: null,
  region: null,
  buildingAge: null,
};

interface AnalysisStore {
  view: 'input' | 'report';
  loading: boolean;
  error: string | null;
  form: AnalysisFormData;
  files: UploadedFile[];
  diagnosisResult: DiagnosisResult | null;
  setForm: (patch: Partial<AnalysisFormData>) => void;
  addFile: (file: UploadedFile) => void;
  removeFile: (name: string) => void;
  submitAnalysis: () => Promise<void>;
  reset: () => void;
}

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  view: 'input',
  loading: false,
  error: null,
  form: { ...DEFAULT_FORM },
  files: [],
  diagnosisResult: null,
  setForm: (patch) => set((s) => ({ form: { ...s.form, ...patch } })),
  addFile: (file) => set((s) => ({ files: [...s.files, file] })),
  removeFile: (name) => set((s) => ({ files: s.files.filter((f) => f.name !== name) })),
  submitAnalysis: async () => {
    set({ loading: true, error: null });
    try {
      // API 연동 시 아래 목 데이터를 교체
      // const result = await api.post('analysis', { json: get().form }).json<DiagnosisResult>();
      await new Promise((resolve) => setTimeout(resolve, 800));
      set({ diagnosisResult: MOCK_DIAGNOSIS_RESULT, view: 'report', loading: false });
    } catch {
      set({ error: '분석 중 오류가 발생했습니다.', loading: false });
    }
  },
  reset: () => set({ view: 'input', form: { ...DEFAULT_FORM }, files: [], diagnosisResult: null, error: null }),
}));
