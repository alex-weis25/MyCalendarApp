'use strict';
const Sequelize = require('sequelize');
const db = require('../index.js');

const Calendar = db.define('calendar', {
  month: {
    type: Sequelize.ENUM('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
    allowNull: false
  },
  weekday: {
    type: Sequelize.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
    allowNull: false
  },
  dayNumber: {
    type: Sequelize.INTEGER,
    allowNul: false
  }
});

module.exports = Calendar;
