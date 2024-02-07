class SetRestingTimer {
  constructor() {
    this.setRestingTime = 0;
    this.currentTime = 0;
  }

  setSetRestingTime(time) {
    this.setRestingTime = time;
  }

  setCurrentTime(time) {
    this.currentTime = time;
  }
}

export default new SetRestingTimer();
