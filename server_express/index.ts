/**
 * пакет для маппинга переменных с .env в process.env
 без него process.env.DB_TYPE в конфиге не заработает
 * */
import "dotenv/config";
import express from "express";
import cors from "cors";
import { userModule } from "./modules/user/user.modules";
import { TypeOrmDataSource } from "./db-source";
import { connectParser } from "./utils/parsers";

TypeOrmDataSource.initialize().then(() => {
  console.log("База данных подключенна, идет запуск приложения");
  const app = express();
  const port = process.env.EXPRESS_PORT;

  app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      credentials: true,
    })
  );
  app.use("/user", userModule);
  connectParser(app);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
