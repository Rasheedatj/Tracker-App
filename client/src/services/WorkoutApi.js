import axios from 'axios';

class WorkoutApi {
  constructor() {
    this.URL = 'http://localhost:8000/api/workouts';
  }

  getWorkouts() {
    return axios.get(this.URL);
  }
}

export default new WorkoutApi();
