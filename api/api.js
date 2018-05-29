"use strict"

const api = require("express-api-binder")
const funcs = require('./get/content')


api
  .createFunction('get', '/content/:courseId', funcs);

module.exports = api