const router = require("express").Router();

// Temporary route for Week 1 - we'll add Swagger in Week 2
router.get("/", (req, res) => {
  res.json({ message: "Swagger documentation will be added in Week 2" });
});

module.exports = router;
