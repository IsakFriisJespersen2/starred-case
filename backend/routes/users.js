var express = require("express");
var router = express.Router();
var db = require("../../db/db.js");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const includeFavorites = req.query.include === "favorites";

  // Fetch all users
  db.all("SELECT * FROM user", (error, users) => {
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    if (!includeFavorites) {
      return res.json({
        data: users,
        error: {},
      });
    }

    const getFavorites = users.map((user) => {
      return new Promise((resolve, reject) => {
        const sql = "SELECT jobId FROM favorite WHERE favorite.userId = ?";
        db.all(sql, [user.id], (error, favorites) => {
          if (error) {
            return reject(error);
          }

          resolve({ ...user, favorites: favorites.map((fav) => fav.jobId) });
        });
      });
    });

    Promise.all(getFavorites)
      .then((usersWithFavorites) => {
        res.json({
          data: usersWithFavorites,
          error: {},
        });
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  });
});

router.get("/:id/favorite", function (req, res, next) {
  const { id } = req.params;

  const sql = "SELECT jobId FROM favorite WHERE favorite.userId = ?";

  db.all(sql, [id], (error, rows) => {
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({
      data: rows,
      error: {},
    });
  });
});

// Route to add a new favorite for a user
router.post("/:id/favorite", function (req, res, next) {
  const { id } = req.params;
  const { jobId } = req.body;

  const sql = "INSERT INTO favorite (userId, jobId) VALUES (?, ?)";

  db.run(sql, [id, jobId], function (error) {
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({
      message: "Favorite added successfully",
      favoriteId: this.lastID,
    });
  });
});

// Route to delete an existing favorite for a user
router.delete("/:id/favorite", function (req, res, next) {
  const { id } = req.params;
  const { jobId } = req.body;

  const sql = "DELETE FROM favorite WHERE userId = ? AND jobId = ?";

  db.run(sql, [id, jobId], function (error) {
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({
      message: "Favorite removed successfully",
    });
  });
});

module.exports = router;
