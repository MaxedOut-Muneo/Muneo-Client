export const FILM_AREAS = ['도어(방문)', '문틀·문선', '샷시 프레임', '몰딩', '현관문', '가구(붙박이장 등)'] as const;
export type FilmArea = (typeof FILM_AREAS)[number];

export const FILM_GRADES = ['일반', '중급(우드톤)', '고급(인테리어 필름)'] as const;
export type FilmGrade = (typeof FILM_GRADES)[number];

export const FRONT_DOOR_FILMS = ['내부만', '내부+외부'] as const;
export type FrontDoorFilm = (typeof FRONT_DOOR_FILMS)[number];

export interface FilmDetail {
  filmAreas: FilmArea[];
  doorCount: number;
  filmGrade: FilmGrade | null;
  frontDoorFilm: FrontDoorFilm | null;
}
