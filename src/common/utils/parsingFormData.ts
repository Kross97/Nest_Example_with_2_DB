// @ts-nocheck
import * as http from "http";

/**
 *  'Content-Disposition' - заголовок в теле FormData в котором идет название ключа вместе со значением
 *
 *   Пример получение и обработка:
 *
 *   '\r\nContent-Disposition: form-data; name="login"\r\n\r\ndfgdsfgdsfg\r\n' --->
 *   [ 'Content-Disposition: form-data; name="login"', 'dfgdsfgdsfg' ]
 *
 *  'Content-Type' - заголовок в теле FormData идет после  'Content-Disposition' только у файлов
 *
 *   Buffer.from(record[keyRecord], 'binary') - для записи биннарных данных
 * */

const parseKey = (value: string) =>
  value
    .match(/name="[^"]+/)[0]
    .split("=")[1]
    .replace(/"/, "");

const parseFileName = (value: string) =>
  value
    .match(/filename="[^"]+"/)[0]
    .split("=")[1]
    .replaceAll('"', "");

const buildBufferData = (recordEntity) => ({
  fileName: recordEntity.fileName,
  mimeType: recordEntity.mimeType,
  buffer: Buffer.from(recordEntity.buffer, "binary"),
});

export async function parsingFormData<T>(req: http.IncomingMessage): T {
  return new Promise((resolve, reject) => {
    const formData = {};
    let boundary = "";

    // Получаем границу из заголовка Content-Type
    const contentType = req.headers["content-type"];
    boundary = contentType.split("=")[1];

    // Собираем тело запроса
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("error", () => {
      reject({ status: "Ошибка парсинга", isError: true });
    });

    req.on("end", () => {
      // Парсим тело запроса
      let parts = body.split(`--${boundary}`);
      parts.pop(); // Удаляем последнюю часть, она всегда пустая
      parts = parts.filter(Boolean);

      parts?.forEach((part) => {
        try {
          const lines = part?.split("\r\n").filter(Boolean);
          const record = {};

          let isBuffer = false;
          for (let i = 0; i < lines.length; i++) {
            const [key, value] = lines[i].split(":"); // 'Content-Disposition: form-data; name="file"; filename="Снимок экрана 2024-10-10 131432.png"
            if (key === "Content-Disposition") {
              const currentKey = parseKey(value);
              record[currentKey] = lines[i + 1] || null; // [ 'Content-Disposition: form-data; name="login"', 'dfgdsfgdsfg' ] dfgdsfgdsfg - значение поля
            } else if (key === "Content-Type") {
              const currentValue = lines[i - 1].split(":")[1]; // // 'Content-Disposition: form-data; name="file"; filename="Снимок экрана 2024-10-10 131432.png"
              record[parseKey(currentValue)] = {
                fileName: parseFileName(currentValue),
                mimeType: value,
                buffer: lines[i + 2],
              };
              isBuffer = true;
            }
          }

          const keyRecord = Object.keys(record).at(0);
          // isBuffer - Если часть содержит файл, сохраняем его в формате Buffer

          if (formData[keyRecord] instanceof Array) {
            formData[keyRecord].push(isBuffer ? buildBufferData(record[keyRecord]) : record[keyRecord]);
          } else if (formData[keyRecord]) {
            formData[keyRecord] = [formData[keyRecord], isBuffer ? buildBufferData(record[keyRecord]) : record[keyRecord]];
          } else {
            formData[keyRecord] = isBuffer ? buildBufferData(record[keyRecord]) : record[keyRecord];
          }
        } catch (err) {
          console.log("ERR", err);
          reject({ status: "Ошибка парсинга", isError: true });
        }
      });

      resolve(formData);
    });
  });
}
