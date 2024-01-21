class CreateWorkout {
  constructor() {
    this.createWorkoutSection = document.querySelector("#create-workout");
    this.openSectionBtn = this.createWorkoutSection.querySelector(
      "#open-create-workout"
    );
    this.closeSectionBtn = this.createWorkoutSection.querySelector(
      "#close-create-workout"
    );
    this.form = this.createWorkoutSection.querySelector("#create-workout-form");
    this.createBlocksBtn = this.form.querySelector("#create-blocks");
    this.workoutBlocks = this.form.querySelector("#create-workout-blocks");
    this.clearWorkoutForm = this.form.querySelector("#clear-workout-form");
  }

  addHandlerCreateForm(handler) {
    this.form.addEventListener("submit", handler);
  }

  addHandlerOpenSection(handler) {
    this.openSectionBtn.addEventListener("click", handler);
  }

  addEventHandlerCloseSection(handler) {
    this.closeSectionBtn.addEventListener("click", handler);
  }

  addEventHandlerCreateBlocksBtn(handler) {
    this.createBlocksBtn.addEventListener("click", handler);
  }

  addEventHandlerClearWorkoutForm(handler) {
    this.clearWorkoutForm.addEventListener("click", handler);
  }

  openSection() {
    this.createWorkoutSection.dataset.formVisibility = "visible";
  }

  closeSection() {
    this.createWorkoutSection.dataset.formVisibility = "hidden";
  }

  createWorkoutBlocks() {
    const blocksToCreate = +this.form.querySelector("#blocks").value;
    if (!blocksToCreate) {
      alert("Add at least 1 block to continue");
      return;
    }

    const workoutBlocksHTML = Array.from(
      { length: blocksToCreate },
      (_, index) => {
        const indexBasedOne = index + 1;
        return `
        <div class="block">
            <label for="block-exercise-${index}">#${indexBasedOne} Block exercise </label>
            <input type="text" name="block-exercise-${index}" id="block-exercise-${index}" />
        </div>`;
      }
    );

    this.workoutBlocks.innerHTML = workoutBlocksHTML.join("");
  }

  clearWorkoutBlocks() {
    this.workoutBlocks.innerHTML = "";
  }

  submitForm(event) {
    event.preventDefault();
    return new FormData(this.form);
  }
}

export default new CreateWorkout();
