import express from "express";
import { userModule } from "./modules/user/user.modules";

const app = express();
const port = 3002;

app.use("/user", userModule);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
