import bodyParser from "body-parser";
import { Express } from "express";

export const jsonParser = bodyParser.json();
export const urlencodedParser = bodyParser.urlencoded();
export const textParser = bodyParser.text();
export const rawParser = bodyParser.raw();

export const connectParser = (app: Express) => {
  app.use(jsonParser);
  app.use(urlencodedParser);
  app.use(textParser);
  app.use(rawParser);

  // parse various different custom JSON types as JSON
  // app.use(bodyParser.json({ type: 'application/*+json' }))

  // parse some custom thing into a Buffer
  // app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

  // parse an HTML body into a string
  // app.use(bodyParser.text({ type: 'text/html' }))
};
