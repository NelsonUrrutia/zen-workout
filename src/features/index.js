import { CreateWorkoutForm } from "./create-workout/create-workout-form.js";
import { CreateExercisesList } from "./create-workout/create-exercises-list.js";
import { DisplayWorkoutsList } from "./display-workouts/display-workouts-list.js";
import { SessionWorkout } from "./session-workout/session-workout.js";

customElements.define("create-workout-form", CreateWorkoutForm);
customElements.define("create-exercises-list", CreateExercisesList);
customElements.define("display-workouts-list", DisplayWorkoutsList);
customElements.define("session-workout", SessionWorkout);
