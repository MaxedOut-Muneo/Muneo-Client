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
  fontSize: vars.typography.fontSize.xxs,
  fontWeight: vars.typography.fontWeight.medium,
  fontFamily: vars.typography.fontFamily,
  color: 'rgba(79, 37, 162, 0.75)',
  letterSpacing: '-0.12px',
  lineHeight: 'normal',
  whiteSpace: 'nowrap',
});

export const card = style({
  backgroundColor: vars.color.white,
  borderRadius: '12px',
  boxShadow: '0px 2px 1px 0px rgba(0,0,0,0.11)',
  padding: '20px 40px 28px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

export const contextBar = style({
  display: 'inline-flex',
  alignSelf: 'flex-start',
  alignItems: 'center',
  padding: '6px 16px',
  borderRadius: '999px',
  backgroundColor: 'rgba(79, 37, 162, 0.08)',
});

export const contextBarText = style({
  fontSize: vars.typography.fontSize.xs,
  fontWeight: vars.typography.fontWeight.medium,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.brand.secondary,
  lineHeight: 'normal',
});

export const accordionList = style({
  display: 'flex',
  flexDirection: 'column',
});

export const accordionItem = style({
  borderBottom: `1px solid ${vars.color.neutral.n200}`,
  selectors: {
    '&:first-child': {
      borderTop: `1px solid ${vars.color.neutral.n200}`,
    },
  },
});

export const accordionHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '16px 0',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  ':hover': {
    opacity: 0.75,
  },
});

export const accordionHeaderText = style({
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.bold,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.neutral.n900,
  lineHeight: 'normal',
});

export const accordionHeaderTextOpen = style({
  color: vars.color.brand.secondary,
});

export const accordionChevron = style({
  width: '20px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.25s ease',
  color: vars.color.neutral.n500,
  flexShrink: 0,
});

export const accordionChevronOpen = style({
  transform: 'rotate(180deg)',
  color: vars.color.brand.secondary,
});

export const accordionBody = style({
  overflow: 'hidden',
  transition: 'max-height 0.25s ease, padding 0.25s ease',
  maxHeight: '0px',
  paddingBottom: '0px',
});

export const accordionBodyOpen = style({
  maxHeight: '3000px',
  paddingBottom: '28px',
});

export const sectionBody = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
});

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const fieldLabel = style({
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.bold,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.neutral.n900,
  lineHeight: 'normal',
});

export const buttonRow = style({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  flexWrap: 'wrap',
});

export const conditionalField = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  paddingLeft: '16px',
  borderLeft: `2px solid ${vars.color.brand.secondary}`,
});

export const numberInput = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '4px',
  padding: `${vars.space.md} ${vars.space.lg}`,
  border: `1.5px solid ${vars.color.neutral.n200}`,
  borderRadius: vars.radius.base,
  backgroundColor: vars.color.white,
  overflow: 'hidden',
  alignSelf: 'flex-start',
  minWidth: '80px',
});

export const numberInputField = style({
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.bold,
  fontFamily: vars.typography.fontFamily,
  color: 'rgba(10, 10, 10, 0.5)',
  lineHeight: 'normal',
  border: 'none',
  outline: 'none',
  textAlign: 'right',
  width: '40px',
  backgroundColor: 'transparent',
});

export const numberInputUnit = style({
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.bold,
  fontFamily: vars.typography.fontFamily,
  color: 'rgba(10, 10, 10, 0.5)',
  lineHeight: 'normal',
  whiteSpace: 'nowrap',
  flexShrink: 0,
});

export const infoNote = style({
  fontSize: vars.typography.fontSize.xs,
  fontWeight: vars.typography.fontWeight.regular,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.neutral.n500,
  lineHeight: '1.5',
  padding: '10px 14px',
  backgroundColor: vars.color.neutral.n100,
  borderRadius: vars.radius.base,
  margin: 0,
});
