const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();

const db = pgp('postgres://postgres:postgres@localhost/rebbit');

router.get('/threads', (req, res, next) => {
  res.render('thread', { title: 'req.params.threadID' });
  // db.any('select * from comments where thread = threadID')
  //   .then((data) => {
  //     console.log('data', data);
  //     res.render('thread', { title: 'Rebbit þræðir', data });
  //   })
  //   .catch((error) => {
  //     console.log('error', error);
  //     res.render('error', { title: 'Error', 
  //       message: 'Eitthvað fór úrskeiðis!', error });
  //   })
});

module.exports = router;