import axios from 'axios';

class MealApi {
  constructor() {
    this.URL = 'http://localhost:8000/api/meals';
  }

  getMeals() {
    return axios.get(this.URL);
  }
}

export default new MealApi();
