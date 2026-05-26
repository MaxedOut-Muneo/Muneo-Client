import { act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAnalysisStore } from './analysisStore';

vi.mock('@/api/analyze', () => ({
  analyzeRisk: vi.fn(),
  saveRisk: vi.fn(),
}));
vi.mock('@/api/files', () => ({
  getPresignedUrl: vi.fn(),
  uploadToS3: vi.fn(),
}));

const mockAnalyzeRisk = vi.mocked((await import('@/api/analyze')).analyzeRisk);
const mockSaveRisk = vi.mocked((await import('@/api/analyze')).saveRisk);
const mockGetPresignedUrl = vi.mocked((await import('@/api/files')).getPresignedUrl);
const mockUploadToS3 = vi.mocked((await import('@/api/files')).uploadToS3);

const MOCK_REPORT = {
  title: '진단 레포트',
  subtitle_fields: { pyeong: 32, company_name: 'A업체', analyzed_date: '2026-04-11' },
  construction_info: {
    space_type: '아파트',
    region: '서울',
    building_age: '10~20년',
    floor: 5,
    elevator: true,
    room_count: 3,
  },
  cards: {},
  process_sections: [
    {
      process: '철거',
      display_name: '철거 공사',
      items: [{ title: '일반 철거', description: '180만원', guide: '', status: '정상' as const }],
    },
  ],
  summary: { total_risk_items: 3, chips: { 누락: 1, 중복: 1, 불분명: 1 } },
};

const VALID_FORM = {
  spaceType: '아파트' as const,
  pyeong: 32,
  roomCount: 3,
  floor: 5,
  elevator: '있음' as const,
  region: '서울' as const,
  buildingAge: '10~20년' as const,
  companyName: 'A업체',
};

