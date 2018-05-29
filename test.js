"use strict"

require('dotenv').config()

const express = require('express')
const api = require('./api/api.js')
const cors = require('cors')

/* */
const DatabaseAbstractor = require("database-abstractor")
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

contentDB.use(require('contentdb-dynamodb-driver')({
  region : 'us-west-2', 
  endpoint : `${DB.HOST}:${DB.PORT}`
}))

api.useDatabase({ enrollDB, contentDB })

/* */
const app = express();

app.use(cors());

app.use('/', api);

const PORT = 3301;
const httpServer = require('http').createServer(app);
httpServer.listen(PORT)

console.log(`# learndesk-server is running at http://localhost:${PORT}`)