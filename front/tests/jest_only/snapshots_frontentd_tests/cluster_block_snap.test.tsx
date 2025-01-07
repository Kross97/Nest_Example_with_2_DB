//@ts-nocheck

/**
 * Первый способ переделать внутреннюю логику метода
 * */
// jest.mock('../../src/FetchService', () => {
//   const { FetchAgent } = jest.requireActual('../../src/FetchService');
//   return {
//     FetchAgent: {
//       ...FetchAgent,
//       getRequest: jest.fn(() => Promise.resolve({
//         availablePorts: [3002, 3003],
//         currentPort: 3001,
//       }))
//     }
//   }
// });


import { ClusterBlock } from '../../../src/modules/cluster'
import { create, act } from 'react-test-renderer';
import { FetchAgent } from '../../../src/FetchService';
import React from 'react';
import Mock = jest.Mock;


/**
 * Второй способ переписать внутренню логику метода
 * */


const getRequestMock = jest.spyOn<typeof FetchAgent, 'getRequest', undefined>(FetchAgent, 'getRequest').mockImplementation(() => Promise.resolve({
  availablePorts: [3002, 3003],
  currentPort: 3001,
}))


/**
 * Делаем имитацию useState, чтобы не было пере-рендера в компоненте из за useEffecta
 * */
const setStateMock = jest.fn();

/**
 * Моковые данные для корректного снапшота с данными
 * */
const useSateMock = () => [[3002,3003], setStateMock];
const reactUseState = jest.spyOn<typeof React, 'useState', undefined>(React, "useState").mockImplementation(useSateMock);

afterAll(() => {
  /**
   * Возвращаем исходные реализации методов
   * */
  getRequestMock.mockRestore();
  reactUseState.mockRestore();
});

describe.skip('Тестирование снапшотами блока Cluster', () => {
  test('Тест первый',  () => {
        const mockGetRequest = FetchAgent.getRequest as Mock;

        let tree;
         act(() => {
          tree = create(<ClusterBlock />);
        });

       expect(FetchAgent.getRequest).toHaveBeenCalled();
       expect(mockGetRequest.mock.results[0].value).resolves.toEqual({ availablePorts: [ 3002, 3003 ], currentPort: 3001 })
       expect(tree.toJSON()).toMatchSnapshot();
  });
});