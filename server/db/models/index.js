'use strict';
const db = require('../index.js');
const Events = require('./events');
const Calendar = require('./calendar');

/* Associations */
 Calendar.hasMany(Events, {onDelete: 'cascade'});
 Events.belongsTo(Calendar);

module.exports = {
  db,
  Calendar,
  Events
};
