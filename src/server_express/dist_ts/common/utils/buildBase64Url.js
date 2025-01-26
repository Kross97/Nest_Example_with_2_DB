"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildBase64Url = void 0;
/**
 * Данная библиотека работает корректно только в версии 15.0.1
 * */
const file_type_1 = require("file-type");
/**
 * Для создания коректного формата base64 url для отдачи на фронт (или документ PDF)
 * */
const buildBase64Url = async (buffer) => {
    const type = await (0, file_type_1.fromBuffer)(buffer);
    return `data:${type.mime};base64,${buffer.toString("base64")}`;
};
exports.buildBase64Url = buildBase64Url;
//# sourceMappingURL=buildBase64Url.js.map