describe('analysisStore', () => {
  beforeEach(() => {
    useAnalysisStore.getState().reset();
    vi.clearAllMocks();
  });

  describe('초기 상태', () => {
    it('view는 input, loading은 false, files는 빈 배열, diagnosisResult는 null이다', () => {
      const state = useAnalysisStore.getState();
      expect(state.view).toBe('input');
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.files).toEqual([]);
      expect(state.diagnosisResult).toBeNull();
    });

    it('form 모든 필드가 null로 시작한다', () => {
      const { form } = useAnalysisStore.getState();
      expect(form).toEqual({
        spaceType: null,
        pyeong: null,
        roomCount: null,
        floor: null,
        elevator: null,
        region: null,
        buildingAge: null,
        companyName: null,
      });
    });
  });

  describe('setForm', () => {
    it('전달한 필드만 patch하고 나머지는 유지한다', () => {
      useAnalysisStore.getState().setForm({ spaceType: '아파트', pyeong: 32 });
      const { form } = useAnalysisStore.getState();
      expect(form.spaceType).toBe('아파트');
      expect(form.pyeong).toBe(32);
      expect(form.region).toBeNull();
    });

    it('여러 번 호출하면 누적된다', () => {
      useAnalysisStore.getState().setForm({ spaceType: '아파트' });
      useAnalysisStore.getState().setForm({ region: '서울' });
      const { form } = useAnalysisStore.getState();
      expect(form.spaceType).toBe('아파트');
      expect(form.region).toBe('서울');
    });
  });

  describe('addFile / removeFile', () => {
    it('addFile로 파일이 추가된다', () => {
      useAnalysisStore.getState().addFile(new File([], 'a.pdf', { type: 'application/pdf' }));
      expect(useAnalysisStore.getState().files).toHaveLength(1);
      expect(useAnalysisStore.getState().files[0].name).toBe('a.pdf');
    });

    it('addFile은 기존 파일을 유지하면서 누적한다', () => {
      useAnalysisStore.getState().addFile(new File([], 'a.pdf', { type: 'application/pdf' }));
      useAnalysisStore.getState().addFile(new File([], 'b.pdf', { type: 'application/pdf' }));
      expect(useAnalysisStore.getState().files).toHaveLength(2);
    });

    it('removeFile은 name이 일치하는 파일을 제거한다', () => {
      useAnalysisStore.getState().addFile(new File([], 'a.pdf', { type: 'application/pdf' }));
      useAnalysisStore.getState().addFile(new File([], 'b.pdf', { type: 'application/pdf' }));
      useAnalysisStore.getState().removeFile('a.pdf');
      const { files } = useAnalysisStore.getState();
      expect(files).toHaveLength(1);
      expect(files[0].name).toBe('b.pdf');
    });

    it('removeFile에 없는 name을 넘기면 변화가 없다', () => {
      useAnalysisStore.getState().addFile(new File([], 'a.pdf', { type: 'application/pdf' }));
      useAnalysisStore.getState().removeFile('not-exists.pdf');
      expect(useAnalysisStore.getState().files).toHaveLength(1);
    });
  });

  describe('submitAnalysis', () => {
    it('호출 즉시 loading이 true가 된다', () => {
      mockGetPresignedUrl.mockResolvedValue({
        uploadUrl: 'https://s3.example.com/upload',
        key: 'key',
        fileUrl: 'https://s3.example.com/file',
        uploadMethod: 'PUT',
        contentType: 'image/png',
        expiresAt: '',
      });
      mockUploadToS3.mockResolvedValue(undefined);
      mockAnalyzeRisk.mockResolvedValue({ report: MOCK_REPORT });
      mockSaveRisk.mockResolvedValue({ id: 'saved-id' });

      useAnalysisStore.getState().setForm(VALID_FORM);
      useAnalysisStore.getState().submitAnalysis(1);
      expect(useAnalysisStore.getState().loading).toBe(true);
    });

    it('완료되면 diagnosisResult 설정, view=report, loading=false로 전환된다', async () => {
      mockGetPresignedUrl.mockResolvedValue({
        uploadUrl: 'https://s3.example.com/upload',
        key: 'key',
        fileUrl: 'https://s3.example.com/file',
        uploadMethod: 'PUT',
        contentType: 'image/png',
        expiresAt: '',
      });
      mockUploadToS3.mockResolvedValue(undefined);
      mockAnalyzeRisk.mockResolvedValue({ report: MOCK_REPORT });
      mockSaveRisk.mockResolvedValue({ id: 'saved-id' });

      useAnalysisStore.getState().setForm(VALID_FORM);
      useAnalysisStore.getState().addFile(new File([], 'estimate.png', { type: 'image/png' }));

      await act(async () => {
        await useAnalysisStore.getState().submitAnalysis(1);
      });

      const state = useAnalysisStore.getState();
      expect(state.loading).toBe(false);
      expect(state.view).toBe('report');
      expect(state.diagnosisResult).not.toBeNull();
      expect(state.diagnosisResult?.vendorLabel).toBe('A업체');
      expect(state.diagnosisResult?.missingCount).toBe(1);
    });

    it('analyzeRisk가 reject하면 error 메시지를 설정하고 loading=false로 전환된다', async () => {
      mockGetPresignedUrl.mockResolvedValue({
        uploadUrl: 'https://s3.example.com/upload',
        key: 'key',
        fileUrl: 'https://s3.example.com/file',
        uploadMethod: 'PUT',
        contentType: 'image/png',
        expiresAt: '',
      });
      mockUploadToS3.mockResolvedValue(undefined);
      mockAnalyzeRisk.mockRejectedValue(new Error('네트워크 오류'));

      useAnalysisStore.getState().setForm(VALID_FORM);

      await act(async () => {
        await useAnalysisStore.getState().submitAnalysis(1);
      });

      const state = useAnalysisStore.getState();
      expect(state.loading).toBe(false);
      expect(state.error).toBe('분석 중 오류가 발생했습니다.');
      expect(state.view).toBe('input');
      expect(state.diagnosisResult).toBeNull();
    });

    it('필수 필드가 누락되면 error를 설정하고 API를 호출하지 않는다', async () => {
      await act(async () => {
        await useAnalysisStore.getState().submitAnalysis(1);
      });

      expect(useAnalysisStore.getState().error).toBe('모든 공사 정보를 입력해주세요.');
      expect(mockAnalyzeRisk).not.toHaveBeenCalled();
    });
  });

  describe('reset', () => {
    it('모든 상태를 초기값으로 되돌린다', async () => {
      const store = useAnalysisStore.getState();
      store.setForm({ spaceType: '아파트', pyeong: 32 });
      store.addFile(new File([], 'a.pdf', { type: 'application/pdf' }));
      store.reset();
      const state = useAnalysisStore.getState();
      expect(state.view).toBe('input');
      expect(state.form.spaceType).toBeNull();
      expect(state.files).toEqual([]);
      expect(state.diagnosisResult).toBeNull();
    });
  });
});
