'use client';

import { useRef, useState } from 'react';
import { isApiError } from '@/api/errors';
import { deleteMe } from '@/api/user';

export const useWithdraw = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inFlightRef = useRef(false);

  const withdraw = async () => {
    if (inFlightRef.current) {
      return;
    }
    inFlightRef.current = true;
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await deleteMe();
      window.location.href = '/';
    } catch (e) {
      setErrorMessage(isApiError(e) ? e.message : '회원 탈퇴 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      setIsLoading(false);
      inFlightRef.current = false;
    }
  };

  return { withdraw, isLoading, errorMessage };
};
