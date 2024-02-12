const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Enter a meal'],
  },
  calorie: {
    type: Number,
    required: [true, 'Enter workout calorie'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Workout', WorkoutSchema);
