module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
    project: "tsconfig.json",
    jsx: true,
    tsconfigRootDir: __dirname,
    sourceType: "module",
    ecmaVersion: 2020,
    jsxPragma: "React",
    createDefaultProgram: true,
  },
  plugins: ["import", "react-hooks", "react", "prettier", "@typescript-eslint/eslint-plugin"],

  /**
   * eslint-config-prettier — помогает совместной работе ESLint и Prettier.
   * Выглядит это следующим образом: когда Prettier форматирует код, он делает это с учётом правил ESLint.
   * */
  extends: [
    "airbnb",
    "plugin:jest/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended", // плагин здесь не нужен мешает работате (дергается код, видно конфликт)
    "plugin:@typescript-eslint/recommended",
    "prettier", // eslint-config-prettier - Отключает все правила, которые не нужны или могут конфликтовать с Prettier .
  ],
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "id-blacklist": ["error", "any", "Number", "String", "string", "Boolean", "boolean", "undefined"],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "linebreak-style": "off", // Неправильно работает в Windows.
    "arrow-parens": "off", // Несовместимо с prettier
    "object-curly-newline": "off", // Несовместимо с prettier
    "no-mixed-operators": "off", // Несовместимо с prettier
    "arrow-body-style": "off", // Это - не наш стиль?
    "function-paren-newline": "off", // Несовместимо с prettier
    "no-plusplus": "off",
    "space-before-function-paren": 0, // Несовместимо с prettier
    "max-len": ["error", 140, 2, { ignoreUrls: true }], // airbnb позволяет некоторые пограничные случаи
    "no-alert": "error", // airbnb использует предупреждение

    "no-param-reassign": "off", // Это - не наш стиль?
    "radix": "off", // parseInt, parseFloat и radix выключены. Мне это не нравится.
    "no-empty-function": "off",
    "react/require-default-props": "off", // airbnb использует уведомление об ошибке
    "react/forbid-prop-types": "off", // airbnb использует уведомление об ошибке
    "react/jsx-filename-extension": ["error", { extensions: [".js"] }], // airbnb использует .jsx
    "import/prefer-default-export": "off",
    "prefer-destructuring": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "react/no-find-dom-node": "off", // Я этого не знаю
    "react/no-did-mount-set-state": "off",
    "react/no-unused-prop-types": "off", // Это всё ещё работает нестабильно
    "react/jsx-one-expression-per-line": "off",
    "import/no-extraneous-dependencies": "off",
    "no-useless-constructor": "off",
    "no-return-await": "off",
    "class-methods-use-this": "off",
    "no-console": "off",
    "no-void": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
