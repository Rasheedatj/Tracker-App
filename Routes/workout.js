const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// get all workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.send({ success: true, data: workouts });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Something went wrong' });
  }
});

// add a workout
router.post('/', async (req, res) => {
  const workout = {
    name: req.body.name,
    calorie: req.body.calorie,
  };

  try {
    const savedWorkout = await workout.save();
    res.send({ success: true, data: savedWorkout });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Something went wrong' });
  }
});
