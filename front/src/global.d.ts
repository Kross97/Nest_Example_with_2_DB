
// обязательная установка sass пакета (npm i sass --save-dev)

declare module '*.module.scss' {
  const css: Record<string, string>;
  export default css;
}

declare module '*.scss' {
  const css: Record<string, string>;
  export default css;
}