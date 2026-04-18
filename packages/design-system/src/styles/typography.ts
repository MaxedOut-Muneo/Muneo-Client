import { vars } from './tokens.css';

export const typographyStyles = {
  display: {
    fontSize: vars.typography.fontSize['4xl'],
    fontWeight: vars.typography.fontWeight.bold,
    lineHeight: vars.typography.lineHeight['3xl'],
    letterSpacing: '-0.32px',
  },
  h1: {
    fontSize: vars.typography.fontSize['2xl'],
    fontWeight: vars.typography.fontWeight.bold,
    lineHeight: vars.typography.lineHeight['2xl'],
    letterSpacing: '-0.224px',
  },
  h2: {
    fontSize: vars.typography.fontSize.xl,
    fontWeight: vars.typography.fontWeight.bold,
    lineHeight: vars.typography.lineHeight['2xl'],
    letterSpacing: '-0.192px',
  },
  h3: {
    fontSize: vars.typography.fontSize.lg,
    fontWeight: vars.typography.fontWeight.semiBold,
    lineHeight: vars.typography.lineHeight.xl,
    letterSpacing: '-0.16px',
  },
  h4: {
    fontSize: vars.typography.fontSize.md,
    fontWeight: vars.typography.fontWeight.semiBold,
    lineHeight: vars.typography.lineHeight.lg,
    letterSpacing: '-0.128px',
  },
  body1: {
    fontSize: vars.typography.fontSize.md,
    fontWeight: vars.typography.fontWeight.regular,
    lineHeight: vars.typography.lineHeight.lg,
    letterSpacing: '-0.128px',
  },
  body2: {
    fontSize: vars.typography.fontSize.base,
    fontWeight: vars.typography.fontWeight.regular,
    lineHeight: vars.typography.lineHeight.lg,
    letterSpacing: '-0.12px',
  },
  label: {
    fontSize: vars.typography.fontSize.sm,
    fontWeight: vars.typography.fontWeight.medium,
    lineHeight: vars.typography.lineHeight.md,
    letterSpacing: '-0.112px',
  },
  labelSm: {
    fontSize: vars.typography.fontSize.xs,
    fontWeight: vars.typography.fontWeight.medium,
    lineHeight: vars.typography.lineHeight.sm,
    letterSpacing: '-0.096px',
  },
  caption: {
    fontSize: vars.typography.fontSize.xxs,
    fontWeight: vars.typography.fontWeight.regular,
    lineHeight: vars.typography.lineHeight.sm,
    letterSpacing: '-0.08px',
  },
} as const;
