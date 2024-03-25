import { Workout } from "../../models/Workout.js";

export class SessionWorkout extends HTMLElement {
  constructor() {
    super();
    this.workout = new Workout();
    this.sessionWorkout = {
      isPaused: false,
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

    this.startWorkoutBtn = this.querySelector("#start-workout");
    this.startWorkoutBtn.addEventListener(
      "click",
      this.startWorkoutEventHandler.bind(this)
    );

    this.stopWorkoutBtn = this.querySelector("#stop-workout");
    this.stopWorkoutBtn.addEventListener(
      "click",
      this.stopWorkoutEventHandler.bind(this)
    );

    document.addEventListener(
      "selectedWorkout",
      this.selectedWorkoutEventHandler.bind(this)
    );
  }

  disconnectedCallback() {}

  selectedWorkoutEventHandler(event) {
    const { detail: id } = event;
    this.renderSessionWorkout(id);
  }

  startWorkoutEventHandler(event) {
    const btn = event.target.closest("#start-workout");
    if (!btn) return;
  }

  stopWorkoutEventHandler(event) {
    const btn = event.target.closest("#stop-workout");
    if (!btn) return;
  }

  async renderSessionWorkout(id) {
    const workout = await this.workout.getWorkoutById(id);
    this.setSessionWorkout(workout);
    const { name, sets, blocks, blockWorkTime, exercises } = workout;
    this.workout.saveSessionWorkout(this.sessionWorkout);

    const template = `
      <h3>${name}</h3>
      <p id="timer">${blockWorkTime}</p>
      <p id="exercise">${exercises.at(0)}</p>
      <p id="block-status"><strong>Completed blocks: </strong>0/${blocks}</p>
      <p id="set-status"><strong>Completed sets: </strong> 0/${sets}</p>
      <div>
        <button id="start-workout">Start | Resume workout</button>
        <button id="stop-workout">Stop workout</button>
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
  }
}
