import Tracker from './Tracker';
import Storage from './Storage';
import { Meal, Workout } from './Item';

class Main {
  constructor() {
    this._tracker = new Tracker();
    this._loadEvents();
    this.modal = document.querySelector('.modal');
  }

  _loadEvents() {
    document
      .getElementById('meal-form')
      .addEventListener('submit', this._newItem.bind(this, 'meal'));

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
      .getElementById('meal-items')
      .addEventListener('click', this.removeItem.bind(this, 'meal'));
    document
      .getElementById('workout-items')
      .addEventListener('click', this.removeItem.bind(this, 'workout'));

    document
      .getElementById('filter-meal')
      .addEventListener('input', this.filterItem.bind(this, 'meal'));

    document
      .getElementById('filter-workout')
      .addEventListener('input', this.filterItem.bind(this, 'workout'));

    document
      .getElementById('reset')
      .addEventListener('click', this.reset.bind(this));

    window.addEventListener('click', this.activeInput.bind(this));
  }

  _newItem(type, e) {
    e.preventDefault();

    const name = document.getElementById(`enter-${type}`);
    const calorie = document.getElementById(`enter-${type}-calories`);
    // validate input
    if (name.value.length < 1 || calorie.value.length < 1) {
      document.querySelector('.error').classList.add('active');

      setTimeout(function () {
        document.querySelector('.error').classList.remove('active');
      }, 3000);

      return;
    }

    if (type === 'meal') {
      const meal = new Meal(name.value, +calorie.value);
      this._tracker.addMeal(meal);
    } else {
      const workout = new Workout(name.value, +calorie.value);
      this._tracker.addWorkout(workout);
    }
    name.value = '';
    calorie.value = '';
    document.getElementById(`${type}-collapse`).classList.remove('open');
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

  removeItem(type, e) {
    if (e.target.parentElement.classList.contains('delete')) {
      if (window.confirm('Do you want to remove this item?')) {
        const id = e.target.closest('.card').getAttribute('id');

        type === 'meal'
          ? this._tracker.removeMeal(id)
          : this._tracker.removeWorkout(id);
        e.target.closest('.card').remove();
      }
      return;
    }
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
