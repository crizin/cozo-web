import ArticleList from '@/app/_component/link/article-list';
import LinkItem from '@/app/_component/link/link-item';
import { Link, Page } from '@/app/_lib/model';

export default function LinkList({ links }: Readonly<{ links: Page<Link[], number> }>) {
  return (
    <>
      {links.item.map((link) => (
        <div key={link.id}>
          <LinkItem link={link} />
          {link.articles && <ArticleList articles={link.articles} />}
        </div>
      ))}
    </>
  );
}
