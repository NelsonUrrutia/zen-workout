import {
  deleteWorkoutById,
  getWorkout,
  getWorkouts,
  loadTestingData,
} from "../models/workout.js";
import RenderSavedWorkouts from "../views/RenderSavedWorkouts.js";
import { loadActiveWorkout } from "./_sessionWorkout.js";
import { populateFormDispatcher } from "./_createWorkout.js";

/**
 * Renders the workouts using the provided workout data.
 * @param {Array} workoutData - Array of workout data to render.
 */
export function renderWorkouts(workoutData) {
  RenderSavedWorkouts.renderWorkouts(workoutData);
}

/**
 * Renders saved workouts on the first load
 */
async function firstLoadWorkoutsRender() {
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
}

/**
 * Section click event dispatcher
 * @param {Event} event Click event
 */
function sectionClickDispatcher(event) {
  const clickedElement = event.target;
  const workoutItemId =
    event.target.closest(`.saved-workout-item`)?.dataset.workoutItemId;

  if (clickedElement.closest(`[data-select-workout]`))
    startWorkout(workoutItemId);

  if (clickedElement.closest(`[data-edit-workout]`)) editWorkout(workoutItemId);

  if (clickedElement.closest(`[data-delete-workout]`))
    deleteWorkout(workoutItemId);
}

async function startWorkout(workoutItemId) {
  const workout = await getWorkout(+workoutItemId);
  loadActiveWorkout(workout);
}

/**
 * Asynchronously retrieves a workout based on its item ID,
 * and populates a form with the workout data.
 *
 * @param {number} workoutItemId - The unique identifier of the workout item.
 */
async function editWorkout(workoutItemId) {
  try {
    const workout = await getWorkout(+workoutItemId);
    populateFormDispatcher(workout);
  } catch (error) {
    console.log(`${error}`);
  }
}

/**
 * Asynchronously delete a workout based on its item ID,
 * and render the updated list of items
 *
 * @param {number} workoutItemId - The unique identifier of the workout item.
 */
async function deleteWorkout(workoutItemId) {
  try {
    const { name } = await getWorkout(+workoutItemId);
    const deleteWorkout = RenderSavedWorkouts.deleteWorkoutConfirmation(name);
    if (!deleteWorkout) return;
    const updatedWorkoutsData = await deleteWorkoutById(+workoutItemId);
    renderWorkouts(updatedWorkoutsData);
  } catch (error) {
    console.error(`${error}`);
  }
}

/**
 * Initializes methods and event handlers for the RenderSavedWorkouts module
 */
export default function initRenderSavedWorkoutsModule() {
  loadTestingData();
  firstLoadWorkoutsRender();
  RenderSavedWorkouts.addHandlerRenderSavedWorkoutsSection(
    sectionClickDispatcher
  );
}
