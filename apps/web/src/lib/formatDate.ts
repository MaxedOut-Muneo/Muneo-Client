import dayjs from 'dayjs';

export const DATE_FORMATS = {
  dot: 'YYYY.MM.DD',
  dash: 'YYYY-MM-DD',
  dotTime: 'YYYY.MM.DD HH:mm',
  korean: 'YYYY년 MM월 DD일',
} as const satisfies Record<string, string>;

export type DateFormat = keyof typeof DATE_FORMATS;

export const formatDate = (date: dayjs.ConfigType, format: DateFormat = 'dot'): string =>
  dayjs(date).format(DATE_FORMATS[format]);
