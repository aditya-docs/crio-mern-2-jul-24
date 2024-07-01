const http = require("http");
const PORT = 8082;

const server = http.createServer(() => {
  console.log("Request incoming...");
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
