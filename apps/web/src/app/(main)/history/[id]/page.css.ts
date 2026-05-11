import { vars } from '@muneo/design-system';
import { style } from '@vanilla-extract/css';

export const page = style({
  backgroundColor: '#f8f9fc',
  minHeight: '100vh',
  padding: '46px 60px 100px',
});

export const backButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  marginBottom: '24px',
  backgroundColor: 'transparent',
  border: 'none',
  padding: 0,
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.medium,
  color: vars.color.neutral.n500,
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'color 0.15s ease',
  selectors: {
    '&:hover': {
      color: vars.color.neutral.n700,
    },
  },
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  maxWidth: '1080px',
});
