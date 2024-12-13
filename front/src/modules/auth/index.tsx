import cn from './Auth.module.scss';
import React, { ChangeEvent,  useState } from 'react';
import { FetchAgent } from '../../FetchService';
import { useAllContext } from '../../provider/AllProvider';


export const AuthBlock = () => {
  const [data, setUser] = useState<Record<string, string>>({});

  const { setToken, setCurrentPortHandler } = useAllContext();

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    const nameField = e.target.name;
    const value = e.target.value;
    setUser((prev) => ({ ...prev, [nameField]: value }));
  };

  const signIn = async () => {
     const tokenData = await FetchAgent.postRequest<{ token: string; currentPort: number}>({ url: 'auth/signIn', requestType: 'json', body: data });
     console.log('tokenData =>', tokenData)
     setToken(tokenData.token);
     setCurrentPortHandler(tokenData.currentPort);
  };

  return <div className={cn.authBlock}>
    <h3>Авторизация</h3>
    <span>Логин</span>
    <input onChange={change} type={'text'} name={'login'} value={data.login}/>
    <span>Пароль</span>
    <input onChange={change} type={'password'} name={'password'} value={data.password}/>
    <button onClick={signIn}>Войти</button>
  </div>;
};