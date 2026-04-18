import { style } from '@vanilla-extract/css';

export const button = style({
  position: 'fixed',
  bottom: '32px',
  right: '32px',
  width: '56px',
  height: '56px',
  borderRadius: '50%',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  boxShadow: '0px 4px 16px 0px rgba(109, 63, 197, 0.3)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  zIndex: 100,
  background: 'transparent',
  ':hover': {
    boxShadow: '0px 8px 24px 0px rgba(109, 63, 197, 0.4)',
  },
});
