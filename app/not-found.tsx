import ErrorPage from '@/app/_component/error-page';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'cozo | 존재하지 않는 페이지',
};

export default function NotFoundPage() {
  return (
    <ErrorPage title="존재하지 않는 페이지" icon={faBan}>
      처음 보는 URL이네요 😲
      <br />
      어쩌다 여기까지 오셨어요?
    </ErrorPage>
  );
}
