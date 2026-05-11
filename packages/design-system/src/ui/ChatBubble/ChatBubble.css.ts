import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../styles/tokens.css';

export const chatBubbleRecipe = recipe({
  base: {
    borderRadius: vars.radius.md,
    fontFamily: vars.typography.fontFamily,
    fontSize: '13px',
    fontWeight: vars.typography.fontWeight.regular,
    lineHeight: '1.5',
    wordBreak: 'break-word',
  },
  variants: {
    variant: {
      ai: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        backgroundColor: vars.color.neutral.nSurface,
        color: vars.color.neutral.n900,
        maxWidth: '400px',
        padding: vars.space.lg,
      },
      user: {
        backgroundImage: `linear-gradient(169deg, ${vars.color.brand.primary} 0%, ${vars.color.brand.primaryLight} 100%)`,
        color: vars.color.white,
        maxWidth: '320px',
        paddingTop: vars.space.md,
        paddingBottom: vars.space.md,
        paddingLeft: vars.space.lg,
        paddingRight: vars.space.lg,
      },
    },
  },
  defaultVariants: {
    variant: 'ai',
  },
});

export const recommendationGroup = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'center',
  gap: vars.space.xs,
  width: '100%',
});

export const recommendation = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  paddingTop: '6px',
  paddingBottom: '6px',
  paddingLeft: vars.space.md,
  paddingRight: vars.space.md,
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.brand.primaryBg,
  color: vars.color.brand.primary,
  fontFamily: vars.typography.fontFamily,
  fontSize: '11px',
  fontWeight: vars.typography.fontWeight.regular,
  lineHeight: '1.4',
});

export const ragLabel = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: '9px',
  fontWeight: vars.typography.fontWeight.regular,
  color: vars.color.neutral.n400,
});
