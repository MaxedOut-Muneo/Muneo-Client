'use client';

import { Sidebar, type SidebarNavId } from '@muneo/design-system';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode } from 'react';
import * as styles from './layout.css';

const NAV_TO_PATH: Record<SidebarNavId, string> = {
  home: '/home',
  estimate: '/estimate',
  risk: '/risk',
  history: '/history',
  settings: '/settings',
};

const MOCK_USER = { name: '김민수', email: 'minsu@email.com' };

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const activeItem =
    (Object.entries(NAV_TO_PATH).find(([, path]) => pathname.startsWith(path))?.[0] as SidebarNavId) ?? 'home';

  return (
    <div className={styles.wrapper}>
      <Sidebar activeItem={activeItem} onItemClick={(id) => router.push(NAV_TO_PATH[id])} user={MOCK_USER} />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
