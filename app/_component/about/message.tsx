'use client';

import { faCircleNotch, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './message.module.scss';

export default function Message({ nonce, turnstileSiteKey }: Readonly<{ nonce: string; turnstileSiteKey: string }>) {
  const form = useForm();
  const [token, setToken] = useState<string>();
  const [sending, setSending] = useState(false);
  const turnstile = React.useRef<TurnstileInstance>();

  const onSubmit = async (data: any) => {
    if (!token) {
      alert('로봇 확인을 완료해주세요');
      return;
    }

    setSending(true);

    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/send-message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `token=${encodeURIComponent(token)}&message=${encodeURIComponent(data.message)}`,
    })
      .then(async (response) => {
        const json = await response.json();
        if (json.error === false) {
          alert('메시지가 전송되었습니다.');
        } else {
          alert(json.errorMessage ?? '메시지 전송을 못했어요. 조금만 있다가 다시 해주세요.');
        }
      })
      .catch((e) => {
        alert('메시지 전송을 못했어요. 조금만 있다가 다시 해주세요.');
        console.error(e);
      })
      .finally(() => {
        setSending(false);
        setToken(undefined);
        turnstile.current?.reset();
      });
  };

  return (
    <div>
      <h3>메시지 남기기</h3>
      <p>
        게시글 삭제 요청은 원본 게시글을 삭제한 뒤 URL을 남겨주세요.
        <br />
        답장받을 메일 주소를 같이 남겨주시면 처리 후 결과를 알려드리겠습니다.
        <br />그 외 건의 사항은 주셔도 괜찮지만 답장은 보장하지 않습니다.
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <textarea rows={5} placeholder="내용을 입력해주세요" {...form.register('message', { required: true })}></textarea>
        <Turnstile siteKey={turnstileSiteKey} className={styles.turnstile} ref={turnstile} onSuccess={setToken} nonce={nonce} />
        <button type="submit" className={`button ${styles.button}`} disabled={sending || !token}>
          {sending ? (
            <span>
              <FontAwesomeIcon icon={faCircleNotch} spin={true} /> 전송 중...
            </span>
          ) : (
            <span>
              <FontAwesomeIcon icon={faComment} /> 보내기
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
