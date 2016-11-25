const express = require('express');
const threads = express.Router();
const pgp = require('pg-promise')();

const db = pgp('postgres://postgres:postgres@localhost/rebbit');

// threads.get('/threads/:threadID', (req, res, next) => {
//   console.log('Hú!');
//   let text, poster;
// //  res.render('thread', { title: 'req.params.threadID' });
//   db.one(`select * from threads where id = ${req.params.threadID}`)
//     .then((thread) => {
//       text = thread.text;
//       poster = thread.poster;
//       console.log('thread', thread);
//       db.any(`select * from comments where thread = ${req.params.threadID}`)
//         .then((comments) => {
//           console.log('Komst í línu 18');
//           console.log('data', comments);
//           console.log('Komst í línu 19');
//           res.render('thread', { poster, text, comments });
//         })
//     })
//     .catch((error) => {
//       console.log('error', error);
//       res.render('error', { title: 'Error', 
//         message: 'Eitthvað fór úrskeiðis!', error });
//     })
// });

module.exports = threads;