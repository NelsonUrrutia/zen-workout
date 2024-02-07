class SessionActiveWorkout {
  constructor() {
    this.workout = {};
    this.currentBlock = 0;
    this.currentSet = 0;
  }

  setWorkout(workout) {
    this.workout = workout;
  }

  setCurrentBlock(block) {
    this.currentBlock = block;
  }

  setCurrentSet(set) {
    this.currentSet = set;
  }
}

export default new SessionActiveWorkout();
