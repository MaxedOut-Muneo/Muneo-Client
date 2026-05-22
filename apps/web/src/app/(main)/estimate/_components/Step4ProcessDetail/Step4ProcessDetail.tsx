'use client';

import { SelectButton } from '@muneo/design-system';
import { type ReactNode, useState } from 'react';
import { useEstimateStore } from '../../_store/estimateStore';
import {
  BASIC_PROCESSES,
  OPTIONAL_PROCESSES,
  SANITARY_WARES,
  WALLPAPER_ROOMS,
  type BathroomDetail,
  type DemolitionDetail,
  type FlooringDetail,
  type KitchenDetail,
  type WallpaperDetail,
} from '../../_types';
import { ChatHint } from '../ChatHint/ChatHint';
import { StepActions } from '../StepActions/StepActions';
import * as styles from './Step4ProcessDetail.css';

const ALL_PROCESSES = [...BASIC_PROCESSES, ...OPTIONAL_PROCESSES];

const toggleItem = <T,>(arr: T[], item: T): T[] => {
  return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
};

interface FieldProps {
  label: string;
  children: ReactNode;
  conditional?: boolean;
}

const Field = ({ label, children, conditional = false }: FieldProps) => {
  return (
    <div className={conditional ? styles.conditionalField : styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      {children}
    </div>
  );
};

interface ProcessSectionProps<T> {
  data: Partial<T>;
  onChange: (patch: Partial<T>) => void;
}

// ─────────── 1. 철거 ───────────
const DemolitionSection = ({ data, onChange }: ProcessSectionProps<DemolitionDetail>) => {
  return (
    <div className={styles.sectionBody}>
      <Field label="철거 범위">
        <div className={styles.buttonRow}>
          {(['전체 철거', '부분 철거'] as const).map((opt) => (
            <SelectButton key={opt} selected={data.scope === opt} onClick={() => onChange({ scope: opt })}>
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>
    </div>
  );
};

// ─────────── 2. 도배 ───────────
const WallpaperSection = ({ data, onChange }: ProcessSectionProps<WallpaperDetail>) => {
  return (
    <div className={styles.sectionBody}>
      <Field label="벽지 종류">
        <div className={styles.buttonRow}>
          {(['실크벽지', '합지벽지', '천연벽지'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.wallpaperType === opt}
              onClick={() => onChange({ wallpaperType: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="시공 범위">
        <div className={styles.buttonRow}>
          {(['전체(벽면+천장)', '벽면만', '부분 도배'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.wallpaperScope === opt}
              onClick={() =>
                onChange(
                  opt === '부분 도배' ? { wallpaperScope: opt } : { wallpaperScope: opt, partialRooms: undefined }
                )
              }
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      {data.wallpaperScope === '부분 도배' && (
        <Field label="부분 도배 공간" conditional>
          <div className={styles.buttonRow}>
            {WALLPAPER_ROOMS.map((room) => (
              <SelectButton
                key={room}
                selected={(data.partialRooms ?? []).includes(room)}
                onClick={() => onChange({ partialRooms: toggleItem(data.partialRooms ?? [], room) })}
              >
                {room}
              </SelectButton>
            ))}
          </div>
        </Field>
      )}

      <Field label="초배 작업">
        <div className={styles.buttonRow}>
          {(['포함', '미포함', '모름'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.underpaperWork === opt}
              onClick={() => onChange({ underpaperWork: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
        <ChatHint visible={data.underpaperWork === '모름'} message="도배 전 초배 작업이 필요한 경우는 언제인가요?" />
      </Field>

      <p className={styles.infoNote}>
        실크벽지 기준으로 산출됩니다. 합지 선택 시 약 35% 저렴, 천연벽지는 약 40% 비쌉니다.
      </p>
    </div>
  );
};

// ─────────── 3. 바닥 ───────────
const FlooringSection = ({ data, onChange }: ProcessSectionProps<FlooringDetail>) => {
  return (
    <div className={styles.sectionBody}>
      <Field label="바닥재 종류">
        <div className={styles.buttonRow}>
          {(['강마루', '강화마루', '원목마루', '장판', '데코타일'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.floorMaterial === opt}
              onClick={() => onChange({ floorMaterial: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="시공 범위">
        <div className={styles.buttonRow}>
          {(['전체', '거실+방만', '방만'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.flooringScope === opt}
              onClick={() => onChange({ flooringScope: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="기존 바닥 철거">
        <div className={styles.buttonRow}>
          {(['필요', '불필요', '모름'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.floorDemolition === opt}
              onClick={() => onChange({ floorDemolition: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
        <ChatHint
          visible={data.floorDemolition === '모름'}
          message="기존 바닥을 철거해야 하는 상황은 어떤 경우인가요?"
        />
      </Field>

      <p className={styles.infoNote}>강마루 기준 산출. 강화마루 약 25% 저렴, 원목마루 약 2배.</p>
    </div>
  );
};

// ─────────── 4. 욕실 ───────────
const BathroomSection = ({ data, onChange }: ProcessSectionProps<BathroomDetail>) => {
  return (
    <div className={styles.sectionBody}>
      <Field label="욕실 개수">
        <div className={styles.buttonRow}>
          {(['1개', '2개', '3개 이상'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.bathroomCount === opt}
              onClick={() => onChange({ bathroomCount: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="욕실 크기">
        <div className={styles.buttonRow}>
          {(['소형(1평 미만)', '중형(1~2평)', '대형(2평 이상)'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.bathroomSize === opt}
              onClick={() => onChange({ bathroomSize: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="타일 등급">
        <div className={styles.buttonRow}>
          {(['일반', '중급', '고급(수입)'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.bathroomTileGrade === opt}
              onClick={() => onChange({ bathroomTileGrade: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="위생도기">
        <div className={styles.buttonRow}>
          {SANITARY_WARES.map((item) => (
            <SelectButton
              key={item}
              selected={(data.sanitaryWare ?? []).includes(item)}
              onClick={() => onChange({ sanitaryWare: toggleItem(data.sanitaryWare ?? [], item) })}
            >
              {item}
            </SelectButton>
          ))}
        </div>
      </Field>

      <p className={styles.infoNote}>전면 리모델링 시 방수 공사가 필수 포함됩니다. 대형(2평 이상) 시 약 30% 할증.</p>
    </div>
  );
};

// ─────────── 5. 주방 ───────────
const KitchenSection = ({ data, onChange }: ProcessSectionProps<KitchenDetail>) => {
  return (
    <div className={styles.sectionBody}>
      <Field label="싱크대 형태">
        <div className={styles.buttonRow}>
          {(['ㄱ자(일자)', 'ㄷ자', 'ㄹ자(아일랜드 포함)'] as const).map((opt) => (
            <SelectButton key={opt} selected={data.sinkShape === opt} onClick={() => onChange({ sinkShape: opt })}>
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <p className={styles.infoNote}>ㄱ자 기준으로 산출. ㄷ자 약 40% 추가.</p>
    </div>
  );
};

// ─────────── 섹션 라우팅 맵 ───────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SECTION_MAP: Partial<Record<string, React.ComponentType<ProcessSectionProps<any>>>> = {
  demolition: DemolitionSection,
  wallpaper: WallpaperSection,
  flooring: FlooringSection,
  bathroom: BathroomSection,
  kitchen: KitchenSection,
};

// ─────────── 메인 컴포넌트 ───────────
export const Step4ProcessDetail = () => {
  const { step1, step2, step4, setStep4, nextStep, prevStep } = useEstimateStore();

  const selectedProcesses = ALL_PROCESSES.filter((p) => step2.selectedProcesses.includes(p.id));
  const renderableProcesses = selectedProcesses.filter((p) => SECTION_MAP[p.id]);

  const [openId, setOpenId] = useState<string | null>(renderableProcesses[0]?.id ?? null);

  const contextLabel = step1.area && step1.roomCount ? `${step1.area}평 / 방 ${step1.roomCount} 기준` : null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Step 4 <span className={styles.titleAccent}>공정별 세부사항</span>을 입력해주세요
        </h2>
        <span className={styles.titleHint}>(* 가견적 정확도 목표: ±20% 이내 — 상세 입력 시 정확도가 향상합니다.)</span>
      </div>

      <div className={styles.card}>
        {contextLabel && (
          <div className={styles.contextBar}>
            <span className={styles.contextBarText}>{contextLabel}</span>
          </div>
        )}

        {renderableProcesses.length === 0 ? (
          <div className={styles.sectionBody}>
            <p className={styles.infoNote}>입력할 세부 항목이 없습니다. 다음 단계로 이동해주세요.</p>
          </div>
        ) : (
          <div className={styles.accordionList}>
            {renderableProcesses.map((process) => {
              const isOpen = openId === process.id;
              const SectionComponent = SECTION_MAP[process.id]!;

              return (
                <div key={process.id} className={styles.accordionItem}>
                  <button
                    type="button"
                    className={styles.accordionHeader}
                    onClick={() => setOpenId(isOpen ? null : process.id)}
                  >
                    <span
                      className={`${styles.accordionHeaderText}${isOpen ? ` ${styles.accordionHeaderTextOpen}` : ''}`}
                    >
                      {process.name}
                    </span>
                    <span className={`${styles.accordionChevron}${isOpen ? ` ${styles.accordionChevronOpen}` : ''}`}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M4 6L8 10L12 6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>

                  <div className={`${styles.accordionBody}${isOpen ? ` ${styles.accordionBodyOpen}` : ''}`}>
                    <SectionComponent
                      data={step4[process.id as keyof typeof step4] ?? {}}
                      onChange={(patch) => setStep4(process.id as keyof typeof step4, patch)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <StepActions onNext={nextStep} onSecondary={prevStep} />
      </div>
    </div>
  );
};
