import './css/input.css';
import '../dist/output.css';
import '@fortawesome/fontawesome-free/js/all';
import mealImg from './assets/hero_meal.png';
import Tracker from './components/Tracker';
import Main from './components/Main';

const pathName = window.location.pathname;

class App {
  constructor() {
    const tracker = new Tracker();
    const main = new Main();
  }
}

// async function getquote() {
//   const data = await fetch('https://api.quotable.io/random');
//   const result = await data.json();
//   console.log(result);

//   document.querySelector('.motivate').classList.add('active');
// }

if (pathName === '/index.html' || pathName === '/') {
  const heroMeal = document.getElementById('hero-meal');
  heroMeal.src = mealImg;
} else if (pathName === '/tracker.html') {
  const initApp = new App();
}
