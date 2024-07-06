const express = require("express");
const {
  getCurrencies,
  getCurrencyBySymbol,
} = require("../controllers/currencies.controllers");

const router = express.Router();
// const router = require("express").Router();

router.get("/", getCurrencies);
router.get("/:symbol", getCurrencyBySymbol);

module.exports = router;
