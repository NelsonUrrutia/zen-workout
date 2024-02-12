import CreateWorkout from "../views/CreateWorkout.js";
import { renderWorkouts } from "./_renderSavedWorkouts.js";
import { saveWorkout } from "../models/workout.js";
import { getCurrentDate, getDateNow } from "../../../helpers/helpers.js";

/**
 * Clears workout blocks
 */
function clearWorkoutDispatcher() {
  CreateWorkout.clearWorkoutBlocks();
}

/**
 * Creates workout blocks
 */
function createBlocksDispatcher() {
  CreateWorkout.createWorkoutBlocks();
}

/**
 * Pars and format the form data object
 * @param {FormData} formData Form data submitted from the CreateWorkout view
 * @returns {Object} Parsed and formatted form data
 */

function extractFormData(formData) {
  const {
    "workout-id": workoutId,
    "created-at": date,
    name,
    sets,
    blocks,
    "resting-time-sets-minutes": restingTimeSetsMinutes,
    "resting-time-sets-seconds": restingTimeSetsSeconds,
    "working-time-blocks-seconds": workingTimeBlocksSeconds,
    "resting-time-blocks-seconds": restingTimeBlocksSeconds,
  } = Object.fromEntries(formData);

  const blockSettings = Array.from({ length: +blocks }, (_, index) => {
    return {
      name: formData.get(`block-exercise-${index}`),
      order: index,
    };
  });

  return {
    ...(workoutId && { id: +workoutId }),
    ...(date && { date }),
    name,
    sets: +sets,
    restingTimeSetsMinutes: +restingTimeSetsMinutes,
    restingTimeSetsSeconds: +restingTimeSetsSeconds,
    blocks: +blocks,
    workingTimeBlocksSeconds: +workingTimeBlocksSeconds,
    restingTimeBlocksSeconds: +restingTimeBlocksSeconds,
    blockSettings,
  };
}

/**
 * Creates a new workout object with additional metadata
 * @param {Object} formData Extracted form data from the CreateWorkout view
 * @returns {Object} New workout object
 */
function createNewWorkout(formData) {
  const { id, date } = formData;
  return {
    id: id || getDateNow(),
    date: date || getCurrentDate(),
    ...formData,
  };
}

/**
 * Handles form submission
 * @param {Event} event Form submission event
 */
async function createFormDispatcher(event) {
  const formData = CreateWorkout.submitForm(event);
  const formattedData = extractFormData(formData);
  const newWorkout = createNewWorkout(formattedData);

  try {
    CreateWorkout.setInputsLoadingState(true);
    const workoutData = await saveWorkout(newWorkout);
    renderWorkouts(workoutData);
  } catch (error) {
    console.error(
      `❌ Controller: _createWorkout | createFormDispatcher | ${error}`
    );
  } finally {
    CreateWorkout.resetForm();
    CreateWorkout.clearWorkoutBlocks();
    CreateWorkout.setInputsLoadingState(false);
  }
}

/**
 * Dispatches actions to populate a form with workout data
 * and scroll the form into view.
 *
 * @param {Object} workoutData - The workout data to be used for populating the form.
 */
export function populateFormDispatcher(workoutData) {
  CreateWorkout.populateForm(workoutData);
  CreateWorkout.scrollIntoView(
    CreateWorkout.createWorkoutSection,
    "smooth",
    "start",
    "start"
  );
}

/**
 * Opens the section
 */
function openSectionDispatcher() {
  CreateWorkout.openSection();
}

/**
 * Close the section
 */
function closeSectionDispatcher() {
  CreateWorkout.closeSection();
}

/**
 * Initializes event handlers for the CreateWorkouts module
 */
export default function initCreateWorkoutModule() {
  CreateWorkout.addHandlerOpenSection(openSectionDispatcher);
  CreateWorkout.addEventHandlerCloseSection(closeSectionDispatcher);
  CreateWorkout.addHandlerCreateForm(createFormDispatcher);
  CreateWorkout.addEventHandlerCreateBlocksBtn(createBlocksDispatcher);
  CreateWorkout.addEventHandlerClearWorkoutForm(clearWorkoutDispatcher);
}
