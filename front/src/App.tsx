import React from 'react';
import './App.css';
import { PhotoBlock } from './modules/photos';
import { UserBlock } from './modules/user';
import { AuthBlock } from './modules/auth';
import {  useAllContext } from './provider/AllProvider';

function App() {
  const { token } = useAllContext();

  return (
      <div style={{ display: 'flex'}}>
        {token && <PhotoBlock />}
        {token && <UserBlock />}
        {!token && <AuthBlock />}
      </div>

  );
}

export default App;
