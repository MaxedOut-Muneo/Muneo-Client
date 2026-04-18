import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../styles/tokens.css';
import { typographyStyles } from '../../styles/typography';

export const textRecipe = recipe({
  base: {
    fontFamily: vars.typography.fontFamily,
    margin: 0,
  },
  variants: {
    variant: {
      display: typographyStyles.display,
      h1: typographyStyles.h1,
      h2: typographyStyles.h2,
      h3: typographyStyles.h3,
      h4: typographyStyles.h4,
      body1: typographyStyles.body1,
      body2: typographyStyles.body2,
      label: typographyStyles.label,
      labelSm: typographyStyles.labelSm,
      caption: typographyStyles.caption,
    },
  },
  defaultVariants: {
    variant: 'body1',
  },
});
