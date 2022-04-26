// const routes = require('express').Router();
const express = require('express');
const router = express.Router();

// routes.get('/', (req, res) => {
//     res.send('Harry Potter')
//   })
router.use('/contacts', require('./contacts'));

module.exports = router;