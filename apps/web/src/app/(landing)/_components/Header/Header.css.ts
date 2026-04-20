import { vars } from '@muneo/design-system';
import { keyframes, style } from '@vanilla-extract/css';

const slideDown = keyframes({
  from: { transform: 'translateY(-100%)' },
  to: { transform: 'translateY(0)' },
});

export const header = style({
  animation: `${slideDown} 0.4s cubic-bezier(0, 0, 0.2, 1) both`,
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  backgroundColor: vars.color.white,
  height: '72px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease',
  paddingRight: 'var(--scrollbar-width, 0px)',
});

export const headerScrolled = style({
  backgroundColor: 'rgba(255, 255, 255, 0.82)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  boxShadow: '0 1px 0 rgba(0, 0, 0, 0.06)',
});

export const inner = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1440px',
  padding: `0 ${vars.space['3xl']}`,
});

export const logoSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  flexShrink: 0,
});

export const logoLink = style({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
});

export const tagline = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.xs,
  fontWeight: vars.typography.fontWeight.regular,
  color: '#8A7DA5',
  letterSpacing: '-0.08px',
  whiteSpace: 'nowrap',
  flexShrink: 0,
});

export const nav = style({
  display: 'flex',
  alignItems: 'center',
  flex: '1 0 0',
  justifyContent: 'center',
});

export const navList = style({
  display: 'flex',
  alignItems: 'center',
  gap: '53px',
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

export const navLink = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: '15px',
  fontWeight: vars.typography.fontWeight.regular,
  color: vars.color.neutral.n500,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  selectors: {
    '&:hover': {
      color: vars.color.neutral.n700,
    },
  },
});

export const ctaButton = style({
  flexShrink: 0,
  minWidth: '100px',
});
