import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../styles/tokens.css';

export const buttonRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: vars.typography.fontFamily,
    fontWeight: vars.typography.fontWeight.semiBold,
    borderRadius: vars.radius.sm,
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease, filter 0.15s ease',
    selectors: {
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: vars.color.brand.primary,
        color: vars.color.white,
        selectors: {
          '&:hover:not(:disabled)': {
            filter: 'brightness(0.9)',
          },
          '&:active:not(:disabled)': {
            filter: 'brightness(0.8)',
          },
        },
      },
      secondary: {
        backgroundColor: vars.color.neutral.nSurface,
        color: vars.color.neutral.n900,
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: vars.color.neutral.n100,
          },
        },
      },
      outline: {
        backgroundColor: 'transparent',
        color: vars.color.brand.primary,
        border: `1px solid ${vars.color.neutral.n200}`,
        selectors: {
          '&:hover:not(:disabled)': {
            borderColor: vars.color.brand.primary,
            backgroundColor: vars.color.brand.primaryBg,
          },
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: vars.color.neutral.n900,
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: vars.color.neutral.n100,
          },
        },
      },
    },
    size: {
      sm: {
        fontSize: vars.typography.fontSize.sm,
        padding: `${vars.space.xs} ${vars.space.sm}`,
        gap: vars.space.xs,
      },
      md: {
        fontSize: vars.typography.fontSize.md,
        padding: `${vars.space.sm} ${vars.space.lg}`,
        gap: vars.space.sm,
      },
      lg: {
        fontSize: vars.typography.fontSize.lg,
        padding: `${vars.space.sm} ${vars.space['2xl']}`,
        gap: vars.space.sm,
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
