'use strict';
const router = require('express').Router();
const Events = require('../db/models/events');
module.exports = router;

router.get('/months/:month', (req, res, next) => {
  return Events.findAll({
    where: {
      month: req.params.month
    }
  }).then(events => {
    res.json(events);
  });
});

router.get('/all', (req, res, next) => {
  return Events.findAll().then(events => res.json(events));
});

router.post('/', (req, res, next) => {
  Events.create(req.body).then(created => res.json(created));
});

router.put('/:id', (req, res, next) => {
  Events.findById(req.params.id)
  .then(found => {
    return found.update(req.body);
  })
  .then(_ => {
    return Events.findAll({
      where: {
        month: req.body.month
      }
    });
  })
  .then(events => {
    res.json(events);
  });
});

router.delete('/', (req, res, next) => {
  console.log('hit the events delete route');
});
