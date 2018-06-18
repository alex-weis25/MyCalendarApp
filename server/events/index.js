'use strict';
const router = require('express').Router();
const Events = require('../db/models/events');
module.exports = router;

router.get('/months/:month', (req, res, next) => {
  console.log('query params: ', req.params.month)
  return Events.findAll({ where: {
    month: req.params.month
  }})
  .then(events => {
    res.json(events);
  });
});

router.get('/all', (req, res, next) => {
  return Events.findAll()
  .then(events => res.json(events))
})

router.post('/', (req, res, next) => {
  console.log('hit the events post route');
});

router.put('/', (req, res, next) => {
  console.log('hit the events put route');
});

router.delete('/', (req, res, next) => {
  console.log('hit the events delete route');
});
