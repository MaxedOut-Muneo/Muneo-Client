import { act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useAnalysisStore } from './analysisStore';

describe('analysisStore', () => {
  beforeEach(() => {
    useAnalysisStore.getState().reset();
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
        area: null,
        roomCount: null,
        floor: null,
        elevator: null,
        region: null,
        buildingAge: null,
      });
    });
  });

  describe('setForm', () => {
    it('전달한 필드만 patch하고 나머지는 유지한다', () => {
      useAnalysisStore.getState().setForm({ spaceType: '아파트', area: 32 });
      const { form } = useAnalysisStore.getState();
      expect(form.spaceType).toBe('아파트');
      expect(form.area).toBe(32);
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
      useAnalysisStore.getState().addFile({ name: 'a.pdf', size: '1MB' });
      expect(useAnalysisStore.getState().files).toEqual([{ name: 'a.pdf', size: '1MB' }]);
    });

    it('addFile은 기존 파일을 유지하면서 누적한다', () => {
      useAnalysisStore.getState().addFile({ name: 'a.pdf', size: '1MB' });
      useAnalysisStore.getState().addFile({ name: 'b.pdf', size: '2MB' });
      expect(useAnalysisStore.getState().files).toHaveLength(2);
    });

    it('removeFile은 name이 일치하는 파일을 제거한다', () => {
      useAnalysisStore.getState().addFile({ name: 'a.pdf', size: '1MB' });
      useAnalysisStore.getState().addFile({ name: 'b.pdf', size: '2MB' });
      useAnalysisStore.getState().removeFile('a.pdf');
      const { files } = useAnalysisStore.getState();
      expect(files).toEqual([{ name: 'b.pdf', size: '2MB' }]);
    });

    it('removeFile에 없는 name을 넘기면 변화가 없다', () => {
      useAnalysisStore.getState().addFile({ name: 'a.pdf', size: '1MB' });
      useAnalysisStore.getState().removeFile('not-exists.pdf');
      expect(useAnalysisStore.getState().files).toHaveLength(1);
    });
  });

  describe('submitAnalysis', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    it('호출 즉시 loading이 true가 된다', () => {
      useAnalysisStore.getState().submitAnalysis();
      expect(useAnalysisStore.getState().loading).toBe(true);
    });

    it('완료되면 diagnosisResult 설정, view=report, loading=false로 전환된다', async () => {
      const promise = useAnalysisStore.getState().submitAnalysis();
      await act(async () => {
        await vi.runAllTimersAsync();
        await promise;
      });
      const state = useAnalysisStore.getState();
      expect(state.loading).toBe(false);
      expect(state.view).toBe('report');
      expect(state.diagnosisResult).not.toBeNull();
    });

    it('setTimeout이 throw하면 error 메시지를 설정하고 loading=false로 전환된다', async () => {
      const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout').mockImplementation(() => {
        throw new Error('네트워크 오류');
      });

      await act(async () => {
        await useAnalysisStore.getState().submitAnalysis();
      });

      const state = useAnalysisStore.getState();
      expect(state.loading).toBe(false);
      expect(state.error).toBe('분석 중 오류가 발생했습니다.');
      expect(state.view).toBe('input');
      expect(state.diagnosisResult).toBeNull();

      setTimeoutSpy.mockRestore();
    });
  });

  describe('reset', () => {
    it('모든 상태를 초기값으로 되돌린다', () => {
      const store = useAnalysisStore.getState();
      store.setForm({ spaceType: '아파트', area: 32 });
      store.addFile({ name: 'a.pdf', size: '1MB' });
      store.reset();
      const state = useAnalysisStore.getState();
      expect(state.view).toBe('input');
      expect(state.form.spaceType).toBeNull();
      expect(state.files).toEqual([]);
      expect(state.diagnosisResult).toBeNull();
    });
  });
});
