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

  function blockTimer() {
    // Check if sets are completed
    if (counterSet === sets) {
      console.log("🏁 Workout Session Ended");
      counterBlockRestingTime = -1;
      return;
    }

    // Checks if the set is completed
    if (counterBlock === blocks) {
      counterSet++;
      counterBlock = 0;
      counterBlockWorkingTime = workingTimeBlocksSeconds;
      setRestingTimer();
      return;
    }

    while (counterBlockWorkingTime >= 0) {
      console.log(`💪🏻 ${counterBlockWorkingTime}`);
      counterBlockWorkingTime--;

      if (counterBlockWorkingTime === 0) {
        // Set back to default
        counterBlockWorkingTime = workingTimeBlocksSeconds;

        // Increase counter block
        counterBlock++;

        // Start block resting timer
        blockRestingTimer();
      }
    }
  }

  function blockRestingTimer() {
    // Check if sets are completed
    if (counterSet === sets) {
      console.log("🏁 Workout Session Ended");
      return;
    }

    // debugger;
    while (counterBlockRestingTime >= 0) {
      console.log(`🫁 ${counterBlockRestingTime}`);
      counterBlockRestingTime--;

      if (counterBlockRestingTime === 0) {
        // Set back to default
        counterBlockRestingTime = restingTimeBlocksSeconds;

        if (counterSet === sets) {
          console.log("🏁 Workout Session Ended");
          break;
        }

        // Start block timer
        blockTimer();
      }
    }
  }

  function setRestingTimer() {
    // debugger;
    while (counterSetRestingTime >= 0) {
      console.log(`🫁🫁 ${counterSetRestingTime}`);
      counterSetRestingTime--;

      if (counterSetRestingTime === 0) {
        // Set back to default
        counterSetRestingTime = setsRestingTimeSeconds;

        // Start block timer
        blockTimer();
      }
    }
  }

  blockTimer();
}
export default function initActiveWorkoutModule() {
  ActiveWorkout.addHandlerStartWorkout(startWorkoutHandler);
}
