"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCookie = void 0;
const parseCookie = (cookie) => {
  return cookie.split("; ").reduce((acc, cookie) => {
    const [name, value] = cookie.split("=");
    return { ...acc, [name]: value };
  }, {});
};
exports.parseCookie = parseCookie;
