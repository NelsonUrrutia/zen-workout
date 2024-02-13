import { parseJSON, stringifyJSON } from "../../../helpers/helpers.js";
import { TESTING_WORKOUTS_DATA, TESTING_WORKOUT_DATA } from "./testingData.js";

/**
 * Save new workout in local storage
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

      const newWorkoutsData = buildNewWorkoutsData(
        parsedWorkoutsData,
        newWorkout
      );

      localStorage.setItem("workoutsData", stringifyJSON(newWorkoutsData));
      resolve(newWorkoutsData);
    } catch (error) {
      reject("Error saving the workout. Please try again");
    }
  });
}

export function saveActiveWorkoutInSession(workout) {
  sessionStorage.setItem("activeWorkoutSession", stringifyJSON(workout));
}

export function getActiveWorkoutInSession() {
  return parseJSON(sessionStorage.getItem("activeWorkoutSession"));
}

/**
 * Get saved workouts from local storage
 * @returns {Promise<Array>} A promise that resolves with the array of saved workouts
 */
export function getWorkouts() {
  return new Promise((resolve, reject) => {
    try {
      const rawWorkoutsData = localStorage.getItem("workoutsData");
      if (!rawWorkoutsData) resolve([]);
      resolve(parseJSON(rawWorkoutsData));
    } catch (error) {
      reject("Error getting the workouts.");
    }
  });
}

/**
 * Get workout by id
 * @param {Number} workoutId Workout id
 * @returns  {Promise<Array>} A promise that resolves with the workout object
 */
export function getWorkout(workoutId) {
  return new Promise(async (resolve, reject) => {
    try {
      const workouts = await getWorkouts();
      resolve(workouts.find((workout) => workout.id === workoutId));
    } catch (error) {
      reject(error);
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
export function deleteWorkoutById(workoutId) {
  return new Promise(async (resolve, reject) => {
    try {
      const workouts = await getWorkouts();
      const filteredWorkouts = workouts.filter((item) => item.id !== workoutId);
      localStorage.setItem("workoutsData", stringifyJSON(filteredWorkouts));
      resolve(filteredWorkouts);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Loads testing data to the local storage
 */
export function loadTestingData() {
  try {
    const rawWorkoutsData = localStorage.getItem("workoutsData");
    if (rawWorkoutsData) return;
    localStorage.setItem("workoutsData", stringifyJSON(TESTING_WORKOUT_DATA));
  } catch (error) {
    console.log("Error to load testing data");
  }
}

/**
 * Builds a new array of workout data by either adding a new workout or replacing an existing one based on its 'id'.
 *
 * @param {Array} parsedWorkoutsData - The original array of parsed workout data.
 * @param {Object} newWorkout - The new workout object to be added or used for replacement.
 * @returns {Array} - A new array of workout data with the updated information.
 */
function buildNewWorkoutsData(parsedWorkoutsData, newWorkout) {
  const workoutHasId = newWorkout.hasOwnProperty("id");
  if (!workoutHasId) return [...parsedWorkoutsData, newWorkout];

  const filteredParsedWorkoutsData = parsedWorkoutsData.filter(
    (workout) => workout.id !== newWorkout.id
  );
  return [...filteredParsedWorkoutsData, newWorkout];
}
