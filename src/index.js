const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const http = require("http");

dotenv.config({ path: "./src/config/config.env" }); //load env vars


//server setup
const PORT = process.env.PORT || 8001;

var server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

