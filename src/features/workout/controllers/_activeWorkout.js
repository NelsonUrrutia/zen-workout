import { saveActiveWorkoutInSession } from "../models/workout.js";
import ActiveWorkout from "../views/ActiveWorkout.js";

export function loadActiveWorkout(workout) {
  try {
    ActiveWorkout.setLoadingState(true);

    saveActiveWorkoutInSession(workout);

    const {
      name,
      sets,
      blocks,
      workingTimeBlocksSeconds,
      restingTimeBlocksSeconds,
      blockSettings,
    } = workout;

    ActiveWorkout.setActiveWorkoutName(name);
    ActiveWorkout.updateBlockCounter(0, blocks);
    ActiveWorkout.updateSetCounter(0, sets);
    ActiveWorkout.updateWorkoutTimer(workingTimeBlocksSeconds);
    ActiveWorkout.updateRestingTimer("", restingTimeBlocksSeconds);
    ActiveWorkout.updateActiveExercise(blockSettings.at(0).name);
    ActiveWorkout.updateNextExercise(blockSettings.at(1).name);

    ActiveWorkout.setActiveState(ActiveWorkout.workoutTimer, true);
    ActiveWorkout.setActiveState(ActiveWorkout.restingTimer, true);

    ActiveWorkout.setDisableState(ActiveWorkout.startWorkoutBtn, false);
  } catch (error) {
    console.log(error);
  } finally {
    ActiveWorkout.setLoadingState(false);
  }
}

function startWorkoutHandler() {
  ActiveWorkout.setDisableState(ActiveWorkout.startWorkoutBtn, true);
  ActiveWorkout.setDisableState(ActiveWorkout.pauseWorkoutBtn, false);
  ActiveWorkout.setDisableState(ActiveWorkout.continueWorkoutBtn, false);
  ActiveWorkout.setDisableState(ActiveWorkout.endWorkoutBtn, false);
}

export default function initActiveWorkoutModule() {
  ActiveWorkout.addHandlerStartWorkout(startWorkoutHandler);
}
