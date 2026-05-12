import { vars } from '@muneo/design-system';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '100%',
});

export const header = style({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '13px',
  flexShrink: 0,
});

export const title = style({
  fontSize: vars.typography.fontSize.xl,
  fontWeight: vars.typography.fontWeight.bold,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.neutral.n900,
  lineHeight: 'normal',
  margin: 0,
});

export const titleAccent = style({
  color: vars.color.brand.secondary,
});

export const titleHint = style({
  fontSize: vars.typography.fontSize.xs,
  fontWeight: vars.typography.fontWeight.regular,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.neutral.n400,
  lineHeight: 'normal',
  whiteSpace: 'nowrap',
});

export const card = style({
  backgroundColor: vars.color.white,
  borderRadius: '12px',
  overflow: 'hidden',
  height: '630px',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const tabBar = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '0 40px',
  flexShrink: 0,
});

const tabBase = style({
  height: '50px',
  width: '134px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.semiBold,
  fontFamily: vars.typography.fontFamily,
  lineHeight: '14px',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  borderBottom: '1.5px solid transparent',
  transition: 'color 0.15s ease, border-color 0.15s ease',
});

export const tabActive = style([
  tabBase,
  { color: vars.color.brand.secondary, borderBottomColor: vars.color.brand.secondary },
]);
export const tabInactive = style([tabBase, { color: vars.color.neutral.n500, borderBottomColor: 'transparent' }]);

export const cardBody = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '45px',
  padding: '0 40px',
  overflowY: 'auto',
});

export const processSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
});

export const sectionLabel = style({
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.bold,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.neutral.n500,
  lineHeight: 'normal',
});

export const processGrid = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

export const processRow = style({
  display: 'flex',
  gap: '28px',
  alignItems: 'center',
});

export const actions = style({
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
  justifyContent: 'center',
  height: '45px',
  flexShrink: 0,
});
