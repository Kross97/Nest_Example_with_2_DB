import cn from './User.module.scss';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { FetchAgent } from '../FetchService';
import { IUser, IUSerRequest } from './types';

interface IProps {
  user: IUSerRequest | null;
  showEditHandler: (user: IUSerRequest | null) => void;
}

export const ModalUser = ({ user, showEditHandler }: IProps) => {
  const [data, setUser] = useState<IUSerRequest | null>({} as IUSerRequest);


  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    const nameField = e.target.name;
    const value = e.target.value;
    setUser((prev) => ({ ...prev, [nameField]: value } as IUSerRequest));
  };


  const submitUser = () => {
    void FetchAgent.putRequest({
      url: `/user/update/${data?.id}`,
      body: JSON.stringify({
        nameFirst: data?.nameFirst,
        nameLast: data?.nameLast,
        login: data?.login,
        password: data?.password,
      }),
      requestType: 'json'
    });
  };

  return !!user ? <>
    <div className={cn.backdrop} onClick={() => showEditHandler(null)} />
    <div className={cn.formUserModal}>
      <span>Name</span>
      <input onChange={change} type={'text'} name={'nameFirst'} value={data?.nameFirst} />
      <span>LastName</span>
      <input onChange={change} type={'text'} name={'nameLast'} value={data?.nameLast} />
      <span>Логин</span>
      <input onChange={change} type={'text'} name={'login'} value={data?.login} />
      <span>Пароль</span>
      <input onChange={change} type={'password'} name={'password'} value={data?.password} />
      <button onClick={submitUser}>Обновить пользователя</button>
    </div>
  </> : <></>;
};