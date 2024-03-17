import axios from 'axios';

class WorkoutApi {
  constructor() {
    this.URL = 'http://localhost:8000/api/workouts';
  }

  getWorkouts() {
    return axios.get(this.URL);
  }

  createWorkout(data) {
    return axios.post(this.URL, data);
  }
}

export default new WorkoutApi();
