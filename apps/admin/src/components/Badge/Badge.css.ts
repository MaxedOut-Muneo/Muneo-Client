import { vars } from '@muneo/design-system';
import { style, styleVariants } from '@vanilla-extract/css';

export const badge = style({
  display: 'inline-block',
  padding: `2px ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  fontSize: vars.typography.fontSize.xxs,
  fontWeight: vars.typography.fontWeight.semiBold,
});

export const tone = styleVariants({
  primary: {
    backgroundColor: vars.color.brand.primaryBg,
    color: vars.color.brand.primary,
  },
  neutral: {
    backgroundColor: vars.color.neutral.n100,
    color: vars.color.neutral.n700,
  },
  success: {
    backgroundColor: vars.color.semantic.successBg,
    color: vars.color.semantic.success,
  },
  danger: {
    backgroundColor: vars.color.semantic.dangerBg,
    color: vars.color.semantic.danger,
  },
});
