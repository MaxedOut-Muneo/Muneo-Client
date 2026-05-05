import { vars } from '@muneo/design-system';
import { style } from '@vanilla-extract/css';

export const card = style({
  flex: '1 0 0',
  borderRadius: '12px',
  padding: '16px 12px',
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0px 2px 1px rgba(0, 0, 0, 0.08)',
});

export const cardDanger = style({ backgroundColor: vars.color.semantic.dangerBg });
export const cardWarning = style({ backgroundColor: vars.color.semantic.warningBg });
export const cardInfo = style({ backgroundColor: vars.color.semantic.infoBg });

export const inner = style({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
});

export const iconWrapper = style({
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  fontSize: '18px',
});

export const texts = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

export const sublabel = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.xs,
  fontWeight: vars.typography.fontWeight.regular,
  color: vars.color.neutral.n500,
  lineHeight: 'normal',
  whiteSpace: 'nowrap',
});

export const count = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: '24px',
  fontWeight: vars.typography.fontWeight.extraBold,
  color: vars.color.neutral.n900,
  letterSpacing: '-0.24px',
  opacity: 0.8,
  lineHeight: 'normal',
});

export const hint = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: '10px',
  fontWeight: vars.typography.fontWeight.regular,
  color: vars.color.neutral.n400,
  lineHeight: 'normal',
  whiteSpace: 'nowrap',
});
