
const express = require('express');
const pgp = require('pg-promise')();
const xss = require('xss');

const router = express.Router();
const mod = require('../modules/modules');

const DATABASE = process.env.DATABASE_URL || 
  'postgres://postgres:postgres@localhost/rebbit';
const db = pgp(DATABASE);

/* GET home page. */
router.get('/', (req, res, next) => {
  db.any('select * from threads')
    .then((data) => {
      res.render('index', { title: 'Rebbit þræðir', data });
    })
    .catch((error) => {
      // console.log('error', error);
      res.render('error', { title: 'Error',
        message: 'Eitthvað fór úrskeiðis!', error });
    })
});

router.post('/', (req, res) => {
  const name = xss(req.body.name || '');
  const text = xss(req.body.text || '');
  const title = xss(req.body.title || '');

  db.none(`insert into threads (poster, title, text, replies, views)
    values ($1, $2, $3, $4, $5)`, [name, title, text,0,0])
    .then(() => {
      db.any('select * from threads;')
        .then((data) => {
          res.render('index', { title: 'Rebbit þræðir', data });
        });
    })
    .catch((error) => {
      res.render('error', { title: 'Error',
        message: 'Eitthvað fór úrskeiðis!', error });
    });
});

router.get('/threads/:threadID', (req, res, next) => {
  mod.getThread(db, req, res);
});

router.post('/threads/:threadID', (req, res) => {
  let text, poster, title;
  const name = xss(req.body.comment_name || '');
  const comment = xss(req.body.comment_text || '');

  console.log('inserting', name, comment);
  db.none(`insert into comments (name, comment, thread, replyTo, votes)
    values ($1, $2, $3, $4, $5)`, [name, comment, req.params.threadID, null, 0])
    .then(() => {
      mod.getThread(db, req, res)
    })
});

module.exports = router;
