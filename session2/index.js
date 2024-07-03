const express = require("express");
const axios = require("axios");
// const currenciesJson = require("./currencies.json");
const app = express();
const PORT = 8082;

app.get("/", (req, res) => {
  res.send("<h1>Currency Database</h1>");
});

app.get("/currencies", async (req, res) => {
  try {
    res.send((await axios.get("https://api.coinbase.com/v2/currencies")).data);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong, try again!" });
  }
});

app.get("/currencies/:symbol", async (req, res) => {
  try {
    const response = (await axios.get("https://api.coinbase.com/v2/currencies"))
      .data;
    const reqCurr = response.data.find(
      (curr) => curr.id === req.params.symbol.toUpperCase()
    );
    if (reqCurr) return res.send(reqCurr);
    res.status(404).send({ message: "Currency could not be found" });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong, try again!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
