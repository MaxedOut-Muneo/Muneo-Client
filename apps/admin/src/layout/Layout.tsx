import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import * as styles from './Layout.css';

export const Layout = () => (
  <div className={styles.shell}>
    <Sidebar />
    <main className={styles.main}>
      <Outlet />
    </main>
  </div>
);
