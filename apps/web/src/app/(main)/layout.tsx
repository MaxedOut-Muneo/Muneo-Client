import { redirect } from 'next/navigation';
import { type ReactNode } from 'react';
import { getServerMe } from '@/api/user/server';
import { SidebarShell } from './_components/SidebarShell';
import * as styles from './layout.css';

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getServerMe().catch(() => null);
  if (!user) {
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
