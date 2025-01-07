
beforeAll(() => console.log('1 (глобальный) - beforeAll'));
afterAll(() => console.log('1 (глобальный) - afterAll'));
beforeEach(() => console.log('1 (глобальный) - beforeEach'));
afterEach(() => console.log('1 (глобальный) - afterEach'));

test.skip('', () => console.log('1 (глобальный) - test'));

describe.skip('Тест для демонстрации порядка вывода хелперов beforeAll, afterAll, beforeEach, afterEach', () => {
  beforeAll(() => console.log('2 (внутренний) - beforeAll'));
  afterAll(() => console.log('2 (внутренний) - afterAll'));
  beforeEach(() => console.log('2 (внутренний) - beforeEach'));
  afterEach(() => console.log('2 (внутренний) - afterEach'));

  test('', () => console.log('2 (внутренний) - test'));
});