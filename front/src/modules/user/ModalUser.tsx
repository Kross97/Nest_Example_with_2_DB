import cn from './User.module.scss';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { FetchAgent } from '../../FetchService';
import { IUser, IUSerRequest } from './types';

interface IProps {
  user: IUSerRequest | null;
  showEditHandler: (user: IUSerRequest | null) => void;
}


export const ModalUser = ({ user, showEditHandler }: IProps) => {
  const [data, setUser] = useState<IUSerRequest | null>({} as IUSerRequest);
  const [roles, setRoles] = useState<{ id: number; role: string }[]>([]);

  useEffect(() => {
    FetchAgent.getRequest({ url: '/user/allRoles' }).then((roles) => {
      setRoles(roles);
    });
  }, []);

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

  const changeRole = (e: ChangeEvent<HTMLSelectElement>) => {
    //@ts-ignore
    setUser((prev) => ({ ...prev, ['role']: roles.find((role) => role.id == e.target.value) }));
  };

  const submitUser = () => {
    void FetchAgent.putRequest({
      url: `/user/update/${data?.id}`,
      body: {
        nameFirst: data?.nameFirst,
        nameLast: data?.nameLast,
        login: data?.login,
        password: data?.password,
        role: data?.role,
      },
      requestType: 'json',
    });
  };

  const changeFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i])
      }
     void FetchAgent.putRequest({ url: `/user/update/photos/${data?.id}`, body: formData})
    }
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
      <span>Фотографии</span>
      <input onChange={changeFiles} type={'file'} multiple />
      <span>Роли</span>
      <select onChange={changeRole}>
        {roles.map((role) => <option key={role.id} value={role.id}>{role.role}</option>)}
      </select>
      <span>Пароль</span>
      <input onChange={change} type={'password'} name={'password'} value={data?.password} />
      <button onClick={submitUser}>Обновить пользователя</button>
    </div>
  </> : <></>;
};