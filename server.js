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

// Health check - always works
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Server is running",
    database: database ? "Connected" : "Not connected",
    timestamp: new Date().toISOString()
  });
});

// Start server immediately, try DB connection in background
app.listen(port, () => {
  console.log("🚀 Server started on port " + port);
  console.log("📊 Health check: http://localhost:" + port + "/health");
  console.log("📚 API Docs: http://localhost:" + port + "/api-docs");
  
  // Try to connect to DB in background
  mongodb.initDb((err) => {
    if (err) {
      console.log("⚠️  Database connection failed, but server is running");
      console.log("💡 Error:", err.message);
    } else {
      console.log("✅ Database connected successfully");
    }
  });
});
