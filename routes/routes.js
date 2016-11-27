
const express = require('express');
const pgp = require('pg-promise')();
const xss = require('xss');

const router = express.Router();

const DATABASE = process.env.DATABASE_URL || 
  'postgres://postgres:postgres@localhost/rebbit';
const db = pgp(DATABASE);

/* GET home page. */
router.get('/', (req, res, next) => {
  db.any('select * from threads')
    .then((data) => {
      // console.log('get data', data);
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
  let text, poster;
  db.one(`select * from threads where id = $1`, [req.params.threadID])
    .then((thread) => {
      text = thread.text;
      poster = thread.poster;
      title = thread.title;
      console.log('thread', thread);
      db.any(`select * from comments where thread = $1`,
        [req.params.threadID])
        .then((comments) => {
          console.log('data', comments);
          res.render('thread', { poster, text, title, comments });
        })
    })
    .catch((error) => {
      console.log('error', error);
      res.render('error', { title: 'Error', 
        message: 'Eitthvað fór úrskeiðis!', error });
    })
});

module.exports = router;
