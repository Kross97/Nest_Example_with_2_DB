import React from 'react';
import './App.css';
import { PhotoBlock } from './modules/photos';
import { UserBlock } from './modules/user';
import { AuthBlock } from './modules/auth';
import {  useAllContext } from './provider/AllProvider';
import { CryptoBlock } from './modules/crypto';

function App() {
  const { token, setToken } = useAllContext();

  const exitHandler = () => {
    setToken(null);
  };

  return (
    <>
      {token && <button onClick={exitHandler} style={{ position: 'fixed', top: '50px', right: '50px'}}>exit</button>}
      <div style={{ display: 'flex'}}>
        {token && <PhotoBlock />}
        {token && <UserBlock />}
        {token && <CryptoBlock />}
        {!token && <AuthBlock />}
      </div>
    </>
  );
}

export default App;
