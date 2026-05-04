import { vars } from '@muneo/design-system';
import { style } from '@vanilla-extract/css';

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const sectionHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const chevron = style({
  fontSize: '12px',
  color: vars.color.neutral.n700,
});

export const sectionName = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.bold,
  color: vars.color.neutral.n900,
  letterSpacing: '-0.16px',
  lineHeight: 'normal',
  whiteSpace: 'nowrap',
});

export const itemList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const divider = style({
  height: '1px',
  backgroundColor: vars.color.neutral.n200,
  marginTop: '12px',
});
