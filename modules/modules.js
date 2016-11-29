function getThread(db, req, res) {
  let text;
  let poster;
  let title;
  const thrStrID = `/threads/ ${req.params.threadID}`;

  db.one('select * from threads where id = $1', [req.params.threadID])
    .then((thread) => {
      text = thread.text;
      poster = thread.poster;
      title = thread.title;
      db.any('select * from comments where thread = $1',
        [req.params.threadID])
        .then((comments) => {
          res.render('thread', { poster, text, title, comments, thrStrID });
        });
    })
    .catch((error) => {
      res.render('error', {
        title: 'Error',
        message: 'Eitthvað fór úrskeiðis!',
      });
    });
}

module.exports = {
  getThread,
};
