import ExternalImage from '@/app/_component/fragment/external-image';
import Favicon from '@/app/_component/fragment/favicon';
import { Link } from '@/app/_lib/model';
import Utils from '@/app/_lib/utils';
import styles from './link-item.module.scss';

interface Props {
  link: Link;
}

export default function LinkItem({ link }: Props) {
  return (
    <a href={link.url} rel="nofollow" className={styles.link}>
      {link.thumbnailUrl && <ExternalImage className="thumbnail" width={90} height={51} src={link.thumbnailUrl} />}
      {link.title && <span className="ellipsis">{link.title}</span>}
      <span className={`${styles.url} ellipsis`}>
        <Favicon linkUrl={link.url} size={12} />
        {Utils.decorateUrl(link.url)}
      </span>
      <span className="clear" />
    </a>
  );
}
