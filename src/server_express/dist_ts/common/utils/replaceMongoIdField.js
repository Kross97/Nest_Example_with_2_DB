"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceMongoIdField = void 0;
const replaceMongoIdField = (list) => {
    return list.map(({ _id, ...entity }) => ({ id: _id, ...entity }));
};
exports.replaceMongoIdField = replaceMongoIdField;
//# sourceMappingURL=replaceMongoIdField.js.map