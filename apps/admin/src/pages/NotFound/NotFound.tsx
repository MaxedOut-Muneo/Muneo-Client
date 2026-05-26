import { Button } from '@muneo/design-system';
import { Link } from 'react-router';
import { ROUTES } from '@/constants/routes';

export const NotFound = () => (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '24px',
    }}
  >
    <p style={{ fontSize: '120px', fontWeight: 900, lineHeight: 1, color: '#0F62FE', margin: 0 }}>404</p>
    <h1 style={{ fontSize: '22px', fontWeight: 700, margin: '20px 0 10px', color: '#0F172A' }}>
      페이지를 찾을 수 없습니다
    </h1>
    <p style={{ fontSize: '14px', color: '#64748B', margin: '0 0 36px', lineHeight: 1.6 }}>
      요청하신 페이지가 존재하지 않거나 이동되었습니다.
    </p>
    <Button as={Link} to={ROUTES.users} variant="primary" size="md">
      홈으로 돌아가기
    </Button>
  </div>
);
