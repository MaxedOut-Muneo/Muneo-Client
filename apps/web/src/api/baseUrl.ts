export const getApiBaseUrl = (): string => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBaseUrl) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not set');
  }
  return apiBaseUrl.replace(/\/$/, '');
};

export const getClientApiBaseUrl = (): string => {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    return window.location.origin;
  }
  return getApiBaseUrl();
};
