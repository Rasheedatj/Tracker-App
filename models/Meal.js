const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
  meal: {
    type: String,
    required: [true, 'Please enter a meal'],
  },
  calories: {
    type: Number,
    required: [true, 'please enter calorie'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Meal', MealSchema);
