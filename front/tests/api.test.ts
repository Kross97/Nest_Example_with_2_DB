//@ts-nocheck
import { getNativeRequest } from './testUtils/native_http_requests';
import { IRole, IUser } from './interfaces/api';
import { API_URL } from './constants';


describe('Тестирование апи от бэка', () => {
  let users: IUser[] = [];
  let roles: IRole[] = [];
  beforeAll(async () => {
    users = await getNativeRequest({ url:` ${API_URL}/user/all` });
    roles = await getNativeRequest({ url: `${API_URL}/user/allRoles` })
  });

  test('Наличие юзеров в БД',  async () => {
    expect(users).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);
  }, 15_000);

  test('Наличие ролей в БД',  async () => {
    expect(roles).toBeTruthy();
    expect(roles.length).toBeGreaterThan(0);
  }, 15_000);

  test('Валидация юзеров в БД',  async () => {
    expect(users).toBeTruthy();
    const isValidUser = users.every((user) => user.id && user.login && user.password);
    expect(isValidUser).toBeTruthy();
  }, 15_000);

  test('Валидация ролей в БД',  async () => {
    expect(roles).toBeTruthy();
    const isValidUser = roles.every((role) => role.id && role.role);
    expect(isValidUser).toBeTruthy();
  }, 15_000);
});