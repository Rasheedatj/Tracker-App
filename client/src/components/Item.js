import Tracker from './Tracker';
const tracker = new Tracker();
const meals = tracker._meals;
const workouts = tracker._workouts;

class Meal {
  constructor(name, calorie) {
    this.name = name;
    this.calorie = calorie;
    this.id = meals.length + 1;
  }
}

class Workout {
  constructor(name, calorie) {
    this.name = name;
    this.calorie = calorie;
    this.id = workouts.length + 1;
  }
}

export { Meal, Workout };
