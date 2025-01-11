//@ts-nocheck
/**
 * 1. toBe() — подходит, если нам надо сравнивать примитивные значения или является ли переданное значение ссылкой на тот же объект,
 * что указан как ожидаемое значение. Сравниваются значения при помощи Object.is(). В отличие от === это
 * дает возможность отличать 0 от -0, проверить равенство NaN c NaN.
 *
 * 2. toEqual() — подойдёт, если нам необходимо сравнить структуру более сложных типов.
 * Он сравнит все поля переданного объекта с ожидаемым. Проверит каждый элемент массива.
 * И сделает это рекурсивно по всей вложенности.
 *
 * 3. toContain() — проверят содержит массив или итерируемый объект значение. Для сравнения используется оператор ===.
 *
 * 4. toContainEqual() — проверяет или содержит массив элемент с ожидаемой структурой.
 *
 * 5. toHaveLength() — проверяет или свойство length у объекта соответствует ожидаемому.
 *
 * 6. toBeNull() — проверяет на равенство с null.

   7. toBeUndefined() — проверяет на равенство с undefined.

   8. toBeDefined() — противоположность toBeUndefined. Проверяет или значение !== undefined.

   9. toBeTruthy() — проверяет или в булевом контексте значение соответствует true.
      Тоесть любые значения кроме false, null, undefined, 0, NaN и пустых строк.

   10. toBeFalsy() — противоположность toBeTruthy(). Проверяет или в булевом контексте значение соответствует false.

   11. toBeGreaterThan() и toBeGreaterThanOrEqual() — первый метод проверяет или переданное числовое
       значение больше, чем ожидаемое >, второй проверяет больше или равно ожидаемому >=.

   12. toBeLessThan() и toBeLessThanOrEqual() — противоположность toBeGreaterThan() и toBeGreaterThanOrEqual()

   13. toBeCloseTo() — удобно использовать для чисел с плавающей запятой, когда вам не важна точность
       и вы не хотите, чтобы тест зависел от незначительной разницы в дроби. Вторым аргументом можно
       передать до какого знака после запятой необходима точность при сравнении.

   14. toMatch() — проверяет соответствие строки регулярному выражению.


 *
 * */

import { area, circumference } from '../common/testUtils';

describe('Модуль для примеров из глав документаций jest', () => {
  test('My first test', () => {
    expect(Math.max(1, 5, 10)).toBe(10);
  });

  test('toEqual with objects', () => {
    expect({ foo: 'foo', subObject: { baz: 'baz' } })
      .toEqual({ foo: 'foo', subObject: { baz: 'baz' } });  // Ок
    // expect({ foo: 'foo', subObject: { num: 0 } })
    //  .toEqual({ foo: 'foo', subObject: { baz: 'baz' } });  // А вот так ошибка.
  });

  test('toEqual with arrays', () => {
    expect([11, 19, 5]).toEqual([11, 19, 5]); // Ок
    // expect([11, 19, 5]).toEqual([11, 19]); // Ошибка
  });

  test('Circle area', () => {
    expect(area(5)).toBeCloseTo(78.54);
    expect(area()).toBeNaN();
  });

  test('Circumference', () => {
    expect(circumference(11)).toBeCloseTo(69.1, 1);
    expect(circumference()).toBeNaN();
  });

  test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });

  test('zero', () => {
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
  });
})