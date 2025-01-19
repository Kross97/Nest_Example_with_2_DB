module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["import", "react", "prettier", "@typescript-eslint/eslint-plugin"],

  /**
   * eslint-plugin-prettier — помогает совместной работе ESLint и Prettier.
   * Выглядит это следующим образом: когда Prettier форматирует код, он делает это с учётом правил ESLint.
   * */
  extends: [
    "airbnb",
    "plugin:jest/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: [".eslintrc.js"],
  rules: {
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
    "max-len": ["error", 100, 2, { ignoreUrls: true }], // airbnb позволяет некоторые пограничные случаи
    "no-console": "error", // airbnb использует предупреждение
    "no-alert": "error", // airbnb использует предупреждение

    "no-param-reassign": "off", // Это - не наш стиль?
    "radix": "off", // parseInt, parseFloat и radix выключены. Мне это не нравится.

    "react/require-default-props": "off", // airbnb использует уведомление об ошибке
    "react/forbid-prop-types": "off", // airbnb использует уведомление об ошибке
    "react/jsx-filename-extension": ["error", { extensions: [".js"] }], // airbnb использует .jsx

    "prefer-destructuring": "off",

    "react/no-find-dom-node": "off", // Я этого не знаю
    "react/no-did-mount-set-state": "off",
    "react/no-unused-prop-types": "off", // Это всё ещё работает нестабильно
    "react/jsx-one-expression-per-line": "off",
  },
};
