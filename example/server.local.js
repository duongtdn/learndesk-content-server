"use strict"

require('dotenv').config()

const db = require('database-test-helper')
const enrolldb = require('enrolldb-test-helper')
const contentdb = require('contentdb-test-helper')

db.start().add({enrolldb, contentdb}).init(() => {
  const app = require('./app.local')
  const PORT = process.env.API_CONTENT_HOST || 3301;
  const httpServer = require('http').createServer(app);
  httpServer.listen(PORT)
  console.log(`\n# Content-Server is running at http://localhost:${PORT}\n`);
});