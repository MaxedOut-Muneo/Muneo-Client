import { vars } from '@muneo/design-system';
import { style } from '@vanilla-extract/css';

export const page = style({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f3f4f6',
});

export const card = style({
  position: 'relative',
  backgroundColor: vars.color.white,
  borderRadius: '16px',
  padding: `45px ${vars.space['3xl']}`,
  width: '100%',
  maxWidth: '420px',
});

export const inner = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '27px',
});

export const upper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  width: '100%',
});

export const description = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.sm,
  color: vars.color.neutral.n500,
  textAlign: 'center',
});

export const formSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.md,
  width: '100%',
});

export const fullWidth = style({
  width: '100%',
});
