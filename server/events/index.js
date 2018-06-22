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
  return Events.findAll()
    .then(events => res.json(events))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Events.create(req.body)
    .then(created => res.json(created))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Events.update(req.body,
    { where:
      { id: req.params.id },
      returning: true
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
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Events.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(deleted => {
      return Events.findAll();
    })
    .then(events => res.json(events))
    .catch(next);
});
