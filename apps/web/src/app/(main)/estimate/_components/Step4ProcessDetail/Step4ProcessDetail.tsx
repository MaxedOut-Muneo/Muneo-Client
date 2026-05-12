'use client';

import { SelectButton } from '@muneo/design-system';
import { type ReactNode, useState } from 'react';
import { useEstimateStore } from '../../_store/estimateStore';
import {
  BASIC_PROCESSES,
  CARPENTRY_EXTRAS,
  DEMOLITION_ITEMS,
  OPTIONAL_PROCESSES,
  PAINTING_AREAS,
  SANITARY_WARES,
  TILE_LOCATIONS,
  WALLPAPER_ROOMS,
  type BathroomDetail,
  type CarpentryDetail,
  type DemolitionDetail,
  type ElectricalDetail,
  type FinishingDetail,
  type FlooringDetail,
  type KitchenDetail,
  type PaintingDetail,
  type PlumbingDetail,
  type TileDetail,
  type WallpaperDetail,
} from '../../_types';
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

// ─────────── 1. 철거 ───────────
interface ProcessSectionProps<T> {
  data: Partial<T>;
  onChange: (patch: Partial<T>) => void;
}

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

      {data.scope === '부분 철거' && (
        <Field label="부분 철거 항목" conditional>
          <div className={styles.buttonRow}>
            {DEMOLITION_ITEMS.map((item) => (
              <SelectButton
                key={item}
                selected={(data.partialItems ?? []).includes(item)}
                onClick={() => onChange({ partialItems: toggleItem(data.partialItems ?? [], item) })}
              >
                {item}
              </SelectButton>
            ))}
          </div>
        </Field>
      )}

      <Field label="폐기물 처리">
        <div className={styles.buttonRow}>
          {(['업체 포함', '별도 처리', '모름'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.wasteDisposal === opt}
              onClick={() => onChange({ wasteDisposal: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>
    </div>
  );
};

// ─────────── 2. 설비 ───────────
const PlumbingSection = ({ data, onChange }: ProcessSectionProps<PlumbingDetail>) => {
  return (
    <div className={styles.sectionBody}>
      <Field label="욕실 방수">
        <div className={styles.buttonRow}>
          {(['필요', '불필요', '모름'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.waterproofNeed === opt}
              onClick={() =>
                onChange(opt === '필요' ? { waterproofNeed: opt } : { waterproofNeed: opt, waterproofCount: undefined })
              }
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      {data.waterproofNeed === '필요' && (
        <Field label="방수 개소" conditional>
          <div className={styles.buttonRow}>
            {(['1개', '2개', '3개 이상'] as const).map((opt) => (
              <SelectButton
                key={opt}
                selected={data.waterproofCount === opt}
                onClick={() => onChange({ waterproofCount: opt })}
              >
                {opt}
              </SelectButton>
            ))}
          </div>
        </Field>
      )}

      <Field label="배관 교체">
        <div className={styles.buttonRow}>
          {(['수도 배관 교체', '난방 배관 이설', '둘 다', '불필요'] as const).map((opt) => (
            <SelectButton key={opt} selected={data.pipingWork === opt} onClick={() => onChange({ pipingWork: opt })}>
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="발코니 확장">
        <div className={styles.buttonRow}>
          {(['있음', '없음'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.balconyExpansion === opt}
              onClick={() =>
                onChange(
                  opt === '있음' ? { balconyExpansion: opt } : { balconyExpansion: opt, balconyCount: undefined }
                )
              }
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      {data.balconyExpansion === '있음' && (
        <Field label="확장 개소" conditional>
          <div className={styles.buttonRow}>
            {(['1개소', '2개소', '3개소 이상'] as const).map((opt) => (
              <SelectButton
                key={opt}
                selected={data.balconyCount === opt}
                onClick={() => onChange({ balconyCount: opt })}
              >
                {opt}
              </SelectButton>
            ))}
          </div>
        </Field>
      )}

      <Field label="보일러 교체">
        <div className={styles.buttonRow}>
          {(['있음', '없음', '모름'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.boilerReplacement === opt}
              onClick={() => onChange({ boilerReplacement: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <p className={styles.infoNote}>
        방수 공사는 욕실 리모델링 시 필수 공정입니다. &apos;모름&apos; 선택 시 포함 기준으로 산출됩니다.
      </p>
    </div>
  );
};

// ─────────── 3. 전기/조명 ───────────
const ElectricalSection = ({ data, onChange }: ProcessSectionProps<ElectricalDetail>) => {
  return (
    <div className={styles.sectionBody}>
      <Field label="조명 교체 범위">
        <div className={styles.buttonRow}>
          {(['전체 교체', '거실+주방만', '방만', '교체 안함'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.lightingScope === opt}
              onClick={() => onChange({ lightingScope: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="조명 타입">
        <div className={styles.buttonRow}>
          {(['LED 매입등', 'LED 직부등', '레일조명', '혼합'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.lightingType === opt}
              onClick={() => onChange({ lightingType: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="콘센트·스위치 교체">
        <div className={styles.buttonRow}>
          {(['전체 교체', '일부 교체', '교체 안함'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.outletSwitch === opt}
              onClick={() => onChange({ outletSwitch: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="콘센트 증설">
        <div className={styles.buttonRow}>
          {(['있음', '없음'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.outletAdd === opt}
              onClick={() =>
                onChange(opt === '있음' ? { outletAdd: opt } : { outletAdd: opt, outletAddCount: undefined })
              }
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      {data.outletAdd === '있음' && (
        <Field label="증설 개수" conditional>
          <div className={styles.numberInput}>
            <input
              type="number"
              min={1}
              max={20}
              className={styles.numberInputField}
              value={data.outletAddCount ?? 5}
              onChange={(e) => onChange({ outletAddCount: Number(e.target.value) || 5 })}
            />
            <span className={styles.numberInputUnit}>개</span>
          </div>
        </Field>
      )}

      <Field label="분전반 교체">
        <div className={styles.buttonRow}>
          {(['있음', '없음', '모름'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.breakerReplacement === opt}
              onClick={() => onChange({ breakerReplacement: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="감지기 교체">
        <div className={styles.buttonRow}>
          {(['있음', '없음'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.detectorReplacement === opt}
              onClick={() => onChange({ detectorReplacement: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <p className={styles.infoNote}>
        전체 리모델링 시 분전반 교체를 권장합니다. 에어컨·인덕션 전용 회로가 필요할 수 있습니다.
      </p>
    </div>
  );
};

// ─────────── 4. 목공 ───────────

const CarpentrySection = ({ data, onChange }: ProcessSectionProps<CarpentryDetail>) => {
  return (
    <div className={styles.sectionBody}>
      <Field label="몰딩 시공">
        <div className={styles.buttonRow}>
          {(['전체', '일부', '없음'] as const).map((opt) => (
            <SelectButton key={opt} selected={data.moldingWork === opt} onClick={() => onChange({ moldingWork: opt })}>
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="걸레받이 시공">
        <div className={styles.buttonRow}>
          {(['전체', '일부', '없음'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.baseboardWork === opt}
              onClick={() => onChange({ baseboardWork: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="도어 교체">
        <div className={styles.buttonRow}>
          {(['0개', '1개', '2개', '3개', '4개', '5개', '6개 이상'] as const).map((opt) => (
            <SelectButton key={opt} selected={data.doorCount === opt} onClick={() => onChange({ doorCount: opt })}>
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="문틀 교체">
        <div className={styles.buttonRow}>
          {(['도어와 함께', '문틀만', '없음'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.doorFrameWork === opt}
              onClick={() => onChange({ doorFrameWork: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="중문 설치">
        <div className={styles.buttonRow}>
          {(['있음', '없음'] as const).map((opt) => (
            <SelectButton key={opt} selected={data.middleDoor === opt} onClick={() => onChange({ middleDoor: opt })}>
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="우물천장 (간접등 박스)">
        <div className={styles.buttonRow}>
          {(['있음', '없음'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.cofferCeiling === opt}
              onClick={() => onChange({ cofferCeiling: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="기타 목공">
        <div className={styles.buttonRow}>
          {CARPENTRY_EXTRAS.map((item) => (
            <SelectButton
              key={item}
              selected={(data.carpentryExtra ?? []).includes(item)}
              onClick={() => {
                const current = data.carpentryExtra ?? [];
                onChange({ carpentryExtra: toggleItem(current, item) });
              }}
            >
              {item}
            </SelectButton>
          ))}
        </div>
      </Field>

      <p className={styles.infoNote}>중문 설치 시 별도 100~200만원 추가. 우물천장은 간접조명 설치 시 필요합니다.</p>
    </div>
  );
};

// ─────────── 5. 도배 ───────────

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
      </Field>

      <Field label="곰팡이·벽면 보수">
        <div className={styles.buttonRow}>
          {(['필요', '불필요', '모름'] as const).map((opt) => (
            <SelectButton key={opt} selected={data.moldRepair === opt} onClick={() => onChange({ moldRepair: opt })}>
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <p className={styles.infoNote}>
        실크벽지 기준으로 산출됩니다. 합지 선택 시 약 35% 저렴, 천연벽지는 약 40% 비쌉니다.
      </p>
    </div>
  );
};

// ─────────── 6. 바닥 ───────────
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

      <Field label="걸레받이 교체">
        <div className={styles.buttonRow}>
          {(['포함', '미포함'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.baseboardIncluded === opt}
              onClick={() => onChange({ baseboardIncluded: opt })}
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
      </Field>

      <Field label="바닥 평탄화(샌딩)">
        <div className={styles.buttonRow}>
          {(['필요', '불필요', '모름'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.floorSanding === opt}
              onClick={() => onChange({ floorSanding: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="시공 패턴">
        <div className={styles.buttonRow}>
          {(['일반', '헤링본'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.floorPattern === opt}
              onClick={() => onChange({ floorPattern: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <p className={styles.infoNote}>
        강마루 기준 산출. 강화마루 약 25% 저렴, 원목마루 약 2배. 헤링본 패턴은 시공비 25% 할증.
      </p>
    </div>
  );
};

// ─────────── 7. 타일 ───────────
const TileSection = ({ data, onChange }: ProcessSectionProps<TileDetail>) => {
  return (
    <div className={styles.sectionBody}>
      <p className={styles.infoNote}>
        욕실 타일은 &apos;욕실&apos; 탭에서 별도로 산출됩니다. 여기는 욕실 외 공간의 타일만 선택하세요.
      </p>

      <Field label="시공 위치">
        <div className={styles.buttonRow}>
          {TILE_LOCATIONS.map((loc) => (
            <SelectButton
              key={loc}
              selected={(data.tileLocations ?? []).includes(loc)}
              onClick={() => onChange({ tileLocations: toggleItem(data.tileLocations ?? [], loc) })}
            >
              {loc}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="타일 규격">
        <div className={styles.buttonRow}>
          {(['소형(200각 이하)', '중형(300~400각)', '대형(600각 이상)'] as const).map((opt) => (
            <SelectButton key={opt} selected={data.tileSize === opt} onClick={() => onChange({ tileSize: opt })}>
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="타일 등급">
        <div className={styles.buttonRow}>
          {(['일반', '중급', '고급(수입)'] as const).map((opt) => (
            <SelectButton key={opt} selected={data.tileGrade === opt} onClick={() => onChange({ tileGrade: opt })}>
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>
    </div>
  );
};

// ─────────── 8. 욕실 ───────────

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

      <Field label="시공 범위">
        <div className={styles.buttonRow}>
          {(['전면 리모델링', '부분 교체'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.bathroomScope === opt}
              onClick={() => onChange({ bathroomScope: opt })}
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

      <Field label="타일 규격">
        <div className={styles.buttonRow}>
          {(['300각', '600각', '대형(800각 이상)'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.bathroomTileSize === opt}
              onClick={() => onChange({ bathroomTileSize: opt })}
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

      <Field label="수전 교체">
        <div className={styles.buttonRow}>
          {(['전체 교체', '일부 교체', '교체 안함'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.faucetReplacement === opt}
              onClick={() => onChange({ faucetReplacement: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="천장재 교체">
        <div className={styles.buttonRow}>
          {(['있음', '없음'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.ceilingReplacement === opt}
              onClick={() => onChange({ ceilingReplacement: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="환풍기 교체">
        <div className={styles.buttonRow}>
          {(['있음', '없음'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.ventilationFan === opt}
              onClick={() => onChange({ ventilationFan: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="액세서리 (휴지걸이/수건걸이/선반 등)">
        <div className={styles.buttonRow}>
          {(['포함', '미포함'] as const).map((opt) => (
            <SelectButton key={opt} selected={data.accessory === opt} onClick={() => onChange({ accessory: opt })}>
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <p className={styles.infoNote}>전면 리모델링 시 방수 공사가 필수 포함됩니다. 대형(2평 이상) 시 약 30% 할증.</p>
    </div>
  );
};

// ─────────── 9. 주방 ───────────
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

      <Field label="싱크대 제작 방식">
        <div className={styles.buttonRow}>
          {(['사제(일반)', '브랜드(한샘/리바트 등)'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.sinkManufacture === opt}
              onClick={() => onChange({ sinkManufacture: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="상부장">
        <div className={styles.buttonRow}>
          {(['교체', '유지', '없음'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.upperCabinet === opt}
              onClick={() => onChange({ upperCabinet: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="하부장">
        <div className={styles.buttonRow}>
          {(['교체', '유지'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.lowerCabinet === opt}
              onClick={() => onChange({ lowerCabinet: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="상판 재질">
        <div className={styles.buttonRow}>
          {(['인조대리석', '엔지니어드스톤', '천연석'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.countertopMaterial === opt}
              onClick={() => onChange({ countertopMaterial: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="주방 타일 교체">
        <div className={styles.buttonRow}>
          {(['있음', '없음'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.kitchenTileReplacement === opt}
              onClick={() => onChange({ kitchenTileReplacement: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="후드 교체">
        <div className={styles.buttonRow}>
          {(['있음', '없음'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.hoodReplacement === opt}
              onClick={() => onChange({ hoodReplacement: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="수전 교체">
        <div className={styles.buttonRow}>
          {(['있음', '없음'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.kitchenFaucet === opt}
              onClick={() => onChange({ kitchenFaucet: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <p className={styles.infoNote}>
        ㄱ자 기준으로 산출. ㄷ자 약 40% 추가. 브랜드 제품은 사제 대비 2~3배 차이가 날 수 있습니다.
      </p>
    </div>
  );
};

// ─────────── 10. 도장 ───────────

const PaintingSection = ({ data, onChange }: ProcessSectionProps<PaintingDetail>) => {
  return (
    <div className={styles.sectionBody}>
      <Field label="시공 범위">
        <div className={styles.buttonRow}>
          {PAINTING_AREAS.map((area) => (
            <SelectButton
              key={area}
              selected={(data.paintingAreas ?? []).includes(area)}
              onClick={() => onChange({ paintingAreas: toggleItem(data.paintingAreas ?? [], area) })}
            >
              {area}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="도장 종류">
        <div className={styles.buttonRow}>
          {(['탄성코트', '세라믹코트', '수성 페인트', '친환경 페인트'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.paintingType === opt}
              onClick={() => onChange({ paintingType: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <p className={styles.infoNote}>발코니 확장 시 도장 면적이 줄어들어 비용이 절감될 수 있습니다.</p>
    </div>
  );
};

// ─────────── 11. 마감/공과잡비 ───────────
const FinishingSection = ({ data, onChange }: ProcessSectionProps<FinishingDetail>) => {
  return (
    <div className={styles.sectionBody}>
      <Field label="현장 보양">
        <div className={styles.buttonRow}>
          {(['필요', '불필요'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.siteProtection === opt}
              onClick={() => onChange({ siteProtection: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="엘리베이터 보양">
        <div className={styles.buttonRow}>
          {(['필요', '불필요', '해당없음'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.elevatorProtection === opt}
              onClick={() => onChange({ elevatorProtection: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="입주 청소">
        <div className={styles.buttonRow}>
          {(['포함', '미포함'] as const).map((opt) => (
            <SelectButton key={opt} selected={data.movingClean === opt} onClick={() => onChange({ movingClean: opt })}>
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="폐기물 처리">
        <div className={styles.buttonRow}>
          {(['포함', '별도', '모름'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.finishingWaste === opt}
              onClick={() => onChange({ finishingWaste: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <Field label="실리콘 마감">
        <div className={styles.buttonRow}>
          {(['포함', '미포함'] as const).map((opt) => (
            <SelectButton
              key={opt}
              selected={data.siliconFinish === opt}
              onClick={() => onChange({ siliconFinish: opt })}
            >
              {opt}
            </SelectButton>
          ))}
        </div>
      </Field>

      <p className={styles.infoNote}>아파트의 경우 관리사무소 EV 사용료가 별도 발생할 수 있습니다.</p>
    </div>
  );
};

// ─────────── 섹션 라우팅 맵 ───────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SECTION_MAP: Record<string, React.ComponentType<ProcessSectionProps<any>>> = {
  demolition: DemolitionSection,
  plumbing: PlumbingSection,
  electrical: ElectricalSection,
  carpentry: CarpentrySection,
  wallpaper: WallpaperSection,
  flooring: FlooringSection,
  tile: TileSection,
  bathroom: BathroomSection,
  kitchen: KitchenSection,
  painting: PaintingSection,
  finishing: FinishingSection,
};

// ─────────── 메인 컴포넌트 ───────────
export const Step4ProcessDetail = () => {
  const { step1, step2, step4, setStep4, nextStep, prevStep } = useEstimateStore();

  const selectedProcesses = ALL_PROCESSES.filter((p) => step2.selectedProcesses.includes(p.id));

  const [openId, setOpenId] = useState<string | null>(selectedProcesses[0]?.id ?? null);

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

        <div className={styles.accordionList}>
          {selectedProcesses.map((process) => {
            const isOpen = openId === process.id;
            const SectionComponent = SECTION_MAP[process.id];

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
                  {SectionComponent ? (
                    <SectionComponent
                      data={step4[process.id as keyof typeof step4] ?? {}}
                      onChange={(patch) => setStep4(process.id as keyof typeof step4, patch)}
                    />
                  ) : (
                    <div className={styles.sectionBody}>
                      <p className={styles.infoNote}>해당 공정의 세부 입력은 준비 중입니다.</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <StepActions onNext={nextStep} onSecondary={prevStep} />
      </div>
    </div>
  );
};
