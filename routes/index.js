const router = require("express").Router();

// Swagger documentation route
router.use("/", require("./swagger"));

// All contacts-related routes
router.use("/contacts", require("./contacts"));

// Root route
router.get("/", (req, res) => {
  res.send("Contacts API is running! Visit /api-docs for documentation");
});

module.exports = router;
