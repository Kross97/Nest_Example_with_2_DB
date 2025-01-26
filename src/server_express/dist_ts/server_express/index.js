"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * пакет для маппинга переменных с .env в process.env
 без него process.env.DB_TYPE в конфиге не заработает
 * */
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const user_modules_1 = require("./modules/user/user.modules");
const db_source_1 = require("./db-source");
db_source_1.TypeOrmDataSource.initialize().then(() => {
    console.log("База данных подключенна, идет запуск приложения");
    const app = (0, express_1.default)();
    const port = 3002;
    app.use("/user", user_modules_1.userModule);
    app.get("/", (req, res) => {
        res.send("Hello World!");
    });
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
//# sourceMappingURL=index.js.map