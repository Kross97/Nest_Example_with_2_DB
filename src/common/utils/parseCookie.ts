export const parseCookie = (cookie: string): Record<string, string> => {
  return cookie.split("; ").reduce((acc, cookie) => {
    const [name, value] = cookie.split("=");
    return { ...acc, [name]: value };
  }, {});
};
