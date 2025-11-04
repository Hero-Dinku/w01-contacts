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

// Simple test route without DB
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Initialize database connection and start server
mongodb.initDb((err) => {
  if (err) {
    console.log("Database connection failed, but starting server anyway...");
    console.log("Error details:", err.message);
  }
  
  app.listen(port, () => {
    console.log("Server is running on port " + port);
    console.log("Health check: http://localhost:" + port + "/health");
    console.log("API Docs: http://localhost:" + port + "/api-docs");
  });
});
