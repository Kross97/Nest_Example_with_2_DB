import cn from './User.module.scss';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { FetchAgent } from '../../FetchService';
import { IUser, IUSerRequest } from './types';
import { ModalUser } from './ModalUser';


type TKeysUser = 'password' | 'login' | 'nameLast' | 'nameFirst';

export const UserBlock = () => {
  const [userEdit, setUserEdit] = useState<IUSerRequest | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [data, setUser] = useState<Record<TKeysUser, string>>({} as Record<TKeysUser, string>);
  const [search, setSearch] = useState('');

  // файл для создания пользователя через formData
  const [fileUser, setFileUser] = useState<File | null>(null)

  const [refetchUsers, setRefetch] = useState(0);

  const showEditHandler = (user: IUSerRequest | null) => setUserEdit(user);


  useEffect(() => {
    FetchAgent.getRequest({ url: '/user/all', body: { search } }).then((results) => {
      setUsers(results || []);
    });
  }, [search, refetchUsers]);

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    const nameField = e.target.name;
    const value = e.target.value;
    setUser((prev) => ({ ...prev, [nameField]: value }));
  };

  const submitUser = async () => {
    await FetchAgent.postRequest({ url: '/user/create', body: data, requestType: 'json' });
  };

  const submitUserFormData =  async () => {
    const formData = new FormData();
    formData.set('login', data.login);
    formData.set('password', data.password);
    // formData.set('nameLast', data.nameLast);
    // formData.set('nameFirst', data.nameFirst);
    fileUser && formData.set('file', fileUser)
    await FetchAgent.postRequest({ url: '/user/createFormData', body: formData });
  }

  const refreshUsers = async () => {
    await FetchAgent.getRequest({ url: '/user/refresh' });
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const deleteUSer = async (id: number) => {
    await FetchAgent.deleteRequest({ url: `user/delete/${id}`});
    setRefetch(Date.now());
  };

  const changeUserFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file) {
      setFileUser(file);
    }
  };

  return <>
    <ModalUser user={userEdit} showEditHandler={showEditHandler} />
    <div className={cn.userBlock}>
      <div className={cn.formUser}>
        <label>
          Поиск
          <input type={'text'} onChange={changeHandler} />
        </label>
        <span>Name</span>
        <input onChange={change} type={'text'} name={'nameFirst'} value={data.nameFirst} />
        <span>LastName</span>
        <input onChange={change} type={'text'} name={'nameLast'} value={data.nameLast} />
        <span>Логин</span>
        <input onChange={change} type={'text'} name={'login'} value={data.login} />
        <span>Пароль</span>
        <input onChange={change} type={'password'} name={'password'} value={data.password} />
        <button onClick={submitUser}>Создать пользователя</button>
        <label>
          Фото для пользователя (через formData)
          <input onChange={changeUserFile} type={'file'} />
        </label>
        <button onClick={submitUserFormData}>Создать пользователя_(через_formData)</button>
      </div>
      <button onClick={refreshUsers}>рефреш_логинов</button>
      <div className={cn.listUsers}>
        {users?.map((userList) => <div>
          <span>{`${userList.name.first} ${userList.name.last}`}</span>
          <button onClick={() => showEditHandler({
            nameFirst: userList.name.first,
            nameLast: userList.name.last,
            login: userList.login,
            password: userList.password,
            id: userList.id,
            role: userList.role,
          })}>изменить
          </button>
          <button onClick={() => deleteUSer(userList.id)}>удалить</button>
        </div>)}
      </div>
    </div>
  </>;
};