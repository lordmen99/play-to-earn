var express = require("express");
var router = express.Router();
const { Mine } = require("../models");

router.post("/", async (req, res, next) => {
  const { runtime, account } = req.body;

  try {
    Mine.create({
      point: runtime,
      address: account,
    });
    return res.json({ message: "ok" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get("/", async (req, res, next) => {
  const { bestTime } = req.body;
  res.sendFile(bestTime);
});

module.exports = router;
