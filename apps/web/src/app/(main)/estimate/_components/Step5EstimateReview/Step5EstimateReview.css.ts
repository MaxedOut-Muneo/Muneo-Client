import { vars } from '@muneo/design-system';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '100%',
});

export const card = style({
  backgroundColor: vars.color.white,
  borderRadius: '12px',
  padding: '20px 40px 28px',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  width: '100%',
  gap: '40px',
});

/* ── 좌측 패널 ── */

export const leftPanel = style({
  backgroundColor: '#FAFDFF',
  border: `1px solid #FAFDFF`,
  borderRadius: '12px',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  flexShrink: 0,
  width: '306px',
});

export const summarySection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const summaryHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export const summaryTitle = style({
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.bold,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.neutral.n900,
  letterSpacing: '-0.16px',
  lineHeight: 'normal',
});

export const editButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4px 16px',
  border: `1px solid ${vars.color.neutral.n200}`,
  borderRadius: '6px',
  backgroundColor: vars.color.white,
  fontSize: vars.typography.fontSize.xxs,
  fontWeight: vars.typography.fontWeight.bold,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.neutral.n500,
  letterSpacing: '-0.096px',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
});

export const summaryRows = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
});

export const summaryRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${vars.color.neutral.n100}`,
  padding: '0 4px',
  minHeight: '20px',
  fontSize: vars.typography.fontSize.xxs,
  fontFamily: vars.typography.fontFamily,
  fontWeight: vars.typography.fontWeight.regular,
  lineHeight: 'normal',
  whiteSpace: 'nowrap',
});

export const summaryRowLabel = style({
  color: vars.color.neutral.n400,
});

export const summaryRowValue = style({
  color: vars.color.neutral.n900,
  textAlign: 'right',
});

export const correctionBox = style({
  backgroundColor: vars.color.brand.primaryBg,
  borderRadius: '12px',
  padding: '8px 15px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  overflow: 'hidden',
  width: '100%',
});

export const correctionTitle = style({
  fontSize: vars.typography.fontSize.xxs,
  fontWeight: vars.typography.fontWeight.bold,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.brand.primary,
  lineHeight: 'normal',
});

export const correctionItems = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const correctionItem = style({
  fontSize: vars.typography.fontSize.xxs,
  fontWeight: vars.typography.fontWeight.regular,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.neutral.n500,
  lineHeight: 'normal',
});

export const processTotal = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '100%',
});

export const processTotalTitle = style({
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.bold,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.neutral.n900,
  lineHeight: 'normal',
});

export const processTotalTable = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '26px',
});

export const tableHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: vars.color.neutral.n100,
  borderRadius: '6px',
  padding: '5px 12px',
  fontSize: vars.typography.fontSize.xxs,
  fontWeight: vars.typography.fontWeight.regular,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.neutral.n500,
  lineHeight: 'normal',
});

export const tableHeaderCell = style({
  fontSize: vars.typography.fontSize.xxs,
  fontWeight: vars.typography.fontWeight.regular,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.neutral.n500,
});

export const tableRows = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
});

export const tableRow = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const tableRowContent = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 12px',
  fontSize: vars.typography.fontSize.xxs,
  fontWeight: vars.typography.fontWeight.regular,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.neutral.n900,
  lineHeight: 'normal',
  whiteSpace: 'nowrap',
});

export const tableDivider = style({
  height: '1px',
  backgroundColor: vars.color.neutral.n200,
  width: '100%',
});

export const totalRow = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '9px',
  alignItems: 'center',
  width: '100%',
});

export const totalDivider = style({
  height: '2px',
  backgroundColor: vars.color.neutral.n300,
  width: '100%',
});

export const totalContent = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  fontSize: vars.typography.fontSize.xxs,
  fontWeight: vars.typography.fontWeight.bold,
  fontFamily: vars.typography.fontFamily,
  lineHeight: 'normal',
  whiteSpace: 'nowrap',
});

export const totalLabel = style({
  color: vars.color.neutral.n900,
});

export const totalValue = style({
  color: vars.color.brand.primary,
  textAlign: 'center',
});

/* ── 우측 패널 ── */

export const rightPanel = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
  flex: 1,
  minWidth: 0,
});

export const totalBanner = style({
  background: `linear-gradient(to right, ${vars.color.semantic.success}, #34D399)`,
  borderRadius: '10px',
  padding: '15px 27px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  height: '90px',
  flexShrink: 0,
});

export const bannerLeft = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
});

export const bannerSubtitle = style({
  fontSize: vars.typography.fontSize.xxs,
  fontWeight: vars.typography.fontWeight.regular,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.white,
  lineHeight: 'normal',
});

