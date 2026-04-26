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

export type SidebarNavId = 'home' | 'estimate' | 'risk' | 'history' | 'settings';

export interface SidebarUser {
  name: string;
  email: string;
}

export interface SidebarProps {
  activeItem?: SidebarNavId;
  onItemClick?: (id: SidebarNavId) => void;
  user?: SidebarUser;
  className?: string;
  visibleItems?: SidebarNavId[];
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
  { id: 'settings', label: '내 정보', icon: <SettingFillIcon /> },
];

export const Sidebar = ({ activeItem, onItemClick, user, className, visibleItems }: SidebarProps) => {
  const items = visibleItems ? NAV_ITEMS.filter((item) => visibleItems.includes(item.id)) : NAV_ITEMS;
  return (
    <aside className={`${sidebar}${className ? ` ${className}` : ''}`}>
      <div className={topSection}>
        <div className={logoArea}>
          <span className={tagline}>문제없는 시공을 위한 어시스턴트</span>
          <Logo width={99} height={32} />
        </div>

        <nav className={navList}>
          {items.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <div key={item.id} className={navItemWrapper}>
                <div className={`${navIndicator}${isActive ? ` ${navIndicatorActive}` : ''}`} />
                <button
                  type="button"
                  className={navItemContent({ active: isActive })}
                  onClick={() => onItemClick?.(item.id)}
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
        </div>
      )}
    </aside>
  );
};
