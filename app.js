// require express package
const express = require('express') 
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const app = express();
const port = process.env.PORT || 8080;

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.use('/', require('./routes'))

app.use(bodyParser.json()).use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
}).use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

// app.listen(port, () => {
//   console.log(`Running on port ${port}`)
// })