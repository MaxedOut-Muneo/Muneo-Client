import { type BathroomDetail } from './bathroom';
import { type CarpentryDetail } from './carpentry';
import { type DemolitionDetail } from './demolition';
import { type ElectricalDetail } from './electrical';
import { type FinishingDetail } from './finishing';
import { type FlooringDetail } from './flooring';
import { type KitchenDetail } from './kitchen';
import { type PaintingDetail } from './painting';
import { type PlumbingDetail } from './plumbing';
import { type TileDetail } from './tile';
import { type WallpaperDetail } from './wallpaper';

export * from './bathroom';
export * from './carpentry';
export * from './demolition';
export * from './electrical';
export * from './finishing';
export * from './flooring';
export * from './kitchen';
export * from './painting';
export * from './plumbing';
export * from './tile';
export * from './wallpaper';

export interface ProcessDetailMap {
  demolition: DemolitionDetail;
  plumbing: PlumbingDetail;
  electrical: ElectricalDetail;
  carpentry: CarpentryDetail;
  wallpaper: WallpaperDetail;
  flooring: FlooringDetail;
  tile: TileDetail;
  bathroom: BathroomDetail;
  kitchen: KitchenDetail;
  painting: PaintingDetail;
  finishing: FinishingDetail;
}

export type Step4Data = Partial<ProcessDetailMap>;
