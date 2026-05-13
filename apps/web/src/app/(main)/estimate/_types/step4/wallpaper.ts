export const WALLPAPER_TYPES = ['실크벽지', '합지벽지', '천연벽지'] as const;
export type WallpaperType = (typeof WALLPAPER_TYPES)[number];

export const WALLPAPER_SCOPES = ['전체(벽면+천장)', '벽면만', '부분 도배'] as const;
export type WallpaperScope = (typeof WALLPAPER_SCOPES)[number];

export const WALLPAPER_ROOMS = ['거실', '주방', '침실1', '침실2', '침실3', '현관'] as const;
export type WallpaperRoom = (typeof WALLPAPER_ROOMS)[number];

export const UNDERPAPER_WORKS = ['포함', '미포함', '모름'] as const;
export type UnderpaperWork = (typeof UNDERPAPER_WORKS)[number];

export const MOLD_REPAIRS = ['필요', '불필요', '모름'] as const;
export type MoldRepair = (typeof MOLD_REPAIRS)[number];

export interface WallpaperDetail {
  wallpaperType: WallpaperType | null;
  wallpaperScope: WallpaperScope | null;
  partialRooms: WallpaperRoom[];
  underpaperWork: UnderpaperWork | null;
  moldRepair: MoldRepair | null;
}
