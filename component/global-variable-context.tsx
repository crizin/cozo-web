'use client';

import Utils from '@/lib/utils';
import React, { createContext, Dispatch, useEffect, useMemo, useReducer } from 'react';

interface StateType {
  useMobileUrl: boolean;
  useNewWindow: boolean;
}

const initialState: StateType = {
  useMobileUrl: false,
  useNewWindow: false
};

const reducer = (state: StateType, action: string) => {
  switch (action) {
    case 'TOGGLE_NEW_WINDOW':
      return { ...state, useNewWindow: !state.useNewWindow };
    case 'USE_NEW_WINDOW':
      return { ...state, useNewWindow: true };
    case 'USE_SELF_WINDOW':
      return { ...state, useNewWindow: false };
    case 'USE_MOBILE_URL':
      return { ...state, useMobileUrl: true };
    case 'USE_PC_URL':
      return { ...state, useMobileUrl: false };
    default:
      return state;
  }
};

export const GlobalVariableContext = createContext<{
  state: StateType;
  dispatch: Dispatch<string>;
}>({ state: initialState, dispatch: () => null });

export default function GlobalVariableContextProvider({ useNewWindow, children }: Readonly<{ useNewWindow: boolean; children: React.ReactNode }>) {
  const [state, dispatch] = useReducer(reducer, { ...initialState, useNewWindow });
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  useEffect(() => {
    const handleResize = () => dispatch(Utils.isMobileView() ? 'USE_MOBILE_URL' : 'USE_PC_URL');
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <GlobalVariableContext.Provider value={value}>{children}</GlobalVariableContext.Provider>;
}
