import React from 'react';
import { AuthBlock } from '../../../src/modules/auth';
import renderer from 'react-test-renderer';

describe('Тестирование снапшотами блока Auth', () => {
    it('Снапшот компонента модалки ', () => {
        const tree = renderer.create(<AuthBlock></AuthBlock>).toJSON();
        expect(tree).toMatchSnapshot();
        expect(tree).toMatchInlineSnapshot(`
            <div
              className="authBlock"
            >
              <h3
                data-testid="auth_header"
              >
                Авторизация (после CI\\CD)
              </h3>
              <label
                style={
                  {
                    "display": "flex",
                    "flexDirection": "column",
                  }
                }
              >
                Логин
                <input
                  name="login"
                  onChange={[Function]}
                  type="text"
                  value=""
                />
              </label>
              <span>
                Пароль
              </span>
              <input
                name="password"
                onChange={[Function]}
                type="password"
                value=""
              />
              <button
                onClick={[Function]}
                role="button"
              >
                Войти
              </button>
            </div>
        `);
    });
});
