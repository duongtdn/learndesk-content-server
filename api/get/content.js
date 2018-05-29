"use strict"

const { verifyToken } = require('@stormgle/jtoken-util')

const secret = process.env.AUTH_KEY_LEARNDESK

function authen() {
  return verifyToken(secret);
}

function getEnrollInfo (db) {
  return function (req, res, next) {
    if (!req.user) {
      res.status(401).json({error: 'unauthorized'});
      return
    }
    if (req.params && req.params.courseId) {
      const uid = req.user.uid;
      const courseId = req.params.courseId;
      db.enrollDB.getEnroll(
        { uid, courseId },
        (err, data) => {
          if (err) {
            console.log(err)
            res.status(404).send();
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

function getContentData (db) {
  return function (req, res, next) {
    const courseId = req.params.courseId;

    db.contentDB.getContent(
      { courseId },
      (err, data) => {
        if (err) {
          console.log(err)
          res.status(404).send();
          return
        }
        if (data) {
          if (data.detail && data.detail.status && data.detail.status === 'active') {
            res.status(200).json({ data: data.data });
          } else {
            res.status(403).json({error: 'not active'});
          }
        } else {
          res.status(403).json({error: 'content is null'});
        }       
      }
    )

    
  }
}

module.exports = [ authen, getEnrollInfo, getContentData ]