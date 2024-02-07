class BlockRestingTimer {
  constructor() {
    this.blockRestingTime = 0;
    this.currentTime = 0;
  }

  setRestingTime(time) {
    this.blockRestingTime = time;
  }

  setCurrentTime(time) {
    this.currentTime = time;
  }
}

export default new BlockRestingTimer();
