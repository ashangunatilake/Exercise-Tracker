const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/userSchema");
const Exercise = require("./models/exerciseSchema");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app
  .route("/api/users")
  .post(async (req, res) => {
    let userName = new User({
      username: req.body.username,
    });
    try {
      const output = await userName.save();
      res.json({
        username: output.username,
        _id: output._id,
      });
    } catch (err) {
      console.log(err);
    }
  })
  .get(async (req, res) => {
    let users = [];
    try {
      const output = await User.find();
      output.forEach((user) => {
        users.push({
          username: user.username,
          _id: user._id,
        });
      });
      res.send(users);
    } catch (err) {
      console.log(err);
    }
  });

app.post("/api/users/:_id/exercises", async (req, res) => {
  let userId = req.params._id;
  let description = req.body.description;
  let duration = req.body.duration;
  let date = req.body.date ? new Date(req.body.date) : new Date();
  let user = await User.findById(userId);
  let exercise = new Exercise({
    userId: userId,
    description: description,
    duration: duration,
    date: date,
  });
  try {
    const output = await exercise.save();
    console.log(output);
    res.json({
      username: user.username,
      description: output.description,
      duration: output.duration,
      date: output.date.toDateString(),
      _id: user._id,
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/users/:_id/logs", async (req, res) => {
  let logs = [];
  let userId = req.params._id;
  console.log("userId: " + userId);
  try {
    let user = await User.findById(userId);
    let exercises = await Exercise.find(
      { userId: userId },
      { _id: 0, userId: 0, __v: 0 },
    );
    let count = 0;
    if (req.query.from !== undefined && req.query.from !== "") {
      exercises = exercises.filter(
        (exercise) => new Date(exercise.date) >= new Date(req.query.from),
      );
    }

    if (req.query.to !== undefined && req.query.to !== "") {
      exercises = exercises.filter(
        (exercise) => new Date(exercise.date) <= new Date(req.query.to),
      );
    }

    if (req.query.limit != undefined && req.query.limit !== "") {
      exercises = exercises.slice(0, parseInt(req.query.limit));
    }

    count = exercises.length;

    exercises.forEach((exercise) => {
      logs.push({
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date.toDateString(),
      });
    });

    res.json({
      _id: userId,
      username: user.username,
      count: count,
      log: logs,
    });
  } catch (err) {
    console.log(err);
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
