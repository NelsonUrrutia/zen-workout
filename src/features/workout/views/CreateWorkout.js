class CreateWorkout {
  createWorkoutSection = document.querySelector("#create-workout");
  openSectionBtn = this.createWorkoutSection.querySelector(
    "#open-create-workout"
  );
  closeSectionBtn = this.createWorkoutSection.querySelector(
    "#close-create-workout"
  );
  form = this.createWorkoutSection.querySelector("#create-workout-form");
  createBlocksBtn = this.form.querySelector("#create-blocks");
  workoutBlocks = this.form.querySelector("#create-workout-blocks");

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

  submitForm() {
    alert("Submit form");
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

    const workoutBlocksHTML = [];

    for (let index = 0; index < blocksToCreate; index++) {
      const indexBasedOne = index + 1;
      const blockTemplate = `
        <div>
            <label for="block-exercise-${index}">#${indexBasedOne} Block exercise </label>
            <input type="text" name="block-exercise-${index}" id="block-exercise-${index}" />
        
            <label for="block-time-minutes-${index}">Minutes</label>
            <input
                type="number"
                name="block-time-minutes-${index}"
                id="block-time-minutes-${index}"
                title="Minutes"
                placeholder="00"
                min="0"
                max="10"
                tabindex="6"
            />
            <label for="block-time-seconds-${index}">Seconds</label>
            <input
                type="number"
                name="block-time-seconds-${index}"
                id="block-time-seconds-${index}"
                title="Seconds"
                placeholder="00"
                min="0"
                max="59"
                tabindex="7"
            />
        </div>`;
      workoutBlocksHTML.push(blockTemplate);
    }

    workoutBlocksHTML.reverse();

    workoutBlocksHTML.forEach((element) =>
      this.workoutBlocks.insertAdjacentHTML("afterend", element)
    );
  }
}

export default new CreateWorkout();
