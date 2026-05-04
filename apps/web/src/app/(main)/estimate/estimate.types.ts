export type Region = '서울' | '수도권' | '지방';
export type SpaceType = '아파트' | '빌라' | '오피스텔' | '단독 주택';
export type RoomCount = '1개' | '2개' | '3개' | '4개 이상';
export type ProcessMode = 'full' | 'partial';
export type BuildingAge = '신축(3년 이하)' | '10년 이하' | '10~20년 이하' | '20년 이상';
export type Elevator = '있음' | '없음';
export type Occupancy = '거주 중' | '공실';
export type TruckAccess = '가능' | '불가(골목/지하)' | '모름';
export type ConstructionTiming = '1개월 이내' | '1~3개월' | '3개월 이후' | '미정';

export interface ProcessInfo {
  id: string;
  name: string;
  description: string;
}

export const BASIC_PROCESSES: ProcessInfo[] = [
  { id: 'demolition', name: '철거', description: '기존 자재/가구 해체\n및 폐기' },
  { id: 'plumbing', name: '설비', description: '배관, 방수, 확장 난방 배관 이설' },
  { id: 'electrical', name: '전기/조명', description: '콘센트 스위치 교체\n조명설치, 배선 증설' },
  { id: 'carpentry', name: '목공', description: '몰딩, 걸레받이\n문/문틀 교체, 천장' },
  { id: 'wallpaper', name: '도배', description: '벽면/천장 벽지 시공\n(실크/합지/천연)' },
  { id: 'flooring', name: '바닥', description: '강마루, 강화마루\n장판 들 바닥재' },
  { id: 'tile', name: '타일', description: '현관, 주방 벽면\n베란다 타일 (욕실 제외)' },
  { id: 'bathroom', name: '욕실', description: '타일, 도기, 수전\n방수, 천장 환풍기' },
  { id: 'kitchen', name: '주방', description: '싱크대, 상판\n후드, 수전' },
  { id: 'painting', name: '도장', description: '베란다 탄성코드\n세라믹/페인트' },
  { id: 'finishing', name: '마감/공과잡비', description: '보양, EV, 입주청소\n폐기물, 현장관리' },
];

export const OPTIONAL_PROCESSES: ProcessInfo[] = [
  { id: 'sash', name: '샷시', description: '샷시(창문) 교체\n현관 중문 설치' },
  { id: 'film', name: '필름', description: '문틀, 샤시 래핑\n가구 표면 필름' },
  { id: 'furniture', name: '가구', description: '붙박이장, 신발장\n냉장고장 맞춤 제작' },
];

export interface Step1Data {
  region: Region | null;
  spaceType: SpaceType | null;
  area: number | null;
  roomCount: RoomCount | null;
}

export interface Step2Data {
  mode: ProcessMode;
  selectedProcesses: string[];
}

export interface Step3Data {
  buildingAge: BuildingAge | null;
  elevator: Elevator | null;
  floor: number | null;
  occupancy: Occupancy | null;
  truckAccess: TruckAccess | null;
  constructionTiming: ConstructionTiming | null;
}

// ─────────── Step4 공정별 Detail 타입 ───────────

export type DemolitionScope = '전체 철거' | '부분 철거';
export type DemolitionItem =
  | '몰딩·걸레받이'
  | '도어·문틀'
  | '마루·장판'
  | '욕실 타일'
  | '주방'
  | '천정'
  | '벽체·조적'
  | '붙박이장·가구';
export type WasteDisposal = '업체 포함' | '별도 처리' | '모름';

export interface DemolitionDetail {
  scope: DemolitionScope | null;
  partialItems: DemolitionItem[];
  wasteDisposal: WasteDisposal | null;
}

export type WaterproofNeed = '필요' | '불필요' | '모름';
export type WaterproofCount = '1개' | '2개' | '3개 이상';
export type PipingWork = '수도 배관 교체' | '난방 배관 이설' | '둘 다' | '불필요';
export type BalconyExpansion = '있음' | '없음';
export type BalconyCount = '1개소' | '2개소' | '3개소 이상';
export type BoilerReplacement = '있음' | '없음' | '모름';

