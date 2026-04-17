import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';
import { vars } from './tokens.css';

const colorTokens = {
  white: vars.color.white,
  black: vars.color.black,
  brandPrimary: vars.color.brand.primary,
  brandPrimaryLight: vars.color.brand.primaryLight,
  brandPrimaryBg: vars.color.brand.primaryBg,
  success: vars.color.semantic.success,
  successBg: vars.color.semantic.successBg,
  danger: vars.color.semantic.danger,
  dangerBg: vars.color.semantic.dangerBg,
  warning: vars.color.semantic.warning,
  warningBg: vars.color.semantic.warningBg,
  info: vars.color.semantic.info,
  infoBg: vars.color.semantic.infoBg,
  n900: vars.color.neutral.n900,
  n700: vars.color.neutral.n700,
  n500: vars.color.neutral.n500,
  n400: vars.color.neutral.n400,
  n300: vars.color.neutral.n300,
  n200: vars.color.neutral.n200,
  n100: vars.color.neutral.n100,
  nSurface: vars.color.neutral.nSurface,
};

const colorProperties = defineProperties({
  properties: {
    color: colorTokens,
    backgroundColor: colorTokens,
    borderColor: colorTokens,
  },
});

const spaceProperties = defineProperties({
  properties: {
    padding: vars.space,
    paddingTop: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    margin: vars.space,
    marginTop: vars.space,
    marginBottom: vars.space,
    marginLeft: vars.space,
    marginRight: vars.space,
    gap: vars.space,
  },
});

const typographyProperties = defineProperties({
  properties: {
    fontSize: vars.typography.fontSize,
    fontWeight: vars.typography.fontWeight,
    lineHeight: vars.typography.lineHeight,
  },
});

const layoutProperties = defineProperties({
  properties: {
    display: ['none', 'flex', 'block', 'inline-flex', 'inline-block', 'grid'],
    flexDirection: ['row', 'column', 'row-reverse', 'column-reverse'],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end', 'baseline'],
    justifyContent: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
    flexWrap: ['nowrap', 'wrap'],
    textAlign: ['left', 'center', 'right'],
    borderRadius: vars.radius,
  },
});

export const sprinkles = createSprinkles(colorProperties, spaceProperties, typographyProperties, layoutProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];
