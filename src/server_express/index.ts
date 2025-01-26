/**
 * пакет для маппинга переменных с .env в process.env
 без него process.env.DB_TYPE в конфиге не заработает
 * */
import "dotenv/config";
import express from "express";
import { userModule } from "./modules/user/user.modules";
import { TypeOrmDataSource } from "./db-source";
import { connectParser } from "./utils/parsers";

TypeOrmDataSource.initialize().then(() => {
  console.log("База данных подключенна, идет запуск приложения");
  const app = express();
  const port = 3002;

  app.use("/user", userModule);
  connectParser(app);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
