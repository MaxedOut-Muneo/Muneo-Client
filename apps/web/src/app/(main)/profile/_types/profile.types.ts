export const SOCIAL_PROVIDERS = ['kakao'] as const;
export type SocialProvider = (typeof SOCIAL_PROVIDERS)[number];

interface ProfileUserCommon {
  initial: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  birth: string;
}

export type ProfileUser = ProfileUserCommon &
  ({ signupType: 'self' } | { signupType: 'social'; provider: SocialProvider });
