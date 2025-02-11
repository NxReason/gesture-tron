import './css/practicePage.css';

const PracticePage = {
  init(container, params) {
    this.container = container;
    this.container.classList.add('practice-page');

    this.seconds = params.seconds;
    this.images = params.images;

    this.initComponents();
    this.start();
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
    // dev
    percent.textContent = '30%';

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

    this.container.append(controls);
    this.controls = controls;
  },

  start() {
    this.imageInterval = setInterval(() => {
      console.log('int');
    }, this.seconds * 100);
  },

  showImage(path) {
    this.img.src = path;
  },
};

export default PracticePage;
