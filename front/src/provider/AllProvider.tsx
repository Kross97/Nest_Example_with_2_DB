import React, { useContext, useEffect, useState } from "react";
import { EventEmitterAgent, EventsDictionary } from "../EventEmitter";
import { AUTH_LOCAL_STORAGE_KEYS } from "../common/constants";
import { FetchAgent } from "../FetchService";
import { TPortsConfigTopics, TPortsConfigPlatforms, TTypesDataBases } from "./types";

interface IAllContext {
  token: string | null;
  setToken: (token: string | null) => void;
  setCurrentPortHandler: (newPort?: number) => void;
  currentPort: string | number | null;
  setTypeDbHandler: (typeDb: IAllContext["typeDb"]) => void;
  changeConfigPorts: (partialConfig: { key: string; type: TPortsConfigPlatforms }) => void;
  portsConfigs: Record<TPortsConfigTopics, number>;
  typeDb: TTypesDataBases;
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
  typeDb: "postgres",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTypeDbHandler: (type) => {},
  changeConfigPorts: () => {},
  portsConfigs: {} as Record<TPortsConfigTopics, number>,
});

const dispatcherPorts: Record<"express" | "nest", number> = {
  nest: 3001,
  express: 3002,
};

/**
 * Конфигурация портов для разных разделов для перенаправления на порты разных платформ (express | nest)
 * */
const configPorts: Record<TPortsConfigTopics, number> = {
  user: dispatcherPorts.nest,
};

export function AllProvider({ children }: { children: JSX.Element }) {
  const [typeDb, setTypeDb] = useState<IAllContext["typeDb"]>("postgres");
  const [portsConfigs, setPortsConfig] = useState({ ...configPorts });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(AUTH_LOCAL_STORAGE_KEYS.JWT_TOKEN_AUTH_DATA) || null);
  const [currentPort, setCurrentPort] = useState<string | number | null>(
    () => localStorage.getItem(AUTH_LOCAL_STORAGE_KEYS.CLUSTER_PORT_DATA) || FetchAgent.backPort
  );

  useEffect(() => {
    const unAuthHandler = () => {
      setToken(null);
      FetchAgent.rollBackPort();
      Object.values(AUTH_LOCAL_STORAGE_KEYS).forEach((authKey) => localStorage.removeItem(authKey));
      // window.location.reload();
    };
    EventEmitterAgent.add(EventsDictionary.unAuthorized, unAuthHandler);
    return () => {
      EventEmitterAgent.remove(EventsDictionary.unAuthorized, unAuthHandler);
    };
  }, []);

  useEffect(() => {
    FetchAgent.portsConfig = portsConfigs;
  }, [portsConfigs]);

  const setCurrentPortHandler = async (newPort?: number) => {
    let idPort: number = newPort || -1;
    if (!newPort) {
      const results = await FetchAgent.getRequest<IPortsData>({
        url: "/childProcess_cluster/cluster_ports",
      });
      idPort = results.currentPort;
    }
    setCurrentPort(idPort);
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEYS.CLUSTER_PORT_DATA, String(idPort));
    FetchAgent.setBackPort(idPort);
    // window.location.reload();
  };

  const setTypeDbHandler = (typeDb: "postgres" | "mongo") => {
    setTypeDb(typeDb);
    FetchAgent.typeDb = typeDb;
  };

  const setTokenHandler = (token: string | null) => {
    token
      ? localStorage.setItem(AUTH_LOCAL_STORAGE_KEYS.JWT_TOKEN_AUTH_DATA, token)
      : localStorage.removeItem(AUTH_LOCAL_STORAGE_KEYS.JWT_TOKEN_AUTH_DATA);
    setToken(token);
  };

  const changeConfigPorts = (partialConfig: { key: string; type: "express" | "nest" }) => {
    const { key, type } = partialConfig;
    setPortsConfig((prev) => ({ ...prev, [key]: dispatcherPorts[type] }));
  };

  return (
    <AllContext.Provider
      value={{
        token,
        setToken: setTokenHandler,
        setCurrentPortHandler,
        currentPort,
        setTypeDbHandler,
        typeDb,
        changeConfigPorts,
        portsConfigs,
      }}
    >
      {children}
    </AllContext.Provider>
  );
}

export const getTokenJwt = () => localStorage.getItem(AUTH_LOCAL_STORAGE_KEYS.JWT_TOKEN_AUTH_DATA);

export const getCurrentClusterPort = () => localStorage.getItem(AUTH_LOCAL_STORAGE_KEYS.CLUSTER_PORT_DATA);

export const useAllContext = () => useContext(AllContext);
