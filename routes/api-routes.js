const db = require("../models");

module.exports = function (app) {
  // GET route retrieving most recent workout
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  // Get workouts for dashboard using the virtual column
  app.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
    ])
      .sort({ _id: -1 })
      .limit(7)
      .then((dbWorkouts) => {
        console.log(dbWorkouts);
        res.json(dbWorkouts);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  // POST NEW WORKOUT TO DB
  app.post("/api/workouts", (req, res) => {
    db.Workout.create({})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  //
  app.put("/api/workouts/:id", function ({ body, params }, res) {
    db.Workout.findByIdAndUpdate(params.id, { $push: { exercises: body } }, { new: true })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};
