import ExternalImage from '@/app/_component/fragment/external-image';
import Favicon from '@/app/_component/fragment/favicon';
import { Link } from '@/app/_lib/model';
import Utils from '@/app/_lib/utils';
import styles from './link-item.module.scss';

export default function LinkItem({ link }: { link: Link }) {
  return (
    <a href={link.url} rel="nofollow" className={styles.link}>
      <span className={`${styles.title} ellipsis`}>
        <Favicon faviconUrl={link.faviconUrl} size={16} />
        {link.title ? link.title : Utils.decorateUrl(link.url)}
      </span>
      {link.thumbnailUrl && <ExternalImage className="thumbnail" width={103} height={58} src={link.thumbnailUrl} />}
      <span className={styles.description}>{link.description}</span>
      <span className="clear" />
    </a>
  );
}
