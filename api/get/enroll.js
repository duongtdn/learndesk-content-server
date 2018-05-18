"use strict"

function getEnrollInfo ({ enrollDB }) {
  return function (req, res, next) {
    // if (!req.user) {
    //   res.status(401).send();
    // }
    if (req.params && req.params.courseId) {
      console.log(req.params)
      console.log(enrollDB)
      next();
      return
    }
    res.status(400).send()
  }
}

function getContentData () {
  return function (req, res, next) {
    res.status(200).send('oh ya!!!')
  }
}

module.exports = [ getEnrollInfo, getContentData ]