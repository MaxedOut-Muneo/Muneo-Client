import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  ApiError,
  useUserQuery,
  useChangeUserRole,
  useDeleteUser,
  useRestoreUser,
  useUpdateUser,
  type UpdateUserRequest,
  type UserRole,
} from '@/api';
import { ROUTES } from '@/constants/routes';
import { updateUserSchema, zodIssuesToFieldErrors } from '@/lib/userSchema';
import { useToast } from '@/providers/ToastProvider';
import { useAuthStore } from '@/store/authStore';

export type FormErrors = Partial<Record<keyof UpdateUserRequest, string>>;

export type ConfirmKind = 'delete' | 'restore' | 'role';

const EMPTY_FORM: UpdateUserRequest = {
  email: '',
  name: '',
  phoneNumber: '',
  birthDate: '',
};

export const useUserDetail = () => {
  const navigate = useNavigate();
  const params = useParams<{ userId: string }>();
  const userId = Number(params.userId);

  const { showToast } = useToast();
  const currentAdmin = useAuthStore((s) => s.admin);
  const isSelf = currentAdmin?.id === userId;

  const detail = useUserQuery(userId);
  const updateMutation = useUpdateUser(userId);
  const deleteMutation = useDeleteUser();
  const restoreMutation = useRestoreUser();
  const roleMutation = useChangeUserRole(userId);

  const [form, setForm] = useState<UpdateUserRequest>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [pendingRole, setPendingRole] = useState<UserRole | null>(null);
  const [confirm, setConfirm] = useState<ConfirmKind | null>(null);

  useEffect(() => {
    if (detail.data) {
      setForm({
        email: detail.data.email,
        name: detail.data.name,
        phoneNumber: detail.data.phoneNumber,
        birthDate: detail.data.birthDate,
      });
    }
  }, [detail.data]);

  const submitForm = () => {
    const parsed = updateUserSchema.safeParse(form);
    if (!parsed.success) {
      setErrors(zodIssuesToFieldErrors<keyof UpdateUserRequest>(parsed.error.issues));
      return;
    }
    setErrors({});
    updateMutation.mutate(parsed.data, {
      onSuccess: () => showToast('사용자 정보를 수정했습니다.', 'success'),
      onError: (error) => {
        if (error instanceof ApiError && error.fields) {
          setErrors(error.fields as FormErrors);
        } else if (error instanceof Error) {
          showToast(error.message, 'error');
        }
      },
    });
  };

  const closeConfirm = () => {
    setConfirm(null);
    setPendingRole(null);
  };

  const runConfirmedAction = () => {
    if (confirm === 'delete') {
      deleteMutation.mutate(userId, {
        onSuccess: () => {
          closeConfirm();
          showToast('사용자를 탈퇴 처리했습니다.', 'success');
          navigate(ROUTES.users);
        },
        onError: (error) => {
          closeConfirm();
          showToast(error instanceof Error ? error.message : '탈퇴 처리에 실패했습니다.', 'error');
        },
      });
      return;
    }
    if (confirm === 'restore') {
      restoreMutation.mutate(userId, {
        onSuccess: () => {
          closeConfirm();
          showToast('사용자를 복구했습니다.', 'success');
        },
        onError: (error) => {
          closeConfirm();
          showToast(error instanceof Error ? error.message : '복구에 실패했습니다.', 'error');
        },
      });
      return;
    }
    if (confirm === 'role' && pendingRole) {
      roleMutation.mutate(
        { role: pendingRole },
        {
          onSuccess: () => {
            closeConfirm();
            showToast('사용자 권한을 변경했습니다.', 'success');
          },
          onError: (error) => {
            closeConfirm();
            showToast(error instanceof Error ? error.message : '권한 변경에 실패했습니다.', 'error');
          },
        }
      );
    }
  };

  return {
    userId,
    detail,
    user: detail.data,
    isSelf,
    form,
    setForm,
    errors,
    submitForm,
    isSubmitting: updateMutation.isPending,
    pendingRole,
    setPendingRole,
    confirm,
    setConfirm,
    closeConfirm,
    runConfirmedAction,
    goBack: () => navigate(ROUTES.users),
  };
};
