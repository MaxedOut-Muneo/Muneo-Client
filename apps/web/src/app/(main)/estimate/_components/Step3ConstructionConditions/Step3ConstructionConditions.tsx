'use client';

import { SelectButton } from '@muneo/design-system';
import { useEstimateStore } from '../../_store/estimateStore';
import {
  type BuildingAge,
  type ConstructionTiming,
  type Elevator,
  type Occupancy,
  type TruckAccess,
} from '../../estimate.types';
import { StepActions } from '../StepActions/StepActions';
import * as styles from './Step3ConstructionConditions.css';

const BUILDING_AGES: BuildingAge[] = ['신축(3년 이하)', '10년 이하', '10~20년 이하', '20년 이상'];
const ELEVATORS: Elevator[] = ['있음', '없음'];
const OCCUPANCIES: Occupancy[] = ['거주 중', '공실'];
const TRUCK_ACCESSES: TruckAccess[] = ['가능', '불가(골목/지하)', '모름'];
const CONSTRUCTION_TIMINGS: ConstructionTiming[] = ['1개월 이내', '1~3개월', '3개월 이후', '미정'];

export function Step3ConstructionConditions() {
  const { step3, setStep3, nextStep, prevStep } = useEstimateStore();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Step 3 <span className={styles.titleAccent}>공사 조건</span>을 입력해주세요
        </h2>
        <span className={styles.titleHint}>(* 가견적 정확도 목표: ±20% 이내 — 상세 입력 시 정확도가 향상합니다.)</span>
      </div>

      <div className={styles.card}>
        <div className={styles.fields}>
          <div className={styles.fieldRows}>
            <div className={styles.field}>
              <div className={styles.fieldHeader}>
                <span className={styles.fieldLabel}>건물 연식</span>
                <span className={styles.fieldHint}>인건비 지역 단가 반영</span>
              </div>
              <div className={styles.buttonRow}>
                {BUILDING_AGES.map((age) => (
                  <SelectButton
                    key={age}
                    selected={step3.buildingAge === age}
                    onClick={() => setStep3({ buildingAge: age })}
                  >
                    {age}
                  </SelectButton>
                ))}
              </div>
            </div>

            <div className={styles.twoColRow}>
              <div className={styles.twoColLeft}>
                <div className={styles.field}>
                  <span className={styles.fieldLabel}>엘리베이터</span>
                  <div className={styles.buttonRow}>
                    {ELEVATORS.map((ev) => (
                      <SelectButton
                        key={ev}
                        selected={step3.elevator === ev}
                        onClick={() => setStep3({ elevator: ev })}
                      >
                        {ev}
                      </SelectButton>
                    ))}
                  </div>
                </div>

                <div className={styles.floorField}>
                  <span className={styles.fieldLabel}>층수</span>
                  <div className={styles.areaInput}>
                    <input
                      type="number"
                      min={0}
                      className={styles.areaInputNumber}
                      value={step3.floor ?? 0}
                      onChange={(e) => setStep3({ floor: Number(e.target.value) || null })}
                    />
                    <span className={styles.areaUnit}>층</span>
                  </div>
                </div>
              </div>

              <div className={styles.field}>
                <span className={styles.fieldLabel}>공간 상황</span>
                <div className={styles.buttonRow}>
                  {OCCUPANCIES.map((occ) => (
                    <SelectButton
                      key={occ}
                      selected={step3.occupancy === occ}
                      onClick={() => setStep3({ occupancy: occ })}
                    >
                      {occ}
                    </SelectButton>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.twoColRight}>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>트럭 접근</span>
                <div className={styles.buttonRow}>
                  {TRUCK_ACCESSES.map((ta) => (
                    <SelectButton
                      key={ta}
                      selected={step3.truckAccess === ta}
                      onClick={() => setStep3({ truckAccess: ta })}
                    >
                      {ta}
                    </SelectButton>
                  ))}
                </div>
              </div>

              <div className={styles.field}>
                <span className={styles.fieldLabel}>공사 희망시기</span>
                <div className={styles.buttonRow}>
                  {CONSTRUCTION_TIMINGS.map((ct) => (
                    <SelectButton
                      key={ct}
                      selected={step3.constructionTiming === ct}
                      onClick={() => setStep3({ constructionTiming: ct })}
                    >
                      {ct}
                    </SelectButton>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <StepActions onNext={nextStep} onSecondary={prevStep} />
        </div>
      </div>
    </div>
  );
}
