export const PAINTING_AREAS = ['전면 발코니', '후면 발코니', '다용도실', '벽면 페인트', '천정'] as const;
export type PaintingArea = (typeof PAINTING_AREAS)[number];

export const PAINTING_TYPES = ['탄성코트', '세라믹코트', '수성 페인트', '친환경 페인트'] as const;
export type PaintingType = (typeof PAINTING_TYPES)[number];

export interface PaintingDetail {
  paintingAreas: PaintingArea[];
  paintingType: PaintingType | null;
}
