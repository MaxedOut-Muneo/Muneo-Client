import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';
import { vars } from './tokens.css';

const colorTokens = Object.assign(
  {},
  { white: vars.color.white, black: vars.color.black },
  vars.color.brand,
  vars.color.semantic,
  vars.color.neutral
) as Record<string, string>;

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
