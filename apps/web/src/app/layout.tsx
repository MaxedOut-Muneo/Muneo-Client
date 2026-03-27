import { QueryProvider } from './providers/QueryProvider';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '문어 - 문제 없는 시공을 위한 어시스턴트',
  description: 'RAG 기반 인테리어 시공 의사결정 도우미 솔루션',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
