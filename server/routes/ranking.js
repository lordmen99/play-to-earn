var express = require("express");
var router = express.Router();
const { Ranking, User } = require("../models");

router.post("/", async (req, res, next) => {
  const { snakeAddress, tetrisAddress, puzzleAddress, mineAddress, claim } =
    req.body;
  console.log(req.body);

  try {
    snakeAddress
      .filter((v, i) => {
        return i < 3;
      })
      .map((data) => {
        Ranking.create({
          weeks: data.weeks,
          games: data.games,
          rank: data.rank,
          address: data.address,
          balance: data.balance,
        });
      });
    tetrisAddress
      .filter((v, i) => {
        return i < 3;
      })
      .map((data) => {
        Ranking.create({
          weeks: data.weeks,
          games: data.games,
          rank: data.rank,
          address: data.address,
          balance: data.balance,
        });
      });
    puzzleAddress
      .filter((v, i) => {
        return i < 3;
      })
      .map((data) => {
        Ranking.create({
          weeks: data.weeks,
          games: data.games,
          rank: data.rank,
          address: data.address,
          balance: data.balance,
        });
      });
    mineAddress
      .filter((v, i) => {
        return i < 3;
      })
      .map((data) => {
        Ranking.create({
          weeks: data.weeks,
          games: data.games,
          rank: data.rank,
          address: data.address,
          balance: data.balance,
        });
      });
    res.json({ message: "Ranking Send success!" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get("/", async (req, res) => {
  const users = await Ranking.findAll({
    attributes: ["address", "balance", "claim"],
    order: [["claim", "desc"]],
  });
  const reward = [];

  for (const user of users) {
    reward.push({
      address: user.address,
      balance: user.balance,
    });
  }

  res.json(reward);
});

module.exports = router;
