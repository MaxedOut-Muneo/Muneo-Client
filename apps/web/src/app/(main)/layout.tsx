'use client';

import { Sidebar, type SidebarNavId } from '@muneo/design-system';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode } from 'react';
import { logout } from '@/api/auth';
import { useAuthStore } from '@/store/authStore';
import * as styles from './layout.css';

const NAV_TO_PATH: Record<SidebarNavId, string> = {
  home: '/home',
  estimate: '/estimate',
  risk: '/analysis',
  history: '/history',
  settings: '/settings',
};

const MainLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);

  const activeItem =
    (Object.entries(NAV_TO_PATH).find(([, path]) => pathname.startsWith(path))?.[0] as SidebarNavId) ?? 'home';

  const handleLogout = async () => {
    await logout().catch((err) => {
      console.error('로그아웃 API 오류:', err);
    });
    clearUser();
    window.location.href = '/';
  };

  return (
    <div className={styles.wrapper}>
      <Sidebar
        activeItem={activeItem}
        onItemClick={(id) => router.push(NAV_TO_PATH[id])}
        onItemHover={(id) => router.prefetch(NAV_TO_PATH[id])}
        onLogout={handleLogout}
        user={user ?? { name: '', email: '' }}
      />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default MainLayout;
