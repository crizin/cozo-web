'use client';

import ExternalImage from '@/component/fragment/external-image';
import Favicon from '@/component/fragment/favicon';
import { GlobalVariableContext } from '@/component/global-variable-context';
import { Link } from '@/lib/model';
import Utils from '@/lib/utils';
import { useContext } from 'react';
import styles from './link-item.module.scss';

export default function LinkItem({ link }: Readonly<{ link: Link }>) {
  const { state } = useContext(GlobalVariableContext);

  return (
    <a href={link.url} rel="nofollow" className={styles.link} target={state.useNewWindow ? '_blank' : '_self'}>
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
