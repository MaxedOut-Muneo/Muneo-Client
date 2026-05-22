import { style } from '@vanilla-extract/css';

export const wrapper = style({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'safe center',
  justifyContent: 'center',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  padding: '24px',
  backgroundColor: '#f3f4f6',
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});
