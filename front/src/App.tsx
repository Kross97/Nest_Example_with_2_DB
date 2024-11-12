import React from 'react';
import './App.css';
import { PhotoBlock } from './photos';
import { UserBlock } from './user';


function App() {

  return (
    <div style={{ display: 'flex'}}>
      <PhotoBlock />
      <UserBlock />
    </div>
  );
}

export default App;
