import './css/menuPage.css';
import { createTimerButtons } from './timerButton';
import { Sidebar } from './sidebar';
import { FolderPicker } from './folderPicker';

const MenuPage = {
  init(container) {
    const timerButtons = createTimerButtons();
    Sidebar.init(timerButtons);

    this.container = container;
    this.container.append(Sidebar.node);
  },
};

// Components

export default MenuPage;
