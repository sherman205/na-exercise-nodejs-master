var express = require('express');
const database = require('../lib/database');

var app = express();

app.use(express.json());

const v1 = express.Router();
const v2 = express.Router();

const findFares = (req, res) => {
  if (req.accepts('json')) {
    if (req.header('Agency')) {
      const agency = req.header('Agency');
      res.json(database.faresFor(agency));
    }
    // default option if no agency selected
    else {
      res.json(database.faresFor('octa'));
    }
  }
};

const findFares2 = (req, res) => {
  if (req.accepts('json')) {
    let fares;
    if (req.header('Agency')) {
      const agency = req.header('Agency');
      fares = database.faresFor(agency);
    }
    // default option if no agency selected
    else {
      fares = database.faresFor('octa');
    }

    const faresV2 = [];
    const fareObject = {};
    fares.map(fare => {
      const ticket = {};
      ticket[fare.rider] = fare.price;
      if (fareObject[fare.duration]) {
        fareObject[fare.duration].push(ticket);
      }
      else {
        fareObject[fare.duration] = [ticket];
      }
    });

    for (const [duration, ticket] of Object.entries(fareObject)) {
      faresV2.push({[duration]: ticket});
    }
    res.json(faresV2);
  }
};

v1.use('/', express.Router()
  .get('/', findFares));
  
v2.use('/', express.Router()
  .get('/', findFares2));

app.use('/', v1);
app.use('/v2', v2);

module.exports.app = app;
