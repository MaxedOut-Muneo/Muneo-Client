import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../styles/tokens.css';

export const cardRecipe = recipe({
  base: {
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '10px',
    borderRadius: '12px',
    boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.08)',
    padding: `${vars.space.lg} 50px ${vars.space.lg} ${vars.space.md}`,
  },
  variants: {
    variant: {
      primary: { backgroundColor: vars.color.brand.primaryBg },
      success: { backgroundColor: vars.color.semantic.successBg },
      danger: { backgroundColor: vars.color.semantic.dangerBg },
      warning: { backgroundColor: vars.color.semantic.warningBg },
      info: { backgroundColor: vars.color.semantic.infoBg },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export const inner = style({
  display: 'flex',
  gap: vars.space.md,
  alignItems: 'center',
});

export const iconWrapper = style({
  width: '24px',
  height: '24px',
  flexShrink: 0,
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '2px',
  flex: '1 0 0',
  whiteSpace: 'nowrap',
});

export const label = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.regular,
  lineHeight: 'normal',
  color: vars.color.neutral.n500,
});

export const value = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.lg,
  fontWeight: vars.typography.fontWeight.extraBold,
  lineHeight: 'normal',
  letterSpacing: '-0.2px',
  color: vars.color.neutral.n900,
  opacity: 0.8,
});
