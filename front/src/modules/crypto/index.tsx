import cn from './Crypto.module.scss';
import React, { useEffect } from 'react';
import { FetchAgent } from '../../FetchService';


export const CryptoBlock = () => {

  useEffect(() => {
    void FetchAgent.getRequest({ url: 'crypto/cipher1'});
    void FetchAgent.getRequest({ url: 'crypto/decipher1'})
  }, []);

  return  <div>crypto</div>
};