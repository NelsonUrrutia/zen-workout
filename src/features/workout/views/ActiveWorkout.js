import View from "../../../helpers/View.js";

class ActiveWorkout extends View {
  constructor() {
    super();
    this.section = document.querySelector("#active-workout");
    this.activeWorkoutName = document.querySelector("#active-workout-name");
    this.workoutTimer = this.getElement(this.section, "#workout-timer");
    this.restingTimer = this.getElement(this.section, "#resting-timer");
    this.startWorkoutBtn = this.getElement(this.section, "#start-workout");
    this.pauseWorkoutBtn = this.getElement(this.section, "#pause-workout");
    this.continueWorkoutBtn = this.getElement(
      this.section,
      "#continue-workout"
    );
    this.endWorkoutBtn = this.getElement(this.section, "#end-workout");
    this.activeExercise = this.getElement(this.section, "#active-exercise");
    this.nextExercise = this.getElement(this.section, "#next-exercise");
    this.blockCounter = this.getElement(this.section, "#block-counter");
    this.setCounter = this.getElement(this.section, "#set-counter");
  }

  populateWorkoutData({
    name,
    sets,
    restingTimeSetsMinutes,
    restingTimeSetsSeconds,
    blocks,
    workingTimeBlockSeconds,
  }) {
    this.setActiveWorkoutName(name);
    this.updateWorkoutTimer(workingTimeBlockSeconds);
    this.updateRestingTimer(restingTimeSetsMinutes, restingTimeSetsSeconds);
    this.updateBlockCounter(0, blocks);
    this.updateSetCounter(0, sets);
  }

  setLoadingState(flag) {
    this.section.dataset.loadingSection = flag;
  }

  setActiveState(element, flag) {
    element.dataset.isActive = flag;
  }

  setActiveWorkoutName(name) {
    this.activeWorkoutName.name.innerHTML = name;
  }

  updateWorkoutTimer(time) {
    this.workoutTimer.innerHTML = `${time}`;
  }

  updateRestingTimer(minutes, seconds) {
    this.restingTimer.innerHTML = `${minutes ? minutes : "00"} :
      ${seconds ? seconds : "00"}`;
  }

  updateBlockCounter(counter, total) {
    this.blockCounter.innerHTML = `${counter}/${total}`;
  }

  updateSetCounter(counter, total) {
    this.setCounter.innerHTML = `${counter}/${total}}`;
  }

  updateActiveExercise(exercise) {
    this.activeExercise.innerHTML = `${exercise}`;
  }

  updateNextExercise(exercise) {
    this.nextExercise.innerHTML = `${exercise}`;
  }
}
