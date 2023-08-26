'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
  className?: string;
  width: number;
  height: number;
  src: string;
}

export default function ExternalImage({ className, width, height, src }: Props) {
  const [imgSrc, setImgSrc] = useState<string>('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
  const [loadingFailed, setLoadingFailed] = useState<boolean>();

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    !loadingFailed && (
      <Image src={imgSrc} alt="" width={width} height={height} className={className} unoptimized={true} onError={() => setLoadingFailed(true)} />
    )
  );
}
