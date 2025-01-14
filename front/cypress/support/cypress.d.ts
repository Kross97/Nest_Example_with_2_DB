import { mount } from 'cypress/react'

/**
 * метод mount изначально не встроен в cypress
 * нужно задекларировать метод mount и обьявить его в commands
 * */

declare global {
    namespace Cypress {
        interface Chainable {
            mount: typeof mount;
            // декларация кастомной команды для теста
            Kross_97: () => void;
        }
    }
}