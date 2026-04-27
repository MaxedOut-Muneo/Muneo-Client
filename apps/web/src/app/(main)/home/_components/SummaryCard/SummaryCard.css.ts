import { vars } from '@muneo/design-system';
import { style } from '@vanilla-extract/css';

export const card = style({
  flex: '1 0 0',
  backgroundColor: vars.color.white,
  borderRadius: '20px',
  boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.12)',
  padding: '28px 14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minWidth: 0,
});

export const left = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const label = style({
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.medium,
  color: '#59606e',
  letterSpacing: '-0.07px',
  whiteSpace: 'nowrap',
});

export const right = style({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
});

export const count = style({
  fontSize: '24px',
  fontWeight: vars.typography.fontWeight.extraBold,
  letterSpacing: '-0.24px',
  whiteSpace: 'nowrap',
  backgroundImage: 'linear-gradient(127deg, #9b6bf6 10%, #5c4092 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
});

export const countDanger = style({
  fontSize: '24px',
  fontWeight: vars.typography.fontWeight.extraBold,
  letterSpacing: '-0.24px',
  whiteSpace: 'nowrap',
  color: vars.color.semantic.danger,
});

export const arrow = style({
  display: 'flex',
  alignItems: 'center',
  color: vars.color.neutral.n400,
});
