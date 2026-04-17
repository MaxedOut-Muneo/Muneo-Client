import { createTheme } from '@vanilla-extract/css';
import { vars } from './tokens.css';

export const lightTheme = createTheme(vars, {
  color: {
    white: '#FFFFFF',
    black: '#111827',
    brand: {
      primary: '#453EEF',
      primaryLight: '#9B86FF',
      primaryBg: '#EEF0FF',
    },
    semantic: {
      success: '#10B981',
      successBg: '#ECFDF5',
      danger: '#EF4444',
      dangerBg: '#FEF2F2',
      warning: '#F59E0B',
      warningBg: '#FFF7ED',
      info: '#3B82F6',
      infoBg: '#EFF6FF',
    },
    neutral: {
      n900: '#111827',
      n700: '#374151',
      n500: '#6B7280',
      n400: '#9CA3AF',
      n300: '#D1D5DB',
      n200: '#E5E7EB',
      n100: '#F3F4F6',
      nSurface: '#F8F9FC',
    },
  },
  typography: {
    fontFamily:
      "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif",
    fontSize: {
      xxs: '0.5rem',
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '1.75rem',
      '3xl': '2.5rem',
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semiBold: '600',
      bold: '700',
    },
    lineHeight: {
      sm: '1rem',
      md: '1.25rem',
      lg: '1.5rem',
      xl: '1.75rem',
    },
    letterSpacing: '0',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '40px',
  },
  radius: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '40px',
  },
});
