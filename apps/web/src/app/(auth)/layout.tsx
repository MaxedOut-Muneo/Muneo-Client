import { redirect } from 'next/navigation';
import { type ReactNode } from 'react';
import { getServerMe } from '@/api/user';

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const isLoggedIn = await getServerMe().then(
    () => true,
    () => false
  );
  if (isLoggedIn) {
    redirect('/home');
  }
  return <>{children}</>;
};

export default AuthLayout;
