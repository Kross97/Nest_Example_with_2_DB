import cn from './User.module.scss';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { FetchAgent } from '../FetchService';
import { IUser } from './types';

interface IProps {
  user: IUser | null;
  showEditHandler: (user: IUser | null) => void;
}

export const ModalUser = ({ user, showEditHandler }: IProps) => {
  const [data, setUser] = useState<IUser | null>(user);

  console.log('data =>', data);

  useEffect(() => {
    if(user) {
      setUser(user);
    }
  }, [user]);

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    const nameField = e.target.name;
    const value = e.target.value;
    if(nameField === 'name') {
      //@ts-ignore
       setUser((prev) => ({...prev, name: {...prev?.name, first: value }}))
    } else {
      //@ts-ignore
      setUser((prev) => ({ ...prev, [nameField]: value }));
    }
    };


  const submitUser = () => {
    void FetchAgent.putRequest({ url: `/user/update/${data?.id}`, body: { name: data?.name, login: data?.login, password: data?.password}})
  }

  return !!user ? <>
  <div className={cn.backdrop} onClick={() => showEditHandler(null)}/>
    <div className={cn.formUserModal}>
      <span>Name</span>
      <input onChange={change} type={'text'} name={'name'} value={data?.name.first || ''} />
      <span>Логин</span>
      <input onChange={change} type={'text'} name={'login'} value={data?.login} />
      <span>Пароль</span>
      <input onChange={change} type={'password'} name={'password'} value={data?.password}/>
      <button onClick={submitUser}>Обновить пользователя</button>
    </div>
  </> : <></>
};