//@ts-nocheck
import { forEach } from '../common/testUtils'
import { fakeModule } from '../common/testUtils/fake/fake_module';
import { TestFakeApi } from '../common/testUtils/fake/use_fake_module';
//@ts-ignore
const mockCallback = jest.fn((x) => 42 + x);

/**
 * Из за этого fakeModule будет импортироваться фиктивный (то есть его внутренние функции все оборачиваются в jest.fn())
 * */
jest.mock('../common/testUtils/fake/fake_module');


/**
 * Проверка обьекта mock для jest.fn
 * сколько раз вызывался и с какими параметрами и т.д
 * */

describe('Тестирование имитаций функций', () => {
  test('Теситрование моковой функции', () => {
    forEach([0, 1], mockCallback);

    expect(mockCallback.mock.calls).toHaveLength(2);
    expect(mockCallback.mock.calls[0][0]).toBe(0);
    expect(mockCallback.mock.calls[1][0]).toBe(1);
    expect(mockCallback.mock.results[0].value).toBe(42);
  });


  /**
   * Данный пример показывает что можно заменть апи с тяжелым запросом на бэк
   * обернув этот модуль в jest.mock('./testUtils/fake/fake_module')
   * после этого используемый метод будет возвращать мок данные
   * (оборачиваем здесь  fakeModule.myGetFakeMethod)
   *
   * */
  test('Тестирование замены модуля', () => {
    const fakeUsers = [{ name: 'Test_user' }];
     //@ts-ignore
     fakeModule.myGetFakeMethod.mockResolvedValue(Promise.resolve(fakeUsers));

     TestFakeApi.all().then((resp) => {
       expect(resp).toEqual(fakeUsers);
     });
  });
});