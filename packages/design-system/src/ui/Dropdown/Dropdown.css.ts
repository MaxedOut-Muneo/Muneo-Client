import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/tokens.css';
import { typographyStyles } from '../../styles/typography';

export const wrapper = style({
  position: 'relative',
  display: 'inline-block',
  width: '100%',
});

export const trigger = style({
  ...typographyStyles.labelSm,
  fontWeight: vars.typography.fontWeight.regular,
  color: vars.color.neutral.n900,
  fontFamily: vars.typography.fontFamily,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  backgroundColor: vars.color.white,
  border: `1px solid ${vars.color.neutral.n200}`,
  borderRadius: '10px',
  paddingTop: '6px',
  paddingBottom: '6px',
  paddingLeft: vars.space.xl,
  paddingRight: vars.space.md,
  cursor: 'pointer',
  selectors: {
    '&:focus': {
      outline: 'none',
      borderColor: vars.color.brand.primary,
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
});

export const panel = style({
  position: 'absolute',
  top: 'calc(100% + 4px)',
  left: 0,
  right: 0,
  zIndex: 10,
  backgroundColor: vars.color.white,
  border: `1px solid ${vars.color.neutral.n200}`,
  borderRadius: '10px',
  paddingTop: '6px',
  paddingBottom: '6px',
  paddingLeft: vars.space.xl,
  paddingRight: vars.space.md,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.md,
  listStyle: 'none',
  margin: 0,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
});

export const optionItem = style({
  ...typographyStyles.labelSm,
  fontWeight: vars.typography.fontWeight.regular,
  color: vars.color.neutral.n900,
  fontFamily: vars.typography.fontFamily,
  cursor: 'pointer',
  selectors: {
    '&[aria-selected="true"]': {
      color: vars.color.brand.primary,
      fontWeight: vars.typography.fontWeight.semiBold,
    },
  },
});

export const caret = style({
  flexShrink: 0,
  color: vars.color.neutral.n500,
  transition: 'transform 0.15s ease',
});

export const caretOpen = style({
  transform: 'rotate(180deg)',
});
