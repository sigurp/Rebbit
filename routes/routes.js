
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
      // console.log('data', data);
      res.render('index', { title: 'Rebbit þræðir', data });
    })
    .catch((error) => {
      // console.log('error', error);
      res.render('error', { title: 'Error',
        message: 'Eitthvað fór úrskeiðis!', error });
    })
});

router.post('/', (req, res) => {
  const name = xss(req.body.new_entry_name);
});

router.get('/threads/:threadID', (req, res, next) => {
  let text, poster;
  db.one(`select * from threads where id = $1`, [req.params.threadID])
    .then((thread) => {
      text = thread.text;
      poster = thread.poster;
      console.log('thread', thread);
      db.any(`select * from comments where thread = $1`,
        [req.params.threadID])
        .then((comments) => {
          console.log('data', comments);
          res.render('thread', { poster, text, comments });
        })
    })
    .catch((error) => {
      console.log('error', error);
      res.render('error', { title: 'Error', 
        message: 'Eitthvað fór úrskeiðis!', error });
    })
});

module.exports = router;
