import { getWorkouts } from "../models/workout.js";
import RenderSavedWorkouts from "../views/RenderSavedWorkouts.js";

export const renderWorkouts = (workoutData) => {
  RenderSavedWorkouts.renderWorkouts(workoutData);
};

const firstLoadWorkoutsRender = async () => {
  const data = await getWorkouts();
  renderWorkouts(data);
};

export function initRenderSavedWorkouts() {
  firstLoadWorkoutsRender();
}
