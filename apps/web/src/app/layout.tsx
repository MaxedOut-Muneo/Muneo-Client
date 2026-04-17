import { lightTheme } from '@muneo/design-system';
import '@muneo/design-system/styles/global.css';
import 'pretendard/dist/web/variable/pretendardvariable.min.css';
import { type Metadata } from 'next';
import { QueryProvider } from './providers/QueryProvider';
import './globals.css';

export const metadata: Metadata = {
  title: '문어 - 문제 없는 시공을 위한 어시스턴트',
  description: 'RAG 기반 인테리어 시공 의사결정 도우미 솔루션',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko" className={lightTheme}>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
