import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/tokens.css';
import { typographyStyles } from '../../styles/typography';

export const wrapper = style({
  position: 'relative',
  display: 'inline-block',
});

export const trigger = style({
  ...typographyStyles.labelSm,
  fontWeight: vars.typography.fontWeight.regular,
  color: vars.color.neutral.n500,
  fontFamily: vars.typography.fontFamily,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: vars.color.white,
  border: `1px solid ${vars.color.neutral.n200}`,
  borderRadius: '10px',
  paddingTop: '11px',
  paddingBottom: '11px',
  paddingLeft: vars.space.lg,
  paddingRight: vars.space.lg,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  selectors: {
    '&:focus': {
      outline: 'none',
      borderColor: vars.color.brand.primary,
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
});

export const triggerOpen = style({
  borderColor: vars.color.brand.primary,
});

export const panel = style({
  position: 'absolute',
  top: 'calc(100% + 4px)',
  left: 0,
  zIndex: 10,
  backgroundColor: vars.color.white,
  border: `1px solid ${vars.color.neutral.n200}`,
  borderRadius: '10px',
  padding: vars.space.lg,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  userSelect: 'none',
});

export const calendarHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: vars.space.md,
});

export const monthLabel = style({
  ...typographyStyles.labelSm,
  fontWeight: vars.typography.fontWeight.semiBold,
  color: vars.color.neutral.n900,
  fontFamily: vars.typography.fontFamily,
});

export const navButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  borderRadius: vars.space.xs,
  color: vars.color.neutral.n500,
  padding: 0,
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.neutral.n100,
      color: vars.color.neutral.n900,
    },
  },
});

export const weekDays = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 32px)',
  marginBottom: vars.space.xs,
});

export const weekDay = style({
  ...typographyStyles.labelSm,
  fontWeight: vars.typography.fontWeight.medium,
  color: vars.color.neutral.n400,
  fontFamily: vars.typography.fontFamily,
  textAlign: 'center',
  lineHeight: '32px',
});

export const daysGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 32px)',
});

export const dayWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '32px',
});

export const dayWrapperInRange = style({
  backgroundColor: vars.color.brand.primaryBg,
});

export const dayWrapperRangeStart = style({
  background: `linear-gradient(to right, transparent 50%, ${vars.color.brand.primaryBg} 50%)`,
});

export const dayWrapperRangeEnd = style({
  background: `linear-gradient(to left, transparent 50%, ${vars.color.brand.primaryBg} 50%)`,
});

export const dayButton = style({
  ...typographyStyles.labelSm,
  fontWeight: vars.typography.fontWeight.regular,
  color: vars.color.neutral.n900,
  fontFamily: vars.typography.fontFamily,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  borderRadius: '50%',
  flexShrink: 0,
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.neutral.n100,
    },
  },
});

export const dayButtonSelected = style({
  backgroundColor: vars.color.brand.primary,
  color: vars.color.white,
  fontWeight: vars.typography.fontWeight.semiBold,
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.brand.primary,
    },
  },
});

export const dayButtonToday = style({
  fontWeight: vars.typography.fontWeight.semiBold,
  color: vars.color.brand.primary,
});

export const dayButtonEmpty = style({
  cursor: 'default',
  selectors: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
});
