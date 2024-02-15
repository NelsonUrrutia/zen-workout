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
  let counterSet = 1;

  let counterBlockWorkingTime = workingTimeBlocksSeconds;
  let counterBlockRestingTime = restingTimeBlocksSeconds;
  let counterBlock = 0;

  while (counterSet <= sets) {
    // Decrease block's timer
    counterBlockWorkingTime--;
    console.log(
      `Seconds ${counterBlockWorkingTime} | Current Exercise 💪🏻 ${
        blockSettings.at(counterBlock).name
      }`
    );

    // Check if block's timer counter finished
    if (counterBlockWorkingTime === 0) {
      // Increase block's counter
      counterBlock++;

      // Reset to default block's timer
      counterBlockWorkingTime = workingTimeBlocksSeconds;
      console.log(`Block #${counterBlock} finished`);

      // Check  the lock's counter to start resting timer
      // If the block's counter is equal to blocks, it means
      // the set is completed, and should start the set's resting timer
      if (counterBlock < blocks) {
        while (counterBlockRestingTime >= 0) {
          // Decrease block's resting timer
          counterBlockRestingTime--;
          console.log(`Seconds ${counterBlockRestingTime} | Resting 🫁 `);

          // Check if the block's resting timer finished
          if (counterBlockRestingTime === 0) {
            // Set to default block's resting timer
            counterBlockRestingTime = restingTimeBlocksSeconds;

            // End the loop
            break;
          }
        }
      }
    }

    // Check if the block's counter is equal to the blocks
    if (counterBlock === blocks) {
      // Reset block's counter
      counterBlock = 0;
      console.log(`Set #${counterSet} finished`);
      console.log("--------------------");

      // Check  the set's counter to start resting timer
      // If the set's counter is equal to sets, it means
      // the workout session is completed.
      if (counterSet < sets) {
        while (counterSetRestingTime >= 0) {
          // Decrease set's resting timer
          counterSetRestingTime--;
          console.log(`🫁🫁 ${counterSetRestingTime}`);

          // Check if the set's resting timer finished
          if (counterSetRestingTime === 0) {
            // Set to default set's resting timer
            counterSetRestingTime = setsRestingTimeSeconds;
            console.log("--------------------");

            // End the loop
            break;
          }
        }
      }

      // Increase set's counter
      counterSet++;
    }
  }
}

export default function initActiveWorkoutModule() {
  ActiveWorkout.addHandlerStartWorkout(startWorkoutHandler);
}
