import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../styles/tokens.css';

export const buttonRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: vars.typography.fontFamily.sans,
    fontWeight: vars.typography.fontWeight.semibold,
    borderRadius: vars.radius.md,
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease',
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
        backgroundColor: vars.color.primary,
        color: vars.color.textInverse,
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: vars.color.primaryHover,
          },
          '&:active:not(:disabled)': {
            backgroundColor: vars.color.primaryActive,
          },
        },
      },
      secondary: {
        backgroundColor: vars.color.surface,
        color: vars.color.text,
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: vars.color.surfaceHover,
          },
        },
      },
      outline: {
        backgroundColor: 'transparent',
        color: vars.color.primary,
        border: `1px solid ${vars.color.border}`,
        selectors: {
          '&:hover:not(:disabled)': {
            borderColor: vars.color.primary,
            backgroundColor: vars.color.surface,
          },
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: vars.color.text,
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: vars.color.surfaceHover,
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
        padding: `${vars.space.sm} ${vars.space.md}`,
        gap: vars.space.sm,
      },
      lg: {
        fontSize: vars.typography.fontSize.lg,
        padding: `${vars.space.sm} ${vars.space.lg}`,
        gap: vars.space.sm,
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
