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
  const workout = new Workout({
    name: req.body.name,
    calorie: req.body.calorie,
  });

  try {
    const savedWorkout = await workout.save();
    res.send({ success: true, data: savedWorkout });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Something went wrong' });
  }
});

// get workout by single id
router.get('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    res.send({ success: true, data: workout });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Resource not found' });
  }
});

// update workout
router.put('/:id', async (req, res) => {
  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          calorie: req.body.calorie,
        },
      },
      { new: true }
    );

    res.json({ sucess: true, data: updatedWorkout });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Resource not found' });
  }
});

// delete workout
router.delete('/:id', async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.send({ success: true, data: {} });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Something went wrong' });
  }
});

module.exports = router;
