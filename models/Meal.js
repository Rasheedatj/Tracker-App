const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Enter a meal'],
  },
  calorie: {
    type: Number,
    required: [true, 'Enter calorie'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Meal', MealSchema);
