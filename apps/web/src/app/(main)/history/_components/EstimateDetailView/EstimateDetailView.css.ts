import { vars } from '@muneo/design-system';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  width: '100%',
});

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const title = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: '30px',
  fontWeight: vars.typography.fontWeight.bold,
  color: vars.color.neutral.n900,
  lineHeight: 'normal',
});

export const meta = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: '13px',
  fontWeight: vars.typography.fontWeight.regular,
  color: vars.color.neutral.n500,
  lineHeight: 'normal',
});

export const card = style({
  backgroundColor: vars.color.white,
  border: `1px solid ${vars.color.neutral.n200}`,
  borderRadius: '12px',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const cardTitle = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.bold,
  color: vars.color.neutral.n700,
  lineHeight: 'normal',
});

export const processList = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
});

export const processBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '6px 14px',
  borderRadius: '999px',
  backgroundColor: vars.color.brand.primaryBg,
  color: vars.color.brand.primary,
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.semiBold,
  whiteSpace: 'nowrap',
});

export const totalCard = style({
  backgroundColor: vars.color.brand.primary,
  borderRadius: '12px',
  padding: '28px 32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const totalLabel = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.bold,
  color: vars.color.white,
});

export const totalValue = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: '28px',
  fontWeight: vars.typography.fontWeight.bold,
  color: vars.color.white,
});

export const totalMeta = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.regular,
  color: 'rgba(255,255,255,0.75)',
  marginTop: '4px',
});

export const inputGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '10px 24px',
});

export const inputRow = style({
  display: 'flex',
  gap: '8px',
  alignItems: 'baseline',
});

export const inputLabel = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.medium,
  color: vars.color.neutral.n500,
  flexShrink: 0,
});

export const inputValue = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.regular,
  color: vars.color.neutral.n900,
});

export const accordionItem = style({
  borderBottom: `1px solid ${vars.color.neutral.n200}`,
  selectors: { '&:last-child': { borderBottom: 'none' } },
});

export const accordionHeader = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 0',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  textAlign: 'left',
});

export const accordionHeaderLeft = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

export const accordionProcessName = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.semiBold,
  color: vars.color.neutral.n900,
});

export const accordionRange = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.regular,
  color: vars.color.neutral.n500,
});

export const accordionChevron = style({
  color: vars.color.neutral.n500,
  transition: 'transform 0.2s ease',
  flexShrink: 0,
});

export const accordionChevronOpen = style({
  transform: 'rotate(180deg)',
});

export const accordionBody = style({
  overflow: 'hidden',
  maxHeight: '0px',
  transition: 'max-height 0.25s ease',
});

export const accordionBodyOpen = style({
  maxHeight: '2000px',
});

export const lineItemList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0',
  paddingBottom: '12px',
});

export const lineItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 0',
  borderTop: `1px solid ${vars.color.neutral.n100}`,
  selectors: { '&:first-child': { borderTop: 'none' } },
});

export const lineItemDesc = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.sm,
  color: vars.color.neutral.n700,
  flex: 1,
});

export const lineItemRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flexShrink: 0,
});

export const lineItemRange = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.medium,
  color: vars.color.neutral.n900,
});

export const lineItemRef = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.xs,
  color: vars.color.neutral.n500,
  minWidth: '40px',
  textAlign: 'right',
});

export const lineItemRefWarn = style({
  color: vars.color.brand.secondary,
});
