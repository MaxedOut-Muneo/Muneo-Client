'use client';

import { Sidebar, type SidebarNavId } from '@muneo/design-system';
import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';
import { useViewTransitionRouter } from '@/hooks/useViewTransitionRouter';
import * as styles from './layout.css';

const NAV_TO_PATH = {
  home: '/home',
  estimate: '/estimate',
  risk: '/analysis',
  history: '/history',
  profile: '/profile',
} satisfies Record<SidebarNavId, string>;

const NAV_IDS = Object.keys(NAV_TO_PATH) as SidebarNavId[];

const MOCK_USER = { name: '김민수', email: 'minsu@email.com' };

const MainLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { push, prefetch } = useViewTransitionRouter();

  const activeItem =
    NAV_IDS.find((id) => {
      const path = NAV_TO_PATH[id];
      return pathname === path || pathname.startsWith(`${path}/`);
    }) ?? 'home';

  return (
    <div className={styles.wrapper}>
      <Sidebar
        className={styles.sidebar}
        activeItem={activeItem}
        onItemClick={(id) => push(NAV_TO_PATH[id])}
        onItemHover={(id) => prefetch(NAV_TO_PATH[id])}
        user={MOCK_USER}
      />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default MainLayout;
