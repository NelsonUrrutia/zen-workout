import { convertMinuteBasedToSeconds } from "../../../helpers/helpers.js";
import {
  getActiveWorkoutInSession,
  saveActiveWorkoutInSession,
} from "../models/workout.js";

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
    ActiveWorkout.scrollIntoView(
      ActiveWorkout.section,
      "smooth",
      "start",
      "start"
    );
  }
}

function startWorkoutHandler() {
  ActiveWorkout.setDisableState(ActiveWorkout.startWorkoutBtn, true);
  ActiveWorkout.setDisableState(ActiveWorkout.pauseWorkoutBtn, false);
  ActiveWorkout.setDisableState(ActiveWorkout.continueWorkoutBtn, false);
  ActiveWorkout.setDisableState(ActiveWorkout.endWorkoutBtn, false);
  mainTimerFunctions();
}

function mainTimerFunctions() {
  // FIXME: INFINITE LOOP
  const {
    sets,
    restingTimeSetsMinutes,
    restingTimeSetsSeconds,
    blocks,
    workingTimeBlocksSeconds,
    restingTimeBlocksSeconds,
    blockSettings,
  } = getActiveWorkoutInSession();

  const setsRestingTimeSeconds = convertMinuteBasedToSeconds(
    restingTimeSetsMinutes,
    restingTimeSetsSeconds
  );

  let counterSetRestingTime = setsRestingTimeSeconds;
  let counterSet = 0;

  let counterBlockWorkingTime = workingTimeBlocksSeconds;
  let counterBlockRestingTime = restingTimeBlocksSeconds;
  let counterBlock = 0;
}

export default function initActiveWorkoutModule() {
  ActiveWorkout.addHandlerStartWorkout(startWorkoutHandler);
}
