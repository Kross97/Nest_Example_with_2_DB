import { testSetTimeoutFirst } from '../common/testUtils';

jest.useFakeTimers({ doNotFake: ['Date'] });

describe('Тестирование функций jest работающих с таймаутами', () => {
   test('Тестирование ускорение тайм-аута', (done) => {
     expect.assertions(2);
     const now = Date.now();
     const actualMs = 15_000;

     const callback = jest.fn(() => {
       const pastNow = Date.now();
       console.log(`таймер поставлен на: ${actualMs}, а прошло в мс:`, pastNow - now);
       expect(pastNow - now).toBeGreaterThan(0);
       expect(pastNow - now).toBeLessThan(500);
       done()
     });

     testSetTimeoutFirst(callback, actualMs);
     // jest.advanceTimersByTime(10_000);
     // jest.runAllTimers();
     jest.runOnlyPendingTimers();
   }, 20_000);
});