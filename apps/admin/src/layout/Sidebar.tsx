import { NavLink, useNavigate } from 'react-router';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/authStore';
import * as styles from './Sidebar.css';

interface NavItem {
  to: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [{ to: ROUTES.users, label: '사용자 관리' }];

export const Sidebar = () => {
  const admin = useAuthStore((s) => s.admin);
  const clear = useAuthStore((s) => s.clear);
  const navigate = useNavigate();

  const handleLogout = () => {
    clear();
    navigate(ROUTES.login, { replace: true });
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>문어 Admin</div>

      <nav>
        <ul className={styles.navList}>
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => (isActive ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {admin && (
        <div className={styles.userBlock}>
          <span className={styles.userName}>{admin.name}</span>
          <span className={styles.userEmail}>{admin.email}</span>
          <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      )}
    </aside>
  );
};
