const express = require("express");
// const dotenv = require("dotenv")
// dotenv.config()
require("dotenv").config();
// const currenciesJson = require("./currencies.json");
const currencyRouter = require("./routes/currencies.routes");
const userRouter = require("./routes/users.routes");
const verifyAuth = require("./middlewares/verifyAuth");

const app = express();
const PORT = 8082;

app.get("/", (req, res) => {
  res.send("<h1>Currency Database</h1>");
});

app.use("/currencies", currencyRouter);

//app.use(verifyAuth);

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
