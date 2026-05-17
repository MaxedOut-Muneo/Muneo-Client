import { vars } from '@muneo/design-system';
import { style } from '@vanilla-extract/css';

export const card = style({
  backgroundColor: vars.color.white,
  borderRadius: '12px',
  boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.11)',
  padding: `${vars.space.xl} ${vars.space['3xl']} 28px`,
  width: '520px',
  overflow: 'hidden',
});

export const inner = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.lg,
  width: '440px',
});
