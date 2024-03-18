import { Workout } from "../../models/Workout.js";

export class SessionWorkout extends HTMLElement {
  constructor() {
    super();
    this.workout = new Workout();
  }
  connectedCallback() {
    this.section = this.querySelector("#session-workout");
    this.sessionWorkoutContent = this.section.querySelector(
      "#session-workout-content"
    );

    this.starWorkoutBtn = this.querySelector("#start-workout");
    this.stopWorkoutBtn = this.querySelector("#stop-workout");
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

  async renderSessionWorkout(id) {
    const workout = await this.workout.getWorkoutById(id);
    const { name, sets, blocks, blockWorkTime, exercises } = workout;
    this.workout.saveSessionWorkout(workout);

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
}
