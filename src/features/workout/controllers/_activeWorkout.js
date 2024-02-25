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

      // Check if the block's counter is less than blocks
      if (counterBlock < blocks) {
        // Start block's resting timer
        setTimeout(startRestingBetweenBlocks, 0);
        return;
      }

      // Reset block's counter
      counterBlock = 0;
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
    console.log(`🫁 ${counterBlockRestingTime}`);

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
    console.log(`🫁🫁 ${counterSetRestingTime}`);

    // Check if the set's resting timer finished
    if (counterSetRestingTime === 0) {
      // Set to default set's resting timer
      counterSetRestingTime = setsRestingTimeSeconds;
      console.log("----------------------------");

      // Increase set's counter
      counterSet++;

      // Continue next set
      setTimeout(startWorking, 0);
      return;
    }

    // Continue resting between sets
    setTimeout(startRestingBetweenSets, 1000);
  }

  startWorking();
}

export default function initActiveWorkoutModule() {
  SessionWorkout.addHandlerStartWorkout(startWorkoutHandler);
}

// FIRST ITERATION
// function mainTimerFunctions() {
//   const {
//     sets,
//     restingTimeSetsMinutes,
//     restingTimeSetsSeconds,
//     blocks,
//     workingTimeBlocksSeconds,
//     restingTimeBlocksSeconds,
//     blockSettings,
//   } = getActiveWorkoutInSession();

//   const setsRestingTimeSeconds = convertMinuteBasedToSeconds(
//     restingTimeSetsMinutes,
//     restingTimeSetsSeconds
//   );

//   let counterSetRestingTime = setsRestingTimeSeconds;
//   let counterSet = 1;

//   let counterBlockWorkingTime = workingTimeBlocksSeconds;
//   let counterBlockRestingTime = restingTimeBlocksSeconds;
//   let counterBlock = 0;

//   // Loop through the sets and blocks to manage workout progression
//   while (counterSet <= sets) {
//     // Decrease block's timer
//     counterBlockWorkingTime--;
//     console.log(
//       `Seconds ${counterBlockWorkingTime} | Current Exercise 💪🏻 ${
//         blockSettings.at(counterBlock).name
//       }`
//     );

//     // Check if block's timer counter finished
//     if (counterBlockWorkingTime === 0) {
//       // Increase block's counter
//       counterBlock++;

//       // Reset to default block's timer
//       counterBlockWorkingTime = workingTimeBlocksSeconds;
//       console.log(`Block #${counterBlock} finished`);

//       // Check  the lock's counter to start resting timer
//       // If the block's counter is equal to blocks, it means
//       // the set is completed, and should start the set's resting timer
//       if (counterBlock < blocks) {
//         while (counterBlockRestingTime >= 0) {
//           // Decrease block's resting timer
//           counterBlockRestingTime--;
//           console.log(`Seconds ${counterBlockRestingTime} | Resting 🫁 `);

//           // Check if the block's resting timer finished
//           if (counterBlockRestingTime === 0) {
//             // Set to default block's resting timer
//             counterBlockRestingTime = restingTimeBlocksSeconds;

//             // End the loop
//             break;
//           }
//         }
//       }
//     }

//     // Check if the block's counter is equal to the blocks
//     if (counterBlock === blocks) {
//       // Reset block's counter
//       counterBlock = 0;
//       console.log(`Set #${counterSet} finished`);
//       console.log("--------------------");

//       // Check  the set's counter to start resting timer
//       // If the set's counter is equal to sets, it means
//       // the workout session is completed.
//       if (counterSet < sets) {
//         while (counterSetRestingTime >= 0) {
//           // Decrease set's resting timer
//           counterSetRestingTime--;
//           console.log(`🫁🫁 ${counterSetRestingTime}`);

//           // Check if the set's resting timer finished
//           if (counterSetRestingTime === 0) {
//             // Set to default set's resting timer
//             counterSetRestingTime = setsRestingTimeSeconds;
//             console.log("--------------------");

//             // End the loop
//             break;
//           }
//         }
//       }

//       // Increase set's counter
//       counterSet++;
//     }
//   }
// }
