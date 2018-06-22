'use strict';
const Sequelize = require('sequelize');
const db = require('../index.js');

const Events = db.define('events', {
  eventName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  month: {
    type: Sequelize.ENUM('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
    allowNull: false
  },
  monthDay: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  endDay: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  startTime: {
    type: Sequelize.DATE,
    allowNull: false
  },
  endTime: {
    type: Sequelize.DATE,
    allowNull: false
  },
  week: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Events;
