'use client';

import ExternalImage from '@/app/_component/fragment/external-image';
import Favicon from '@/app/_component/fragment/favicon';
import { GlobalVariableContext } from '@/app/_component/global-variable-context';
import { Link } from '@/app/_lib/model';
import Utils from '@/app/_lib/utils';
import { useContext } from 'react';
import styles from './link-item.module.scss';

interface Props {
  readonly link: Link;
}

export default function LinkItem({ link }: Props) {
  const { state } = useContext(GlobalVariableContext);

  return (
    <a href={link.url} rel="nofollow" className={styles.link} target={state.useNewWindow ? '_blank' : '_self'}>
      {link.thumbnailUrl && <ExternalImage className="thumbnail" width={90} height={51} src={link.thumbnailUrl} />}
      {link.title && <span className="ellipsis">{link.title}</span>}
      <span className={`${styles.url} ellipsis`}>
        <Favicon faviconUrl={link.faviconUrl} size={12} />
        {Utils.decorateUrl(link.url)}
      </span>
      <span className="clear" />
    </a>
  );
}
