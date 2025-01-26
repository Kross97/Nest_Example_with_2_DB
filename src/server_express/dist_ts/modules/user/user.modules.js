"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModule = void 0;
const express_1 = __importDefault(require("express"));
const user_postgres_service_1 = require("./user.postgres.service");
exports.userModule = express_1.default.Router();
exports.userModule.get("/allRoles", function (req, res) {
    res.send("user_all");
});
exports.userModule.post("/create", function (req, res) {
    res.send("user");
});
exports.userModule.post("/createFormData", function (req, res) {
    res.send("");
});
exports.userModule.get("/all", function (req, res) {
    void user_postgres_service_1.UserPostgresService.getUsers(req, res);
});
exports.userModule.get("/:id", function (req, res) {
    res.send("user");
});
exports.userModule.delete("delete/:id", function (req, res) {
    res.send("d");
});
exports.userModule.put("update/:id", function (req, res) {
    res.send("");
});
exports.userModule.put("update/photos/:id", function (req, res) {
    res.send("");
});
//# sourceMappingURL=user.modules.js.map