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

  function blockTimer() {
    // debugger;
    // Guard clause | Workout session ended
    // Check if the set's counter is equal to sets
    if (counterSet === sets) {
      console.log("Congrats! Workout session ended 😀");
      return;
    }

    // Guard Clause | Set ended
    // Check if the block's counter is equal to the total of blocks
    if (counterBlock === blocks) {
      // Increase set counter, the set end
      counterSet++;

      // Reset block's counter to start the new set's blocks
      counterBlock = 0;

      // Reset block's working timer counter
      counterBlockWorkingTime = workingTimeBlocksSeconds;

      // Call sets resting timer
      setsRestingTimer();
    }

    // Check if block's counter working timer end
    if (counterBlockWorkingTime === 0) {
      // Reset block's working timer counter
      counterBlockWorkingTime = workingTimeBlocksSeconds;

      // Increase block's counter
      counterBlock++;

      // Placeholder log | Replace with view methods
      console.log(`Ended block ${counterBlock}`);

      // Call block resting timer
      blockRestingTimer();
    } else {
      // Call it self
      blockTimer();
    }

    // Decrease workout's working time counter
    counterBlockWorkingTime--;

    // Placeholder log | Replace with view methods
    console.log(`💪🏻 ${counterBlockWorkingTime}`);
  }

  function blockRestingTimer() {
    if (counterSet === sets) {
      console.log("Congrats! Workout session ended 😀");
      return;
    }
    // debugger;
    // Check if block's resting timer counter end
    if (counterBlockRestingTime === 0) {
      // Set back to default
      counterBlockRestingTime = restingTimeBlocksSeconds;

      // Placeholder log | Replace with view methods
      console.log(`🫁 Resting for block #${counterBlock} end`);

      // Call block timer
      blockTimer();
    }

    // Decrease block's resting timer counter
    counterBlockRestingTime--;

    // Placeholder log | Replace with view methods
    console.log(`🫁 ${counterBlockRestingTime}`);

    // Call it self to continue the cycle
    blockRestingTimer();
  }

  function setsRestingTimer() {
    // debugger;
    // Guard clause | Workout session ended
    // Check if the set's counter is equal to sets
    if (counterSet === sets) {
      console.log("Congrats! Workout session ended 😀");
      return;
    }

    // Decrease set's resting timer counter
    counterSetRestingTime--;

    // Placeholder log | Replace with view methods
    console.log(`🫁🫁 ${counterSetRestingTime}`);

    // Check if set's  resting time counter end
    if (counterSetRestingTime === 0) {
      // Set back to default
      counterSetRestingTime = setsRestingTimeSeconds;
      console.log(`🚩 Ended set  #${counterSet}`);
      console.log("=============================");
      blockTimer();
    }

    // Call it self to continue the cycle
    setsRestingTimer();
  }

  blockTimer();
}
