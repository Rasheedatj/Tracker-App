import Tracker from './Tracker';
const tracker = new Tracker();
const meals = tracker._meals;
const workouts = tracker._workouts;

class Meal {
  constructor(name, calorie) {
    this.name = name;
    this.calorie = calorie;
  }
}

class Workout {
  constructor(name, calorie) {
    this.name = name;
    this.calorie = calorie;
  }
}

export { Meal, Workout };
