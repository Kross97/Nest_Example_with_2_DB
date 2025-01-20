import React from "react";
import { CryptoBlock } from "../../src/modules/crypto";
import { FetchAgent } from "../../src/FetchService";

const dataForCipher = "Данные для шифрования";
const dataCipher = "___Данные после шифрования___";

describe("Тестирование Crypto блока без подключения к апи", () => {
  it("Тестирование компонента (документация методов)", () => {
    // mount команда обьявленна в - support/commands.tsx
    cy.mount(<CryptoBlock />);

    /**
     * Методы получения элемента:
     *
     * 0. cy.get(selector | alias, options) - получение элемента (может начинать цепочку)
     * 1. cy.contains(selector, content, options) - получение элемента (может начинать цепочку)
     *
     * cy.get('label').contains('Данные для шифрования') - значит label который содержит текст 'Данные для шифрования'
     *
     * 2. .parent(selector, options) - получение родительского элемента (на один уровень вверх по DOM)
     * 3. .prev(selector, options) - получить предыдущий элемент от текущего
     * 4. .first(options) - получить первый элемент DOM из набора потомков
     * 5. .last(options) - получить последний элемент DOM из набора потомков
     * 6. .next(selector, options) - Получить непосредственно следующий элемент-родственник каждого элемента DOM в наборе элементов DOM.
     * 7. .siblings(selector, options) - получить sibling DOM элементы
     * 8. cy.root(options) - получить корневой DOM элемент
     * 9  .children(selector, options) - получение элементов потомков
     * */

    cy.get('[data-cyid="crypto_block"]').as("rootCrypto");
    cy.get("h3").contains("Модуль для работы с шифрованием (Crypto node.js)");
    cy.get("@rootCrypto").parent();
    cy.get("@rootCrypto").first();
    cy.get("@rootCrypto").last();
    cy.get("@rootCrypto").children();
    cy.get("@rootCrypto")
      .get("h4")
      .prev()
      .should("have.html", "Модуль для работы с шифрованием (Crypto node.js)");
    cy.get("@rootCrypto").get("h4").next();
    cy.get("@rootCrypto").siblings();
    cy.get("@rootCrypto").root();

    /**
     * Другие методы:
     * 1. cy.wait(aliases | milliseconds , options) - ожидание либо элиаса запроса либо указанного времени
     * 2. cy.exec(command, options) - выполение системной команды (CLI)
     * 3. cy.log(message) - лог в журнале cypress
     * 4. cy.fixture(filePath, encoding, options) - получение данных фикстур
     * */
    cy.wait(200);
    cy.exec("node -v");
    cy.log("my custom log in cypress");
    cy.fixture("test_user.json").then((fixtures) => {
      console.log("данные о моковом пользователе для тестов:", fixtures);
    });

    // Тест моей кастомной команды
    cy.Kross_97();

    /**
     * Методы получения данных из WEB API:
     *
     * 1. cy.getAllCookies(options)  - получить все браузерные куки
     * 2. cy.getAllLocalStorage(options) - получить данные localStorage по всем ключам
     * 3. cy.getAllSessionStorage(options) - получить данные sessionStorage по всем ключам
     * */

    /**
     * Тестовые данные (при этом важно что WEB api localStorage, sessionStorage, document.cookie доступно)
     * */
    localStorage.setItem("item_test_local_storage", "test");
    sessionStorage.setItem("item_test_session_storage", "test");
    document.cookie = "test_cookie=123";

    cy.getAllCookies();
    cy.getAllLocalStorage();
    cy.getAllSessionStorage();

    /**
     * Методы обертки и вызова методов и свойств
     *
     * 1. cy.wrap(subject, options) - оборачивает переданные обьект и позволяет от него дальше продолжить цепочку
     * 2. .invoke(options, functionName, args...) - Вызвать функцию для ранее полученного объекта.
     * 3. .its(propertyName, options) - получить значение свойства для переданного обьекта
     * */

    cy.wrap({ test_fn: () => console.log("wrap_invoke_test_function") }).invoke("test_fn");
    cy.wrap({ test_prop: 3 }).its("test_prop").should("equal", 3);
  });

  it("Тестирование взаимодействия с АПИ (заглушенное)", () => {
    // mount команда обьявленна в - support/commands.tsx
    cy.mount(<CryptoBlock />);

    cy.get("label")
      .contains("Данные для шифрования")
      .within(() => {
        /**
         * внутри within запросы к cy будут выполнятся в контексте элемента полученного до within
         * */
        cy.get("input").type(dataForCipher);
      });

    /**
     * Установка наблюдения за методом у обьекта, потом может участвовать в проверках
     * */
    cy.spy(FetchAgent, "postRequest").as("spyCipherMethod");

    /**
     * Перехват трафика и подмена ответа для предотвращения реального сетевого запроса
     * */
    cy.intercept(
      {
        path: "/crypto/cipherPersist",
        method: "POST",
      },
      (req) => {
        req.reply(dataCipher);
      }
    );

    cy.get("button").contains("шифровать", { matchCase: false }).click();

    cy.get("@spyCipherMethod").should("have.been.called");
    // expect(FetchAgent.postRequest).to.have.called;
    cy.get("@spyCipherMethod").should("have.been.calledWith", {
      url: "crypto/cipherPersist",
      body: dataForCipher,
    });
    // expect(FetchAgent.postRequest).to.have.calledWith(dataForCipher)

    // TODO разобраться с логикой кэширования в cy.session(id, setup, options)
  });
});
