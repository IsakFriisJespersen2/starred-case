var express = require('express');
var checkForSearchString = require('./utils/searchHandler.js');
var router = express.Router();

/* GET all jobs. */
router.get('/', checkForSearchString, async function (req, res, next) {
  let response;
  try {
    response = await fetch(`${process.env.STARRED_JOB_URL}/prod/jobs?page=${req.query.page || ''}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (err) {
    console.error(err.message);
  }

  res.json({
    data: await response.json(),
    error: {},
  });
});

router.get('/:jobId', async function (req, res, next) {
  let response;
  try {
    response = await fetch(`${process.env.STARRED_JOB_URL}/prod/jobs/${req.params.jobId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (err) {
    console.error(err.message);
  }

  res.json({
    data: await response.json(),
    error: {},
  });
});

module.exports = router;
