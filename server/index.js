'use strict';
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const PORT = 8000;
const db = require('./db/models').db;
const app = express();

const createApp = () => {
  /* middleware */
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(compression());

  /* api routes */
  app.use('/api/events', require('./events'));

  /* static routes */
  app.use(express.static(path.join(__dirname, '..', 'public')));

  /* send 404 for other routes */
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

    /* send index.html */
    app.use('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'client/index.html'));
    });

  /* error handling */
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

const startListening = () => {
  const server = app.listen(PORT, () => console.log(`Mic check at ${PORT}`));
};


const syncDb = () => db.sync();

syncDb()
.then(_ => {
  console.log('db synced');
  startListening();
})
.then(createApp);

