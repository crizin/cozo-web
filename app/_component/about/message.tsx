'use client';

import { faCircleNotch, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useReCaptcha } from 'next-recaptcha-v3';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './message.module.scss';

export default function Message() {
  const form = useForm();
  const { executeRecaptcha } = useReCaptcha();
  const [sending, setSending] = useState(false);

  const onSubmit = async (data: any) => {
    setSending(true);

    const token = await executeRecaptcha('message');

    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/send-message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `token=${encodeURIComponent(token)}&message=${encodeURIComponent(data.message)}`,
    })
      .then(async (response) => {
        setSending(false);
        const json = await response.json();
        if (json.error === false) {
          alert('메시지가 전송되었습니다.');
        } else {
          alert(json.errorMessage ?? '메시지 전송을 못했어요. 조금만 있다가 다시 해주세요.');
        }
      })
      .catch((e) => {
        setSending(false);
        alert('메시지 전송을 못했어요. 조금만 있다가 다시 해주세요.');
        console.error(e);
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
        <div className={styles['recaptcha-branding']}>
          이 사이트는 reCAPTCHA로 보호되며 Google <a href="https://policies.google.com/privacy">개인정보처리방침</a> 및{' '}
          <a href="https://policies.google.com/terms">서비스 약관</a>이 적용됩니다.
        </div>
        <button type="submit" className="button" disabled={sending}>
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
