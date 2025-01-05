/**
 * @jest-environment node
 */


import { getNativeRequest } from '../common/testUtils/native_http_requests';
import { API_URL } from '../common/constants';
import { IUser } from '../common/interfaces/api';


const mockUser = {
  nameFirst: 'test_first_name',
  nameLast: 'test_last_name',
  password: 'test_password',
  login: 'test_user_login',
}

it.only('mock2', () => {
  expect(true).toBeTruthy()
});

describe('Тестирование апи регистрации', () => {
  let user: null | { status: string, userSaved: IUser } = null;
  let userId: number | null = null;

  beforeAll(async () => {
    user =  await getNativeRequest({ url: `${API_URL}/user/create`, headers: {
        'content-type': 'application/json; charset=utf-8'
      }, method: 'POST', body: mockUser });
    userId = user?.userSaved?.id || null;
  });

  afterAll(async () => {
    user = null;
    userId = null;
  });

  it('Создание тестового пользователя', async () => {
    expect(user?.userSaved).toBeTruthy();
    expect(user?.status).toBe('Пользователь_сохранен');
    expect(user?.userSaved.login).toBe(mockUser.login);
  });

  it('Проверка наличия пользователя в БД', async () => {
    const userExist: null | IUser = await getNativeRequest({ url: `${API_URL}/user/${user?.userSaved?.id}` });
    expect(userExist).toBeTruthy();
    expect(userExist?.login).toBe(mockUser.login);
    expect(userExist?.password).toBe(mockUser.password);
  });


  it('Удаление пользователя', async () => {
    const stringResponse = await getNativeRequest({ url: `${API_URL}/user/delete/${userId}`, method: 'DELETE'});
    expect(stringResponse).toBe(`ПОЛЬЗОВАТЕЛЬ_С_ИД:${userId}_УДАЛЕН`);
    const userCheck = await getNativeRequest({ url: `${API_URL}/user/${userId}`});
    expect(userCheck).toBeFalsy();
  });

});