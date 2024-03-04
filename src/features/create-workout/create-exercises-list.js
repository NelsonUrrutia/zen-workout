/**
 * # Define a custom HTML element for creating exercises list
 */
export class CreateExercisesList extends HTMLElement {
  constructor() {
    super();
    // Counter to keep track of exercises and generate unique names
    this.exerciseCounter = 0;
  }

  // Lifecycle method called when the element is added to the DOM
  connectedCallback() {
    this.section = this;
    this.exercisesListContainer = this.section.querySelector(
      "#exercises-list-container"
    );

    this.addButton = this.querySelector("#add-exercise");

    this.section.addEventListener(
      "click",
      this.sectionClickEventHandler.bind(this)
    );

    this.addButton.addEventListener(
      "click",
      this.addButtonClickHandler.bind(this)
    );

    document.addEventListener(
      "savedWorkout",
      this.clearExercisesContainer.bind(this)
    );
  }

  // Lifecycle method called when the element is removed from the DOM
  disconnectedCallback() {
    this.section.removeEventListener(
      "click",
      this.sectionClickEventHandler.bind(this)
    );

    this.addButton.removeEventListener(
      "click",
      this.addButtonClickHandler.bind(this)
    );
  }

  /**
   * Event handler for clicks on the section
   * @param {Event} event Click event
   */
  sectionClickEventHandler(event) {
    const deleteExerciseBtn = event.target.closest(".delete-exercise");
    if (deleteExerciseBtn) {
      this.deleteExercise(deleteExerciseBtn);
      return;
    }
  }

  /**
   * Event handler for clicks on the "Add Exercise" button
   * @param {Event} event Click event
   */
  addButtonClickHandler(event) {
    const addButton = event.target.closest("#add-exercise");
    if (!addButton) return;
    this.insertNewExerciseInput();
  }

  /**
   * Method to insert a new exercise input into the list
   */
  insertNewExerciseInput() {
    const element = this.createExercise();
    this.exercisesListContainer.insertAdjacentHTML("beforeend", element);
  }

  /**
   * Method to delete an exercise block
   * @param {HTMLElement} deleteExerciseBtn Exercise's delete button
   */
  deleteExercise(deleteExerciseBtn) {
    const exerciseBlock = deleteExerciseBtn.closest(".exercise");
    exerciseBlock.remove();
  }

  /**
   * Method to create the HTML for a new exercise input
   * @returns {TemplateString} Exercise HTML element
   */
  createExercise() {
    return `
      <div class="exercise">
        <input type="text" name="exercise-${this.exerciseCounter++}" required>
        <button type="button" class="delete-exercise">❌</button>      
      </div
    `;
  }

  /**
   * Method to clear the exercises container (used in response to a custom event)
   */
  clearExercisesContainer() {
    this.exercisesListContainer.innerHTML = "";
  }
}
