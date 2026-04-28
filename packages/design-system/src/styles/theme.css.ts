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
      secondary: '#8455DF',
      secondaryBg: '#F0EBFD',
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
      n600: '#4B5563',
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
      "var(--font-pretendard, 'Pretendard Variable'), Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif",
    fontFamilyDisplay: "var(--font-paperlogy, 'Paperlogy'), sans-serif",
    fontSize: {
      xxs: '10px',
      xs: '12px',
      sm: '14px',
      base: '15px',
      md: '16px',
      lg: '20px',
      xl: '24px',
      '2xl': '28px',
      '3xl': '32px',
      '4xl': '40px',
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semiBold: '600',
      bold: '700',
      extraBold: '800',
    },
    lineHeight: {
      sm: '16px',
      md: '20px',
      lg: '24px',
      xl: '28px',
      '2xl': '36px',
      '3xl': '48px',
    },
    letterSpacing: {
      sm: '-0.16px',
      md: '0px',
      lg: '0.16px',
    },
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
    base: '10px',
    md: '16px',
    lg: '24px',
    xl: '40px',
  },
  layout: {
    sidebarWidth: '224px',
  },
});
