import { getWorkouts, loadTestingData } from "../models/workout.js";
import RenderSavedWorkouts from "../views/RenderSavedWorkouts.js";

/**
 * Renders the workouts using the provided workout data.
 * @param {Array} workoutData - Array of workout data to render.
 */
export const renderWorkouts = (workoutData) => {
  RenderSavedWorkouts.renderWorkouts(workoutData);
};

/**
 * Renders saved workouts on the first load
 */
const firstLoadWorkoutsRender = async () => {
  try {
    RenderSavedWorkouts.setLoadingSpinner(true);
    const data = await getWorkouts();
    if (!data.length) {
      RenderSavedWorkouts.setEmptyState();
      return;
    }

    renderWorkouts(data);
  } catch (error) {
    console.error("Failed to load saved workouts");
  } finally {
    RenderSavedWorkouts.setLoadingSpinner(false);
  }
};

/**
 * Initializes methods and event handlers for the RenderSavedWorkouts module
 */
export function initRenderSavedWorkouts() {
  loadTestingData();
  firstLoadWorkoutsRender();
}
