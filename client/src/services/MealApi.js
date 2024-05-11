import axios from 'axios';

class MealApi {
  constructor() {
    this.URL = '/api/meals';
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

  updateMeal(id, data) {
    return axios.put(`${this.URL}/${id}`, data);
  }
}

export default new MealApi();
