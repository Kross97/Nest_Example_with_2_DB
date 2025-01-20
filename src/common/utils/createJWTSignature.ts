import { createHmac } from "crypto";

export const createJWTSignature = (head: string, body: string) => {
  return createHmac("SHA256", process.env.SECRET_TOKEN_KEY).update(`${head}.${body}`).digest("base64");
};
