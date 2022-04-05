//server/medels/user.js
const Sequelize = require("sequelize");

/* 사용자 정보 DB */
module.exports = class Game extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        address: {
          type: Sequelize.STRING(200),
          allowNull: true,
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(200),
          allowNull: true,
          unique: true,
        },
        snakePoint: {
          type: Sequelize.INTEGER(100),
          allowNull: true,
        },
        puzzlePoint: {
          type: Sequelize.INTEGER(100),
          allowNull: true,
        },
        minePoint: {
          type: Sequelize.INTEGER(100),
          defaultValue: 50,
          allowNull: true,
        },
        tetrisPoint: {
          type: Sequelize.INTEGER(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Game",
        tableName: "games",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
};
