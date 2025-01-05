import { AuthBlock } from '../../src/modules/auth';
import renderer from 'react-test-renderer';

describe('Тестирование снапшотами блока Auth', () => {
    it('Снапшот компонента модалки ', () => {
        const tree = renderer.create(<AuthBlock></AuthBlock>).toJSON();
        expect(tree).toMatchSnapshot();
        expect(tree).toMatchInlineSnapshot(`
            <div
              className="authBlock"
            >
              <h3>
                Авторизация (после CI\\CD)
              </h3>
              <span>
                Логин
              </span>
              <input
                name="login"
                onChange={[Function]}
                type="text"
              />
              <span>
                Пароль
              </span>
              <input
                name="password"
                onChange={[Function]}
                type="password"
              />
              <button
                onClick={[Function]}
              >
                Войти
              </button>
            </div>
        `);
    });
});
