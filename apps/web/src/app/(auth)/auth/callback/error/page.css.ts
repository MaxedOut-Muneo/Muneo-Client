import { style } from '@vanilla-extract/css';

export const wrapper = style({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  textAlign: 'center',
  padding: '24px',
});

export const icon = style({
  color: '#EF4444',
});

export const title = style({
  fontSize: '20px',
  fontWeight: 600,
  margin: 0,
});

export const description = style({
  fontSize: '14px',
  color: '#6B7280',
  margin: 0,
});

export const actions = style({
  display: 'flex',
  gap: '8px',
});
