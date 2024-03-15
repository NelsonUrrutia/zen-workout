import { Workout } from "../../models/Workout.js";

export class DisplayWorkoutsList extends HTMLElement {
  constructor() {
    super();
    this.workout = new Workout();
  }

  connectedCallback() {
    this.section = this;
    this.workoutsListContainer = this.querySelector("#workouts-list");
    this.loadingMessage = this.section.querySelector("#loading-message");
    this.errorMessageContainer = this.section.querySelector(
      "#display-workouts-list-error-message"
    );

    this.renderWorkouts();
    this.section.addEventListener(
      "click",
      this.sectionClickEventHandler.bind(this)
    );
    document.addEventListener("savedWorkout", this.renderWorkouts.bind(this));
  }

  disconnectedCallback() {
    this.section.removeEventListener(
      "click",
      this.sectionClickEventHandler.bind(this)
    );
  }

  sectionClickEventHandler(event) {
    const workoutItem = event.target.closest(".workout-item");
    const selectWorkout = event.target.closest(".select-workout");
    const editWorkout = event.target.closest(".edit-workout");
    const deleteWorkout = event.target.closest(".delete-workout");

    if (selectWorkout) {
      const { id } = workoutItem.dataset;
      document.dispatchEvent(
        new CustomEvent("selectedWorkout", { detail: id })
      );
      return;
    }

    if (editWorkout) {
      const { id } = workoutItem.dataset;
      document.dispatchEvent(new CustomEvent("editWorkout", { detail: id }));
      return;
    }

    if (deleteWorkout) {
      const { id } = workoutItem.dataset;
      this.deleteWorkout(id);
      return;
    }
  }

  async renderWorkouts() {
    this.setErrorMessage();
    this.clearWorkoutsListContainer();
    try {
      const workouts = await this.workout.getWorkouts();
      const workoutsMarkup = workouts
        .map((workout) => this.buildWorkoutMarkup(workout))
        .join("");
      this.workoutsListContainer.insertAdjacentHTML(
        "afterbegin",
        workoutsMarkup
      );
    } catch (error) {
      this.setErrorMessage(error);
    } finally {
      this.showLoadingMessage(false);
    }
  }

  async deleteWorkout(id) {
    await this.workout.deleteWorkoutById(+id);
    this.renderWorkouts();
  }

  buildWorkoutMarkup(workout) {
    const { id, date, name, sets, blocks, exercises } = workout;

    return `
    <div class="workout-item" data-id="${id}">
      <h3>${name}</h3>
      <small><strong>Created at:</strong> ${date}</small>
      <div class="workout-item-details">
        <div>
          <p><strong>Sets:</strong> ${sets}</p>
          <p><strong>Blocks:</strong> ${blocks}</p>
        </div>
        <div>
        <p><strong>Exercises:</strong></p>
          <ul>
            ${exercises.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </div>
      </div>
      <button class="select-workout">Select Workout</button>
      <button class="edit-workout">Edit Workout</button>
      <button class="delete-workout">Delete Workout</button>
    </div>`;
  }

  clearWorkoutsListContainer() {
    this.workoutsListContainer.innerHTML = "";
  }

  setErrorMessage(message = "") {
    this.errorMessageContainer = message;
  }

  showLoadingMessage(flag) {
    this.loadingMessage.style.display = flag ? "block" : "none";
  }
}
