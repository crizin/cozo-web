import KeywordList from '@/component/keyword/keyword-list';
import Summary from '@/component/keyword/summary';
import { getKeywordLastDate, getKeywords } from '@/lib/client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'cozo | 키워드'
};

export default async function KeywordPage() {
  const date = (await getKeywordLastDate()).result;
  const keywords = await getKeywords(date);

  return (
    <>
      <Summary dateString={date} keywords={keywords.result} />
      <KeywordList keywords={keywords.result.item} />
    </>
  );
}