export const bannerAmount = style({
  fontSize: vars.typography.fontSize['2xl'],
  fontWeight: vars.typography.fontWeight.bold,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.white,
  lineHeight: 'normal',
});

export const bannerRef = style({
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.bold,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.white,
  whiteSpace: 'nowrap',
});

export const detailSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
});

export const detailTitle = style({
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.bold,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.neutral.n900,
  letterSpacing: '-0.16px',
  lineHeight: 'normal',
});

/* ── 아코디언 ── */

export const accordionList = style({
  display: 'flex',
  flexDirection: 'column',
});

export const accordionItemWrapper = style({
  borderBottom: `1px solid ${vars.color.neutral.n200}`,
  selectors: {
    '&:first-child': {
      borderTop: `1px solid ${vars.color.neutral.n200}`,
    },
  },
});

export const accordionHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '14px 0',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  ':hover': {
    opacity: 0.75,
  },
});

export const accordionHeaderLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
});

export const accordionArrow = style({
  width: '14px',
  height: '14px',
  flexShrink: 0,
  color: vars.color.neutral.n500,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.25s ease',
});

export const accordionArrowOpen = style({
  transform: 'rotate(180deg)',
  color: vars.color.brand.secondary,
});

export const accordionTitle = style({
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.bold,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.neutral.n900,
  letterSpacing: '-0.14px',
  lineHeight: 'normal',
  whiteSpace: 'nowrap',
});

export const accordionAmount = style({
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.bold,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.neutral.n900,
  letterSpacing: '-0.14px',
  lineHeight: 'normal',
  whiteSpace: 'nowrap',
});

export const accordionBody = style({
  overflow: 'hidden',
  maxHeight: '0px',
  transition: 'max-height 0.25s ease, padding 0.25s ease',
  paddingBottom: '0px',
});

export const accordionBodyOpen = style({
  maxHeight: '1000px',
  paddingBottom: '16px',
});

export const accordionContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '0 4px',
});

export const accordionTableHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: vars.typography.fontSize.xxs,
  fontFamily: vars.typography.fontFamily,
  fontWeight: vars.typography.fontWeight.regular,
  color: vars.color.neutral.n500,
  lineHeight: 'normal',
});

export const accordionDivider = style({
  height: '1px',
  backgroundColor: vars.color.neutral.n200,
  width: '100%',
});

export const accordionRow = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const accordionRowContent = style({
  display: 'grid',
  gridTemplateColumns: '1fr 140px 60px',
  alignItems: 'center',
  fontSize: vars.typography.fontSize.xxs,
  fontWeight: vars.typography.fontWeight.bold,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.neutral.n900,
  lineHeight: 'normal',
});

export const refCountGreen = style({
  color: '#00C471',
  textAlign: 'right',
});

export const refCountOrange = style({
  color: vars.color.semantic.warning,
  textAlign: 'right',
});

export const accordionItemDivider = style({
  height: '1px',
  backgroundColor: vars.color.neutral.n200,
  width: '100%',
});

export const footnotes = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width: '252px',
});

export const footnoteGray = style({
  fontSize: vars.typography.fontSize.xxs,
  fontWeight: vars.typography.fontWeight.regular,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.neutral.n400,
  lineHeight: 'normal',
});

export const footnoteOrange = style({
  fontSize: vars.typography.fontSize.xxs,
  fontWeight: vars.typography.fontWeight.regular,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.semantic.warning,
  lineHeight: 'normal',
});

export const emptyNote = style({
  fontSize: vars.typography.fontSize.xxs,
  fontWeight: vars.typography.fontWeight.regular,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.neutral.n400,
  lineHeight: 'normal',
  padding: '0 4px 8px',
  margin: 0,
});

/* ── 면책 & 액션 ── */

export const disclaimerSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  alignItems: 'flex-end',
});

export const disclaimerBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
});

export const warningBox = style({
  backgroundColor: vars.color.semantic.warningBg,
  border: `1px solid #FDBA74`,
  borderRadius: vars.radius.sm,
  padding: '11px 16px',
  overflow: 'hidden',
  width: '100%',
});

export const warningText = style({
  fontSize: vars.typography.fontSize.xxs,
  fontWeight: vars.typography.fontWeight.regular,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.semantic.warning,
  lineHeight: 'normal',
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
});

export const infoText = style({
  fontSize: vars.typography.fontSize.xxs,
  fontWeight: vars.typography.fontWeight.regular,
  fontFamily: vars.typography.fontFamily,
  color: vars.color.neutral.n400,
  lineHeight: 'normal',
});

export const actionRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '16px',
});

/* 하위 호환 — 이전 클래스명 (삭제 예정) */
export const accordionItem = accordionRow;
export const accordionItemRow = accordionRowContent;
