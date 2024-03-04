import { parseJSON, stringifyJSON } from "../helpers/helpers.js";

/**
 * Represents a Workout class for managing workout data.
 */
export class Workout {
  constructor() {}

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
   * Retrieves all workouts from localStorage.
   * @returns {Promise<Array>} A promise that resolves to the list of all workouts.
   */
  async getWorkouts() {}

  /**
   * Retrieves a workout by its ID from localStorage.
   * @param {string} workoutId - The ID of the workout to retrieve.
   * @returns {Promise<Object|null>} A promise that resolves to the workout object or null if not found.
   */
  async getWorkoutById(workoutId) {}

  /**
   * Searches for workouts based on a parameter and value.
   * @param {string} param - The parameter to search for (e.g., 'name', 'date').
   * @param {string} value - The value to match for the specified parameter.
   * @returns {Promise<Array>} A promise that resolves to the list of matching workouts.
   */
  async searchWorkout(param, value) {}

  /**
   * Sorts the workouts based on a specified criteria.
   * @param {string} sortBy - The criteria by which to sort the workouts.
   * @returns {Promise<Array>} A promise that resolves to the sorted list of workouts.
   */
  async sortWorkouts(sortBy) {}

  /**
   * Saves a workout to session.
   * @param {string} workoutId - The ID of the workout for which to save a session.
   * @returns {Promise<Array>} A promise that resolves to the updated list of workouts.
   */
  async saveSessionWorkout(workoutId) {}
}
