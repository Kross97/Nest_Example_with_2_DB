// @ts-nocheck
import React from "react";
import { render, screen, fireEvent, act } from "test-utils";
import { AuthBlock } from "../../../src/modules/auth";

/**
 *   позволяет указать свой короткий импорт 'test-utils'
 *
 *   tsconfig.json
 *      "baseUrl": ".",
          "paths": {
          "test-utils": ["/tests/react_testing_library/test-utils"],
        }

    jest.config.ts
 *    moduleNameMapper: {
        'test-utils': "<rootDir>/tests/react_testing_library/test-utils",
      },
 * */

/**
 * Нужен для включения доп методотов у результата вызова expect() (toBeInTheDocument например)
 * */
import "@testing-library/jest-dom";
import { FetchAgent } from "../../../src/FetchService";
import Mock = jest.Mock;

beforeAll(() => {
  // console.log('auth', FetchAgent.postRequest);
});

test("Тестирование Auth модуля чер React_test_library", async () => {
  jest.spyOn(FetchAgent, "postRequest").mockImplementation(() =>
    Promise.resolve({
      token: "ttt",
      currentPort: 3001,
    })
  );
  const { container } = render(<AuthBlock />);

  const mockPostRequest = FetchAgent.postRequest as Mock;

  fireEvent.change(screen.getByLabelText<string>("Логин"), { target: { value: "Kross97" } });
  fireEvent.change(container.querySelector('[name="password"]'), { target: { value: "123" } });

  expect(screen.getByTestId("auth_header")).toBeInTheDocument();
  expect(screen.getByLabelText("Логин")).toBeInTheDocument();

  /**
   * ACT FACT 1
   *
   * act нужно вызывать если после данного действия есть тесты прицеленные на элементы которые могли пропасть при перерендере
   * (вызванные этим действием)
   *
   * если таких выборок для тестов нет, то в act оборачивать не обязательно
   * render, fireEvent  - также включат внутри себя act под каппотом
   * */
  await act(async () => {
    fireEvent.click(screen.getByRole("button"));
  });

  expect(mockPostRequest).toHaveBeenCalled();
  expect(mockPostRequest.mock.calls[0][0]).toEqual({
    url: "auth/signIn",
    requestType: "json",
    body: {
      login: "Kross97",
      password: "123",
    },
  });
  expect(mockPostRequest.mock.calls[0][0]).toMatchObject({
    body: {
      login: "Kross97",
      password: "123",
    },
  });
});
