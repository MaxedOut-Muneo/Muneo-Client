import { vars } from '@muneo/design-system';
import { style } from '@vanilla-extract/css';

export const page = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.xl,
  maxWidth: '1200px',
  margin: '0 auto',
});

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.xs,
});

export const title = style({
  fontFamily: vars.typography.fontFamilyDisplay,
  fontSize: vars.typography.fontSize.xl,
  fontWeight: vars.typography.fontWeight.bold,
  color: vars.color.neutral.n900,
  margin: 0,
});

export const subtitle = style({
  fontSize: vars.typography.fontSize.sm,
  color: vars.color.neutral.n500,
});

export const errorBox = style({
  padding: vars.space.lg,
  backgroundColor: vars.color.semantic.dangerBg,
  color: vars.color.semantic.danger,
  borderRadius: vars.radius.sm,
  fontSize: vars.typography.fontSize.sm,
});
