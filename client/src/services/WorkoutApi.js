import axios from 'axios';

class WorkoutApi {
  constructor() {
    this.URL = '/api/workouts';
  }

  getWorkouts() {
    return axios.get(this.URL);
  }

  createWorkout(data) {
    return axios.post(this.URL, data);
  }

  deleteWorkout(id) {
    return axios.delete(`${this.URL}/${id}`);
  }

  updateWorkout(id, data) {
    return axios.put(`${this.URL}/${id}`, data);
  }
}

export default new WorkoutApi();
