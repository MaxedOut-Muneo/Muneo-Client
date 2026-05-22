import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ProfileCard } from './ProfileCard';
import { type ProfileUser } from '../../_types/profile.types';

const USER: ProfileUser = {
  signupType: 'self',
  initial: '김',
  name: '김민수',
  role: '일반 사용자',
  email: 'kim@example.com',
  phone: '010-0000-0000',
  birth: '1990-01-01',
};

describe('ProfileCard', () => {
  it('opens withdraw confirmation modal', async () => {
    const user = userEvent.setup();

    render(<ProfileCard user={USER} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '회원 탈퇴' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('회원탈퇴 하시겠습니까?')).toBeInTheDocument();
  });
});
