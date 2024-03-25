const app = require("./app");
const dotenv = require("dotenv");
const path = require("path");
const connectDatabase = require("./config/database");

// need absolute path for that i used path module
dotenv.config({ path: path.join(__dirname, "config/config.env") });

connectDatabase();

//Listen will create a http server and start listening to the port
const server = app.listen(process.env.PORT, () => {
  console.log(
    `HTTP server listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught exception`);
  process.exit(1);
});
