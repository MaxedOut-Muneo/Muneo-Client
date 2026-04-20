import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../styles/tokens.css';

export const sidebar = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '224px',
  height: '100vh',
  backgroundColor: vars.color.white,
  boxShadow: '2px 0 3px rgba(0, 0, 0, 0.06)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  paddingTop: '40px',
  paddingBottom: '16px',
  paddingLeft: vars.space.sm,
  paddingRight: vars.space.sm,
  zIndex: 100,
  overflowY: 'auto',
});

export const topSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['2xl'],
});

export const logoArea = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '5px',
  width: 'fit-content',
  alignSelf: 'center',
});

export const tagline = style({
  display: 'block',
  width: '100%',
  fontFamily: vars.typography.fontFamily,
  fontSize: '8px',
  fontWeight: vars.typography.fontWeight.regular,
  color: vars.color.neutral.n400,
  textAlign: 'justify',
  textAlignLast: 'justify',
  lineHeight: 1,
  whiteSpace: 'nowrap',
});

export const navList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const navItemWrapper = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
});

export const navIndicator = style({
  width: '3px',
  height: '24px',
  borderRadius: '0 2px 2px 0',
  flexShrink: 0,
  backgroundColor: 'transparent',
  marginRight: '5px',
});

export const navIndicatorActive = style({
  backgroundColor: vars.color.brand.primary,
});

export const navItemContent = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '9px',
    height: '40px',
    flex: 1,
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingTop: '9px',
    paddingBottom: '9px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    fontFamily: vars.typography.fontFamily,
    fontSize: vars.typography.fontSize.base,
    fontWeight: vars.typography.fontWeight.bold,
    textAlign: 'left',
    transition: 'background-color 0.15s ease, color 0.15s ease',
    selectors: {
      '&:hover': {
        backgroundColor: vars.color.neutral.n100,
      },
    },
  },
  variants: {
    active: {
      true: {
        backgroundColor: vars.color.brand.primaryBg,
        color: vars.color.brand.primary,
        selectors: {
          '&:hover': {
            backgroundColor: vars.color.brand.primaryBg,
          },
        },
      },
      false: {
        backgroundColor: 'transparent',
        color: vars.color.neutral.n500,
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const navIcon = style({
  width: '22px',
  height: '22px',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'inherit',
});

export const userCard = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  backgroundColor: vars.color.neutral.nSurface,
  height: '52px',
  width: '100%',
  paddingLeft: '12px',
  paddingRight: '12px',
  borderRadius: '12px',
  flexShrink: 0,
});

export const avatar = style({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundImage: `linear-gradient(135deg, ${vars.color.brand.primary} 0%, ${vars.color.brand.primaryLight} 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.white,
  fontSize: vars.typography.fontSize.xs,
  fontWeight: vars.typography.fontWeight.bold,
  fontFamily: vars.typography.fontFamily,
  flexShrink: 0,
});

export const userInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1px',
  minWidth: 0,
});

export const userNameStyle = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.xs,
  fontWeight: vars.typography.fontWeight.semiBold,
  color: vars.color.neutral.n900,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const userEmailStyle = style({
  fontFamily: vars.typography.fontFamily,
  fontSize: '11px',
  fontWeight: vars.typography.fontWeight.regular,
  color: vars.color.neutral.n400,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
