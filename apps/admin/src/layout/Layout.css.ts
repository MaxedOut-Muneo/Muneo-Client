import { vars } from '@muneo/design-system';
import { style } from '@vanilla-extract/css';

export const shell = style({
  display: 'flex',
  height: '100vh',
  overflow: 'hidden',
  backgroundColor: vars.color.neutral.nSurface,
});

export const main = style({
  flex: 1,
  padding: vars.space['3xl'],
  minWidth: 0,
  overflowY: 'auto',
});
