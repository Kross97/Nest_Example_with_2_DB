import React from 'react';
import { CryptoBlock } from '../../../src/modules/crypto';
import { render, screen, cleanup } from 'test-utils';
import { FetchAgent } from '../../../src/FetchService';
import { userEvent } from '@testing-library/user-event';

beforeAll(() => {
  // console.log('crypto', FetchAgent.postRequest);
});


afterEach(() => {
  // Демонтирует компонент из контейнера и уничтожает контейнер. (для того чтобы каждый тест начинался с нуля)
  cleanup();
});

const dataForCipher = 'Данные для шифрования';
const dataCipher = 'данные после шифрования (cipher)'

const dataForDecipher = 'Данные для де-шифрования';
const dataDeCipher = 'Данные после де-шифрования (decipher)';

const signData = 'Данные для подписи';

describe('Тестирование модуля Crypto с помощью user-events', () => {
  test.skip('Тестирование работы Шифрования (Cipher)', async () => {
    render(<CryptoBlock />)

    const inputCipher = screen.getByLabelText(dataForCipher, {
      exact: false,
    });

    const mockPost = jest.spyOn(FetchAgent, 'postRequest').mockImplementation(() => Promise.resolve(dataCipher));

    await userEvent.type(inputCipher, dataForCipher);
    await userEvent.click(screen.getByTestId('cipher-button'))

    expect(mockPost).toHaveBeenCalled();
    expect(mockPost.mock.calls[0][0].body).toBe(dataForCipher);
    expect(screen.getByTestId('cipher-field')).toHaveTextContent(dataCipher);
  });

  test.skip('Тестирование Де-шифрования (Decipher)', async () => {
    render(<CryptoBlock />)

    const input = screen.getByLabelText(dataForDecipher, {
      exact: false,
    })

    const mockPost = jest.spyOn(FetchAgent, 'postRequest').mockImplementation(() => Promise.resolve(dataDeCipher));

     await userEvent.type(input, dataForDecipher);
     await userEvent.click(screen.getByTestId('decipher-button'));


    expect(mockPost).toHaveBeenCalled();
    expect(mockPost.mock.calls[0][0].body).toBe(dataForDecipher);
    expect(screen.getByTestId('decipher-field')).toHaveTextContent(dataDeCipher)
  });

  test('Тестирование Снапшотом', async () => {
      const { container } = render(<CryptoBlock />);

     const inputSign = screen.getByLabelText(signData, {
       exact: false,
     });

     const inputCipher = screen.getByLabelText(dataForCipher, {
       exact: false,
     })

    const inputDecipher = screen.getByLabelText(dataForDecipher, {
      exact: false,
    })

    await userEvent.type(inputSign, signData);
    await userEvent.type(inputCipher, dataForCipher);
    await userEvent.type(inputDecipher, dataForDecipher);

    expect(screen.getByTestId('cipher-field')).toHaveTextContent(dataForDecipher);
    expect(container).toMatchSnapshot();
  });
});