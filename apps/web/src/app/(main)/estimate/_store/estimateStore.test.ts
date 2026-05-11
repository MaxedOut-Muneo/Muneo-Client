import { beforeEach, describe, expect, it } from 'vitest';
import { useEstimateStore } from './estimateStore';

describe('estimateStore', () => {
  beforeEach(() => {
    useEstimateStore.getState().reset();
  });

  describe('초기 상태', () => {
    it('currentStep은 1, mode는 full, 기본 공정이 모두 선택돼 있다', () => {
      const state = useEstimateStore.getState();
      expect(state.currentStep).toBe(1);
      expect(state.step2.mode).toBe('full');
      expect(state.step2.selectedProcesses.length).toBe(11);
    });

    it('step1/step3 모든 필드가 null로 시작한다', () => {
      const { step1, step3 } = useEstimateStore.getState();
      expect(Object.values(step1).every((v) => v === null)).toBe(true);
      expect(Object.values(step3).every((v) => v === null)).toBe(true);
    });
  });

  describe('단계 이동', () => {
    it('nextStep으로 1 → 5까지 증가한다', () => {
      const { nextStep } = useEstimateStore.getState();
      for (let i = 0; i < 4; i++) {
        nextStep();
      }
      expect(useEstimateStore.getState().currentStep).toBe(5);
    });

    it('nextStep은 5를 넘지 않는다', () => {
      const store = useEstimateStore.getState();
      store.goToStep(5);
      store.nextStep();
      expect(useEstimateStore.getState().currentStep).toBe(5);
    });

    it('prevStep으로 5 → 1까지 감소한다', () => {
      const store = useEstimateStore.getState();
      store.goToStep(5);
      for (let i = 0; i < 4; i++) {
        store.prevStep();
      }
      expect(useEstimateStore.getState().currentStep).toBe(1);
    });

    it('prevStep은 1 밑으로 내려가지 않는다', () => {
      useEstimateStore.getState().prevStep();
      expect(useEstimateStore.getState().currentStep).toBe(1);
    });

    it('goToStep으로 임의 단계로 이동한다', () => {
      useEstimateStore.getState().goToStep(3);
      expect(useEstimateStore.getState().currentStep).toBe(3);
    });
  });

  describe('setStep1/2/3 patch', () => {
    it('setStep1은 전달한 필드만 변경하고 나머지는 유지한다', () => {
      useEstimateStore.getState().setStep1({ region: '서울', area: 32 });
      const { step1 } = useEstimateStore.getState();
      expect(step1.region).toBe('서울');
      expect(step1.area).toBe(32);
      expect(step1.spaceType).toBeNull();
    });

    it('setStep3는 누적 patch가 가능하다', () => {
      const { setStep3 } = useEstimateStore.getState();
      setStep3({ buildingAge: '10년 이하' });
      setStep3({ elevator: '있음', floor: 5 });
      const { step3 } = useEstimateStore.getState();
      expect(step3.buildingAge).toBe('10년 이하');
      expect(step3.elevator).toBe('있음');
      expect(step3.floor).toBe(5);
    });
  });

  describe('setStep4 (공정별 detail patch)', () => {
    it('새 공정 키에 대해 patch가 추가된다', () => {
      useEstimateStore.getState().setStep4('demolition', { scope: '전체 철거' });
      expect(useEstimateStore.getState().step4.demolition?.scope).toBe('전체 철거');
    });

    it('기존 공정 patch는 누적된다', () => {
      const { setStep4 } = useEstimateStore.getState();
      setStep4('demolition', { scope: '전체 철거' });
      setStep4('demolition', { wasteDisposal: '업체 포함' });
      const { demolition } = useEstimateStore.getState().step4;
      expect(demolition?.scope).toBe('전체 철거');
      expect(demolition?.wasteDisposal).toBe('업체 포함');
    });

    it('다른 공정 patch는 서로 영향을 주지 않는다', () => {
      const { setStep4 } = useEstimateStore.getState();
      setStep4('demolition', { scope: '전체 철거' });
      setStep4('plumbing', { waterproofNeed: '필요' });
      const { step4 } = useEstimateStore.getState();
      expect(step4.demolition?.scope).toBe('전체 철거');
      expect(step4.plumbing?.waterproofNeed).toBe('필요');
    });
  });

  describe('toggleProcess', () => {
    it('포함된 공정 ID를 toggle하면 제거된다', () => {
      useEstimateStore.getState().toggleProcess('demolition');
      const { selectedProcesses } = useEstimateStore.getState().step2;
      expect(selectedProcesses.includes('demolition')).toBe(false);
    });

    it('미포함 공정 ID를 toggle하면 추가된다', () => {
      useEstimateStore.getState().toggleProcess('sash');
      const { selectedProcesses } = useEstimateStore.getState().step2;
      expect(selectedProcesses.includes('sash')).toBe(true);
    });

    it('두 번 toggle하면 원상복구된다', () => {
      const { toggleProcess } = useEstimateStore.getState();
      toggleProcess('sash');
      toggleProcess('sash');
      const { selectedProcesses } = useEstimateStore.getState().step2;
      expect(selectedProcesses.includes('sash')).toBe(false);
    });
  });

  describe('reset', () => {
    it('모든 상태를 초기값으로 되돌린다', () => {
      const store = useEstimateStore.getState();
      store.goToStep(3);
      store.setStep1({ region: '서울' });
      store.setStep4('demolition', { scope: '전체 철거' });
      store.reset();
      const state = useEstimateStore.getState();
      expect(state.currentStep).toBe(1);
      expect(state.step1.region).toBeNull();
      expect(state.step4).toEqual({});
    });
  });
});
