import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '45px',
  flexShrink: 0,
});

export const resetIconWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
});
