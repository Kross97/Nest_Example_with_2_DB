import React, { ChangeEvent, useEffect, useState } from "react";
import cn from "./User.module.scss";
import { FetchAgent } from "../../FetchService";
import { IUser, IUSerRequest } from "./types";
import { ModalUser } from "./ModalUser";
import { ModalShowUser } from "./ModalShowUser";
import { useAllContext } from "../../provider/AllProvider";

type TKeysUser = "password" | "login" | "nameLast" | "nameFirst";

export function UserBlock() {
  const { changeConfigPorts } = useAllContext();
  const [userEdit, setUserEdit] = useState<IUSerRequest | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [data, setUser] = useState<Record<TKeysUser, string>>({} as Record<TKeysUser, string>);
  const [search, setSearch] = useState("");

  const [idUSerForShow, setIdShow] = useState<number | null>(null);

  // файл для создания пользователя через formData
  const [filesUser, setFilesUser] = useState<File[]>([]);

  const [refetchUsers, setRefetch] = useState(0);

  const showEditHandler = (user: IUSerRequest | null) => setUserEdit(user);

  useEffect(() => {
    FetchAgent.getRequest({ url: "/user/all", body: { search } }).then((results) => {
      setUsers(results || []);
    });
  }, [search, refetchUsers]);

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    const nameField = e.target.name;
    const value = e.target.value;
    setUser((prev) => ({ ...prev, [nameField]: value }));
  };

  const submitUser = async () => {
    await FetchAgent.postRequest({ url: "/user/create", body: data, requestType: "json" });
  };

  const submitUserFormData = async () => {
    const formData = new FormData();
    formData.set("login", data.login);
    formData.set("password", data.password);
    formData.set("nameLast", data.nameLast);
    formData.set("nameFirst", data.nameFirst);
    if (filesUser.length) {
      filesUser.forEach((file) => {
        formData.append("file", file);
      });
    }
    await FetchAgent.postRequest({ url: "/user/createFormData", body: formData });
  };

  const refreshUsers = async () => {
    await FetchAgent.getRequest({ url: "/user/refresh" });
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const deleteUSer = async (id: number) => {
    await FetchAgent.deleteRequest({ url: `user/delete/${id}` });
    setRefetch(Date.now());
  };

  const changeUserFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const arr = [];
      for (let i = 0; i < files.length; i++) {
        arr.push(files[i]);
      }
      setFilesUser(arr);
    }
  };

  return (
    <>
      <ModalUser user={userEdit} showEditHandler={showEditHandler} />
      {idUSerForShow && <ModalShowUser id={idUSerForShow} onClose={() => setIdShow(null)} />}
      <div className={cn.userBlock}>
        <select
          style={{ width: "200px", marginBottom: "20px" }}
          onChange={(e) => changeConfigPorts({ key: "user", type: e.target.value as "express" | "nest" })}
        >
          <option value={"express"}>express</option>
          <option value={"nest"}>nest</option>
        </select>
        <button style={{ marginBottom: "10px" }} onClick={refreshUsers}>
          рефреш_логинов
        </button>
        <div style={{ padding: "10px", border: "2px solid black", marginBottom: "14px" }}>
          <h3>Модуль для работы с пользователями (Сохранение и получение из БД)</h3>
          <h4>
            Работа с отношениями <br />
            1.один-к-одному, <br />
            2.многие-ко-многим, <br />
            3.один-ко-многим
          </h4>
          <div className={cn.formUser}>
            <span>Name</span>
            <input onChange={change} type="text" name="nameFirst" value={data.nameFirst} />
            <span>LastName</span>
            <input onChange={change} type="text" name="nameLast" value={data.nameLast} />
            <span>Логин</span>
            <input onChange={change} type="text" name="login" value={data.login} />
            <span>Пароль</span>
            <input onChange={change} type="password" name="password" value={data.password} />
            <div
              style={{
                border: "1px solid black",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                rowGap: "16px",
                textAlign: "center",
                marginBottom: "14px",
              }}
            >
              <b>
                Данный блок задействует создание <u>user</u> полностью через FormData <u>(и его кастомный парсинг на бэке)</u>
              </b>
              <b>вместе с множеством прикрепляемых фотографтий</b>
              <label>
                Фото для пользователя (через formData)
                <input onChange={changeUserFile} type="file" multiple />
              </label>
              <button onClick={submitUserFormData}>Создать пользователя_(через_formData)</button>
            </div>
            <button onClick={submitUser}>Создать пользователя_(через_json)</button>
          </div>
        </div>
        <label>
          Поиск
          <input type="text" onChange={changeHandler} />
        </label>
        <div className={cn.listUsers}>
          {users?.map((userList) => (
            <div style={{ display: "flex", flexDirection: "column", rowGap: "6px" }}>
              <b>{`${userList.name.first} ${userList.name.last}`}</b>
              <button
                onClick={() =>
                  showEditHandler({
                    nameFirst: userList.name.first,
                    nameLast: userList.name.last,
                    login: userList.login,
                    password: userList.password,
                    id: userList.id,
                    role: userList.role,
                  })
                }
              >
                изменить
              </button>
              <button onClick={() => setIdShow(userList.id)}>просмотр</button>
              <button onClick={() => deleteUSer(userList.id)}>удалить</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
