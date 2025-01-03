import { getNativeRequest } from './testUtils/native_http_requests';
import { API_URL } from './constants';


const mockUser = {
  nameFirst: 'test_first_name',
  nameLast: 'test_last_name',
  password: 'test_password',
  login: 'test_user_login',
}

describe('Тестирование апи регистрации', () => {
  it('Создание тестового пользователя', async () => {
    const response = await getNativeRequest({ url: `${API_URL}/user/create`, headers: {
        'content-type': 'application/json; charset=utf-8'
      }, method: 'POST', body: mockUser });
    console.log('response =>', response);
    expect(response.userSaved).toBeTruthy();
    expect(response.status).toBe('Пользователь_сохранен');
    expect(response.userSaved.login).toBe(mockUser.login);
  });
});