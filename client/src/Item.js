class Meal {
  constructor(name, calorie) {
    this.name = name;
    this.calorie = calorie;
    this.id = Math.random().toString(16).slice(2);
  }
}

class Workout {
  constructor(name, calorie) {
    this.name = name;
    this.calorie = calorie;
    this.id = Math.random().toString(16).slice(2);
  }
}

export { Meal, Workout };
