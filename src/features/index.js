import initSessionWorkoutModule from "./workout/controllers/_sessionWorkout.js";
import initCreateWorkoutModule from "./workout/controllers/_createWorkout.js";
import initRenderSavedWorkoutsModule from "./workout/controllers/_renderSavedWorkouts.js";

initCreateWorkoutModule();
initRenderSavedWorkoutsModule();
initSessionWorkoutModule();
