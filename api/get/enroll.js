"use strict"

const data = [
  {
    id: '1', 
    title: 'Topic 1 is the first topic, id define topic number',
    contents: [
      {
        id: 0, player: 'YOUTUBE', src: 'X6a9odk6b_c', title: 'Nick and Dave Conversation',
        sub: {
          0: {
            id: 0, player: 'QUIZ', src: 'quiz1', title: 'Quiz 1 for test',
            sub: {0: {id: 0, player: 'QUIZ', src: 'quiz2', title: 'Quiz 2 for test',}}
          },
        }
      },
      {
        id: 1, player: 'YOUTUBE', src: 'r6bkETisayg', title: 'How to make friend and infulence people',
      },
    ]
  },
  {
    id: '1a', 
    title: 'Topic 1 is the first topic, id define topic number',
    contents: [
      {id: 0, player: 'QUIZ', src: 'quiz1', title: 'Quiz for test'},
    ]
  },
  {
    id: '2', 
    title: 'The second one, whatever name can be used',
    contents: [
      {id: 0, player: 'YOUTUBE', src: 'X6a9odk6b_c', title: 'Games of Thrones theme song: piano cover '},
      {id: 1, player: 'YOUTUBE', src: 'XQMnT9baoi8', title: 'Dragonborn is comming: piano cover'},
      {id: 3, player: 'YOUTUBE', src: 'dUNm721wTec', title: 'Age of agression'},
    ]
  },
  {
    id: '3', 
    title: 'Name should not too long',
    contents: [
      {id: 0, player: 'YOUTUBE', src: 'R9ZE97rnBqE', title: 'Nick and Dave Conversation'},
      {id: 1, player: 'YOUTUBE', src: 'r6bkETisayg', title: 'The last storyline'},
    ]
  }
]

function getEnrollInfo ({ enrollDB }) {
  return function (req, res, next) {
    if (!req.user) {
      // res.status(401).json({error: 'unauthorized'});
      // return
      req.user = { uid: 'tester-uid' };
    }

    if (req.params && req.params.courseId) {
      const uid = req.user.uid;
      const courseId = req.params.courseId;

      enrollDB.getEnroll(
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

function getContentData () {
  return function (req, res, next) {
    res.status(200).json({ data })
  }
}

module.exports = [ getEnrollInfo, getContentData ]