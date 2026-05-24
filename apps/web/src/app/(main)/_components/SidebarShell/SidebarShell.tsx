'use client';

import { Sidebar, type SidebarNavId } from '@muneo/design-system';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '@/api/user';
import { useViewTransitionRouter } from '@/hooks/useViewTransitionRouter';
import { type AuthUser } from '@/types/auth';

interface SidebarShellProps {
  className?: string;
  user: AuthUser;
}

const NAV_TO_PATH = {
  home: '/home',
  estimate: '/estimate',
  risk: '/analysis',
  history: '/history',
  profile: '/profile',
} satisfies Record<SidebarNavId, string>;

const NAV_IDS = Object.keys(NAV_TO_PATH) as SidebarNavId[];

export const SidebarShell = ({ className, user }: SidebarShellProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { push, prefetch } = useViewTransitionRouter();

  const activeItem =
    NAV_IDS.find((id) => {
      const path = NAV_TO_PATH[id];
      return pathname === path || pathname.startsWith(`${path}/`);
    }) ?? 'home';

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('로그아웃 API 오류:', err);
    }
    router.refresh();
    window.location.href = '/';
  };

  return (
    <Sidebar
      className={className}
      activeItem={activeItem}
      onItemClick={(id) => push(NAV_TO_PATH[id])}
      onItemHover={(id) => prefetch(NAV_TO_PATH[id])}
      onLogout={handleLogout}
      user={user}
    />
  );
};
