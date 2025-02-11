import Events, { EventType } from './events';

class Slide {
  constructor(img, progress, duration) {
    this.img = img;
    this.timeLeft = duration * 1000;

    this.duration = duration * 1000;
    this.totalSpent = 0;

    this.progress = new Progress(progress);
    this.progress.set(this.totalSpent / this.duration);
  }

  prepare() {
    this.timeLeft = this.duration;
    this.totalSpent = 0;
    this.img.node.src = this.img.path;
    this.progress.set(0);
  }

  start() {
    this.startTime = Date.now();
    this.endTimeout = setTimeout(() => {
      clearInterval(this.progressInterval);
      Events.notify(EventType.SLIDE_END);
    }, this.timeLeft);

    const frame = 30;
    this.progressInterval = setInterval(() => {
      this.totalSpent += frame;
      this.progress.set(this.totalSpent / this.duration);
    }, frame);
  }

  stop() {
    clearTimeout(this.endTimeout);
    clearInterval(this.progressInterval);

    const spent = Date.now() - this.startTime;
    this.timeLeft -= spent;
  }
}

class Progress {
  constructor(node) {
    this.node = node;
    this.bar = node.querySelector('.progress-bar-fg');
    this.percent = node.querySelector('.progress-bar-percent');
  }

  set(percent) {
    let intPercent = Math.round(percent * 100);
    if (intPercent < 0) intPercent = 0;
    if (intPercent > 100) intPercent = 100;

    this.bar.style.width = `${intPercent}%`;
    this.percent.textContent = `${intPercent}%`;
  }
}

export default Slide;
