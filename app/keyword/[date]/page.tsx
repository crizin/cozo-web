import KeywordList from '@/component/keyword/keyword-list';
import Summary from '@/component/keyword/summary';
import { getKeywords } from '@/lib/client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'cozo | 키워드'
};

export default async function KeywordPage({ params }: Readonly<{ params: Promise<{ date: string }> }>) {
  const { date } = await params;
  const keywords = await getKeywords(date);

  return (
    <>
      <Summary dateString={date} keywords={keywords.result} />
      <KeywordList keywords={keywords.result.item} />
    </>
  );
}
