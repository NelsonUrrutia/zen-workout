import { Workout } from "../../models/Workout.js";

export class SessionWorkout extends HTMLElement {
  constructor() {
    super();
    this.workout = new Workout();
    this.timerId = 0;
    this.timerIsPaused = false;
    this.sessionWorkout = {
      sets: 0,
      setRestTime: 0,
      blocks: 0,
      blockWorkTime: 0,
      blockRestTime: 0,
      exercises: [],
      setsCounter: 0,
      setRestTimeCounter: 0,
      blocksCounter: 0,
      blockWorkTimeCounter: 0,
      blockRestTimeCounter: 0,
    };
  }

  connectedCallback() {
    this.section = this.querySelector("#session-workout");
    this.sessionWorkoutContent = this.section.querySelector(
      "#session-workout-content"
    );

    this.section.addEventListener("click", this.sectionEventHandler.bind(this));

    document.addEventListener(
      "selectedWorkout",
      this.selectedWorkoutEventHandler.bind(this)
    );
  }

  disconnectedCallback() {
    this.section.removeEventListener(
      "click",
      this.sectionEventHandler.bind(this)
    );
  }

  sectionEventHandler(event) {
    this.timerContainer = this.section.querySelector(".timer-container");
    const startBtn = event.target.closest("#start-workout");
    const stopBtn = event.target.closest("#stop-workout");

    if (startBtn) {
      this.timerIsPaused = false;
      this.sessionWorkoutTimerController();
      return;
    }

    if (stopBtn) {
      console.log("stop");
      this.timerIsPaused = true;
      return;
    }
  }

  sessionWorkoutTimerController() {
    if (!this.timerIsPaused) this.blockWorkTimer();
  }

  blockWorkTimer() {
    this.timerContainer.classList.remove("resting");
    this.timerContainer.classList.add("work-timer");
    this.sessionWorkout.blockWorkTimeCounter--;
    this.updateTimer(this.sessionWorkout.blockWorkTimeCounter);

    if (this.sessionWorkout.blockWorkTimeCounter <= 0) {
      this.sessionWorkout.blocksCounter += 1;
      this.sessionWorkout.blockWorkTimeCounter =
        this.sessionWorkout.blockWorkTime;

      this.updateBlockCounter(this.sessionWorkout.blocksCounter);

      if (this.sessionWorkout.blocksCounter < this.sessionWorkout.blocks) {
        this.updateExercise(
          this.sessionWorkout.exercises[this.sessionWorkout.blocksCounter]
        );
        setTimeout(this.blockRestTimer.bind(this), 1500);
        return;
      }

      if (this.sessionWorkout.blocksCounter === this.sessionWorkout.blocks) {
        this.sessionWorkout.setsCounter += 1;
        this.updateSetCounter(this.sessionWorkout.setsCounter);
        this.updateExercise(this.sessionWorkout.exercises[0]);

        if (this.sessionWorkout.setsCounter < this.sessionWorkout.sets) {
          setTimeout(() => {
            this.sessionWorkout.blocksCounter = 0;
            this.updateBlockCounter(0);
          }, 2000);

          setTimeout(this.setRestTimer.bind(this), 3000);
          return;
        }

        if (this.sessionWorkout.setsCounter === this.sessionWorkout.sets) {
          setTimeout(() => {
            this.updateBlockCounter(0);
            this.updateExercise("");
            this.updateSetCounter(0);
            alert("Finished Workout 🎉🎊");
          }, 3000);
          return;
        }
      }
    }
    setTimeout(this.blockWorkTimer.bind(this), 1000);
  }

  blockRestTimer() {
    this.timerContainer.classList.add("resting");
    this.timerContainer.classList.remove("work-timer");

    this.sessionWorkout.blockRestTimeCounter--;
    this.updateTimer(this.sessionWorkout.blockRestTimeCounter);

    if (this.sessionWorkout.blockRestTimeCounter === 0) {
      this.sessionWorkout.blockRestTimeCounter =
        this.sessionWorkout.blockRestTime;
      setTimeout(this.blockWorkTimer.bind(this), 3000);
      return;
    }
    setTimeout(this.blockRestTimer.bind(this), 1000);
  }

  setRestTimer() {
    this.timerContainer.classList.add("resting");

    this.sessionWorkout.setRestTimeCounter--;
    this.updateTimer(this.sessionWorkout.setRestTimeCounter);

    if (this.sessionWorkout.setRestTimeCounter === 0) {
      this.sessionWorkout.setRestTimeCounter = this.sessionWorkout.setRestTime;
      setTimeout(this.blockWorkTimer.bind(this), 3000);
      return;
    }

    setTimeout(this.setRestTimer.bind(this), 1000);
  }

  selectedWorkoutEventHandler(event) {
    const { detail: id } = event;
    this.renderSessionWorkout(id);
  }

  async renderSessionWorkout(id) {
    const workout = await this.workout.getWorkoutById(id);
    this.setSessionWorkout(workout);
    const { name, sets, blocks, blockWorkTime, exercises } = workout;
    this.workout.saveSessionWorkout(this.sessionWorkout);

    const template = `
      <h3>${name}</h3>
      <div class="timer-container">
      <p id="timer">${blockWorkTime}</p>
      </div>
      <p id="exercise">${exercises.at(0)}</p>
      <ul>
        <li><strong>Completed blocks: </strong> <span id="block-counter">0</span>/${blocks}</li>
        <li><strong>Completed sets: </strong> <span id="set-counter">0</span>/${sets}</li>
      </ul>
      <div>
        <button id="start-workout" class="primary">Start | Resume workout</button>
        <button id="stop-workout" class="warning">Stop workout</button>
       </div>
    `;

    this.sessionWorkoutContent.innerHTML = template;
  }

  setSessionWorkout(workout) {
    const {
      sets,
      setRestTime,
      blocks,
      blockWorkTime,
      blockRestTime,
      exercises,
    } = workout;

    this.sessionWorkout.sets = sets;
    this.sessionWorkout.setRestTime = setRestTime;
    this.sessionWorkout.blocks = blocks;
    this.sessionWorkout.blockWorkTime = blockWorkTime;
    this.sessionWorkout.blockRestTime = blockRestTime;
    this.sessionWorkout.exercises = exercises;

    this.sessionWorkout.setRestTimeCounter = setRestTime;
    this.sessionWorkout.blockWorkTimeCounter = blockWorkTime;
    this.sessionWorkout.blockRestTimeCounter = blockRestTime;
  }

  updateTimer(time) {
    this.section.querySelector("#timer").innerHTML = time;
  }

  updateExercise(exercise) {
    this.section.querySelector("#exercise").innerHTML = exercise;
  }

  updateBlockCounter(counter) {
    this.section.querySelector("#block-counter").innerHTML = counter;
  }

  updateSetCounter(counter) {
    this.section.querySelector("#set-counter").innerHTML = counter;
  }
}
