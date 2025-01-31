// @ts-nocheck
import Mock = jest.Mock;

export const area = (radius?: number) => Math.PI * radius ** 2;
export const circumference = (radius?: number) => 2 * Math.PI * radius;

export function forEach(items, callback) {
  for (const item of items) {
    callback(item);
  }
}

export function testSetTimeoutFirst(cb: Mock, ms: number) {
  setTimeout(() => {
    cb();
  }, ms);
}
