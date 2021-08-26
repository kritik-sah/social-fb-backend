const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("best of luck Kritik");
});

module.exports = router;
