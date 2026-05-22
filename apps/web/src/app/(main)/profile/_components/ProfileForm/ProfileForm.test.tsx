import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ProfileForm } from './ProfileForm';
import { type ProfileUser } from '../../_types/profile.types';

const SELF_USER: ProfileUser = {
  signupType: 'self',
  initial: '김',
  name: '김민수',
  role: '일반 사용자',
  email: 'kim@example.com',
  phone: '010-0000-0000',
  birth: '1990-01-01',
};

const KAKAO_USER: ProfileUser = {
  signupType: 'social',
  provider: 'kakao',
  initial: '김',
  name: '김민수',
  role: '일반 사용자',
  email: 'kim@example.com',
  phone: '010-0000-0000',
  birth: '1990-01-01',
};

describe('ProfileForm', () => {
  describe('자체 회원가입 변형', () => {
    it('이메일/이름/생년월일/연락처/새 비밀번호/비밀번호 확인 필드를 모두 렌더한다', () => {
      render(<ProfileForm user={SELF_USER} />);
      expect(screen.getByLabelText('이메일')).toBeInTheDocument();
      expect(screen.getByLabelText('이름')).toBeInTheDocument();
      expect(screen.getByLabelText('생년월일')).toBeInTheDocument();
      expect(screen.getByLabelText('연락처')).toBeInTheDocument();
      expect(screen.getByLabelText('새 비밀번호')).toBeInTheDocument();
      expect(screen.getByLabelText('비밀번호 확인')).toBeInTheDocument();
    });

    it('카카오 로그인 뱃지를 렌더하지 않는다', () => {
      render(<ProfileForm user={SELF_USER} />);
      expect(screen.queryByText('카카오 로그인')).not.toBeInTheDocument();
    });

    it('user의 이메일이 초기 값으로 채워진다', () => {
      render(<ProfileForm user={SELF_USER} />);
      expect((screen.getByLabelText('이메일') as HTMLInputElement).value).toBe(SELF_USER.email);
    });

    it('이메일 필드는 disabled 상태이다', () => {
      render(<ProfileForm user={SELF_USER} />);
      expect(screen.getByLabelText('이메일')).toBeDisabled();
    });

    it('입력 변경 시 value 상태가 업데이트된다', async () => {
      const user = userEvent.setup();
      render(<ProfileForm user={SELF_USER} />);
      const nameInput = screen.getByLabelText('이름');
      await user.clear(nameInput);
      await user.type(nameInput, '이영희');
      expect((nameInput as HTMLInputElement).value).toBe('이영희');
    });
  });

  describe('소셜 로그인 변형 (kakao)', () => {
    it('이메일 자리에 카카오 로그인 뱃지를 렌더한다', () => {
      render(<ProfileForm user={KAKAO_USER} />);
      expect(screen.getByText('카카오 로그인')).toBeInTheDocument();
      expect(screen.queryByLabelText('이메일')).not.toBeInTheDocument();
    });

    it('비밀번호 관련 필드를 렌더하지 않는다', () => {
      render(<ProfileForm user={KAKAO_USER} />);
      expect(screen.queryByLabelText('새 비밀번호')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('비밀번호 확인')).not.toBeInTheDocument();
    });

    it('이름/생년월일/연락처 필드는 렌더한다', () => {
      render(<ProfileForm user={KAKAO_USER} />);
      expect(screen.getByLabelText('이름')).toBeInTheDocument();
      expect(screen.getByLabelText('생년월일')).toBeInTheDocument();
      expect(screen.getByLabelText('연락처')).toBeInTheDocument();
    });
  });

  it('저장하기 버튼이 submit 타입으로 렌더된다', () => {
    render(<ProfileForm user={SELF_USER} />);
    const button = screen.getByRole('button', { name: '저장하기' });
    expect(button).toHaveAttribute('type', 'submit');
  });
});
