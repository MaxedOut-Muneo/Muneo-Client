'use client';

import { type ReactNode } from 'react';
import ColumnUpFillIcon from '../../assets/icons/ColumnUpFillIcon';
import DellSquareIcon from '../../assets/icons/DellSquareIcon';
import HomeFillIcon from '../../assets/icons/HomeFillIcon';
import Logo from '../../assets/icons/Logo';
import SearchIcon from '../../assets/icons/SearchIcon';
import SettingFillIcon from '../../assets/icons/SettingFillIcon';
import {
  avatar,
  logoutButton,
  logoArea,
  navIcon,
  navIndicator,
  navIndicatorActive,
  navItemContent,
  navItemWrapper,
  navList,
  sidebar,
  tagline,
  topSection,
  userCard,
  userEmailStyle,
  userInfo,
  userNameStyle,
} from './Sidebar.css';

export type SidebarNavId = 'home' | 'estimate' | 'risk' | 'history' | 'profile';

export interface SidebarUser {
  name: string;
  email: string;
}

export interface SidebarProps {
  activeItem?: SidebarNavId;
  onItemClick?: (id: SidebarNavId) => void;
  onItemHover?: (id: SidebarNavId) => void;
  onLogout?: () => void;
  user?: SidebarUser;
  className?: string;
}

interface NavItemDef {
  id: SidebarNavId;
  label: string;
  icon: ReactNode;
}

const NAV_ITEMS: NavItemDef[] = [
  { id: 'home', label: '홈', icon: <HomeFillIcon /> },
  { id: 'estimate', label: '가견적서 생성', icon: <DellSquareIcon /> },
  { id: 'risk', label: '리스크 진단', icon: <SearchIcon /> },
  { id: 'history', label: '분석 이력', icon: <ColumnUpFillIcon /> },
  { id: 'profile', label: '내 정보', icon: <SettingFillIcon /> },
];

export const Sidebar = ({ activeItem, onItemClick, onItemHover, onLogout, user, className }: SidebarProps) => {
  return (
    <aside className={`${sidebar}${className ? ` ${className}` : ''}`}>
      <div className={topSection}>
        <div className={logoArea}>
          <span className={tagline}>문제없는 시공을 위한 어시스턴트</span>
          <Logo width={99} height={32} />
        </div>

        <nav className={navList}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <div key={item.id} className={navItemWrapper}>
                <div className={`${navIndicator}${isActive ? ` ${navIndicatorActive}` : ''}`} />
                <button
                  type="button"
                  className={navItemContent({ active: isActive })}
                  onClick={() => onItemClick?.(item.id)}
                  onMouseEnter={() => onItemHover?.(item.id)}
                  onFocus={() => onItemHover?.(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={navIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </div>
            );
          })}
        </nav>
      </div>

      {user && (
        <div className={userCard}>
          <div className={avatar}>{user.name.trim()[0] ?? user.email[0] ?? '?'}</div>
          <div className={userInfo}>
            <p className={userNameStyle}>{user.name}</p>
            <p className={userEmailStyle}>{user.email}</p>
          </div>
          {onLogout && (
            <button type="button" className={logoutButton} onClick={onLogout} aria-label="로그아웃">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          )}
        </div>
      )}
    </aside>
  );
};
