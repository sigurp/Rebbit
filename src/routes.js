/* eslint linebreak-style: ["error", "windows"]*/

const express = require('express');
const schedule = require('./schedule');

const router = express.Router();

router.get('/', (req, res, next) => {
  const title = 'Vefforritun - Lokaverkefni';

  res.render('index', { title });

  // schedule.channels()
  //   .then((result) => {
  //     if (result.data && result.data.results.length > 0) {
  //       const channels = result.data.results[0].channels;
  //       res.render('index', { title });
  //     } else {
  //       next(new Error('Úps. Gátum ekki sótt gögnin'));
  //     }
  //   })
  //   .catch((err) => {
  //     // console.log(err);
  //     next(new Error('Úps. Vitum ekki hvað gerðist'));
  //   });
});

router.get('/tv/:name', (req, res, next) => {
  const nafn = req.params.name;
  schedule.channel(nafn)
    .then((result) => {
      if (!result.data.results) {
        const channels = result; // Tómt fylki
        res.render('dagskra', { channels, title: `Dagskrá ${nafn}` });
      } else {
        const channels = result.data.results; // Fylki af hlutum.
        res.render('dagskra', { channels, title: `Dagskrá ${nafn}` });
      }
    })
    .catch(() => {
      next('Villa kom upp.');
    });
});

module.exports = router;
