import View from "../../../helpers/View.js";

class RenderSavedWorkouts extends View {
  constructor() {
    super();
    this.renderSavedWorkoutsSection = document.querySelector("#saved-workouts");
    this.workoutListContainer = this.getElement(
      this.renderSavedWorkoutsSection,
      "#saved-workouts-list"
    );
  }

  renderWorkouts(workouts) {
    const workoutsItems = workouts.map((workout) => {
      return `
        <div data-workout-item-id="${workout.id}">
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
              <button data-start-workout>Start Workout</button>
              <button data-edit-workout>Edit</button>
              <button data-delete-workout>Delete</button>
          </div>
        </div>
      
      `;
    });

    this.workoutListContainer.innerHTML = workoutsItems.join("");
  }
}

export default new RenderSavedWorkouts();
