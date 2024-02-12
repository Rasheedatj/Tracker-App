class Storage {
  static getCalorieLimit(defaultLimit = 2000) {
    let calorieLimit;
    if (localStorage.getItem('calorieLimit') === null) {
      calorieLimit = defaultLimit;
    } else {
      calorieLimit = +localStorage.getItem('calorieLimit');
    }

    return calorieLimit;
  }

  static setCalorieLimit(calorieLimit) {
    localStorage.setItem('calorieLimit', calorieLimit);
  }

  static getTotalCalories(defaultCalorie = 0) {
    let totalCalorie;

    if (localStorage.getItem('totalCalorie') === null) {
      totalCalorie = defaultCalorie;
    } else {
      totalCalorie = +localStorage.getItem('totalCalorie');
    }

    return totalCalorie;
  }
  static setTotalCalorie(totalCalorie) {
    localStorage.setItem('totalCalorie', totalCalorie);
  }

  static getMeal() {
    let meals;
    if (localStorage.getItem('meals') === null) {
      meals = [];
    } else {
      meals = JSON.parse(localStorage.getItem('meals'));
    }
    return meals;
  }

  static saveMeal(meal) {
    const meals = Storage.getMeal();
    meals.push(meal);
    localStorage.setItem('meals', JSON.stringify(meals));
  }

  static storeRemoveMeal(id) {
    const meals = Storage.getMeal();
    meals.forEach((meal, index) => {
      if (meal.id === id) {
        meals.splice(index, 1);
      }
    });
    localStorage.setItem('meals', JSON.stringify(meals));
  }

  static getWorkout() {
    let workouts;
    if (localStorage.getItem('workouts') === null) {
      workouts = [];
    } else {
      workouts = JSON.parse(localStorage.getItem('workouts'));
    }
    return workouts;
  }

  static saveWorkout(workout) {
    const workouts = Storage.getWorkout();
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  static removeWorkout(id) {
    const workouts = Storage.getWorkout();
    workouts.forEach((workout, index) => {
      if (workout.id === id) {
        workouts.splice(index, 1);
      }
    });
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  static clearAll() {
    localStorage.removeItem('workouts');
    localStorage.removeItem('meals');
    localStorage.removeItem('totalCaories');

    // localStorage.clearAll()
  }
}


export default Storage