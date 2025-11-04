const express = require("express");
const app = express();
const mongodb = require("./data/database");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Route configuration
app.use("/", require("./routes"));

// Initialize database connection and start server
mongodb.initDb((err) => {
  if (err) {
    console.log("Database connection error:", err);
  } else {
    app.listen(port, () => {
      console.log("Database is listening and node Running on port " + port);
    });
  }
});
