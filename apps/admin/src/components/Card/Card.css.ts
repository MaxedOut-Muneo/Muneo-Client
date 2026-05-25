import { vars } from '@muneo/design-system';
import { style, styleVariants } from '@vanilla-extract/css';

export const card = style({
  padding: vars.space.xl,
  backgroundColor: vars.color.white,
  borderRadius: vars.radius.sm,
  display: 'flex',
  flexDirection: 'column',
});

export const variant = styleVariants({
  default: {
    border: `1px solid ${vars.color.neutral.n200}`,
    gap: vars.space.lg,
  },
  danger: {
    border: `1px solid ${vars.color.semantic.danger}`,
    gap: vars.space.md,
  },
});

export const title = style({
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.semiBold,
  margin: 0,
});

export const titleColor = styleVariants({
  default: {
    color: vars.color.neutral.n900,
  },
  danger: {
    color: vars.color.semantic.danger,
  },
});
