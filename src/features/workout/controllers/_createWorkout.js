import CreateWorkout from "../views/CreateWorkout.js";
import { saveWorkout } from "../models/workout.js";

const clearWorkoutDispatcher = () => {
  CreateWorkout.clearWorkoutBlocks();
};

const createBlocksDispatcher = () => {
  CreateWorkout.createWorkoutBlocks();
};

const createFormDispatcher = (event) => {
  const formData = CreateWorkout.submitForm(event);

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

  const date = new Date();

  const newWorkout = {
    id: Math.random(),
    date: date.toDateString(),
    name,
    sets,
    restingTimeSetsMinutes,
    restingTimeSetsSeconds,
    blocks,
    workingTimeBlocksSeconds,
    restingTimeBlocksSeconds,
    blockSettings,
  };

  saveWorkout(newWorkout);
};

const openSectionDispatcher = () => {
  CreateWorkout.openSection();
};

const closeSectionDispatcher = () => {
  CreateWorkout.closeSection();
};

export const initCreateWorkouts = function () {
  CreateWorkout.addHandlerOpenSection(openSectionDispatcher);
  CreateWorkout.addEventHandlerCloseSection(closeSectionDispatcher);
  CreateWorkout.addHandlerCreateForm(createFormDispatcher);
  CreateWorkout.addEventHandlerCreateBlocksBtn(createBlocksDispatcher);
  CreateWorkout.addEventHandlerClearWorkoutForm(clearWorkoutDispatcher);
};
