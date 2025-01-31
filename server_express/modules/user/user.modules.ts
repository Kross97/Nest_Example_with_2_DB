import express from "express";
import multer from "multer";
import { UserPostgresService } from "./user.postgres.service";
import { jsonParser } from "../../utils/parsers";

export const userModule = express.Router();
const upload = multer();

userModule.get("/allRoles", function (req, res) {
  void UserPostgresService.getAllRoles(res);
});

userModule.post("/create", jsonParser, function (req, res) {
  void UserPostgresService.createUser(req, res);
});

userModule.post("/createFormData", function (req, res) {
  // void UserPostgresService.createFormData(req, res);
});

userModule.get("/all", function (req, res) {
  void UserPostgresService.getUsers(req, res);
});

userModule.get("/:id", function (req, res) {
  void UserPostgresService.getOneUser(req, res);
});

userModule.delete("/delete/:id", function (req, res) {
  void UserPostgresService.deleteUser(req, res);
});

userModule.put("/update/:id", jsonParser, function (req, res) {
  void UserPostgresService.updateUser(req, res);
});

userModule.put("/update/photos/:id", upload.array("files"), function (req, res) {
  void UserPostgresService.updatePhotos(req, res);
});
