import axios from "axios";
const currencyAPIurl = "https://api.coinbase.com/v2/currencies";

const downloadCurrencyListFromAPI = async () => axios.get(currencyAPIurl);

const getCurrencies = async (req, res) => {
  const { min_value } = req.query;
  try {
    const response = (await downloadCurrencyListFromAPI()).data;
    if (min_value)
      return res.send(
        response.data.filter((curr) => curr.min_size === min_value)
      );
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong, try again!" });
  }
};

const getCurrencyBySymbol = async (req, res) => {
  try {
    const response = (await downloadCurrencyListFromAPI()).data;
    const reqCurr = response.data.find(
      (curr) => curr.id === req.params.symbol.toUpperCase()
    );
    if (reqCurr) return res.send(reqCurr);
    res.status(404).send({ message: "Currency could not be found" });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong, try again!" });
  }
};

export { getCurrencies, getCurrencyBySymbol };
