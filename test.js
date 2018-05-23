"use strict"
const express = require('express')
const api = require('./api/api.js')
const cors = require('cors')

const app = express();

app.use(cors());

app.use('/', api);

const PORT = 3301;
const httpServer = require('http').createServer(app);
httpServer.listen(PORT)

console.log(`# learndesk-server is running at http://localhost:${PORT}`)