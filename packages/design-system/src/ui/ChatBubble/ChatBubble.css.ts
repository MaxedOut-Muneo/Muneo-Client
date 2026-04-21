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
