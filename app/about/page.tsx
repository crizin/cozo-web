import Message from '@/app/_component/about/message';
import Favicon from '@/app/_component/fragment/favicon';
import { Metadata } from 'next';
import { ReCaptchaProvider } from 'next-recaptcha-v3';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'cozo | 소개',
};

export default async function AboutPage() {
  return (
    <div className={styles.about}>
      <div>
        <h3>소개</h3>
        <p>유명한 여러 커뮤니티 사이트의 게시판들에서 사람들이 많이 관심을 가지고 있는 게시글들을 수집해 모아 보여주는 사이트입니다.</p>
      </div>
      <div>
        <h3>개발</h3>
        <p>이 사이트의 소스코드는 GitHub에 공개되어 있습니다. 기술적인 내용이 궁금하다면 방문해보세요.</p>
        <p>
          <Favicon faviconUrl="https://github.githubassets.com/favicons/favicon.svg" size={16} className={styles.favicon} />
          <a href="https://github.com/crizin/cozo-api">Backend API</a> / <Favicon faviconUrl="https://github.githubassets.com/favicons/favicon.svg" size={16} className={styles.favicon} />
          <a href="https://github.com/crizin/cozo-web">Web Client</a>
        </p>
      </div>
      <ReCaptchaProvider reCaptchaKey={process.env.RECAPTCHA_SITE_KEY}>
        <Message />
      </ReCaptchaProvider>
    </div>
  );
}
