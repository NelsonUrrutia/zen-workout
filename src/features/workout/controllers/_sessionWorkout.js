import { convertMinuteBasedToSeconds } from "../../../helpers/helpers.js";
import {
  getActiveWorkoutInSession,
  saveActiveWorkoutInSession,
} from "../models/workout.js";

import SessionWorkout from "../views/SessionWorkout.js";

/**
 * Function to load an active workout into the session
 * @param {Object} workout
 */
export function loadActiveWorkout(workout) {
  try {
    SessionWorkout.setLoadingState(true);

    saveActiveWorkoutInSession(workout);

    const {
      name,
      sets,
      blocks,
      workingTimeBlocksSeconds,
      restingTimeBlocksSeconds,
      blockSettings,
    } = workout;

    SessionWorkout.setActiveWorkoutName(name);
    SessionWorkout.updateBlockCounter(0, blocks);
    SessionWorkout.updateSetCounter(0, sets);
    SessionWorkout.updateWorkoutTimer(workingTimeBlocksSeconds);
    SessionWorkout.updateRestingTimer("", restingTimeBlocksSeconds);
    SessionWorkout.updateActiveExercise(blockSettings.at(0).name);
    SessionWorkout.updateNextExercise(blockSettings.at(1).name);

    SessionWorkout.setActiveState(SessionWorkout.workoutTimer, true);
    SessionWorkout.setActiveState(SessionWorkout.restingTimer, true);

    SessionWorkout.setDisableState(SessionWorkout.startWorkoutBtn, false);
  } catch (error) {
    console.log(error);
  } finally {
    SessionWorkout.setLoadingState(false);
    SessionWorkout.scrollIntoView(
      SessionWorkout.section,
      "smooth",
      "start",
      "start"
    );
  }
}

/**
 * Handler function to start the workout
 */
function startWorkoutHandler() {
  SessionWorkout.setDisableState(SessionWorkout.startWorkoutBtn, true);
  SessionWorkout.setDisableState(SessionWorkout.pauseWorkoutBtn, false);
  SessionWorkout.setDisableState(SessionWorkout.continueWorkoutBtn, false);
  SessionWorkout.setDisableState(SessionWorkout.endWorkoutBtn, false);
  mainTimerFunctions();
}

/**
 * Function containing the main logic for workout timer
 */
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

  function startWorking() {
    // Decrease block's timer;
    counterBlockWorkingTime--;
    SessionWorkout.updateWorkoutTimer(counterBlockWorkingTime);

    // Check if block's timer counter finished
    if (counterBlockWorkingTime === 0) {
      // Increase block's counter
      counterBlock++;
      SessionWorkout.updateBlockCounter(counterBlock, blocks);

      // Reset to default block's timer
      counterBlockWorkingTime = workingTimeBlocksSeconds;
      SessionWorkout.updateWorkoutTimer(workingTimeBlocksSeconds);

      // Check if the block's counter is less than blocks
      if (counterBlock < blocks) {
        // Start block's resting timer
        setTimeout(startRestingBetweenBlocks, 0);
        return;
      }

      // Reset block's counter
      counterBlock = 0;
      SessionWorkout.updateBlockCounter(counterBlock, blocks);

      console.log(`Set #${counterSet} finished`);
      console.log("----------------------------");

      // Check if the set's counter is less than sets
      if (counterSet <= sets) {
        // Start resting timer between sets
        setTimeout(startRestingBetweenSets, 0);
        return;
      }
    }

    // Continue working on the same block
    setTimeout(startWorking, 1000);
  }

  function startRestingBetweenBlocks() {
    // Decrease block's resting timer
    counterBlockRestingTime--;
    SessionWorkout.updateRestingTimer(0, counterBlockRestingTime);
    // console.log(`🫁 ${counterBlockRestingTime}`);

    // Check if the block's resting timer finished
    if (counterBlockRestingTime === 0) {
      counterBlockRestingTime = restingTimeBlocksSeconds;
      console.log(`|||||||||`);

      // Continue to the next set
      setTimeout(startWorking, 0);
      return;
    }

    setTimeout(startRestingBetweenBlocks, 1000);
  }

  function startRestingBetweenSets() {
    if (counterSet === sets) {
      return;
    }

    // Decrease set's resting timer
    counterSetRestingTime--;
    SessionWorkout.updateRestingTimer(counterSetRestingTime);
    // console.log(`🫁🫁 ${counterSetRestingTime}`);

    // Check if the set's resting timer finished
    if (counterSetRestingTime === 0) {
      // Set to default set's resting timer
      counterSetRestingTime = setsRestingTimeSeconds;
      console.log("----------------------------");

      // Increase set's counter
      counterSet++;
      SessionWorkout.updateSetCounter(counterSet, sets);

      // Continue next set
      setTimeout(startWorking, 0);
      return;
    }

    // Continue resting between sets
    setTimeout(startRestingBetweenSets, 1000);
  }

  startWorking();
}

export default function initSessionWorkoutModule() {
  SessionWorkout.addHandlerStartWorkout(startWorkoutHandler);
}
