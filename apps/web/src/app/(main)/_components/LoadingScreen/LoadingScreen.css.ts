import { vars } from '@muneo/design-system';
import { keyframes, style } from '@vanilla-extract/css';

const float = keyframes({
  '0%, 100%': { transform: 'translateY(0px)' },
  '50%': { transform: 'translateY(-10px)' },
});

const msgIn = keyframes({
  from: { opacity: 0, transform: 'translateY(8px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const msgOut = keyframes({
  from: { opacity: 1, transform: 'translateY(0)' },
  to: { opacity: 0, transform: 'translateY(-6px)' },
});

const cardIn = keyframes({
  from: { opacity: 0, transform: 'translateX(20px)' },
  to: { opacity: 1, transform: 'translateX(0)' },
});

const cardOut = keyframes({
  from: { opacity: 1, transform: 'translateX(0)' },
  to: { opacity: 0, transform: 'translateX(-20px)' },
});

const MOTION = '(prefers-reduced-motion: reduce)' as const;

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
  padding: '40px 24px',
});

export const mascotWrap = style({
  animation: `${float} 2.4s ease-in-out infinite`,
  marginBottom: '24px',
  '@media': { [MOTION]: { animation: 'none' } },
});

export const mascotImg = style({
  width: '108px',
  height: 'auto',
  display: 'block',
});

export const msgWrap = style({
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '16px',
});

export const msg = style({
  fontSize: vars.typography.fontSize.sm,
  color: vars.color.neutral.n600,
  textAlign: 'center',
  fontWeight: vars.typography.fontWeight.medium,
  animation: `${msgIn} 0.35s ease-out both`,
  '@media': { [MOTION]: { animation: 'none' } },
});

export const msgExiting = style({
  animation: `${msgOut} 0.25s ease-in both`,
  '@media': { [MOTION]: { animation: 'none' } },
});

export const progressWrap = style({
  width: '280px',
  height: '4px',
  borderRadius: '2px',
  backgroundColor: vars.color.neutral.n200,
  overflow: 'hidden',
  marginBottom: '32px',
});

export const progressFill = style({
  height: '100%',
  borderRadius: '2px',
  background: 'linear-gradient(90deg, #453EEF 0%, #9B86FF 100%)',
  width: '0%',
  willChange: 'width',
});

export const tipCard = style({
  width: '280px',
  minHeight: '60px',
  backgroundColor: vars.color.neutral.n100,
  borderRadius: '12px',
  padding: '14px 16px',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
  marginBottom: '10px',
  animation: `${cardIn} 0.4s ease-out both`,
  '@media': { [MOTION]: { animation: 'none' } },
});

export const tipCardExiting = style({
  animation: `${cardOut} 0.3s ease-in both`,
  '@media': { [MOTION]: { animation: 'none' } },
});

export const tipIcon = style({
  fontSize: '16px',
  flexShrink: 0,
  lineHeight: '22px',
});

export const tipText = style({
  fontSize: vars.typography.fontSize.xs,
  color: vars.color.neutral.n600,
  lineHeight: vars.typography.lineHeight.lg,
});

export const dots = style({
  display: 'flex',
  gap: '5px',
  marginBottom: '28px',
});

export const dot = style({
  width: '5px',
  height: '5px',
  borderRadius: '50%',
  backgroundColor: vars.color.neutral.n300,
  transition: 'background-color 0.3s ease',
});

export const dotActive = style({
  backgroundColor: vars.color.brand.primary,
});

export const footer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
});

export const footerText = style({
  fontSize: vars.typography.fontSize.xs,
  color: vars.color.neutral.n400,
});

export const cancelBtn = style({
  background: 'none',
  border: `1px solid ${vars.color.neutral.n300}`,
  borderRadius: vars.radius.sm,
  padding: '8px 20px',
  fontSize: vars.typography.fontSize.sm,
  color: vars.color.neutral.n500,
  cursor: 'pointer',
  fontFamily: vars.typography.fontFamily,
  transition: 'opacity 0.15s ease',
  selectors: {
    '&:hover': { opacity: 0.65 },
  },
});
