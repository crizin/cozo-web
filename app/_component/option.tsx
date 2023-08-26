'use client';

import { GlobalVariableContext } from '@/app/_component/global-variable-context';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect } from 'react';
import styles from './option.module.scss';

export default function Option({ newWindow }: { newWindow: boolean }) {
  const { state, dispatch } = useContext(GlobalVariableContext);

  useEffect(() => {
    dispatch(newWindow ? 'USE_NEW_WINDOW' : 'USE_SELF_WINDOW');
  }, [newWindow, dispatch]);

  useEffect(() => {
    document.cookie = 'open_new_window=' + (state.useNewWindow ? 1 : 0) + '; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/';
  }, [state]);

  const checked = typeof window === 'undefined' ? newWindow : state.useNewWindow;

  return (
    <div className={`${styles.option} ${checked ? styles.checked : styles.unchecked}`}>
      <label onClick={() => dispatch('TOGGLE_NEW_WINDOW')}>
        <FontAwesomeIcon icon={checked ? faToggleOn : faToggleOff} size="lg" className={styles.icon} /> 새 창으로 링크 열기
      </label>
    </div>
  );
}
