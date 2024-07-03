const http = require("http");
const axios = require("axios");
// const currenciesJson = require("./currencies.json");

const PORT = 8082;
// const server = http.createServer((req, res) => {
//   const serverInfo = {
//     serverName: "Crio Server",
//     version: "1.0.0",
//     currentDate: new Date().toDateString(),
//     currentTime: new Date().toTimeString(),
//   };
//   res.writeHead(200, { "content-type": "application/json", region: "us" });
//   res.end(JSON.stringify(serverInfo));
//   //res.end();
//   //res.end("Hello from server");
// });

// const server = http.createServer((req, res) => {
//   const serverInfo = {
//     serverName: "Crio Server",
//     version: "1.0.0",
//     currentDate: new Date().toDateString(),
//     currentTime: new Date().toTimeString(),
//   };
//   console.log(req.url);
//   if (req.url === "/status") {
//     res.writeHead(200, { "Content-Type": "application/json" }); //Adding Headers
//     res.end(JSON.stringify(serverInfo));
//   } else {
//     res.writeHead(200, { "Content-Type": "text/html" }); //Adding Headers
//     res.end(`<h1>Hello from server</h1>`);
//   }
// });

const server = http.createServer(async (req, res) => {
  switch (req.url) {
    case "/":
      res
        .writeHead(200, { "Content-Type": "text/html" })
        .end(`<h1>Currency Database</h1>`);
      break;
    case "/currencies":
      try {
        const response = await axios.get(
          "https://api.coinbase.com/v2/currencies"
        );
        res
          .writeHead(200, { "Content-Type": "application/json" })
          .end(JSON.stringify(response.data));
      } catch (error) {
        res
          .writeHead(500, { "Content-Type": "application/json" })
          .end({ message: "Something went wrong" });
      }
      break;
    default:
      res.writeHead(404).end();
  }
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
