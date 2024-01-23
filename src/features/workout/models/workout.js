// TODO: Make it async/await
export function saveWorkout(newWorkout) {
  const rawWorkoutsData = localStorage.getItem("workoutsData");
  const parsedWorkoutsData = rawWorkoutsData && JSON.parse(rawWorkoutsData);
  const newWorkoutsData = parsedWorkoutsData
    ? [...parsedWorkoutsData, newWorkout]
    : [newWorkout];

  localStorage.setItem("workoutsData", JSON.stringify(newWorkoutsData));
}
