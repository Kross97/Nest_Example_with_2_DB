import React from "react";
import {AuthBlock} from "../../src/modules/auth";
import user from '../fixtures/test_user.json';
import {FetchAgent} from "../../src/FetchService";


before(() => {
    cy.request('http://localhost:3001/').then((response) => {
        cy.request('POST', 'http://localhost:3001/user/create', user).then((response) => {
            console.log("response", response);
        });
    })
});

after(() => {
    cy.request('DELETE', `http://localhost:3001/user/delete/${user.login}`)
});

describe('Тестирование блока Auth вместе с реальным апи', () => {
    it('Тестирование авторизации', () => {
        // mount команда обьявленна в - support/commands.tsx
        cy.mount(<AuthBlock/>);

       const stubPost = cy.stub(FetchAgent, 'postRequest').as('postMock').callsFake(() => Promise.resolve({
            token: 'test_token',
            currentPort: 3001,
        }));

       console.log('entries', Object.entries(stubPost))

        cy.get('[name="login"]').type(user.login);
        cy.get('[name="password"]').type(user.password);

        cy.get('button').contains('Войти').click()
        cy.get('@postMock').should('have.been.called');
        cy.get('@postMock').should('have.been.calledWith', {
            url: 'auth/signIn',
            requestType: 'json',
            body: {
                login: user.login,
                password: user.password
            },
        })

        // TODO нужно разобраться как тестировать возвращаемый Promise
        cy.get('@postMock').then(async (res) => {
            const result = await res();
            expect(result).to.be.eql({ token: 'test_token', currentPort: 3001 })
        })

        // TODO нужно разобраться как тестировать возвращаемый Promise
        // cy.get('@postMock').should('have.returned', Promise.resolve({ token: 'test_token', currentPort: 3001 }));
    })
});