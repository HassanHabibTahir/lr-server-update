const express = require("express");
const fileUpload = require("express-fileupload");
const http = require("http");
const constants = require("./config/constants");
const app = express();
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const adminRoutes = require("./src/routes/admin.js"); // Adjust the path as necessary
// Middleware
app.use(fileUpload());
app.use(express.json({ limit: "1gb" }));
app.use(
  express.urlencoded({ limit: "1gb", extended: false, parameterLimit: 1000000 })
);
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: [constants.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(adminRoutes);
app.use(cors())
db = require("./config/database.js");

// Allow headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, key, Accept-Encoding, Accept-Language, Origin"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).json({});
  }
  next();
});

// Routes
app.get("/health-check", (req, res) => {
  var timestamp = 1703768083 * 1000; // Convert seconds to milliseconds
  var date = new Date(timestamp);
  res.send("OK");
});

require("./src/routes/index.js")(app);
db.open();
// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});

// Server Configuration
const port = normalizePort(constants.APP_PORT);
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
});

server.on("listening", () => {
  const addr = server.address();
  const bind =
    typeof addr === "string" ? `pipe: ${addr}` : `port: ${addr.port}`;
  console.log("Listening on port " + bind);
});

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}
