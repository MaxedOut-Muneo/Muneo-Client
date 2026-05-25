import { type FieldValues, type Path, type UseFormSetError } from 'react-hook-form';
import { isApiError } from '@/api/errors';

export const applyValidationErrors = <T extends FieldValues>(
  setError: UseFormSetError<T>,
  error: unknown,
  fieldMap: Partial<Record<string, Path<T>>>,
  fallback?: Path<T>
): boolean => {
  if (!isApiError(error) || error.code !== 'VALIDATION_FAILED') {
    return false;
  }
  if (typeof error.error !== 'object' || error.error === null) {
    return false;
  }

  const fieldErrors = error.error as Record<string, string>;
  Object.entries(fieldErrors).forEach(([apiField, message]) => {
    const formField = fieldMap[apiField];
    if (formField) {
      setError(formField, { message });
    } else if (fallback) {
      setError(fallback, { message });
    }
  });
  return true;
};
