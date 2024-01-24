import { parseJSON, stringifyJSON } from "../../../helpers/helpers.js";

/**
 *
 * @param {Object} newWorkout The new workout to be saved
 * @returns {Promise<Array>} A promise that resolves with the updated workouts data array
 */
export function saveWorkout(newWorkout) {
  return new Promise((resolve, reject) => {
    try {
      const rawWorkoutsData = localStorage.getItem("workoutsData");
      const parsedWorkoutsData = rawWorkoutsData
        ? parseJSON(rawWorkoutsData)
        : [];

      const newWorkoutsData = [...parsedWorkoutsData, newWorkout];

      localStorage.setItem("workoutsData", stringifyJSON(newWorkoutsData));
      resolve(newWorkoutsData);
    } catch (error) {
      reject("Error saving the workout. Please try again");
    }
  });
}
