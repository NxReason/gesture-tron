import './css/menuPage.css';
import { createTimerButtons, createCustomTimerInput } from './timerButton';

const MenuPage = {
  init(container) {
    const timerButtons = createTimerButtons();
    Sidebar.init(timerButtons);

    this.container = container;
    this.container.append(Sidebar.node);
  },
};

// Components
const Sidebar = {
  init(buttons) {
    this.node = document.createElement('div');
    this.node.classList.add('sidebar');

    const timerBtnList = this.createTimerButtonsList(buttons);
    this.node.append(timerBtnList);
  },
  createTimerButtonsList(buttons) {
    const ul = document.createElement('ul');
    ul.classList.add('timer-button-list');

    // preset timers
    const buttonNodes = buttons.map(b => b.node);
    ul.append(...buttonNodes);
    buttons.forEach(button => {
      // TODO: set selected timer
    });

    // custom timer
    const customTimer = createCustomTimerInput();
    ul.append(customTimer.node);
    customTimer.input.addEventListener('input', () => {}); // TODO:

    return ul;
  },
};

export default MenuPage;
