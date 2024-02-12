const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');

// get all meal
router.get('/', async (req, res) => {
  try {
    const meals = await Meal.find();
    res.send({ sucess: true, data: meals });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Something went wrong' });
  }
});

// add a meal
router.post('/', async (req, res) => {
  const meal = new Meal({
    name: req.body.name,
    calorie: req.body.calorie,
  });
  try {
    const savedMeal = await meal.save();
    res.send({ sucess: true, data: savedMeal });
  } catch (error) {
    res.status(500).send({ success: false, message: 'something went wrong' });
  }
});

// get meal by single id
router.get('/:id', async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    res.send({ sucess: true, data: meal });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Resource not found' });
  }
});

// update idea
router.put('/:id', async (req, res) => {
  try {
    const updatedMeal = await Meal.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          meal: req.body.meal,
          calories: req.body.calories,
        },
      },
      { new: true }
    );

    res.json({ sucess: true, data: updatedMeal });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Something went wrong' });
  }
});

// delete idea
router.delete('/:id', async (req, res) => {
  try {
    await Meal.findByIdAndDelete(req.params.id);
    res.send({ success: true, data: {} });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Resource not found' });
  }
});

module.exports = router;
