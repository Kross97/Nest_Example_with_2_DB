import React from "react";
import Sinon from "cypress/types/sinon";
import { AuthBlock } from "../../src/modules/auth";
import user from "../fixtures/test_user.json";
import { FetchAgent } from "../../src/FetchService";

type TSpyMethod = Cypress.Omit<Sinon.SinonSpy<any[], any>, "withArgs"> &
  Cypress.SinonSpyAgent<Sinon.SinonSpy<any[], any>> &
  Sinon.SinonSpy<any[], any>;

before(() => {
  cy.request("http://localhost:3001/").then((response) => {
    cy.request("POST", "http://localhost:3001/user/create", user).then((response) => {
      console.log("response", response);
    });
  });
});

after(() => {
  cy.request("DELETE", `http://localhost:3001/user/delete/${user.login}`);
});

describe("Тестирование блока Auth вместе с реальным апи", () => {
  it("Тестирование авторизации (и информация о spy методе)", () => {
    // mount команда обьявленна в - support/commands.tsx
    cy.mount(<AuthBlock />);

    /**
     * Наблюдение за указанным методом обьекта, позволяет мониторить данные вызова этого метода
     * */
    const spyMethod = cy.spy(FetchAgent, "postRequest").as("postMock");

    cy.get('[name="login"]').type(user.login);
    cy.get('[name="password"]').type(user.password);

    cy.get("button").contains("Войти").click();
    cy.get("@postMock").should("have.been.called");
    cy.get("@postMock").should("have.been.calledWith", {
      url: "auth/signIn",
      requestType: "json",
      body: {
        login: user.login,
        password: user.password,
      },
    });

    /**
     * Проверка возвращаемого значения от бэка в наблюдаемом методе
     * */
    cy.get<TSpyMethod>("@postMock").then(async (spyMethod) => {
      /**
       * Свойства методов spy
       *
       * 1. spyMethod.callCount - количество вызовов функции
       * 2. spyMethod.called  - true если вызывался метод
       * 3. spyMethod.calledOnce (.calledTwice, .calledThrice) - true если метод вызывался указанное количество
       * 4. spyMethod.firstCall (.secondCall, .thirdCall, .lastCall)   - данные о указанном вызове (возвращаемое значение и т.д)
       * 5. spyMethod.thisValues - получить this
       * 6. spyMethod.returnValues - массив со всеми возвращаемыми значениями (returnValues[0] - данные первого вызова)
       * */
      const result = await spyMethod.firstCall.returnValue;
      expect(result.login).to.be.eql(user.login);
      expect(result.password).to.be.eq(user.password);
    });
  });
});
