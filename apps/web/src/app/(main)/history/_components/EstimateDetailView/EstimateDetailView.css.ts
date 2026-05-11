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
