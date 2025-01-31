import * as cypress from "cypress";
import React from "react";
import { AuthBlock } from "../../src/modules/auth";
import { FetchAgent } from "../../src/FetchService";

describe("Компонентное тестирование блока Auth", () => {
  it("Первый тест", () => {
    cy.mount(<AuthBlock />);

    /**
     * callsFake - реализация мока-метода на существующем обьекте (работает на одном и том же обьекте
     * (в тестах и запускаемом приложении) только в режиме компонентного тестирования)
     * */
    cy.stub(FetchAgent, "postRequest")
      .as("post_stub")
      .callsFake(() =>
        Promise.resolve({
          token: "token_test",
          currentPort: 3001,
        })
      );

    cy.get('[name="login"]').type("Kross_1997");
    cy.get('[name="password"]').type("1_2_3_4_5");

    cy.get("button").contains("Войти").click();

    /**
     * Проверка что функция была вызвана и с какими параметрами
     * */
    cy.get("@post_stub").should("have.been.called");
    cy.get("@post_stub").should("have.been.calledWith", {
      url: "auth/signIn",
      requestType: "json",
      body: {
        login: "Kross_1997",
        password: "1_2_3_4_5",
      },
    });
  });
});
