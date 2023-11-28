'use client';

import ErrorPage from '@/app/_component/error-page';
import { faBan, faBug } from '@fortawesome/free-solid-svg-icons';
import { Metadata } from 'next';
import { useEffect } from 'react';

export const metadata: Metadata = {
  title: 'cozo | 오류',
};

export default function GlobalErrorPage({ error, reset }: Readonly<{ error: Error; reset: () => void }>) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  if (error.message === 'BadRequest') {
    return (
      <ErrorPage title="잘못된 요청입니다" icon={faBan} reset={reset}>
        URL이 좀 이상하네요
        <br />
        혹시 로봇인가요? 🤖
      </ErrorPage>
    );
  }

  return (
    <ErrorPage title="서버 오류" icon={faBug} reset={reset}>
      뭔가 문제가 있나 보네요 😰
      <br />
      조금 기다렸다 다시 해보면 될 지도 모릅니다
    </ErrorPage>
  );
}
