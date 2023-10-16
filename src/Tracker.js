import Storage from './Storage';

class Tracker {
  constructor() {
    this._totalCalories = Storage.getTotalCalories();
    this._calorieLimit = Storage.getCalorieLimit(2000);
    this._meals = Storage.getMeal();
    this._workouts = Storage.getWorkout();

    this._displayCalorieLimit();
    this._displayTotalCalorie();
    this._diaplayCaloriesBurned();
    this._calorieRemaining();
    this._progress();
    this._diaplayCaloriesConsumed();
    document.querySelector('#enter-limit').value = this._calorieLimit;
  }

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calorie;
    Storage.setTotalCalorie(this._totalCalories);
    Storage.saveMeal(meal);
    this._displayNewItem(meal);
    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calorie;
    this._displayNewWorkout(workout);
    Storage.setTotalCalorie(this._totalCalories);
    Storage.saveWorkout(workout);
    this._render();
  }

  removeMeal(id) {
    const index = this._meals.findIndex((meal) => meal.id === id);

    if (index !== -1) {
      const meal = this._meals[index];

      this._totalCalories -= meal.calorie;
      Storage.setTotalCalorie(this._totalCalories);
      this._meals.splice(index, 1);

      Storage.storeRemoveMeal(id);
      this._render();
    }
  }

  removeWorkout(id) {
    const index = this._workouts.findIndex((workout) => workout.id === id);

    if (index !== -1) {
      const workout = this._workouts[index];

      this._totalCalories += workout.calorie;
      Storage.setTotalCalorie(this._totalCalories);
      this._workouts.splice(index, 1);
      Storage.removeWorkout(id);
      this._render();
    }
  }

  setLimit(calories) {
    this._calorieLimit = calories;
    this._render();
  }

  reset() {
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    document.getElementById('progress-bar').style.width = '0%';
    Storage.clearAll();
    this._render();
  }

  loadMeal() {
    this._meals.forEach((meal) => this._displayNewItem(meal));
  }

  loadWorkout() {
    this._workouts.forEach((workout) => this._displayNewWorkout(workout));
  }

  // private methods
  _displayTotalCalorie() {
    const totalCalorieEl = document.getElementById('total-calories');
    totalCalorieEl.innerText = this._totalCalories;
  }

  _displayCalorieLimit() {
    const calorieLimitEl = document.getElementById('limit');
    calorieLimitEl.innerText = this._calorieLimit;
  }

  _diaplayCaloriesConsumed() {
    const calorieConsumedEl = document.getElementById('consumedCal');
    calorieConsumedEl.innerText = this._meals.reduce(
      (total, meal) => total + meal.calorie,
      0
    );
  }

  _diaplayCaloriesBurned() {
    const calorieBurnedEl = document.getElementById('burnedCal');
    calorieBurnedEl.innerText = this._workouts.reduce(
      (total, workout) => total + workout.calorie,
      0
    );
  }

  _calorieRemaining() {
    const calorieRemainingEl = document.getElementById('remainingCal');
    calorieRemainingEl.innerText = this._calorieLimit - this._totalCalories;
  }

  _progress() {
    const progressBar = document.getElementById('progress-bar');
    const percentage = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(percentage, 100);
    progressBar.style.width = `${width}%`;

    if (width >= 95) {
      progressBar.style.background = '#dc3545';
    } else {
      progressBar.style.background = '#599f3d';
    }

    if (this._calorieLimit - this._totalCalories <= 0) {
      document.getElementById('remaining-box').style.background = '#dc3545';
      document.getElementById('remaining-box').style.color = 'white';
    } else {
      document.getElementById('remaining-box').style.background = '#f8f9fa';
      document.getElementById('remaining-box').style.color = '#212529';
    }
  }

  _displayNewItem(meal) {
    const item = document.createElement('div');

    item.innerHTML = `
        <h1 class="text-primaryDark font-[400] text-[18px] md:text-[24px] capitalize">${meal.name}</h1>
    
        <div
          class="bg-primary  text-white font-[500] text-[18px] md:text-[24px] rounded-[5px] py-[5px] px-[1rem]"
        >
        <p >${meal.calorie}</p>
  
        </div>
        <div
          class="cursor-pointer grid place-items-center w-[1.5rem] h-[1.5rem] bg-danger rounded-[5px] text-white delete"
        >
          <i class="fa fa-times"></i>
        </div>
     `;
    item.className =
      'border-[1px] border-grayBorder border-solid p-[1rem] rounded-[5px] flex   justify-between items-center card';
    item.setAttribute('data-id', meal.id);
    document.getElementById(`meal-items`).appendChild(item);
  }

  _displayNewWorkout(workout) {
    const item = document.createElement('div');
    item.innerHTML = `
      <h1 class="text-primaryDark font-[400] text-[18px] md:text-[24px] capitalize">
        ${workout.name}
      </h1>
  
      <div
        class="bg-orange text-white font-[500] text-[18px] md:text-[24px] rounded-[5px] py-[5px] px-[1rem]"
      >
  <p ">${workout.calorie}</p>
      </div>
      <div
          class="cursor-pointer grid place-items-center w-[1.5rem] h-[1.5rem] bg-danger rounded-[5px] text-white delete"
        >
          <i class="fa fa-times"></i>
        </div>
  
   `;
    item.className =
      'border-[1px] border-grayBorder border-solid p-[1rem] rounded-[5px] flex gap-[1rem]  justify-between items-center card';
    item.setAttribute('data-id', workout.id);
    document.getElementById(`workout-items`).appendChild(item);
  }

  _render() {
    this._displayTotalCalorie();
    this._displayCalorieLimit();
    this._diaplayCaloriesConsumed();
    this._diaplayCaloriesBurned();
    this._calorieRemaining();
    this._progress();
  }
}

export default Tracker;
