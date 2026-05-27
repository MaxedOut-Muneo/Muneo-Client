import { useNavigate } from 'react-router';
import { ROUTES } from '@/constants/routes';
import { UserFilters } from './components/UserFilters';
import { UsersTable } from './components/UsersTable';
import { useUsersFilters } from './hooks/useUsersFilters';
import * as styles from './UsersList.css';

export const UsersList = () => {
  const navigate = useNavigate();
  const { draft, setDraft, query, apply, reset, prevPage, nextPage } = useUsersFilters();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>사용자 관리</h1>
        <span className={styles.subtitle}>가입한 사용자를 검색·필터링하고 정보를 관리합니다.</span>
      </header>

      <UserFilters draft={draft} onChange={setDraft} onApply={apply} onReset={reset} />

      {query.isError && (
        <div className={styles.errorBox}>
          {query.error instanceof Error ? query.error.message : '목록을 불러오지 못했습니다.'}
        </div>
      )}

      <UsersTable
        data={query.data}
        isLoading={query.isLoading}
        onRowClick={(id) => navigate(ROUTES.userDetail(id))}
        onPrevPage={prevPage}
        onNextPage={nextPage}
      />
    </div>
  );
};
