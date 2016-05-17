import express from 'express';
import country from './../models/country.js';

const router = express.Router();

router.get('/', (request, response, next) => {
  response.setHeader('Content-Type', 'application/json');

  country.findAll().then((countries) => {
    response.send(JSON.stringify(countries));
  });
});

router.get('/:id', (request, response, next) => {
  const id = request.params.id;

  response.setHeader('Content-Type', 'application/json');

  country.findById(id).then((country) => {
    (country !== null)
      ? response.send(JSON.stringify(country))
      : response.status(404).send(JSON.stringify({
        message: 'not_found'
      }));
  });
});

export default router;
