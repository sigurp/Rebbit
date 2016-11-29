
const pgp = require('pg-promise')();

function getThread(db, req, res) {
  let text, poster, title;
  const thrStrID = '/threads/' + req.params.threadID;

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
          res.render('thread', { poster, text, title, comments, thrStrID });
        })
    })
    .catch((error) => {
      console.log('error', error);
      res.render('error', { title: 'Error', 
        message: 'Eitthvað fór úrskeiðis!', error });
    })
};

module.exports = {
  getThread,
};