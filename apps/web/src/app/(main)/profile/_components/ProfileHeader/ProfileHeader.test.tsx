import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProfileHeader } from './ProfileHeader';

describe('ProfileHeader', () => {
  it('initial, name, subtitle을 모두 렌더한다', () => {
    render(<ProfileHeader initial="김" name="김민수" subtitle="일반 사용자" />);
    expect(screen.getByText('김')).toBeInTheDocument();
    expect(screen.getByText('김민수')).toBeInTheDocument();
    expect(screen.getByText('일반 사용자')).toBeInTheDocument();
  });

  it('아바타는 장식 요소이므로 aria-hidden이 부여된다', () => {
    render(<ProfileHeader initial="박" name="박민수" subtitle="관리자" />);
    const avatar = screen.getByText('박');
    expect(avatar).toHaveAttribute('aria-hidden');
  });
});
