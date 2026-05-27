export const CTA_EVENTS = {
  landingHeaderSignup: 'click_cta_landing_header_signup',
  landingHeroSignup: 'click_cta_landing_hero_signup',
  chatOpen: 'click_cta_chat_open',
  chatLoginRedirect: 'click_cta_chat_login_redirect',
} as const;

export type CtaEvent = (typeof CTA_EVENTS)[keyof typeof CTA_EVENTS];