export interface PlumbingDetail {
  waterproofNeed: WaterproofNeed | null;
  waterproofCount: WaterproofCount | null;
  pipingWork: PipingWork | null;
  balconyExpansion: BalconyExpansion | null;
  balconyCount: BalconyCount | null;
  boilerReplacement: BoilerReplacement | null;
}

export type LightingScope = '전체 교체' | '거실+주방만' | '방만' | '교체 안함';
export type LightingType = 'LED 매입등' | 'LED 직부등' | '레일조명' | '혼합';
export type OutletSwitch = '전체 교체' | '일부 교체' | '교체 안함';
export type OutletAdd = '있음' | '없음';
export type BreakerReplacement = '있음' | '없음' | '모름';
export type DetectorReplacement = '있음' | '없음';

export interface ElectricalDetail {
  lightingScope: LightingScope | null;
  lightingType: LightingType | null;
  outletSwitch: OutletSwitch | null;
  outletAdd: OutletAdd | null;
  outletAddCount: number;
  breakerReplacement: BreakerReplacement | null;
  detectorReplacement: DetectorReplacement | null;
}

export type MoldingWork = '전체' | '일부' | '없음';
export type BaseboardWork = '전체' | '일부' | '없음';
export type DoorCount = '0개' | '1개' | '2개' | '3개' | '4개' | '5개' | '6개 이상';
export type DoorFrameWork = '도어와 함께' | '문틀만' | '없음';
export type MiddleDoor = '있음' | '없음';
export type CofferCeiling = '있음' | '없음';
export type CarpentryExtra = '가벽 신설' | '웨인스코팅' | '아치문' | '아트월' | '천장 보강(실링팬)' | '없음';

export interface CarpentryDetail {
  moldingWork: MoldingWork | null;
  baseboardWork: BaseboardWork | null;
  doorCount: DoorCount | null;
  doorFrameWork: DoorFrameWork | null;
  middleDoor: MiddleDoor | null;
  cofferCeiling: CofferCeiling | null;
  carpentryExtra: CarpentryExtra[];
}

export type WallpaperType = '실크벽지' | '합지벽지' | '천연벽지';
export type WallpaperScope = '전체(벽면+천장)' | '벽면만' | '부분 도배';
export type WallpaperRoom = '거실' | '주방' | '침실1' | '침실2' | '침실3' | '현관';
export type UnderpaperWork = '포함' | '미포함' | '모름';
export type MoldRepair = '필요' | '불필요' | '모름';

export interface WallpaperDetail {
  wallpaperType: WallpaperType | null;
  wallpaperScope: WallpaperScope | null;
  partialRooms: WallpaperRoom[];
  underpaperWork: UnderpaperWork | null;
  moldRepair: MoldRepair | null;
}

export type FloorMaterial = '강마루' | '강화마루' | '원목마루' | '장판' | '데코타일';
export type FlooringScope = '전체' | '거실+방만' | '방만';
export type BaseboardIncluded = '포함' | '미포함';
export type FloorDemolition = '필요' | '불필요' | '모름';
export type FloorSanding = '필요' | '불필요' | '모름';
export type FloorPattern = '일반' | '헤링본';

export interface FlooringDetail {
  floorMaterial: FloorMaterial | null;
  flooringScope: FlooringScope | null;
  baseboardIncluded: BaseboardIncluded | null;
  floorDemolition: FloorDemolition | null;
  floorSanding: FloorSanding | null;
  floorPattern: FloorPattern | null;
}

export type TileLocation = '현관 바닥' | '주방 벽면(백스플래시)' | '발코니 바닥' | '발코니 벽면' | '거실 바닥';
export type TileSize = '소형(200각 이하)' | '중형(300~400각)' | '대형(600각 이상)';
export type TileGrade = '일반' | '중급' | '고급(수입)';

