export const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  // 02 지역번호는 국번 2자리, 나머지(010, 02X, 1XXX 등)는 3자리
  const prefixLen = digits.startsWith('02') ? 2 : 3;
  if (digits.length <= prefixLen) {
    return digits;
  }
  // 가입자번호는 마지막 4자리. 전체 길이가 prefix+8(=11 또는 10)이면 middle 4자리, 그 외엔 3자리
  const maxMiddle = digits.length === prefixLen + 8 ? 4 : 3;
  const prefix = digits.slice(0, prefixLen);
  const rest = digits.slice(prefixLen);
  if (rest.length <= maxMiddle) {
    return `${prefix}-${rest}`;
  }
  return `${prefix}-${rest.slice(0, maxMiddle)}-${rest.slice(maxMiddle)}`;
};

export const formatBirthDate = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length < 5) {
    return digits;
  }
  if (digits.length < 7) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
};
