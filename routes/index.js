const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('Harry Potter')
  })

module.exports = routes;