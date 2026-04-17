import { globalStyle } from '@vanilla-extract/css';
import { vars } from './tokens.css';

globalStyle('*, *::before, *::after', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
});

globalStyle('html', {
  fontFamily: vars.typography.fontFamily,
  lineHeight: vars.typography.lineHeight.lg,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

globalStyle('body', {
  color: vars.color.neutral.n900,
  backgroundColor: vars.color.white,
});
