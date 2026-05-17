import { vars } from '@muneo/design-system';
import { style } from '@vanilla-extract/css';

export const card = style({
  backgroundColor: vars.color.white,
  borderRadius: '12px',
  boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.11)',
  padding: `${vars.space.xl} ${vars.space['3xl']} 28px`,
  width: '520px',
  overflow: 'hidden',
});

export const inner = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.lg,
  width: '440px',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.lg,
});

export const avatar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '56px',
  height: '56px',
  flexShrink: 0,
  borderRadius: '12px',
  background: `linear-gradient(135deg, ${vars.color.brand.primary} 0%, ${vars.color.brand.primaryLight} 100%)`,
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.lg,
  fontWeight: vars.typography.fontWeight.bold,
  color: vars.color.white,
  lineHeight: 'normal',
});

export const info = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '7px',
  minWidth: 0,
});

export const name = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.lg,
  fontWeight: vars.typography.fontWeight.bold,
  color: vars.color.neutral.n900,
  lineHeight: 'normal',
  margin: 0,
});

export const role = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.regular,
  color: vars.color.neutral.n400,
  lineHeight: 'normal',
  margin: 0,
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: vars.space['2xl'],
  width: '100%',
});

export const fields = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.lg,
  width: '100%',
});

export const submitButton = style({
  width: '200px',
});

export const socialField = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.xs,
  width: '100%',
});

export const socialFieldLabel = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.regular,
  color: vars.color.neutral.n600,
  lineHeight: 'normal',
  letterSpacing: '-0.112px',
  margin: 0,
});

export const socialBadge = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.sm,
  width: '100%',
  backgroundColor: '#e6e6e6',
  border: `0.935px solid ${vars.color.neutral.n200}`,
  borderRadius: vars.radius.base,
  padding: '10px 16px',
});

export const socialBadgeIcon = style({
  width: '18px',
  height: '17px',
  flexShrink: 0,
});

export const socialBadgeText = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.regular,
  color: 'rgba(10, 10, 10, 0.5)',
  lineHeight: 'normal',
});
