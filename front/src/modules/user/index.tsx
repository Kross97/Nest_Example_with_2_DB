import cn from './User.module.scss';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { FetchAgent } from '../../FetchService';
import { IUser, IUSerRequest } from './types';
import { ModalUser } from './ModalUser';


export const UserBlock = () => {
  const [userEdit, setUserEdit] = useState<IUSerRequest | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [data, setUser] = useState<Record<string, string>>({});

  const showEditHandler = (user: IUSerRequest | null) => setUserEdit(user);

  useEffect(() => {
    FetchAgent.getRequest({ url: '/user/all' }).then((results) => {
      setUsers(results);
    });
  }, []);

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    const nameField = e.target.name;
    const value = e.target.value;
    setUser((prev) => ({ ...prev, [nameField]: value }));
  };

  const submitUser = async () => {
    await FetchAgent.postRequest({ url: '/user/create', body: data, requestType: 'json' });
  };

  const refreshUsers = async () => {
    await FetchAgent.getRequest({ url: '/user/refresh' });
  };

  return <>
    <ModalUser user={userEdit} showEditHandler={showEditHandler} />
    <div className={cn.userBlock}>
      <div className={cn.formUser}>
        <span>Name</span>
        <input onChange={change} type={'text'} name={'nameFirst'} value={data.nameFirst} />
        <span>LastName</span>
        <input onChange={change} type={'text'} name={'nameLast'} value={data.nameLast}/>
        <span>Логин</span>
        <input onChange={change} type={'text'} name={'login'} value={data.login}/>
        <span>Пароль</span>
        <input onChange={change} type={'password'} name={'password'} value={data.password}/>
        <button onClick={submitUser}>Создать пользователя</button>
      </div>
      <button onClick={refreshUsers}>рефреш_логинов</button>
      <div className={cn.listUsers}>
        {users.map((userList) => <div>
          <span>{`${userList.name.first} ${userList.name.last}`}</span>
          <button onClick={() => showEditHandler({
            nameFirst: userList.name.first,
            nameLast: userList.name.last,
            login: userList.login,
            password: userList.password,
            id: userList.id,
            role: userList.role
          })}>изменить
          </button>
        </div>)}
      </div>
    </div>
  </>;
};