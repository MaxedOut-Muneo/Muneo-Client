import { vars } from '@muneo/design-system';
import { style } from '@vanilla-extract/css';

export const modal = style({
  position: 'relative',
  backgroundColor: vars.color.white,
  borderRadius: '16px',
  padding: `45px ${vars.space['3xl']}`,
});

export const closeButton = style({
  position: 'absolute',
  top: '12px',
  right: '12px',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.neutral.n400,
});

export const inner = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  width: '340px',
  maxWidth: '100%',
});

export const upper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '27px',
  width: '100%',
});

export const logoButton = style({
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
});

export const logoSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.space.xs,
});

export const tagline = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.xs,
  color: '#8a7da5',
  letterSpacing: '-0.096px',
  textAlign: 'center',
});

export const formSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: vars.space.sm,
  width: '100%',
});

export const forgotPassword = style({
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  fontFamily: vars.typography.fontFamily,
  fontSize: '13px',
  fontWeight: vars.typography.fontWeight.medium,
  color: vars.color.brand.secondary,
  opacity: 0.9,
  letterSpacing: '-0.104px',
});

export const actionSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '15px',
  width: '100%',
});

export const fullWidth = style({
  width: '100%',
});

export const divider = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.xl,
  width: '100%',
  paddingInline: vars.space.md,
});

export const dividerLine = style({
  flex: 1,
  border: 'none',
  borderTop: `1px solid ${vars.color.neutral.n300}`,
  margin: 0,
});

export const dividerText = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.xs,
  fontWeight: vars.typography.fontWeight.regular,
  color: vars.color.neutral.n400,
  lineHeight: 'normal',
  textAlign: 'center',
  whiteSpace: 'nowrap',
});

export const kakaoButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  backgroundColor: '#FEE500',
  borderRadius: '12px',
  padding: `${vars.space.md} ${vars.space.lg}`,
  border: 'none',
  cursor: 'pointer',
  width: '100%',
  selectors: {
    '&:hover': {
      filter: 'brightness(0.95)',
    },
  },
});

export const kakaoIcon = style({
  position: 'absolute',
  left: vars.space.lg,
});

export const kakaoText = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.base,
  fontWeight: vars.typography.fontWeight.bold,
  color: '#000',
});

export const signupRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '13px',
});

export const signupText = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: '13px',
  fontWeight: vars.typography.fontWeight.medium,
  color: vars.color.neutral.n600,
  opacity: 0.9,
  letterSpacing: '-0.104px',
  whiteSpace: 'nowrap',
});

export const signupDivider = style({
  width: '1px',
  height: '14px',
  backgroundColor: vars.color.neutral.n300,
  flexShrink: 0,
});

export const signupLink = style({
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  fontFamily: vars.typography.fontFamily,
  fontSize: '13px',
  fontWeight: vars.typography.fontWeight.bold,
  color: vars.color.brand.secondary,
  opacity: 0.9,
  letterSpacing: '-0.104px',
  whiteSpace: 'nowrap',
});
