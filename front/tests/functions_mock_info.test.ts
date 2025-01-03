//@ts-nocheck
import { forEach } from './testUtils'
import { fakeModule } from './testUtils/fake/fake_module';
import { TestFakeApi } from './testUtils/fake/use_fake_module';

//@ts-ignore
const mockCallback = jest.fn((x) => 42 + x);

jest.mock('./testUtils/fake/fake_module');


describe('Тестирование имитаций функций', () => {
  test('Теситрование моковой функции', () => {
    forEach([0, 1], mockCallback);

    console.log("mack_cb", mockCallback.mock);

    expect(mockCallback.mock.calls).toHaveLength(2);
    expect(mockCallback.mock.calls[0][0]).toBe(0);
    expect(mockCallback.mock.calls[1][0]).toBe(1);
    expect(mockCallback.mock.results[0].value).toBe(42);
  });

  test('Тестирование замены модуля', () => {
    const fakeUsers = [{ name: 'Test_user' }];
     console.log('TestFakeApi', TestFakeApi);
     //@ts-ignore
     fakeModule.myGetFakeMethod.mockResolvedValue(Promise.resolve(fakeUsers));

     TestFakeApi.all().then((resp) => {
       console.log('resp_data', resp);
       expect(resp).toEqual(fakeUsers);
     });
  });
});