export interface TileDetail {
  tileLocations: TileLocation[];
  tileSize: TileSize | null;
  tileGrade: TileGrade | null;
}

export type BathroomCount = '1개' | '2개' | '3개 이상';
export type BathroomSize = '소형(1평 미만)' | '중형(1~2평)' | '대형(2평 이상)';
export type BathroomScope = '전면 리모델링' | '부분 교체';
export type BathroomTileGrade = '일반' | '중급' | '고급(수입)';
export type BathroomTileSize = '300각' | '600각' | '대형(800각 이상)';
export type SanitaryWare = '양변기' | '세면대' | '욕조' | '샤워부스';
export type FaucetReplacement = '전체 교체' | '일부 교체' | '교체 안함';
export type CeilingReplacement = '있음' | '없음';
export type VentilationFan = '있음' | '없음';
export type BathroomAccessory = '포함' | '미포함';

export interface BathroomDetail {
  bathroomCount: BathroomCount | null;
  bathroomSize: BathroomSize | null;
  bathroomScope: BathroomScope | null;
  bathroomTileGrade: BathroomTileGrade | null;
  bathroomTileSize: BathroomTileSize | null;
  sanitaryWare: SanitaryWare[];
  faucetReplacement: FaucetReplacement | null;
  ceilingReplacement: CeilingReplacement | null;
  ventilationFan: VentilationFan | null;
  accessory: BathroomAccessory | null;
}

export type SinkShape = 'ㄱ자(일자)' | 'ㄷ자' | 'ㄹ자(아일랜드 포함)';
export type SinkManufacture = '사제(일반)' | '브랜드(한샘/리바트 등)';
export type UpperCabinet = '교체' | '유지' | '없음';
export type LowerCabinet = '교체' | '유지';
export type CountertopMaterial = '인조대리석' | '엔지니어드스톤' | '천연석';
export type KitchenTileReplacement = '있음' | '없음';
export type HoodReplacement = '있음' | '없음';
export type KitchenFaucet = '있음' | '없음';

export interface KitchenDetail {
  sinkShape: SinkShape | null;
  sinkManufacture: SinkManufacture | null;
  upperCabinet: UpperCabinet | null;
  lowerCabinet: LowerCabinet | null;
  countertopMaterial: CountertopMaterial | null;
  kitchenTileReplacement: KitchenTileReplacement | null;
  hoodReplacement: HoodReplacement | null;
  kitchenFaucet: KitchenFaucet | null;
}

export type PaintingArea = '전면 발코니' | '후면 발코니' | '다용도실' | '벽면 페인트' | '천정';
export type PaintingType = '탄성코트' | '세라믹코트' | '수성 페인트' | '친환경 페인트';

export interface PaintingDetail {
  paintingAreas: PaintingArea[];
  paintingType: PaintingType | null;
}

export type SiteProtection = '필요' | '불필요';
export type ElevatorProtection = '필요' | '불필요' | '해당없음';
export type MovingClean = '포함' | '미포함';
export type FinishingWaste = '포함' | '별도' | '모름';
export type SiliconFinish = '포함' | '미포함';

export interface FinishingDetail {
  siteProtection: SiteProtection | null;
  elevatorProtection: ElevatorProtection | null;
  movingClean: MovingClean | null;
  finishingWaste: FinishingWaste | null;
  siliconFinish: SiliconFinish | null;
}

export interface Step4Data {
  demolition?: DemolitionDetail;
  plumbing?: PlumbingDetail;
  electrical?: ElectricalDetail;
  carpentry?: CarpentryDetail;
  wallpaper?: WallpaperDetail;
  flooring?: FlooringDetail;
  tile?: TileDetail;
  bathroom?: BathroomDetail;
  kitchen?: KitchenDetail;
  painting?: PaintingDetail;
  finishing?: FinishingDetail;
}

export const STEP_LABELS: Record<number, string> = {
  1: '기본 정보',
  2: '공정 선택',
  3: '공사 조건',
  4: '공정별 세부',
  5: '견적 확인',
};
