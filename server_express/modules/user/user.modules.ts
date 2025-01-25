import express from "express";

export const userModule = express.Router();

userModule.get("/", function (req, res) {
  res.send("user_all");
});

userModule.post("/", function (req, res) {
  res.send("user");
});

userModule.put("/", function (req, res) {
  res.send("user");
});

userModule.delete("/", function (req, res) {
  res.send("user");
});
