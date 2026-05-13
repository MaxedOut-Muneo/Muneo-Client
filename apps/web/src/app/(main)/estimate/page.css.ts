import { vars } from '@muneo/design-system';
import { style } from '@vanilla-extract/css';

export const page = style({
  backgroundColor: vars.color.neutral.nSurface,
  minHeight: '100vh',
  padding: '46px 60px 100px',
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1280px',
  margin: '0 auto',
});
