import express from "express";
import { UserPostgresService } from "./user.postgres.service";

export const userModule = express.Router();

userModule.get("/allRoles", function (req, res) {
  res.send("user_all");
});

userModule.post("/create", function (req, res) {
  res.send("user");
});

userModule.post("/createFormData", function (req, res) {
  res.send("");
});

userModule.get("/all", function (req, res) {
  void UserPostgresService.getUsers(req, res);
});

userModule.get("/:id", function (req, res) {
  res.send("user");
});

userModule.delete("delete/:id", function (req, res) {
  res.send("d");
});

userModule.put("update/:id", function (req, res) {
  res.send("");
});

userModule.put("update/photos/:id", function (req, res) {
  res.send("");
});
