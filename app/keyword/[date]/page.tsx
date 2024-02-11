import KeywordList from '@/component/keyword/keyword-list';
import Summary from '@/component/keyword/summary';
import { getKeywords } from '@/lib/client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'cozo | 키워드',
};

export default async function KeywordPage({ params }: Readonly<{ params: { date: string } }>) {
  const keywords = await getKeywords(params.date);

  return (
    <>
      <Summary dateString={params.date} keywords={keywords.result} />
      <KeywordList keywords={keywords.result.item} />
    </>
  );
}
