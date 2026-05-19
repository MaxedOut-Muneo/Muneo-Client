import { redirect } from 'next/navigation';
import { type ReactNode } from 'react';
import { getServerMe } from '@/api/user';
import { SidebarShell } from './_components/SidebarShell';
import * as styles from './layout.css';

const MainLayout = async ({ children }: { children: ReactNode }) => {
  let user;
  try {
    user = await getServerMe();
  } catch {
    redirect('/login');
  }

  return (
    <div className={styles.wrapper}>
      <SidebarShell className={styles.sidebar} user={user} />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default MainLayout;
