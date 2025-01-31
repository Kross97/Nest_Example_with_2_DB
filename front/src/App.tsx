import React from "react";
import "./App.css";
import { PhotoBlock } from "./modules/photos";
import { UserBlock } from "./modules/user";
import { AuthBlock } from "./modules/auth";
import { useAllContext } from "./provider/AllProvider";
import { ClusterBlock } from "./modules/cluster";
// @ts-ignore
import { CryptoBlock } from "./modules/crypto";
import { EventEmitterAgent, EventsDictionary } from "./EventEmitter";

export function FullApp() {
  const { token, typeDb, setTypeDbHandler, portsConfigs } = useAllContext();

  const exitHandler = () => {
    EventEmitterAgent.emit(EventsDictionary.unAuthorized);
  };

  return (
    <>
      {token && (
        <button onClick={exitHandler} style={{ position: "fixed", top: "50px", right: "50px" }}>
          exit
        </button>
      )}
      {token && (
        <select
          onChange={(e) => {
            setTypeDbHandler(e.target.value as "postgres" | "mongo");
          }}
        >
          <option value="postgres">postgres</option>
          <option value="mongo">mongo</option>
        </select>
      )}
      {/**
          Для размонтирования и триггера всех запросов в зависимости от базы данных (postgres | mongo)
       */}
      <div key={typeDb} style={{ display: "flex", flexWrap: "wrap" }}>
        {token && <ClusterBlock />}
        <div style={{ display: "flex" }}>
          {token && <PhotoBlock />}
          {/**
              Для размонтирования и триггера всех запросов в зависимости от платформы (express | nest)
           */}
          {token && <UserBlock key={portsConfigs.user} />}
        </div>
        {token && <CryptoBlock />}
        {!token && <AuthBlock />}
      </div>
    </>
  );
}
