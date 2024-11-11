const searchHandler = async (req, res) => {
  let response;
  try {
    response = await fetch(`${process.env.STARRED_JOB_URL}/prod/jobs/recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobTitle: req.query.q }),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (err) {
    console.error(err.message);
  }

  const jobs = await response.json();

  let promiseAll;
  try {
    promiseAll = await Promise.all(
      jobs.jobIds.map((jobId) =>
        fetch(`${process.env.STARRED_JOB_URL}/prod/jobs/${jobId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => res.json()),
      ),
    );
  } catch (err) {
    console.error(err.message);
  }

  res.json({
    data: promiseAll,
    error: {},
  });
};

// Middleware to check for the query string "q"
function checkForSearchString(req, res, next) {
  if (req.query.q) {
    return searchHandler(req, res);
  }

  next();
}

module.exports = checkForSearchString;
