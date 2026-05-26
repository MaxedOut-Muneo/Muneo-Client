import { useState } from 'react';
import { useUsersQuery, type AuthProvider, type UserListParams, type UserRole } from '@/api';

export const PAGE_SIZE = 10;

export type BooleanFilter = 'all' | 'true' | 'false';

export interface FilterState {
  keyword: string;
  role: UserRole | 'all';
  deleted: BooleanFilter;
  authProvider: AuthProvider | 'all';
  emailVerified: BooleanFilter;
  profileCompleted: BooleanFilter;
}

export const DEFAULT_FILTERS: FilterState = {
  keyword: '',
  role: 'all',
  deleted: 'all',
  authProvider: 'all',
  emailVerified: 'all',
  profileCompleted: 'all',
};

const toParam = (value: BooleanFilter): boolean | undefined => (value === 'all' ? undefined : value === 'true');

const buildParams = (filters: FilterState, page: number): UserListParams => ({
  page,
  size: PAGE_SIZE,
  keyword: filters.keyword.trim() || undefined,
  role: filters.role === 'all' ? undefined : filters.role,
  deleted: toParam(filters.deleted),
  authProvider: filters.authProvider === 'all' ? undefined : filters.authProvider,
  emailVerified: toParam(filters.emailVerified),
  profileCompleted: toParam(filters.profileCompleted),
});

export const useUsersFilters = () => {
  const [draft, setDraft] = useState<FilterState>(DEFAULT_FILTERS);
  const [applied, setApplied] = useState<FilterState>(DEFAULT_FILTERS);
  const [page, setPage] = useState(0);

  const query = useUsersQuery(buildParams(applied, page));

  const apply = () => {
    setApplied(draft);
    setPage(0);
  };

  const reset = () => {
    setDraft(DEFAULT_FILTERS);
    setApplied(DEFAULT_FILTERS);
    setPage(0);
  };

  const prevPage = () => setPage((p) => Math.max(0, p - 1));
  const nextPage = () => setPage((p) => p + 1);

  return { draft, setDraft, query, apply, reset, prevPage, nextPage };
};
