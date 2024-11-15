import React, {  useContext, useEffect, useState } from 'react';
import { JWT_TOKEN_LOCAL_STORAGE } from './constants';
import { EventEmitterAgent, EventsDictionary } from '../EventEmitter';

interface IAllContext {
  token: string | null;
  setToken: (token: string | null) => void;
}

const AllContext = React.createContext<IAllContext>({
  token: null,
  setToken: () => {}
});


export const AllProvider = ({ children }: { children: JSX.Element })  => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(JWT_TOKEN_LOCAL_STORAGE) || null);

  useEffect(() => {
    const unAuthHandler = () => {
      setToken(null);
      localStorage.removeItem(JWT_TOKEN_LOCAL_STORAGE);
    };
    EventEmitterAgent.add(EventsDictionary.unAuthorized, unAuthHandler);
    return () => {
      EventEmitterAgent.remove(EventsDictionary.unAuthorized, unAuthHandler);
    };
  }, []);

  const setTokenHandler = (token: string | null) => {
    token ? localStorage.setItem(JWT_TOKEN_LOCAL_STORAGE, token) : localStorage.removeItem(JWT_TOKEN_LOCAL_STORAGE);
    setToken(token);
  }

  return <AllContext.Provider
    value={{ token, setToken: setTokenHandler }}>
    {children}
  </AllContext.Provider>;
};

export const getTokenJwt = () => localStorage.getItem(JWT_TOKEN_LOCAL_STORAGE);

export const useAllContext = () => useContext(AllContext);