import { parseJSON, stringifyJSON } from "../helpers/helpers.js";
import { TESTING_WORKOUTS_DATA } from "./testingData.js";
/**
 * Represents a Workout class for managing workout data.
 */
export class Workout {
  constructor() {}

  /**
   * Loads testing  workouts data
   */
  loadTestingData() {
    localStorage.setItem("workouts", stringifyJSON(TESTING_WORKOUTS_DATA));
  }

  /**
   * Saves a new workout to localStorage.
   * @param {Object} newWorkout - The new workout to be saved.
   * @returns {Promise<Array>} A promise that resolves to the updated list of workouts.
   * @throws {string} Throws an error message if saving the workout fails.
   */
  async saveWorkout(newWorkout) {
    return new Promise((resolve, reject) => {
      try {
        let updatedWorkouts = [];
        const rawWorkouts = localStorage.getItem("workouts");
        const workouts = rawWorkouts ? parseJSON(rawWorkouts) : [];

        if (!workouts.length) {
          updatedWorkouts = [...workouts, newWorkout];
        } else {
          const filterWorkouts = workouts.filter(
            (el) => el.id !== newWorkout.id
          );
          updatedWorkouts = [...filterWorkouts, newWorkout];
        }

        localStorage.setItem("workouts", stringifyJSON(updatedWorkouts));
        resolve(updatedWorkouts);
      } catch (error) {
        reject(`Workout | saveWorkout | ${error}`);
      }
    });
  }

  /**
   * Deletes a workout with the specified ID from the stored workouts data.
   *
   * @param {number} workoutId - The unique identifier of the workout to be deleted.
   * @returns {Promise<Array>} - A promise that resolves with the updated array of workouts after deletion,
   * or rejects with an error if there's an issue during the deletion process.
   */
  deleteWorkoutById(workoutId) {
    return new Promise(async (resolve, reject) => {
      try {
        const workouts = await this.getWorkouts();
        const filteredWorkouts = workouts.filter(
          (item) => item.id !== workoutId
        );
        localStorage.setItem("workouts", stringifyJSON(filteredWorkouts));
        resolve(filteredWorkouts);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Retrieves all workouts from localStorage.
   * @returns {Promise<Array>} A promise that resolves to the list of all workouts.
   */
  async getWorkouts() {
    return new Promise((resolve, reject) => {
      try {
        resolve(parseJSON(localStorage.getItem("workouts")));
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Retrieves a workout by its ID from localStorage.
   * @param {string} workoutId - The ID of the workout to retrieve.
   * @returns {Promise<Object|null>} A promise that resolves to the workout object or null if not found.
   */
  async getWorkoutById(workoutId) {
    return new Promise(async (resolve, reject) => {
      try {
        const workouts = await this.getWorkouts();
        resolve(workouts.find((workout) => workout.id === workoutId));
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Searches for workouts based on a parameter and value.
   * @param {string} param - The parameter to search for (e.g., 'name', 'date').
   * @param {string} value - The value to match for the specified parameter.
   * @returns {Promise<Array>} A promise that resolves to the list of matching workouts.
   */
  async searchWorkout(param, value) {}
  /**
   * Saves a workout to session.
   * @param {Object} workout - The  workout  to save in a session.
   */
  saveSessionWorkout(workout) {
    sessionStorage.setItem("sessionWorkout", stringifyJSON(workout));
  }

  /**
   *  Get the workout saved in session storage
   *  @returns {Object} Workout object saved in session
   */
  getSessionWorkout() {
    return JSON.parse(sessionStorage.getItem("sessionWorkout"));
  }

  /**
   * Sorts the workouts based on a specified criteria.
   * @param {string} sortBy - The criteria by which to sort the workouts.
   * @returns {Promise<Array>} A promise that resolves to the sorted list of workouts.
   */
  async sortWorkouts(sortBy) {}
}
