import {
  getActiveWorkoutInSession,
  saveActiveWorkoutInSession,
} from "../models/workout.js";
import blockRestingTimer from "../models/blockRestingTimer.js";
import blockWorkingTimer from "../models/blockWorkingTimer.js";
import setRestingTimer from "../models/setRestingTimer.js";
import sessionActiveWorkout from "../models/sessionActiveWorkout.js";

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
  debugger;
  const {
    sets,
    restingTimeSetsMinutes,
    restingTimeSetsSeconds,
    blocks,
    workingTimeBlocksSeconds,
    restingTimeBlocksSeconds,
    blockSettings,
  } = getActiveWorkoutInSession();
  let setsCounter = 0;
  let blockCounter = 0;
  let restingTime = 15;
  let setRestingTime = restingTime;
  let blockWorkingTimeCounter = +workingTimeBlocksSeconds;
  let blockRestingTimeCounter = +restingTimeBlocksSeconds;

  function workoutTimer() {
    while (blockWorkingTimeCounter >= 0) {
      debugger;
      console.log(`💪🏻 Working ${blockWorkingTimeCounter}`);
      blockWorkingTimeCounter--;
      if (blockWorkingTimeCounter === 0) {
        blockWorkingTimeCounter = workingTimeBlocksSeconds;

        if (setsCounter === +sets) {
          console.log("Workout ended");
          return;
        }

        if (blockCounter === blockSettings.length) {
          console.log("blocks end");
          setsCounter++;
          setRestingTimer();
          return;
        }

        blockCounter++;
        restingTimer();
        return;
      }
    }
  }

  function restingTimer() {
    while (blockRestingTimeCounter >= 0) {
      debugger;
      console.log(`🫁 Resting ${blockRestingTimeCounter} `);
      blockRestingTimeCounter--;
      if (blockRestingTimeCounter === 0) {
        blockRestingTimeCounter = restingTimeBlocksSeconds;
        console.log(`Ended block ${blockCounter}`);
        workoutTimer();
        return;
      }
    }
  }

  function setRestingTimer() {
    while (setRestingTime >= 0) {
      debugger;
      console.log(`🫁 SETS Resting ${setRestingTime} `);
      setRestingTime--;
      if (setRestingTime === 0) {
        setRestingTime = restingTime;
        console.log(`Ended set ${setsCounter}`);
        workoutTimer();
        return;
      }
    }
  }

  workoutTimer();
}
export default function initActiveWorkoutModule() {
  ActiveWorkout.addHandlerStartWorkout(startWorkoutHandler);
}
