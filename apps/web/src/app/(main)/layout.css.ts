import { vars } from '@muneo/design-system';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  minHeight: '100vh',
});

export const main = style({
  marginLeft: vars.layout.sidebarWidth,
  flex: 1,
  minWidth: 0,
  overflowX: 'hidden',
});
