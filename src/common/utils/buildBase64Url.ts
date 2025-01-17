/**
 * Данная библиотека работает корректно только в версии 15.0.1
 * */
import { fromBuffer } from "file-type";


/**
 * Для создания коректного формата base64 url для отдачи на фронт (или документ PDF)
 * */
export const buildBase64Url = async (buffer: Buffer) => {
  const type = await fromBuffer(buffer);

  return `data:${type.mime};base64,${buffer.toString("base64")}`;
};
