const express = require("express");
// const currenciesJson = require("./currencies.json");
const {
  getCurrencies,
  getCurrencyBySymbol,
} = require("./controllers/currencies.controllers");
const {
  getUsers,
  getUserById,
  searchUsersByGenderOrAge,
} = require("./controllers/users.controllers");

const app = express();
const PORT = 8082;

app.get("/", (req, res) => {
  res.send("<h1>Currency Database</h1>");
});

app.get("/currencies", getCurrencies);
app.get("/currencies/:symbol", getCurrencyBySymbol);

app.get("/users", getUsers);
app.get("/users/search", searchUsersByGenderOrAge);
app.get("/users/:uuid", getUserById);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
