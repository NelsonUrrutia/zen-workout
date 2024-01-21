import CreateWorkout from "../views/CreateWorkout.js";

const createBlocksDispatcher = () => {
  CreateWorkout.createWorkoutBlocks();
};

const createFormDispatcher = (event) => {
  event.preventDefault();
  CreateWorkout.submitForm();
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
};
