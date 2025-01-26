"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWTSignature = void 0;
const crypto_1 = require("crypto");
const createJWTSignature = (head, body) => {
  return (0, crypto_1.createHmac)("SHA256", process.env.SECRET_TOKEN_KEY).update(`${head}.${body}`).digest("base64");
};
exports.createJWTSignature = createJWTSignature;
