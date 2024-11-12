import cn from './User.module.scss';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { FetchAgent } from '../FetchService';
import { IUser } from './types';
import { ModalUser } from './ModalUser';


export const UserBlock = () => {
  const [userEdit, setUserEdit] = useState<IUser | null>(null)
  const [users, setUsers] = useState<IUser[]>([]);
  const [data, setUser] = useState({});

  const showEditHandler = (user: IUser | null) => setUserEdit(user);

  useEffect(() => {
    FetchAgent.getRequest({ url: '/user/all'}).then((results) => {
      setUsers(results);
    })
  }, []);

  const change = (e: ChangeEvent<HTMLInputElement>) => {
   const nameField = e.target.name;
   const value = e.target.value;
   setUser((prev) => ({...prev, [nameField]: value }));
  };

  const submitUser = async () => {
    await FetchAgent.postRequest({ url: '/user/create', body: data })
    setUser({});
  }

  const refreshUsers = async () => {
    await FetchAgent.getRequest({ url: '/user/refresh'})
  };

  return <>
  <ModalUser user={userEdit} showEditHandler={showEditHandler}/>
    <div className={cn.userBlock}>
      <div className={cn.formUser}>
        <span>Name</span>
        <input onChange={change} type={'text'} name={'name'} />
        <span>Логин</span>
        <input onChange={change} type={'text'} name={'login'} />
        <span>Пароль</span>
        <input onChange={change} type={'password'} name={'password'}/>
        <button onClick={submitUser}>Создать пользователя</button>
      </div>
      <button onClick={refreshUsers}>рефреш_логинов</button>
      <div style={{ display: 'flex', rowGap: '12px', flexDirection: 'column'}}>
        {users.map((userList) => <div>
          <span>{`${userList.name.first} ${userList.name.last}`}</span>
          <button onClick={() => showEditHandler(userList)}>изменить</button>
        </div>)}
      </div>
    </div>
  </>
};