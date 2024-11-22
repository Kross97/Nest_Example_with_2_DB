import cn from './Crypto.module.scss';
import React, { useEffect, useState } from 'react';
import { FetchAgent } from '../../FetchService';


export const CryptoBlock = () => {
  const [search, setSearch] = useState('');
  const [cipherData, setCipherData] = useState('');
  const [deCipherData, setDeCipherData] = useState('');

  const [dataSign, setDataSign] = useState('');

  const cipherHandler = async () => {
   const res = await FetchAgent.postRequest({ url: 'crypto/cipher1', body: search})
   setCipherData(res);
  };

  const signHandler = async () => {
    const res = await FetchAgent.postRequest({ url: 'crypto/testSign1', body: dataSign });
    await FetchAgent.postRequest({ url:  'crypto/testVerify1', body: { text: dataSign, signature:res }, requestType: 'json'})
  };

  const deCipherHandler = async () => {
    const res = await FetchAgent.postRequest({ url: 'crypto/decipher1', body: cipherData })
    setDeCipherData(res);
  };

  return  <div style={{ display: 'flex', columnGap: '10px'}}>
    <div className={cn.cryptoBlock}>
      <h3>Модуль для работы с шифрованием (Crypto node.js)</h3>
      <h4>Шифрование и де-шифрование данных</h4>
      <label className={cn.column}>
        Данные для шифрования <b>(класс Cipher node)</b>
        <input type={'text'} value={search} onChange={(e) => setSearch(e.target.value)} />
      </label>
      <div className={cn.column}>
        <span>Данные после шифрования <b>(класс Decipher node)</b></span>
        <span>{cipherData}</span>
      </div>
      <div className={cn.column}>
        <span>Данные после де-шифрования</span>
        <span>{deCipherData}</span>
      </div>
      <button onClick={cipherHandler}>шифровать</button>
      <button onClick={deCipherHandler}>де-шифровать</button>
    </div>
    <div className={cn.cryptoSignBlock}>
      <h3>Модуль для работы с подписями (Sign, Verify node.js)</h3>
      <h4>Подпись и проверка данных</h4>
      <label className={cn.column}>
        Данные для подписи <b>(класс Sign, Verify node)</b>
        <input type={'text'} value={dataSign} onChange={(e) => setDataSign(e.target.value)} />
      </label>
      <button onClick={signHandler}>тест подписи</button>
    </div>
  </div>
};