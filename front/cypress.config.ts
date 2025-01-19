import { defineConfig } from "cypress";

export default defineConfig({
  // video: true, // для записи видео при тестировании
  // videosFolder: './videos' // Видеоролики хранятся в , videosFolder который установлен cypress/videos по умолчанию.
  // videoCompression: true,  // включить сжатие при запси видео

  // retries: 3,  // сколько раз нужно повторять тесты (для open и run режима)
  // retries: {
  //   runMode: 3,
  //   openMode: 2,
  // },               // для указания разного количества для разных режимов

  screenshotsFolder: "./cypress/my_screenshots",

  // папка для подкачки фикстур (fixtures папка идет по умолчанию)
  fixturesFolder: "./cypress/fixtures",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
