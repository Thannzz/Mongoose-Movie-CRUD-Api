//importing express
const express = require("express");
//importing db from mongoose (from cloud)
const connect = require("./config/db");
const movieRouter = require("./features/movie.route");
//importing the server
const server = express();

server.use(express.json())
//redirecting to movie router
server.use("/movies", movieRouter);

//starting the server on port 9000
server.listen(9000, async () => {
  await connect();
  console.log("server started on port http://localhost:9000");
});
