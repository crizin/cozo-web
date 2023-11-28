import Footer from '@/app/_component/footer';
import GlobalVariableContextProvider from '@/app/_component/global-variable-context';
import Header from '@/app/_component/header';
import Option from '@/app/_component/option';
import { getBoards } from '@/app/_lib/client';
import { config as faConfig } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Metadata, Viewport } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { cookies, headers } from 'next/headers';
import Script from 'next/script';
import 'normalize.css';
import { ReactNode } from 'react';
import './globals.scss';
import styles from './layout.module.scss';

const font = Noto_Sans_KR({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-noto-sans-kr' });

faConfig.autoAddCss = false;

export const metadata: Metadata = {
  metadataBase: new URL('https://cozo.me'),
  title: 'cozo',
  description: '유명 커뮤니티들의 인기 게시글을 한 곳에서',
  applicationName: 'cozo',
  openGraph: {
    type: 'website',
    title: 'cozo',
    siteName: 'cozo',
    description: '유명 커뮤니티들의 인기 게시글을 한 곳에서',
  },
};

export const viewport: Viewport = {
  themeColor: [
    {
      media: '(prefers-color-scheme: light)',
      color: '#d3541e',
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: '#a23b10',
    },
  ],
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const boards = await getBoards();
  const cookieStore = cookies();
  const nonce = headers().get('X-Nonce') as string;
  const useNewWindow = cookieStore.get('open_new_window')?.value === '1';

  return (
    <html lang="ko">
      <head>
        <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="cozo" />
        {process.env.GA_TRACKING_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`} />
            <Script id="google-analytics" nonce={nonce}>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag() { dataLayer.push(arguments); }
                gtag('js', new Date());
                gtag('config', '${process.env.GA_TRACKING_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${styles.font} ${font.variable}`}>
        <GlobalVariableContextProvider useNewWindow={useNewWindow}>
          <div className={styles.container}>
            <div className={styles.header}>
              <Header boards={boards.result} />
            </div>
            <main className={styles.content}>{children}</main>
            <div className={styles.footer}>
              <Footer />
            </div>
          </div>
          <Option newWindow={useNewWindow} />
        </GlobalVariableContextProvider>
      </body>
    </html>
  );
}
