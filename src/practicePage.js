import './css/practicePage.css';
import Events, { EventType } from './events';
import Slide from './slide';

const PracticePage = {
  init(container, params) {
    this.container = container;
    this.container.classList.add('practice-page');

    this.seconds = params.seconds;
    this.images = params.images;

    this.slideIndex = 0;

    this.initComponents();
    this.run();
  },

  initComponents() {
    this.createImageDisplay();
    this.createProgressBar();
    this.createControls();
  },

  createImageDisplay() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('image-wrapper');

    const img = document.createElement('img');
    wrapper.append(img);

    this.container.append(wrapper);
    this.img = img;
  },

  createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');

    const bg = document.createElement('span');
    bg.classList.add('progress-bar-bg');
    const fg = document.createElement('span');
    fg.classList.add('progress-bar-fg');
    const percent = document.createElement('span');
    percent.classList.add('progress-bar-percent');

    progressBar.append(bg, fg, percent);

    this.container.append(progressBar);
    this.progressBar = progressBar;
  },
  createControls() {
    const controls = document.createElement('section');
    controls.classList.add('controls');

    const prevBtn = document.createElement('button');
    prevBtn.classList.add('btn', 'prev-img-btn');
    prevBtn.textContent = `Prev`;
    prevBtn.disabled = true;

    const stopBtn = document.createElement('button');
    stopBtn.classList.add('btn', 'stop-session-btn');
    stopBtn.textContent = `Stop`;

    const nextBtn = document.createElement('button');
    nextBtn.classList.add('btn', 'next-img-btn');
    nextBtn.textContent = `Next`;

    const endBtn = document.createElement('button');
    endBtn.classList.add('btn', 'end-session-btn');
    endBtn.textContent = `End Session`;

    controls.append(prevBtn, stopBtn, nextBtn, endBtn);
    this.prevBtn = prevBtn;
    this.stopBtn = stopBtn;
    this.nextBtn = nextBtn;
    this.endBtn = endBtn;
    this.setControlHandlers();

    this.container.append(controls);
    this.controls = controls;
  },

  setControlHandlers() {
    // stop / resume
    this.stopped = false;
    const stop = () => {
      this.currentSlide.stop();
      this.stopBtn.textContent = 'Go again';
    };
    const resume = () => {
      this.currentSlide.start();
      this.stopBtn.textContent = 'Stop';
    };
    this.stopBtn.addEventListener('click', () => {
      this.stopped ? resume() : stop();
      this.stopped = !this.stopped;
    });

    // prev / next
    this.prevBtn.addEventListener('click', () => {
      this.stopped = false;
      this.showSlide(this.slides[--this.slideIndex]);
    });
    this.nextBtn.addEventListener('click', () => {
      this.stopped = false;
      this.showSlide(this.slides[++this.slideIndex]);
    });

    // end session
    this.endBtn.addEventListener('click', () => {
      this.currentSlide?.stop();
      Events.notify(EventType.END_SESSION);
    });
  },

  run() {
    this.slides = this.images.map(
      img =>
        new Slide(
          { node: this.img, path: img.sourcePath },
          this.progressBar,
          this.seconds
        )
    );

    this.showSlide(this.slides[this.slideIndex]);
    Events.listen(EventType.SLIDE_END, () => {
      if (this.slideIndex + 1 < this.slides.length) {
        this.showSlide(this.slides[++this.slideIndex]);
      }
    });
  },

  showSlide(slide) {
    this.currentSlide?.stop();
    this.currentSlide = slide;
    this.currentSlide.prepare();
    this.currentSlide.start();
    this.resetButtons();
  },

  resetButtons() {
    this.prevBtn.disabled = this.slideIndex <= 0;
    this.nextBtn.disabled = this.slideIndex + 1 >= this.images.length;
    this.stopBtn.textContent = this.stopped ? 'Go again' : 'Stop';
  },

  clear() {
    this.container.textContent = '';
  },
};

export default PracticePage;
