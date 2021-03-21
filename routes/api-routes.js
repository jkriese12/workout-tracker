const db = require("../models");

module.exports = function (app) {
  // GET route retrieving most recent workout
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({}).then((data) => {
      res.json(data);
    });
  });
  // GET route retrieving dashboard data
  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}).then((data) => {
      res.json(data);
    });
  });
};
