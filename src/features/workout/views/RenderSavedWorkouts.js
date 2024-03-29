import View from "../../../helpers/View.js";

/**
 * # RenderSavedWorkouts
 *
 * ## This class is responsible for handling the presentation logic
 * ## and user interface related to render saved workouts.
 * @extends View
 */
class RenderSavedWorkouts extends View {
  /**
   * Creates an instance of RenderSavedWorkouts.
   * Initializes DOM elements for rendering saved workouts.
   */
  constructor() {
    super();
    this.renderSavedWorkoutsSection = document.querySelector("#saved-workouts");
    this.workoutListContainer = this.getElement(
      this.renderSavedWorkoutsSection,
      "#saved-workouts-list"
    );
    this.loadingSpinner = this.getElement(
      this.renderSavedWorkoutsSection,
      "#loading-spinner"
    );
  }

  /**
   * Adds an event handler to the saved workout section
   * @param {Function} handler Function to handle the form submission event
   */
  addHandlerRenderSavedWorkoutsSection(handler) {
    this.renderSavedWorkoutsSection.addEventListener("click", handler);
  }

  /**
   * Renders the list of saved workouts.
   * @param {Array} workouts - An array of workout objects.
   */
  renderWorkouts(workouts) {
    if (!workouts.length) {
      this.setEmptyState();
      return;
    }

    const workoutsItems = workouts.map((workout) => {
      return `
        <div 
          class="saved-workout-item"
          data-workout-item-id="${workout.id}">
          <div>
            <h3>${workout.name}</h3>
            <p>Created at: ${workout.date}</p>
          </div>
          <div>
            <h4>Sets</h4>
            <p>
              <strong>Total:</strong> ${workout.sets}</p>
            <p>
              <strong>Resting time:</strong>
               ${
                 workout.restingTimeSetsMinutes
                   ? workout.restingTimeSetsMinutes + ":"
                   : ""
               }

               ${
                 workout.restingTimeSetsSeconds
                   ? workout.restingTimeSetsSeconds
                   : "00"
               }
            </p>
          </div>
          <div>
            <h4>Blocks</h4>
            <p>
               <strong>Total:</strong>
               ${workout.blocks}
            </p>
            <p>
               <strong>Working time (seconds):</strong>
              ${workout.workingTimeBlocksSeconds}
            </p>
            <p>
               <strong>Resting time (seconds):</strong>
               ${workout.restingTimeBlocksSeconds}
            </p>
            <p><strong>Exercises:</strong></p>
            <ul>
               ${workout.blockSettings
                 .map((block) => `<li>#${block.order + 1} - ${block.name}</li>`)
                 .join("")}
            </ul>
          </div>
          <div>  
              <button data-select-workout>Select Workout</button>
              <button data-edit-workout>Edit</button>
              <button data-delete-workout>Delete</button>
          </div>
        </div>
      
      `;
    });

    this.workoutListContainer.innerHTML = workoutsItems.join("");
  }

  deleteWorkoutConfirmation(workoutName) {
    return confirm(`Delete this workout: ${workoutName}`);
  }

  /**
   * Sets empty message in the workouts list
   */
  setEmptyState() {
    this.workoutListContainer.innerHTML = `<h3>You don't have any workouts yet. Create a new workout.</h3>`;
  }

  /**
   * Toggles visibility of the loader spinner
   * @param {Boolean} isVisible Flag to toggle visibility of the spinner
   */
  setLoadingSpinner(isVisible) {
    this.loadingSpinner.dataset.showLoadingSpinner = isVisible;
  }
}

export default new RenderSavedWorkouts();
