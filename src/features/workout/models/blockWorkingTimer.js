class BlockWorkingTimer {
  constructor() {
    this.blockWorkingTime = 0;
    this.currentTime = 0;
  }

  setBlockWorkingTime(time) {
    this.blockWorkingTime = time;
  }

  setCurrentTime(time) {
    this.currentTime = time;
  }
}

export default new BlockWorkingTimer();
