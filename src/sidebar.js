import { createCustomTimerInput, createTimerButtonData } from './timerButton';
import Events, { EventT } from './events.js';

export const Sidebar = {
  init(buttons) {
    this.node = document.createElement('div');
    this.node.classList.add('sidebar');

    this.presetTimers = buttons;

    const timerBtnList = this.createTimerButtonsList(buttons);
    this.node.append(timerBtnList);

    StartButton.init();
    this.node.append(StartButton.node);
  },
  createTimerButtonsList(buttons) {
    const ul = document.createElement('ul');
    ul.classList.add('timer-button-list');

    // preset timers
    const buttonNodes = buttons.map(b => b.node);
    ul.append(...buttonNodes);
    buttons.forEach(button => {
      button.node.addEventListener('click', () => {
        this.updateSelectedPresetTimer(button.node, button.data);
      });
    });

    // custom timer
    const customTimer = createCustomTimerInput();
    ul.append(customTimer.node);
    customTimer.node.addEventListener('click', () => {
      this.highlightActiveNode(customTimer.node);
      customTimer.input.select();
    });
    customTimer.input.addEventListener('input', () => {
      // remove border if not empty
      const toggler = customTimer.input.value === '' ? 'remove' : 'add';
      customTimer.input.classList[toggler]('no-border');

      // update selected time on valid input or revert to cache on invalid
      const timerData = this.parseTimerData(customTimer.input.value);
      if (timerData === null) {
        this.selected = this.cachedTimer;
        this.emitUpdateEvent();
        return;
      }
      this.selected = { node: customTimer.node, data: timerData };
      this.emitUpdateEvent();
    });
    customTimer.input.addEventListener('blur', () => {
      // reset to previous timer if invalid string
      const timerData = this.parseTimerData(customTimer.input.value);
      if (timerData === null) {
        this.updateSelectedPresetTimer(
          this.cachedTimer.node,
          this.cachedTimer.data
        );
        customTimer.input.value = '';
        customTimer.input.classList.remove('no-border');
      }
    });
    this.customTimer = customTimer;

    this.updateSelectedPresetTimer(buttons[0].node, buttons[0].data);

    return ul;
  },

  highlightActiveNode(node) {
    this.presetTimers
      .map(pt => pt.node)
      .forEach(bn => bn.classList.remove('active'));
    this.customTimer.node.classList.remove('active');
    node.classList.add('active');
  },

  cacheTimer({ node, data }) {
    this.cachedTimer = { node, data };
  },

  updateSelectedPresetTimer(node, data) {
    this.highlightActiveNode(node);
    this.selected = { node, data };
    this.cacheTimer({ node, data });
    this.emitUpdateEvent();
  },

  emitUpdateEvent() {
    Events.notify(EventT.TIMER_SET, this.selected.data.seconds);
  },

  parseTimerData(str) {
    str = str.toLowerCase();
    const re = /^(\d+)\s*([sm]?)$/;

    const parts = str.match(re);
    if (parts?.length !== 3) return null;

    let [_, duration, interval] = parts;
    duration = parseInt(duration);
    interval = interval === '' ? 's' : interval;
    const timerData = createTimerButtonData(duration, interval);
    return timerData;
  },
};

const StartButton = {
  init() {
    this.node = this.createStartButton();
    this.setHandlers();
  },

  createStartButton() {
    const button = document.createElement('button');
    button.classList.add('btn', 'start-btn');

    const icon = document.createElement('span');
    icon.classList.add('icon', 'start-icon');

    button.append(icon);

    return button;
  },

  setHandlers() {
    this.node.addEventListener('click', () => {
      Events.notify(EventT.START_SESSION);
    });
  },
};
