import axios from 'axios';

class MealApi {
  constructor() {
    this.URL = 'http://localhost:8000/api/meals';
  }

  getMeals() {
    return axios.get(this.URL);
  }

  createMeal(data) {
    return axios.post(this.URL, data);
  }

  deleteMeal(id) {
    return axios.delete(`${this.URL}/${id}`);
  }
}

export default new MealApi();
