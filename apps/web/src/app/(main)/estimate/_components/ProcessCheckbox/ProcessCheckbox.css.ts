import { vars } from '@muneo/design-system';
import { style } from '@vanilla-extract/css';

const cardBase = style({
  position: 'relative',
  width: '160px',
  height: '80px',
  borderRadius: vars.radius.sm,
  overflow: 'hidden',
  cursor: 'pointer',
  backgroundColor: vars.color.white,
  transition: 'border-color 0.15s ease',
  flexShrink: 0,
  padding: '11.5px 13.5px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  textAlign: 'left',
});

export const cardSelected = style([cardBase, { border: `1.5px solid ${vars.color.brand.secondary}` }]);
export const cardUnselected = style([cardBase, { border: `1.5px solid ${vars.color.neutral.n300}` }]);

export const processName = style({
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.bold,
  fontFamily: vars.typography.fontFamily,
  lineHeight: 'normal',
  whiteSpace: 'nowrap',
});

export const processNameSelected = style([processName, { color: vars.color.neutral.n900 }]);
export const processNameUnselected = style([processName, { color: vars.color.neutral.n500 }]);

export const processDesc = style({
  fontSize: vars.typography.fontSize.xxs,
  fontWeight: vars.typography.fontWeight.regular,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.neutral.n400,
  lineHeight: 'normal',
  whiteSpace: 'pre-line',
});
