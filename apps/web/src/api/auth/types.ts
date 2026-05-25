export interface SocialSignupRequest {
  ticket: string;
  name: string;
  phoneNumber: string;
  birthDate: string;
}

export interface KakaoLoginUrl {
  provider: string;
  loginUrl: string;
}
