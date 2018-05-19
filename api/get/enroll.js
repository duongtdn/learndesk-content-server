"use strict"

function getEnrollInfo ({ enrollDB }) {
  return function (req, res, next) {
    if (!req.user) {
      // res.status(401).send();
      req.user = { uid: 'tester-uid' };
    }

    if (req.params && req.params.courseId) {
      const uid = req.user.uid;
      const courseId = req.params.courseId;

      enrollDB.getEnroll(
        { uid, courseId },
        (err, data) => {
          if (err) {
            res.status(400).send();
            return
          }
          if (data) {
            if (data.detail && data.detail.status && data.detail.status === 'active') {
              next();
            } else {
              res.status(403).json({error: 'not active'});
            }
          } else {
            res.status(403).json({error: 'not enroll or service disconnected'});
          }       
        }
      )
    } else {
      res.status(400).send();
    }
  }
}

function getContentData () {
  return function (req, res, next) {
    res.status(200).send('oh ya!!!')
  }
}

module.exports = [ getEnrollInfo, getContentData ]