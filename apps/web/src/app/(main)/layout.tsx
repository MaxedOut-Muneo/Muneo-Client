'use client';

import { Sidebar, type SidebarNavId } from '@muneo/design-system';
import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';
import { logout } from '@/api/auth';
import { useViewTransitionRouter } from '@/hooks/useViewTransitionRouter';
import { useAuthStore } from '@/store/authStore';
import * as styles from './layout.css';

const NAV_TO_PATH = {
  home: '/home',
  estimate: '/estimate',
  risk: '/analysis',
  history: '/history',
  profile: '/profile',
} satisfies Record<SidebarNavId, string>;

const NAV_IDS = Object.keys(NAV_TO_PATH) as SidebarNavId[];

const MainLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { push, prefetch } = useViewTransitionRouter();
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);

  const activeItem =
    NAV_IDS.find((id) => {
      const path = NAV_TO_PATH[id];
      return pathname === path || pathname.startsWith(`${path}/`);
    }) ?? 'home';

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
        className={styles.sidebar}
        activeItem={activeItem}
        onItemClick={(id) => push(NAV_TO_PATH[id])}
        onItemHover={(id) => prefetch(NAV_TO_PATH[id])}
        onLogout={handleLogout}
        user={user ?? { name: '', email: '' }}
      />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default MainLayout;
