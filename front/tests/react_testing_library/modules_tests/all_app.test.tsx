import React from "react";
import { fireEvent, render, screen, act } from "test-utils";
import { FullApp } from "../../../src/App";
import { FetchAgent } from "../../../src/FetchService";
import "@testing-library/jest-dom";
import { waitFor, waitForElementToBeRemoved } from "@testing-library/dom";

const headerClusterBlock = "Работа с кластеризацией сервера (Cluster модуль node)";

beforeAll(() => {
  // console.log('all', FetchAgent.postRequest);
});

test("Тестирование авторизации, смена страниц", async () => {
  const { container, baseElement } = render(<FullApp />);

  expect(screen.getByTestId("auth_header")).toBeInTheDocument();
  expect(screen.queryByText(headerClusterBlock)).not.toBeInTheDocument();

  const mockPost = jest.spyOn(FetchAgent, "postRequest").mockImplementation(() =>
    Promise.resolve({
      token: "ttt",
      currentPort: 3001,
    })
  );

  fireEvent.change(screen.getByLabelText("Логин"), { target: { value: "Kross97" } });

  const inputPassword = container.querySelector('[name="password"]');
  if (inputPassword) {
    fireEvent.change(inputPassword, { target: { value: "123" } });
  }

  /**
   * waitForElementToBeRemoved нужно получить реальный элемент (который счас отрисован)
   * чтобы он мог корректно за ним следить, когда он пропадет
   * иначе выпадает ошибка промиса
   * */
  // waitForElementToBeRemoved первый  аргумент должен быть элементом, массивом элементов или функцией обратного вызова,
  // которая возвращает элемент или массив элементов.
  waitForElementToBeRemoved(() => screen.queryByTestId("auth_header"), {
    timeout: 2000,
    interval: 50,
  }).then(() => {
    expect(screen.queryByText(headerClusterBlock)).toBeInTheDocument();
    expect(baseElement).toMatchSnapshot();
  });

  /**
   * ACT FACT 2
   *
   * в act нужно оборачивать действия которые в коде могу повлечь за собой перендер компонентов
   *
   * render, fireEvent  - также включат внутри себя act под каппотом
   * */
  await act(async () => {
    fireEvent.click(screen.getByText("Войти"));
  });

  expect(mockPost).toHaveBeenCalled();
  await expect(mockPost.mock.results[0].value).resolves.toEqual({
    token: "ttt",
    currentPort: 3001,
  });

  const i = 1;
  await waitFor(
    () => {
      const authHeader = screen.queryByTestId("auth_header");
      // console.log(`попытки waitFor ${i++}`);
      if (!authHeader) {
        expect(authHeader).not.toBeInTheDocument();
      } else {
        /**
         * ошибка нужна чтобы коллбэк вызвался еще раз
         * */
        throw "для потворного колбэка waitFor";
      }
    },
    {
      timeout: 2000,
      interval: 50,
    }
  );
});
