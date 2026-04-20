import { lightTheme } from '@muneo/design-system';
import '@muneo/design-system/styles/global.css';
import { type Metadata } from 'next';
import localFont from 'next/font/local';
import { QueryProvider } from './providers/QueryProvider';
import './globals.css';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '45 920',
});

const paperlogy = localFont({
  src: [
    { path: './fonts/Paperlogy-1Thin.ttf', weight: '100' },
    { path: './fonts/Paperlogy-2ExtraLight.ttf', weight: '200' },
    { path: './fonts/Paperlogy-3Light.ttf', weight: '300' },
    { path: './fonts/Paperlogy-4Regular.ttf', weight: '400' },
    { path: './fonts/Paperlogy-5Medium.ttf', weight: '500' },
    { path: './fonts/Paperlogy-6SemiBold.ttf', weight: '600' },
    { path: './fonts/Paperlogy-7Bold.ttf', weight: '700' },
    { path: './fonts/Paperlogy-8ExtraBold.ttf', weight: '800' },
    { path: './fonts/Paperlogy-9Black.ttf', weight: '900' },
  ],
  variable: '--font-paperlogy',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '문어 - 문제 없는 시공을 위한 어시스턴트',
  description: 'RAG 기반 인테리어 시공 의사결정 도우미 솔루션',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="ko"
      className={`${lightTheme} ${pretendard.variable} ${paperlogy.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
