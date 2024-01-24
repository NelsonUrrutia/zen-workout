import CreateWorkout from "../views/CreateWorkout.js";
import { saveWorkout } from "../models/workout.js";
import { getCurrentDate, getDateNow } from "../../../helpers/helpers.js";

/**
 * Clears workout blocks
 */
const clearWorkoutDispatcher = () => {
  CreateWorkout.clearWorkoutBlocks();
};

/**
 * Creates workout blocks
 */
const createBlocksDispatcher = () => {
  CreateWorkout.createWorkoutBlocks();
};

/**
 * Pars and format the form data object
 * @param {FormData} formData Form data submitted from the CreateWorkout view
 * @returns {Object} Parsed and formatted form data
 */

const extractFormData = (formData) => {
  const {
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
    name,
    sets,
    restingTimeSetsMinutes,
    restingTimeSetsSeconds,
    blocks,
    workingTimeBlocksSeconds,
    restingTimeBlocksSeconds,
    blockSettings,
  };
};

/**
 * Creates a new workout object with additional metadata
 * @param {Object} formData Extracted form data from the CreateWorkout view
 * @returns {Object} New workout object
 */
const createNewWorkout = (formData) => {
  return {
    id: getDateNow(),
    date: getCurrentDate(),
    ...formData,
  };
};

/**
 * Handles form submission
 * @param {Event} event Form submission event
 */
const createFormDispatcher = async (event) => {
  const formData = CreateWorkout.submitForm(event);
  const formattedData = extractFormData(formData);
  const newWorkout = createNewWorkout(formattedData);

  try {
    const workoutData = await saveWorkout(newWorkout);
  } catch (error) {
    console.error(
      `❌ Controller: _createWorkout | createFormDispatcher | ${error}`
    );
  } finally {
    CreateWorkout.resetForm();
    CreateWorkout.clearWorkoutBlocks();
  }
};

/**
 * Opens the section
 */
const openSectionDispatcher = () => {
  CreateWorkout.openSection();
};

/**
 * Close the section
 */
const closeSectionDispatcher = () => {
  CreateWorkout.closeSection();
};

/**
 * Initializes event handlers for the CreateWorkouts module
 */
export const initCreateWorkouts = function () {
  CreateWorkout.addHandlerOpenSection(openSectionDispatcher);
  CreateWorkout.addEventHandlerCloseSection(closeSectionDispatcher);
  CreateWorkout.addHandlerCreateForm(createFormDispatcher);
  CreateWorkout.addEventHandlerCreateBlocksBtn(createBlocksDispatcher);
  CreateWorkout.addEventHandlerClearWorkoutForm(clearWorkoutDispatcher);
};
