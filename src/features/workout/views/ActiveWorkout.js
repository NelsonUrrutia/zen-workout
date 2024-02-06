import View from "../../../helpers/View.js";

class ActiveWorkout extends View {
  constructor() {
    super();
    this.section = document.querySelector("#active-workout");
    this.activeWorkoutName = this.getElement(
      this.section,
      "#active-workout-name"
    );
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

  addHandlerStartWorkout(handler) {
    this.startWorkoutBtn.addEventListener("click", handler);
  }

  setLoadingState(flag) {
    this.section.dataset.loadingSection = flag;
  }

  setActiveState(element, flag) {
    element.dataset.isActive = flag;
  }

  setDisableState(element, flag) {
    element.disabled = flag;
  }

  setActiveWorkoutName(name) {
    this.activeWorkoutName.innerHTML = name;
  }

  updateWorkoutTimer(time) {
    this.workoutTimer.innerHTML = `${time} seconds`;
  }

  updateRestingTimer(minutes, seconds) {
    this.restingTimer.innerHTML = `${minutes ? minutes : "00"} :
      ${seconds ? seconds : "00"}`;
  }

  updateBlockCounter(counter, total) {
    this.blockCounter.innerHTML = `Blocks: ${counter}/${total}`;
  }

  updateSetCounter(counter, total) {
    this.setCounter.innerHTML = `Sets: ${counter}/${total}`;
  }

  updateActiveExercise(exercise) {
    this.activeExercise.innerHTML = `${exercise}`;
  }

  updateNextExercise(exercise) {
    this.nextExercise.innerHTML = `<strong>Next:</strong> ${exercise}`;
  }
}

export default new ActiveWorkout();
