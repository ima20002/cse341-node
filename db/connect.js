const dotenv = require('dotenv');
dotenv.config();
// Connection for MongoDB
const MongoClient = require('mongodb').MongoClient;

let _db;

// for initializing database
const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  // Start conenction using provided URI credential
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

// for getting DB data
const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};