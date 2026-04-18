import { vars } from '@muneo/design-system';
import { keyframes, style } from '@vanilla-extract/css';

const fadeUp = keyframes({
  from: { opacity: 0, transform: 'translateY(24px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const bounce = keyframes({
  '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
  '50%': { transform: 'translateX(-50%) translateY(6px)' },
});

const fadeUpCenter = keyframes({
  from: { opacity: 0, transform: 'translateX(-50%) translateY(24px)' },
  to: { opacity: 1, transform: 'translateX(-50%) translateY(0)' },
});

export const section = style({
  position: 'relative',
  display: 'flex',
  padding: '124px 0 48px',
  marginTop: '-72px',
  minHeight: '100vh',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'stretch',
  background: 'linear-gradient(180deg, rgba(69, 62, 239, 0.15) 0%, rgba(155, 134, 255, 0.02) 100%)',
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '220px',
  width: '100%',
  maxWidth: '1440px',
  margin: '0 auto',
  padding: '0 80px 6vh',
});

export const row = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  alignSelf: 'stretch',
});

export const left = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '21px',
});

export const headline = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '7px',
  fontFamily: "'Paperlogy', sans-serif",
  fontSize: '42px',
  fontWeight: 700,
  fontStyle: 'normal',
  lineHeight: 'normal',
});

export const headlineLine1 = style({
  color: vars.color.neutral.n900,
  opacity: 0,
  animation: `${fadeUp} 0.7s ease forwards`,
  animationDelay: '0.1s',
});

export const headlineLine2 = style({
  backgroundImage: 'linear-gradient(93.86deg, #b58fff 0.12%, #6d3fc5 84.54%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  opacity: 0,
  animation: `${fadeUp} 0.7s ease forwards`,
  animationDelay: '0.25s',
});

export const subContent = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '39px',
  alignSelf: 'stretch',
  opacity: 0,
  animation: `${fadeUp} 0.7s ease forwards`,
  animationDelay: '0.4s',
});

export const descriptionSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: vars.space.sm,
  alignSelf: 'stretch',
});

export const descriptionText = style({
  fontFamily: vars.typography.fontFamily,
  fontWeight: vars.typography.fontWeight.medium,
  fontSize: vars.typography.fontSize.md,
  lineHeight: 'normal',
  color: vars.color.neutral.n500,
  opacity: 0.7,
  letterSpacing: '-0.08px',
});

export const divider = style({
  width: '0.8px',
  height: '23px',
  opacity: 0.7,
  backgroundColor: vars.color.neutral.n500,
  flexShrink: 0,
});

export const ctaWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: vars.space.sm,
  alignSelf: 'stretch',
});

export const ctaButton = style({
  borderRadius: '25px',
  fontSize: vars.typography.fontSize.md,
  letterSpacing: '-0.128px',
});

export const right = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '21px',
  opacity: 0,
  animation: `${fadeUp} 0.7s ease forwards`,
  animationDelay: '0.3s',
});

export const previewCard = style({
  margin: 0,
  backgroundColor: vars.color.white,
  border: `1px solid ${vars.color.neutral.n200}`,
  boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.08)',
  borderRadius: '4px',
  padding: '19px 32px 82px 32px',
});

export const previewInner = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '31px',
});

export const previewTop = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  width: '100%',
});

export const previewLabel = style({
  display: 'block',
  fontFamily: vars.typography.fontFamily,
  fontWeight: vars.typography.fontWeight.semiBold,
  fontSize: vars.typography.fontSize.sm,
  lineHeight: 'normal',
  color: vars.color.neutral.n400,
  letterSpacing: '-0.07px',
});

export const statusCardsRow = style({
  display: 'flex',
  gap: '18px',
  alignItems: 'center',
});

export const recentSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const recentLabel = style({
  display: 'block',
  fontFamily: vars.typography.fontFamily,
  fontWeight: vars.typography.fontWeight.medium,
  fontSize: '12px',
  lineHeight: 'normal',
  color: vars.color.neutral.n500,
  letterSpacing: '-0.06px',
});

export const recentList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

export const recentItem = style({
  fontFamily: vars.typography.fontFamily,
  fontWeight: vars.typography.fontWeight.regular,
  fontSize: '12px',
  lineHeight: 'normal',
  color: '#4b5563',
});

export const subHeadline = style({
  fontFamily: "'Paperlogy', sans-serif",
  fontWeight: vars.typography.fontWeight.medium,
  fontSize: vars.typography.fontSize.lg,
  lineHeight: 'normal',
  color: '#6d40c5',
  letterSpacing: '-0.16px',
  textAlign: 'center',
  alignSelf: 'stretch',
  opacity: 0,
  animation: `${fadeUp} 0.7s ease forwards`,
  animationDelay: '0.55s',
});

export const scrollIndicator = style({
  position: 'absolute',
  bottom: '36px',
  left: '50%',
  opacity: 0,
  animation: `${fadeUpCenter} 0.6s ease forwards, ${bounce} 1.8s ease-in-out 1.2s infinite`,
  animationDelay: '0.8s, 1.2s',
  color: 'rgba(109, 64, 197, 0.4)',
});
