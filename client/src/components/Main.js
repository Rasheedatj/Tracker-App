import Tracker from './Tracker';
import Storage from './Storage';
import { Meal, Workout } from './Item';
import MealApi from '../services/MealApi';
import WorkoutApi from '../services/WorkoutApi';

class Main {
  constructor() {
    this._tracker = new Tracker();
    this._loadEvents();
    this.form = document.getElementById('meal-collapse');
    this.modal = document.querySelector('.modal');
    this.delete_modal = document.getElementById('delete-modal');
    this.id;
  }

  _loadEvents() {
    document.getElementById('meal-form').addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.form.classList.contains('updateable')) {
        this.updateMeal(this.id);
      } else {
        this._newItem('meal');
      }
    });

    // document
    //   .getElementById('meal-form')
    //   .addEventListener('submit', this._newItem.bind(this, 'meal'));

    document
      .getElementById('workout-form')
      .addEventListener('submit', this._newItem.bind(this, 'workout'));

    document
      .getElementById('set-limit')
      .addEventListener('click', this._openModal.bind(this));

    document
      .querySelector('.close-modal')
      .addEventListener('click', this._closeModal.bind(this));

    window.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this._closeModal();
      }
    });
    document
      .getElementById('add-workout-btn')
      .addEventListener('click', this._formCollapse.bind(this, 'workout'));

    document
      .getElementById('add-meal-btn')
      .addEventListener('click', this._formCollapse.bind(this, 'meal'));

    document
      .querySelector('.save')
      .addEventListener('click', this._setLimit.bind(this));

    document
      .getElementById('filter-meal')
      .addEventListener('input', this.filterItem.bind(this, 'meal'));

    document
      .getElementById('filter-workout')
      .addEventListener('input', this.filterItem.bind(this, 'workout'));

    document
      .getElementById('reset')
      .addEventListener('click', this.reset.bind(this));

    document
      .getElementById('cancel-action')
      .addEventListener('click', this._closeAction.bind(this));

    document.getElementById('meal-items').addEventListener('click', (e) => {
      const id = e.target.closest('.card').getAttribute('id');
      if (e.target.classList.contains('delete')) {
        e.stopImmediatePropagation();
        this.removeItem('meal', e, id);
      } else if (e.target.classList.contains('update')) {
        e.stopImmediatePropagation();
        this._formCollapse('meal', e);
        this.form.classList.add('updateable');
        this.id = id;
      }
    });

    document.getElementById('workout-items').addEventListener('click', (e) => {
      const id = e.target.closest('.card').getAttribute('id');
      if (e.target.classList.contains('delete')) {
        e.stopImmediatePropagation();
        this.removeItem('workout', e, id);
      }
    });

    window.addEventListener('click', this.activeInput.bind(this));
    window.addEventListener('click', (e) => {
      e.target === this.delete_modal ? this._closeAction() : '';
    });
  }

  _openModal(e) {
    e.preventDefault();

    document.querySelector('.modal').classList.add('active');
    document.querySelector('body').classList.add('active-body');
  }

  _closeModal() {
    this.modal.classList.remove('active');
    document.querySelector('body').classList.remove('active-body');
  }

  _formCollapse(type, e) {
    e.preventDefault();
    document.getElementById(`${type}-collapse`).classList.toggle('open');
  }

  _setLimit(e) {
    e.preventDefault();
    const limitInput = document.getElementById('enter-limit');
    this._tracker.setLimit(+limitInput.value);
    document.querySelector('.modal').classList.remove('active');
    document.querySelector('body').classList.remove('active-body');
    Storage.setCalorieLimit(+limitInput.value);
  }

  _closeAction() {
    this.delete_modal.classList.add('hidden');
  }

  _openAction() {
    this.delete_modal.classList.remove('hidden');
  }

  removeItem(type, e, id) {
    const item = e.target.closest('.card').querySelector('h1').innerText;
    document
      .querySelectorAll('#delete-item')
      .forEach((el) => (el.innerText = item));

    this._openAction();
    document.getElementById('delete-action').addEventListener('click', () => {
      console.log(id);

      type === 'meal' ? this.deleteMeal(id) : this.deleteWorkout(id);

      e.target.closest('.card').remove();
      this._closeAction();
      return;
    });
  }

  async _newItem(type) {
    // e.preventDefault();
    const name = document.getElementById(`enter-${type}`);
    const calorie = document.getElementById(`enter-${type}-calories`);
    // validate input
    if (!name.value || !calorie.value) {
      alert('Kindly fill all fields');
      return;
    }

    if (type === 'meal') {
      const meal = new Meal(name.value, +calorie.value);
      const newMeal = await MealApi.createMeal(meal);
      this._tracker.addMealToList(newMeal.data.data);
    } else {
      const workout = new Workout(name.value, +calorie.value);
      const newWorkout = await WorkoutApi.createWorkout(workout);
      this._tracker.addWorkoutToList(newWorkout.data.data);
    }

    name.value = '';
    calorie.value = '';
    document.getElementById(`${type}-collapse`).classList.remove('open');
  }

  async deleteMeal(id) {
    try {
      await MealApi.deleteMeal(id);
      this._tracker.removeMeal(id);
    } catch (error) {
      console.log(error);
    }
  }

  async updateMeal(id, e) {
    try {
      let form = document.getElementById('meal-form');
      const formdata = new FormData(form);
      const data = {
        name: formdata.get('meal'),
        calorie: formdata.get('calorie'),
      };
      await MealApi.updateMeal(id, data);
      this._tracker.getMeals();
      this.closeUpdateForm(formdata, 'meal', form);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteWorkout(id) {
    try {
      await WorkoutApi.deleteWorkout(id);
      this._tracker.removeWorkout(id);
    } catch (error) {
      console.log(error);
    }
  }

  closeUpdateForm(formdata, type, form) {
    formdata.forEach((value, key) => {
      const input = form.querySelector(`[name="${key}"]`);
      if (input) {
        input.value = '';
      }
    });
    document.getElementById(`${type}-collapse`).classList.remove('open');
  }

  filterItem(type, e) {
    const text = e.target.value.toLowerCase();
    const items = document.querySelectorAll(`#${type}-items > div`);

    items.forEach((item) => {
      const itemName = item.firstElementChild.textContent.toLowerCase();
      if (itemName.indexOf(text) !== -1) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  reset() {
    if (window.confirm('Are you sure you want to reset?')) {
      this._tracker.reset();
      document.getElementById('remaining-box').style.background = '#f8f9fa';
      document.getElementById('remaining-box').style.color = '#212529';
      document.getElementById('meal-items').innerHTML = '';
      document.getElementById('workout-items').innerHTML = '';
    }
  }

  activeInput(e) {
    const inputEl = document.querySelectorAll('.outline-none');

    if (e.target.classList.contains('outline-none')) {
      inputEl.forEach((input) => {
        input.classList.remove('active');
      });
      e.target.classList.add('active');
    } else {
      inputEl.forEach((input) => {
        input.classList.remove('active');
      });
    }
  }
}

export default Main;
