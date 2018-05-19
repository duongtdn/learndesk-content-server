"use strict"

const app = require("express-api-binder")
const DatabaseAbstractor = require("database-abstractor")
const funcs = require('./get/enroll')

const enrollDB = new DatabaseAbstractor();
const contentDB = new DatabaseAbstractor();

const DB = {
  HOST: 'http://localhost',
  PORT: 3001
}

enrollDB.use(require('enrolldb-dynamodb-driver')({
  region : 'us-west-2', 
  endpoint : `${DB.HOST}:${DB.PORT}`
}))

// contentDB.use(require('enrolldb-dynamodb-driver')({
//   region : 'us-west-2', 
//   endpoint : `${DB.HOST}:${DB.PORT}`
// }))

app
  .useDatabase({ enrollDB, contentDB })
  .createFunction('get', '/study/:courseId', funcs);

module.exports = app