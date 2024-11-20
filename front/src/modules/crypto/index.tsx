import cn from './Crypto.module.scss';
import React, { useEffect, useState } from 'react';
import { FetchAgent } from '../../FetchService';


export const CryptoBlock = () => {
  const [search, setSearch] = useState('');
  const [cipherData, setCipherData] = useState('');
  const [deCipherData, setDeCipherData] = useState('');


  const cipherHandler = async () => {
   const res = await FetchAgent.postRequest({ url: 'crypto/cipher1', body: search})
   setCipherData(res);
  };

  const deCipherHandler = async () => {
    const res = await FetchAgent.postRequest({ url: 'crypto/decipher1', body: cipherData })
    setDeCipherData(res);
  };

  return  <div className={cn.cryptoBlock}>
    <h3>Модуль для работы с шифрованием (Crypto node.js)</h3>
    <h4>Шифрование и де-шифрование данных</h4>
    <label className={cn.column}>
      Данные для шифрования
      <input type={'text'} value={search} onChange={(e) => setSearch(e.target.value)} />
    </label>
    <div className={cn.column}>
      <span>Данные после шифрования</span>
      <span>{cipherData}</span>
    </div>
    <div className={cn.column}>
      <span>Данные после де-шифрования</span>
      <span>{deCipherData}</span>
    </div>
    <button onClick={cipherHandler}>шифровать</button>
    <button onClick={deCipherHandler}>де-шифровать</button>
  </div>
};