import './css/input.css';
import '../dist/output.css';
import '@fortawesome/fontawesome-free/js/all';
import mealImg from './assets/hero_meal.png';
import avatar from './assets/avatar.png';
import User from './components/User';
import Main from './components/Main';
import Tracker from './components/Tracker';

class App {
  constructor() {
    this.pathName = window.location.pathname;
    this._init();
  }

  _init() {
    if (this.pathName === '/index.html' || this.pathName === '/') {
      const heroMeal = document.getElementById('hero-meal');
      heroMeal.src = mealImg;
      const user = new User();
    } else if (this.pathName === '/tracker.html') {
      // document.getElementById('user').src = avatar;
      const tracker = new Tracker();
      const main = new Main();
    }
  }
}

const initApp = new App();
