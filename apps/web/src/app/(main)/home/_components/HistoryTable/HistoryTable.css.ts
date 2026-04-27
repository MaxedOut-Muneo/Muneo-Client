import { vars } from '@muneo/design-system';
import { style } from '@vanilla-extract/css';

export const card = style({
  backgroundColor: vars.color.white,
  borderRadius: '16px',
  boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.11)',
  padding: '26px 38px 40px 37px',
  width: '100%',
});

export const cardTitle = style({
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.bold,
  color: vars.color.neutral.n600,
  marginBottom: '20px',
});

export const divider = style({
  height: '1px',
  backgroundColor: vars.color.neutral.n200,
  margin: '0 0 0 0',
});

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
});

export const thead = style({
  borderBottom: `1px solid ${vars.color.neutral.n200}`,
});

export const th = style({
  padding: '12px 0',
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.xs,
  fontWeight: vars.typography.fontWeight.bold,
  color: vars.color.neutral.n400,
  textAlign: 'left',
  whiteSpace: 'nowrap',
});

export const thInner = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '2px',
  cursor: 'pointer',
});

export const tr = style({
  borderBottom: `1px solid ${vars.color.neutral.n200}`,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
});

export const td = style({
  padding: '14px 0',
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.xs,
  fontWeight: vars.typography.fontWeight.regular,
  color: vars.color.neutral.n700,
  verticalAlign: 'middle',
});

export const tdDate = style([
  td,
  {
    opacity: 0.8,
    fontWeight: vars.typography.fontWeight.medium,
    width: '120px',
  },
]);

export const tdType = style([
  td,
  {
    fontWeight: vars.typography.fontWeight.semiBold,
    width: '140px',
  },
]);

export const tdConstruction = style([
  td,
  {
    width: '180px',
  },
]);

export const tdRisk = style([
  td,
  {
    fontWeight: vars.typography.fontWeight.semiBold,
    width: '120px',
  },
]);

const badge = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '3px 10px',
  borderRadius: '999px',
  fontSize: vars.typography.fontSize.xs,
  fontWeight: vars.typography.fontWeight.semiBold,
  whiteSpace: 'nowrap',
});

export const riskDanger = style([
  badge,
  { backgroundColor: vars.color.semantic.dangerBg, color: vars.color.semantic.danger },
]);

export const riskSafe = style([
  badge,
  { backgroundColor: vars.color.semantic.successBg, color: vars.color.semantic.success },
]);

export const riskNone = style({ color: vars.color.neutral.n400 });

export const analysisRisk = style([
  badge,
  { backgroundColor: vars.color.brand.secondaryBg, color: vars.color.brand.secondary },
]);

export const analysisEstimate = style([
  badge,
  { backgroundColor: vars.color.semantic.infoBg, color: vars.color.semantic.info },
]);
