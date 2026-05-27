import { type CtaEvent } from '@/constants/analyticsEvents';

export type DataLayerPrimitive = string | number | boolean | null | undefined;

interface DataLayerEntry extends Record<string, DataLayerPrimitive> {
  event: string;
}

type WindowWithDataLayer = Window & { dataLayer?: DataLayerEntry[] };

const getDataLayer = (): DataLayerEntry[] | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  const dataLayer = (window as WindowWithDataLayer).dataLayer;
  return Array.isArray(dataLayer) ? dataLayer : null;
};

const normalize = (value: unknown): DataLayerPrimitive => {
  if (value === null || value === undefined) {
    return undefined;
  }
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return value;
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  try {
    return JSON.stringify(value);
  } catch {
    return undefined;
  }
};

export const trackEvent = <E extends string>(event: E, params?: Record<string, unknown>): void => {
  const dataLayer = getDataLayer();
  if (!dataLayer) {
    return;
  }
  const entry: DataLayerEntry = { event };
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (key === 'event') {
        continue;
      }
      const normalized = normalize(value);
      if (normalized !== undefined) {
        entry[key] = normalized;
      }
    }
  }
  dataLayer.push(entry);
};

export interface CtaParams {
  linkText?: string;
  linkUrl?: string;
  position?: 'header' | 'hero' | 'footer' | 'floating' | string;
  componentId?: string;
  value?: number;
}

export const trackCtaClick = (event: CtaEvent, params?: CtaParams): void => {
  trackEvent(event, {
    link_text: params?.linkText,
    link_url: params?.linkUrl,
    position: params?.position,
    component_id: params?.componentId,
    value: params?.value,
  });
};
