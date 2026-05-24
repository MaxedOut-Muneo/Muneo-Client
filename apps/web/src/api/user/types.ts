export interface SignupRequest {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phoneNumber: string;
  birthDate: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateMeLocalRequest {
  email: string;
  name: string;
  phoneNumber: string;
  birthDate: string;
  newPassword?: string;
  newPasswordConfirm?: string;
}

export interface UpdateMeSocialRequest {
  name: string;
  phoneNumber: string;
  birthDate: string;
}
