"use strict"

const api = require('../api/main')

const DatabaseAbstractor = require("database-abstractor")
const enroll = new DatabaseAbstractor();
const content = new DatabaseAbstractor();

const DB = {
  HOST: process.env.DB_HOST || 'http://localhost',
  PORT: process.env.DB_PORT || 3001
}

enroll.use(require('enrolldb-dynamodb-driver')({
  region : 'us-west-2', 
  endpoint : `${DB.HOST}:${DB.PORT}`
}))

content.use(require('contentdb-dynamodb-driver')({
  region : 'us-west-2', 
  endpoint : `${DB.HOST}:${DB.PORT}`
}))

api.useDatabase({ enroll, content })

/* create express app from api */
const express = require('express')
const cors = require('cors')

const app = express();

app.use(cors());

app.use('/', api);

module.exports = app;