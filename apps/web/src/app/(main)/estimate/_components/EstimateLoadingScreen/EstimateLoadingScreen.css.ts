import { vars } from '@muneo/design-system';
import { keyframes, style } from '@vanilla-extract/css';

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

const fadeIn = keyframes({
  from: { opacity: 0, transform: 'translateY(8px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
  gap: '24px',
  animation: `${fadeIn} 0.4s ease`,
});

export const spinner = style({
  width: '52px',
  height: '52px',
  borderRadius: '50%',
  border: `4px solid ${vars.color.neutral.n200}`,
  borderTopColor: vars.color.brand.primary,
  animation: `${spin} 0.9s linear infinite`,
});

export const textGroup = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  textAlign: 'center',
});

export const title = style({
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.semiBold,
  color: vars.color.neutral.n900,
});

export const subtitle = style({
  fontSize: vars.typography.fontSize.sm,
  color: vars.color.neutral.n500,
  lineHeight: vars.typography.lineHeight.lg,
});
