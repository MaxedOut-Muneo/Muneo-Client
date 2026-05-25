import { vars } from '@muneo/design-system';
import { style } from '@vanilla-extract/css';

export const sidebar = style({
  width: vars.layout.sidebarWidth,
  height: '100%',
  backgroundColor: vars.color.white,
  borderRight: `1px solid ${vars.color.neutral.n200}`,
  padding: `${vars.space['2xl']} ${vars.space.lg}`,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.xl,
  flexShrink: 0,
  overflowY: 'auto',
});

export const brand = style({
  fontFamily: vars.typography.fontFamilyDisplay,
  fontSize: vars.typography.fontSize.lg,
  fontWeight: vars.typography.fontWeight.bold,
  color: vars.color.brand.primary,
  padding: `0 ${vars.space.sm}`,
  letterSpacing: vars.typography.letterSpacing.sm,
});

export const navList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.xs,
  flex: 1,
  listStyle: 'none',
});

export const navItem = style({
  display: 'block',
  padding: `${vars.space.md} ${vars.space.lg}`,
  borderRadius: vars.radius.sm,
  color: vars.color.neutral.n600,
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.medium,
  textDecoration: 'none',
  transition: 'background-color 0.15s, color 0.15s',
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.neutral.n100,
      color: vars.color.neutral.n900,
    },
  },
});

export const navItemActive = style({
  backgroundColor: vars.color.brand.primaryBg,
  color: vars.color.brand.primary,
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.brand.primaryBg,
      color: vars.color.brand.primary,
    },
  },
});

export const userBlock = style({
  marginTop: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sm,
  padding: vars.space.md,
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.neutral.nSurface,
});

export const userName = style({
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.semiBold,
  color: vars.color.neutral.n900,
});

export const userEmail = style({
  fontSize: vars.typography.fontSize.xs,
  color: vars.color.neutral.n500,
  wordBreak: 'break-all',
});

export const logoutBtn = style({
  marginTop: vars.space.xs,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  fontSize: vars.typography.fontSize.xs,
  color: vars.color.neutral.n600,
  backgroundColor: vars.color.white,
  border: `1px solid ${vars.color.neutral.n300}`,
  borderRadius: vars.radius.sm,
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.neutral.n100,
    },
  },
});
