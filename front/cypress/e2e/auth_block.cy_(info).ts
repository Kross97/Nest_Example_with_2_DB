import * as cypress from "cypress";

describe("Тестирование прохождение авторизации (и документация методов)", () => {
  /**
   * Тестирование всех методов позволяющих получить элементы
   *
   * 1. cy.get(selector | alias, options) - получение элемента (может начинать цепочку)
   * 2. cy.contains(selector, content, options) - получение элемента (может начинать цепочку)
   * 3. .find(selector, options) - получить дочерние элементы DOM (не может начинать цепочку)
   * */

  it("Проверка наличия элементов в блоке Auth", () => {
    cy.visit("http://localhost:3000/");

    /**
     * .contains(content | selector) - под каппотом имеет проверку .should('exist') - проверка на существование
     * */

    cy.contains("Авторизация").should("exist");
    cy.get('[data-testid="auth_header"]').should("exist");
    cy.get('[class*="Auth_authBlock"]').within(() => {
      /**
       * Контекст выполнения команд внутри within будет элемент полученный cy.contains('[class*="Auth_authBlock"]')
       * */
      cy.contains("Логин").should("exist"); // явно указать что элемент должен быть
      cy.contains("Состояние кластеризации").should("not.exist"); // явно указать что элемент не должено быть
    });

    cy.get('[class*="Auth_authBlock"]').find('[name="password"]');

    /**
     * Создание скриншота
     * */
    cy.screenshot();
  });

  /**
   * Тестирование действий, а также имитаций (перехват трафика)
   * */
  it("Имитация апи запроса на авторизацию и прохождение в приложение", () => {
    cy.visit("http://localhost:3000/");

    cy.get('[name="login"]').type("Kross_test_user");
    cy.get('[name="password"]').type("1_2_3_4_5");

    /**
     * Перехват трафика , и возврат заглушки в req.reply (не дает дойти до реального запроса на бэк, т.е мок апи)
     * */
    cy.intercept(
      {
        method: "POST",
        path: "/auth/signIn",
      },
      (req) => {
        console.log("cypress request", req);
        req.reply({ body: { token: "test_token", currentPort: 3001 } });
      }
    );

    cy.get("button").contains("Войти").click();
    cy.get('[data-testid="auth_header"]').should("not.exist");
    cy.contains("Работа с кластеризацией сервера (Cluster модуль node)").should("exist");
  });
});
