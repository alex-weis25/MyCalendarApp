const Sequelize = require('sequelize');
const { db, Events } = require('./server/db/models');

const eventArray = [
  {
    eventName: 'Fullstack Academy',
    description: 'Coding practice',
    month: 'June',
    monthDay: 4,
    startTime: new Date(2018, 5, 1, 9, 30),
    endTime: new Date(2018, 5, 1, 11, 30),
    location: 'Starbucks'
  },
  {
    eventName: 'Coffee',
    description: 'Book discussion',
    month: 'June',
    monthDay: 7,
    startTime: new Date(2018, 5, 2, 7, 30),
    endTime: new Date(2018, 5, 2, 8, 30),
    location: '11 E 17th Street'
  },
  {
    eventName: 'Coffee',
    description: 'Book discussion',
    month: 'June',
    monthDay: 10,
    startTime: new Date(2018, 5, 4, 9, 30),
    endTime: new Date(2018, 5, 14, 11, 30),
    location: '11 E 17th Street'
  },
  {
    eventName: 'Coffee',
    description: 'Book discussion',
    month: 'July',
    monthDay: 12,
    startTime: new Date(2018, 6, 10, 9, 30),
    endTime: new Date(2018, 6, 10, 11, 30),
    location: '11 E 17th Street'
  },
  {
    eventName: 'Coffee',
    description: 'Book discussion',
    month: 'June',
    monthDay: 18,
    startTime: new Date(2018, 5, 11, 9, 30),
    endTime: new Date(2018, 5, 11, 11, 30),
    location: '11 E 17th Street'
  },
  {
    eventName: 'Coffee',
    description: 'Book discussion',
    month: 'June',
    monthDay: 18,
    startTime: new Date(2018, 5, 18, 9, 30),
    endTime: new Date(2018, 5, 18, 11, 30),
    location: '11 E 17th Street'
  },
  {
    eventName: 'Coffee',
    description: 'Book discussion',
    month: 'June',
    monthDay: 24,
    startTime: new Date(2018, 5, 21, 9, 30),
    endTime: new Date(2018, 5, 21, 11, 30),
    location: '11 E 17th Street'
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
