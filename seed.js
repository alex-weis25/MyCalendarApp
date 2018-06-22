const Sequelize = require('sequelize');
const { db, Events } = require('./server/db/models');

const eventArray = [
  {
    eventName: 'Fullstack Academy',
    description: 'Coding practice',
    month: 'June',
    monthDay: 4,
    endDay: 6,
    week: 1,
    startTime: new Date(2018, 5, 4, 9, 30),
    endTime: new Date(2018, 5, 6, 11, 30)
  },
  {
    eventName: 'Coffee',
    description: 'Book discussion',
    month: 'June',
    monthDay: 7,
    endDay: 7,
    week: 1,
    startTime: new Date(2018, 5, 7, 9, 30),
    endTime: new Date(2018, 5, 7, 10, 30)
  },
  {
    eventName: 'Cycling class',
    description: 'Equinox',
    month: 'June',
    monthDay: 14,
    endDay: 14,
    week: 2,
    startTime: new Date(2018, 5, 14, 9, 30),
    endTime: new Date(2018, 5, 14, 11, 30)
  },
  {
    eventName: 'Dry Cleaning',
    description: null,
    month: 'June',
    monthDay: 16,
    endDay: 16,
    week: 3,
    startTime: new Date(2018, 5, 16, 10, 30),
    endTime: new Date(2018, 5, 16, 11, 30)
  },
  {
    eventName: 'Dinner',
    description: 'Parents in town',
    month: 'June',
    monthDay: 20,
    endDay: 20,
    week: 3,
    startTime: new Date(2018, 5, 20, 18, 30),
    endTime: new Date(2018, 5, 20, 20, 30)
  },
  {
    eventName: 'Fourth of July',
    description: 'Fireworks east side',
    month: 'July',
    monthDay: 4,
    endDay: 4,
    week: 1,
    startTime: new Date(2018, 6, 4, 18, 30),
    endTime: new Date(2018, 6, 4, 20, 30)
  },
  {
    eventName: 'Flight to Chicago',
    description: '',
    month: 'July',
    monthDay: 18,
    endDay: 18,
    week: 3,
    startTime: new Date(2018, 6, 18, 12, 30),
    endTime: new Date(2018, 6, 18, 14, 30)
  },
  {
    eventName: 'Alex Birthday',
    description: '28 years old',
    month: 'August',
    monthDay: 25,
    endDay: 25,
    week: 4,
    startTime: new Date(2018, 7, 25, 8, 30),
    endTime: new Date(2018, 7, 25, 20, 30)
  },
  {
    eventName: 'Halloween',
    description: 'Buy costume',
    month: 'October',
    monthDay: 28,
    endDay: 28,
    week: 4,
    startTime: new Date(2018, 9, 28, 9, 30),
    endTime: new Date(2018, 9, 28, 11, 30)
  },
  {
    eventName: 'Thanksgiving Day',
    description: 'Chicago',
    month: 'November',
    monthDay: 25,
    endDay: 25,
    week: 4,
    startTime: new Date(2018, 10, 25, 9, 30),
    endTime: new Date(2018, 10, 25, 11, 30)
  },
];


const seed = () => Promise.all(eventArray.map(event => Events.create(event)));

const main = () => {
  db
    .sync({ force: true })
    .then(() => {
      console.log('Seeding database...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      console.log('database updated!');
      return null;
    });
};

main();
