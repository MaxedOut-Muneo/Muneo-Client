import { vars } from '@muneo/design-system';
import { keyframes, style, styleVariants } from '@vanilla-extract/css';

const slideIn = keyframes({
  '0%': { transform: 'translateY(20px)', opacity: 0 },
  '100%': { transform: 'translateY(0)', opacity: 1 },
});

export const toast = style({
  position: 'fixed',
  bottom: vars.space.xl,
  right: vars.space.xl,
  zIndex: 1000,
  minWidth: '280px',
  maxWidth: '420px',
  padding: `${vars.space.md} ${vars.space.lg}`,
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.white,
  border: `1px solid ${vars.color.neutral.n200}`,
  boxShadow: '0 4px 16px rgba(15, 23, 42, 0.12)',
  display: 'flex',
  alignItems: 'flex-start',
  gap: vars.space.md,
  fontSize: vars.typography.fontSize.sm,
  color: vars.color.neutral.n900,
  animation: `${slideIn} 200ms ease-out`,
});

export const tone = styleVariants({
  default: {
    borderLeft: `4px solid ${vars.color.neutral.n500}`,
  },
  success: {
    borderLeft: `4px solid ${vars.color.semantic.success}`,
  },
  error: {
    borderLeft: `4px solid ${vars.color.semantic.danger}`,
  },
  warning: {
    borderLeft: `4px solid ${vars.color.semantic.warning}`,
  },
});

export const message = style({
  flex: 1,
  lineHeight: vars.typography.lineHeight.md,
});

export const closeButton = style({
  background: 'none',
  border: 'none',
  padding: 0,
  color: vars.color.neutral.n500,
  cursor: 'pointer',
  fontSize: vars.typography.fontSize.md,
  lineHeight: 1,
  selectors: {
    '&:hover': {
      color: vars.color.neutral.n900,
    },
  },
});
