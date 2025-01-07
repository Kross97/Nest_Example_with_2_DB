import React, {  useContext, useEffect, useState } from 'react';
import { EventEmitterAgent, EventsDictionary } from '../EventEmitter';
import { AUTH_LOCAL_STORAGE_KEYS } from '../common/constants';
import { FetchAgent } from '../FetchService';

interface IAllContext {
  token: string | null;
  setToken: (token: string | null) => void;
  setCurrentPortHandler: (newPort?: number) => void;
  currentPort: string | number | null;
}

export interface IPortsData {
  availablePorts: number[];
  currentPort: number;
}

const AllContext = React.createContext<IAllContext>({
  token: null,
  setToken: () => {},
  setCurrentPortHandler: () => {},
  currentPort: 0,
});


export const AllProvider = ({ children }: { children: JSX.Element })  => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(AUTH_LOCAL_STORAGE_KEYS.JWT_TOKEN_AUTH_DATA) || null);
  const [currentPort, setCurrentPort] = useState<string | number | null>(() => localStorage.getItem(AUTH_LOCAL_STORAGE_KEYS.CLUSTER_PORT_DATA) || FetchAgent.backPort);

  console.log("Provider token", token);
  useEffect(() => {
    const unAuthHandler = () => {
      setToken(null);
      FetchAgent.rollBackPort();
      Object.values(AUTH_LOCAL_STORAGE_KEYS).forEach((authKey) => localStorage.removeItem(authKey))
      // window.location.reload();
    };
    EventEmitterAgent.add(EventsDictionary.unAuthorized, unAuthHandler);
    return () => {
      EventEmitterAgent.remove(EventsDictionary.unAuthorized, unAuthHandler);
    };
  }, []);

  const setCurrentPortHandler = async (newPort?: number) => {
    let idPort: number = newPort || -1;
    if(!newPort) {
      const results = await FetchAgent.getRequest<IPortsData>({ url: '/childProcess_cluster/cluster_ports' });
      idPort = results.currentPort;
    }
    setCurrentPort(idPort);
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEYS.CLUSTER_PORT_DATA, String(idPort));
    FetchAgent.setBackPort(idPort);
    // window.location.reload();
  }

  const setTokenHandler = (token: string | null) => {
    console.log('provider', token);
    token ? localStorage.setItem(AUTH_LOCAL_STORAGE_KEYS.JWT_TOKEN_AUTH_DATA, token) : localStorage.removeItem(AUTH_LOCAL_STORAGE_KEYS.JWT_TOKEN_AUTH_DATA);
    setToken(token);
  }

  return <AllContext.Provider
    value={{ token, setToken: setTokenHandler, setCurrentPortHandler,  currentPort }}>
    {children}
  </AllContext.Provider>;
};

export const getTokenJwt = () => localStorage.getItem(AUTH_LOCAL_STORAGE_KEYS.JWT_TOKEN_AUTH_DATA);

export const getCurrentClusterPort = () => localStorage.getItem(AUTH_LOCAL_STORAGE_KEYS.CLUSTER_PORT_DATA);

export const useAllContext = () => useContext(AllContext);