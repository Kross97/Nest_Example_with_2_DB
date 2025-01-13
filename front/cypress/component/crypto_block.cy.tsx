import React from "react";
import {CryptoBlock} from "../../src/modules/crypto";

describe('Тестирование Crypto блока без подключения к апи', () => {
    it('Тестирование компонента (проходка по элементам)', () => {
        // mount команда обьявленна в - support/commands.tsx
        cy.mount(<CryptoBlock/>);
        cy.get('h3').contains('Модуль для работы с шифрованием (Crypto node.js)');
        cy.get('h3').parent();
        cy.get('h3').parent().first();
        cy.get('h3').parent().children();
    })
})