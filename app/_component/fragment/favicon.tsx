'use client';

import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

import { useEffect, useState } from 'react';
import styles from './favicon.module.scss';

interface Props {
  className?: string;
  size: number;
  linkUrl: string;
}

export default function Favicon({ className, size, linkUrl }: Props) {
  const [imgSrc, setImgSrc] = useState<string>();
  const [loadingFailed, setLoadingFailed] = useState(false);

  useEffect(() => {
    try {
      const faviconUrl = getFaviconUrl(linkUrl);
      if (faviconUrl) {
        setImgSrc(faviconUrl);
      }
    } catch (e) {}
  }, [linkUrl]);

  return loadingFailed ? (
    <FontAwesomeIcon icon={faPaperclip} className={`${styles.favicon} ${className}`} width={size} height={size} />
  ) : (
    imgSrc && (
      <Image src={imgSrc} className={`${styles.favicon} ${className}`} alt="" width={size} height={size} quality={100} onError={() => setLoadingFailed(true)} />
    )
  );
}

const faviconMap: { [key: string]: string } = {
  'biz.chosun.com': 'https://biz.chosun.com/pf/resources/icons/favicon_chosun.png?d=242',
  'bobaedream.co.kr': 'https://image.bobaedream.co.kr/bobae.ico',
  'chosun.com': 'https://www.chosun.com/pf/resources/icons/favicon_chosun.png?d=1181',
  'clien.net': 'https://www.clien.net/service/image/favicon.ico',
  'edaily.co.kr': 'https://www.edaily.co.kr/v2/images/favicon.ico',
  'entertain.naver.com': 'https://ssl.pstatic.net/static.news/image/news/2014/favicon/favicon.ico',
  'fnnews.com': 'https://www.fnnews.com/resources/images/icon2020/favicon-96x96.png',
  'hankookilbo.com': 'https://www.hankookilbo.com/images/favicon.ico',
  'imnews.imbc.com': 'https://image.imnews.imbc.com/page/include/images/favicon.ico',
  'insight.co.kr': 'https://www.insight.co.kr/_assets/favicon/favicon.ico',
  'khan.co.kr': 'https://img.khan.co.kr/spko/icon/favicon.ico',
  'mindlenews.com': 'https://cdn.mindlenews.com/image/logo/favicon.png',
  'mnews.jtbc.co.kr': 'https://nstatic.jtbc.co.kr/favicon_2023/news/favicon-32x32.png',
  'news.nate.com': 'https://m.news.nate.com/icon/favicon.ico',
  'newspim.com': 'https://img.newspim.com/m/mweb/favicon_72X72V2.png',
  'theqoo.net': 'https://theqoo.net/files/attach/xeicon/favicon.ico',
  'v.daum.net': 'https://t1.daumcdn.net/top/favicon.ico',
  'wikitree.co.kr': 'https://cdnweb01.wikitree.co.kr/webdata/editor/_common/favicon.png',
  'ytn.co.kr': 'https://ytn.co.kr/img/comm/favicon.ico',
};

function getFaviconUrl(linkUrl: string) {
  let url;

  try {
    url = new URL(linkUrl);
  } catch (e) {
    return null;
  }

  const hostname = url.hostname.replace(/^(www|m)\./, '');

  if (hostname in faviconMap) {
    return faviconMap[hostname];
  } else {
    return `${url.origin}/favicon.ico`;
  }
}
