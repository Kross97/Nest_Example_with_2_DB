import React from 'react';
import './App.css';
import { PhotoBlock } from './modules/photos';
import { UserBlock } from './modules/user';
import { AuthBlock } from './modules/auth';
import {  useAllContext } from './provider/AllProvider';
import { ClusterBlock } from './modules/cluster';
//@ts-ignore
import { CryptoBlock } from './modules/crypto';
import { EventEmitterAgent, EventsDictionary } from './EventEmitter';

export function FullApp() {
  const { token } = useAllContext();
  console.log('token =>', token);
  const exitHandler = () => {
    EventEmitterAgent.emit(EventsDictionary.unAuthorized);
  };

  return (
    <>
      {token && <button onClick={exitHandler} style={{ position: 'fixed', top: '50px', right: '50px'}}>exit</button>}
      <div style={{ display: 'flex', flexWrap: 'wrap'}}>
        {token && <ClusterBlock /> }
        <div style={{ display: 'flex'}}>
          {token && <PhotoBlock />}
          {token && <UserBlock />}
        </div>
        {token && <CryptoBlock />}
        {!token && <AuthBlock />}
      </div>
    </>
  );
}

